import { GoogleGenAI } from "@google/genai";
import { GeminiExplanationRequest, Language } from "../types";

export const fetchExplanation = async (request: GeminiExplanationRequest): Promise<string> => {
  // Use process.env.API_KEY directly as per guidelines
  if (!process.env.API_KEY) {
    console.error("API Key not found in process.env.API_KEY");
    return "API Key is missing. Please check your configuration.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const languageName = request.language === Language.HINDI ? "Hindi" : "English";

  const prompt = `
    Explain the scientific concept of "${request.context}" in the subject of ${request.subject}.
    Language: ${languageName}.
    Context Variables: ${JSON.stringify(request.variables)}.
    Provide a simple, engaging explanation suitable for a student.
  `;

  try {
    // Using gemini-3-pro-preview for STEM tasks (Complex Text Tasks) as per guidelines
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
    });
    return response.text || "No explanation generated.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Failed to generate explanation. Please try again later.";
  }
};