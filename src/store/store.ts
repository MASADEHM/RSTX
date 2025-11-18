import { configureStore } from '@reduxjs/toolkit';
import quickEstimateReducer from './slices/quickEstimateSlice';
import companySetupReducer from './slices/companySetupSlice';

export const store = configureStore({
  reducer: {
    quickEstimate: quickEstimateReducer,
    companySetup: companySetupReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 