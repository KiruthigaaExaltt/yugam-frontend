// src/app/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from '../src/Slices/exampleCounterSlice';
import { apiSlice } from '../src/Slices/exampleSlice';

// Combine multiple reducers
const rootReducer = combineReducers({
  counter: counterReducer,
  [apiSlice.reducerPath]: apiSlice.reducer, // RTK Query reducer
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware), // RTK Query middleware
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
