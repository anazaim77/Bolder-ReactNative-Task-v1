import { StoreTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "..";
import { loadDummyWorkoutPlansIfEmpty } from "@/utils/dummyDataLoader";

const initialState: StoreTypes.WorkoutsState = {
  workoutPlans: [],
  selectedWorkoutPlanId: null,
};

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    addWorkoutPlan: (state, action: PayloadAction<StoreTypes.WorkoutPlan>) => {
      state.workoutPlans.push(action.payload);
    },
    selectWorkoutPlan: (state, action: PayloadAction<string | null>) => {
      state.selectedWorkoutPlanId = action.payload;
    },
    updateWorkoutPlan: (
      state,
      action: PayloadAction<StoreTypes.WorkoutPlan>
    ) => {
      const index = state.workoutPlans.findIndex(
        (plan) => plan.id === action.payload.id
      );
      if (index !== -1) {
        state.workoutPlans[index] = action.payload;
      }
    },
    deleteWorkoutPlan: (state, action: PayloadAction<string>) => {
      state.workoutPlans = state.workoutPlans.filter(
        (plan) => plan.id !== action.payload
      );
      if (state.selectedWorkoutPlanId === action.payload) {
        state.selectedWorkoutPlanId = null;
      }
    },
    setWorkoutSyncStatus: (
      state,
      action: PayloadAction<{ id: string; syncStatus: StoreTypes.SyncStatus }>
    ) => {
      const workout = state.workoutPlans.find(
        (w) => w.id === action.payload.id
      );
      if (workout) {
        workout.syncStatus = action.payload.syncStatus;
      }
    },
    setDummyWorkoutPlansIfEmpty: (state) => {
      state.workoutPlans = loadDummyWorkoutPlansIfEmpty(state.workoutPlans);
    },
  },
});

export const {
  addWorkoutPlan,
  selectWorkoutPlan,
  updateWorkoutPlan,
  deleteWorkoutPlan,
  setWorkoutSyncStatus,
  setDummyWorkoutPlansIfEmpty,
} = workoutsSlice.actions;

export default workoutsSlice.reducer;

export const useWorkoutSelector = () =>
  useSelector((state: RootState) => state.workouts);
