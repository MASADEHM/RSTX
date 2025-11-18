import { BusinessCategory } from './company.interface';

export interface CostEstimationData {
    businessCategory: BusinessCategory | null;
    numberOfActivities: number;
    numberOfShareholders: number;
    hasTradeName: boolean;
    businessLocation: string;
    costs: {
        baseCost: number;
        activityCost: number;
        shareholderCost: number;
        tradeNameCost: number;
        locationCost: number;
        totalCost: number;
    };
}

export interface CostEstimationStepProps {
    data: CostEstimationData;
    onNext?: (data: Partial<CostEstimationData>) => void;
    onBack?: () => void;
} 