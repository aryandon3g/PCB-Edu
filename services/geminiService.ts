import { GoogleGenAI } from "@google/genai";
import { GeminiExplanationRequest, Language } from "../types";

const getSystemInstruction = (lang: Language) => {
  if (lang === Language.HINDI) {
    return "आप एक सहायक विज्ञान शिक्षक हैं। छात्रों को जटिल विज्ञान अवधारणाओं को सरल हिंदी में समझाएं। उत्तर संक्षिप्त और उत्साहजनक होने चाहिए।";
  }
  return "You are a helpful science tutor. Explain complex science concepts to students in simple English. Keep answers concise and encouraging.";
};

export const fetchExplanation = async (request: GeminiExplanationRequest): Promise<string> => {
  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return request.language === Language.HINDI 
        ? "API कुंजी गायब है।" 
        : "API Key is missing.";
    }

    const ai = new GoogleGenAI({ apiKey });
    
    // Construct a prompt based on the simulation state
    const variablesStr = Object.entries(request.variables)
      .map(([key, value]) => `${key}: ${value}`)
      .join(', ');

    const prompt = `
      Subject: ${request.subject}
      Topic: ${request.context}
      Current State Variables: ${variablesStr}
      
      Please explain what is happening in the simulation right now based on these variables. 
      For example, if gravity is high, explain why the pendulum moves faster. 
      If temperature is high, explain why particles move faster.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: getSystemInstruction(request.language),
        maxOutputTokens: 150, // Keep explanations concise
      }
    });

    return response.text || (request.language === Language.HINDI ? "कोई उत्तर नहीं मिला।" : "No response generated.");

  } catch (error) {
    console.error("Gemini API Error:", error);
    return request.language === Language.HINDI 
      ? "स्पष्टीकरण प्राप्त करने में त्रुटि।" 
      : "Error fetching explanation.";
  }
};