import AsyncStorage from "@react-native-async-storage/async-storage";
import { Reducer } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";

export const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["workouts", "exercises"],
  transforms: [],
  migrate: (state: any) => {
    return Promise.resolve(state);
  },
  debug: __DEV__,
};

export const createPersistedReducer = (rootReducer: Reducer) =>
  persistReducer(persistConfig, rootReducer);
