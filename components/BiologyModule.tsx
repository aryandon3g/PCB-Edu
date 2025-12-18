import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Dna, Leaf, Sun, Cat, HeartPulse, BrainCircuit, Droplet, Wind, Utensils, Apple, Pill, Bug, Baby, Search, Factory, Accessibility } from 'lucide-react';
import { Language, Topic } from '../types';
import { TRANSLATIONS } from '../constants';

// Internal Components
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
import ReproductionModule from './biology/ReproductionModule';
import GlandsModule from './biology/GlandsModule';
import SkeletonModule from './biology/SkeletonModule';

interface ModuleProps {
  language: Language;
}

const TOPICS: Topic[] = [
  { id: 'skeleton', title: { en: 'Skeletal System', hi: 'कंकाल प्रणाली' }, description: { en: 'The Body Framework & Tissues', hi: 'शरीर का ढाँचा और ऊतक' }, icon: Accessibility },
  { id: 'glands', title: { en: 'Glands & Hormones', hi: 'ग्रंथियां और हार्मोन' }, description: { en: 'Shareerpur: Pipeline vs Wireless', hi: 'शरीरपुर: पाइपलाइन बनाम वायरलेस' }, icon: Factory },
  { id: 'reproduction', title: { en: 'Human Reproduction', hi: 'मानव प्रजनन' }, description: { en: 'Systems, Fusion & Life Cycle', hi: 'तंत्र, संलयन और जीवन चक्र' }, icon: Baby },
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
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = TOPICS.filter(t => 
    t.title.en.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.title.hi.includes(searchTerm)
  );

  const renderContent = () => {
    switch(activeTopic) {
        case 'skeleton': return <SkeletonModule language={language} />;
        case 'glands': return <GlandsModule language={language} />;
        case 'reproduction': return <ReproductionModule language={language} />;
        case 'dna': return <DnaHelix language={language} />;
        case 'cell': return <PlantCell language={language} />;
        case 'animal': return <AnimalCell language={language} />;
        case 'photosynthesis': return <Photosynthesis language={language} />;
        case 'heart': return <Heart language={language} />;
        case 'brain': return <Brain language={language} />;
        case 'blood': return <Blood language={language} />;
        case 'respiratory': return <RespiratorySystem language={language} />;
        case 'digestive': return <DigestiveSystem language={language} />;
        case 'nutrition': return <HumanNutrition language={language} />;
        case 'vitamins': return <Vitamins language={language} />;
        case 'diseases': return <HumanDiseases language={language} />;
        default: return null;
    }
  };

  if (activeTopic) {
    return (
        <div className="flex flex-col h-auto md:h-full gap-4 animate-fade-in">
            <button 
                onClick={() => setActiveTopic(null)} 
                className="self-start group flex items-center gap-3 bg-white px-5 py-2.5 rounded-2xl shadow-sm border border-slate-200 text-slate-500 hover:text-rose-600 transition-all active:scale-95"
            >
                <div className="bg-slate-50 p-1.5 rounded-lg group-hover:bg-rose-50 transition-colors">
                    <ArrowLeft size={18} /> 
                </div>
                <span className="font-black text-xs uppercase tracking-widest">{TRANSLATIONS.backToTopics[language]}</span>
            </button>
            <div className="flex-1 h-auto md:h-full">{renderContent()}</div>
        </div>
    );
  }

  return (
    <div className="h-full space-y-8 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter leading-none">{TRANSLATIONS.biology[language]}</h2>
                <p className="text-slate-500 font-bold mt-2 text-sm uppercase tracking-widest">{TRANSLATIONS.selectTopic[language]}</p>
            </div>
            
            <div className="relative group w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-rose-500 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder={language === Language.ENGLISH ? "Search topics..." : "विषय खोजें..."}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl border border-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all font-medium text-sm"
                />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
            {filteredTopics.map((t) => {
                const Icon = t.icon;
                return (
                    <button 
                        key={t.id} 
                        onClick={() => setActiveTopic(t.id)} 
                        className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-rose-100/50 hover:border-rose-200 transition-all text-left group relative overflow-hidden"
                    >
                        <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-[100px] -mr-8 -mt-8 group-hover:bg-rose-100 transition-colors opacity-30"></div>
                        
                        <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-rose-600 group-hover:text-white group-hover:rotate-6 group-hover:scale-110 transition-all shadow-inner">
                            <Icon size={28} />
                        </div>
                        
                        <h3 className="text-lg font-black text-slate-900 mb-2 leading-tight uppercase tracking-tight group-hover:text-rose-600 transition-colors">
                            {language === Language.ENGLISH ? t.title.en : t.title.hi}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                            {language === Language.ENGLISH ? t.description.en : t.description.hi}
                        </p>
                        
                        <div className="mt-6 flex items-center gap-2 text-rose-500 opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                            <span className="text-[10px] font-black uppercase tracking-widest">Explore Experiment</span>
                            <ArrowRight size={14}/>
                        </div>
                    </button>
                )
            })}
        </div>
    </div>
  );
};

export default BiologyModule;