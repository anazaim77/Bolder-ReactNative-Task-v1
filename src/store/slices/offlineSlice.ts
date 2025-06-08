import { StoreTypes } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: StoreTypes.OfflineState = {
  isOnline: true,
  outbox: [],
};

export const offlineSlice = createSlice({
  name: "offline",
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.isOnline = action.payload;
    },
    addToOutbox: (state, action: PayloadAction<StoreTypes.OutboxItem>) => {
      state.outbox.push(action.payload);
    },
    removeFromOutbox: (state, action: PayloadAction<string>) => {
      state.outbox = state.outbox.filter((item) => item.id !== action.payload);
    },
    incrementRetry: (state, action: PayloadAction<string>) => {
      const item = state.outbox.find((item) => item.id === action.payload);
      if (item) {
        item.retries = (item.retries || 0) + 1;
      }
    },
  },
});

export const {
  setOnlineStatus,
  addToOutbox,
  removeFromOutbox,
  incrementRetry,
} = offlineSlice.actions;
export default offlineSlice.reducer;
