import AsyncStorage from "@react-native-async-storage/async-storage";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import {
  combineReducers,
  configureStore,
  StoreEnhancer,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import exercisesReducer from "./slices/exercisesSlice";
import offlineReducer from "./slices/offlineSlice";
import workoutsReducer from "./slices/workoutsSlice";

const rootReducer = combineReducers({
  workouts: workoutsReducer,
  offline: offlineReducer,
  exercises: exercisesReducer,
});

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(offline(offlineConfig) as StoreEnhancer),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
