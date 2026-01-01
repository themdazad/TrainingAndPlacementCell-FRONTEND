import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

//redux-persist
const persistConfig = {
  key: "auth",
  storage: storage,
  whitelist: ["token", "user", "isAuthenticated"], // only 'token' and 'user' will be persisted
  stateReconciler: autoMergeLevel2, // Deep merge ke liye
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
// redux store configuration
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer, // 'auth' key will be managed by persistedAuthReducer
  },
  // Serializability check error se bachne ke liye ye zaroori hai
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Persistor creation
export const persistor = persistStore(store);
