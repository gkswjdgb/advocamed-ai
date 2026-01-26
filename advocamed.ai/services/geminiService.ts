import { AnalysisResult, UserFinancials } from "../types";

// SECURITY UPDATE:
// Logic has been moved to Vercel Serverless Functions (api/analyze.js & api/appeal.js).
// The Client no longer holds the API Key or the Google SDK.

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
      const errorData = await response.json();
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
  financials?: UserFinancials
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
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to generate appeal letter");
    }

    const data = await response.json();
    return data.text || "Could not generate letter.";

  } catch (error) {
    console.error("Appeal Request Failed:", error);
    return "Error generating letter. Please try again.";
  }
};
