
import React, { useState, useEffect } from 'react';
import { BookOpen, FlaskConical, ArrowRight, ArrowLeft, Baby, Users, Zap, ShieldCheck, Microscope, Heart, Activity, Play, RotateCcw, Droplets, Info, Thermometer, Scissors, Utensils, Target } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
}

// --- STORY DATA ---
const REPRO_STORY = [
  {
    id: 1,
    title: { en: "Chapter 1: Types of Reproduction", hi: "अध्याय 1: प्रजनन के प्रकार" },
    dialogue: {
      en: "Professor Gyan: 'Reproduction is nature's way of copying life! Asexual means a single parent clones itself. Sexual means Male and Female work together. Humans are Unisexual!'",
      hi: "प्रोफेसर ज्ञान: 'प्रजनन जीवन की प्रतिलिपि बनाने का प्रकृति का तरीका है! अलैंगिक का अर्थ है एक माता-पिता खुद को क्लोन करते हैं। लैंगिक का अर्थ है नर और मादा मिलकर काम करते हैं। मनुष्य एकलिंगी (Unisexual) होते हैं!'"
    },
    facts: [
      { label: { en: "Viviparous", hi: "सजीवप्रजक" }, val: { en: "Gives birth to live babies", hi: "सीधे बच्चे को जन्म देते हैं" } },
      { label: { en: "Oviparous", hi: "अंडज" }, val: { en: "Lays eggs (Birds, Reptiles)", hi: "अंडे देते हैं (पक्षी, सरीसृप)" } }
    ],
    visual: 'types'
  },
  {
    id: 2,
    title: { en: "Chapter 2: The Male Workshop", hi: "अध्याय 2: पुरुष प्रणाली" },
    dialogue: {
      en: "Professor: 'In males, Testes are oval (4-5cm long). They stay in the Scrotum to remain 2-3°C cooler than the body (37°C), which is essential for sperm formation!'",
      hi: "प्रोफेसर: 'पुरुषों में वृषण (Testies) अंडाकार होते हैं। ये अंडकोष (Scrotum) में होते हैं ताकि शरीर के तापमान (37°C) से 2-3°C कम तापमान रहे। शुक्राणु बनने के लिए यही आवश्यक है!'"
    },
    facts: [
      { label: { en: "Germ Cells", hi: "जर्म कोशिकाएं" }, val: { en: "Make Sperm (Fist Step)", hi: "शुक्राणु बनाना" } },
      { label: { en: "Sertoli Cells", hi: "सर्टोली कोशिकाएं" }, val: { en: "Nutrition & Support", hi: "पोषण और सहारा देना" } },
      { label: { en: "Leydig Cells", hi: "लेडिग कोशिकाएं" }, val: { en: "Testosterone Hormone", hi: "टेस्टोस्टेरोन हार्मोन" } }
    ],
    visual: 'male'
  },
  {
    id: 3,
    title: { en: "Chapter 3: The Secret Path & Glands", hi: "अध्याय 3: गुप्त मार्ग और ग्रंथियां" },
    dialogue: {
      en: "Professor: 'Semen is a mix! Seminal Glands add Mucus, Prostate adds Citric Acid (for speed), and Bulbourethral adds Fructose (for energy). The path: Seminiferous ⟶ Epididymis ⟶ Vas Deferens.'",
      hi: "प्रोफेसर: 'वीर्य (Semen) एक मिश्रण है! शुक्राशय बलगम (Mucus) देता है, पौरुष ग्रंथि गति के लिए साइट्रिक एसिड और बल्बोयूरेथ्रल ग्रंथि ऊर्जा के लिए फ्रुक्टोज देती है।'"
    },
    facts: [
      { label: { en: "Sperm Path", hi: "शुक्राणु मार्ग" }, val: "Seminiferous ⟶ Rete Testis ⟶ Epididymis ⟶ Vas Deferens" },
      { label: { en: "Semen", hi: "वीर्य घटक" }, val: "Sperm + Mucus + Citric Acid + Fructose" }
    ],
    visual: 'path'
  },
  {
    id: 4,
    title: { en: "Chapter 4: Life Cycles & Cycles", hi: "अध्याय 4: जीवन चक्र और मासिक धर्म" },
    dialogue: {
      en: "Professor: 'Males start making sperm at 13-14 yrs. Females have a cycle: Menarch (First cycle) and Menopause (Last cycle, around 45-50 yrs). Stress can affect these rates!'",
      hi: "प्रोफेसर: 'लड़कों में 13-14 साल में शुक्राणु बनना शुरू होते हैं। लड़कियों में पहला चक्र मीनार्च (Menarch) और आखिरी रजोनिवृत्ति (Menopause) कहलाता है।'"
    },
    facts: [
      { label: { en: "Menarch", hi: "मीनार्च" }, val: { en: "First Menstrual Cycle", hi: "पहला मासिक धर्म चक्र" } },
      { label: { en: "Menopause", hi: "रजोनिवृत्ति" }, val: { en: "End of Reproductive Age", hi: "प्रजनन आयु का अंत" } }
    ],
    visual: 'cycles'
  },
  {
    id: 5,
    title: { en: "Chapter 5: The Fusion (Fertilization)", hi: "अध्याय 5: जीवन का संलयन" },
    dialogue: {
      en: "Professor: 'Insemination brings 200-300 million sperm! They race to find the OVA (Egg). Fertilization is the magic fusion where they meet to form a Zygote—the first single cell!'",
      hi: "प्रोफेसर: 'वीर्यसेचन 200-300 मिलियन शुक्राणु लाता है! निषेचन (Fertilization) अंडाणु और शुक्राणु का संलयन है। इससे युग्मक (Zygote) बनता है—जीवन की पहली कोशिका!'"
    },
    facts: [
      { label: { en: "Zygote", hi: "युग्मक" }, val: { en: "First Single Cell", hi: "जीवन की पहली कोशिका" } },
      { label: { en: "Sperm Count", hi: "शुक्राणु संख्या" }, val: "200 - 300 Million" }
    ],
    visual: 'fusion'
  },
  {
    id: 6,
    title: { en: "Chapter 6: Gestation & Arrival", hi: "अध्याय 6: यात्रा और आगमन" },
    dialogue: {
      en: "Professor: 'Implantation happens in the Womb. The baby grows during Gestation, getting nutrition via the Placenta pipeline. Finally, Parturition (Birth) completes the journey!'",
      hi: "प्रोफेसर: 'गर्भाशय (Womb) में अन्तःकोषीकरण होता है। शिशु को पोषण गर्भानाल (Placenta) से मिलता है। अंत में प्रसव (Parturition) द्वारा शिशु का जन्म होता है!'"
    },
    facts: [
      { label: { en: "Placenta", hi: "गर्भानाल" }, val: { en: "Nutrient Pipeline", hi: "पोषण पाइपलाइन" } },
      { label: { en: "Parturition", hi: "प्रसव" }, val: { en: "Delivery of baby", hi: "शिशु का जन्म" } }
    ],
    visual: 'gestation'
  },
  {
    id: 7,
    title: { en: "Chapter 7: Family Planning", hi: "अध्याय 7: परिवार नियोजन" },
    dialogue: {
      en: "Professor: 'Science helps plan families! Blocking the Vas Deferens is Vasectomy. Blocking the Fallopian Tubes is Tubectomy. This prevents fertilization safely.'",
      hi: "प्रोफेसर: 'वास-डेफरेंस को ब्लॉक करना पुरुष नसबंदी (Vasectomy) है। फैलोपियन ट्यूब को ब्लॉक करना महिला नसबंदी (Tubectomy) है। यह निषेचन को रोकता है।'"
    },
    facts: [
      { label: { en: "Vasectomy", hi: "पुरुष नसबंदी" }, val: { en: "Block Vas Deferens", hi: "वास-डेफरेंस को बंद करना" } },
      { label: { en: "Tubectomy", hi: "महिला नसबंदी" }, val: { en: "Block Fallopian Tube", hi: "फैलोपियन ट्यूब को बंद करना" } }
    ],
    visual: 'control'
  }
];

const ReproductionModule: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'learn' | 'lab'>('learn');
  const [chapter, setChapter] = useState(0);

  return (
    <div className="flex flex-col h-full bg-slate-50 gap-4 overflow-hidden">
      {/* Header */}
      <div className="bg-pink-600 p-4 rounded-xl shadow-md text-white flex justify-between items-center flex-shrink-0 mx-2 mt-2">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg">
             <Baby className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">{language === Language.ENGLISH ? "Reproduction System" : "प्रजनन तंत्र"}</h1>
            <p className="text-pink-100 text-[10px] font-mono uppercase tracking-widest">Interactive Life Cycle</p>
          </div>
        </div>
        
        <div className="flex bg-black/20 p-1 rounded-lg border border-white/10">
           <button 
             onClick={() => setActiveTab('learn')}
             className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'learn' ? 'bg-white text-pink-700 shadow' : 'text-pink-100 hover:text-white'}`}
           >
              <BookOpen size={14} /> {language === Language.ENGLISH ? "Story" : "कहानी"}
           </button>
           <button 
             onClick={() => setActiveTab('lab')}
             className={`px-4 py-2 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'lab' ? 'bg-white text-pink-700 shadow' : 'text-pink-100 hover:text-white'}`}
           >
              <FlaskConical size={14} /> {language === Language.ENGLISH ? "Labs" : "लैब"}
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

// --- STORY VIEW ---
const StoryView = ({ language, chapter, setChapter }: { language: Language, chapter: number, setChapter: (c: number) => void }) => {
    const data = REPRO_STORY[chapter];

    const renderVisual = (type: string) => {
        switch(type) {
            case 'types':
                return (
                    <div className="flex flex-col items-center gap-8 h-full justify-center animate-fade-in">
                         <div className="flex gap-12">
                             <div className="text-center group cursor-pointer">
                                 <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl border-4 border-blue-400 shadow-lg group-hover:scale-110 transition-transform">🐣</div>
                                 <div className="mt-2 font-bold text-blue-700">Oviparous</div>
                                 <div className="text-[10px] text-blue-400 uppercase font-black">Egg Laying</div>
                             </div>
                             <div className="text-center group cursor-pointer">
                                 <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center text-4xl border-4 border-pink-400 shadow-lg group-hover:scale-110 transition-transform">🤱</div>
                                 <div className="mt-2 font-bold text-pink-700">Viviparous</div>
                                 <div className="text-[10px] text-pink-400 uppercase font-black">Live Birth</div>
                             </div>
                         </div>
                    </div>
                );
            case 'male':
                return (
                   <div className="h-full flex items-center justify-center relative animate-fade-in">
                       <svg viewBox="0 0 200 200" className="w-full max-w-[300px]">
                           <ellipse cx="100" cy="130" rx="30" ry="25" fill="#fca5a5" stroke="#ef4444" strokeWidth="3" />
                           <text x="100" y="135" textAnchor="middle" fontSize="8" fill="#991b1b" fontWeight="bold">TESTES (Factory)</text>
                           <path d="M60,110 C60,140 80,160 100,160 C120,160 140,140 140,110" fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />
                           <text x="100" y="175" textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="black">SCROTUM (-2 to -3°C)</text>
                       </svg>
                       <div className="absolute top-4 right-4 bg-red-50 p-3 rounded-xl border border-red-200">
                          <Thermometer className="text-red-500 mb-1" size={20} />
                          <div className="text-[10px] font-black text-red-700 uppercase">Cooler Temp</div>
                       </div>
                   </div>
                );
            case 'path':
                return (
                    <div className="flex flex-col items-center justify-center h-full animate-fade-in">
                        <div className="w-full max-w-xs space-y-3">
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">1</div>
                                <div className="text-xs font-bold text-slate-700 uppercase">Seminiferous</div>
                            </div>
                            <ArrowRight className="mx-auto text-slate-300 rotate-90" size={16} />
                            <div className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm ml-4">
                                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center font-bold text-blue-600">2</div>
                                <div className="text-xs font-bold text-slate-700 uppercase">Vas Deferens</div>
                            </div>
                        </div>
                    </div>
                );
            case 'cycles':
                return (
                   <div className="flex flex-col items-center justify-center h-full gap-4 animate-fade-in">
                       <div className="flex gap-4">
                           <div className="bg-white p-4 rounded-2xl shadow-md border-t-4 border-pink-400 text-center">
                               <div className="text-xs font-black text-pink-600">MENARCH</div>
                               <div className="text-[10px] text-slate-400 mt-1">Start (12-14 yrs)</div>
                           </div>
                           <div className="bg-white p-4 rounded-2xl shadow-md border-t-4 border-slate-400 text-center">
                               <div className="text-xs font-black text-slate-600">MENOPAUSE</div>
                               <div className="text-[10px] text-slate-400 mt-1">End (45-50 yrs)</div>
                           </div>
                       </div>
                       <Activity className="text-pink-500 animate-pulse" size={32} />
                   </div>
                );
            case 'fusion':
                return (
                   <div className="flex flex-col items-center justify-center h-full animate-fade-in">
                       <div className="relative w-56 h-56 flex items-center justify-center">
                           <div className="w-32 h-32 bg-pink-50 rounded-full border-4 border-pink-400 animate-pulse flex items-center justify-center text-4xl">🥚</div>
                           {Array.from({length: 8}).map((_, i) => (
                               <div key={i} className="absolute w-2 h-2 bg-slate-400 rounded-full animate-ping" style={{ transform: `rotate(${i*45}deg) translateX(70px)` }}></div>
                           ))}
                       </div>
                   </div>
                );
            case 'gestation':
                return (
                   <div className="flex flex-col items-center justify-center h-full animate-fade-in">
                       <div className="w-48 h-64 bg-pink-50 rounded-full border-8 border-pink-100 relative flex items-center justify-center">
                           <Baby size={48} className="text-pink-600 animate-bounce" />
                           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 bg-red-500 w-1 h-32 -z-10 opacity-30"></div>
                       </div>
                       <div className="mt-4 bg-white px-3 py-1 rounded shadow-sm border border-pink-100 text-[10px] font-bold text-pink-800">PLACENTA PIPELINE</div>
                   </div>
                );
            case 'control':
                return (
                   <div className="grid grid-cols-2 gap-4 h-full p-6 items-center animate-fade-in">
                       <div className="bg-blue-50 p-4 rounded-2xl border-2 border-blue-200 text-center shadow-lg">
                           <Scissors className="mx-auto mb-2 text-blue-600" size={20}/>
                           <div className="font-black text-blue-800 text-[10px] uppercase">VASECTOMY</div>
                       </div>
                       <div className="bg-pink-50 p-4 rounded-2xl border-2 border-pink-200 text-center shadow-lg">
                           <Scissors className="mx-auto mb-2 text-pink-600" size={20}/>
                           <div className="font-black text-pink-800 text-[10px] uppercase">TUBECTOMY</div>
                       </div>
                   </div>
                );
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-4 p-2">
            <div className="flex-1 bg-white rounded-3xl shadow-inner border border-pink-100 flex items-center justify-center p-4 relative overflow-hidden min-h-[300px]">
                <div className="absolute top-2 left-2 bg-pink-600 text-white px-3 py-1 rounded-full text-[10px] font-bold shadow-sm z-10 flex items-center gap-1">
                    <Microscope size={12}/> Professor's Lab
                </div>
                {renderVisual(data.visual)}
                <div className="absolute bottom-4 flex gap-2">
                    {REPRO_STORY.map((_, i) => <button key={i} onClick={() => setChapter(i)} className={`h-1.5 rounded-full transition-all ${i === chapter ? 'w-10 bg-pink-600' : 'w-2 bg-slate-200'}`} />)}
                </div>
            </div>
            <div className="w-full md:w-80 lg:w-[400px] flex flex-col gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-2xl border-l-[12px] border-pink-500 flex-1 flex flex-col">
                    <h2 className="text-xl font-black text-slate-800 mb-2 flex items-center gap-3"><span className="w-8 h-8 bg-pink-100 text-pink-600 rounded-xl flex items-center justify-center text-sm font-black">{chapter+1}</span>{language === Language.ENGLISH ? data.title.en : data.title.hi}</h2>
                    <div className="bg-pink-50/50 p-4 rounded-2xl mb-4 border border-pink-100 flex-1 overflow-y-auto"><p className="text-slate-700 leading-relaxed text-sm italic font-medium">"{language === Language.ENGLISH ? data.dialogue.en : data.dialogue.hi}"</p></div>
                    <div className="space-y-2 mb-6">
                        {data.facts.map((f:any, idx:number) => (
                           <div key={idx} className="flex justify-between items-center bg-white p-2 rounded-lg border border-slate-100 shadow-sm">
                               <span className="text-[10px] font-black text-slate-400 uppercase">{language === Language.ENGLISH ? f.label.en : f.label.hi}</span>
                               <span className="text-xs font-bold text-pink-600 text-right">{typeof f.val === 'string' ? f.val : (language === Language.ENGLISH ? f.val.en : f.val.hi)}</span>
                           </div>
                        ))}
                    </div>
                    <div className="flex justify-between gap-4 mt-auto">
                        <button onClick={() => setChapter(Math.max(0, chapter - 1))} disabled={chapter === 0} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black disabled:opacity-30"><ArrowLeft size={24} className="mx-auto"/></button>
                        <button onClick={() => setChapter(Math.min(REPRO_STORY.length - 1, chapter + 1))} disabled={chapter === REPRO_STORY.length - 1} className="flex-[2] py-4 bg-pink-600 text-white rounded-2xl font-black shadow-xl hover:bg-pink-700 active:scale-95 flex items-center justify-center gap-2">{language === Language.ENGLISH ? "NEXT" : "आगे"} <ArrowRight size={24}/></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- LAB HUB ---
const LabHub = ({ language }: { language: Language }) => {
    const [sim, setSim] = useState<'fuel' | 'gestation' | 'planning' | 'workers'>('fuel');

    return (
        <div className="h-full flex flex-col gap-4 animate-fade-in">
            <div className="flex bg-white rounded-2xl shadow-lg border border-slate-200 p-1 flex-shrink-0 overflow-x-auto no-scrollbar">
                {[
                    {id:'fuel', icon: Zap, label:{en:'SPERM RACE', hi:'शुक्राणु रेस'}},
                    {id:'gestation', icon: Baby, label:{en:'GESTATION', hi:'गर्भावधि'}},
                    {id:'planning', icon: Scissors, label:{en:'PLANNING', hi:'नियोजन'}},
                    {id:'workers', icon: Users, label:{en:'WORKERS', hi:'कोशिका कर्मी'}}
                ].map(item => (
                    <button key={item.id} onClick={() => setSim(item.id as any)} className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black whitespace-nowrap transition-all flex items-center justify-center gap-2 ${sim === item.id ? 'bg-pink-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <item.icon size={14}/>
                        {language === Language.ENGLISH ? item.label.en : item.label.hi}
                    </button>
                ))}
            </div>
            <div className="flex-1 bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden relative">
                {sim === 'fuel' && <SpermFuelRace language={language} />}
                {sim === 'gestation' && <GestationLab language={language} />}
                {sim === 'planning' && <PlanningLab language={language} />}
                {sim === 'workers' && <WorkerLab language={language} />}
            </div>
        </div>
    );
};

// --- SIM: SPERM FUEL ---
const SpermFuelRace = ({ language }: any) => {
    const [raceState, setRaceState] = useState<'idle' | 'racing' | 'done'>('idle');
    const [mixture, setMixture] = useState<string[]>([]);
    const toggleFuel = (f: string) => mixture.includes(f) ? setMixture(mixture.filter(x => x !== f)) : setMixture([...mixture, f]);
    const startRace = () => { setRaceState('racing'); setTimeout(() => setRaceState('done'), 4000); };
    const getSpeed = () => mixture.includes('Citric Acid') ? (mixture.includes('Fructose') ? 1500 : 3000) : 8000;

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 gap-6">
            <h3 className="font-black text-slate-800 text-lg uppercase">Sperm Fuel & Speed Lab</h3>
            <div className="flex gap-2">
                {['Mucus', 'Citric Acid', 'Fructose'].map(f => (
                    <button key={f} onClick={() => toggleFuel(f)} className={`px-3 py-1.5 rounded-lg text-[9px] font-black border-2 transition-all ${mixture.includes(f) ? 'bg-pink-100 border-pink-500 text-pink-700' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>+ {f}</button>
                ))}
            </div>
            <div className="w-full max-w-md h-12 bg-slate-100 rounded-full relative overflow-hidden shadow-inner">
                <div className="absolute top-1/2 -mt-4 transition-all ease-out" style={{ left: raceState !== 'idle' ? '90%' : '5%', transitionDuration: `${getSpeed()}ms` }}>
                    <div className="text-2xl animate-bounce">⚡</div>
                </div>
            </div>
            <button onClick={startRace} disabled={raceState === 'racing'} className="px-10 py-4 bg-pink-600 text-white rounded-3xl font-black shadow-lg">START RACE</button>
            <p className="text-[10px] text-slate-400 italic text-center">Add Citric Acid (Prostate) and Fructose (Bulbourethral) to win!</p>
        </div>
    );
};

// --- SIM: GESTATION LAB ---
const GestationLab = ({ language }: any) => {
    const [nutrients, setNutrients] = useState(0);
    const [growth, setGrowth] = useState(1);

    const feed = () => {
        setNutrients(n => n + 10);
        if (nutrients > 50) setGrowth(g => Math.min(2.5, g + 0.1));
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 gap-6">
            <h3 className="font-black text-slate-800 text-lg uppercase">Placenta & Growth Sim</h3>
            <div className="relative w-64 h-64 bg-pink-50 rounded-full border-4 border-dashed border-pink-200 flex items-center justify-center overflow-hidden">
                <div className="transition-transform duration-500 ease-out" style={{ transform: `scale(${growth})` }}>
                    <Baby size={48} className="text-pink-600" />
                </div>
                {/* Placenta string */}
                <div className="absolute top-0 w-1 h-32 bg-red-400 animate-pulse"></div>
            </div>
            <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <button onClick={feed} className="w-full py-4 bg-red-500 text-white rounded-2xl font-black shadow-lg hover:bg-red-600 flex items-center justify-center gap-2">
                    <Droplets size={18}/> SEND NUTRIENTS (VIA PLACENTA)
                </button>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 transition-all" style={{ width: `${(nutrients % 100)}%` }}></div>
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">Growth Magnitude: {growth.toFixed(1)}x</p>
            </div>
        </div>
    );
};

// --- SIM: PLANNING LAB ---
const PlanningLab = ({ language }: any) => {
    const [selected, setSelected] = useState<string | null>(null);
    const [message, setMessage] = useState<string>("");

    const handleIdentify = (site: string) => {
        setSelected(site);
        if (site === 'Vas') setMessage(language === Language.ENGLISH ? "Vasectomy: Blocking Vas Deferens path." : "पुरुष नसबंदी: वास-डेफरेंस मार्ग को बंद करना।");
        else setMessage(language === Language.ENGLISH ? "Tubectomy: Blocking Fallopian Tubes." : "महिला नसबंदी: फैलोपियन ट्यूब को बंद करना।");
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 gap-6">
            <h3 className="font-black text-slate-800 text-lg uppercase">Surgical Planning Puzzle</h3>
            <div className="grid grid-cols-2 gap-4 w-full">
                <div 
                    onClick={() => handleIdentify('Vas')} 
                    className={`p-6 rounded-3xl border-4 cursor-pointer transition-all ${selected === 'Vas' ? 'bg-blue-600 border-blue-800 scale-105' : 'bg-blue-50 border-blue-200 hover:border-blue-400'}`}
                >
                    <div className={`text-center font-black ${selected === 'Vas' ? 'text-white' : 'text-blue-800'}`}>MALE SITE</div>
                    <Target className={`mx-auto mt-4 ${selected === 'Vas' ? 'text-white' : 'text-blue-400'}`} size={32} />
                </div>
                <div 
                    onClick={() => handleIdentify('Tube')} 
                    className={`p-6 rounded-3xl border-4 cursor-pointer transition-all ${selected === 'Tube' ? 'bg-pink-600 border-pink-800 scale-105' : 'bg-pink-50 border-pink-200 hover:border-pink-400'}`}
                >
                    <div className={`text-center font-black ${selected === 'Tube' ? 'text-white' : 'text-pink-800'}`}>FEMALE SITE</div>
                    <Target className={`mx-auto mt-4 ${selected === 'Tube' ? 'text-white' : 'text-pink-400'}`} size={32} />
                </div>
            </div>
            {selected && (
                <div className="bg-slate-900 text-white p-4 rounded-2xl w-full text-center animate-bounce-in">
                    <p className="text-sm font-bold">{message}</p>
                    <div className="text-[10px] text-slate-400 mt-1 uppercase">Prevents Fertilization 100%</div>
                </div>
            )}
        </div>
    );
};

// --- SIM: WORKER LAB ---
const WorkerLab = ({ language }: any) => {
    const [target, setTarget] = useState(0);
    const WORKERS = [
        { q: {en:'Provides Nutrition', hi:'पोषण देता है'}, a:'Sertoli' },
        { q: {en:'Makes Testosterone', hi:'टेस्टोस्टेरोन बनाता है'}, a:'Leydig' },
        { q: {en:'Sperm Factory Cell', hi:'शुक्राणु बनाने वाली सेल'}, a:'Germ' }
    ];

    const check = (ans: string) => {
        if (ans === WORKERS[target].a) setTarget((target + 1) % WORKERS.length);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 gap-8">
            <div className="bg-white p-10 rounded-[40px] shadow-2xl border-b-8 border-pink-600 text-center w-full max-w-sm">
                <Microscope size={48} className="mx-auto mb-4 text-slate-300"/>
                <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">{language === Language.ENGLISH ? WORKERS[target].q.en : WORKERS[target].q.hi}</h2>
            </div>
            <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
                {['Sertoli', 'Leydig', 'Germ'].map(w => (
                    <button key={w} onClick={() => check(w)} className="p-3 bg-slate-50 border-2 border-slate-200 rounded-xl font-black text-[10px] hover:border-pink-500 transition-all">{w} Cell</button>
                ))}
            </div>
        </div>
    );
};

export default ReproductionModule;
