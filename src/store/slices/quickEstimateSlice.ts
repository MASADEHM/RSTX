import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QuickEstimate {
  id: string;
  businessType: string;
  licenseType: string;
  numberOfPartners: number;
  estimatedCost: number;
  createdAt: string;
  status: 'draft' | 'saved' | 'submitted';
}

interface QuickEstimateState {
  estimates: QuickEstimate[];
  currentEstimate: QuickEstimate | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuickEstimateState = {
  estimates: [],
  currentEstimate: null,
  loading: false,
  error: null,
};

const quickEstimateSlice = createSlice({
  name: 'quickEstimate',
  initialState,
  reducers: {
    setCurrentEstimate: (state, action: PayloadAction<Partial<QuickEstimate>>) => {
      state.currentEstimate = {
        ...state.currentEstimate,
        ...action.payload,
      } as QuickEstimate;
    },
    saveEstimate: (state, action: PayloadAction<QuickEstimate>) => {
      const index = state.estimates.findIndex(est => est.id === action.payload.id);
      if (index !== -1) {
        state.estimates[index] = action.payload;
      } else {
        state.estimates.push(action.payload);
      }
    },
    deleteEstimate: (state, action: PayloadAction<string>) => {
      state.estimates = state.estimates.filter(est => est.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    clearCurrentEstimate: (state) => {
      state.currentEstimate = null;
    },
  },
});

export const {
  setCurrentEstimate,
  saveEstimate,
  deleteEstimate,
  setLoading,
  setError,
  clearCurrentEstimate,
} = quickEstimateSlice.actions;

export default quickEstimateSlice.reducer; 