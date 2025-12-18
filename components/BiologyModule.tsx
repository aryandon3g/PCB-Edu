import React, { useState } from 'react';
import { ArrowLeft, Dna, Leaf, Sun, Cat, HeartPulse, BrainCircuit, Droplet, Wind, Utensils, Apple, Pill, Bug } from 'lucide-react';
import { Language, Topic } from '../types';
import { TRANSLATIONS } from '../constants';
import DnaHelix from './biology/DnaHelix';
import PlantCell from './biology/PlantCell';
import AnimalCell from './biology/AnimalCell';
import Photosynthesis from './biology/Photosynthesis';
import Heart from './biology/Heart';
import Brain from './biology/Brain';
import Blood from './biology/Blood';
import RespiratorySystem from './biology/RespiratorySystem';
import DigestiveSystem from './biology/DigestiveSystem';
import HumanNutrition from './biology/HumanNutrition';
import Vitamins from './biology/Vitamins';
import HumanDiseases from './biology/HumanDiseases';

interface ModuleProps {
  language: Language;
}

const TOPICS: Topic[] = [
  { id: 'diseases', title: { en: 'Human Diseases', hi: 'मानव रोग' }, description: { en: 'Infectious, Genetic & Zoonotic', hi: 'संक्रामक, आनुवंशिक और ज़ूनोटिक' }, icon: Bug },
  { id: 'vitamins', title: { en: 'Vitamins Lab', hi: 'विटामिन लैब' }, description: { en: 'Micro-nutrients & Functions', hi: 'सूक्ष्म पोषक तत्व और कार्य' }, icon: Pill },
  { id: 'nutrition', title: { en: 'Human Nutrition', hi: 'मानव पोषण' }, description: { en: 'Carbohydrates & Energy Journey', hi: 'कार्बोहाइड्रेट और ऊर्जा की यात्रा' }, icon: Apple },
  { id: 'digestive', title: { en: 'Digestive System', hi: 'पाचन तंत्र' }, description: { en: 'Food Journey & Enzymes', hi: 'भोजन की यात्रा और एंजाइम' }, icon: Utensils },
  { id: 'respiratory', title: { en: 'Respiratory System', hi: 'श्वसन तंत्र' }, description: { en: 'Lungs, Breathing & Energy', hi: 'फेफड़े, श्वास और ऊर्जा' }, icon: Wind },
  { id: 'blood', title: { en: 'Blood System', hi: 'रक्त और परिसंचरण' }, description: { en: 'Cells, Groups & Transport', hi: 'कोशिकाएं, समूह और परिवहन' }, icon: Droplet },
  { id: 'heart', title: { en: 'Human Heart', hi: 'मानव हृदय' }, description: { en: 'Circulation & Anatomy', hi: 'परिसंचरण और शरीर रचना' }, icon: HeartPulse },
  { id: 'brain', title: { en: 'Human Brain', hi: 'मानव मस्तिष्क' }, description: { en: 'Nervous System Control', hi: 'तंत्रिका तंत्र नियंत्रण' }, icon: BrainCircuit },
  { id: 'cell', title: { en: 'Plant Cell', hi: 'पादप कोशिका' }, description: { en: 'Interactive Anatomy', hi: 'इंटरैक्टिव शरीर रचना' }, icon: Leaf },
  { id: 'animal', title: { en: 'Animal Cell', hi: 'जंतु कोशिका' }, description: { en: 'Interactive Anatomy', hi: 'जंतु कोशिका रचना' }, icon: Cat },
  { id: 'dna', title: { en: 'DNA Structure', hi: 'डीएनए संरचना' }, description: { en: 'Double Helix & Base Pairs', hi: 'डबल हेलिक्स और बेस पेअर' }, icon: Dna },
  { id: 'photosynthesis', title: { en: 'Photosynthesis', hi: 'प्रकाश संश्लेषण' }, description: { en: 'Energy Production Lab', hi: 'ऊर्जा उत्पादन लैब' }, icon: Sun },
];

const BiologyModule: React.FC<ModuleProps> = ({ language }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  if (activeTopic === 'dna') return <WithBack onBack={() => setActiveTopic(null)} language={language}><DnaHelix language={language} /></WithBack>;
  if (activeTopic === 'cell') return <WithBack onBack={() => setActiveTopic(null)} language={language}><PlantCell language={language} /></WithBack>;
  if (activeTopic === 'animal') return <WithBack onBack={() => setActiveTopic(null)} language={language}><AnimalCell language={language} /></WithBack>;
  if (activeTopic === 'photosynthesis') return <WithBack onBack={() => setActiveTopic(null)} language={language}><Photosynthesis language={language} /></WithBack>;
  if (activeTopic === 'heart') return <WithBack onBack={() => setActiveTopic(null)} language={language}><Heart language={language} /></WithBack>;
  if (activeTopic === 'brain') return <WithBack onBack={() => setActiveTopic(null)} language={language}><Brain language={language} /></WithBack>;
  if (activeTopic === 'blood') return <WithBack onBack={() => setActiveTopic(null)} language={language}><Blood language={language} /></WithBack>;
  if (activeTopic === 'respiratory') return <WithBack onBack={() => setActiveTopic(null)} language={language}><RespiratorySystem language={language} /></WithBack>;
  if (activeTopic === 'digestive') return <WithBack onBack={() => setActiveTopic(null)} language={language}><DigestiveSystem language={language} /></WithBack>;
  if (activeTopic === 'nutrition') return <WithBack onBack={() => setActiveTopic(null)} language={language}><HumanNutrition language={language} /></WithBack>;
  if (activeTopic === 'vitamins') return <WithBack onBack={() => setActiveTopic(null)} language={language}><Vitamins language={language} /></WithBack>;
  if (activeTopic === 'diseases') return <WithBack onBack={() => setActiveTopic(null)} language={language}><HumanDiseases language={language} /></WithBack>;

  return <TopicGrid language={language} topics={TOPICS} onSelect={setActiveTopic} />;
};

interface WithBackProps {
  children: React.ReactNode;
  onBack: () => void;
  language: Language;
}

const WithBack: React.FC<WithBackProps> = ({ children, onBack, language }) => (
  <div className="flex flex-col h-auto md:h-full gap-4">
    <button onClick={onBack} className="self-start flex items-center gap-2 text-slate-500 hover:text-red-600 text-sm font-medium transition-colors">
      <ArrowLeft size={16} /> {TRANSLATIONS.backToTopics[language]}
    </button>
    <div className="flex-1 h-auto md:h-full">{children}</div>
  </div>
);

interface TopicGridProps {
  language: Language;
  topics: Topic[];
  onSelect: (id: string) => void;
}

const TopicGrid: React.FC<TopicGridProps> = ({ language, topics, onSelect }) => (
  <div className="h-full">
    <h2 className="text-2xl font-bold text-slate-800 mb-6">{TRANSLATIONS.selectTopic[language]}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((t: Topic) => {
        const Icon = t.icon;
        return (
          <button key={t.id} onClick={() => onSelect(t.id)} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-red-300 transition-all text-left group">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
              <Icon size={24} />
            </div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">{language === Language.ENGLISH ? t.title.en : t.title.hi}</h3>
            <p className="text-sm text-slate-500">{language === Language.ENGLISH ? t.description.en : t.description.hi}</p>
          </button>
        )
      })}
    </div>
  </div>
);

export default BiologyModule;