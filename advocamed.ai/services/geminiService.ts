import { AnalysisResult, UserFinancials } from "../types";

// SECURITY ARCHITECTURE:
// Zero-Storage Stateless Processing via Serverless Functions (api/analyze.js & api/appeal.js).
// Client never holds the API Key, and server never stores patient images or PII on disk/DB.

export const analyzeMedicalBill = async (
  base64Image: string, 
  mimeType: string,
  financials?: UserFinancials
): Promise<AnalysisResult> => {
  try {
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        base64Image,
        mimeType,
        financials
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const result = await response.json();
    return result as AnalysisResult;

  } catch (error: any) {
    console.error("Analysis Request Failed:", error);
    throw new Error(error.message || "Failed to connect to analysis server.");
  }
};

export const generateAppealLetter = async (
  analysis: AnalysisResult, 
  financials?: UserFinancials,
  tone: string = 'Formal & Firm'
): Promise<string> => {
  try {
    const response = await fetch('/api/appeal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        analysis,
        financials,
        tone
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate appeal letter");
    }

    const data = await response.json();
    return data.text || "Could not generate letter.";

  } catch (error) {
    console.error("Appeal Request Failed:", error);
    return `To: ${analysis.hospitalName || 'Hospital'} Billing & Financial Assistance Department
Subject: Formal Request for Itemized CPT Audit & IRS Section 501(r) Financial Assistance Review — Account #[Insert Account Number]

Dear Billing & Patient Financial Services Team,

I am writing regarding my recent billing statement totaling $${(analysis.totalCharged || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}. Before remitting payment, I am exercising my federal and state patient rights to request:

1. A complete, itemized statement (UB-04 / CMS-1500 format) listing all 5-digit CPT/HCPCS codes, revenue codes, and unit prices.
2. An administrative coding review of the billed charges against CMS Medicare Fee Schedule benchmarks (specifically reviewing potential variance of approximately $${(analysis.potentialSavings || 0).toLocaleString('en-US', { minimumFractionDigits: 2 })}).
3. A copy of your hospital's Financial Assistance Policy (Charity Care) application and a 30-day administrative dispute hold on my account under IRS Section 501(r) so no collection actions occur while this review is pending.

Please confirm receipt of this request and the temporary hold on my account.

Sincerely,
[Your Name]
[Your Phone Number]
[Account / Invoice Number]`;
  }
};
