export interface BillItem {
  code: string;
  description: string;
  chargedAmount: number;
  expectedAmount?: number;
  variance_level: 'Normal' | 'High' | 'Very High';
  flag_reason?: string;
  suggested_question?: string;
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
  disclaimer?: string;
}

export interface CharityEligibility {
  isEligible: boolean;
  estimatedDiscountPercentage: number;
  programName: string;
  reasoning: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readingTime: string;
  category: string;
}

// pSEO Data Interface - Updated for contact/utility features
export interface Hospital {
  id: string;
  slug: string;
  name: string;
  city: string;
  state: string;
  fpl_limit: number; 
  deadline_days: number;
  policy_summary?: string;
  financial_aid_url?: string;
  application_url?: string; // Direct link to PDF or Form
  phone?: string; // Billing department phone
  policy_note?: string; 
}

export enum AppStep {
  HERO,
  UPLOAD,
  ANALYZING,
  RESULTS,
  APPEAL_GENERATION,
  PRIVACY,
  CONTACT,
  BLOG,
  BLOG_POST
}
