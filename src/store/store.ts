import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counterReducer from '@/reducers/counterReducer';
import todoReducer from '@/reducers/todoReducer';

const todoPersistConfig = {
  key: 'todo',
  storage,
  whitelist: ['todos'],
};

const counterPersistConfig = {
  key: 'counter',
  storage,
  whitelist: ['value'],
};

const TodoReducer = persistReducer(todoPersistConfig, todoReducer);
const CounterReducer = persistReducer(counterPersistConfig, counterReducer);

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    todo: TodoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
