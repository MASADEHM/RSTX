import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Manager } from "../../interfaces/company.interface"; // adjust path as needed

export interface CompanyDetails {
  id: string;
  // Basic Information
  companyName: string;
  tradeName: string;
  businessType: string;
  licenseType: string;
  legalStructure: string;

  // Location Details
  officeLocation: string;
  officeType: string;
  officeSize: number;

  // Shareholder Information
  shareholders: {
    id: string;
    name: string;
    emiratesId:string,
    nationality: string;
    sharePercentage: number;
    passportNumber: string;
    visaType?: string;
  }[];
  // Manger information
  manager: Manager | null;

  // Business Activities
  mainActivities: string[];
  secondaryActivities: string[];

  // Financial Information
  capitalAmount: number;
  currency: string;

  // Documents
  documents: {
    id: string;
    type: string;
    name: string;
    status: "pending" | "uploaded" | "approved" | "rejected";
    url?: string;
  }[];

  // Status and Progress
  status: "draft" | "in_progress" | "submitted" | "approved" | "rejected";
  currentStep: number;
  progress: number;

  // Step Data
  stepData: {
    [key: number]: {
      data: any;
      isValid: boolean;
      isVisited: boolean;
    };
  };

  // Timestamps
  createdAt: string;
  updatedAt: string;
  submittedAt?: string;
}

interface CompanySetupState {
  currentCompany: CompanyDetails | null;
  savedCompanies: CompanyDetails[];
  loading: boolean;
  error: string | null;
  stepValidation: {
    [key: number]: boolean;
  };
  totalSteps: number;
  quickEstimate?: any;
}

const initialState: CompanySetupState = {
  currentCompany: null,
  savedCompanies: [],
  loading: false,
  error: null,
  stepValidation: {},
  totalSteps: 5, // Adjust based on your total number of steps
  quickEstimate: undefined,
};

const companySetupSlice = createSlice({
  name: "companySetup",
  initialState,
  reducers: {
    // Initialize new company setup
    initializeCompany: (
      state,
      action: PayloadAction<Partial<CompanyDetails>>
    ) => {
      state.currentCompany = {
        id: crypto.randomUUID(),
        companyName: "",
        tradeName: "",
        businessType: "",
        licenseType: "",
        legalStructure: "",
        officeLocation: "",
        officeType: "",
        officeSize: 0,
        shareholders: [],
        mainActivities: [],
        secondaryActivities: [],
        capitalAmount: 0,
        currency: "AED",
        documents: [],
        status: "draft",
        currentStep: 1,
        progress: 0,
        stepData: {},
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        manager: null,
        ...action.payload,
      };
    },

    // Update current company details
    updateCompanyDetails: (
      state,
      action: PayloadAction<Partial<CompanyDetails>>
    ) => {
      if (state.currentCompany) {
        state.currentCompany = {
          ...state.currentCompany,
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },

    // Update step data
    updateStepData: (
      state,
      action: PayloadAction<{ step: number; data: any; isValid: boolean }>
    ) => {
      if (state.currentCompany) {
        const { step, data, isValid } = action.payload;
        state.currentCompany.stepData[step] = {
          data,
          isValid,
          isVisited: true,
        };

        // Update progress
        const totalValidSteps = Object.values(
          state.currentCompany.stepData
        ).filter((stepData) => stepData.isValid).length;
        state.currentCompany.progress =
          (totalValidSteps / state.totalSteps) * 100;
      }
    },

    // Navigate to step
    navigateToStep: (state, action: PayloadAction<number>) => {
      if (
        state.currentCompany &&
        action.payload >= 1 &&
        action.payload <= state.totalSteps
      ) {
        state.currentCompany.currentStep = action.payload;
      }
    },

    // Move to next step
    nextStep: (state) => {
      if (
        state.currentCompany &&
        state.currentCompany.currentStep < state.totalSteps
      ) {
        state.currentCompany.currentStep += 1;
      }
    },

    // Move to previous step
    previousStep: (state) => {
      if (state.currentCompany && state.currentCompany.currentStep > 1) {
        state.currentCompany.currentStep -= 1;
      }
    },

    // Add or update shareholder
    updateShareholder: (
      state,
      action: PayloadAction<{
        id?: string;
        shareholder: CompanyDetails["shareholders"][0];
      }>
    ) => {
      if (state.currentCompany) {
        const { id, shareholder } = action.payload;
        if (id) {
          const index = state.currentCompany.shareholders.findIndex(
            (s) => s.id === id
          );
          if (index !== -1) {
            state.currentCompany.shareholders[index] = { ...shareholder, id };
          }
        } else {
          state.currentCompany.shareholders.push({
            ...shareholder,
            id: crypto.randomUUID(),
          });
        }
      }
    },

    // Remove shareholder
    removeShareholder: (state, action: PayloadAction<string>) => {
      if (state.currentCompany) {
        state.currentCompany.shareholders =
          state.currentCompany.shareholders.filter(
            (s) => s.id !== action.payload
          );
      }
    },

    // Update document status
    updateDocumentStatus: (
      state,
      action: PayloadAction<{
        id: string;
        status: CompanyDetails["documents"][0]["status"];
        url?: string;
      }>
    ) => {
      if (state.currentCompany) {
        const { id, status, url } = action.payload;
        const doc = state.currentCompany.documents.find((d) => d.id === id);
        if (doc) {
          doc.status = status;
          if (url) doc.url = url;
        }
      }
    },

    // Save company
    saveCompany: (state, action: PayloadAction<CompanyDetails>) => {
      const index = state.savedCompanies.findIndex(
        (c) => c.id === action.payload.id
      );
      if (index !== -1) {
        state.savedCompanies[index] = action.payload;
      } else {
        state.savedCompanies.push(action.payload);
      }
    },

    // Delete company
    deleteCompany: (state, action: PayloadAction<string>) => {
      state.savedCompanies = state.savedCompanies.filter(
        (c) => c.id !== action.payload
      );
    },

    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    // Set error state
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear current company
    clearCurrentCompany: (state) => {
      state.currentCompany = null;
    },

    // Set quick estimate data
    setQuickEstimate: (state, action: PayloadAction<any>) => {
      if (state.currentCompany) {
        state.currentCompany.stepData[1] = {
          data: action.payload,
          isValid: true,
          isVisited: true,
        };
      }
    },
  },
});

// Add selectors
export const selectStepData = (state: RootState, step: number) =>
  state.companySetup.currentCompany?.stepData[step]?.data || null;

export const selectIsStepValid = (state: RootState, step: number) =>
  state.companySetup.currentCompany?.stepData[step]?.isValid || false;

export const {
  initializeCompany,
  updateCompanyDetails,
  updateStepData,
  navigateToStep,
  nextStep,
  previousStep,
  updateShareholder,
  removeShareholder,
  updateDocumentStatus,
  saveCompany,
  deleteCompany,
  setLoading,
  setError,
  clearCurrentCompany,
  setQuickEstimate,
} = companySetupSlice.actions;

export default companySetupSlice.reducer;
