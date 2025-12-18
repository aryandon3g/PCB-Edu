
import React, { useState, useEffect, useRef } from 'react';
// Add missing Utensils import
import { BookOpen, Gamepad2, ArrowRight, ArrowLeft, Check, X, RotateCcw, Zap, Play, Apple, Box, Beaker, Battery, Flame, Microscope, Utensils } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
}

// --- STORY CONTENT DATA ---
const STORY_CHAPTERS = [
  {
    id: 1,
    title: { en: "Chapter 1: Fuel of Life & Classification", hi: "अध्याय 1: जीवन का ईंधन और वर्गीकरण" },
    text: {
        en: "Professor Poshan entered the class. 'Anu,' he asked the molecule, 'Why are you important?' Anu replied, 'For Growth, Development, and Cell Energy!' Nutrients are divided into Macro (Carbs, Protein, Fats) and Micro (Vitamins, Minerals). Anu is a Macro Nutrient: Carbohydrate.",
        hi: "प्रोफेसर पोषण ने कक्षा में प्रवेश किया। 'अणु,' उन्होंने पूछा, 'तुम क्यों महत्वपूर्ण हो?' अणु ने जवाब दिया, 'विकास, वृद्धि और कोशिका ऊर्जा के लिए!' पोषक तत्व दो वर्गों में बँटते हैं: वृहत (Macro - कार्ब्स, प्रोटीन, वसा) और सूक्ष्म (Micro - विटामिन, खनिज)। अणु एक कार्बोहाइड्रेट है।"
    },
    visual: 'classification'
  },
  {
    id: 2,
    title: { en: "Chapter 2: Identity & Energy Ratio", hi: "अध्याय 2: पहचान और ऊर्जा का रहस्य" },
    text: {
        en: "Professor explained Anu's structure: Carbon (C), Hydrogen (H), and Oxygen (O) in a 1:2:1 ratio. When broken down, Anu provides exactly 4.2 Calories per gram. An average human needs 350-400g of Carbs daily.",
        hi: "प्रोफेसर ने अणु की संरचना समझाई: कार्बन, हाइड्रोजन, और ऑक्सीजन का अनुपात 1:2:1 होता है। टूटने पर, अणु प्रति ग्राम 4.2 कैलोरी ऊर्जा प्रदान करता है। एक औसत इंसान को प्रतिदिन 350-400 ग्राम कार्ब्स की आवश्यकता होती है।"
    },
    visual: 'ratio'
  },
  {
    id: 3,
    title: { en: "Chapter 3: The Digestive Journey", hi: "अध्याय 3: पाचन का रोमांचक सफर" },
    text: {
        en: "The journey follows: Ingestion -> Digestion -> Assimilation -> Excretion. In the Mouth, Ptylin enzyme does partial digestion. In the Small Intestine, Amylase from the Pancreas ensures complete digestion into Glucose.",
        hi: "यात्रा का क्रम है: अन्तर्ग्ाहण -> पाचन -> सर्वांगीकरण -> उत्सर्जन। मुँह में, टायलिन एंजाइम आंशिक पाचन करता है। छोटी आँत में, अग्नाशय से आया एमाइलेज पूर्ण पाचन (ग्लूकोज में बदलना) सुनिश्चित करता है।"
    },
    visual: 'journey'
  },
  {
    id: 4,
    title: { en: "Chapter 4: Meet the Saccharide Family", hi: "अध्याय 4: शर्करा परिवार (सैकराइड)" },
    text: {
        en: "Monosaccharides (Glucose, Fructose) give instant energy. Disaccharides (Sucrose, Lactose) are two units. Polysaccharides are for storage: Glycogen in humans, Starch in plants, and Cellulose for plant structure.",
        hi: "मोनोसैकेराइड (ग्लूकोज, फ्रुक्टोज) तुरंत ऊर्जा देते हैं। डाई-सैकेराइड (सुक्रोज, लैक्टोज) दो इकाइयाँ हैं। पॉलीसैकेराइड भंडारण के लिए हैं: मनुष्यों में ग्लाइकोजन, पौधों में स्टार्च, और पौधों की संरचना के लिए सेल्युलोज।"
    },
    visual: 'family'
  }
];

const HumanNutrition: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'sims'>('story');
  const [chapter, setChapter] = useState(0);

  return (
    <div className="flex flex-col h-full bg-orange-50 gap-4 overflow-hidden">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-4 rounded-xl shadow-md text-white flex justify-between items-center flex-shrink-0 mx-2 mt-2">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
             <Apple className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              {language === Language.ENGLISH ? "Human Nutrition" : "मानव पोषण"}
            </h1>
            <p className="text-orange-100 text-[10px] font-mono uppercase tracking-widest">Interactive Sandbox</p>
          </div>
        </div>
        
        <div className="flex bg-black/20 p-1 rounded-lg border border-white/10">
           <button 
             onClick={() => setActiveTab('story')}
             className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'story' ? 'bg-white text-orange-700 shadow' : 'text-orange-100 hover:text-white'}`}
           >
              <BookOpen size={14} /> {language === Language.ENGLISH ? "Learn" : "सीखें"}
           </button>
           <button 
             onClick={() => setActiveTab('sims')}
             className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'sims' ? 'bg-white text-orange-700 shadow' : 'text-orange-100 hover:text-white'}`}
           >
              <Gamepad2 size={14} /> {language === Language.ENGLISH ? "Play" : "खेलें"}
           </button>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="flex-1 overflow-hidden relative p-2">
        {activeTab === 'story' ? (
          <StoryMode language={language} chapter={chapter} setChapter={setChapter} />
        ) : (
          <SimulationHub language={language} />
        )}
      </div>
    </div>
  );
};

// --- STORY MODE COMPONENT ---
const StoryMode = ({ language, chapter, setChapter }: { language: Language, chapter: number, setChapter: (c: number) => void }) => {
    const data = STORY_CHAPTERS[chapter];

    const renderVisual = (type: string) => {
        switch(type) {
            case 'classification':
                return (
                    <div className="flex flex-col items-center justify-center gap-6 animate-fade-in h-full">
                        <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                            <div className="bg-orange-100 p-4 rounded-2xl border-2 border-orange-300 text-center shadow-sm">
                                <span className="text-2xl mb-2 block">🍔</span>
                                <h4 className="font-bold text-orange-800 text-sm">MACRO</h4>
                                <p className="text-[10px] text-orange-600">Need in LARGE amounts (Carbs, Protein, Fats)</p>
                            </div>
                            <div className="bg-blue-100 p-4 rounded-2xl border-2 border-blue-300 text-center shadow-sm">
                                <span className="text-2xl mb-2 block">💊</span>
                                <h4 className="font-bold text-blue-800 text-sm">MICRO</h4>
                                <p className="text-[10px] text-blue-600">Need in SMALL amounts (Vitamins, Minerals)</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 bg-white p-4 rounded-full shadow-lg border border-orange-100">
                             <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">Anu</div>
                             <span className="font-bold text-slate-700">"I am a Macro Nutrient!"</span>
                        </div>
                    </div>
                );
            case 'ratio':
                return (
                    <div className="flex flex-col items-center justify-center gap-4 h-full">
                        <div className="bg-white p-8 rounded-3xl shadow-xl border-t-4 border-orange-500 text-center relative overflow-hidden">
                            <div className="absolute top-0 right-0 bg-orange-500 text-white px-3 py-1 text-[10px] font-bold">1:2:1</div>
                            <h3 className="text-3xl font-black text-slate-800 mb-2 font-mono">C : H : O</h3>
                            <p className="text-slate-500 text-xs mb-6 uppercase tracking-widest">Chemical Identity</p>
                            <div className="flex items-center justify-center gap-3">
                                <div className="p-3 bg-yellow-100 rounded-xl text-yellow-700 border border-yellow-200">
                                    <Flame size={20} className="mx-auto mb-1" />
                                    <div className="font-bold text-lg">4.2</div>
                                    <div className="text-[8px] uppercase">Cal/Gram</div>
                                </div>
                                <div className="p-3 bg-green-100 rounded-xl text-green-700 border border-green-200">
                                    <Battery size={20} className="mx-auto mb-1" />
                                    <div className="font-bold text-lg">400g</div>
                                    <div className="text-[8px] uppercase">Daily Limit</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'journey':
                return (
                    <div className="h-full flex items-center justify-center">
                        <svg viewBox="0 0 400 300" className="w-full max-w-sm h-full max-h-[250px]">
                            <defs>
                                <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#ef4444" />
                                    <stop offset="50%" stopColor="#f59e0b" />
                                    <stop offset="100%" stopColor="#22c55e" />
                                </linearGradient>
                            </defs>
                            <path d="M50,50 Q200,50 200,150 T350,250" fill="none" stroke="url(#pathGrad)" strokeWidth="30" strokeLinecap="round" opacity="0.1" />
                            <path d="M50,50 Q200,50 200,150 T350,250" fill="none" stroke="url(#pathGrad)" strokeWidth="4" strokeDasharray="10,5" />
                            
                            {/* Mouth */}
                            <circle cx="50" cy="50" r="10" fill="#ef4444" />
                            <text x="50" y="80" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ef4444">Ingestion (Mouth)</text>
                            
                            {/* Digestion Point */}
                            <circle cx="200" cy="150" r="10" fill="#f59e0b" />
                            <text x="215" y="155" fontSize="10" fontWeight="bold" fill="#b45309">Digestion (Intestine)</text>
                            
                            {/* Cell Entry */}
                            <circle cx="350" cy="250" r="10" fill="#22c55e" />
                            <text x="350" y="235" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#15803d">Assimilation (Cell)</text>

                            {/* Anu moving */}
                            <circle r="6" fill="#fbbf24" stroke="white" strokeWidth="2">
                                <animateMotion dur="4s" repeatCount="indefinite" path="M50,50 Q200,50 200,150 T350,250" />
                            </circle>
                        </svg>
                    </div>
                );
            case 'family':
                return (
                    <div className="flex flex-col items-center justify-center gap-3 h-full">
                        <div className="w-full max-w-xs space-y-2">
                             <div className="bg-white p-2 rounded-lg border border-orange-200 flex items-center gap-3 shadow-sm">
                                 <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                                 <div className="text-[10px]"><strong>Mono:</strong> Glucose, Fructose (Instant)</div>
                             </div>
                             <div className="bg-white p-2 rounded-lg border border-orange-200 flex items-center gap-3 shadow-sm ml-4">
                                 <div className="flex -space-x-2">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                                    <div className="w-8 h-8 bg-blue-500 rounded-full border-2 border-white"></div>
                                 </div>
                                 <div className="text-[10px]"><strong>Oligo:</strong> Lactose, Sucrose (Honey)</div>
                             </div>
                             <div className="bg-white p-2 rounded-lg border border-orange-200 flex items-center gap-3 shadow-sm ml-8">
                                 <div className="flex -space-x-4 overflow-hidden w-20 h-8">
                                    {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-8 bg-green-500 rounded-full border-2 border-white"></div>)}
                                 </div>
                                 <div className="text-[10px]"><strong>Poly:</strong> Starch, Glycogen (Storage)</div>
                             </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-4 p-2">
            {/* Visual Screen */}
            <div className="flex-1 bg-white rounded-2xl shadow-inner border border-orange-100 flex flex-col items-center justify-center p-4 relative overflow-hidden min-h-[250px]">
                <div className="absolute top-2 left-2 bg-orange-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm z-10 flex items-center gap-1">
                    <Microscope size={12}/> Visual Lab
                </div>
                {renderVisual(data.visual)}
                
                {/* Progress Dots */}
                <div className="absolute bottom-4 flex gap-2">
                    {STORY_CHAPTERS.map((_, i) => (
                        <button key={i} onClick={() => setChapter(i)} className={`h-1.5 rounded-full transition-all ${i === chapter ? 'w-8 bg-orange-600' : 'w-2 bg-slate-200'}`} />
                    ))}
                </div>
            </div>

            {/* Story Card */}
            <div className="w-full md:w-80 lg:w-96 flex flex-col gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-lg border-l-8 border-orange-500 flex-1 flex flex-col min-h-[300px]">
                    <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                         <span className="w-6 h-6 bg-orange-100 text-orange-600 rounded flex items-center justify-center text-xs">{chapter+1}</span>
                         {language === Language.ENGLISH ? data.title.en : data.title.hi}
                    </h2>
                    
                    <div className="bg-orange-50/50 p-4 rounded-xl mb-4 border border-orange-100 relative flex-1">
                        <p className="text-slate-700 leading-relaxed text-sm md:text-base italic">
                            "{language === Language.ENGLISH ? data.text.en : data.text.hi}"
                        </p>
                    </div>

                    <div className="flex justify-between gap-4 mt-auto">
                        <button 
                            onClick={() => setChapter(Math.max(0, chapter - 1))}
                            disabled={chapter === 0}
                            className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold disabled:opacity-30 flex items-center justify-center gap-2 hover:bg-slate-200 transition-colors"
                        >
                            <ArrowLeft size={18}/>
                        </button>
                        <button 
                            onClick={() => setChapter(Math.min(STORY_CHAPTERS.length - 1, chapter + 1))}
                            disabled={chapter === STORY_CHAPTERS.length - 1}
                            className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold disabled:opacity-30 flex items-center justify-center gap-2 shadow-lg hover:bg-orange-700 transition-all"
                        >
                            {language === Language.ENGLISH ? "Next" : "आगे"} <ArrowRight size={18}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- SIMULATION HUB ---
const SimulationHub = ({ language }: { language: Language }) => {
    const [sim, setSim] = useState<'relay' | 'builder' | 'energy'>('relay');

    return (
        <div className="h-full flex flex-col gap-4 animate-fade-in">
            {/* Nav */}
            <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1 flex-shrink-0">
                {[
                    { id: 'relay', icon: Play, label: { en: "Enzyme Relay", hi: "एंजाइम रिले" } },
                    { id: 'builder', icon: Beaker, label: { en: "Molecule Balancer", hi: "अणु संतुलित" } },
                    { id: 'energy', icon: Battery, label: { en: "Energy Challenge", hi: "ऊर्जा चुनौती" } }
                ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setSim(item.id as any)}
                      className={`flex-1 py-2 px-2 rounded-lg text-[10px] md:text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${sim === item.id ? 'bg-orange-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        <item.icon size={14} />
                        {language === Language.ENGLISH ? item.label.en : item.label.hi}
                    </button>
                ))}
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-inner border border-slate-200 overflow-y-auto p-4 custom-scrollbar">
                {sim === 'relay' && <DigestionRelay language={language} />}
                {sim === 'builder' && <MoleculeBuilder language={language} />}
                {sim === 'energy' && <EnergyChallenge language={language} />}
            </div>
        </div>
    );
};

// --- SIM 1: DIGESTION RELAY ---
const DigestionRelay = ({ language }: { language: Language }) => {
    const [step, setStep] = useState(0); // 0: Mouth, 1: Intestine, 2: Energy
    const [hint, setHint] = useState<string | null>(null);

    const handleAction = (type: string) => {
        if (step === 0) {
            if (type === 'Ptylin') {
                setStep(1);
                setHint(null);
            } else setHint(language === Language.ENGLISH ? "Wrong! Mouth uses Ptylin." : "गलत! मुँह में टायलिन होता है।");
        } else if (step === 1) {
            if (type === 'Amylase') {
                setStep(2);
                setHint(null);
            } else setHint(language === Language.ENGLISH ? "Wrong! Intestine needs Amylase." : "गलत! आंत को एमाइलेज चाहिए।");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 max-w-xl mx-auto">
             <div className="text-center">
                 <h3 className="text-xl font-black text-slate-800">{language === Language.ENGLISH ? "The Enzyme Relay Race" : "एंजाइम रिले दौड़"}</h3>
                 <p className="text-xs text-slate-500">{language === Language.ENGLISH ? "Apply the correct enzyme to digest the carb molecule!" : "कार्ब अणु को पचाने के लिए सही एंजाइम चुनें!"}</p>
             </div>

             <div className="w-full relative py-12">
                 <div className="absolute top-1/2 left-0 right-0 h-4 bg-slate-100 rounded-full -translate-y-1/2 -z-10 shadow-inner"></div>
                 <div className="flex justify-between relative z-10 px-4">
                     <div className={`flex flex-col items-center gap-2 ${step >= 0 ? 'opacity-100' : 'opacity-30'}`}>
                         <div className={`w-14 h-14 rounded-2xl border-4 transition-all ${step === 0 ? 'bg-red-100 border-red-500 scale-110 shadow-lg' : 'bg-slate-200 border-slate-400'}`}>
                             <Utensils className="m-auto mt-2.5 text-red-600" />
                         </div>
                         <span className="text-[10px] font-bold">Mouth</span>
                     </div>
                     <div className={`flex flex-col items-center gap-2 ${step >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                        <div className={`w-14 h-14 rounded-2xl border-4 transition-all ${step === 1 ? 'bg-orange-100 border-orange-500 scale-110 shadow-lg' : 'bg-slate-200 border-slate-400'}`}>
                            <Beaker className="m-auto mt-2.5 text-orange-600" />
                        </div>
                        <span className="text-[10px] font-bold">Intestine</span>
                     </div>
                     <div className={`flex flex-col items-center gap-2 ${step >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                        <div className={`w-14 h-14 rounded-2xl border-4 transition-all ${step === 2 ? 'bg-green-100 border-green-500 scale-125 shadow-[0_0_20px_rgba(34,197,94,0.4)]' : 'bg-slate-200 border-slate-400'}`}>
                            <Zap className="m-auto mt-2.5 text-green-600" />
                        </div>
                        <span className="text-[10px] font-bold">Cell Energy</span>
                     </div>
                 </div>

                 {/* Anu character moving */}
                 <div 
                    className="absolute top-1/2 -mt-5 w-10 h-10 bg-orange-500 rounded-full border-4 border-white shadow-lg transition-all duration-700 ease-in-out z-20 flex items-center justify-center text-[10px] text-white font-bold"
                    style={{ left: step === 0 ? '10%' : step === 1 ? '45%' : '85%', transform: 'translateX(-50%) translateY(-50%)' }}
                 >
                    Anu
                 </div>
             </div>

             {step < 2 ? (
                 <div className="flex flex-col gap-4 w-full">
                     <div className="grid grid-cols-2 gap-3">
                         <button onClick={() => handleAction('Ptylin')} className="p-4 bg-white border-2 border-slate-200 rounded-2xl font-bold hover:border-red-500 hover:bg-red-50 transition-all text-sm text-slate-700">PTYLIN (Saliva)</button>
                         <button onClick={() => handleAction('Amylase')} className="p-4 bg-white border-2 border-slate-200 rounded-2xl font-bold hover:border-orange-500 hover:bg-orange-50 transition-all text-sm text-slate-700">AMYLASE (Pancreas)</button>
                     </div>
                     {hint && <div className="text-center text-red-500 font-bold text-xs animate-bounce">{hint}</div>}
                 </div>
             ) : (
                 <div className="text-center animate-bounce-in">
                     <div className="bg-green-100 text-green-700 p-4 rounded-2xl border-2 border-green-500 font-bold text-sm mb-4">
                         {language === Language.ENGLISH ? "SUCCESS! Anu is fully digested and assimilated." : "सफलता! अणु पूरी तरह से पच गया है।"}
                     </div>
                     <button onClick={() => { setStep(0); setHint(null); }} className="flex items-center gap-2 mx-auto text-slate-400 hover:text-orange-600 font-bold text-xs uppercase tracking-widest"><RotateCcw size={14}/> Try Again</button>
                 </div>
             )}
        </div>
    );
};

// --- SIM 2: MOLECULE BUILDER ---
const MoleculeBuilder = ({ language }: { language: Language }) => {
    const [counts, setCounts] = useState({ c: 1, h: 1, o: 1 });
    const [result, setResult] = useState<string | null>(null);

    const update = (atom: 'c'|'h'|'o', delta: number) => {
        setCounts(prev => ({ ...prev, [atom]: Math.max(1, prev[atom] + delta) }));
    };

    const check = () => {
        if (counts.c === 6 && counts.h === 12 && counts.o === 6) {
            setResult('GLUCOSE (C₆H₁₂O₆)');
        } else if (counts.c === 12 && counts.h === 22 && counts.o === 11) {
            setResult('SUCROSE (C₁₂H₂₂O₁₁)');
        } else {
            setResult(null);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8">
            <div className="text-center">
                <h3 className="text-xl font-black text-slate-800">Molecule Balancer</h3>
                <p className="text-xs text-slate-500">Balance the Carbon:Hydrogen:Oxygen ratio!</p>
            </div>

            <div className="flex gap-4 md:gap-8 items-end">
                <AtomControl label="Carbon" count={counts.c} color="bg-slate-700" onAdd={() => update('c', 1)} onSub={() => update('c', -1)} />
                <AtomControl label="Hydrogen" count={counts.h} color="bg-blue-500" onAdd={() => update('h', 1)} onSub={() => update('h', -1)} />
                <AtomControl label="Oxygen" count={counts.o} color="bg-red-500" onAdd={() => update('o', 1)} onSub={() => update('o', -1)} />
            </div>

            <div className="w-full max-w-xs text-center space-y-4">
                <button onClick={check} className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-lg hover:bg-indigo-700 transition-all active:scale-95">REACTION TEST</button>
                <div className={`h-16 flex items-center justify-center rounded-2xl border-2 transition-all ${result ? 'bg-green-50 border-green-500 text-green-700 font-bold' : 'bg-slate-50 border-slate-200 text-slate-400 text-xs italic'}`}>
                    {result || "Waiting for valid formula..."}
                </div>
            </div>
            
            <div className="bg-amber-50 p-3 rounded-xl text-[10px] text-amber-800 border border-amber-200 text-center">
                <strong>Tip:</strong> Glucose needs $1:2:1$ ratio. $C_6H_{12}O_6$
            </div>
        </div>
    );
};

const AtomControl = ({ label, count, color, onAdd, onSub }: any) => (
    <div className="flex flex-col items-center gap-2">
        <div className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white font-bold text-xl md:text-2xl shadow-lg border-4 border-white/50 ${color}`}>
            {count}
        </div>
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
        <div className="flex gap-1">
            <button onClick={onSub} className="w-8 h-8 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 font-bold">-</button>
            <button onClick={onAdd} className="w-8 h-8 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 font-bold">+</button>
        </div>
    </div>
);

// --- SIM 3: ENERGY CHALLENGE ---
const EnergyChallenge = ({ language }: { language: Language }) => {
    const [charge, setCharge] = useState(0);
    const [type, setType] = useState<'spike' | 'steady' | null>(null);

    const chargeUp = (mode: 'spike' | 'steady') => {
        setType(mode);
        setCharge(0);
        let current = 0;
        const interval = setInterval(() => {
            current += (mode === 'spike' ? 5 : 2);
            if (current >= 100) {
                current = 100;
                clearInterval(interval);
                // Start drain
                setTimeout(() => {
                    const drain = setInterval(() => {
                        setCharge(prev => {
                            const dec = (mode === 'spike' ? 10 : 2);
                            if (prev <= 0) { clearInterval(drain); return 0; }
                            return prev - dec;
                        });
                    }, mode === 'spike' ? 200 : 500);
                }, 1000);
            }
            setCharge(current);
        }, 50);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="text-center">
                <h3 className="text-xl font-black text-slate-800">Energy Release Challenge</h3>
                <p className="text-xs text-slate-500">Compare how different carbs power your body!</p>
            </div>

            <div className="relative w-24 h-48 bg-slate-100 border-4 border-slate-300 rounded-3xl p-1 shadow-inner overflow-hidden">
                <div 
                    className={`absolute bottom-0 left-0 right-0 transition-all duration-300 rounded-t-xl ${type === 'spike' ? 'bg-red-500' : 'bg-emerald-500'}`}
                    style={{ height: `${charge}%` }}
                >
                     <div className="w-full h-full animate-pulse bg-white/20"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center font-black text-xl mix-blend-multiply opacity-20">
                    {charge}%
                </div>
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-8 h-2 bg-slate-300 rounded-full"></div>
            </div>

            {/* Fix: Avoid grid-cols-2 for very small screens if needed, or keep for better layout */}
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm max-sm:grid-cols-1">
                <button onClick={() => chargeUp('spike')} className="p-4 bg-white border-2 border-red-200 rounded-2xl hover:border-red-500 hover:bg-red-50 transition-all group">
                    <Zap className="mx-auto text-red-500 mb-1 group-hover:scale-125 transition-transform" />
                    <div className="font-bold text-xs">GLUCOSE</div>
                    <div className="text-[8px] text-red-400">Instant Spike</div>
                </button>
                <button onClick={() => chargeUp('steady')} className="p-4 bg-white border-2 border-emerald-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all group">
                    <RotateCcw className="mx-auto text-emerald-500 mb-1 group-hover:rotate-180 transition-transform" />
                    <div className="font-bold text-xs">STARCH</div>
                    <div className="text-[8px] text-emerald-400">Slow Release</div>
                </button>
            </div>

            {type && (
                <div className="text-center p-3 bg-slate-50 rounded-xl border border-slate-200 text-[10px] text-slate-600 animate-fade-in">
                    {type === 'spike' 
                      ? (language === Language.ENGLISH ? "Fast burst but low sustainability. Used by athletes." : "तेज ऊर्जा लेकिन कम समय के लिए।") 
                      : (language === Language.ENGLISH ? "Sustainable energy from polysaccharides like Starch." : "लंबे समय तक चलने वाली स्थिर ऊर्जा।")}
                </div>
            )}
        </div>
    );
};

export default HumanNutrition;
