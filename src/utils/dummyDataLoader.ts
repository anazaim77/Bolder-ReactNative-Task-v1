import dummyData from '@/data/dummyData.json';
import { StoreTypes } from '@/types';

/**
 * Interface for the dummy data structure
 */
interface DummyData {
  exercises: StoreTypes.Exercise[];
  workoutPlans: StoreTypes.WorkoutPlan[];
}

/**
 * Loads dummy exercises if the current exercises array is empty
 * @param currentExercises - Current exercises from Redux state
 * @returns Array of exercises (current or dummy)
 */
export const loadDummyExercisesIfEmpty = (
  currentExercises: StoreTypes.Exercise[]
): StoreTypes.Exercise[] => {
  if (currentExercises.length === 0) {
    console.log('Loading dummy exercises - local state is empty');
    return (dummyData as DummyData).exercises;
  }
  return currentExercises;
};

/**
 * Loads dummy workout plans if the current workout plans array is empty
 * @param currentWorkoutPlans - Current workout plans from Redux state
 * @returns Array of workout plans (current or dummy)
 */
export const loadDummyWorkoutPlansIfEmpty = (
  currentWorkoutPlans: StoreTypes.WorkoutPlan[]
): StoreTypes.WorkoutPlan[] => {
  if (currentWorkoutPlans.length === 0) {
    console.log('Loading dummy workout plans - local state is empty');
    return (dummyData as DummyData).workoutPlans;
  }
  return currentWorkoutPlans;
};

/**
 * Gets all dummy data
 * @returns Complete dummy data object
 */
export const getDummyData = (): DummyData => {
  return dummyData as DummyData;
};

/**
 * Checks if the current state is empty (both exercises and workout plans)
 * @param exercises - Current exercises array
 * @param workoutPlans - Current workout plans array
 * @returns True if both arrays are empty
 */
export const isStateEmpty = (
  exercises: StoreTypes.Exercise[],
  workoutPlans: StoreTypes.WorkoutPlan[]
): boolean => {
  return exercises.length === 0 && workoutPlans.length === 0;
};

/**
 * Loads complete dummy data if state is empty
 * @param currentState - Current state with exercises and workout plans
 * @returns State with dummy data loaded if empty, otherwise current state
 */
export const loadDummyDataIfEmpty = (currentState: {
  exercises: StoreTypes.Exercise[];
  workoutPlans: StoreTypes.WorkoutPlan[];
}): {
  exercises: StoreTypes.Exercise[];
  workoutPlans: StoreTypes.WorkoutPlan[];
} => {
  const { exercises, workoutPlans } = currentState;
  
  if (isStateEmpty(exercises, workoutPlans)) {
    console.log('Loading complete dummy data - state is empty');
    const dummy = getDummyData();
    return {
      exercises: dummy.exercises,
      workoutPlans: dummy.workoutPlans,
    };
  }
  
  return currentState;
};