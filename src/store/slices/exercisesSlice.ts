import { StateTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StateTypes.ExercisesState = {
  exercises: [],
  categories: [],
};

export const exercisesSlice = createSlice({
  name: "exercises",
  initialState,
  reducers: {
    addExercise: (state, action: PayloadAction<StateTypes.ExerciseItem>) => {
      state.exercises.push(action.payload);
    },
    addCategory: (
      state,
      action: PayloadAction<StateTypes.ExerciseCategory>
    ) => {
      state.categories.push(action.payload);
    },
    setExercises: (state, action: PayloadAction<StateTypes.ExerciseItem[]>) => {
      state.exercises = action.payload;
    },
    setCategories: (
      state,
      action: PayloadAction<StateTypes.ExerciseItem[]>
    ) => {
      state.categories = action.payload;
    },
  },
});

export const { addExercise, addCategory, setExercises, setCategories } =
  exercisesSlice.actions;
export default exercisesSlice.reducer;
