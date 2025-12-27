import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, UserFinancials } from "../types";

const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const currentYear = new Date().getFullYear();

// Improved Schema for Safer "Assistant" Role
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hospitalName: { type: Type.STRING, description: "Name of the hospital or provider." },
    totalCharged: { type: Type.NUMBER, description: "Total amount found on bill." },
    potentialSavings: { type: Type.NUMBER, description: "Estimated difference between charged amount and national average benchmarks." },
    confidenceScore: { type: Type.NUMBER, description: "OCR Confidence (0-100)." },
    summary: { type: Type.STRING, description: "Neutral summary of findings. Use terms like 'Variance detected' instead of 'Error'." },
    dataSourceCitation: { type: Type.STRING, description: "e.g., 'CMS Physician Fee Schedule (National Avg)'" },
    disclaimer: { type: Type.STRING, description: "Standard disclaimer about national averages vs local contract rates." },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          code: { type: Type.STRING, description: "CPT/HCPCS Code. Return 'null' string if not found." },
          description: { type: Type.STRING, description: "Service description." },
          chargedAmount: { type: Type.NUMBER, description: "Amount charged." },
          expectedAmount: { type: Type.NUMBER, description: "Estimated National Average (Medicare/Commercial blend)." },
          variance_level: { 
            type: Type.STRING, 
            enum: ["Normal", "High", "Very High"],
            description: "'High' if > 200% of benchmark. 'Very High' if > 300% or potential upcoding."
          },
          flag_reason: { type: Type.STRING, description: "Neutral explanation. e.g. 'Cost is significantly higher than national average estimates.'" },
          suggested_question: { type: Type.STRING, description: "A specific question the patient can ask the billing department. e.g., 'Can you clarify if this code covers both X and Y?'" }
        },
        required: ["description", "chargedAmount", "variance_level"]
      }
    },
    charityAnalysis: {
      type: Type.OBJECT,
      properties: {
        likelyEligible: { type: Type.BOOLEAN },
        estimatedDiscount: { type: Type.STRING },
        reasoning: { type: Type.STRING }
      },
      nullable: true
    },
    noSurprisesAnalysis: {
      type: Type.OBJECT,
      properties: {
        possibleViolation: { type: Type.BOOLEAN },
        notes: { type: Type.STRING }
      },
      nullable: true
    },
    analysisDate: { type: Type.STRING }
  },
  required: ["totalCharged", "items", "summary", "confidenceScore"]
};

export const analyzeMedicalBill = async (
  base64Image: string, 
  mimeType: string,
  financials?: UserFinancials
): Promise<AnalysisResult> => {
  if (!apiKey) {
      throw new Error("API Key is missing. Please configure GEMINI_API_KEY.");
  }

  const financialContext = financials 
    ? `Patient Context: Annual Income $${financials.annualIncome}, Household Size ${financials.householdSize}.`
    : "Patient Context: No financial information provided.";

  // UPDATED: Safe "Assistant" Persona Prompt
  const systemInstruction = `
    You are an AI assistant helping patients understand their medical bills.
    Your role is NOT to provide legal or medical advice, but to highlight **potential** discrepancies for the user to verify.

    **STRICT SAFETY RULES:**
    1. **No Definite Judgments**: Never use words like "Illegal", "Fraud", "Scam", or "Fake". Use "Potential Discrepancy", "High Variance", "Review Recommended", or "Unusual Coding".
    2. **Benchmark Context**: When comparing prices, explicitly state that comparisons are based on "Estimated National Averages" and actual allowable rates vary by insurance plan and location.
    3. **Actionable Output**: Instead of telling them to "fight", suggest they "request an itemized bill", "ask for coding clarification", or "verify in-network status".
    4. **Handling Unknowns**: If a CPT code is blurry or price is unclear, output "null" for the code rather than guessing.
    
    **Audit Tasks:**
    1. OCR: Extract text accurately.
    2. Analyze CPT Codes: Identify potential "Upcoding" (e.g., Level 5 visit for minor issue) or "Unbundling". Flag these as "Very High" variance.
    3. Charity Care: Evaluate using IRS 501(r) guidelines (Income < 200% FPL usually qualifies).
  `;

  const modelCandidates = ['gemini-3-flash-preview', 'gemini-3-pro-preview'];
  let lastError: Error | null = null;

  for (const modelName of modelCandidates) {
    try {
      console.log(`📡 Analyzing with ${modelName}...`);
      const response = await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [
            { inlineData: { mimeType, data: base64Image } },
            { text: `Analyze this bill. Context: ${financialContext}. Year: ${currentYear}. Output JSON.` }
          ]
        },
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          responseSchema: analysisSchema,
          temperature: 0.1
        }
      });

      if (response.text) {
        const result = JSON.parse(response.text) as AnalysisResult;
        if (financials) result.userFinancials = financials;
        return result;
      }
    } catch (error: any) {
      console.warn(`❌ Model ${modelName} failed:`, error.message);
      lastError = error;
    }
  }

  throw new Error(lastError?.message || "Analysis failed.");
};

export const generateAppealLetter = async (
  analysis: AnalysisResult, 
  financials?: { income: number; size: number }
): Promise<string> => {
  try {
    // UPDATED: "Inquiry" Tone Prompt
    const prompt = `
      Write a polite but firm "Request for Clarification" email to a hospital billing department.
      
      **Goal:** Ask for an itemized review of charges that seem higher than national averages. Do NOT accuse them of fraud.
      
      **Details:**
      - Hospital: ${analysis.hospitalName}
      - Total: $${analysis.totalCharged}
      - Items to Review: ${analysis.items.filter(i => i.variance_level !== 'Normal').map(i => `${i.description} (Code: ${i.code})`).join(', ')}
      
      **Tone:** Professional, inquisitive, cooperative. 
      **Key Requests to Include:**
      1. Request a detailed itemized statement (UB-04 or CMS-1500).
      2. Ask to verify that CPT codes match the medical records.
      3. ${analysis.charityAnalysis?.likelyEligible ? `Request a Financial Assistance Application (Income: $${financials?.income}).` : ''}
      
      Output only the body of the letter.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt
    });
    
    return response.text || "Could not generate letter.";
  } catch (error) {
    return "Error generating letter.";
  }
};
