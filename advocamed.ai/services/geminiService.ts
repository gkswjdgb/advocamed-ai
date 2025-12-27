import { GoogleGenAI, Type, Schema } from "@google/genai";
import { AnalysisResult, UserFinancials } from "../types";

const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const currentYear = new Date().getFullYear();

const analysisSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    hospitalName: { type: Type.STRING, description: "Name of the hospital or provider found on the bill." },
    totalCharged: { type: Type.NUMBER, description: "Total amount charged in the bill." },
    potentialSavings: { type: Type.NUMBER, description: "Estimated potential savings based on errors, overcharges, or charity care." },
    confidenceScore: { type: Type.NUMBER, description: "AI Confidence score (0-100) based on image clarity, text readability, and code identification certainty." },
    summary: { type: Type.STRING, description: "Executive summary of findings, including detected error patterns." },
    dataSourceCitation: { type: Type.STRING, description: "Citation of sources used (e.g., 'IRS 501(r)', 'CMS Medicare Fee Schedule')." },
    items: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          code: { type: Type.STRING, description: "CPT or ICD code if visible." },
          description: { type: Type.STRING, description: "Description of the service." },
          chargedAmount: { type: Type.NUMBER, description: "Amount charged." },
          expectedAmount: { type: Type.NUMBER, description: "Estimated Fair Market Value (approx 150-200% of Medicare rate)." },
          flag: { 
            type: Type.STRING, 
            enum: ["overcharged", "error", "ok", "unknown", "upcoding", "unbundling"],
            description: "Audit status. 'upcoding' for inflated levels, 'unbundling' for separated charges."
          },
          reason: { type: Type.STRING, description: "Technical explanation (e.g., 'CPT 80053 includes 80048 - Unbundling detected')." },
        },
        required: ["description", "chargedAmount", "flag"]
      }
    },
    charityAnalysis: {
      type: Type.OBJECT,
      properties: {
        likelyEligible: { type: Type.BOOLEAN, description: "True if eligible for FAP." },
        estimatedDiscount: { type: Type.STRING, description: "Estimated discount (e.g., '100% Write-off')." },
        reasoning: { type: Type.STRING, description: "Detailed logic based on FPL and typical hospital asset policies." }
      },
      nullable: true
    },
    noSurprisesAnalysis: {
      type: Type.OBJECT,
      properties: {
        possibleViolation: { type: Type.BOOLEAN, description: "True if No Surprises Act violation suspect." },
        notes: { type: Type.STRING, description: "Analysis of out-of-network charges at in-network facility or GFE discrepancies." }
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
  const financialContext = financials 
    ? `Patient's Annual Income: $${financials.annualIncome}, Household Size: ${financials.householdSize}.`
    : "No financial information provided.";

  // List of models to try in order of preference/speed vs capability
  const modelCandidates = [
    'gemini-3-flash-preview', // Primary multimodal model
    'gemini-3-pro-preview',   // Fallback for complex reasoning
    'gemini-flash-latest'     // Ultimate fallback (stable alias)
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
              text: `You are a senior medical auditor and patient advocate AI. Analyze this medical bill image with high precision.
              The current year is ${currentYear}.

              Context:
              ${financialContext}
              
              EXECUTE THE FOLLOWING DEEP AUDIT PROTOCOLS:

              1. **Hospital & Policy Identification**: 
                 - Identify the hospital. 
                 - Based on IRS 501(r) regulations for non-profits, estimate Financial Assistance Policy (FAP) eligibility.
                 - Note typical application deadlines (usually 240 days from first bill).

              2. **Code Validation (Fraud & Error Detection)**:
                 - **Upcoding**: Check if the description matches the severity code (e.g., Level 5 ER visit for minor issue).
                 - **Unbundling**: Check if lab panels (e.g., BMP 80048) are billed alongside individual components.
                 - **Fair Price**: Compare charged amounts against typical CMS Medicare rates x 2 (a common 'Fair Market' benchmark). Flag as 'overcharged' if > 300% of Medicare.

              3. **No Surprises Act (NSA) Compliance**:
                 - Check for out-of-network providers (Anesthesiology, Pathology, Assistant Surgeons) billing at an In-Network facility.
                 - If detected, flag as potential NSA violation.

              4. **Charity Care Logic**:
                 - Use ${currentYear} Federal Poverty Guidelines.
                 - < 200% FPL: Presume 100% discount.
                 - 200-400% FPL: Presume sliding scale.
                 
              5. **Confidence Score**:
                 - Evaluate how clear the image is and how confident you are in the extracted text and codes. 
                 - Return a score from 0-100.

              OUTPUT:
              - Strict JSON matching the schema.
              - Include a 'dataSourceCitation' field citing specific regulations (e.g., 'CMS Physician Fee Schedule ${currentYear}, IRS Section 501(r)').
              `
            }
          ]
        },
        config: {
          responseMimeType: "application/json",
          responseSchema: analysisSchema,
          temperature: 0.0, // Zero temp for maximum analytical rigor
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
      ${analysis.items.filter(i => i.flag !== 'ok').map(i => `- ${i.code}: ${i.flag.toUpperCase()} - ${i.reason} (Fair Price: $${i.expectedAmount !== undefined ? i.expectedAmount : 'N/A'})`).join('\n')}
      
      **Legal Context:**
      ${analysis.noSurprisesAnalysis?.possibleViolation ? `- Assert protection under the **No Surprises Act** regarding out-of-network charges.` : ''}
      ${analysis.charityAnalysis?.likelyEligible ? `- Formally request Financial Assistance Application under **IRS Section 501(r)**. Income: $${financials?.income}.` : ''}

      **Tone & Structure:**
      - Formal, firm, authoritative.
      - Reference the specific laws (No Surprises Act, HIPAA right to itemized bill).
      - State clear demand: "Recalculate bill to fair market value" or "Process charity care application".
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