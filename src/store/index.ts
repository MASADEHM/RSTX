import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import companySetupReducer from './slices/companySetupSlice';



export const store = configureStore({
  reducer: {
    companySetup: companySetupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>(); 