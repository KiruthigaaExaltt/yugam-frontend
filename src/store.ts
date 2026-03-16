// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import counterReducer from './components/examplePostApi/exampleCounterSlice';

import { api } from './api'; // ONLY THIS api slice for all injected endpoints
import authReducer from './components/login/authSlice';

// 1. Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,

  // RTK Query main reducer (ONLY once)
  [api.reducerPath]: api.reducer,
});

// 2. Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // keep for any non-serializable data
    }).concat(api.middleware), // ONLY once
});

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
