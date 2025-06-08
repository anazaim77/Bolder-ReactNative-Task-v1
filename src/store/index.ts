import { StoreTypes } from "@/types";
import {
  combineReducers,
  configureStore,
  StoreEnhancer,
} from "@reduxjs/toolkit";
import offlineMiddleware from "./middleware/offline";
import { createPersistedReducer } from "./middleware/persistence";
import exercisesReducer from "./slices/exercisesSlice";
import offlineReducer from "./slices/offlineSlice";
import workoutsReducer from "./slices/workoutsSlice";
import authReducer from "./slices/authSlice";
import { persistStore } from "redux-persist";
import { useDispatch } from "react-redux";

const rootReducer = combineReducers({
  workouts: workoutsReducer,
  offline: offlineReducer,
  exercises: exercisesReducer,
  auth: authReducer,
});

const persistedReducer = createPersistedReducer(rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(offlineMiddleware as StoreEnhancer),
});

export const persistor = persistStore(store);

export interface RootState {
  workouts: StoreTypes.WorkoutsState;
  offline: StoreTypes.OfflineState;
  exercises: StoreTypes.ExercisesState;
  auth: StoreTypes.AuthState;
}

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch<AppDispatch>;
