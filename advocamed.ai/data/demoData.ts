import { AnalysisResult } from "../types";

export const demoAnalysisResult: AnalysisResult = {
  hospitalName: "General Memorial Medical Center (Sample)",
  totalCharged: 12450.00,
  potentialSavings: 4200.00,
  confidenceScore: 98,
  summary: "Our AI detected significant price variances in surgical supplies and potential unbundling of laboratory charges. This bill is highly eligible for negotiation.",
  analysisDate: new Date().toLocaleDateString(),
  dataSourceCitation: "Medicare National Average Benchmarks (2025)",
  disclaimer: "Demo sample for illustration purposes only. Estimates vary by insurer.",
  items: [
    {
      code: "99285",
      description: "Emergency Dept Visit (Level 5)",
      chargedAmount: 1200.00,
      expectedAmount: 450.00,
      variance_level: "High",
      flag_reason: "Charge is 2.6x the national average for a Level 5 ER visit.",
      suggested_question: "Can you provide the physician's note justifying a Level 5 complexity for this visit?"
    },
    {
      code: "80053",
      description: "Comprehensive Metabolic Panel",
      chargedAmount: 350.00,
      expectedAmount: 45.00,
      variance_level: "Very High",
      flag_reason: "This common lab test is billed at 7.7x the standard Medicare rate.",
      suggested_question: "Why is this lab charge significantly higher than the hospital's public cash price?"
    },
    {
      code: "93000",
      description: "Electrocardiogram (ECG)",
      chargedAmount: 280.00,
      expectedAmount: 35.00,
      variance_level: "Very High",
      flag_reason: "Routine diagnostic tests should not exceed 300% of national average.",
      suggested_question: "I would like to request a discount on this item based on fair market pricing."
    }
  ],
  charityAnalysis: {
    likelyEligible: true,
    estimatedDiscount: "100% (Full Charity Care)",
    reasoning: "Based on a household income of $45k and size of 4, this patient is under 200% FPL, meeting federal charity care guidelines."
  }
};
