import React, { useState } from 'react';
import { TreePine, Zap, Info, ArrowRight, ArrowLeft, CheckCircle, Bug, Droplets, Heart, Baby, Microscope, List, Star, Activity, BookOpen, Layers } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
}

const PlantAnimalKingdom: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'plant' | 'animal' | 'sim' | 'quiz'>('intro');

  return (
    <div className="flex flex-col h-full bg-slate-50 gap-4 overflow-hidden rounded-[32px]">
      {/* Module Navbar */}
      <div className="flex bg-white border-b border-slate-200 overflow-x-auto no-scrollbar flex-shrink-0">
        {[
          { id: 'intro', icon: BookOpen, label: { en: 'Kingdom Intro', hi: 'जगत परिचय' } },
          { id: 'plant', icon: TreePine, label: { en: 'Plantae', hi: 'पादप जगत' } },
          { id: 'animal', icon: Bug, label: { en: 'Animalia', hi: 'जंतु जगत' } },
          { id: 'sim', icon: Activity, label: { en: 'Interactive Labs', hi: 'प्रयोग' } },
          { id: 'quiz', icon: Star, label: { en: 'SSC Practice', hi: 'SSC अभ्यास' } }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all whitespace-nowrap border-b-4 ${activeTab === tab.id ? 'border-green-600 bg-green-50 text-green-700' : 'border-transparent text-slate-500 hover:bg-slate-100'}`}
          >
            <tab.icon size={16} />
            <span className="font-black text-[11px] uppercase tracking-wider">{language === Language.ENGLISH ? tab.label.en : tab.label.hi}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {activeTab === 'intro' && <IntroductionTab language={language} />}
        {activeTab === 'plant' && <PlantKingdomTab language={language} />}
        {activeTab === 'animal' && <AnimalKingdomTab language={language} />}
        {activeTab === 'sim' && <LabsTab language={language} />}
        {activeTab === 'quiz' && <QuizTab language={language} />}
      </div>
    </div>
  );
};

// --- TABS COMPONENTS ---

const IntroductionTab = ({ language }: Props) => (
  <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
    <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full pointer-events-none"></div>
      <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-6">
        {language === Language.ENGLISH ? "Introduction to Kingdoms" : "जगत का वर्गीकरण परिचय"}
      </h2>
      <div className="space-y-4 text-slate-600 leading-relaxed font-medium">
        <p>
          {language === Language.ENGLISH 
            ? "Biological classification is the scientific method of grouping living organisms based on similarities. The most accepted is Whittaker's 5 Kingdom System (Monera, Protista, Fungi, Plantae, Animalia)." 
            : "जैविक वर्गीकरण जीवित जीवों को समानता के आधार पर समूहित करने की वैज्ञानिक विधि है। सबसे अधिक स्वीकृत व्हिटेकर की 5 जगत प्रणाली (मोनेरा, प्रोटिस्टा, कवक, पादप, जंतु) है।"}
        </p>
        <div className="bg-amber-50 p-6 rounded-3xl border border-amber-200 flex items-start gap-4">
          <Zap className="text-amber-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <span className="text-[10px] font-black text-amber-600 uppercase tracking-widest block mb-1">SSC Super Trick</span>
            <p className="text-amber-900 font-bold text-sm">
              {language === Language.ENGLISH 
                ? "Robert Whittaker (1969) proposed the 5 Kingdom classification. Remember the order: M-P-F-P-A!" 
                : "रॉबर्ट व्हिटेकर (1969) ने 5 जगत वर्गीकरण प्रस्तावित किया। क्रम याद रखें: M-P-F-P-A!"}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const PlantKingdomTab = ({ language }: Props) => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const GROUPS = [
    { 
      id: 'thallo', 
      name: { en: 'Thallophyta', hi: 'थैलोफाइटा' }, 
      desc: { 
        en: 'Simplest plants, no stem/roots. Known as ALGAE. Mostly aquatic.', 
        hi: 'सबसे सरल पौधे, कोई तना/जड़ नहीं। इन्हें शैवाल (Algae) के रूप में जाना जाता है।' 
      },
      trick: { en: 'Algae = Thallo (Thallus body)', hi: 'शैवाल = थैलो (थैले जैसा शरीर)' },
      examples: 'Spirogyra, Ulothrix, Chara'
    },
    { 
      id: 'bryo', 
      name: { en: 'Bryophyta', hi: 'ब्रायोफाइटा' }, 
      desc: { 
        en: 'Amphibians of the plant kingdom. Need water for reproduction.', 
        hi: 'पादप जगत के उभयचर (Amphibians)। प्रजनन के लिए पानी की आवश्यकता होती है।' 
      },
      trick: { en: 'B for Bryo, B for Boat (Needs Water)', hi: 'B से Bryo, B से Boat (पानी चाहिए)' },
      examples: 'Moss (Funaria), Marchantia'
    },
    { 
      id: 'pteri', 
      name: { en: 'Pteridophyta', hi: 'टेरिडोफाइटा' }, 
      desc: { 
        en: 'First terrestrial plants with vascular tissue (Xylem/Phloem). Have real roots/stem.', 
        hi: 'संवहनी ऊतक (जाइलम/फ्लोएम) वाले पहले स्थलीय पौधे। वास्तविक जड़ें/तना होते हैं।' 
      },
      trick: { en: 'P is Silent, P is Pioneer (First Vascular)', hi: 'P साइलेंट है, P से पायनियर (पहले संवहनी)' },
      examples: 'Marsilea, Ferns'
    },
    { 
      id: 'gymno', 
      name: { en: 'Gymnosperms', hi: 'जिम्नोस्पर्म' }, 
      desc: { 
        en: 'Produce naked seeds (No fruit/cover). Evergreen, woody, perennial.', 
        hi: 'नग्न बीज (बिना आवरण वाले) पैदा करते हैं। सदाबहार, काष्ठीय और बारहमासी होते हैं।' 
      },
      trick: { en: 'Gymno = Naked Seed (Seeds in a Gym!)', hi: 'जिम्नो = नग्न बीज' },
      examples: 'Pine, Deodar, Cycas'
    },
    { 
      id: 'angio', 
      name: { en: 'Angiosperms', hi: 'एंजियोस्पर्म' }, 
      desc: { 
        en: 'Flowering plants. Seeds are covered inside fruits. Divided into Monocots & Dicots.', 
        hi: 'फूल वाले पौधे। बीज फलों के अंदर ढके होते हैं। एकबीजपत्री और द्विबीजपत्री में विभाजित।' 
      },
      trick: { en: 'Angio = Covered (Seed in a box/jacket)', hi: 'एंजियो = ढका हुआ' },
      examples: 'Pea, Mango, Rice, Wheat'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-3 mb-6">
          <TreePine className="text-green-600" />
          {language === Language.ENGLISH ? "Classification of Plantae" : "पादप जगत का वर्गीकरण"}
        </h3>
        {GROUPS.map(g => (
          <button
            key={g.id}
            onClick={() => setActiveGroup(g.id)}
            className={`w-full text-left p-6 rounded-3xl border-2 transition-all group ${activeGroup === g.id ? 'border-green-500 bg-white shadow-xl scale-105' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
          >
            <div className="flex justify-between items-center">
              <span className="font-black text-lg uppercase tracking-tight text-slate-800">{language === Language.ENGLISH ? g.name.en : g.name.hi}</span>
              <ArrowRight size={20} className={activeGroup === g.id ? 'text-green-600' : 'text-slate-300'} />
            </div>
          </button>
        ))}
      </div>

      <div className="relative">
        {activeGroup ? (
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-2xl animate-scale-up h-full flex flex-col">
            <h4 className="text-4xl font-black text-green-600 mb-4 uppercase tracking-tighter">
              {language === Language.ENGLISH ? GROUPS.find(x => x.id === activeGroup)?.name.en : GROUPS.find(x => x.id === activeGroup)?.name.hi}
            </h4>
            <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8 border-b border-slate-100 pb-8">
              {language === Language.ENGLISH ? GROUPS.find(x => x.id === activeGroup)?.desc.en : GROUPS.find(x => x.id === activeGroup)?.desc.hi}
            </p>
            
            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 mb-8 flex items-start gap-4">
              <Zap className="text-indigo-600 flex-shrink-0" size={24} />
              <div>
                <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Mnemonic Trick</span>
                <p className="text-indigo-900 font-bold">"{language === Language.ENGLISH ? GROUPS.find(x => x.id === activeGroup)?.trick.en : GROUPS.find(x => x.id === activeGroup)?.trick.hi}"</p>
              </div>
            </div>

            <div className="mt-auto bg-slate-50 p-6 rounded-3xl border border-slate-200">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Key Examples</div>
               <div className="flex flex-wrap gap-2">
                  {GROUPS.find(x => x.id === activeGroup)?.examples.split(', ').map(ex => (
                    <span key={ex} className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-slate-700 shadow-sm border border-slate-100">{ex}</span>
                  ))}
               </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-white/50 rounded-[40px] border-4 border-dashed border-slate-200">
            <Layers className="text-slate-300 mb-4" size={64} />
            <p className="text-slate-400 font-black uppercase tracking-widest">Select a plant group to study</p>
          </div>
        )}
      </div>
    </div>
  );
};

const AnimalKingdomTab = ({ language }: Props) => {
  const [activePhylum, setActivePhylum] = useState<string | null>(null);

  const PHYLA = [
    { id: 'pori', name: { en: 'Porifera', hi: 'पोरिफेरा' }, fact: { en: 'Organisms with holes (Pores). Non-motile.', hi: 'छिद्रों (Pores) वाले जीव। अचल होते हैं।' }, trick: 'Pores = Porifera' },
    { id: 'coel', name: { en: 'Coelenterata', hi: 'सिलेंटरेटा' }, fact: { en: 'Have cavity in body. Hydra is an example.', hi: 'शरीर में गुहा (Cavity) होती है। हाइड्रा इसका उदाहरण है।' }, trick: 'C for Cavity' },
    { id: 'arthro', name: { en: 'Arthropoda', hi: 'आर्थ्रोपोडा' }, fact: { en: 'LARGEST GROUP. Open circulatory system. Jointed legs.', hi: 'सबसे बड़ा समूह। खुला परिसंचरण तंत्र। जुड़े हुए पैर।' }, trick: 'Largest + Jointed Legs' },
    { id: 'mollu', name: { en: 'Mollusca', hi: 'मोलस्का' }, fact: { en: 'Soft body. Snails, mussels. Second largest group.', hi: 'कोमल शरीर। घोंघे, सीपी। दूसरा सबसे बड़ा समूह।' }, trick: 'Mollu = Soft/Mushy' },
    { id: 'vert', name: { en: 'Vertebrata', hi: 'वर्टीब्रेटा' }, fact: { en: 'Have true vertebral column & internal skeleton.', hi: 'वास्तविक रीढ़ की हड्डी और आंतरिक कंकाल होता है।' }, trick: 'Backbone Active' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="bg-slate-900 text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full pointer-events-none"></div>
        <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">{language === Language.ENGLISH ? "Animal Kingdom Overview" : "जंतु जगत अवलोकन"}</h2>
        <p className="text-slate-400 font-medium leading-relaxed">
          {language === Language.ENGLISH 
            ? "Animals are eukaryotic, multicellular, and heterotrophic organisms without cell walls. Classification is based on body design, symmetry, and coelom." 
            : "जंतु यूकैरियोटिक, बहुकोशिकीय और बिना कोशिका भित्ति वाले विषमपोषी जीव हैं। वर्गीकरण शरीर की बनावट, सममिति और कोइलोम पर आधारित है।"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PHYLA.map(p => (
          <div key={p.id} className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-sm hover:shadow-xl transition-all">
             <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-red-50 text-red-600 rounded-xl flex items-center justify-center font-black">P</div>
                <h4 className="font-black text-slate-800 uppercase tracking-tighter">{language === Language.ENGLISH ? p.name.en : p.name.hi}</h4>
             </div>
             <p className="text-sm text-slate-500 font-medium leading-relaxed mb-4">
                {/* Fixed error: Changed p.fact.fact to p.fact.hi */}
                {language === Language.ENGLISH ? p.fact.en : p.fact.hi}
             </p>
             <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-2">
                <Zap size={14} className="text-amber-500" />
                <span className="text-[10px] font-black text-slate-600 uppercase">Trick: {p.trick}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const LabsTab = ({ language }: Props) => {
  const [activeLab, setActiveLab] = useState<'heart' | 'seeds'>('heart');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="flex bg-slate-200 p-1 rounded-2xl w-fit mx-auto">
        <button onClick={() => setActiveLab('heart')} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeLab === 'heart' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'}`}>Heart Chamber Lab</button>
        <button onClick={() => setActiveLab('seeds')} className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeLab === 'seeds' ? 'bg-white text-green-600 shadow-md' : 'text-slate-500'}`}>Angiosperm Seeds</button>
      </div>

      <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm min-h-[450px] flex items-center justify-center">
        {activeLab === 'heart' ? <HeartChamberSim language={language} /> : <SeedSim language={language} />}
      </div>
    </div>
  );
};

const HeartChamberSim = ({ language }: Props) => {
  const [stage, setStage] = useState(0);
  const data = [
    { type: 'Pisces (Fish)', chamber: 2, icon: '🐟', fact: '1 Atrium, 1 Ventricle.' },
    { type: 'Amphibia/Reptilia', chamber: 3, icon: '🦎', fact: '2 Atria, 1 Ventricle. (Crocodile is exception: 4)' },
    { type: 'Aves (Birds)/Mammals', chamber: 4, icon: '🦁', fact: '2 Atria, 2 Ventricles. Complete separation.' }
  ];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xl">
       <div className="text-center">
          <div className="text-6xl mb-4">{data[stage].icon}</div>
          <h4 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">{data[stage].type}</h4>
          <p className="text-indigo-600 font-bold mt-1 uppercase tracking-widest">{data[stage].chamber} Heart Chambers</p>
       </div>

       <div className="flex gap-4">
          {Array.from({ length: data[stage].chamber }).map((_, i) => (
            <div key={i} className="w-20 h-24 bg-red-100 border-4 border-red-500 rounded-2xl flex flex-col items-center justify-center shadow-lg animate-pulse">
               <Heart className="text-red-500 mb-2" size={24} fill="currentColor" />
               <span className="text-[10px] font-black text-red-700 uppercase">Room {i+1}</span>
            </div>
          ))}
       </div>

       <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 text-center w-full">
          <p className="text-slate-600 text-sm font-bold italic">"{data[stage].fact}"</p>
       </div>

       <div className="flex gap-4 w-full">
          <button onClick={() => setStage(Math.max(0, stage - 1))} className="flex-1 py-4 bg-slate-100 rounded-2xl font-black text-slate-500 flex items-center justify-center gap-2"><ArrowLeft size={18}/> Prev</button>
          <button onClick={() => setStage(Math.min(data.length - 1, stage + 1))} className="flex-1 py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg flex items-center justify-center gap-2">Next Evolution <ArrowRight size={18}/></button>
       </div>
    </div>
  );
};

const SeedSim = ({ language }: Props) => {
  const [type, setType] = useState<'mono' | 'di'>('mono');

  return (
    <div className="flex flex-col md:flex-row items-center gap-12 w-full justify-center">
       <div className="flex flex-col gap-3">
          <button onClick={() => setType('mono')} className={`px-8 py-4 rounded-2xl font-black uppercase text-xs transition-all ${type === 'mono' ? 'bg-green-600 text-white shadow-xl' : 'bg-slate-100 text-slate-500'}`}>Monocots</button>
          <button onClick={() => setType('di')} className={`px-8 py-4 rounded-2xl font-black uppercase text-xs transition-all ${type === 'di' ? 'bg-green-600 text-white shadow-xl' : 'bg-slate-100 text-slate-500'}`}>Dicots</button>
       </div>

       <div className="flex flex-col items-center">
          {type === 'mono' ? (
            <div className="w-40 h-60 bg-yellow-50 border-8 border-yellow-500 rounded-[80px_80px_20px_20px] flex items-center justify-center relative overflow-hidden shadow-2xl">
               <div className="w-1 h-full bg-yellow-200 absolute opacity-30"></div>
               <div className="z-10 text-center">
                  <div className="font-black text-yellow-600 text-xl">1</div>
                  <div className="text-[8px] font-black uppercase text-yellow-700 tracking-widest">Cotyledon</div>
               </div>
            </div>
          ) : (
            <div className="flex gap-1">
              <div className="w-24 h-60 bg-amber-50 border-8 border-amber-600 rounded-[80px_10px_10px_80px] flex items-center justify-center shadow-lg">
                <div className="font-black text-amber-700">1</div>
              </div>
              <div className="w-24 h-60 bg-amber-50 border-8 border-amber-600 rounded-[10px_80px_80px_10px] flex items-center justify-center shadow-lg">
                <div className="font-black text-amber-700">2</div>
              </div>
            </div>
          )}
          <div className="mt-8 text-center">
             <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{type === 'mono' ? 'Single Seed Leaf' : 'Two Seed Leaves'}</h4>
             <p className="text-slate-400 font-bold text-xs uppercase mt-1">{type === 'mono' ? 'Examples: Rice, Wheat, Grass' : 'Examples: Mango, Pea, Gram'}</p>
          </div>
       </div>
    </div>
  );
};

const QuizTab = ({ language }: Props) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);

  const QUESTIONS = [
    { q: "Which group is known as 'Amphibians of plant kingdom'?", a: "Bryophyta", o: ["Thallophyta", "Bryophyta", "Pteridophyta", "Angiosperms"] },
    { q: "Who proposed the 5 Kingdom classification?", a: "Whittaker", o: ["Linnaeus", "Whittaker", "Darwin", "Mendel"] },
    { q: "Which is the largest group in the Animal Kingdom?", a: "Arthropoda", o: ["Mollusca", "Porifera", "Arthropoda", "Annelida"] },
    { q: "Gymnosperms are known for producing what?", a: "Naked Seeds", o: ["Flowers", "Naked Seeds", "Spores", "Fruit"] },
    { q: "How many chambers does a Crocodile heart have?", a: "4", o: ["2", "3", "4", "1"] }
  ];

  const handleAnswer = (opt: string) => {
    if (answered !== null) return;
    if (opt === QUESTIONS[index].a) {
      setScore(s => s + 1);
      setAnswered(true);
    } else {
      setAnswered(false);
    }
  };

  const next = () => {
    setIndex(i => (i + 1) % QUESTIONS.length);
    setAnswered(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 animate-fade-in">
       <div className="mb-10 flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="font-black text-slate-800 uppercase tracking-tighter">Kingdom Quiz</h3>
            <p className="text-xs text-slate-400 font-bold uppercase">Question {index + 1} of {QUESTIONS.length}</p>
          </div>
          <div className="bg-green-600 text-white px-5 py-2 rounded-2xl font-black shadow-lg">Score: {score}</div>
       </div>

       <div className="bg-white p-10 rounded-[48px] border-4 border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500/20"></div>
          <h2 className="text-2xl font-black text-slate-800 mb-10 leading-tight">Q: {QUESTIONS[index].q}</h2>
          
          <div className="grid gap-3">
             {QUESTIONS[index].o.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className={`w-full p-5 rounded-2xl font-bold text-left transition-all border-2 ${answered !== null ? (opt === QUESTIONS[index].a ? 'bg-green-50 border-green-500 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-300') : 'bg-white border-slate-100 hover:border-green-500 hover:bg-green-50 text-slate-600'}`}
                >
                  {opt}
                </button>
             ))}
          </div>

          {answered !== null && (
            <button onClick={next} className="mt-10 w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl hover:bg-black active:scale-95 transition-all">Next Question</button>
          )}
       </div>
    </div>
  );
};

export default PlantAnimalKingdom;