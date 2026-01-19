
import { GoogleGenAI } from "@google/genai";
import { GeminiEnrichmentRequest } from "../types";

export const fetchWordEnrichment = async (request: GeminiEnrichmentRequest): Promise<string> => {
  if (!process.env.API_KEY) {
    return "API Key is missing.";
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  let prompt = "";
  switch(request.type) {
    case 'mnemonic':
        prompt = `Generate a funny, memorable mnemonic or memory trick to remember the word "${request.word}". Keep it short, witty, and easy to recall.`;
        break;
    case 'etymology':
        prompt = `Explain the etymology (origin) of the word "${request.word}" in simple terms. Mention the root words.`;
        break;
    case 'pop_culture':
        prompt = `Use the word "${request.word}" in a sentence that references a famous movie, TV show, or celebrity to make it relatable.`;
        break;
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Could not generate content.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI Brain Freeze! Try again.";
  }
};
