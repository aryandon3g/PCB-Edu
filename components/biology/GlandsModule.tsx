
import React, { useState, useEffect } from 'react';
/* Added ShieldCheck and Info to the imports from lucide-react */
import { BookOpen, FlaskConical, ArrowRight, ArrowLeft, Factory, Droplets, Zap, Microscope, Activity, Sun, Moon, Battery, Skull, AlertCircle, Lightbulb, Thermometer, User, Target, ShieldAlert, Heart, Wind, ShieldCheck, Info } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface Props {
  language: Language;
}

// --- STORY CONTENT: THE EMPIRE OF SHAREERPUR ---
const STORY_CHAPTERS = [
  {
    id: 1,
    title: { en: "Chapter 1: The Gland Empire (Shareerpur)", hi: "अध्याय 1: ग्रंथि साम्राज्य (शरीरपुर)" },
    text: {
        en: "Welcome to 'Shareerpur', a city where every department is perfectly organized. The city is run by Glands! There are two main wings: the 'Pipeline Dept' (Exocrine) which uses ducts/tubes for local delivery, and the 'Wireless Dept' (Endocrine) which sends ductless chemical messages called Hormones across the whole city.",
        hi: "स्वागत है 'शरीरपुर' शहर में! इस शहर की व्यवस्था संभालने वाली हैं ग्रंथियां (Glands)। यहाँ दो विभाग हैं: 'पाइपलाइन विभाग' (Exocrine) जो नलियों का उपयोग करता है, और 'वायरलेस विभाग' (Endocrine) जो बिना नली के शक्तिशाली 'हार्मोन' संदेश भेजता है।"
    },
    facts: [
        { label: { en: "Discovery", hi: "खोज" }, val: "Sterling (1902)" },
        { label: { en: "First Hormone", hi: "पहला हार्मोन" }, val: "Secretin (Small Intestine)" }
    ],
    visual: 'intro'
  },
  {
    id: 2,
    title: { en: "Chapter 2: The Pipeline Dept (Exocrine)", hi: "अध्याय 2: पाइपलाइन विभाग (Exocrine)" },
    text: {
        en: "The Liver is Shareerpur's largest factory (Largest Gland). It delivers Bile juice via pipes to the gut. In the 'Tear Dept', the tiny Lacrimal Gland is the smallest. When Rishi smells a hot paratha, Salivary glands activate! When he runs, Sweat glands release cooling water via skin pipes.",
        hi: "यकृत (Liver) शरीरपुर की सबसे बड़ी फैक्ट्री (ग्रंथि) है। 'आँसू विभाग' में बैठी अश्रु ग्रंथि (Lacrimal) सबसे छोटी बहिःस्रावी ग्रंथि है। जब ऋषि गरम पराठा देखता है, तो लार ग्रंथि (Salivary) सक्रिय हो जाती है, और दौड़ने पर पसीना ग्रंथि (Sweat) पाइपलाइन खोल देती है!"
    },
    facts: [
        { label: { en: "Largest Exocrine", hi: "सबसे बड़ी बहिःस्रावी" }, val: { en: "Liver", hi: "यकृत (Liver)" } },
        { label: { en: "Smallest Exocrine", hi: "सबसे छोटी बहिःस्रावी" }, val: { en: "Lacrimal (Tear)", hi: "अश्रु ग्रंथि (Lacrimal)" } }
    ],
    visual: 'exocrine'
  },
  {
    id: 3,
    title: { en: "Chapter 3: The Master Control Rooms", hi: "अध्याय 3: मास्टर कंट्रोल रूम" },
    text: {
        en: "Two controllers run the Wireless Dept. The Hypothalamus (MOM Gland) controls the Pituitary and regulates Rishi's mood (Dopamine). The Pituitary (Master Gland) is pea-sized but controls growth, love (Oxytocin), and water balance (Vasopressin).",
        hi: "वायरलेस विभाग को दो कंट्रोल रूम चलाते हैं। हाइपोथैलेमस (MOM Gland) पिट्यूटरी को नियंत्रित करता है और ऋषि के मूड (डोपामाइन) का ध्यान रखता है। पिट्यूटरी (Master Gland) मटर के दाने जैसी है, पर यह वृद्धि और प्यार (Oxytocin) जैसे कार्यों को नियंत्रित करती है।"
    },
    facts: [
        { label: { en: "MOM Gland", hi: "मास्टर ऑफ मास्टर" }, val: "Hypothalamus" },
        { label: { en: "Love Hormone", hi: "लव हार्मोन" }, val: "Oxytocin" },
        { label: { en: "Growth Issues", hi: "वृद्धि विकार" }, val: { en: "Gigantism / Dwarfism", hi: "विशालकायता / बौनापन" } }
    ],
    visual: 'master'
  },
  {
    id: 4,
    title: { en: "Chapter 4: Mixed Gland & Thyroid", hi: "अध्याय 4: मिश्रित ग्रंथि और थाइराइड" },
    text: {
        en: "The Pancreas is a 'Mixed Gland', handling both juices and hormones. Its Beta cells in the 'Islets of Langerhans' make Insulin to turn Blood Glucose into Glycogen storage. Also, the H-shaped Thyroid is the largest endocrine gland in the body!",
        hi: "अग्नाशय (Pancreas) एक 'मिश्रित ग्रंथि' है। इसके 'लैगरहैंस के द्वीपों' की बीटा-कोशिकाएं इंसुलिन बनाती हैं जो शर्करा को ग्लाइकोजन में बदलती हैं। शरीरपुर की सबसे बड़ी अंतःस्रावी ग्रंथि थायराइड (Thyroid) है, जो H-आकार की होती है।"
    },
    facts: [
        { label: { en: "Mixed Gland", hi: "मिश्रित ग्रंथि" }, val: "Pancreas" },
        { label: { en: "Diabetes Cause", hi: "मधुमेह का कारण" }, val: { en: "Low Insulin", hi: "कम इंसुलिन" } }
    ],
    visual: 'mixed'
  },
  {
    id: 5,
    title: { en: "Chapter 5: Biological Clock & Emergency", hi: "अध्याय 5: जैविक घड़ी और आपातकाल" },
    text: {
        en: "The Pineal Gland is the Biological Clock, releasing Melatonin at night to help Rishi sleep. When danger strikes, the Adrenal Gland (Emergency/4S Gland) triggers the 3F response: Fear, Fight, Flight. It is the 'Do or Die' station!",
        hi: "पीनियल ग्रंथि जैविक घड़ी है, जो रात को मेलाटोनिन निकालकर ऋषि के दैनिक चक्र का ध्यान रखती है। जब अचानक खतरा आता है, तो अधिवृक्क (Adrenal) ग्रंथि सक्रिय हो जाती है। इसे 'करो या मरो' (Do or Die) ग्रंथि भी कहते हैं, जो 3F (डर, लड़ाई, भागना) में मदद करती है।"
    },
    facts: [
        { label: { en: "3F Gland", hi: "3F ग्रंथि" }, val: "Adrenal" },
        { label: { en: "Smallest (Endo)", hi: "सबसे छोटी (अंतःस्रावी)" }, val: "Pineal Gland" }
    ],
    visual: 'clock'
  }
];

const GlandsModule: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'lab'>('learn');
  const [chapter, setChapter] = useState(0);

  return (
    <div className="flex flex-col h-full bg-slate-50 gap-4 overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-700 to-purple-700 p-4 rounded-[32px] shadow-xl text-white flex justify-between items-center flex-shrink-0 mx-2 mt-2">
        <div className="flex items-center gap-4">
          <div className="bg-white/20 p-3 rounded-2xl shadow-inner backdrop-blur-md">
             <Factory className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight leading-none">SHAREERPUR</h1>
            <p className="text-indigo-200 text-[10px] font-black uppercase tracking-[0.2em] mt-1">The Gland Empire Terminal</p>
          </div>
        </div>
        
        <div className="flex bg-black/30 p-1 rounded-2xl border border-white/10 backdrop-blur-xl">
           <button 
             onClick={() => setActiveTab('learn')} 
             className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all uppercase tracking-widest ${activeTab === 'learn' ? 'bg-white text-indigo-900 shadow-lg scale-105' : 'text-indigo-100 hover:text-white'}`}
           >
              <BookOpen size={16} /> {language === Language.ENGLISH ? "Tour" : "सफर"}
           </button>
           <button 
             onClick={() => setActiveTab('lab')} 
             className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all uppercase tracking-widest ${activeTab === 'lab' ? 'bg-white text-purple-900 shadow-lg scale-105' : 'text-indigo-100 hover:text-white'}`}
           >
              <FlaskConical size={16} /> {language === Language.ENGLISH ? "Labs" : "लैब"}
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative p-2">
        {activeTab === 'learn' ? (
          <StoryView language={language} chapter={chapter} setChapter={setChapter} />
        ) : (
          <LabHub language={language} />
        )}
      </div>
    </div>
  );
};

// --- STORY VIEW COMPONENT ---
const StoryView = ({ language, chapter, setChapter }: any) => {
    const data = STORY_CHAPTERS[chapter];
    const renderVisual = (type: string) => {
        switch(type) {
            case 'intro': 
                return (
                    <div className="flex flex-col items-center gap-8 animate-fade-in">
                        <div className="flex gap-12">
                            <div className="text-center group cursor-pointer hover:scale-110 transition-all">
                                <div className="w-28 h-28 bg-blue-50 rounded-[40px] shadow-2xl flex items-center justify-center text-5xl border-b-8 border-blue-500 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-blue-500/5 animate-pulse"></div>
                                    🚿
                                </div>
                                <div className="mt-4 font-black text-[10px] text-blue-600 uppercase tracking-widest">Pipeline Wing</div>
                            </div>
                            <div className="text-center group cursor-pointer hover:scale-110 transition-all">
                                <div className="w-28 h-28 bg-purple-50 rounded-[40px] shadow-2xl flex items-center justify-center text-5xl border-b-8 border-purple-500 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-purple-500/5 animate-pulse"></div>
                                    📡
                                </div>
                                <div className="mt-4 font-black text-[10px] text-purple-600 uppercase tracking-widest">Wireless Wing</div>
                            </div>
                        </div>
                        <div className="bg-indigo-900/90 text-white px-8 py-3 rounded-3xl shadow-2xl border-t-2 border-indigo-400 font-black text-xs animate-bounce uppercase tracking-tighter">
                            Sterling (1902) &bull; First Message: Secretin
                        </div>
                    </div>
                );
            case 'exocrine': 
                return (
                    <div className="flex flex-col items-center gap-8 h-full justify-center">
                        <div className="relative w-64 h-40 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-[50px] border-4 border-white shadow-2xl overflow-hidden flex items-center justify-center">
                            <div className="absolute inset-0 opacity-10 flex flex-wrap gap-2 p-4">
                                {Array.from({length:20}).map((_,i)=><div key={i} className="w-4 h-4 bg-blue-500 rounded-full"></div>)}
                            </div>
                            <div className="z-10 text-center">
                                <Factory className="text-blue-600 mx-auto mb-2" size={40} />
                                <div className="font-black text-blue-900 text-lg uppercase tracking-widest leading-none">LIVER FACTORY</div>
                                <div className="text-[10px] font-bold text-blue-500 mt-1 uppercase tracking-widest">Largest Dept</div>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white p-4 rounded-3xl shadow-xl border border-blue-100 flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">💧</div>
                                <div className="text-left leading-none">
                                    <div className="text-[10px] font-black text-blue-800 uppercase">Lacrimal</div>
                                    <div className="text-[8px] font-bold text-slate-400 uppercase">Smallest</div>
                                </div>
                            </div>
                            <div className="bg-white p-4 rounded-3xl shadow-xl border border-blue-100 flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center text-2xl">🍔</div>
                                <div className="text-left leading-none">
                                    <div className="text-[10px] font-black text-blue-800 uppercase">Salivary</div>
                                    <div className="text-[8px] font-bold text-slate-400 uppercase">Activation</div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'master':
                return (
                    <div className="flex flex-col items-center gap-8">
                        <div className="relative">
                            <div className="w-44 h-44 rounded-full bg-white shadow-[0_30px_60px_-15px_rgba(79,70,229,0.3)] border-[12px] border-indigo-50 flex items-center justify-center relative group">
                                <Zap size={80} className="text-indigo-600 group-hover:scale-125 transition-transform duration-500 animate-pulse"/>
                                <div className="absolute -top-6 bg-indigo-600 text-white px-6 py-2 rounded-full text-xs font-black shadow-xl tracking-tighter uppercase">CONTROL CENTER</div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
                            <div className="bg-indigo-950 text-white p-4 rounded-3xl text-center shadow-2xl relative overflow-hidden border border-indigo-400">
                                <div className="text-[10px] font-black uppercase opacity-60 mb-1">M.O.M Station</div>
                                <div className="text-sm font-black tracking-tight">HYPOTHALAMUS</div>
                                <div className="absolute top-0 right-0 w-8 h-8 bg-indigo-500/20 rounded-bl-full"></div>
                            </div>
                            <div className="bg-white border-4 border-indigo-100 p-4 rounded-3xl text-center shadow-2xl relative overflow-hidden">
                                <div className="text-[10px] font-black uppercase text-slate-400 mb-1">Master Station</div>
                                <div className="text-sm font-black tracking-tight text-indigo-900">PITUITARY</div>
                                <div className="text-[8px] font-bold text-slate-400 mt-1 uppercase tracking-widest">Pea-sized</div>
                            </div>
                        </div>
                    </div>
                );
            case 'mixed':
                return (
                    <div className="flex flex-col items-center gap-6 animate-fade-in">
                        <div className="w-64 h-28 bg-gradient-to-r from-blue-500 to-purple-600 rounded-[50px] border-4 border-white shadow-2xl flex items-center justify-center relative overflow-hidden group">
                            <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.2)_1px,transparent_1px)] bg-[size:10px_10px]"></div>
                            <div className="text-white font-black text-xl drop-shadow-xl uppercase tracking-widest">PANCREAS</div>
                        </div>
                        <div className="flex gap-4">
                            <div className="bg-white p-4 rounded-3xl border-2 border-emerald-100 text-center shadow-xl group hover:border-emerald-500 transition-colors">
                                <div className="text-[10px] font-black text-emerald-700 uppercase mb-2 flex items-center justify-center gap-1"><ShieldCheck size={12}/> Islets of Langerhans</div>
                                <div className="w-14 h-14 bg-emerald-50 rounded-2xl mx-auto flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">🧬</div>
                                <div className="text-[9px] font-black text-slate-500 mt-2 uppercase tracking-widest">Beta: Insulin</div>
                            </div>
                            <div className="bg-white p-4 rounded-3xl border-2 border-orange-100 text-center shadow-xl group hover:border-orange-500 transition-colors">
                                <div className="text-[10px] font-black text-orange-700 uppercase mb-2">Largest Endocrine</div>
                                <div className="w-14 h-14 bg-orange-50 rounded-2xl mx-auto flex items-center justify-center text-3xl font-black text-orange-600 group-hover:scale-110 transition-transform">H</div>
                                <div className="text-[9px] font-black text-slate-500 mt-2 uppercase tracking-widest">THYROID</div>
                            </div>
                        </div>
                    </div>
                );
            case 'clock':
                return (
                    <div className="flex flex-col items-center gap-8 h-full justify-center">
                        <div className="w-40 h-40 bg-indigo-950 rounded-full flex items-center justify-center border-8 border-indigo-500 shadow-[0_0_50px_indigo] relative group overflow-hidden">
                             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>
                             <Moon size={64} className="text-indigo-200 animate-pulse z-10 group-hover:scale-110 transition-transform"/>
                             <div className="absolute bottom-4 text-[9px] font-black text-indigo-400 uppercase tracking-widest z-10">PINEAL CLOCK</div>
                        </div>
                        <div className="bg-red-600 text-white px-10 py-5 rounded-[40px] shadow-2xl flex items-center gap-4 border-t-4 border-white/30 animate-pulse transform hover:scale-105 transition-all">
                            <ShieldAlert size={32}/>
                            <div className="text-left">
                                <div className="text-xs font-black uppercase tracking-widest">Adrenal Station</div>
                                <div className="text-[10px] font-bold opacity-80 uppercase leading-none mt-1">3F Emergency: Fear / Fight / Flight</div>
                            </div>
                        </div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-4 p-2">
            <div className="flex-1 bg-white rounded-[40px] shadow-inner border border-indigo-100 flex items-center justify-center p-8 relative overflow-hidden min-h-[350px]">
                <div className="absolute top-4 left-4 bg-indigo-600 text-white px-4 py-1.5 rounded-full text-[10px] font-black shadow-lg z-10 flex items-center gap-2 uppercase tracking-wider">
                    <Microscope size={14}/> Shareerpur Lab
                </div>
                {renderVisual(data.visual)}
                <div className="absolute bottom-8 flex gap-2.5">
                    {STORY_CHAPTERS.map((_, i) => (
                        <button key={i} onClick={() => setChapter(i)} className={`h-2 rounded-full transition-all duration-500 ${i === chapter ? 'w-12 bg-indigo-600 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'w-2 bg-slate-200 hover:bg-slate-300'}`} />
                    ))}
                </div>
            </div>
            
            <div className="w-full md:w-80 lg:w-[450px] flex flex-col gap-4">
                <div className="bg-white p-8 rounded-[48px] shadow-2xl border-l-[16px] border-indigo-500 flex-1 flex flex-col relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-50 rounded-full opacity-40"></div>
                    
                    <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-4 relative z-10">
                        <span className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center text-sm font-black shadow-inner">{chapter+1}</span>
                        {language === Language.ENGLISH ? data.title.en : data.title.hi}
                    </h2>
                    
                    <div className="bg-indigo-50/50 p-6 rounded-[32px] mb-6 border border-indigo-100 flex-1 overflow-y-auto custom-scrollbar relative z-10">
                        <p className="text-slate-700 leading-relaxed text-base font-medium italic">
                            "{language === Language.ENGLISH ? data.text.en : data.text.hi}"
                        </p>
                    </div>

                    <div className="space-y-3 mb-8 relative z-10">
                        {data.facts.map((f:any, idx:number) => (
                           <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm transform hover:scale-[1.02] transition-transform">
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{language === Language.ENGLISH ? f.label.en : f.label.hi}</span>
                               <span className="text-xs font-black text-indigo-600 text-right">{typeof f.val === 'string' ? f.val : (language === Language.ENGLISH ? f.val.en : f.val.hi)}</span>
                           </div>
                        ))}
                    </div>

                    <div className="flex justify-between gap-4 mt-auto relative z-10">
                        <button 
                            onClick={() => setChapter(Math.max(0, chapter - 1))} 
                            disabled={chapter === 0} 
                            className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-3xl font-black disabled:opacity-30 flex items-center justify-center hover:bg-slate-200 transition-all shadow-sm active:scale-95"
                        >
                            <ArrowLeft size={24}/>
                        </button>
                        <button 
                            onClick={() => setChapter(Math.min(STORY_CHAPTERS.length - 1, chapter + 1))} 
                            disabled={chapter === STORY_CHAPTERS.length - 1} 
                            className="flex-[2.5] py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-2xl hover:bg-indigo-700 active:scale-95 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs"
                        >
                            {language === Language.ENGLISH ? "Next Chapter" : "अगला अध्याय"} <ArrowRight size={20}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- LAB HUB COMPONENT ---
const LabHub = ({ language }: { language: Language }) => {
    const [sim, setSim] = useState<'insulin' | 'clock' | 'emergency'>('insulin');
    return (
        <div className="h-full flex flex-col gap-4 animate-fade-in">
            <div className="flex bg-white rounded-3xl shadow-xl border border-slate-200 p-1.5 flex-shrink-0 overflow-x-auto no-scrollbar">
                {[
                    {id:'insulin', icon: Activity, label: TRANSLATIONS.glucoseBalance},
                    {id:'clock', icon: Sun, label: TRANSLATIONS.bioClock},
                    {id:'emergency', icon: AlertCircle, label: TRANSLATIONS.emergencyRush}
                ].map(item => (
                    <button 
                      key={item.id} 
                      onClick={() => setSim(item.id as any)} 
                      className={`flex-1 py-4 px-6 rounded-2xl text-[11px] font-black whitespace-nowrap transition-all flex items-center justify-center gap-3 uppercase tracking-widest ${sim === item.id ? 'bg-indigo-600 text-white shadow-[0_10px_20px_-5px_rgba(79,70,229,0.5)] scale-105' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                    >
                        <item.icon size={18}/>
                        {item.label[language]}
                    </button>
                ))}
            </div>
            <div className="flex-1 bg-white rounded-[48px] shadow-2xl border border-slate-100 overflow-hidden relative">
                {sim === 'insulin' && <InsulinSim language={language} />}
                {sim === 'clock' && <ClockSim language={language} />}
                {sim === 'emergency' && <EmergencySim language={language} />}
            </div>
        </div>
    );
};

// --- LAB SIM 1: INSULIN BALANCE GAME ---
const InsulinSim = ({ language }: any) => {
    const [glucose, setGlucose] = useState<number[]>([]);
    const [glycogen, setGlycogen] = useState(0);
    const [insulinActive, setInsulinActive] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(80); // Fasting base

    const eatFood = () => {
        const newGlucose = Array.from({length:12}, (_,i)=>Math.random()*100);
        setGlucose(prev => [...prev, ...newGlucose]);
        setCurrentLevel(prev => Math.min(240, prev + 80));
    };

    const releaseInsulin = () => {
        setInsulinActive(true);
        setTimeout(() => {
            const count = glucose.length;
            setGlycogen(prev => prev + count);
            setGlucose([]);
            setCurrentLevel(80);
            setInsulinActive(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 gap-8">
            <div className="flex justify-between w-full max-w-lg items-center px-4">
                 <div className="flex flex-col">
                    <h3 className="font-black text-slate-800 text-xl uppercase tracking-tighter">Glucose - Insulin Balancer</h3>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shareerpur: Islets Dept</div>
                 </div>
                 <div className="text-right">
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Blood Sugar Level</div>
                    <div className={`px-5 py-2 rounded-2xl font-black text-lg shadow-xl text-white transition-all duration-500 ${currentLevel > 170 ? 'bg-red-600 animate-pulse' : 'bg-emerald-600'}`}>
                        {currentLevel} <span className="text-[10px] opacity-70">mg/dL</span>
                    </div>
                 </div>
            </div>

            <div className="flex-1 w-full max-w-lg bg-slate-900 rounded-[50px] border-8 border-white shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:15px_15px]"></div>
                
                {glucose.map((g, i) => (
                    <div key={i} className="absolute w-5 h-5 bg-red-500 rounded-full shadow-[0_0_15px_red] animate-pulse" style={{ left: `${(g*0.8)+10}%`, top: `${(Math.sin(g)*40)+50}%` }}>
                        <div className="absolute inset-1 bg-white/30 rounded-full"></div>
                    </div>
                ))}
                
                {insulinActive && (
                    <div className="absolute inset-0 bg-blue-500/20 backdrop-blur-[4px] flex items-center justify-center animate-fade-in">
                        <div className="flex flex-col items-center">
                            <Droplets size={80} className="text-blue-400 animate-bounce"/>
                            <div className="text-white font-black text-2xl mt-4 uppercase tracking-[0.2em] drop-shadow-lg">Releasing Insulin...</div>
                        </div>
                    </div>
                )}
                
                {!glucose.length && glycogen > 0 && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-10 animate-fade-in">
                        <div className="w-24 h-24 bg-emerald-500 rounded-[40px] flex items-center justify-center text-white text-5xl shadow-[0_20px_50px_-10px_rgba(16,185,129,0.5)] mb-6 transform rotate-6 hover:rotate-0 transition-transform">🏠</div>
                        <div className="font-black text-emerald-400 text-xl uppercase tracking-widest">Liver Storage</div>
                        <div className="text-sm text-emerald-100 font-bold mt-2">{glycogen} Particles saved as Glycogen</div>
                    </div>
                )}

                {currentLevel > 170 && !insulinActive && (
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-[10px] font-black animate-bounce shadow-xl uppercase">High Blood Sugar (Hyperglycemia)</div>
                )}
            </div>

            <div className="grid grid-cols-2 gap-6 w-full max-w-lg">
                <button 
                  onClick={eatFood} 
                  disabled={insulinActive}
                  className="p-6 bg-orange-100 text-orange-800 border-4 border-orange-200 rounded-[32px] font-black text-sm hover:scale-105 active:scale-95 transition-all shadow-xl hover:bg-white uppercase tracking-widest"
                >
                    🍱 Eat Meal (+80)
                </button>
                <button 
                  onClick={releaseInsulin} 
                  disabled={glucose.length === 0 || insulinActive} 
                  className="p-6 bg-blue-600 text-white rounded-[32px] font-black text-sm hover:bg-blue-700 disabled:opacity-30 shadow-xl transition-all uppercase tracking-widest hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                    <Zap size={18}/> Inject Insulin
                </button>
            </div>
            
            <div className="bg-amber-50 p-5 rounded-[32px] border-2 border-amber-200 text-[11px] text-amber-900 font-bold text-center max-w-lg shadow-sm">
                {/* Fixed missing Info icon usage here by including it in imports */}
                <Info size={14} className="inline mr-2 text-amber-600"/>
                <strong>SSC FACT:</strong> Normal Fasting: 70-90 mg/dL. Post-Meal: 150-170 mg/dL. 
                <br/>Beta Cells in <b>Islets of Langerhans</b> produce Insulin to convert Glucose to Glycogen.
            </div>
        </div>
    );
};

// --- LAB SIM 2: BIOLOGICAL CLOCK ---
const ClockSim = ({ language }: any) => {
    const [time, setTime] = useState(12);
    const isNight = time < 6 || time > 18;
    // Higher melatonin in deep night
    const melatonin = isNight ? (time < 3 || time > 21 ? 95 : 70) : 5;

    return (
        <div className="flex flex-col items-center justify-center h-full p-10 gap-10 transition-colors duration-1000" style={{ backgroundColor: isNight ? '#0c0a09' : '#fff7ed' }}>
            <div className="text-center">
                <h3 className={`font-black text-2xl uppercase tracking-tighter ${isNight ? 'text-indigo-300' : 'text-amber-900'}`}>The Pineal Biological Clock</h3>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 opacity-60 ${isNight ? 'text-indigo-400' : 'text-amber-700'}`}>Regulating Shareerpur's Diurnal Cycle</p>
            </div>
            
            <div className="relative w-72 h-72 rounded-full border-[12px] border-white/10 flex items-center justify-center overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.5)]">
                 <div className="absolute inset-0 transition-opacity duration-1000" style={{ opacity: isNight ? 1 : 0, background: 'radial-gradient(circle, #312e81, #0c0a09)' }}></div>
                 {isNight ? (
                    <div className="relative flex flex-col items-center z-10 animate-fade-in">
                        <Moon size={100} className="text-indigo-200 animate-pulse drop-shadow-[0_0_20px_rgba(199,210,254,0.5)]" />
                        <div className="mt-4 flex gap-1">
                            {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" style={{animationDelay: `${i*0.3}s`}}></div>)}
                        </div>
                    </div>
                 ) : (
                    <div className="relative flex flex-col items-center z-10 animate-fade-in">
                        <Sun size={100} className="text-amber-500 animate-spin-slow drop-shadow-[0_0_20px_rgba(245,158,11,0.3)]" />
                    </div>
                 )}
                 <div className="absolute bottom-6 font-black text-5xl text-white/20 font-mono z-10 tracking-widest">{String(time).padStart(2,'0')}:00</div>
            </div>

            <div className="w-full max-w-md space-y-8 bg-white/5 backdrop-blur-2xl p-8 rounded-[50px] border border-white/10 shadow-2xl">
                <div className="relative h-6 group">
                   <input 
                     type="range" min="0" max="23" value={time} 
                     onChange={e => setTime(Number(e.target.value))} 
                     className="w-full h-4 bg-white/10 rounded-full appearance-none cursor-pointer accent-indigo-500" 
                   />
                   <div className="flex justify-between mt-2 text-[10px] font-black text-white/40 uppercase tracking-widest px-2">
                       <span>Midnight</span>
                       <span>Noon</span>
                       <span>Night</span>
                   </div>
                </div>

                <div className="flex items-center gap-6">
                    <div className={`p-4 rounded-3xl transition-all duration-500 ${isNight ? 'bg-indigo-900/50 text-indigo-400' : 'bg-amber-900/10 text-amber-700'}`}>
                        <Battery size={28} className={melatonin > 50 ? 'animate-pulse' : ''} />
                    </div>
                    <div className="flex-1 space-y-3">
                        <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                            <span className={isNight ? 'text-indigo-300' : 'text-amber-900'}>Melatonin (Night Hormone)</span>
                            <span className={isNight ? 'text-indigo-400' : 'text-amber-800'}>{melatonin}%</span>
                        </div>
                        <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden border border-white/5">
                            <div className={`h-full transition-all duration-1000 ease-out ${isNight ? 'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]' : 'bg-amber-500'}`} style={{ width: `${melatonin}%` }}></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`p-6 rounded-[32px] text-center border-2 transition-all duration-1000 max-w-md ${isNight ? 'bg-indigo-900/30 border-indigo-500/50 text-indigo-100' : 'bg-amber-100/30 border-amber-400/50 text-amber-900'}`}>
                <p className="text-base font-black uppercase tracking-tight">
                    {isNight ? (language === Language.ENGLISH ? "Sleep Mode Active" : "नींद मोड सक्रिय") : (language === Language.ENGLISH ? "Alert Mode Active" : "सतर्क मोड सक्रिय")}
                </p>
                <div className="mt-2 text-[10px] font-bold opacity-60 flex items-center justify-center gap-2 uppercase tracking-widest">
                    <Lightbulb size={14}/> Pineal is the smallest endocrine gland
                </div>
            </div>
        </div>
    );
};

// --- LAB SIM 3: EMERGENCY 3F RESPONSE ---
const EmergencySim = ({ language }: any) => {
    const [stress, setStress] = useState(0);
    const is3F = stress >= 100;

    useEffect(() => {
        if (stress > 0 && !is3F) {
            const timer = setInterval(() => setStress(s => Math.max(0, s - 4)), 100);
            return () => clearInterval(timer);
        }
    }, [stress, is3F]);

    return (
        <div className={`flex flex-col items-center justify-center h-full p-10 transition-colors duration-500 ${is3F ? 'bg-red-700' : 'bg-slate-50'}`}>
            <div className="text-center mb-10">
                <h3 className={`font-black text-2xl uppercase tracking-tighter ${is3F ? 'text-white' : 'text-slate-800'}`}>Adrenal: 3F Station (Do or Die)</h3>
                <p className={`text-[10px] font-black uppercase tracking-[0.2em] mt-2 ${is3F ? 'text-red-200' : 'text-slate-400'}`}>Simulating Emergency Hormone Release</p>
            </div>
            
            <div className="relative mb-16 scale-110">
                <div className={`w-48 h-48 rounded-[60px] flex flex-col items-center justify-center border-8 transition-all duration-300 transform ${is3F ? 'bg-white border-white scale-125 rotate-12 shadow-[0_0_100px_white]' : 'bg-red-50 border-red-500 scale-100 rotate-0'}`}>
                     {is3F ? (
                        <>
                            <Zap size={100} className="text-red-600 animate-bounce" fill="currentColor"/>
                            <div className="text-red-600 font-black text-xs uppercase mt-2">Maximum Rush</div>
                        </>
                     ) : (
                        <>
                            <Skull size={100} className="text-red-500 opacity-10" />
                            <div className="text-red-300 font-black text-[10px] uppercase mt-2">Station Idle</div>
                        </>
                     )}
                </div>
                {is3F && (
                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2">
                        {['FEAR', 'FIGHT', 'FLIGHT'].map(f => (
                            <div key={f} className="bg-black text-white px-3 py-1 rounded-lg text-[9px] font-black animate-bounce shadow-2xl">{f}</div>
                        ))}
                    </div>
                )}
            </div>

            <div className="w-full max-w-sm space-y-6">
                <button 
                  onMouseDown={() => setStress(prev => Math.min(100, prev + 25))} 
                  className={`w-full py-8 rounded-[40px] font-black text-xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all active:scale-95 flex items-center justify-center gap-4 ${is3F ? 'bg-black text-white border-4 border-white/20' : 'bg-red-600 text-white hover:bg-red-700'}`}
                >
                    {is3F ? <ShieldAlert size={28}/> : <Target size={28}/>}
                    {is3F ? "EMERGENCY ACTIVE" : "TRIGGER STRESSOR"}
                </button>

                <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                        <span className={is3F ? 'text-red-200' : 'text-slate-400'}>Adrenaline Concentration</span>
                        <span className={is3F ? 'text-white' : 'text-red-600'}>{stress}%</span>
                    </div>
                    <div className={`w-full h-5 rounded-full overflow-hidden border-4 ${is3F ? 'bg-white/20 border-white' : 'bg-slate-200 border-slate-300'}`}>
                        <div className={`h-full transition-all duration-75 ${is3F ? 'bg-white shadow-[0_0_20px_white]' : 'bg-red-500'}`} style={{ width: `${stress}%` }}></div>
                    </div>
                </div>
            </div>
            
            <div className={`mt-10 p-6 rounded-[32px] border-2 text-center max-w-xs transition-all duration-500 ${is3F ? 'bg-white border-white text-red-600 shadow-2xl' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
                <div className="text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 mb-2">
                    <Activity size={16}/> 4S Gland Status
                </div>
                <div className="text-[10px] font-bold opacity-80 uppercase leading-relaxed">Sugar, Salt, Sex, Stress regulation station</div>
            </div>
            
            {is3F && (
                <button onClick={() => setStress(0)} className="mt-8 px-10 py-3 bg-white text-red-700 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-all">
                    Release Stress
                </button>
            )}
        </div>
    );
};

export default GlandsModule;
