import {
  configureStore,
  combineReducers,
  StoreEnhancer,
} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";

// Root reducer
const rootReducer = combineReducers({
  // Add your reducers here
});

// Persist configuration
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Store configuration
const store = configureStore({
  reducer: persistedReducer,
  enhancers: (getDefaultEnhancers) =>
    getDefaultEnhancers().concat(offline(offlineConfig) as StoreEnhancer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export { store, persistor };
