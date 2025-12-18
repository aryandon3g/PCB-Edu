
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Zap, Target, Search, ArrowRight, MousePointer2 } from 'lucide-react';
import { Language, Topic } from '../types';
import { TRANSLATIONS } from '../constants';
import Pendulum from './physics/Pendulum';
import Projectile from './physics/Projectile';

interface ModuleProps {
  language: Language;
}

const TOPICS: Topic[] = [
  { id: 'pendulum', title: { en: 'Pendulum Motion', hi: 'लोलक की गति' }, description: { en: 'Study frequency, gravity and harmonic motion.', hi: 'आवृत्ति, गुरुत्वाकर्षण और गति का अध्ययन।' }, icon: Zap },
  { id: 'projectile', title: { en: 'Projectile Motion', hi: 'प्रक्षेप्य गति' }, description: { en: 'Launch physics: trajectory, velocity & angles.', hi: 'लॉन्च भौतिकी: प्रक्षेपवक्र, वेग और कोण।' }, icon: Target },
];

const PhysicsModule: React.FC<ModuleProps> = ({ language }) => {
  const [activeTopic, setActiveTopic] = useState<string | null>(null);

  // Bug Fix: Reset body overflow when switching
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeTopic]);

  if (activeTopic) {
    const renderContent = () => {
      if (activeTopic === 'pendulum') return <Pendulum language={language} />;
      if (activeTopic === 'projectile') return <Projectile language={language} />;
      return null;
    };

    return (
      <div className="flex flex-col h-full animate-fade-in gap-6">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => setActiveTopic(null)} 
            className="group flex items-center gap-3 bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-200 text-slate-500 hover:text-indigo-600 transition-all active:scale-95"
          >
            <div className="bg-slate-50 p-1.5 rounded-lg group-hover:bg-indigo-50 transition-colors">
              <ArrowLeft size={18} />
            </div>
            <span className="font-black text-[11px] uppercase tracking-[0.1em]">{TRANSLATIONS.backToTopics[language]}</span>
          </button>
          
          <div className="hidden sm:flex items-center gap-2 bg-indigo-50 px-4 py-2 rounded-xl border border-indigo-100">
             <div className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></div>
             <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">Active Laboratory</span>
          </div>
        </div>

        <div className="flex-1 min-h-0 bg-white rounded-[32px] shadow-sm border border-slate-100 p-2 overflow-hidden">
           {renderContent()}
        </div>
      </div>
    );
  }

  return <TopicGrid language={language} topics={TOPICS} onSelect={setActiveTopic} />;
};

const TopicGrid: React.FC<{ language: Language, topics: Topic[], onSelect: (id: string) => void }> = ({ language, topics, onSelect }) => {
  const [search, setSearch] = useState('');
  const filtered = topics.filter(t => t.title.en.toLowerCase().includes(search.toLowerCase()) || t.title.hi.includes(search));

  return (
    <div className="h-full space-y-12 animate-fade-in">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-2xl">
          <h2 className="text-5xl md:text-6xl font-black text-slate-900 uppercase tracking-tighter leading-[0.9]">
            {TRANSLATIONS.physics[language]}
          </h2>
          <div className="mt-6 flex items-center gap-4">
             <div className="h-1.5 w-16 bg-indigo-600 rounded-full"></div>
             <p className="text-slate-500 font-bold text-sm uppercase tracking-[0.2em]">{TRANSLATIONS.selectTopic[language]}</p>
          </div>
        </div>
        
        <div className="relative group w-full lg:w-[450px]">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors" size={20} />
          <input 
            type="text" 
            placeholder={language === Language.ENGLISH ? "Search physics experiments..." : "प्रयोग खोजें..."}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-14 pr-6 py-5 bg-white rounded-[28px] border border-slate-200 shadow-xl shadow-slate-200/40 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-bold text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-20">
        {filtered.map((t) => {
          const Icon = t.icon;
          return (
            <button 
              key={t.id} 
              onClick={() => onSelect(t.id)} 
              className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-indigo-200/50 hover:-translate-y-2 transition-all text-left group relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-50/50 rounded-bl-[150px] -mr-10 -mt-10 group-hover:bg-indigo-100 transition-colors pointer-events-none"></div>
              
              <div className="w-18 h-18 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-10 group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all shadow-inner border border-indigo-100">
                <Icon size={32} strokeWidth={2.5} />
              </div>
              
              <h3 className="text-2xl font-black text-slate-900 mb-4 leading-tight uppercase tracking-tight group-hover:text-indigo-600 transition-colors">
                {language === Language.ENGLISH ? t.title.en : t.title.hi}
              </h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10 flex-1 opacity-80 group-hover:opacity-100">
                {language === Language.ENGLISH ? t.description.en : t.description.hi}
              </p>
              
              <div className="flex items-center gap-3 text-indigo-600 font-black text-[11px] uppercase tracking-[0.2em]">
                <MousePointer2 size={16} />
                <span>Start Simulation</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          )
        })}
      </div>
    </div>
  );
};

export default PhysicsModule;
