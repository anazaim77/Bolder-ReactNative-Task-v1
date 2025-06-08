import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Slices - will be created later or imported if they exist
import authReducer from './slices/authSlice';
// import workoutsReducer from './slices/workouts'; 
// import exercisesReducer from './slices/exercises';
// import offlineReducer from './slices/offline';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Persist only the auth slice for now
};

const rootReducer = combineReducers({
  auth: authReducer,
  // workouts: workoutsReducer,
  // exercises: exercisesReducer,
  // offline: offlineReducer,
  // Add other reducers here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;