
import React, { useState, useEffect } from 'react';
import { BookOpen, FlaskConical, ArrowRight, ArrowLeft, Pill, Sun, Droplets, Info, Shield, CheckCircle, XCircle, Eye, Activity, RotateCcw, AlertTriangle, Zap, Microscope } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
}

// --- DATA STRUCTURE ---
const STORY_CHAPTERS = [
  {
    id: 1,
    title: { en: "Chapter 1: The Hidden Controllers", hi: "अध्याय 1: सूक्ष्म लेकिन महत्वपूर्ण" },
    text: {
        en: "Dr. Kavya explained to Ravi: 'Vitamins are organic compounds and Micro-nutrients. Crucially, they give ZERO energy (Energy X) but act as vital chemical controllers. Lunin (1881) named them, but Casimir Funk (1912) is credited for their discovery.'",
        hi: "डॉ. काव्या ने रवि को समझाया: 'विटामिन कार्बनिक यौगिक और सूक्ष्म पोषक तत्व हैं। महत्वपूर्ण बात यह है कि ये ऊर्जा (Energy X) नहीं देते हैं, बल्कि शरीर की प्रक्रियाओं के गुप्त नियंत्रक हैं। लूनीन (1881) ने इन्हें नाम दिया, पर कैशमियर फंक (1912) को इनकी खोज का श्रेय मिला।'"
    },
    visual: 'history'
  },
  {
    id: 2,
    title: { en: "Chapter 2: Oil vs Water Solubility", hi: "अध्याय 2: दो टीमें: तेल बनाम पानी" },
    text: {
        en: "There are two teams. Team 'KEDA' (Vitamins K, E, D, A) are Fat Soluble and stored in the Liver store room. Team B & C are Water Soluble; they dissolve in water and are excreted via urine or sweat if taken in excess.",
        hi: "दो मुख्य टीमें हैं। टीम 'KEDA' (विटामिन K, E, D, A) वसा (Fat) में घुलनशील हैं और यकृत (Liver) में संग्रहीत होते हैं। टीम B और C पानी में घुलनशील हैं; ये पानी में घुल जाते हैं और मूत्र या पसीने के माध्यम से बाहर निकल जाते हैं।"
    },
    visual: 'solubility'
  },
  {
    id: 3,
    title: { en: "Chapter 3: The Fat Soluble Warriors", hi: "अध्याय 3: KEDA का महत्वपूर्ण कार्य" },
    text: {
        en: "Vitamin A (Retinol) protects vision. Vitamin D (Calciferol) is a hormonal vitamin for bones. Vitamin E (Tocopherol) is the 'Beauty Vitamin' and antioxidant. Vitamin K (Phylloquinone) is the clotting expert, aided by E. Coli bacteria in our gut.",
        hi: "विटामिन A (रेटिनॉल) आँखों की रोशनी बचाता है। विटामिन D (कैल्सीफेरॉल) हड्डियों के लिए हार्मोनल विटामिन है। विटामिन E (टोकोफेरॉल) 'ब्यूटी विटामिन' और एंटी-ऑक्सीडेंट है। विटामिन K (फाइलोक्विनोन) थक्का बनाने में माहिर है, जिसे आंत के ई. कोलाई बैक्टीरिया मदद करते हैं।"
    },
    visual: 'warriors'
  },
  {
    id: 4,
    title: { en: "Chapter 4: The Water Soluble Helpers", hi: "अध्याय 4: पानी में घुले मददगार" },
    text: {
        en: "Vitamin C (Ascorbic Acid) heals wounds and boosts immunity but is destroyed by heat. The B-Complex family has many members: B1 (Beri-Beri), B3 (Pellagra/4D), B9/B12 (Brain vitamins, Anemia). B12 contains Cobalt.",
        hi: "विटामिन C (एस्कॉर्बिक एसिड) घाव भरता है और रोग प्रतिरोधक क्षमता बढ़ाता है, पर गर्मी से नष्ट हो जाता है। B-कॉम्प्लेक्स परिवार बड़ा है: B1 (बेरी-बेरी), B3 (पेलग्रा/4D), B9/B12 (ब्रेन विटामिन)। B12 में कोबाल्ट धातु होती है।"
    },
    visual: 'complex'
  }
];

const Vitamins: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'labs'>('story');
  const [chapter, setChapter] = useState(0);

  return (
    <div className="flex flex-col h-full bg-yellow-50/30 gap-4 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-600 to-green-600 p-4 rounded-xl shadow-md text-white flex justify-between items-center flex-shrink-0 mx-2 mt-2">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
             <Pill className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              {language === Language.ENGLISH ? "Vitamins Lab" : "विटामिन लैब"}
            </h1>
            <p className="text-yellow-100 text-[10px] font-mono uppercase tracking-widest">Interactive Biochemistry</p>
          </div>
        </div>
        
        <div className="flex bg-black/20 p-1 rounded-lg border border-white/10">
           <button 
             onClick={() => setActiveTab('story')}
             className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'story' ? 'bg-white text-yellow-700 shadow' : 'text-yellow-100 hover:text-white'}`}
           >
              <BookOpen size={14} /> {language === Language.ENGLISH ? "Learn" : "सीखें"}
           </button>
           <button 
             onClick={() => setActiveTab('labs')}
             className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'labs' ? 'bg-white text-green-700 shadow' : 'text-yellow-100 hover:text-white'}`}
           >
              <FlaskConical size={14} /> {language === Language.ENGLISH ? "Labs" : "लैब"}
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative p-2">
        {activeTab === 'story' ? (
          <StoryMode language={language} chapter={chapter} setChapter={setChapter} />
        ) : (
          <LabMode language={language} />
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
            case 'history':
                return (
                    <div className="flex flex-col items-center justify-center gap-6 h-full animate-fade-in">
                        <div className="flex gap-4">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-yellow-100 rounded-full border-4 border-yellow-400 flex items-center justify-center text-2xl">👨‍🔬</div>
                                <div className="text-[10px] font-bold mt-2">Lunin (1881)</div>
                            </div>
                            <div className="text-center">
                                <div className="w-20 h-20 bg-green-100 rounded-full border-4 border-green-400 flex items-center justify-center text-2xl">🧬</div>
                                <div className="text-[10px] font-bold mt-2">Funk (1912)</div>
                            </div>
                        </div>
                        <div className="bg-red-50 p-4 rounded-xl border-2 border-red-200 text-center animate-pulse">
                            <div className="text-red-600 font-black text-2xl flex items-center gap-2">
                                <Zap size={24} /> ENERGY 0%
                            </div>
                            <div className="text-[8px] text-red-400 uppercase tracking-tighter">Micro-nutrients do not provide Calories</div>
                        </div>
                    </div>
                );
            case 'solubility':
                return (
                    <div className="flex flex-col items-center justify-center gap-4 h-full">
                        <div className="grid grid-cols-2 gap-8 w-full max-w-sm">
                            <div className="bg-orange-50 p-4 rounded-2xl border-2 border-orange-300 text-center shadow-md">
                                <div className="text-2xl mb-2">🛢️</div>
                                <h4 className="font-bold text-orange-800 text-xs">TEAM KEDA</h4>
                                <p className="text-[8px] text-orange-600">Fat Soluble / Liver Store</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-300 text-center shadow-md">
                                <div className="text-2xl mb-2">💧</div>
                                <h4 className="font-bold text-blue-800 text-xs">TEAM B & C</h4>
                                <p className="text-[8px] text-blue-600">Water Soluble / Excreted</p>
                            </div>
                        </div>
                    </div>
                );
            case 'warriors':
                return (
                    <div className="grid grid-cols-2 gap-2 h-full p-4">
                        {[
                            { n: 'A', name: 'Retinol', icon: Eye, color: 'text-orange-500' },
                            { n: 'D', name: 'Calciferol', icon: Sun, color: 'text-yellow-600' },
                            { n: 'E', name: 'Tocopherol', icon: Activity, color: 'text-pink-500' },
                            { n: 'K', name: 'Phylloquinone', icon: Shield, color: 'text-red-500' }
                        ].map(v => (
                            <div key={v.n} className="bg-white p-2 rounded-lg border border-slate-100 flex items-center gap-3 shadow-sm">
                                <div className={`w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center font-bold ${v.color}`}>{v.n}</div>
                                <div>
                                    <div className="text-[9px] font-black">{v.name}</div>
                                    <v.icon size={12} className={v.color} />
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case 'complex':
                return (
                    <div className="flex flex-col items-center justify-center h-full gap-4">
                         <div className="flex -space-x-3">
                            {[1,2,3,5,6,7,9,12].map(b => (
                                <div key={b} className="w-10 h-10 bg-indigo-500 border-2 border-white rounded-full flex items-center justify-center text-white font-bold text-[10px] shadow-md">B{b}</div>
                            ))}
                         </div>
                         <div className="bg-white p-3 rounded-xl border border-indigo-200 text-center shadow-lg">
                            <div className="text-xs font-bold text-indigo-700">Vitamin B12: Cobalt (Co)</div>
                            <div className="text-[8px] text-slate-400">Essential for nerve & blood formation</div>
                         </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-4 p-2">
            <div className="flex-1 bg-white rounded-2xl shadow-inner border border-yellow-100 flex flex-col items-center justify-center p-4 relative overflow-hidden min-h-[250px]">
                <div className="absolute top-2 left-2 bg-yellow-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm z-10 flex items-center gap-1">
                    <Microscope size={12}/> Story Lab
                </div>
                {renderVisual(data.visual)}
                <div className="absolute bottom-4 flex gap-2">
                    {STORY_CHAPTERS.map((_, i) => (
                        <button key={i} onClick={() => setChapter(i)} className={`h-1.5 rounded-full transition-all ${i === chapter ? 'w-8 bg-yellow-600' : 'w-2 bg-slate-200'}`} />
                    ))}
                </div>
            </div>

            <div className="w-full md:w-80 lg:w-96 flex flex-col gap-4">
                <div className="bg-white p-5 rounded-2xl shadow-lg border-l-8 border-yellow-500 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-2">
                         <span className="w-6 h-6 bg-yellow-100 text-yellow-600 rounded flex items-center justify-center text-xs">{chapter+1}</span>
                         {language === Language.ENGLISH ? data.title.en : data.title.hi}
                    </h2>
                    
                    <div className="bg-yellow-50/50 p-4 rounded-xl mb-4 border border-yellow-100 flex-1 overflow-y-auto custom-scrollbar">
                        <p className="text-slate-700 leading-relaxed text-sm italic">
                            "{language === Language.ENGLISH ? data.text.en : data.text.hi}"
                        </p>
                    </div>

                    <div className="flex justify-between gap-4 mt-auto">
                        <button onClick={() => setChapter(Math.max(0, chapter - 1))} disabled={chapter === 0} className="flex-1 py-3 bg-slate-100 text-slate-500 rounded-xl font-bold disabled:opacity-30"><ArrowLeft size={18} className="mx-auto"/></button>
                        <button onClick={() => setChapter(Math.min(STORY_CHAPTERS.length - 1, chapter + 1))} disabled={chapter === STORY_CHAPTERS.length - 1} className="flex-1 py-3 bg-yellow-600 text-white rounded-xl font-bold shadow-md hover:bg-yellow-700"><ArrowRight size={18} className="mx-auto"/></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- LAB MODE HUB ---
const LabMode = ({ language }: { language: Language }) => {
    const [sim, setSim] = useState<'solubility' | 'vision' | 'clotting' | 'bone' | 'clinic'>('solubility');

    return (
        <div className="h-full flex flex-col gap-4 animate-fade-in">
            <div className="flex bg-white rounded-xl shadow-sm border border-slate-200 p-1 flex-shrink-0 overflow-x-auto custom-scrollbar">
                {[
                    { id: 'solubility', label: { en: "Storage", hi: "भंडारण" } },
                    { id: 'vision', label: { en: "Night Vision", hi: "रात की दृष्टि" } },
                    { id: 'clotting', label: { en: "Emergency Clot", hi: "आपातकालीन थक्का" } },
                    { id: 'bone', label: { en: "Bone Density", hi: "हड्डी का घनत्व" } },
                    { id: 'clinic', label: { en: "Diagnosis", hi: "बीमारी जाँच" } }
                ].map(item => (
                    <button 
                      key={item.id}
                      onClick={() => setSim(item.id as any)}
                      className={`flex-1 py-2 px-3 rounded-lg text-[10px] font-bold whitespace-nowrap transition-all ${sim === item.id ? 'bg-yellow-600 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                        {language === Language.ENGLISH ? item.label.en : item.label.hi}
                    </button>
                ))}
            </div>

            <div className="flex-1 bg-white rounded-2xl shadow-inner border border-slate-200 overflow-y-auto p-4 custom-scrollbar">
                {sim === 'solubility' && <SolubilityLab language={language} />}
                {sim === 'vision' && <VisionLab language={language} />}
                {sim === 'clotting' && <ClottingLab language={language} />}
                {sim === 'bone' && <BoneLab language={language} />}
                {sim === 'clinic' && <ClinicLab language={language} />}
            </div>
        </div>
    );
};

// --- SIM 1: SOLUBILITY ---
const SolubilityLab = ({ language }: { language: Language }) => {
    const [vit, setVit] = useState<string | null>(null);
    const [solvent, setSolvent] = useState<'water' | 'oil' | null>(null);

    const check = () => {
        if (!vit || !solvent) return;
        const isFatSoluble = ['A', 'D', 'E', 'K'].includes(vit);
        if (solvent === 'oil' && isFatSoluble) return 'dissolved';
        if (solvent === 'water' && !isFatSoluble) return 'dissolved';
        return 'floating';
    };

    const status = check();

    return (
        <div className="flex flex-col items-center gap-8 py-4">
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Storage & Solubility Lab</h3>
            <div className="flex gap-4">
                {['A', 'B', 'C', 'D', 'E', 'K'].map(v => (
                    <button key={v} onClick={() => setVit(v)} className={`w-10 h-10 rounded-full border-2 font-bold transition-all ${vit === v ? 'bg-yellow-500 border-yellow-700 text-white scale-110 shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}>{v}</button>
                ))}
            </div>
            <div className="flex gap-12">
                <div onClick={() => setSolvent('water')} className={`w-32 h-40 border-4 rounded-b-3xl relative overflow-hidden cursor-pointer transition-all ${solvent === 'water' ? 'border-blue-500 scale-105' : 'border-slate-200 opacity-60'}`}>
                    <div className="absolute bottom-0 w-full h-24 bg-blue-300"></div>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-blue-800 opacity-20">WATER</div>
                    {vit && solvent === 'water' && (
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-white transition-all ${status === 'dissolved' ? 'opacity-30 blur-md' : 'animate-bounce shadow-md'}`}>{vit}</div>
                    )}
                </div>
                <div onClick={() => setSolvent('oil')} className={`w-32 h-40 border-4 rounded-b-3xl relative overflow-hidden cursor-pointer transition-all ${solvent === 'oil' ? 'border-amber-500 scale-105' : 'border-slate-200 opacity-60'}`}>
                    <div className="absolute bottom-0 w-full h-24 bg-amber-200"></div>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-amber-800 opacity-20">OIL / LIVER</div>
                    {vit && solvent === 'oil' && (
                        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center font-bold text-white transition-all ${status === 'dissolved' ? 'opacity-30 blur-md' : 'animate-bounce shadow-md'}`}>{vit}</div>
                    )}
                </div>
            </div>
            {vit && solvent && (
                <div className={`p-4 rounded-xl font-bold text-sm ${status === 'dissolved' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {status === 'dissolved' ? (language === Language.ENGLISH ? `Success! Vit ${vit} dissolves and is stored here.` : `सफलता! विटामिन ${vit} यहाँ घुलता और संग्रहीत होता है।`) : (language === Language.ENGLISH ? `Fail! Vit ${vit} is not soluble here.` : `विफल! विटामिन ${vit} यहाँ नहीं घुलता।`)}
                </div>
            )}
        </div>
    );
};

// --- SIM 2: NIGHT VISION ---
const VisionLab = ({ language }: { language: Language }) => {
    const [vitA, setVitA] = useState(20);
    return (
        <div className="flex flex-col items-center gap-6 py-4">
             <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Night Vision Challenge (Retinol)</h3>
             <div className="w-full max-w-sm bg-black rounded-3xl h-48 relative overflow-hidden border-8 border-slate-800 flex items-center justify-center">
                 <div className="text-white text-center transition-all duration-700" style={{ filter: `blur(${Math.max(0, (100-vitA)/5)}px)`, opacity: vitA/100 }}>
                    <div className="text-4xl mb-2">🏚️</div>
                    <div className="font-bold text-xs uppercase tracking-widest">Can you see the house?</div>
                 </div>
                 {vitA < 40 && <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-red-500 font-black uppercase italic animate-pulse">Night Blindness</div>}
             </div>
             <div className="w-full max-w-sm space-y-2">
                 <div className="flex justify-between text-xs font-bold text-slate-500">
                    <span>Low Vit A (Nyctalopia)</span>
                    <span>High Vit A (Rhodopsin+)</span>
                 </div>
                 <input type="range" min="0" max="100" value={vitA} onChange={e => setVitA(Number(e.target.value))} className="w-full h-4 bg-gradient-to-r from-red-500 via-orange-300 to-green-500 rounded-full appearance-none cursor-pointer" />
             </div>
             <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-[10px] text-yellow-800 text-center">
                <strong>Mechanism:</strong> Vit A creates <b>Rhodopsin</b> in the Rod cells of your retina to help you see in dim light.
             </div>
        </div>
    );
};

// --- SIM 3: CLOTTING ---
const ClottingLab = ({ language }: { language: Language }) => {
    const [bleeding, setBleeding] = useState(true);
    const [timer, setTimer] = useState(0);

    useEffect(() => {
        let int: any;
        if (!bleeding && timer < 100) {
            int = setInterval(() => setTimer(t => t + 2), 50);
        }
        return () => clearInterval(int);
    }, [bleeding, timer]);

    return (
        <div className="flex flex-col items-center gap-6 py-4 h-full">
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Emergency Clotting Fix (Vit K)</h3>
            <div className="relative w-64 h-48 bg-pink-100 rounded-2xl border-4 border-pink-200 overflow-hidden">
                <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-2 bg-red-600 rounded-full ${bleeding ? 'animate-pulse scale-y-150 shadow-[0_0_10px_red]' : 'opacity-0 transition-opacity duration-1000'}`}></div>
                {!bleeding && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-stone-800 h-2 w-48 rounded-full border-2 border-stone-900 transition-all duration-1000" style={{ transform: `scaleX(${timer/100})` }}></div>
                        <div className="absolute text-[10px] font-black text-white uppercase tracking-widest">Thrombin Clot formed</div>
                    </div>
                )}
                {bleeding && <div className="absolute bottom-4 left-0 right-0 text-center text-red-600 font-bold text-[10px] animate-bounce">EMERGENCY: BLEEDING!</div>}
            </div>
            
            <button 
                onClick={() => setBleeding(false)}
                disabled={!bleeding}
                className={`px-8 py-3 rounded-full font-black shadow-lg transition-all flex items-center gap-2 ${bleeding ? 'bg-red-600 text-white hover:bg-red-700 animate-bounce' : 'bg-green-100 text-green-700 opacity-50'}`}
            >
                <Shield size={20} /> ACTIVATE VITAMIN K
            </button>

            {!bleeding && (
                <button onClick={() => { setBleeding(true); setTimer(0); }} className="text-xs text-slate-400 font-bold flex items-center gap-1"><RotateCcw size={12}/> Reset</button>
            )}

            <div className="bg-red-50 p-3 rounded-lg border border-red-100 text-[10px] text-red-800">
                <strong>SSC FACT:</strong> Vitamin K transforms <b>Prothrombin</b> into <b>Thrombin</b> to stop bleeding. It is synthesized by E. Coli in the Large Intestine.
            </div>
        </div>
    );
};

// --- SIM 4: BONE DENSITY ---
const BoneLab = ({ language }: { language: Language }) => {
    const [sun, setSun] = useState(0);
    const density = Math.min(100, sun * 1.5);

    return (
        <div className="flex flex-col items-center gap-6 py-4">
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Bone Density Tracker (Vit D)</h3>
            <div className="flex gap-8 items-center">
                 <div className="flex flex-col items-center gap-2">
                    <div className="w-16 h-32 bg-slate-100 border-2 border-slate-200 rounded-full relative overflow-hidden flex flex-col justify-end">
                        <div className={`w-full transition-all duration-500 ${density < 40 ? 'bg-red-400' : 'bg-green-400'}`} style={{ height: `${density}%` }}></div>
                        <div className="absolute inset-0 flex items-center justify-center font-black text-slate-400 text-xs rotate-90">BONE DENSITY</div>
                    </div>
                    {density < 40 && <div className="text-[10px] font-black text-red-600 uppercase animate-bounce">Rickets / Osteo</div>}
                 </div>

                 <div className="flex flex-col gap-4">
                     <div className="text-center">
                        <div className={`text-4xl transition-all duration-500 ${sun > 50 ? 'scale-125 text-yellow-500' : 'text-slate-300'}`}><Sun className="mx-auto" size={40} /></div>
                        <div className="text-[10px] font-bold mt-2 uppercase">Sun Exposure</div>
                        <input type="range" min="0" max="100" value={sun} onChange={e => setSun(Number(e.target.value))} className="w-32 accent-yellow-500 mt-2" />
                     </div>
                 </div>
            </div>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 w-full text-xs text-slate-600">
                <strong>Result:</strong> {density < 40 ? "Low Calcium Absorption! Weak Bones." : "Normal Bone Mineralization. Healthy Skeletal System."}
                <div className="mt-2 flex items-center gap-2 text-indigo-600 font-bold">
                    <Info size={14} /> Vitamin D is also called the <b>Hormonal Vitamin</b>.
                </div>
            </div>
        </div>
    );
};

// --- SIM 5: CLINIC (DIAGNOSIS) ---
const ClinicLab = ({ language }: { language: Language }) => {
    const [patient, setPatient] = useState(0);
    const [answer, setAnswer] = useState<string | null>(null);

    const PATIENTS = [
        { sym: { en: "Swelling in gums, bleeding, heat-sensitive.", hi: "मसूड़ों में सूजन, खून आना, गर्मी से संवेदनशील।" }, ans: 'C' },
        { sym: { en: "4D Symptoms: Dermatitis, Diarrhea, Dementia, Death.", hi: "4D लक्षण: त्वचा रोग, दस्त, याददाश्त खोना।" }, ans: 'B3' },
        { sym: { en: "Paralysis symptoms, Beri-Beri disease.", hi: "लकवा के लक्षण, बेरी-बेरी रोग।" }, ans: 'B1' },
        { sym: { en: "Slow clotting, bleeding doesn't stop easily.", hi: "धीमा थक्का, खून बहना आसानी से नहीं रुकता।" }, ans: 'K' }
    ];

    const current = PATIENTS[patient];

    const solve = (v: string) => {
        if (v === current.ans) setAnswer('correct');
        else setAnswer('wrong');
    };

    const next = () => {
        setPatient(p => (p + 1) % PATIENTS.length);
        setAnswer(null);
    };

    return (
        <div className="flex flex-col items-center gap-6 py-4">
            <h3 className="font-bold text-slate-800 uppercase tracking-widest text-sm">Biochemistry Clinic</h3>
            <div className="bg-indigo-900 text-white p-6 rounded-3xl w-full max-w-sm shadow-xl relative overflow-hidden border-t-8 border-indigo-400">
                <div className="absolute top-2 right-4 text-[8px] font-bold uppercase opacity-50 tracking-widest">Diagnostic Terminal</div>
                <div className="text-xs font-mono mb-4 text-indigo-300">&gt; Symptom Scan...</div>
                <p className="text-sm font-bold leading-relaxed h-12">"{language === Language.ENGLISH ? current.sym.en : current.sym.hi}"</p>
                {answer && (
                    <div className={`mt-4 p-2 rounded-lg text-center font-black animate-bounce ${answer === 'correct' ? 'bg-green-500' : 'bg-red-500'}`}>
                        {answer === 'correct' ? 'DIAGNOSIS ACCURATE!' : 'INCORRECT DIAGNOSIS!'}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3 w-full max-w-sm">
                {['C', 'B3', 'B1', 'K'].map(v => (
                    <button key={v} onClick={() => solve(v)} className="p-3 bg-white border-2 border-slate-100 rounded-xl font-black text-slate-700 hover:border-indigo-500 transition-all shadow-sm">VITAMIN {v}</button>
                ))}
            </div>

            {answer === 'correct' && (
                <button onClick={next} className="bg-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow-lg flex items-center gap-2">NEXT PATIENT <ArrowRight size={16}/></button>
            )}
        </div>
    );
};

export default Vitamins;
