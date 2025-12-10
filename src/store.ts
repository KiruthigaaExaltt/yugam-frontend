// store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './components/examplePostApi/exampleCounterSlice';

import { api } from './api'; // ONLY THIS api slice for all injected endpoints

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 1. Combine reducers
const rootReducer = combineReducers({
  counter: counterReducer,

  // RTK Query main reducer (ONLY once)
  [api.reducerPath]: api.reducer,
});

// 2. Persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter'], // only persist counter
};

// 3. Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }).concat(api.middleware), // ONLY once
});

// 5. Persistor
export const persistor = persistStore(store);

// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
