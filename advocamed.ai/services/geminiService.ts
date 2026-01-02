import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult, UserFinancials } from "../types";

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeMedicalBill = async (
  base64Image: string, 
  mimeType: string,
  financials?: UserFinancials
): Promise<AnalysisResult> => {
  
  const currentYear = new Date().getFullYear();
  const financialContext = financials 
    ? `Patient Context: Annual Income $${financials.annualIncome}, Household Size ${financials.householdSize}.`
    : "Patient Context: No financial information provided.";

  // UPDATED: Enterprise-grade prompt engineering
  const systemInstruction = `
    You are an expert Medical Billing Auditor AI. Your goal is to digitize medical bills and identify errors, overcharges, and financial aid eligibility.

    **CRITICAL PRIVACY & SAFETY PROTOCOLS:**
    1. **PII REDACTION**: Do NOT extract or output the patient's name, DOB, Member ID, or home address. Focus ONLY on the billing line items and facility info.
    2. **NO HALLUCINATIONS**: If a CPT code or price is blurry/unreadable, return "null" (string) or 0. Do NOT guess.
    3. **NEUTRAL TONE**: Use professional language. Instead of "Fraud", use "Variance Detected".

    **ANALYSIS INSTRUCTIONS:**
    1. **OCR Extraction**: Extract the provider name and all line items (Description, Charge Amount, CPT Code).
    2. **CPT Code Audit**: 
       - Check if the charged amount is significantly higher (>200%) than standard Medicare allowable rates (National Average).
       - Look for "Unbundling" (e.g., separating a kit into parts).
       - Look for "Upcoding" (e.g., Level 5 ER visit 99285 for a minor issue).
    3. **Charity Care Assessment**:
       - Compare the user's income (if provided) against the standard 501(r) guideline (usually <200% FPL is eligible for 100% discount).
    
    **OUTPUT FORMAT**:
    Return strictly structured JSON matching the schema below.
  `;

  // Define strict output schema
  const analysisSchema = {
    type: Type.OBJECT,
    properties: {
      hospitalName: { type: Type.STRING, description: "Name of the hospital/provider facility only." },
      totalCharged: { type: Type.NUMBER, description: "Total amount found on bill." },
      potentialSavings: { type: Type.NUMBER, description: "Conservative estimate of difference between charged amount and fair market rates." },
      confidenceScore: { type: Type.NUMBER, description: "Your confidence in the OCR quality (0-100). If image is blurry, set low." },
      summary: { type: Type.STRING, description: "A 2-sentence summary of the main findings." },
      dataSourceCitation: { type: Type.STRING, description: "Source of benchmark data (e.g., 'CMS Physician Fee Schedule 2025')" },
      disclaimer: { type: Type.STRING, description: "Standard disclaimer: 'Estimates based on national averages; actual plan rates vary.'" },
      items: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            code: { type: Type.STRING, description: "5-digit CPT/HCPCS Code. If not found, return 'N/A'." },
            description: { type: Type.STRING, description: "Service description text." },
            chargedAmount: { type: Type.NUMBER, description: "The amount charged by the provider." },
            expectedAmount: { type: Type.NUMBER, description: "Estimated Medicare/Commercial Allowed Amount." },
            variance_level: { 
              type: Type.STRING, 
              enum: ["Normal", "High", "Very High"],
              description: "Calculate based on (Charged / Expected). >2.0 is High, >3.0 is Very High."
            },
            flag_reason: { type: Type.STRING, description: "Why is this flagged? e.g. 'Price is 3x national average' or 'Potential unbundled code'." },
            suggested_question: { type: Type.STRING, description: "A specific script for the patient to ask billing. e.g. 'Please provide the invoice for this implant.'" }
          },
          required: ["description", "chargedAmount", "variance_level"]
        }
      },
      charityAnalysis: {
        type: Type.OBJECT,
        properties: {
          likelyEligible: { type: Type.BOOLEAN },
          estimatedDiscount: { type: Type.STRING, description: "e.g., '100% (Full Write-off)' or 'Sliding Scale'" },
          reasoning: { type: Type.STRING }
        },
        nullable: true
      },
      analysisDate: { type: Type.STRING }
    },
    required: ["totalCharged", "items", "summary", "confidenceScore"]
  };

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', // Using Flash for speed/cost efficiency, consider Pro for complex tables
      contents: {
        parts: [
          { inlineData: { mimeType, data: base64Image } },
          { text: `Analyze this medical bill image. ${financialContext}. Current Year: ${currentYear}.` }
        ]
      },
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
        temperature: 0.0, // Zero temperature for maximum determinism
      }
    });

    if (!response.text) {
      throw new Error("No response from AI");
    }

    const result = JSON.parse(response.text);
    // Inject financials back into result for UI context
    if (financials) result.userFinancials = financials;
    
    return result as AnalysisResult;

  } catch (error: any) {
    console.error("Gemini Analysis Failed:", error);
    throw new Error(error.message || "Failed to analyze bill. Please ensure the image is clear and try again.");
  }
};

export const generateAppealLetter = async (
  analysis: AnalysisResult, 
  financials?: { income: number; size: number }
): Promise<string> => {
  const prompt = `
    Write a formal medical bill dispute letter.
    
    **Context:**
    - Provider: ${analysis.hospitalName}
    - Total Charges: $${analysis.totalCharged}
    - Disputed Items: ${analysis.items.filter(i => i.variance_level !== 'Normal').map(i => `${i.description} ($${i.chargedAmount})`).join(', ')}
    
    **Strategy:**
    1. Request a strictly itemized statement (UB-04).
    2. Cite the specific discrepancies found (e.g., price variance).
    3. If eligible for charity care (Income $${financials?.income}), formally request the Financial Assistance Application under IRS 501(r).
    
    **Tone:** Professional, Firm, but Cooperative.
    Output ONLY the body of the email/letter.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });

    return response.text || "Could not generate letter.";
  } catch (error) {
    console.error("Appeal Generation Failed:", error);
    return "Error generating letter. Please try again.";
  }
};
