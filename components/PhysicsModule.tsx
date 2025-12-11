import React, { useState } from 'react';
import { ArrowLeft, Zap, Target } from 'lucide-react';
import { Language, Topic } from '../types';
import { TRANSLATIONS } from '../constants';
import Pendulum from './physics/Pendulum';
import Projectile from './physics/Projectile';

interface ModuleProps {
  language: Language;
}

const TOPICS: Topic[] = [
  { id: 'pendulum', title: { en: 'Pendulum Motion', hi: 'लोलक की गति' }, description: { en: 'Explore simple harmonic motion', hi: 'सरल आवर्त गति का अन्वेषण करें' }, icon: Zap },
  { id: 'projectile', title: { en: 'Projectile Motion', hi: 'प्रक्षेप्य गति' }, description: { en: 'Launch objects and track path', hi: 'वस्तुओं को लॉन्च करें और पथ ट्रैक करें' }, icon: Target },
];

const PhysicsModule: React.FC<ModuleProps> = ({ language }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  if (activeTopic === 'pendulum') return <WithBack onBack={() => setActiveTopic(null)} language={language}><Pendulum language={language} /></WithBack>;
  if (activeTopic === 'projectile') return <WithBack onBack={() => setActiveTopic(null)} language={language}><Projectile language={language} /></WithBack>;

  return <TopicGrid language={language} topics={TOPICS} onSelect={setActiveTopic} />;
};

interface WithBackProps {
  children: React.ReactNode;
  onBack: () => void;
  language: Language;
}

const WithBack: React.FC<WithBackProps> = ({ children, onBack, language }) => (
  <div className="flex flex-col h-auto lg:h-full gap-4">
    <button onClick={onBack} className="self-start flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm font-medium transition-colors">
      <ArrowLeft size={16} /> {TRANSLATIONS.backToTopics[language]}
    </button>
    <div className="flex-1 h-auto lg:h-full">{children}</div>
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((t: Topic) => {
        const Icon = t.icon;
        return (
          <button key={t.id} onClick={() => onSelect(t.id)} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all text-left group">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
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

export default PhysicsModule;