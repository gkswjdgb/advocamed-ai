export interface BillItem {
  code: string;
  description: string;
  chargedAmount: number;
  expectedAmount?: number;
  flag: 'overcharged' | 'error' | 'ok' | 'unknown' | 'upcoding' | 'unbundling';
  reason?: string;
}

export interface CharityAnalysis {
  likelyEligible: boolean;
  estimatedDiscount: string;
  reasoning: string;
}

export interface NoSurprisesAnalysis {
  possibleViolation: boolean;
  notes: string;
}

export interface UserFinancials {
  householdSize: number;
  annualIncome: number;
}

export interface AnalysisResult {
  hospitalName: string;
  totalCharged: number;
  potentialSavings?: number;
  items: BillItem[];
  summary: string;
  confidenceScore?: number;
  analysisDate: string;
  charityAnalysis?: CharityAnalysis;
  noSurprisesAnalysis?: NoSurprisesAnalysis;
  userFinancials?: UserFinancials;
  dataSourceCitation?: string;
}

export interface CharityEligibility {
  isEligible: boolean;
  estimatedDiscountPercentage: number;
  programName: string;
  reasoning: string;
}

export enum AppStep {
  HERO,
  UPLOAD,
  ANALYZING,
  RESULTS,
  APPEAL_GENERATION,
  PRIVACY,
  CONTACT
}
