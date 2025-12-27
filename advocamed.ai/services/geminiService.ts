import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, UserFinancials } from "../types";

// Support both standard API_KEY and the user's GEMINI_API_KEY configuration
// Note: In Vite, we use define in vite.config.ts to replace process.env.API_KEY
const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const currentYear = new Date().getFullYear();

// Improved Schema with strict descriptions for benchmarking
const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hospitalName: { type: Type.STRING, description: "Name of the hospital or provider found on the bill." },
    totalCharged: { type: Type.NUMBER, description: "Total amount charged in the bill." },
    potentialSavings: { type: Type.NUMBER, description: "Total estimated savings (sum of overcharges + potential charity care discounts)." },
    confidenceScore: { type: Type.NUMBER, description: "Confidence score (0-100) based on OCR clarity and code identification certainty." },
    summary: { type: Type.STRING, description: "Executive summary of findings. Explicitly mention if 'Price Gouging' (>400% Medicare) or 'Upcoding' is detected." },
    dataSourceCitation: { type: Type.STRING, description: "Citation of sources used (e.g., 'CMS Physician Fee Schedule 2025', 'IRS 501(r)')." },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          code: { type: Type.STRING, description: "The 5-digit CPT code or ICD code. Return 'N/A' if not visible." },
          description: { type: Type.STRING, description: "Description of the service." },
          chargedAmount: { type: Type.NUMBER, description: "Amount charged." },
          expectedAmount: { type: Type.NUMBER, description: "The estimated 2025 Medicare Allowable Rate for this specific CPT code." },
          flag: { 
            type: Type.STRING, 
            enum: ["overcharged", "error", "ok", "unknown", "upcoding", "unbundling"],
            description: "Audit Flag. 'overcharged' if > 200% of Medicare rate. 'upcoding' if severity mismatch. 'unbundling' if component billed separately."
          },
          reason: { type: Type.STRING, description: "Explanation: e.g., 'Charged $500 vs Medicare $100 (500% Markup)' or 'Upcoding detected'." },
        },
        required: ["description", "chargedAmount", "flag"]
      }
    },
    charityAnalysis: {
      type: Type.OBJECT,
      properties: {
        likelyEligible: { type: Type.BOOLEAN, description: "True if eligible for FAP based on provided financial context or typical 501(r) rules." },
        estimatedDiscount: { type: Type.STRING, description: "Estimated discount (e.g., '100% Write-off' or '40% Discount')." },
        reasoning: { type: Type.STRING, description: "Detailed logic based on Federal Poverty Level (FPL) thresholds." }
      },
      nullable: true
    },
    noSurprisesAnalysis: {
      type: Type.OBJECT,
      properties: {
        possibleViolation: { type: Type.BOOLEAN, description: "True if out-of-network provider billing at in-network facility detected." },
        notes: { type: Type.STRING, description: "Explanation of potential No Surprises Act violation." }
      },
      nullable: true
    },
    analysisDate: { type: Type.STRING, description: "YYYY-MM-DD" }
  },
  required: ["totalCharged", "items", "summary", "dataSourceCitation", "confidenceScore"]
};

export const analyzeMedicalBill = async (
  base64Image: string, 
  mimeType: string,
  financials?: UserFinancials
): Promise<AnalysisResult> => {
  if (!apiKey) {
      throw new Error("API Key is missing. Please configure GEMINI_API_KEY in your environment variables.");
  }

  const financialContext = financials 
    ? `Patient Context: Annual Income $${financials.annualIncome}, Household Size ${financials.householdSize}.`
    : "Patient Context: No financial information provided (Assume standard 501(r) eligibility checks).";

  // System Instruction: Expert Persona
  const systemInstruction = `
    You are an expert Medical Billing Advocate and Certified Professional Coder (CPC) with 20 years of experience auditing US hospital bills.
    Your goal is to identify billing errors, price gouging, and financial aid eligibility with extreme precision.

    **STRICT AUDIT RULES:**
    1. **OCR Precision**: Extract text exactly as it appears. Do not hallucinate numbers.
    2. **CPT Code Analysis**: Identify 5-digit CPT codes. 
       - Check for **"Unbundling"** (e.g., billing a panel and its components separately).
       - Check for **"Upcoding"** (e.g., Level 5 ER visit 99285 for a minor issue).
    3. **Price Benchmarking (CRITICAL)**: 
       - Compare the charged amount against the **2025 Medicare Allowable Rate**.
       - **Flag as 'overcharged' (Red Flag)** if charge is > 400% of Medicare rate (Price Gouging).
       - **Flag as 'overcharged' (Yellow Flag)** if charge is > 200% of Medicare rate (High Markup).
       - **Flag as 'ok'** if charge is <= 200% of Medicare rate.
    4. **Charity Care Logic**:
       - Use typical IRS 501(r) standards: 100% discount for income < 200% FPL; Sliding scale for 200-400% FPL.
    5. **No Surprises Act**:
       - Flag out-of-network charges (e.g., Anesthesiology, Pathology) at in-network facilities.
  `;

  // List of models to try in order of preference/speed vs capability
  const modelCandidates = [
    'gemini-3-flash-preview', // High speed, good reasoning
    'gemini-3-pro-preview',   // Deep reasoning fallback
  ];

  let lastError: Error | null = null;

  for (const modelName of modelCandidates) {
    try {
      console.log(`📡 Attempting analysis with model: ${modelName}`);
      
      const response = await ai.models.generateContent({
        model: modelName,
        contents: {
          parts: [
            {
              inlineData: {
                mimeType: mimeType,
                data: base64Image
              }
            },
            {
              text: `Analyze this medical bill image strictly according to your system instructions.
              
              Context:
              ${financialContext}
              Current Year: ${currentYear}
              
              Output valid JSON only.`
            }
          ]
        },
        config: {
          systemInstruction: systemInstruction,
          responseMimeType: "application/json",
          responseSchema: analysisSchema,
          temperature: 0.1, // Low temperature for factual auditing
        }
      });

      if (response.text) {
        const result = JSON.parse(response.text) as AnalysisResult;
        if (financials) {
          result.userFinancials = financials;
        }
        console.log(`✅ Analysis successful with ${modelName}`);
        return result;
      }
    } catch (error: any) {
      console.warn(`❌ Model ${modelName} failed:`, error.message);
      lastError = error;
    }
  }

  console.error("All models failed analysis.");
  throw new Error(lastError?.message || "Failed to analyze the medical bill. Please try again later.");
};

export const generateAppealLetter = async (
  analysis: AnalysisResult, 
  financials?: { income: number; size: number },
  userContext?: string
): Promise<string> => {
  try {
    const prompt = `
      Write a highly professional, legally-grounded medical bill dispute letter.
      Current Date: ${new Date().toLocaleDateString()}
      
      Hospital: ${analysis.hospitalName}
      Total Bill: $${analysis.totalCharged}
      
      **Audit Findings to Include:**
      ${analysis.items.filter(i => i.flag !== 'ok').map(i => `- ${i.code}: ${i.flag.toUpperCase()} - ${i.reason} (Medicare Rate: $${i.expectedAmount})`).join('\n')}
      
      **Legal Context:**
      ${analysis.noSurprisesAnalysis?.possibleViolation ? `- Assert protection under the **No Surprises Act** regarding out-of-network charges.` : ''}
      ${analysis.charityAnalysis?.likelyEligible ? `- Formally request Financial Assistance Application under **IRS Section 501(r)**. Income: $${financials?.income}.` : ''}

      **Tone & Structure:**
      - Formal, firm, authoritative.
      - Reference the specific laws (No Surprises Act, HIPAA right to itemized bill).
      - State clear demand: "Recalculate bill to fair market value (approx 150% of Medicare)" or "Process charity care application".
      - Mention intention to file complaint with the State Insurance Commissioner or CFPB if ignored.
      
      Output strictly the body of the letter in Markdown.
    `;

    const models = ['gemini-3-flash-preview', 'gemini-3-pro-preview'];
    
    for (const model of models) {
        try {
            const response = await ai.models.generateContent({
              model: model,
              contents: prompt,
              config: { temperature: 0.5 }
            });
            if (response.text) return response.text;
        } catch (e) {
            console.warn(`Letter generation failed with ${model}`, e);
        }
    }
    
    return "Could not generate letter. Please try again.";
  } catch (error) {
    console.error("Letter generation fatal error:", error);
    return "Error generating appeal letter. Please try again.";
  }
};
