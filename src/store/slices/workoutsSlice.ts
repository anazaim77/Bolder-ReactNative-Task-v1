import { StoreTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StoreTypes.WorkoutsState = {
  sessions: [],
  stats: {
    totalSessions: 0,
    totalDuration: 0,
  },
};

export const workoutsSlice = createSlice({
  name: "workouts",
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<StoreTypes.WorkoutSession>) => {
      state.sessions.push(action.payload);
      state.stats.totalSessions += 1;
      state.stats.totalDuration += action.payload.duration;
      state.stats.lastSessionDate = action.payload.date;
    },
    updateStats: (state, action: PayloadAction<StoreTypes.UserStats>) => {
      state.stats = action.payload;
    },
  },
});

export const { addSession, updateStats } = workoutsSlice.actions;
export default workoutsSlice.reducer;
