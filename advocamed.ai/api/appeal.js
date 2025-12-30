
import { GoogleGenAI } from "@google/genai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Use the API key directly from process.env as per guidelines.
  try {
    const { analysis, financials } = req.body;
    // Always use the specified initialization format.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

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

    // Extract text directly from response.text property.
    res.status(200).json({ text: response.text });

  } catch (error) {
    console.error("Backend Appeal Error:", error);
    res.status(500).json({ error: 'Failed to generate letter' });
  }
}
