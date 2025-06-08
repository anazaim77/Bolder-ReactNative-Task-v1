import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  AppState,
  AppStateStatus,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store';
import { addCompletedWorkout } from '@/store/slices/historySlice';
import { StoreTypes } from '@/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialTopTabNavigationProp } from '@react-navigation/material-top-tabs';
import { MainTabsParamList } from '@/navigation/index.type';

type NavigationProp = MaterialTopTabNavigationProp<MainTabsParamList, 'WorkoutSession'>;

interface ExerciseLog extends StoreTypes.WorkoutPlanExercise {
  completedSets: Array<{
    reps: number;
    weight?: number;
    completed: boolean;
  }>;
}

interface SessionData {
  startTime: number;
  elapsedTime: number;
  planId: string;
  planName: string;
  exercises: ExerciseLog[];
}

const STORAGE_KEY = 'activeWorkoutSession';

const WorkoutSessionScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useDispatch();
  const { workoutPlans, selectedWorkoutPlanId } = useSelector((state: RootState) => state.workouts);
  
  const [sessionData, setSessionData] = useState<SessionData | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const appStateRef = useRef(AppState.currentState);

  // Get selected workout plan
  const selectedPlan = workoutPlans.find(plan => plan.id === selectedWorkoutPlanId);

  // Initialize session on component mount
  useEffect(() => {
    initializeSession();
    
    // Handle app state changes for background persistence
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        // App has come to the foreground, restore timer
        restoreTimerFromBackground();
      } else if (nextAppState.match(/inactive|background/)) {
        // App is going to background, save current state
        saveSessionToStorage();
      }
      appStateRef.current = nextAppState;
    };

    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => {
      subscription?.remove();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const initializeSession = async () => {
    try {
      // Check for existing session in storage
      const storedSession = await AsyncStorage.getItem(STORAGE_KEY);
      
      if (storedSession) {
        const parsedSession: SessionData = JSON.parse(storedSession);
        setSessionData(parsedSession);
        setElapsedTime(parsedSession.elapsedTime);
        setIsActive(true);
        startTimer();
      } else if (selectedPlan) {
        // Start new session with selected plan
        const newSession: SessionData = {
          startTime: Date.now(),
          elapsedTime: 0,
          planId: selectedPlan.id,
          planName: selectedPlan.name,
          exercises: selectedPlan.exercises.map(exercise => ({
            ...exercise,
            completedSets: Array(exercise.sets).fill(null).map(() => ({
              reps: exercise.reps,
              weight: 0,
              completed: false,
            })),
          })),
        };
        
        setSessionData(newSession);
        setIsActive(true);
        startTimer();
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSession));
      }
    } catch (error) {
      console.error('Error initializing session:', error);
    }
  };

  const restoreTimerFromBackground = async () => {
    try {
      const storedSession = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedSession && sessionData) {
        const parsedSession: SessionData = JSON.parse(storedSession);
        const backgroundTime = Date.now() - parsedSession.startTime;
        setElapsedTime(backgroundTime / 1000);
        setSessionData(prev => prev ? { ...prev, elapsedTime: backgroundTime / 1000 } : null);
      }
    } catch (error) {
      console.error('Error restoring timer:', error);
    }
  };

  const startTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setElapsedTime(prev => {
        const newTime = prev + 1;
        // Update session data periodically
        setSessionData(current => current ? { ...current, elapsedTime: newTime } : null);
        return newTime;
      });
    }, 1000);
  };

  const saveSessionToStorage = async () => {
    if (sessionData) {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({
          ...sessionData,
          elapsedTime,
        }));
      } catch (error) {
        console.error('Error saving session:', error);
      }
    }
  };

  const updateSetData = (exerciseIndex: number, setIndex: number, field: 'reps' | 'weight', value: string) => {
    if (!sessionData) return;
    
    const numValue = field === 'reps' ? parseInt(value) || 0 : parseFloat(value) || 0;
    
    setSessionData(prev => {
      if (!prev) return null;
      
      const updatedExercises = [...prev.exercises];
      updatedExercises[exerciseIndex].completedSets[setIndex] = {
        ...updatedExercises[exerciseIndex].completedSets[setIndex],
        [field]: numValue,
      };
      
      return { ...prev, exercises: updatedExercises };
    });
  };

  const toggleSetCompletion = (exerciseIndex: number, setIndex: number) => {
    if (!sessionData) return;
    
    setSessionData(prev => {
      if (!prev) return null;
      
      const updatedExercises = [...prev.exercises];
      updatedExercises[exerciseIndex].completedSets[setIndex].completed = 
        !updatedExercises[exerciseIndex].completedSets[setIndex].completed;
      
      return { ...prev, exercises: updatedExercises };
    });
  };

  const finishWorkout = async () => {
    if (!sessionData) return;
    
    Alert.alert(
      'Finish Workout',
      'Are you sure you want to finish this workout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Finish',
          onPress: async () => {
            try {
              // Stop timer
              if (intervalRef.current) {
                clearInterval(intervalRef.current);
              }
              setIsActive(false);
              
              // Create completed workout
              const completedWorkout: StoreTypes.CompletedWorkout = {
                id: `session_${Date.now()}`,
                planId: sessionData.planId,
                name: sessionData.planName,
                dateCompleted: new Date().toISOString(),
                duration: elapsedTime,
                exercises: sessionData.exercises,
                syncStatus: 'pending',
              };
              
              // Save to Redux
              dispatch(addCompletedWorkout(completedWorkout));
              
              // Clear session storage
              await AsyncStorage.removeItem(STORAGE_KEY);
              
              // Navigate to History tab
              navigation.navigate('WorkoutHistory');
            } catch (error) {
              console.error('Error finishing workout:', error);
              Alert.alert('Error', 'Failed to save workout. Please try again.');
            }
          },
        },
      ]
    );
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);
    
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!sessionData) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No Active Workout</Text>
        <Text style={styles.subtitle}>Please select a workout plan from the Planner tab to start a session.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with timer and workout name */}
      <View style={styles.header}>
        <Text style={styles.workoutName}>{sessionData.planName}</Text>
        <Text style={styles.timer}>{formatTime(elapsedTime)}</Text>
        <Text style={styles.status}>{isActive ? 'Active' : 'Paused'}</Text>
      </View>

      {/* Exercise list */}
      <ScrollView style={styles.exerciseList} showsVerticalScrollIndicator={false}>
        {sessionData.exercises.map((exercise, exerciseIndex) => (
          <View key={exercise.id} style={styles.exerciseCard}>
            <Text style={styles.exerciseName}>{exercise.name}</Text>
            <Text style={styles.exerciseCategory}>{exercise.category}</Text>
            
            {/* Sets */}
            <View style={styles.setsContainer}>
              <View style={styles.setHeader}>
                <Text style={styles.setHeaderText}>Set</Text>
                <Text style={styles.setHeaderText}>Reps</Text>
                <Text style={styles.setHeaderText}>Weight</Text>
                <Text style={styles.setHeaderText}>✓</Text>
              </View>
              
              {exercise.completedSets.map((set, setIndex) => (
                <View key={setIndex} style={styles.setRow}>
                  <Text style={styles.setNumber}>{setIndex + 1}</Text>
                  
                  <TextInput
                    style={styles.setInput}
                    value={set.reps.toString()}
                    onChangeText={(value) => updateSetData(exerciseIndex, setIndex, 'reps', value)}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                  
                  <TextInput
                    style={styles.setInput}
                    value={set.weight?.toString() || '0'}
                    onChangeText={(value) => updateSetData(exerciseIndex, setIndex, 'weight', value)}
                    keyboardType="numeric"
                    placeholder="0"
                  />
                  
                  <TouchableOpacity
                    style={[styles.checkButton, set.completed && styles.checkButtonCompleted]}
                    onPress={() => toggleSetCompletion(exerciseIndex, setIndex)}
                  >
                    <Text style={[styles.checkButtonText, set.completed && styles.checkButtonTextCompleted]}>
                      {set.completed ? '✓' : '○'}
                    </Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            
            {exercise.rest && (
              <Text style={styles.restTime}>Rest: {exercise.rest}s</Text>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Finish button */}
      <TouchableOpacity style={styles.finishButton} onPress={finishWorkout}>
        <Text style={styles.finishButtonText}>Finish Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    alignItems: 'center',
  },
  workoutName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  timer: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    fontFamily: 'monospace',
  },
  status: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 4,
  },
  exerciseList: {
    flex: 1,
    padding: 16,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  setsContainer: {
    marginTop: 8,
  },
  setHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 8,
  },
  setHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    flex: 1,
    textAlign: 'center',
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  setNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  setInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 8,
    textAlign: 'center',
    marginHorizontal: 4,
  },
  checkButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 4,
  },
  checkButtonCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  checkButtonText: {
    fontSize: 16,
    color: '#666',
  },
  checkButtonTextCompleted: {
    color: 'white',
  },
  restTime: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
  finishButton: {
    backgroundColor: '#4CAF50',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  finishButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 32,
  },
});

export default WorkoutSessionScreen;