import { configureStore, combineReducers } from '@reduxjs/toolkit';
import counterReducer from './components/examplePostApi/exampleCounterSlice';
import { apiSlice } from './components/examplePostApi/exampleSlice';
 
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage
import { chartApi } from './components/HOC/charts/ChartSlice';
0
 
 
// 1. Combine reducers
const rootReducer = combineReducers({
 
  // RTK Query reducers
  [apiSlice.reducerPath]: apiSlice.reducer,
  [chartApi.reducerPath]: chartApi.reducer,
})
 
// 2. Persist config (choose which reducers to persist)
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['counter'], // ONLY persist counter
};
 
// 3. Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);
 
// 4. Configure store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required by redux-persist
    }).concat(apiSlice.middleware)
     .concat(chartApi.middleware),
});
 
// 5. Create the persistor
export const persistor = persistStore(store);
 
// Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
 
 