
export enum Language {
  ENGLISH = 'en',
  HINDI = 'hi'
}

export enum Difficulty {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

export interface Word {
  id: string;
  term: string;
  pronunciation: string;
  definition: {
    en: string;
    hi: string;
  };
  example: string;
  synonyms: string[];
  antonyms: string[];
  difficulty: Difficulty;
}

export interface Deck {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide component
  color: string;
  words: Word[];
}

export interface GeminiEnrichmentRequest {
  word: string;
  type: 'mnemonic' | 'etymology' | 'pop_culture';
}

export interface Topic {
  id: string;
  title: {
    en: string;
    hi: string;
  };
  description: {
    en: string;
    hi: string;
  };
  icon: any;
}
