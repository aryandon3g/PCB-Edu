export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi'
}

export enum Subject {
  PHYSICS = 'physics',
  CHEMISTRY = 'chemistry',
  BIOLOGY = 'biology',
  LADO = 'lado'
}

export interface SimulationState {
  isPlaying: boolean;
  variables: Record<string, number>;
}

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    hi: string;
  };
}

export interface Topic {
  id: string;
  title: { en: string; hi: string };
  description: { en: string; hi: string };
  icon: any; // Lucide icon component
}

export interface GeminiExplanationRequest {
  language: Language;
  subject: string;
  context: string;
  variables: Record<string, any>;
}