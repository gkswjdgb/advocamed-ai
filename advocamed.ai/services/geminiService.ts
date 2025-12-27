import { AnalysisResult, UserFinancials } from "../types";

// NOTE: logic moved to api/analyze.js and api/appeal.js for security.
// The frontend no longer requires @google/genai or the API KEY.

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
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const result = await response.json();
    return result as AnalysisResult;

  } catch (error: any) {
    console.error("Analysis Request Failed:", error);
    throw new Error(error.message || "Failed to analyze bill. Please try again.");
  }
};

export const generateAppealLetter = async (
  analysis: AnalysisResult, 
  financials?: { income: number; size: number }
): Promise<string> => {
  try {
    const response = await fetch('/api/appeal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        analysis,
        financials
      })
    });

    if (!response.ok) {
       throw new Error("Failed to generate letter");
    }

    const result = await response.json();
    return result.text || "Could not generate letter.";

  } catch (error) {
    console.error("Appeal Request Failed:", error);
    return "Error generating letter. Please try again.";
  }
};
