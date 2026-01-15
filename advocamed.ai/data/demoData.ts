import { AnalysisResult } from "../types";

export const demoAnalysisResult: AnalysisResult = {
  hospitalName: "NYU Langone Health",
  totalCharged: 55000.00,
  potentialSavings: 42350.00,
  confidenceScore: 99,
  summary: "High-severity coding (Level 5) detected for a minor condition. Excessive charges found for CT Scan and Pharmacy items compared to Medicare benchmarks.",
  analysisDate: new Date().toLocaleDateString(),
  dataSourceCitation: "CMS Physician Fee Schedule (2025)",
  disclaimer: "Demo analysis based on national averages. Actual plan rates may vary.",
  items: [
    {
      code: "99285",
      description: "Emergency Room Visit (Level 5)",
      chargedAmount: 5500.00,
      expectedAmount: 650.00,
      variance_level: "Very High",
      flag_reason: "Severity level 5 is for life-threatening conditions. Your records typically suggest a minor injury (Level 3).",
      suggested_question: "Can you provide the physician's note justifying a Level 5 complexity (99285) for this visit?"
    },
    {
      code: "70450",
      description: "CT Scan - Head or Brain",
      chargedAmount: 3200.00,
      expectedAmount: 180.00,
      variance_level: "Very High",
      flag_reason: "This charge is 17x higher than the Medicare rate. Average commercial price in NY is approx $400.",
      suggested_question: "I am requesting an adjustment to the fair market cash price for CPT 70450."
    },
    {
      code: "N/A",
      description: "Tylenol (Acetaminophen) 500mg",
      chargedAmount: 85.00,
      expectedAmount: 0.05,
      variance_level: "Very High",
      flag_reason: "Extreme markup on over-the-counter medication.",
      suggested_question: "Please remove this incidental charge as it should be included in the room rate."
    },
    {
      code: "96360",
      description: "IV Infusion, Hydration",
      chargedAmount: 450.00,
      expectedAmount: 420.00,
      variance_level: "Normal",
      flag_reason: "Charge is within the expected range for a hospital setting.",
      suggested_question: ""
    }
  ],
  charityAnalysis: {
    likelyEligible: true,
    estimatedDiscount: "100% (Full Forgiveness)",
    reasoning: "Based on a household income of $45k and size of 4, you are under 200% FPL. NYU Langone typically waives 100% of bills for this bracket."
  },
  userFinancials: {
    annualIncome: 45000,
    householdSize: 4
  }
};
