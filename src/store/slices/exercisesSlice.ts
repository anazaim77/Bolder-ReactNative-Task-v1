import { StoreTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadDummyExercisesIfEmpty } from "@/utils/dummyDataLoader";

const initialState: StoreTypes.ExercisesState = {
  exercises: [],
  // Categories can be derived or managed separately if needed
};

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<StoreTypes.Exercise>) => {
      state.exercises.push(action.payload);
    },
    updateExercise: (state, action: PayloadAction<StoreTypes.Exercise>) => {
      const index = state.exercises.findIndex(
        (ex) => ex.id === action.payload.id
      );
      if (index !== -1) {
        state.exercises[index] = action.payload;
      }
    },
    deleteExercise: (state, action: PayloadAction<string>) => {
      state.exercises = state.exercises.filter(
        (ex) => ex.id !== action.payload
      );
    },
    setExerciseSyncStatus: (
      state,
      action: PayloadAction<{ id: string; syncStatus: StoreTypes.SyncStatus }>
    ) => {
      const exercise = state.exercises.find(
        (ex) => ex.id === action.payload.id
      );
      if (exercise) {
        exercise.syncStatus = action.payload.syncStatus;
      }
    },
    setExercises: (state, action: PayloadAction<StoreTypes.Exercise[]>) => {
      state.exercises = action.payload;
    },
    setDummyExercisesIfEmpty: (state) => {
      state.exercises = loadDummyExercisesIfEmpty(state.exercises);
    },
  },
});

export const {
  addExercise,
  updateExercise,
  deleteExercise,
  setExerciseSyncStatus,
  setExercises,
  setDummyExercisesIfEmpty,
} = exercisesSlice.actions;

export default exercisesSlice.reducer;
