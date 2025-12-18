
import React, { useState } from 'react';
import { ArrowLeft, Flame, Droplets, Search, ArrowRight } from 'lucide-react';
import { Language, Topic } from '../types';
import { TRANSLATIONS } from '../constants';
import Reaction from './chemistry/Reaction';
import PhScale from './chemistry/PhScale';

interface ModuleProps {
  language: Language;
}

const TOPICS: Topic[] = [
  { id: 'reaction', title: { en: 'Reaction Kinetics', hi: 'प्रतिक्रिया गतिकी' }, description: { en: 'Explore temperature and concentration effects.', hi: 'तापमान और सांद्रता के प्रभावों का अन्वेषण करें।' }, icon: Flame },
  { id: 'ph', title: { en: 'pH Scale Lab', hi: 'pH पैमाना लैब' }, description: { en: 'Identify Acids and Bases interactively.', hi: 'एसिड और बेस की इंटरैक्टिव रूप से पहचान करें।' }, icon: Droplets },
];

const ChemistryModule: React.FC<ModuleProps> = ({ language }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  if (activeTopic) {
    const renderContent = () => {
      if (activeTopic === 'reaction') return <Reaction language={language} />;
      if (activeTopic === 'ph') return <PhScale language={language} />;
      return null;
    };

    return (
      <div className="flex flex-col h-full gap-6 animate-fade-in">
        <button 
          onClick={() => setActiveTopic(null)} 
          className="self-start flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-200 text-slate-500 hover:text-emerald-600 transition-all hover:shadow-md active:scale-95 group"
        >
          <div className="bg-slate-50 p-1.5 rounded-lg group-hover:bg-emerald-50 transition-colors">
            <ArrowLeft size={18} />
          </div>
          <span className="font-black text-xs uppercase tracking-widest">{TRANSLATIONS.backToTopics[language]}</span>
        </button>
        <div className="flex-1 h-full">{renderContent()}</div>
      </div>
    );
  }

  return <TopicGrid language={language} topics={TOPICS} onSelect={setActiveTopic} />;
};

const TopicGrid: React.FC<{ language: Language, topics: Topic[], onSelect: (id: string) => void }> = ({ language, topics, onSelect }) => {
  const [search, setSearch] = useState('');
  const filtered = topics.filter(t => t.title.en.toLowerCase().includes(search.toLowerCase()) || t.title.hi.includes(search));

  return (
    <div className="h-full space-y-10 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter leading-none">{TRANSLATIONS.chemistry[language]}</h2>
          <p className="text-slate-500 font-bold mt-3 text-sm uppercase tracking-widest flex items-center gap-2">
            <div className="w-8 h-1 bg-emerald-600 rounded-full"></div>
            {TRANSLATIONS.selectTopic[language]}
          </p>
        </div>
        
        <div className="relative group w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder={language === Language.ENGLISH ? "Search compounds..." : "तत्व खोजें..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white rounded-3xl border border-slate-200 shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all font-bold text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-12">
        {filtered.map((t) => {
          const Icon = t.icon;
          return (
            <button 
              key={t.id} 
              onClick={() => onSelect(t.id)} 
              className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-emerald-200/40 hover:-translate-y-1.5 transition-all text-left group relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-[120px] -mr-8 -mt-8 group-hover:bg-emerald-100 transition-colors opacity-40"></div>
              
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all shadow-inner">
                <Icon size={32} />
              </div>
              
              <h3 className="text-xl font-black text-slate-900 mb-3 leading-tight uppercase tracking-tight group-hover:text-emerald-600 transition-colors">
                {language === Language.ENGLISH ? t.title.en : t.title.hi}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-8 flex-1">
                {language === Language.ENGLISH ? t.description.en : t.description.hi}
              </p>
              
              <div className="flex items-center gap-2 text-emerald-500 font-black text-[11px] uppercase tracking-widest">
                <span>Start Experiment</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default ChemistryModule;