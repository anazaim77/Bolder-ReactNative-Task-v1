import { StoreTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StoreTypes.ExercisesState = {
  exercises: [],
  categories: [],
};

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<StoreTypes.ExerciseItem>) => {
      state.exercises.push(action.payload);
    },
    addCategory: (
      state,
      action: PayloadAction<StoreTypes.ExerciseCategory>
    ) => {
      state.categories.push(action.payload);
    },
    setExercises: (state, action: PayloadAction<StoreTypes.ExerciseItem[]>) => {
      state.exercises = action.payload;
    },
    setCategories: (
      state,
      action: PayloadAction<StoreTypes.ExerciseItem[]>
    ) => {
      state.categories = action.payload;
    },
  },
});

export const { addExercise, addCategory, setExercises, setCategories } =
  exercisesSlice.actions;
export default exercisesSlice.reducer;
