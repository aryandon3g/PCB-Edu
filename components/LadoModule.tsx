import React, { useState } from 'react';
import { ArrowLeft, Activity } from 'lucide-react';
import { Language, Topic } from '../types';
import { TRANSLATIONS } from '../constants';
import PhysicalEducation from './lado/PhysicalEducation';

interface ModuleProps {
  language: Language;
  isNavVisible?: boolean;
}

const TOPICS: Topic[] = [
  { 
    id: 'pe_yoga', 
    title: { en: 'Physical Education & Yoga', hi: 'शारीरिक शिक्षा और योग' }, 
    description: { en: 'Fitness, Health, Yoga (Z040401)', hi: 'फिटनेस, स्वास्थ्य, योग (Z040401)' }, 
    icon: Activity 
  },
];

const LadoModule: React.FC<ModuleProps> = ({ language, isNavVisible }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  if (activeTopic === 'pe_yoga') return <WithBack onBack={() => setActiveTopic(null)} language={language}><PhysicalEducation language={language} isNavVisible={isNavVisible} /></WithBack>;

  return <TopicGrid language={language} topics={TOPICS} onSelect={setActiveTopic} />;
};

interface WithBackProps {
  children: React.ReactNode;
  onBack: () => void;
  language: Language;
}

const WithBack: React.FC<WithBackProps> = ({ children, onBack, language }) => (
  <div className="flex flex-col h-auto md:h-full gap-4">
    <button onClick={onBack} className="self-start flex items-center gap-2 text-slate-500 hover:text-green-600 text-sm font-medium transition-colors">
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
          <button key={t.id} onClick={() => onSelect(t.id)} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-green-300 transition-all text-left group">
            <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-600 group-hover:text-white transition-colors">
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

export default LadoModule;