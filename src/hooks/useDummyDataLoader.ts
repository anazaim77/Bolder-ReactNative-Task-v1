import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { setDummyExercisesIfEmpty } from "@/store/slices/exercisesSlice";
import { setDummyWorkoutPlansIfEmpty } from "@/store/slices/workoutsSlice";
import { isStateEmpty } from "@/utils/dummyDataLoader";

/**
 * Custom hook that automatically loads dummy data when the app starts
 * if both exercises and workout plans are empty
 */
export const useDummyDataLoader = () => {
  const dispatch: AppDispatch = useDispatch();
  const exercises = useSelector(
    (state: RootState) => state.exercises.exercises
  );
  const workoutPlans = useSelector(
    (state: RootState) => state.workouts.workoutPlans
  );

  useEffect(() => {
    // Only load dummy data if both exercises and workout plans are empty
    if (isStateEmpty(exercises, workoutPlans)) {
      console.log("Loading dummy data on app initialization...");
      Promise.all([
        dispatch(setDummyExercisesIfEmpty()),
        dispatch(setDummyWorkoutPlansIfEmpty()),
      ]);
    }
  }, [dispatch, exercises, workoutPlans]);

  return {
    isDataLoaded: !isStateEmpty(exercises, workoutPlans),
    exercisesCount: exercises.length,
    workoutPlansCount: workoutPlans.length,
  };
};

/**
 * Hook to manually trigger dummy data loading
 * Useful for development or reset functionality
 */
export const useManualDummyDataLoader = () => {
  const dispatch: AppDispatch = useDispatch();

  const loadDummyData = async () => {
    console.log("Manually loading dummy data...");
    await Promise.all([
      dispatch(setDummyExercisesIfEmpty()),
      dispatch(setDummyWorkoutPlansIfEmpty()),
    ]);
  };

  return { loadDummyData };
};
