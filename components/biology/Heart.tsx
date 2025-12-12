import React, { useState, useEffect, useRef } from 'react';
import { Activity, Heart as HeartIcon, Play, Pause, RotateCcw, ZoomIn, ZoomOut, Droplets, Zap, ChevronRight, ChevronLeft, Info, Gauge, Layers, FileText, Box, CheckCircle, HelpCircle, XCircle } from 'lucide-react';
import { Language } from '../../types';

interface HeartProps {
  language: Language;
}

// --- 1. EDUCATIONAL DATA (THEORY & FACTS) ---
const HEART_CONTENT: Record<string, any> = {
    structure: {
        title: { en: "Anatomy", hi: "संरचना" },
        parts: {
            ra: { 
                name: { en: "Right Atrium", hi: "दायां आलिंद (R.A.)" }, 
                desc: { en: "Receives deoxygenated blood from body via Superior & Inferior Vena Cava.", hi: "शरीर से अशुद्ध रक्त S.V.C और I.V.C के माध्यम से प्राप्त करता है।" },
                fact: { en: "Contains SA Node (Pacemaker).", hi: "इसमें SA Node (प्राकृतिक पेसमेकर) होता है।" }
            },
            rv: { 
                name: { en: "Right Ventricle", hi: "दायां निलय (R.V.)" }, 
                desc: { en: "Pumps blood to lungs via Pulmonary Valve & Artery.", hi: "पल्मोनरी वाल्व और धमनी के जरिए फेफड़ों में रक्त पंप करता है।" },
                fact: { en: "Walls are thinner than Left Ventricle.", hi: "बाएं निलय की तुलना में दीवारें पतली होती हैं।" }
            },
            la: { 
                name: { en: "Left Atrium", hi: "बायां आलिंद (L.A.)" }, 
                desc: { en: "Receives pure oxygenated blood from lungs via Pulmonary Veins.", hi: "फुफ्फुसीय शिराओं (P.V.) के जरिए फेफड़ों से शुद्ध रक्त प्राप्त करता है।" },
                fact: { en: "Oxygenated blood is bright red.", hi: "शुद्ध रक्त चमकीला लाल होता है।" }
            },
            lv: { 
                name: { en: "Left Ventricle", hi: "बायां निलय (L.V.)" }, 
                desc: { en: "Pumps pure blood to body via Aorta Valve.", hi: "महाधमनी वाल्व (Aorta Valve) के जरिए पूरे शरीर में शुद्ध रक्त भेजता है।" },
                fact: { en: "Has the THICKEST muscular wall to pump blood furthest.", hi: "रक्त को दूर तक पंप करने के लिए इसकी दीवार सबसे मोटी होती है।" }
            },
            aorta: { 
                name: { en: "Aorta", hi: "महाधमनी (Aorta)" }, 
                desc: { en: "Largest artery carrying oxygenated blood to body organs.", hi: "शरीर के अंगों तक शुद्ध रक्त ले जाने वाली सबसे बड़ी धमनी।" },
                fact: { en: "Originates from Left Ventricle.", hi: "यह बाएं निलय से निकलती है।" }
            },
            pa: { 
                name: { en: "Pulmonary Artery", hi: "फुफ्फुसीय धमनी (P.A.)" }, 
                desc: { en: "Carries impure blood to lungs for purification.", hi: "अशुद्ध रक्त को शुद्धिकरण के लिए फेफड़ों तक ले जाती है।" },
                fact: { en: "EXCEPTION: Only artery carrying IMPURE (CO2 rich) blood.", hi: "अपवाद: एकमात्र धमनी जो अशुद्ध रक्त ले जाती है।" }
            },
            pv: { 
                name: { en: "Pulmonary Vein", hi: "फुफ्फुसीय शिरा (P.V.)" }, 
                desc: { en: "Brings pure blood from lungs to heart.", hi: "फेफड़ों से शुद्ध रक्त को हृदय तक लाती है।" },
                fact: { en: "EXCEPTION: Only vein carrying PURE (O2 rich) blood.", hi: "अपवाद: एकमात्र शिरा जो शुद्ध रक्त ले जाती है।" }
            },
            vc: { 
                name: { en: "Vena Cava", hi: "महाशिरा (Vena Cava)" }, 
                desc: { en: "Superior (Upper body) & Inferior (Lower body) veins.", hi: "शरीर के ऊपरी (SVC) और निचले (IVC) हिस्सों से रक्त लाती है।" },
                fact: { en: "Carries CO2 rich blood. Inferior Vena Cava is the largest vein.", hi: "CO2 युक्त रक्त ले जाती है। इन्फीरियर वेना कावा सबसे बड़ी शिरा है।" }
            }
        }
    },
    facts: {
        title: { en: "Exam Facts", hi: "महत्वपूर्ण तथ्य" },
        discovery: { label: {en: "Discovery", hi: "खोज (1628)"}, val: {en: "William Harvey (Circulatory System)", hi: "विलियम हार्वे (परिसंचरण तंत्र)"} },
        weight: [
            { label: { en: "Weight (Men)", hi: "वजन (लड़के)" }, val: { en: "280 - 340 grams", hi: "280 - 340 ग्राम" } },
            { label: { en: "Weight (Women)", hi: "वजन (लड़कियां)" }, val: { en: "230 - 280 grams", hi: "230 - 280 ग्राम" } },
            { label: { en: "Weight (Newborn)", hi: "वजन (बच्चे/नवजात)" }, val: { en: "20 - 25 grams", hi: "20 - 25 ग्राम" } },
        ],
        location: { label: { en: "Location", hi: "स्थान" }, val: { en: "Mediastinum Space / Cardiac Notch", hi: "मीडिया स्टर्नम स्पेस / कार्डियक नॉच" } },
        layers: { 
            title: { en: "Heart Layers", hi: "हृदय की परतें" },
            items: [
                { en: "Pericardium (Outer Covering)", hi: "पेरीकार्डियम (बाहरी आवरण)" },
                { en: "Fibrous + Serous Layers", hi: "रेशेदार (Fibrous) + सिरोज (Serous) परतें" },
                { en: "Cardiac Fluid (Protection)", hi: "कार्डियक फ्लुइड (सुरक्षा के लिए)" }
            ]
        }
    },
    quiz: [
        { q: { en: "Who discovered the Blood Circulatory System?", hi: "रक्त परिसंचरण तंत्र की खोज किसने की?" }, options: ["Newton", "Einstein", "William Harvey", "Robert Hooke"], ans: "William Harvey" },
        { q: { en: "What is the weight of heart in adult men?", hi: "वयस्क पुरुषों में हृदय का वजन कितना होता है?" }, options: ["200-250g", "280-340g", "150-200g", "400-500g"], ans: "280-340g" },
        { q: { en: "Which valve is between Right Atrium and Right Ventricle?", hi: "दाएं आलिंद और दाएं निलय के बीच कौन सा वाल्व होता है?" }, options: ["Bicuspid", "Tricuspid", "Aortic", "Pulmonary"], ans: "Tricuspid" },
        { q: { en: "Which artery carries IMPURE blood?", hi: "कौन सी धमनी अशुद्ध रक्त ले जाती है?" }, options: ["Aorta", "Pulmonary Artery", "Coronary Artery", "Carotid"], ans: "Pulmonary Artery" },
    ]
};

// --- 2. SIMULATION DATA (COORDINATES) ---
const FLOW_COORDS = [
    { x: 130, y: 480, label: "Organs (Body)", color: "#3b82f6" }, 
    { x: 130, y: 350, label: "Vena Cava", color: "#3b82f6" },     
    { x: 120, y: 200, label: "Right Atrium", color: "#3b82f6" },  
    { x: 140, y: 250, label: "Tricuspid Valve", color: "#3b82f6" },
    { x: 160, y: 320, label: "Right Ventricle", color: "#3b82f6" },
    { x: 180, y: 180, label: "Pulmonary Valve", color: "#3b82f6" },
    { x: 100, y: 100, label: "Pulmonary Artery", color: "#3b82f6" },
    { x: 50, y: 50, label: "LUNGS (Oxygenation)", color: "#ef4444" }, 
    { x: 350, y: 100, label: "Pulmonary Vein", color: "#ef4444" }, 
    { x: 300, y: 180, label: "Left Atrium", color: "#ef4444" },    
    { x: 280, y: 250, label: "Bicuspid Valve", color: "#ef4444" }, 
    { x: 260, y: 350, label: "Left Ventricle", color: "#ef4444" }, 
    { x: 250, y: 200, label: "Aortic Valve", color: "#ef4444" },   
    { x: 260, y: 80, label: "Aorta", color: "#ef4444" },           
    { x: 220, y: 480, label: "Body Organs", color: "#ef4444" }     
];

const FLOW_STEPS_INFO = [
    { title: { en: "From Organs", hi: "अंगों से (From Organs)" }, desc: { en: "Deoxygenated blood returns via Inferior Vena Cava.", hi: "अशुद्ध रक्त इन्फीरियर वेना कावा के माध्यम से वापस आता है।" } },
    { title: { en: "Vena Cava", hi: "महाशिरा (Vena Cava)" }, desc: { en: "Largest Vein. Carries CO2 rich blood.", hi: "सबसे बड़ी शिरा। CO2 युक्त रक्त ले जाती है।" } },
    { title: { en: "Right Atrium (RA)", hi: "दायां आलिंद (RA)" }, desc: { en: "Blood fills the first chamber.", hi: "रक्त पहले कक्ष में भरता है।" } },
    { title: { en: "Tricuspid Valve", hi: "त्रिकपाटी वाल्व" }, desc: { en: "Prevents backflow.", hi: "रक्त को पीछे जाने से रोकता है।" } },
    { title: { en: "Right Ventricle (RV)", hi: "दायां निलय (RV)" }, desc: { en: "Pumps blood towards lungs.", hi: "रक्त को फेफड़ों की ओर पंप करता है।" } },
    { title: { en: "Pulmonary Valve", hi: "फुफ्फुसीय कपाट" }, desc: { en: "Entry to Pulmonary Artery.", hi: "फुफ्फुसीय धमनी का प्रवेश द्वार।" } },
    { title: { en: "Pulmonary Artery", hi: "फुफ्फुसीय धमनी" }, desc: { en: "EXCEPTION: Only artery with Impure Blood.", hi: "अपवाद: एकमात्र धमनी जिसमें अशुद्ध रक्त होता है।" } },
    { title: { en: "LUNGS (Alveoli)", hi: "फेफड़े (कूपिकाएं)" }, desc: { en: "CO2 OUT, O2 IN. Blood becomes Red.", hi: "CO2 बाहर, O2 अंदर। रक्त लाल हो जाता है।" } },
    { title: { en: "Pulmonary Vein", hi: "फुफ्फुसीय शिरा" }, desc: { en: "EXCEPTION: Only vein with Pure Blood.", hi: "अपवाद: एकमात्र शिरा जिसमें शुद्ध रक्त होता है।" } },
    { title: { en: "Left Atrium (LA)", hi: "बायां आलिंद (LA)" }, desc: { en: "Receives Oxygenated blood.", hi: "ऑक्सीजन युक्त रक्त प्राप्त करता है।" } },
    { title: { en: "Bicuspid (Mitral)", hi: "द्विकपाटी वाल्व" }, desc: { en: "Valve between LA and LV.", hi: "LA और LV के बीच का वाल्व।" } },
    { title: { en: "Left Ventricle (LV)", hi: "बायां निलय (LV)" }, desc: { en: "Thickest wall. Strongest Pump.", hi: "सबसे मोटी दीवार। सबसे मजबूत पंप।" } },
    { title: { en: "Aortic Valve", hi: "महाधमनी कपाट" }, desc: { en: "Entry to Aorta.", hi: "महाधमनी का प्रवेश द्वार।" } },
    { title: { en: "Aorta", hi: "महाधमनी" }, desc: { en: "Largest Artery. Distributes blood.", hi: "सबसे बड़ी धमनी। रक्त वितरित करती है।" } },
    { title: { en: "To Organs", hi: "अंगों की ओर" }, desc: { en: "Cycle repeats.", hi: "चक्र दोहराया जाता है।" } },
];

const IMPULSE_STEPS = [
    { id: 'sa', x: 110, y: 140, title: "SA Node", label: {en: "Natural Pacemaker", hi: "प्राकृतिक पेसमेकर"}, desc: {en: "Generates Impulse (Na+)", hi: "आवेग उत्पन्न करता है (Na+)"} },
    { id: 'av', x: 155, y: 210, title: "AV Node", label: {en: "Relay Station", hi: "रिले स्टेशन"}, desc: {en: "Holds signal briefly", hi: "सिग्नल को थोड़ी देर रोकता है"} },
    { id: 'his', x: 180, y: 260, title: "Bundle of His", label: {en: "Septum Path", hi: "विभाजक पथ"}, desc: {en: "Signal travels down septum", hi: "सिग्नल दीवार (Septum) से नीचे जाता है"} },
    { id: 'purkinje', x: 200, y: 350, title: "Purkinje Fibers", label: {en: "Contraction", hi: "संकुचन"}, desc: {en: "Ventricles contract (Systole)", hi: "निलय सिकुड़ते हैं (सिस्टोल)"} }
];

const Heart: React.FC<HeartProps> = ({ language }) => {
  // State for Tabs & View
  const [activeTab, setActiveTab] = useState<'structure' | 'facts' | 'impulse' | 'flow' | 'quiz'>('structure');
  const [viewMode, setViewMode] = useState<'realistic' | 'diagram'>('realistic');
  
  // State for Visualization
  const [zoom, setZoom] = useState(1);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // General Heartbeat

  // Simulation States
  const [flowIndex, setFlowIndex] = useState(0);
  const [impulseIndex, setImpulseIndex] = useState(-1);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);

  // --- EFFECT: Impulse Auto-Play ---
  useEffect(() => {
      let timer: any;
      if (activeTab === 'impulse' && impulseIndex >= 0 && impulseIndex < IMPULSE_STEPS.length) {
          timer = setTimeout(() => {
              setImpulseIndex(prev => prev + 1);
          }, 1500); 
      } else if (impulseIndex >= IMPULSE_STEPS.length) {
          timer = setTimeout(() => setImpulseIndex(-1), 2000); 
      }
      return () => clearTimeout(timer);
  }, [impulseIndex, activeTab]);

  // --- HANDLERS ---
  const handlePartClick = (part: string) => {
    if (activeTab === 'impulse' || activeTab === 'flow') return; // Don't select parts during sim
    setSelectedPart(part);
    setActiveTab('structure');
  };

  const handleNextFlow = () => setFlowIndex(prev => (prev + 1) % FLOW_COORDS.length);
  const handlePrevFlow = () => setFlowIndex(prev => (prev - 1 + FLOW_COORDS.length) % FLOW_COORDS.length);
  const startImpulse = () => setImpulseIndex(0);

  const handleQuizOption = (opt: string) => {
      if (quizAnswered) return;
      const correct = HEART_CONTENT.quiz[quizIndex].ans === opt;
      setQuizAnswered(opt);
      if (correct) setQuizScore(p => p + 1);
  };

  const nextQuestion = () => {
    if (quizIndex < HEART_CONTENT.quiz.length - 1) {
        setQuizIndex(p => p + 1);
        setQuizAnswered(null);
    } else {
        setQuizIndex(0);
        setQuizScore(0);
        setQuizAnswered(null);
    }
  };

  const getPartColor = (part: string, baseColor: string) => {
      return selectedPart === part ? "#facc15" : baseColor;
  };

  return (
    <div className="flex flex-col h-auto lg:h-full gap-4">
      {/* --- TOP HEADER --- */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 justify-between items-center">
         <div className="flex items-center gap-2">
             <div className={`p-2 rounded-full ${isPlaying ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
                 <Activity size={20} />
             </div>
             <div>
                <h2 className="font-bold text-slate-800 leading-none">{language === Language.ENGLISH ? "Human Heart" : "मानव हृदय"}</h2>
                <span className="text-[10px] text-slate-500 font-medium">Class Notes & Simulation</span>
             </div>
         </div>

         {/* View Toggles */}
         <div className="flex bg-slate-100 p-1 rounded-lg">
             <button 
                onClick={() => setViewMode('realistic')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'realistic' ? 'bg-white shadow text-rose-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <HeartIcon size={14} /> {language === Language.ENGLISH ? "Realistic" : "असली जैसा"}
             </button>
             <button 
                onClick={() => setViewMode('diagram')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'diagram' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <FileText size={14} /> {language === Language.ENGLISH ? "Diagram" : "आरेख"}
             </button>
         </div>

         {/* Beat Control */}
         <button onClick={() => setIsPlaying(!isPlaying)} className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold transition-all ${isPlaying ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
             {isPlaying ? <Pause size={16}/> : <Play size={16}/>}
             {isPlaying ? (language === Language.ENGLISH ? "PAUSE" : "रोकें") : (language === Language.ENGLISH ? "BEAT" : "धड़कन")}
         </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-auto lg:flex-1 lg:min-h-0">
         
         {/* --- LEFT: VISUALIZATION (SVG) --- */}
         <div className="w-full lg:flex-1 bg-gradient-to-b from-slate-50 to-rose-50 rounded-xl shadow-inner border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
             
             <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                 <button onClick={() => setZoom(Math.max(0.6, zoom - 0.2))} className="p-2 bg-white rounded shadow text-slate-600"><ZoomOut size={16}/></button>
                 <button onClick={() => setZoom(Math.min(2, zoom + 0.2))} className="p-2 bg-white rounded shadow text-slate-600"><ZoomIn size={16}/></button>
             </div>

             <div style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s ease' }}>
                <svg width="400" height="500" viewBox="0 0 400 500" className="overflow-visible drop-shadow-xl">
                    <defs>
                         <radialGradient id="realRed" cx="40%" cy="30%" r="80%"><stop offset="0%" stopColor="#ef4444" /><stop offset="60%" stopColor="#b91c1c" /><stop offset="100%" stopColor="#7f1d1d" /></radialGradient>
                         <radialGradient id="realBlue" cx="40%" cy="30%" r="80%"><stop offset="0%" stopColor="#60a5fa" /><stop offset="60%" stopColor="#2563eb" /><stop offset="100%" stopColor="#1e3a8a" /></radialGradient>
                         <filter id="glow"><feGaussianBlur stdDeviation="2.5" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
                         <style>{`
                            .heart-beat { animation: beat 0.8s infinite ease-in-out; transform-origin: center; }
                            @keyframes beat { 0% { transform: scale(1); } 15% { transform: scale(1.03); } 30% { transform: scale(1); } 45% { transform: scale(1.01); } 100% { transform: scale(1); } }
                        `}</style>
                    </defs>

                    <g className={isPlaying ? "heart-beat" : ""} opacity={activeTab === 'impulse' ? 0.6 : 1} style={{ transition: "opacity 0.5s" }}>
                        
                        {viewMode === 'diagram' ? (
                            // === DIAGRAM VIEW (Schematic) ===
                            <>
                                {/* Vena Cava */}
                                <path d="M80,50 L80,180 L130,180 L130,50 Z" fill={getPartColor('vc', '#93c5fd')} stroke="#1e3a8a" strokeWidth="2" onClick={() => handlePartClick('vc')} className="cursor-pointer"/>
                                <path d="M80,350 L80,450 L130,450 L130,350 Z" fill={getPartColor('vc', '#93c5fd')} stroke="#1e3a8a" strokeWidth="2" onClick={() => handlePartClick('vc')} className="cursor-pointer"/>
                                {/* PA */}
                                <path d="M180,150 L150,80 L50,60 L50,110 L150,130 L180,180" fill={getPartColor('pa', '#60a5fa')} stroke="#1e3a8a" strokeWidth="2" onClick={() => handlePartClick('pa')} className="cursor-pointer"/>
                                {/* Aorta */}
                                <path d="M200,160 C200,40 320,40 320,160 L280,160 C280,100 240,100 240,160 Z" fill={getPartColor('aorta', '#ef4444')} stroke="#7f1d1d" strokeWidth="2" onClick={() => handlePartClick('aorta')} className="cursor-pointer"/>
                                {/* PV */}
                                <path d="M360,180 L400,180 L400,230 L360,230 Z" fill={getPartColor('pv', '#fca5a5')} stroke="#7f1d1d" strokeWidth="2" onClick={() => handlePartClick('pv')} className="cursor-pointer"/>
                                {/* Chambers */}
                                <path d="M130,180 Q200,180 200,240 Q130,240 130,180 Z" fill={getPartColor('ra', '#bfdbfe')} stroke="#1e3a8a" strokeWidth="3" onClick={() => handlePartClick('ra')} className="cursor-pointer"/>
                                <path d="M140,260 Q200,260 200,380 Q160,420 140,260 Z" fill={getPartColor('rv', '#93c5fd')} stroke="#1e3a8a" strokeWidth="3" onClick={() => handlePartClick('rv')} className="cursor-pointer"/>
                                <path d="M260,180 Q330,180 330,240 Q260,240 260,180 Z" fill={getPartColor('la', '#fecaca')} stroke="#7f1d1d" strokeWidth="3" onClick={() => handlePartClick('la')} className="cursor-pointer"/>
                                <path d="M260,260 Q320,260 320,380 Q280,450 260,260 Z" fill={getPartColor('lv', '#f87171')} stroke="#7f1d1d" strokeWidth="8" onClick={() => handlePartClick('lv')} className="cursor-pointer"/>
                                {/* Labels */}
                                <text x="140" y="210" fontSize="12" fontWeight="bold">R.A</text>
                                <text x="160" y="320" fontSize="12" fontWeight="bold">R.V</text>
                                <text x="280" y="210" fontSize="12" fontWeight="bold">L.A</text>
                                <text x="280" y="320" fontSize="12" fontWeight="bold">L.V</text>
                            </>
                        ) : (
                            // === REALISTIC VIEW ===
                            <>
                                {/* SVC & IVC */}
                                <path d="M130,20 L130,150 L160,150 L160,20" fill={getPartColor('vc', 'url(#realBlue)')} stroke="#1e3a8a" onClick={() => handlePartClick('vc')} className="cursor-pointer"/>
                                <path d="M130,480 L130,320 C130,290 160,290 170,320 L170,480" fill={getPartColor('vc', 'url(#realBlue)')} stroke="#1e3a8a" onClick={() => handlePartClick('vc')} className="cursor-pointer"/>
                                {/* Aorta */}
                                <path d="M220,200 C220,100 220,60 260,40 C320,20 340,60 340,100 L300,100 C300,80 280,60 260,80 C250,90 250,150 250,200" fill={getPartColor('aorta', 'url(#realRed)')} stroke="#7f1d1d" onClick={() => handlePartClick('aorta')} className="cursor-pointer"/>
                                {/* PA */}
                                <path d="M180,220 C180,180 140,120 100,100 L110,80 C160,100 200,140 220,220" fill={getPartColor('pa', '#3b82f6')} stroke="#1e3a8a" onClick={() => handlePartClick('pa')} className="cursor-pointer"/>
                                {/* RA */}
                                <path d="M120,140 C80,140 80,200 120,240 C140,240 150,220 150,200" fill={getPartColor('ra', 'url(#realBlue)')} stroke="#1e3a8a" onClick={() => handlePartClick('ra')} className="cursor-pointer"/>
                                {/* LA */}
                                <path d="M300,140 C340,140 340,200 300,220 C280,220 280,180 300,140" fill={getPartColor('la', 'url(#realRed)')} stroke="#7f1d1d" onClick={() => handlePartClick('la')} className="cursor-pointer"/>
                                {/* RV */}
                                <path d="M140,240 C120,280 160,400 220,460 C230,420 240,300 220,220" fill={getPartColor('rv', 'url(#realBlue)')} stroke="#1e3a8a" onClick={() => handlePartClick('rv')} className="cursor-pointer"/>
                                {/* LV */}
                                <path d="M220,220 C260,220 340,260 340,320 C340,400 280,450 220,480" fill={getPartColor('lv', 'url(#realRed)')} stroke="#7f1d1d" onClick={() => handlePartClick('lv')} className="cursor-pointer"/>
                                
                                {activeTab === 'structure' && (
                                    <g className="text-xs font-bold font-sans text-white pointer-events-none" style={{ textShadow: '0 1px 2px black' }}>
                                        <text x="110" y="190">R.A</text>
                                        <text x="170" y="350">R.V</text>
                                        <text x="310" y="180">L.A</text>
                                        <text x="280" y="320">L.V</text>
                                    </g>
                                )}
                            </>
                        )}
                    </g>

                    {/* --- IMPULSE SIMULATION LAYER --- */}
                    {activeTab === 'impulse' && (
                        <g>
                             <path d="M110,140 L155,210 L180,260 L180,320 L150,380 M180,320 L230,380" fill="none" stroke="#fef08a" strokeWidth="3" strokeLinecap="round" strokeDasharray="4 4" opacity="0.6" />
                             {IMPULSE_STEPS.map((node, i) => (
                                 <g key={node.id} opacity={impulseIndex >= i ? 1 : 0.3} style={{ transition: "opacity 0.3s" }}>
                                     <circle cx={node.x} cy={node.y} r={impulseIndex === i ? 12 : 6} fill="#ffff00" filter="url(#glow)">
                                         {impulseIndex === i && <animate attributeName="r" values="6;12;6" dur="0.5s" repeatCount="indefinite" />}
                                     </circle>
                                     <text x={node.x + 15} y={node.y} fill="black" fontSize="12" fontWeight="bold" className="bg-white px-1">{node.title}</text>
                                 </g>
                             ))}
                             {impulseIndex >= 0 && impulseIndex < 3 && (
                                <circle r="4" fill="#fff">
                                    <animateMotion dur="0.5s" repeatCount="1" path={`M${IMPULSE_STEPS[impulseIndex].x},${IMPULSE_STEPS[impulseIndex].y} L${IMPULSE_STEPS[impulseIndex+1].x},${IMPULSE_STEPS[impulseIndex+1].y}`} />
                                </circle>
                             )}
                        </g>
                    )}

                    {/* --- BLOOD FLOW SIMULATION LAYER --- */}
                    {activeTab === 'flow' && (
                        <g>
                            <path d="M130,480 L130,350 L120,200 L160,320 L100,100 M350,100 L300,180 L260,350 L260,80" fill="none" stroke="white" strokeWidth="2" strokeDasharray="5 5" opacity="0.3" />
                            <g style={{ transform: `translate(${FLOW_COORDS[flowIndex].x}px, ${FLOW_COORDS[flowIndex].y}px)`, transition: 'transform 1s cubic-bezier(0.25, 1, 0.5, 1)' }}>
                                <circle r="12" fill={FLOW_COORDS[flowIndex].color} stroke="white" strokeWidth="2" filter="url(#glow)">
                                    <animate attributeName="r" values="10;12;10" dur="1s" repeatCount="indefinite" />
                                </circle>
                                <path d="M-3, -3 L3, 0 L-3, 3" fill="none" stroke="white" strokeWidth="2" />
                            </g>
                        </g>
                    )}

                </svg>
             </div>
         </div>

         {/* --- RIGHT: CONTROL PANEL & INFO --- */}
         <div className="w-full lg:w-96 flex flex-col h-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
             
             {/* Tab Header */}
             <div className="flex bg-slate-50 border-b border-slate-200 overflow-x-auto">
                 {['structure', 'impulse', 'flow', 'facts', 'quiz'].map(tab => (
                     <button 
                        key={tab}
                        onClick={() => { setActiveTab(tab as any); setImpulseIndex(-1); setFlowIndex(0); }}
                        className={`px-3 py-3 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 flex-shrink-0 ${activeTab === tab ? 'border-rose-500 text-rose-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                     >
                         {tab === 'structure' && (language === Language.ENGLISH ? "Anatomy" : "रचना")}
                         {tab === 'impulse' && (language === Language.ENGLISH ? "Impulse" : "धड़कन")}
                         {tab === 'flow' && (language === Language.ENGLISH ? "Flow" : "प्रवाह")}
                         {tab === 'facts' && (language === Language.ENGLISH ? "Facts" : "तथ्य")}
                         {tab === 'quiz' && (language === Language.ENGLISH ? "Quiz" : "क्विज़")}
                     </button>
                 ))}
             </div>

             <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
                 
                 {/* 1. STRUCTURE TAB */}
                 {activeTab === 'structure' && (
                     <div className="space-y-4 animate-fade-in">
                         {selectedPart ? (
                            <>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><HeartIcon size={20}/></div>
                                    <h3 className="text-xl font-bold text-slate-800">
                                        {language === Language.ENGLISH ? HEART_CONTENT.structure.parts[selectedPart].name.en : HEART_CONTENT.structure.parts[selectedPart].name.hi}
                                    </h3>
                                    <button onClick={() => setSelectedPart(null)} className="ml-auto text-slate-400 hover:text-slate-600"><XCircle size={18}/></button>
                                </div>
                                <p className="text-slate-600 leading-relaxed">
                                    {language === Language.ENGLISH ? HEART_CONTENT.structure.parts[selectedPart].desc.en : HEART_CONTENT.structure.parts[selectedPart].desc.hi}
                                </p>
                                <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
                                    <h4 className="text-xs font-bold text-amber-700 uppercase mb-1 flex items-center gap-1"><Info size={12}/> Fact</h4>
                                    <p className="text-sm italic text-slate-800">
                                        {language === Language.ENGLISH ? HEART_CONTENT.structure.parts[selectedPart].fact.en : HEART_CONTENT.structure.parts[selectedPart].fact.hi}
                                    </p>
                                </div>
                            </>
                         ) : (
                             <div className="text-center text-slate-400 py-10">
                                 <HeartIcon size={48} className="mx-auto mb-3 opacity-20"/>
                                 <p>{language === Language.ENGLISH ? "Tap on any heart part to see details." : "विवरण देखने के लिए हृदय के किसी भी भाग पर टैप करें।"}</p>
                             </div>
                         )}
                     </div>
                 )}

                 {/* 2. FACTS TAB (RESTORED ALL NOTES) */}
                 {activeTab === 'facts' && (
                     <div className="space-y-4 animate-fade-in">
                         {/* Discovery */}
                         <div className="bg-rose-50 p-3 rounded-lg border border-rose-100">
                             <div className="text-xs font-bold text-rose-500 uppercase">{language === Language.ENGLISH ? HEART_CONTENT.facts.discovery.label.en : HEART_CONTENT.facts.discovery.label.hi}</div>
                             <div className="text-sm font-bold text-slate-800">{language === Language.ENGLISH ? HEART_CONTENT.facts.discovery.val.en : HEART_CONTENT.facts.discovery.val.hi}</div>
                         </div>
                         
                         {/* Weights */}
                         <div className="bg-slate-50 p-3 rounded-lg">
                             <h4 className="text-xs font-bold text-slate-500 uppercase mb-2">Weight Stats</h4>
                             <div className="space-y-2">
                                 {HEART_CONTENT.facts.weight.map((w: any, idx: number) => (
                                     <div key={idx} className="flex justify-between text-sm">
                                         <span className="text-slate-600">{language === Language.ENGLISH ? w.label.en : w.label.hi}</span>
                                         <span className="font-bold text-slate-800">{language === Language.ENGLISH ? w.val.en : w.val.hi}</span>
                                     </div>
                                 ))}
                             </div>
                         </div>

                         {/* Layers */}
                         <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                             <h4 className="text-sm font-bold text-slate-800 mb-2 border-b pb-1 flex items-center gap-2"><Layers size={14}/> {language === Language.ENGLISH ? HEART_CONTENT.facts.layers.title.en : HEART_CONTENT.facts.layers.title.hi}</h4>
                             <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                                 {HEART_CONTENT.facts.layers.items.map((l: any, i: number) => (
                                     <li key={i}>{language === Language.ENGLISH ? l.en : l.hi}</li>
                                 ))}
                             </ul>
                         </div>
                     </div>
                 )}

                 {/* 3. IMPULSE SIMULATION TAB */}
                 {activeTab === 'impulse' && (
                     <div className="flex flex-col h-full animate-fade-in bg-yellow-50/50 p-4 rounded-xl">
                         <div className="text-center mb-6">
                             <h3 className="text-lg font-bold text-slate-800 flex items-center justify-center gap-2">
                                 <Zap className="text-yellow-500" fill="currentColor" size={20}/> 
                                 {language === Language.ENGLISH ? "Electrical System" : "विद्युत आवेग"}
                             </h3>
                             <p className="text-xs text-slate-500 mt-1">SA Node → AV Node → Bundle of His → Purkinje</p>
                         </div>
                         <div className="flex-1 flex flex-col items-center justify-center gap-4">
                             <button onClick={startImpulse} className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-bold rounded-full shadow-lg transition-transform active:scale-95 flex items-center gap-2">
                                 <Zap size={20}/> GENERATE IMPULSE
                             </button>
                             {impulseIndex !== -1 && (
                                 <div className="w-full bg-white p-3 rounded-lg border border-yellow-200 shadow-sm mt-4">
                                     <div className="text-xs font-bold text-yellow-600 uppercase mb-1">Current Step</div>
                                     <div className="text-sm font-bold">{IMPULSE_STEPS[Math.min(impulseIndex, 3)].title}</div>
                                     <div className="text-xs text-slate-600">{language === Language.ENGLISH ? IMPULSE_STEPS[Math.min(impulseIndex, 3)].desc.en : IMPULSE_STEPS[Math.min(impulseIndex, 3)].desc.hi}</div>
                                 </div>
                             )}
                         </div>
                     </div>
                 )}

                 {/* 4. BLOOD FLOW SIMULATION TAB */}
                 {activeTab === 'flow' && (
                     <div className="flex flex-col h-full animate-fade-in bg-blue-50/30 p-4 rounded-xl">
                         <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2"><Droplets className="text-blue-500"/> Blood Circulation</h3>
                         <div className="flex-1 flex flex-col items-center justify-center text-center">
                             <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center text-white font-bold text-lg shadow-md ${FLOW_COORDS[flowIndex].color === '#3b82f6' ? 'bg-blue-500' : 'bg-red-500'}`}>
                                 {flowIndex + 1}
                             </div>
                             <h4 className="text-lg font-bold text-slate-800 mb-2">{language === Language.ENGLISH ? FLOW_STEPS_INFO[flowIndex].title.en : FLOW_STEPS_INFO[flowIndex].title.hi}</h4>
                             <p className="text-sm text-slate-600 mb-6">{language === Language.ENGLISH ? FLOW_STEPS_INFO[flowIndex].desc.en : FLOW_STEPS_INFO[flowIndex].desc.hi}</p>
                             <div className="flex gap-4 w-full">
                                 <button onClick={handlePrevFlow} className="flex-1 py-2 bg-white border border-slate-300 rounded-lg text-slate-600 font-bold"><ChevronLeft className="mx-auto"/></button>
                                 <button onClick={handleNextFlow} className="flex-[2] py-2 bg-indigo-600 text-white rounded-lg font-bold shadow-md">Next Step</button>
                             </div>
                         </div>
                     </div>
                 )}

                 {/* 5. QUIZ TAB */}
                 {activeTab === 'quiz' && (
                     <div className="flex flex-col h-full animate-fade-in">
                         <div className="flex justify-between items-center mb-4">
                             <span className="text-xs font-bold text-slate-400 uppercase">Q {quizIndex + 1}/{HEART_CONTENT.quiz.length}</span>
                             <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Score: {quizScore}</span>
                         </div>
                         <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-4 flex-1">
                             <h4 className="font-bold text-slate-800 mb-4">{language === Language.ENGLISH ? HEART_CONTENT.quiz[quizIndex].q.en : HEART_CONTENT.quiz[quizIndex].q.hi}</h4>
                             <div className="space-y-2">
                                 {HEART_CONTENT.quiz[quizIndex].options.map((opt: string, i: number) => {
                                      let btnClass = "w-full text-left p-3 rounded-lg text-sm font-medium border transition-all ";
                                      if (quizAnswered) {
                                          if (opt === HEART_CONTENT.quiz[quizIndex].ans) btnClass += "bg-green-100 border-green-300 text-green-800";
                                          else if (opt === quizAnswered) btnClass += "bg-red-50 border-red-200 text-red-700";
                                          else btnClass += "bg-white border-slate-200 text-slate-400";
                                      } else {
                                          btnClass += "bg-white hover:bg-indigo-50 border-slate-200 text-slate-700";
                                      }
                                      return (
                                          <button key={i} onClick={() => handleQuizOption(opt)} className={btnClass} disabled={!!quizAnswered}>
                                              {opt} {quizAnswered && opt === HEART_CONTENT.quiz[quizIndex].ans && <CheckCircle size={16} className="float-right text-green-600"/>}
                                          </button>
                                      )
                                 })}
                             </div>
                         </div>
                         {quizAnswered && (
                             <button onClick={nextQuestion} className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold">
                                 {quizIndex < HEART_CONTENT.quiz.length - 1 ? (language === Language.ENGLISH ? "Next Question" : "अगला प्रश्न") : "Restart Quiz"}
                             </button>
                         )}
                     </div>
                 )}
             </div>
         </div>
      </div>
    </div>
  );
};
export default Heart;