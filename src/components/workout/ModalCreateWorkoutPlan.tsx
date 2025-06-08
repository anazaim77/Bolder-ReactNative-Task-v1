import React, { useState, useMemo, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  addWorkoutPlan,
  setWorkoutSyncStatus,
} from "@/store/slices/workoutsSlice";
import { RootState, AppDispatch } from "@/store";
import { StoreTypes } from "@/types";


// Define Zod schema for workout plan form
const workoutPlanSchema = z.object({
  name: z.string().min(1, "Workout name is required"),
});

type WorkoutPlanFormData = z.infer<typeof workoutPlanSchema>;

interface ModalCreateWorkoutPlanProps {
  visible: boolean;
  onClose: () => void;
}

const ModalCreateWorkoutPlan: React.FC<ModalCreateWorkoutPlanProps> = ({
  visible,
  onClose,
}) => {
  const dispatch: AppDispatch = useDispatch();
  const allExercises = useSelector(
    (state: RootState) => state.exercises.exercises
  ) || []; // Provide fallback empty array

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<WorkoutPlanFormData>({
    resolver: zodResolver(workoutPlanSchema),
    defaultValues: {
      name: "",
    },
  });

  const [selectedExercises, setSelectedExercises] = useState<
    StoreTypes.WorkoutPlanExercise[]
  >([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);



  const filteredExercises = useMemo(() => {
    return allExercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allExercises, searchTerm]);

  const handleAddExerciseToPlan = useCallback((exercise: StoreTypes.Exercise) => {
    // Prevent duplicate exercises
    setSelectedExercises((prev) => {
      const isAlreadySelected = prev.some(ex => ex.id === exercise.id);
      if (isAlreadySelected) {
        Alert.alert("Exercise Already Added", "This exercise is already in your plan.");
        return prev;
      }
      return [...prev, { ...exercise, sets: 3, reps: 10 }];
    });
  }, []);

  const handleRemoveExerciseFromPlan = useCallback((exerciseId: string) => {
    setSelectedExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
  }, []);

  const handleUpdateExercise = useCallback((exerciseId: string, field: 'sets' | 'reps', value: number) => {
    setSelectedExercises((prev) => 
      prev.map(ex => 
        ex.id === exerciseId 
          ? { ...ex, [field]: Math.max(1, value) } // Ensure minimum value of 1
          : ex
      )
    );
  }, []);

  const onSubmit: SubmitHandler<WorkoutPlanFormData> = async (data) => {
    if (selectedExercises.length === 0) {
      Alert.alert(
        "No Exercises",
        "Please add at least one exercise to the plan."
      );
      return;
    }

    setIsSubmitting(true);
    
    try {
      const newPlan = {
        id: `plan-${Date.now().toString()}`,
        name: data.name.trim(),
        exercises: selectedExercises.map((ex) => ({
          ...ex,
          sets: ex.sets || 1,
          reps: ex.reps || 1,
        })),
        syncStatus: "pending" as "pending" | "success" | "error",
      };
      
      dispatch(addWorkoutPlan(newPlan));
      
      // Simulate API call with proper error handling
      setTimeout(() => {
        dispatch(setWorkoutSyncStatus({ id: newPlan.id, syncStatus: "success" }));
      }, 2000);

      // Reset form and close modal
      reset();
      setSelectedExercises([]);
      setSearchTerm("");
      setIsSubmitting(false);
      onClose();
      Alert.alert("Success", "Workout plan created successfully!");
    } catch (error) {
      setIsSubmitting(false);
      Alert.alert("Error", "Failed to create workout plan. Please try again.");
    }
  };

  const handleClose = useCallback(() => {
    if (isSubmitting) return; // Prevent closing while submitting
    
    // Show confirmation if user has unsaved changes
    if (selectedExercises.length > 0 || searchTerm.trim()) {
      Alert.alert(
        "Discard Changes?",
        "You have unsaved changes. Are you sure you want to close?",
        [
          { text: "Cancel", style: "cancel" },
          { 
            text: "Discard", 
            style: "destructive",
            onPress: () => {
              reset();
              setSelectedExercises([]);
              setSearchTerm("");
              onClose();
            }
          },
        ]
      );
    } else {
      reset();
      setSelectedExercises([]);
      setSearchTerm("");
      onClose();
    }
  }, [isSubmitting, selectedExercises.length, searchTerm, reset, onClose]);



  const renderExerciseItem = useCallback(({ item }: { item: StoreTypes.Exercise }) => (
    <TouchableOpacity
      style={styles.exerciseItem}
      onPress={() => handleAddExerciseToPlan(item)}
      accessibilityRole="button"
      accessibilityLabel={`Add ${item.name} to workout plan`}
    >
      <View>
        <Text style={styles.exerciseName}>{item.name}</Text>
        <Text style={styles.exerciseCategory}>{item.category}</Text>
      </View>
    </TouchableOpacity>
  ), [handleAddExerciseToPlan]);

  const renderSelectedExercise = useCallback((ex: StoreTypes.WorkoutPlanExercise) => (
    <View key={ex.id} style={styles.selectedExerciseItem}>
      <View style={styles.exerciseInfo}>
        <Text style={styles.selectedExerciseName}>{ex.name}</Text>
        <View style={styles.exerciseControls}>
          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Sets:</Text>
            <View style={styles.numberInputContainer}>
              <TouchableOpacity 
                style={styles.numberButton}
                onPress={() => handleUpdateExercise(ex.id, 'sets', ex.sets - 1)}
                disabled={ex.sets <= 1}
              >
                <Text style={styles.numberButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.numberValue}>{ex.sets}</Text>
              <TouchableOpacity 
                style={styles.numberButton}
                onPress={() => handleUpdateExercise(ex.id, 'sets', ex.sets + 1)}
              >
                <Text style={styles.numberButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.controlGroup}>
            <Text style={styles.controlLabel}>Reps:</Text>
            <View style={styles.numberInputContainer}>
              <TouchableOpacity 
                style={styles.numberButton}
                onPress={() => handleUpdateExercise(ex.id, 'reps', ex.reps - 1)}
                disabled={ex.reps <= 1}
              >
                <Text style={styles.numberButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.numberValue}>{ex.reps}</Text>
              <TouchableOpacity 
                style={styles.numberButton}
                onPress={() => handleUpdateExercise(ex.id, 'reps', ex.reps + 1)}
              >
                <Text style={styles.numberButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveExerciseFromPlan(ex.id)}
        accessibilityRole="button"
        accessibilityLabel={`Remove ${ex.name} from workout plan`}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  ), [handleUpdateExercise, handleRemoveExerciseFromPlan]);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={handleClose}
    >
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Create Workout Plan</Text>
          <TouchableOpacity 
            style={styles.cancelButton}
            onPress={handleClose}
            disabled={isSubmitting}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <Controller
            control={control}
            name="name"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Workout Plan Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.name && (
            <Text style={styles.errorText}>{errors.name.message}</Text>
          )}

          <Text style={styles.subHeader}>Add Exercises:</Text>
          <TextInput
            style={styles.input}
            placeholder="Search exercises..."
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <FlatList
            style={styles.exerciseList}
            data={filteredExercises.slice(0, 8)}
            keyExtractor={(item) => item.id}
            renderItem={renderExerciseItem}
            ListEmptyComponent={
              <Text style={styles.emptyText}>
                {searchTerm ? 'No exercises match your search.' : 'No exercises available.'}
              </Text>
            }
            scrollEnabled={false}
          />

          <Text style={styles.subHeader}>
            Selected Exercises ({selectedExercises.length})
          </Text>
          {selectedExercises.length === 0 ? (
            <Text style={styles.placeholderText}>No exercises added yet.</Text>
          ) : (
            selectedExercises.map(renderSelectedExercise)
          )}

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.createButton, isSubmitting && styles.createButtonDisabled]}
              onPress={handleSubmit(onSubmit)}
              disabled={isSubmitting || selectedExercises.length === 0}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.createButtonText}>Create Plan</Text>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#212529",
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#6c757d",
  },
  cancelButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  content: {
    flex: 1,
    padding: 16,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#495057",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  errorText: {
    color: "#dc3545",
    fontSize: 14,
    marginTop: 6,
    fontWeight: "500",
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 24,
    marginBottom: 12,
    color: "#343a40",
  },

  exerciseList: {
    maxHeight: 240,
    marginBottom: 16,
  },
  exerciseItem: {
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e9ecef",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 4,
  },
  exerciseCategory: {
    fontSize: 14,
    color: "#6c757d",
    textTransform: "capitalize",
  },
  selectedExerciseItem: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#28a745",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    padding: 16,
  },
  exerciseInfo: {
    flex: 1,
  },
  selectedExerciseName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginBottom: 12,
  },
  exerciseControls: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  controlGroup: {
    flex: 1,
    marginHorizontal: 8,
  },
  controlLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#495057",
    marginBottom: 8,
    textAlign: "center",
  },
  numberInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 4,
  },
  numberButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#007bff",
    justifyContent: "center",
    alignItems: "center",
  },
  numberButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  numberValue: {
    fontSize: 16,
    fontWeight: "600",
    color: "#212529",
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "#dc3545",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignSelf: "flex-end",
  },
  removeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
  },
  placeholderText: {
    fontStyle: "italic",
    color: "#6c757d",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
  emptyText: {
    color: "#6c757d",
    textAlign: "center",
    marginVertical: 16,
    fontSize: 16,
    fontStyle: "italic",
  },
  footer: {
    marginTop: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  createButton: {
    backgroundColor: "#28a745",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonDisabled: {
    backgroundColor: "#6c757d",
    opacity: 0.7,
  },
  createButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default ModalCreateWorkoutPlan;
