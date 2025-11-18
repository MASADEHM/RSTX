export interface BusinessCategory {
    id: number;
    name: string;
    description?: string;
}

export interface TradeName {
    hasReservedName: boolean;
    reservedNameDocument?: File;
    suggestedNames: string[];
}

export interface Shareholder {
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    sharePercentage: number;
    isUaeResident?: boolean;
    emiratesId?: string;
    passportNumber?: string;
    countryCode?: string;
    passportCopyFile?: File;
}

export interface Manager {
    name: string;
    email: string;
    phone: string;
    isUaeResident: boolean;
    emiratesId?: string;
    passportNumber?: string;
    passportExpiry?: string;
    countryCode?: string;
    passportCopyFileList?: any[];
}

export interface Activity {
    code: string;
    isc4Code?: string | null;
    description: string;
    description_Arabic: string;
}

export interface CompanySetupData {
    businessCategory: BusinessCategory | null;
    activity: Activity[];
    tradeName: TradeName;
    numberOfShareholders: number;
    shareholders: Shareholder[];
    manager: Manager | null;
} 