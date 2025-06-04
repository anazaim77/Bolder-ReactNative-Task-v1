import { StateTypes } from "@/types";
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
import { persistStore } from "redux-persist";

const rootReducer = combineReducers({
  workouts: workoutsReducer,
  offline: offlineReducer,
  exercises: exercisesReducer,
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
  workouts: StateTypes.WorkoutsState;
  offline: StateTypes.OfflineState;
  exercises: StateTypes.ExercisesState;
}

export type AppDispatch = typeof store.dispatch;
