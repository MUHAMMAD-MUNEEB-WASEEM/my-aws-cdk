import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import parentReducer from './parentReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
    reducer: parentReducer,
    // middleware: getDefaultMiddleware({ serializableCheck: false }),
})

export type AppDispatch = typeof store.dispatch;
export type RootStateType = ReturnType<typeof parentReducer>;

export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;