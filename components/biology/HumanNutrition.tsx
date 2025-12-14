
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Gamepad2, ArrowRight, ArrowLeft, Check, X, RotateCcw, Zap, Play, Apple, Box } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
}

// --- STORY CONTENT DATA ---
const STORY_CHAPTERS = [
  {
    id: 1,
    title: { en: "Chapter 1: The Fuel of Life", hi: "अध्याय 1: जीवन का ईंधन और वर्गीकरण" },
    text: {
        en: "Professor Poshan entered the class. 'Anu,' he asked the molecule, 'Why are you important?' Anu replied enthusiastically, 'For Growth, Development, and Cell Energy!' Nutrients are divided into Macro (Carbs, Protein, Fats) and Micro (Vitamins, Minerals). Anu is a Carbohydrate.",
        hi: "प्रोफेसर पोषण ने कक्षा में प्रवेश किया। 'अणु,' उन्होंने पूछा, 'तुम क्यों महत्वपूर्ण हो?' अणु ने उत्साह से जवाब दिया, 'विकास, वृद्धि और कोशिका ऊर्जा के लिए!' पोषक तत्व दो वर्गों में बँटते हैं: वृहत (Macro - कार्ब्स, प्रोटीन, वसा) और सूक्ष्म (Micro - विटामिन, खनिज)। अणु एक कार्बोहाइड्रेट है।"
    },
    visual: 'intro'
  },
  {
    id: 2,
    title: { en: "Chapter 2: Identity & Energy", hi: "अध्याय 2: पहचान और ऊर्जा का रहस्य" },
    text: {
        en: "Professor explained Anu's structure: Carbon, Hydrogen, Oxygen in a 1:2:1 ratio (C:H:O). When broken down, Anu provides 4.2 Calories per gram. We need 350-400g daily.",
        hi: "प्रोफेसर ने अणु की संरचना समझाई: कार्बन, हाइड्रोजन, ऑक्सीजन का अनुपात 1:2:1 होता है। टूटने पर, अणु प्रति ग्राम 4.2 कैलोरी ऊर्जा देता है। हमें प्रतिदिन 350-400 ग्राम की आवश्यकता होती है।"
    },
    visual: 'structure'
  },
  {
    id: 3,
    title: { en: "Chapter 3: The Digestive Journey", hi: "अध्याय 3: पाचन का रोमांचक सफर" },
    text: {
        en: "Anu's journey starts at Ingestion. In the Mouth, Ptylin enzyme partially digests him. Then in the Small Intestine, Amylase enzyme completes the digestion. Finally, Assimilation occurs for energy.",
        hi: "अणु का सफर अन्तर्ग्ाहण से शुरू हुआ। मुँह में, 'टायलिन' एंजाइम ने उसका आंशिक पाचन किया। फिर छोटी आँत में, 'एमाइलेज' ने पूर्ण पाचन किया। अंत में, ऊर्जा के लिए सर्वांगीकरण (Assimilation) हुआ।"
    },
    visual: 'digestion'
  },
  {
    id: 4,
    title: { en: "Chapter 4: The Saccharide Family", hi: "अध्याय 4: शर्करा परिवार (सैकराइड)" },
    text: {
        en: "Monosaccharides (Glucose, Fructose) give instant energy. Oligosaccharides (Sucrose, Lactose) are two units joined. Polysaccharides (Starch, Glycogen) are storage forms.",
        hi: "मोनोसैकेराइड (ग्लूकोज, फ्रुक्टोज) तुरंत ऊर्जा देते हैं। ओलिगोसैकेराइड (सुक्रोज, लैक्टोज) दो इकाइयाँ हैं। पॉलीसैकेराइड (स्टार्च, ग्लाइकोजन) भंडारण रूप हैं।"
    },
    visual: 'saccharides'
  }
];

const HumanNutrition: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'sims'>('story');
  const [chapter, setChapter] = useState(0);

  return (
    <div className="flex flex-col h-full bg-orange-50 gap-4">
      {/* Header */}
      <div className="bg-orange-600 p-4 rounded-xl shadow-md text-white flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Apple className="fill-orange-200 text-orange-100" />
            {language === Language.ENGLISH ? "Human Nutrition" : "मानव पोषण"}
          </h1>
          <p className="text-orange-100 text-xs mt-1 font-mono">{language === Language.ENGLISH ? "Anu's Energy Journey" : "अणु की ऊर्जा यात्रा"}</p>
        </div>
        
        <div className="flex bg-orange-800/50 p-1 rounded-lg">
           <button 
             onClick={() => setActiveTab('story')}
             className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'story' ? 'bg-white text-orange-700 shadow' : 'text-orange-100 hover:text-white'}`}
           >
              <BookOpen size={14} /> {language === Language.ENGLISH ? "Story" : "कहानी"}
           </button>
           <button 
             onClick={() => setActiveTab('sims')}
             className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'sims' ? 'bg-white text-orange-700 shadow' : 'text-orange-100 hover:text-white'}`}
           >
              <Gamepad2 size={14} /> {language === Language.ENGLISH ? "Simulations" : "सिमुलेशन"}
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'story' ? (
          <StoryMode language={language} chapter={chapter} setChapter={setChapter} />
        ) : (
          <SimulationHub language={language} />
        )}
      </div>
    </div>
  );
};

// --- STORY MODE ---
const StoryMode = ({ language, chapter, setChapter }: { language: Language, chapter: number, setChapter: (c: number) => void }) => {
    const data = STORY_CHAPTERS[chapter];

    const renderVisual = (type: string) => {
        switch(type) {
            case 'intro':
                return (
                    <div className="flex flex-col items-center justify-center h-full">
                        <div className="flex gap-8 mb-8">
                            <div className="text-center">
                                <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center border-4 border-slate-400 mb-2">
                                    <span className="text-4xl">👨‍🏫</span>
                                </div>
                                <span className="font-bold text-slate-600">Prof. Poshan</span>
                            </div>
                            <div className="text-center">
                                <div className="w-24 h-24 bg-orange-200 rounded-full flex items-center justify-center border-4 border-orange-400 mb-2 animate-bounce">
                                    <div className="w-16 h-16 bg-orange-400 rounded-lg flex items-center justify-center text-white font-bold rotate-45">C₆</div>
                                </div>
                                <span className="font-bold text-orange-600">Anu (Carb)</span>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-green-100 p-2 rounded border border-green-300 text-xs font-bold text-green-800">Growth</div>
                            <div className="bg-blue-100 p-2 rounded border border-blue-300 text-xs font-bold text-blue-800">Development</div>
                            <div className="bg-red-100 p-2 rounded border border-red-300 text-xs font-bold text-red-800">Energy</div>
                        </div>
                    </div>
                );
            case 'structure':
                return (
                    <div className="flex flex-col items-center justify-center h-full gap-6">
                        <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200 text-center">
                            <h3 className="text-lg font-bold text-slate-700 mb-2">Formula: C:H:O (1:2:1)</h3>
                            <div className="flex items-center gap-2 text-2xl font-mono bg-slate-100 p-2 rounded">
                                <span className="text-gray-800">C</span>
                                <span className="text-blue-500">H₂</span>
                                <span className="text-red-500">O</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Zap size={32} className="text-yellow-500 fill-yellow-500" />
                            <span className="text-xl font-bold text-slate-700">4.2 Cal / gram</span>
                        </div>
                    </div>
                );
            case 'digestion':
                return (
                    <svg viewBox="0 0 300 200" className="w-full h-full max-h-[300px]">
                        <path d="M50,50 Q100,50 150,100 T250,150" fill="none" stroke="#e2e8f0" strokeWidth="20" strokeLinecap="round" />
                        
                        {/* Mouth */}
                        <circle cx="50" cy="50" r="15" fill="#fecaca" stroke="#ef4444" strokeWidth="2" />
                        <text x="50" y="25" textAnchor="middle" fontSize="10" fontWeight="bold">Mouth</text>
                        <text x="50" y="80" textAnchor="middle" fontSize="8" fill="#ef4444">Ptylin (Partial)</text>

                        {/* Intestine */}
                        <circle cx="250" cy="150" r="15" fill="#bbf7d0" stroke="#22c55e" strokeWidth="2" />
                        <text x="250" y="125" textAnchor="middle" fontSize="10" fontWeight="bold">Intestine</text>
                        <text x="250" y="180" textAnchor="middle" fontSize="8" fill="#15803d">Amylase (Complete)</text>

                        {/* Path */}
                        <path d="M50,50 Q100,50 150,100 T250,150" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5,5" className="animate-pulse" />
                        <circle r="6" fill="orange">
                            <animateMotion dur="3s" repeatCount="indefinite" path="M50,50 Q100,50 150,100 T250,150" />
                        </circle>
                    </svg>
                );
            case 'saccharides':
                return (
                    <div className="flex flex-col gap-4 items-center justify-center h-full">
                        <div className="flex items-center gap-4 w-full max-w-md bg-white p-2 rounded shadow-sm border border-orange-100">
                            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white font-bold shadow">1</div>
                            <div className="text-left">
                                <div className="font-bold text-xs text-orange-800">Monosaccharide</div>
                                <div className="text-[10px] text-slate-500">Glucose (Instant Energy)</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full max-w-md bg-white p-2 rounded shadow-sm border border-blue-100">
                            <div className="flex -space-x-2">
                                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow border-2 border-white">1</div>
                                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center text-white font-bold shadow border-2 border-white">1</div>
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-xs text-blue-800">Disaccharide</div>
                                <div className="text-[10px] text-slate-500">Sucrose/Lactose</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full max-w-md bg-white p-2 rounded shadow-sm border border-green-100">
                            <div className="flex -space-x-4 overflow-hidden w-24">
                                {[1,2,3,4].map(i => (
                                    <div key={i} className="w-8 h-8 bg-green-500 rounded-full border-2 border-white shadow flex-shrink-0"></div>
                                ))}
                            </div>
                            <div className="text-left">
                                <div className="font-bold text-xs text-green-800">Polysaccharide</div>
                                <div className="text-[10px] text-slate-500">Starch/Glycogen (Storage)</div>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-6 p-4">
            <div className="flex-1 bg-white rounded-2xl shadow-sm border border-orange-200 flex flex-col items-center justify-center p-6 relative overflow-hidden">
                {renderVisual(data.visual)}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                    {STORY_CHAPTERS.map((c, i) => (
                        <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === chapter ? 'bg-orange-500 scale-125' : 'bg-slate-200'}`} />
                    ))}
                </div>
            </div>

            <div className="w-full md:w-96 flex flex-col gap-4">
                <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-orange-500 flex-1 flex flex-col">
                    <h2 className="text-xl font-bold text-slate-800 mb-4">{language === Language.ENGLISH ? data.title.en : data.title.hi}</h2>
                    <div className="bg-orange-50 p-4 rounded-xl mb-6 relative flex-1">
                        <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                            "{language === Language.ENGLISH ? data.text.en : data.text.hi}"
                        </p>
                    </div>
                    <div className="flex justify-between gap-4 mt-auto">
                        <button 
                            onClick={() => setChapter(Math.max(0, chapter - 1))}
                            disabled={chapter === 0}
                            className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            <ArrowLeft size={18}/> {language === Language.ENGLISH ? "Prev" : "पीछे"}
                        </button>
                        <button 
                            onClick={() => setChapter(Math.min(STORY_CHAPTERS.length - 1, chapter + 1))}
                            disabled={chapter === STORY_CHAPTERS.length - 1}
                            className="flex-1 py-3 bg-orange-600 text-white rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:bg-orange-700"
                        >
                            {language === Language.ENGLISH ? "Next" : "अगला"} <ArrowRight size={18}/>
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
        <div className="h-full flex flex-col">
            <div className="flex bg-white border-b border-orange-200 overflow-x-auto flex-shrink-0">
                <button onClick={() => setSim('relay')} className={`flex-1 py-3 px-4 text-sm font-bold border-b-2 whitespace-nowrap ${sim === 'relay' ? 'border-orange-600 text-orange-700 bg-orange-50' : 'border-transparent text-slate-500'}`}>
                    {language === Language.ENGLISH ? "1. Digestion Relay" : "1. पाचन रिले रेस"}
                </button>
                <button onClick={() => setSim('builder')} className={`flex-1 py-3 px-4 text-sm font-bold border-b-2 whitespace-nowrap ${sim === 'builder' ? 'border-orange-600 text-orange-700 bg-orange-50' : 'border-transparent text-slate-500'}`}>
                    {language === Language.ENGLISH ? "2. Molecule Builder" : "2. अणु निर्माता"}
                </button>
                <button onClick={() => setSim('energy')} className={`flex-1 py-3 px-4 text-sm font-bold border-b-2 whitespace-nowrap ${sim === 'energy' ? 'border-orange-600 text-orange-700 bg-orange-50' : 'border-transparent text-slate-500'}`}>
                    {language === Language.ENGLISH ? "3. Energy Challenge" : "3. ऊर्जा चुनौती"}
                </button>
            </div>
            <div className="flex-1 bg-slate-50 p-4 overflow-y-auto">
                {sim === 'relay' && <DigestionRelay language={language} />}
                {sim === 'builder' && <MoleculeBuilder language={language} />}
                {sim === 'energy' && <EnergyChallenge language={language} />}
            </div>
        </div>
    );
};

// --- SIM 1: DIGESTION RELAY ---
const DigestionRelay = ({ language }: { language: Language }) => {
    const [pos, setPos] = useState(0); // 0: Start, 1: Mouth, 2: Stomach/Intestine, 3: Cell
    const [msg, setMsg] = useState(language === Language.ENGLISH ? "Start the race!" : "दौड़ शुरू करें!");
    const [completed, setCompleted] = useState(false);

    const handleAction = (enzyme: string) => {
        if (pos === 1) {
            if (enzyme === 'Ptylin') {
                setPos(2);
                setMsg(language === Language.ENGLISH ? "Correct! Ptylin partially digested Carbs. Moving to Intestine..." : "सही! टायलिन ने आंशिक पाचन किया। आंत की ओर...");
            } else {
                setMsg(language === Language.ENGLISH ? "Wrong! Mouth needs Ptylin." : "गलत! मुँह में टायलिन चाहिए।");
            }
        } else if (pos === 2) {
            if (enzyme === 'Amylase') {
                setPos(3);
                setCompleted(true);
                setMsg(language === Language.ENGLISH ? "Success! Amylase completed digestion. Energy Assimilated!" : "सफलता! एमाइलेज ने पूर्ण पाचन किया। ऊर्जा मिल गई!");
            } else {
                setMsg(language === Language.ENGLISH ? "Wrong! Intestine needs Amylase." : "गलत! आंत में एमाइलेज चाहिए।");
            }
        }
    };

    const reset = () => { setPos(0); setCompleted(false); setMsg(language === Language.ENGLISH ? "Start the race!" : "दौड़ शुरू करें!"); };

    return (
        <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto gap-6">
            {/* Visual Track */}
            <div className="w-full bg-white p-6 rounded-xl shadow-lg border border-slate-200 relative min-h-[250px] flex items-center justify-between">
                {/* Track Line */}
                <div className="absolute top-1/2 left-10 right-10 h-2 bg-slate-100 rounded-full -z-0"></div>
                
                {/* Points */}
                <div className={`relative z-10 flex flex-col items-center ${pos >= 0 ? 'opacity-100' : 'opacity-50'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 ${pos === 0 ? 'bg-orange-500 text-white border-orange-200' : 'bg-slate-200 border-slate-300'}`}>Start</div>
                </div>
                <div className={`relative z-10 flex flex-col items-center transition-all ${pos >= 1 ? 'scale-110' : 'opacity-50'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold border-4 ${pos === 1 ? 'bg-pink-100 border-pink-400 text-pink-700 animate-pulse' : 'bg-slate-200 border-slate-300'}`}>Mouth</div>
                </div>
                <div className={`relative z-10 flex flex-col items-center transition-all ${pos >= 2 ? 'scale-110' : 'opacity-50'}`}>
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center font-bold border-4 ${pos === 2 ? 'bg-green-100 border-green-400 text-green-700 animate-pulse' : 'bg-slate-200 border-slate-300'}`}>Intestine</div>
                </div>
                <div className={`relative z-10 flex flex-col items-center transition-all ${pos === 3 ? 'scale-125' : 'opacity-50'}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold border-4 ${pos === 3 ? 'bg-yellow-400 text-white border-yellow-200 shadow-[0_0_20px_#facc15]' : 'bg-slate-200 border-slate-300'}`}>Energy</div>
                </div>

                {/* Runner (Anu) */}
                <div 
                    className="absolute top-1/2 -mt-4 w-8 h-8 bg-orange-500 rounded-full border-2 border-white shadow-lg transition-all duration-700 ease-in-out z-20 flex items-center justify-center text-[10px] text-white font-bold"
                    style={{ left: pos === 0 ? '5%' : pos === 1 ? '35%' : pos === 2 ? '65%' : '90%' }}
                >
                    Anu
                </div>
            </div>

            {/* Controls */}
            <div className="text-center w-full max-w-md">
                <div className="mb-4 font-bold text-lg text-slate-700">{msg}</div>
                
                {pos === 0 && (
                    <button onClick={() => setPos(1)} className="px-8 py-3 bg-orange-600 text-white rounded-full font-bold shadow-lg hover:bg-orange-700">
                        {language === Language.ENGLISH ? "Eat Food (Ingestion)" : "खाना खाएं (अन्तर्ग्ाहण)"}
                    </button>
                )}

                {(pos === 1 || pos === 2) && (
                    <div className="grid grid-cols-2 gap-4">
                        <button onClick={() => handleAction('Ptylin')} className="p-4 bg-pink-100 hover:bg-pink-200 text-pink-800 rounded-xl font-bold border-2 border-pink-300">
                            {language === Language.ENGLISH ? "Apply Ptylin" : "टायलिन (Ptylin)"}
                        </button>
                        <button onClick={() => handleAction('Amylase')} className="p-4 bg-green-100 hover:bg-green-200 text-green-800 rounded-xl font-bold border-2 border-green-300">
                            {language === Language.ENGLISH ? "Apply Amylase" : "एमाइलेज (Amylase)"}
                        </button>
                    </div>
                )}

                {completed && (
                    <button onClick={reset} className="px-8 py-3 bg-slate-800 text-white rounded-full font-bold shadow-lg hover:bg-slate-900 flex items-center gap-2 mx-auto">
                        <RotateCcw size={18} /> {language === Language.ENGLISH ? "Replay" : "फिर से खेलें"}
                    </button>
                )}
            </div>
        </div>
    );
};

// --- SIM 2: MOLECULE BUILDER ---
const MoleculeBuilder = ({ language }: { language: Language }) => {
    const [c, setC] = useState(0);
    const [h, setH] = useState(0);
    const [o, setO] = useState(0);
    const [step, setStep] = useState(1); // 1: Build Glucose, 2: Build Maltose

    const checkGlucose = c === 6 && h === 12 && o === 6;

    const reset = () => { setC(0); setH(0); setO(0); setStep(1); };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-6">
            <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 w-full max-w-lg text-center">
                <h3 className="font-bold text-xl text-slate-800 mb-2">
                    {step === 1 ? (language === Language.ENGLISH ? "Mission: Build Glucose" : "लक्ष्य: ग्लूकोज बनाएं") : (language === Language.ENGLISH ? "Mission: Build Maltose" : "लक्ष्य: माल्टोज बनाएं")}
                </h3>
                <p className="text-slate-500 text-sm mb-4">
                    {step === 1 ? "Formula: C₆H₁₂O₆ (1:2:1)" : (language === Language.ENGLISH ? "Combine 2 Glucose Molecules" : "2 ग्लूकोज अणुओं को जोड़ें")}
                </p>

                {step === 1 ? (
                    <div className="flex justify-center gap-6 mb-6">
                        <AtomCount label="Carbon (C)" count={c} setter={setC} color="bg-slate-700" target={6} />
                        <AtomCount label="Hydrogen (H)" count={h} setter={setH} color="bg-blue-500" target={12} />
                        <AtomCount label="Oxygen (O)" count={o} setter={setO} color="bg-red-500" target={6} />
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-4 py-8">
                        <div className="flex items-center gap-2">
                            <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center border-2 border-orange-400 font-bold text-orange-800">Glucose</div>
                            <span className="text-2xl font-bold">+</span>
                            <div className="w-20 h-20 bg-orange-100 rounded-lg flex items-center justify-center border-2 border-orange-400 font-bold text-orange-800">Glucose</div>
                        </div>
                        <div className="text-2xl font-bold">↓</div>
                    </div>
                )}

                {step === 1 && (
                    <div className={`p-3 rounded-lg font-bold transition-colors ${checkGlucose ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'}`}>
                        {checkGlucose ? (language === Language.ENGLISH ? "Perfect! Glucose Created." : "शानदार! ग्लूकोज बन गया।") : (language === Language.ENGLISH ? "Keep adding atoms..." : "परमाणु जोड़ते रहें...")}
                    </div>
                )}

                <div className="mt-6 flex gap-4 justify-center">
                    <button onClick={reset} className="px-4 py-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50"><RotateCcw size={18}/></button>
                    {step === 1 && checkGlucose && (
                        <button onClick={() => setStep(2)} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow hover:bg-indigo-700">
                            {language === Language.ENGLISH ? "Next Level: Disaccharide" : "अगला स्तर: डाई-सैकेराइड"}
                        </button>
                    )}
                    {step === 2 && (
                        <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                            <h4 className="font-bold text-indigo-900 mb-1">Maltose = Glucose + Glucose</h4>
                            <p className="text-xs text-indigo-700">Formula: C₁₂H₂₂O₁₁ (Water H₂O removed)</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const AtomCount = ({label, count, setter, color, target}: any) => (
    <div className="flex flex-col items-center gap-2">
        <div className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md transition-transform ${color} ${count === target ? 'scale-110 ring-4 ring-green-400' : ''}`}>
            {count}
        </div>
        <span className="text-xs font-bold text-slate-600">{label}</span>
        <div className="flex gap-1">
            <button onClick={() => setter(Math.max(0, count-1))} className="w-6 h-6 bg-slate-200 rounded text-slate-600 font-bold hover:bg-slate-300">-</button>
            <button onClick={() => setter(count+1)} className="w-6 h-6 bg-slate-200 rounded text-slate-600 font-bold hover:bg-slate-300">+</button>
        </div>
    </div>
);

// --- SIM 3: ENERGY CHALLENGE ---
const EnergyChallenge = ({ language }: { language: Language }) => {
    const [energy, setEnergy] = useState(50);
    const [source, setSource] = useState<'none' | 'glucose' | 'starch'>('none');
    
    // Game Loop
    useEffect(() => {
        const timer = setInterval(() => {
            setEnergy(prev => {
                let change = -2; // Base consumption
                if (source === 'glucose') change = -5; // Crash after spike
                if (source === 'starch') change = 1; // Steady release
                
                const next = Math.max(0, Math.min(100, prev + change));
                if (next === 0 && source !== 'none') setSource('none');
                return next;
            });
        }, 500);
        return () => clearInterval(timer);
    }, [source]);

    const eatGlucose = () => {
        setEnergy(100);
        setSource('glucose');
        setTimeout(() => setSource('none'), 3000); // Crash after 3s
    };

    const eatStarch = () => {
        setEnergy(prev => Math.min(prev + 20, 80));
        setSource('starch');
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 max-w-xl mx-auto">
            <div className="relative w-32 h-64 border-4 border-slate-400 rounded-2xl bg-slate-100 overflow-hidden shadow-inner">
                <div 
                    className={`absolute bottom-0 w-full transition-all duration-500 ease-linear ${
                        source === 'glucose' ? 'bg-red-500' : source === 'starch' ? 'bg-green-500' : 'bg-yellow-500'
                    }`}
                    style={{ height: `${energy}%` }}
                >
                    <div className="w-full h-full animate-pulse opacity-50 bg-white/20"></div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center font-bold text-slate-700 text-xl mix-blend-multiply">
                    {Math.round(energy)}%
                </div>
            </div>

            <div className="text-center h-16">
                {source === 'glucose' && <p className="text-red-600 font-bold animate-bounce">{language === Language.ENGLISH ? "INSTANT SPIKE! (Short lasting)" : "तुरंत ऊर्जा! (कम समय)"}</p>}
                {source === 'starch' && <p className="text-green-600 font-bold">{language === Language.ENGLISH ? "Steady Release (Glycogen Storage)" : "स्थिर ऊर्जा (ग्लाइकोजन भंडारण)"}</p>}
                {source === 'none' && energy < 20 && <p className="text-slate-500 animate-pulse">{language === Language.ENGLISH ? "Low Energy..." : "ऊर्जा कम है..."}</p>}
            </div>

            <div className="flex gap-4 w-full">
                <button 
                    onClick={eatGlucose}
                    className="flex-1 p-4 bg-white border-2 border-red-200 rounded-xl hover:bg-red-50 hover:border-red-400 shadow-sm transition-all"
                >
                    <div className="text-2xl mb-1">🍬</div>
                    <div className="font-bold text-slate-800">{language === Language.ENGLISH ? "Eat Glucose" : "ग्लूकोज खाएं"}</div>
                    <div className="text-xs text-slate-500">{language === Language.ENGLISH ? "Monosaccharide" : "मोनोसैकेराइड"}</div>
                </button>
                <button 
                    onClick={eatStarch}
                    className="flex-1 p-4 bg-white border-2 border-green-200 rounded-xl hover:bg-green-50 hover:border-green-400 shadow-sm transition-all"
                >
                    <div className="text-2xl mb-1">🥔</div>
                    <div className="font-bold text-slate-800">{language === Language.ENGLISH ? "Eat Starch" : "स्टार्च खाएं"}</div>
                    <div className="text-xs text-slate-500">{language === Language.ENGLISH ? "Polysaccharide" : "पॉलीसैकेराइड"}</div>
                </button>
            </div>
        </div>
    );
};

export default HumanNutrition;
