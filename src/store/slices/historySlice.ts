import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreTypes } from "@/types";

const initialState: StoreTypes.HistoryState = {
  completedWorkouts: [],
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addCompletedWorkout: (
      state,
      action: PayloadAction<StoreTypes.CompletedWorkout>
    ) => {
      state.completedWorkouts.push(action.payload);
    },
    setCompletedWorkoutSyncStatus: (
      state,
      action: PayloadAction<{ id: string; syncStatus: StoreTypes.SyncStatus }>
    ) => {
      const workout = state.completedWorkouts.find(
        (w) => w.id === action.payload.id
      );
      if (workout) {
        workout.syncStatus = action.payload.syncStatus;
      }
    },
    // Future reducers for updating/deleting history can be added here
  },
});

export const { addCompletedWorkout, setCompletedWorkoutSyncStatus } =
  historySlice.actions;

export default historySlice.reducer;
