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
  analysisDate?: string;
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
  imageUrl?: string;
}

// Deep-Dive pSEO Hospital Data Interface
export interface Hospital {
  id: string;
  slug: string;
  name: string;
  acronym?: string; // e.g., "EHC" for Emory Healthcare, "NYP", "MGB", "JHM"
  city: string;
  state: string;
  fpl_limit: number; // 100% Free Care FPL limit
  partial_fpl_limit?: number; // Sliding-scale / Partial discount FPL limit
  deadline_days: number;
  physician_fees_covered?: string; // Whether emergency/employed physician groups are covered under the FAP
  affiliated_hospitals?: string[]; // Sub-hospitals covered by this Health System's FAP
  guest_pay_portal?: string; // e.g., "MyChart Guest Pay", "PatientPortal Pay"
  policy_summary?: string;
  financial_aid_url?: string;
  application_url?: string; // Direct link to PDF or Form
  policy_note?: string; 
  phone?: string;
  email?: string;
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
