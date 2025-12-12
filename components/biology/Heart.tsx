import React, { useState, useEffect } from 'react';
import { Activity, Heart as HeartIcon, Play, Pause, RotateCcw, ZoomIn, ZoomOut, Droplets, BookOpen, AlertCircle, HelpCircle, CheckCircle, XCircle, Eye, MessageCircle, ChevronRight, ChevronLeft, Lightbulb, Zap, GitCommit } from 'lucide-react';
import { Language } from '../../types';

interface HeartProps {
  language: Language;
}

// --- EDUCATIONAL DATA (BASED ON CLASS NOTES) ---
const HEART_CONTENT: Record<string, any> = {
    structure: {
        title: { en: "Structure", hi: "संरचना" },
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
    impulse: {
        title: { en: "Conduction System", hi: "हृदय स्पंदन (Impulse)" },
        steps: [
            { id: 1, title: "SA Node (Sino Auricular)", desc: { en: "Natural Pacemaker. Generates Na+ Impulse.", hi: "प्राकृतिक पेसमेकर। Na+ आवेग उत्पन्न करता है।" } },
            { id: 2, title: "AV Node (Auriculo Ventricular)", desc: { en: "Receives signal from SA Node.", hi: "SA नोड से सिग्नल प्राप्त करता है।" } },
            { id: 3, title: "Bundle of His", desc: { en: "Transmits impulse to ventricles.", hi: "निलय (Ventricles) तक आवेग पहुँचाता है।" } },
            { id: 4, title: "Purkinje Fibers", desc: { en: "Spreads signal to ventricular walls causing contraction.", hi: "निलय की दीवारों में सिग्नल फैलाता है जिससे संकुचन होता है।" } }
        ],
        artificial: {
            title: { en: "Artificial Pacemaker", hi: "कृत्रिम पेसमेकर" },
            desc: { en: "Uses Lithium Battery (Light metal). Max wt 20g.", hi: "लिथियम बैटरी (हल्की धातु) का उपयोग करता है। अधिकतम वजन 20 ग्राम।" }
        }
    },
    cycle: {
        title: { en: "Blood Flow Path", hi: "रक्त प्रवाह का मार्ग" },
        flowChart: [
            "Organs (अंग)", "SVC/IVC", "Right Atrium (R.A)", "Tricuspid Valve", 
            "Right Ventricle (R.V)", "Pulmonary Valve", "Pulmonary Artery", "LUNGS (फेफड़े)",
            "Pulmonary Vein", "Left Atrium (L.A)", "Bicuspid (Mitral) Valve", 
            "Left Ventricle (L.V)", "Aorta Valve", "Aorta", "Organs (अंग)"
        ]
    },
    quiz: [
        { q: { en: "Who discovered the Blood Circulatory System?", hi: "रक्त परिसंचरण तंत्र की खोज किसने की?" }, options: ["Newton", "Einstein", "William Harvey", "Robert Hooke"], ans: "William Harvey" },
        { q: { en: "What is the weight of heart in adult men?", hi: "वयस्क पुरुषों में हृदय का वजन कितना होता है?" }, options: ["200-250g", "280-340g", "150-200g", "400-500g"], ans: "280-340g" },
        { q: { en: "Which valve is between Right Atrium and Right Ventricle?", hi: "दाएं आलिंद और दाएं निलय के बीच कौन सा वाल्व होता है?" }, options: ["Bicuspid", "Tricuspid", "Aortic", "Pulmonary"], ans: "Tricuspid" },
        { q: { en: "Where is the Natural Pacemaker (SA Node) located?", hi: "प्राकृतिक पेसमेकर (SA Node) कहाँ स्थित होता है?" }, options: ["Right Atrium", "Left Atrium", "Right Ventricle", "Left Ventricle"], ans: "Right Atrium" },
    ]
};

// --- GUIDED TOUR STEPS ---
const TOUR_STEPS = [
    {
        partId: 'vc',
        title: { en: "1. The Entry: Vena Cava", hi: "1. प्रवेश: महाशिरा (Vena Cava)" },
        desc: { 
            en: "Blood enters from Organs via SVC (Upper body) & IVC (Lower body). It carries CO2 rich blood.",
            hi: "रक्त अंगों से SVC (ऊपरी शरीर) और IVC (निचले शरीर) के माध्यम से प्रवेश करता है। यह CO2 युक्त अशुद्ध रक्त होता है।"
        }
    },
    {
        partId: 'ra',
        title: { en: "2. Right Atrium (R.A)", hi: "2. दायां आलिंद (R.A)" },
        desc: { 
            en: "Collects blood. Contains SA Node (Pacemaker) which generates the impulse.",
            hi: "रक्त इकट्ठा करता है। इसमें SA Node (पेसमेकर) होता है जो धड़कन (Impulse) बनाता है।"
        }
    },
    {
        partId: 'rv',
        title: { en: "3. Right Ventricle (R.V)", hi: "3. दायां निलय (R.V)" },
        desc: { 
            en: "Blood passes through Tricuspid Valve into R.V. It pumps blood to lungs.",
            hi: "रक्त ट्राइकस्पिड वाल्व से R.V में जाता है। यह रक्त को फेफड़ों में पंप करता है।"
        }
    },
    {
        partId: 'pa',
        title: { en: "4. Pulmonary Artery", hi: "4. फुफ्फुसीय धमनी (P.A)" },
        desc: { 
            en: "Carries IMPURE blood to Lungs. In lungs, CO2 is removed and O2 is added.",
            hi: "अशुद्ध रक्त को फेफड़ों तक ले जाती है। फेफड़ों (Alveoli) में CO2 निकलती है और O2 मिलती है।"
        }
    },
    {
        partId: 'pv',
        title: { en: "5. Pulmonary Vein", hi: "5. फुफ्फुसीय शिरा (P.V)" },
        desc: { 
            en: "Carries PURE (Red) blood from Lungs back to the heart.",
            hi: "फेफड़ों से शुद्ध (लाल) रक्त वापस हृदय में लाती है।"
        }
    },
    {
        partId: 'la',
        title: { en: "6. Left Atrium (L.A)", hi: "6. बायां आलिंद (L.A)" },
        desc: { 
            en: "Receives oxygenated blood. Pushes it through Bicuspid (Mitral) Valve.",
            hi: "ऑक्सीजन युक्त रक्त प्राप्त करता है। इसे द्विकपाटी (Bicuspid) वाल्व के माध्यम से आगे धकेलता है।"
        }
    },
    {
        partId: 'lv',
        title: { en: "7. Left Ventricle (L.V)", hi: "7. बायां निलय (L.V)" },
        desc: { 
            en: "Thickest chamber. Pumps blood with high pressure to the whole body.",
            hi: "सबसे मोटा कक्ष। पूरे शरीर में उच्च दबाव के साथ रक्त पंप करता है।"
        }
    },
    {
        partId: 'aorta',
        title: { en: "8. Aorta", hi: "8. महाधमनी (Aorta)" },
        desc: { 
            en: "Distributes pure blood to all body organs. Cycle repeats 72 times/min.",
            hi: "सभी अंगों को शुद्ध रक्त वितरित करती है। यह चक्र 72 बार/मिनट दोहराया जाता है।"
        }
    }
];

const Heart: React.FC<HeartProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<0.5 | 1 | 2>(1);
  const [activeTab, setActiveTab] = useState<'structure' | 'facts' | 'impulse' | 'cycle' | 'quiz'>('structure');
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);
  const [showLabels, setShowLabels] = useState(true);
  const [flowMode, setFlowMode] = useState(true);
  const [viewMode, setViewMode] = useState<'realistic' | 'diagram'>('realistic');
  
  // Guided Tour State
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  // Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);

  // Effect to handle Tour Step changes
  useEffect(() => {
    if (tourActive) {
        const step = TOUR_STEPS[tourStep];
        setSelectedPart(step.partId);
        setFlowMode(true);
        if (!isPlaying) setIsPlaying(true);
    }
  }, [tourActive, tourStep]);

  const handleTourNext = () => {
    if (tourStep < TOUR_STEPS.length - 1) {
        setTourStep(prev => prev + 1);
    } else {
        setTourActive(false);
        setTourStep(0);
        setSelectedPart(null);
        setIsPlaying(false);
    }
  };

  const handleTourPrev = () => {
    if (tourStep > 0) {
        setTourStep(prev => prev - 1);
    }
  };

  const startTour = () => {
      setTourActive(true);
      setTourStep(0);
      setActiveTab('structure');
      setIsPlaying(true);
  };

  const handlePartClick = (part: string) => {
    if (tourActive) return;

    if (activeTab === 'quiz') {
       if (quizAnswered) return;
       // Simple check for quiz answer mapping (if needed) or just text check
       const currentQ = HEART_CONTENT.quiz[quizIndex];
       const isCorrect = currentQ.ans.toLowerCase().includes(part.replace('vc','').replace('pa','').toLowerCase()); // simplified logic
       // For this quiz, we use text options, so visual click is just for exploration unless mapped perfectly.
       // Here we keep structure click separate from quiz text options.
       return;
    } else {
        setSelectedPart(part);
        setActiveTab('structure');
    }
  };

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
      {/* --- TOP CONTROL BAR --- */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-wrap gap-4 justify-between items-center">
         <div className="flex items-center gap-2">
             <div className={`p-2 rounded-full ${isPlaying ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
                 <Activity size={20} />
             </div>
             <div>
                <h2 className="font-bold text-slate-800 leading-none">{language === Language.ENGLISH ? "3D Human Heart" : "मानव हृदय 3D"}</h2>
                <span className="text-[10px] text-slate-500 font-medium">Class Notes Special</span>
             </div>
         </div>

         {/* View Toggle */}
         <div className="flex bg-slate-100 rounded-lg p-1">
             <button 
                onClick={() => setViewMode('realistic')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'realistic' ? 'bg-white shadow text-rose-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <HeartIcon size={14} fill={viewMode === 'realistic' ? "currentColor" : "none"} /> 
                {language === Language.ENGLISH ? "Realistic" : "असली जैसा"}
             </button>
             <button 
                onClick={() => setViewMode('diagram')}
                className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'diagram' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
             >
                <Activity size={14} /> 
                {language === Language.ENGLISH ? "Diagram" : "आरेख"}
             </button>
         </div>

         {/* Auto Explain Button */}
         <button 
            onClick={startTour}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold transition-all ${tourActive ? 'bg-indigo-600 text-white border-indigo-600 shadow-md ring-2 ring-indigo-200' : 'bg-white text-indigo-600 border-indigo-200 hover:bg-indigo-50'}`}
         >
             <MessageCircle size={14} />
             {language === Language.ENGLISH ? "Auto Explain" : "ऑटो एक्सप्लेन"}
         </button>

         <div className="flex items-center gap-2">
             <button onClick={() => setIsPlaying(!isPlaying)} className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-bold transition-all ${isPlaying ? 'bg-rose-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                 {isPlaying ? <Pause size={16}/> : <Play size={16}/>}
                 {isPlaying ? (language === Language.ENGLISH ? "PAUSE" : "रोकें") : (language === Language.ENGLISH ? "BEAT" : "शुरू")}
             </button>
             
             <button onClick={() => { setIsPlaying(false); setZoom(1); setSelectedPart(null); setTourActive(false); }} className="p-2 text-slate-500 hover:bg-slate-100 rounded-full" title="Reset">
                 <RotateCcw size={18} />
             </button>
         </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-auto lg:flex-1 lg:min-h-0">
         
         {/* --- LEFT: VISUALIZATION --- */}
         <div className="w-full lg:flex-1 bg-gradient-to-b from-slate-50 to-blue-50/50 rounded-xl shadow-inner border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center min-h-[400px]">
             
             {/* View Controls Overlay */}
             <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
                 <button onClick={() => setFlowMode(!flowMode)} className={`p-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-colors ${flowMode ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'}`}>
                     <Droplets size={14} /> {language === Language.ENGLISH ? "Blood Flow" : "रक्त प्रवाह"}
                 </button>
                 <button onClick={() => setShowLabels(!showLabels)} className={`p-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-sm transition-colors ${showLabels ? 'bg-indigo-600 text-white' : 'bg-white text-slate-600'}`}>
                     <HelpCircle size={14} /> {language === Language.ENGLISH ? "Labels" : "नाम"}
                 </button>
             </div>

             {/* Zoom Controls Overlay */}
             <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 bg-white p-1 rounded-lg shadow border border-slate-100">
                 <button onClick={() => setZoom(Math.max(0.6, zoom - 0.2))} className="p-1 hover:bg-slate-100 rounded"><ZoomOut size={16}/></button>
                 <span className="text-xs w-8 text-center">{Math.round(zoom * 100)}%</span>
                 <button onClick={() => setZoom(Math.min(2, zoom + 0.2))} className="p-1 hover:bg-slate-100 rounded"><ZoomIn size={16}/></button>
             </div>

             {/* --- THE SVG HEART MODEL --- */}
             <div 
                className="transition-transform duration-300 ease-out origin-center"
                style={{ transform: `scale(${zoom})` }}
             >
                <svg width="400" height="500" viewBox="0 0 400 500" className="overflow-visible drop-shadow-2xl">
                    <defs>
                        <radialGradient id="gradRed" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#fca5a5" />
                            <stop offset="100%" stopColor="#b91c1c" />
                        </radialGradient>
                        <radialGradient id="gradBlue" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#93c5fd" />
                            <stop offset="100%" stopColor="#1e3a8a" />
                        </radialGradient>
                         {/* Realistic Textures */}
                        <radialGradient id="realRed" cx="40%" cy="30%" r="80%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="60%" stopColor="#b91c1c" />
                            <stop offset="100%" stopColor="#7f1d1d" />
                        </radialGradient>
                        <radialGradient id="realBlue" cx="40%" cy="30%" r="80%">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="60%" stopColor="#2563eb" />
                            <stop offset="100%" stopColor="#1e3a8a" />
                        </radialGradient>
                    </defs>

                    {/* --- CSS ANIMATIONS --- */}
                    <style>{`
                        .heart-beat { animation: beat ${0.8/speed}s infinite ease-in-out; transform-origin: center; }
                        .valve-move { animation: valve ${0.8/speed}s infinite ease-in-out; }
                        @keyframes beat {
                            0% { transform: scale(1); }
                            15% { transform: scale(1.03); } 
                            30% { transform: scale(1); }
                            45% { transform: scale(1.01); }
                            100% { transform: scale(1); }
                        }
                        @keyframes valve {
                            0% { stroke-width: 4px; }
                            20% { stroke-width: 1px; } 
                            100% { stroke-width: 4px; }
                        }
                    `}</style>

                    <g className={isPlaying ? "heart-beat" : ""}>
                        
                        {viewMode === 'diagram' ? (
                            // === DIAGRAM / SCHEMATIC VIEW ===
                            <>
                                {/* Vena Cava */}
                                <path d="M80,50 L80,180 L130,180 L130,50 Z" fill={getPartColor('vc', 'url(#gradBlue)')} stroke="#1e3a8a" strokeWidth="2" onClick={() => handlePartClick('vc')} className="cursor-pointer hover:brightness-110"/>
                                <path d="M80,350 L80,450 L130,450 L130,350 Z" fill={getPartColor('vc', 'url(#gradBlue)')} stroke="#1e3a8a" strokeWidth="2" onClick={() => handlePartClick('vc')} className="cursor-pointer hover:brightness-110"/>
                                {/* PA */}
                                <path d="M180,150 L150,80 L50,60 L50,110 L150,130 L180,180" fill={getPartColor('pa', '#60a5fa')} stroke="#1e3a8a" strokeWidth="2" onClick={() => handlePartClick('pa')} className="cursor-pointer hover:brightness-110"/>
                                <path d="M220,150 L250,80 L350,80 L350,130 L250,130 L220,180" fill={getPartColor('pa', '#60a5fa')} stroke="#1e3a8a" strokeWidth="2" onClick={() => handlePartClick('pa')} className="cursor-pointer hover:brightness-110"/>
                                {/* Aorta */}
                                <path d="M200,160 C200,40 320,40 320,160 L280,160 C280,100 240,100 240,160 Z" fill={getPartColor('aorta', 'url(#gradRed)')} stroke="#7f1d1d" strokeWidth="2" onClick={() => handlePartClick('aorta')} className="cursor-pointer hover:brightness-110"/>
                                {/* PV */}
                                <path d="M360,180 L400,180 L400,230 L360,230 Z" fill={getPartColor('pv', '#fca5a5')} stroke="#7f1d1d" strokeWidth="2" onClick={() => handlePartClick('pv')} className="cursor-pointer hover:brightness-110"/>
                                <path d="M30,180 L0,180 L0,230 L30,230 Z" fill={getPartColor('pv', '#fca5a5')} stroke="#7f1d1d" strokeWidth="2" onClick={() => handlePartClick('pv')} className="cursor-pointer hover:brightness-110"/>
                                {/* Chambers */}
                                <path d="M130,180 Q200,180 200,240 Q130,240 130,180 Z" fill={getPartColor('ra', '#bfdbfe')} stroke="#1e3a8a" strokeWidth="3" onClick={() => handlePartClick('ra')} className="cursor-pointer hover:brightness-110"/>
                                <path d="M140,260 Q200,260 200,380 Q160,420 140,260 Z" fill={getPartColor('rv', '#93c5fd')} stroke="#1e3a8a" strokeWidth="3" onClick={() => handlePartClick('rv')} className="cursor-pointer hover:brightness-110"/>
                                <path d="M260,180 Q330,180 330,240 Q260,240 260,180 Z" fill={getPartColor('la', '#fecaca')} stroke="#7f1d1d" strokeWidth="3" onClick={() => handlePartClick('la')} className="cursor-pointer hover:brightness-110"/>
                                <path d="M260,260 Q320,260 320,380 Q280,450 260,260 Z" fill={getPartColor('lv', '#f87171')} stroke="#7f1d1d" strokeWidth="8" onClick={() => handlePartClick('lv')} className="cursor-pointer hover:brightness-110"/>
                                
                                {/* Valves */}
                                <line x1="160" y1="250" x2="190" y2="250" stroke="black" strokeWidth="4" strokeDasharray="4 2" className={isPlaying ? "valve-move" : ""} />
                                <line x1="280" y1="250" x2="310" y2="250" stroke="black" strokeWidth="4" strokeDasharray="4 2" className={isPlaying ? "valve-move" : ""} />

                                {/* Diagram Particles */}
                                {flowMode && isPlaying && (
                                    <g className="pointer-events-none opacity-80">
                                        <circle r="4" fill="#0000ff"><animateMotion dur={`${2/speed}s`} repeatCount="indefinite" path="M105,50 L105,180 L160,210 L170,300 L170,250 L150,130 L50,110" /></circle>
                                        <circle r="4" fill="#ff0000"><animateMotion dur={`${2/speed}s`} repeatCount="indefinite" path="M380,205 L300,210 L290,300 L290,250 L260,160 L260,80" /></circle>
                                    </g>
                                )}
                            </>
                        ) : (
                            // === REALISTIC / ANATOMIC VIEW ===
                            <>
                                {/* Shadow/Outline */}
                                <path d="M140,120 C100,120 80,180 80,240 C80,340 180,450 220,480 C280,450 380,350 380,220 C380,140 320,100 280,120" fill="black" opacity="0.1" filter="blur(10px)"/>

                                {/* 1a. Superior Vena Cava (Top Left/Center) */}
                                <path 
                                    d="M130,20 L130,150 L160,150 L160,20 Z" 
                                    fill={getPartColor('vc', 'url(#realBlue)')} stroke="#1e3a8a" strokeWidth="1"
                                    onClick={() => handlePartClick('vc')} className="cursor-pointer hover:brightness-125"
                                />

                                {/* 1b. Inferior Vena Cava (Bottom Center) */}
                                <path 
                                    d="M130,480 L130,320 C130,290 160,290 170,320 L170,480 Z" 
                                    fill={getPartColor('vc', 'url(#realBlue)')} stroke="#1e3a8a" strokeWidth="1"
                                    onClick={() => handlePartClick('vc')} className="cursor-pointer hover:brightness-125"
                                />

                                {/* 2. Aorta (Main Arch - Behind PA) */}
                                <path 
                                    d="M220,200 C220,100 220,60 260,40 C320,20 340,60 340,100 L300,100 C300,80 280,60 260,80 C250,90 250,150 250,200 Z"
                                    fill={getPartColor('aorta', 'url(#realRed)')} stroke="#7f1d1d" strokeWidth="1"
                                    onClick={() => handlePartClick('aorta')} className="cursor-pointer hover:brightness-125"
                                />

                                {/* 3. Right Atrium (Ear-like flap on viewer's left) */}
                                <path 
                                    d="M120,140 C80,140 80,200 120,240 C140,240 150,220 150,200 C150,160 140,140 120,140"
                                    fill={getPartColor('ra', 'url(#realBlue)')} stroke="#1e3a8a" strokeWidth="1"
                                    onClick={() => handlePartClick('ra')} className="cursor-pointer hover:brightness-125"
                                />

                                {/* 4. Left Atrium (Ear-like flap on viewer's right - peeking behind) */}
                                <path 
                                    d="M300,140 C340,140 340,200 300,220 C280,220 280,180 300,140"
                                    fill={getPartColor('la', 'url(#realRed)')} stroke="#7f1d1d" strokeWidth="1"
                                    onClick={() => handlePartClick('la')} className="cursor-pointer hover:brightness-125"
                                />

                                {/* 5. Pulmonary Artery (Trunk crossing Aorta) */}
                                <path 
                                    d="M180,220 C180,180 140,120 100,100 L110,80 C160,100 200,140 220,220"
                                    fill={getPartColor('pa', '#3b82f6')} stroke="#1e3a8a" strokeWidth="1"
                                    onClick={() => handlePartClick('pa')} className="cursor-pointer hover:brightness-125"
                                />
                                 {/* PA Right Branch */}
                                <path 
                                    d="M220,220 C240,180 280,160 350,160 L350,185 C280,185 250,200 240,220"
                                    fill={getPartColor('pa', '#3b82f6')} stroke="#1e3a8a" strokeWidth="1"
                                    onClick={() => handlePartClick('pa')} className="cursor-pointer hover:brightness-125"
                                />

                                {/* 6. Right Ventricle (Lower Center/Left) */}
                                <path 
                                    d="M140,240 C120,280 160,400 220,460 C230,420 240,300 220,220 C180,220 160,220 140,240"
                                    fill={getPartColor('rv', 'url(#realBlue)')} stroke="#1e3a8a" strokeWidth="1"
                                    onClick={() => handlePartClick('rv')} className="cursor-pointer hover:brightness-125"
                                />

                                {/* 7. Left Ventricle (Lower Right/Apex - Large) */}
                                <path 
                                    d="M220,220 C260,220 340,260 340,320 C340,400 280,450 220,480 C230,450 240,350 220,220"
                                    fill={getPartColor('lv', 'url(#realRed)')} stroke="#7f1d1d" strokeWidth="1"
                                    onClick={() => handlePartClick('lv')} className="cursor-pointer hover:brightness-125"
                                />
                                
                                {/* Realistic Particles with Anatomical Flow Logic */}
                                {flowMode && isPlaying && (
                                    <g className="pointer-events-none opacity-80">
                                        {/* Blue Flow 1: SVC -> RA -> RV -> Pulmonary Artery (Left Lungs) */}
                                        <circle r="3" fill="#bfdbfe">
                                            <animateMotion 
                                                dur={`${3.5/speed}s`} 
                                                repeatCount="indefinite" 
                                                path="M145,20 L145,150 Q145,180 130,190 T160,260 Q180,350 200,360 T210,230 L100,90"
                                                keyPoints="0;0.2;0.4;0.6;1"
                                                keyTimes="0;0.3;0.6;0.8;1"
                                                calcMode="linear"
                                            />
                                        </circle>
                                        <circle r="3" fill="#bfdbfe">
                                            <animateMotion 
                                                dur={`${3.5/speed}s`} 
                                                begin="1s"
                                                repeatCount="indefinite" 
                                                path="M145,20 L145,150 Q145,180 130,190 T160,260 Q180,350 200,360 T210,230 L100,90"
                                                keyPoints="0;0.2;0.4;0.6;1"
                                                keyTimes="0;0.3;0.6;0.8;1"
                                                calcMode="linear"
                                            />
                                        </circle>

                                        {/* Blue Flow 2: IVC -> RA -> RV -> Pulmonary Artery (Right Lungs) */}
                                        <circle r="3" fill="#bfdbfe">
                                            <animateMotion 
                                                dur={`${3.5/speed}s`} 
                                                begin="0.5s"
                                                repeatCount="indefinite" 
                                                path="M150,480 L150,300 Q150,250 130,190 T160,260 Q180,350 200,360 T210,230 L320,160"
                                                keyPoints="0;0.2;0.4;0.6;1"
                                                keyTimes="0;0.3;0.6;0.8;1"
                                                calcMode="linear"
                                            />
                                        </circle>

                                        {/* Red Flow: Pulmonary Veins (Lungs) -> LA -> LV -> Aorta (Body) */}
                                        <circle r="3" fill="#fecaca">
                                            <animateMotion 
                                                dur={`${3.5/speed}s`} 
                                                repeatCount="indefinite" 
                                                path="M400,170 Q350,170 310,190 T290,260 Q290,380 260,380 T240,220 Q240,120 280,40"
                                                keyPoints="0;0.2;0.4;0.6;1"
                                                keyTimes="0;0.3;0.6;0.8;1"
                                                calcMode="linear"
                                            />
                                        </circle>
                                        <circle r="3" fill="#fecaca">
                                            <animateMotion 
                                                dur={`${3.5/speed}s`} 
                                                begin="1.2s"
                                                repeatCount="indefinite" 
                                                path="M400,170 Q350,170 310,190 T290,260 Q290,380 260,380 T240,220 Q240,120 280,40"
                                                keyPoints="0;0.2;0.4;0.6;1"
                                                keyTimes="0;0.3;0.6;0.8;1"
                                                calcMode="linear"
                                            />
                                        </circle>
                                    </g>
                                )}
                            </>
                        )}
                        
                        {/* SHARED LABELS */}
                        {showLabels && activeTab !== 'quiz' && (
                            <g className="pointer-events-none text-xs font-bold font-sans drop-shadow-md" fill="white" style={{ textShadow: '0px 1px 2px black' }}>
                                {viewMode === 'diagram' ? (
                                    <>
                                        <text x="90" y="210">R.A</text>
                                        <text x="160" y="320">R.V</text>
                                        <text x="290" y="210">L.A</text>
                                        <text x="290" y="340">L.V</text>
                                    </>
                                ) : (
                                    <>
                                        <text x="110" y="190">R.A</text>
                                        <text x="170" y="350">R.V</text>
                                        <text x="310" y="180">L.A</text>
                                        <text x="280" y="320">L.V</text>
                                        <text x="260" y="70">Aorta</text>
                                        <text x="135" y="470">IVC</text>
                                    </>
                                )}
                            </g>
                        )}
                    </g>
                </svg>
             </div>
         </div>

         {/* --- RIGHT: INFO SIDEBAR (TABS OR TOUR) --- */}
         <div className="w-full lg:w-96 flex flex-col h-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
             
             {tourActive ? (
                // --- GUIDED TOUR INTERFACE ---
                <div className="flex flex-col h-full animate-fade-in bg-indigo-50/50">
                    <div className="bg-indigo-600 p-4 text-white flex justify-between items-center shadow-md">
                        <div className="flex items-center gap-2">
                             <MessageCircle size={20} className="animate-bounce" />
                             <div>
                                 <h3 className="font-bold text-lg leading-none">{language === Language.ENGLISH ? "Guided Tour" : "गाइडेड टूर"}</h3>
                                 <span className="text-[10px] opacity-80 font-medium tracking-wider uppercase">Step {tourStep + 1} of {TOUR_STEPS.length}</span>
                             </div>
                        </div>
                        <button onClick={() => { setTourActive(false); setSelectedPart(null); }} className="bg-indigo-700 hover:bg-indigo-800 p-1.5 rounded-full text-xs">
                             <XCircle size={20} />
                        </button>
                    </div>

                    <div className="p-5 flex-1 overflow-y-auto">
                        <h2 className="text-xl font-bold text-indigo-900 mb-3">{language === Language.ENGLISH ? TOUR_STEPS[tourStep].title.en : TOUR_STEPS[tourStep].title.hi}</h2>
                        
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-indigo-100 mb-4">
                            <p className="text-slate-700 leading-relaxed text-sm md:text-base">
                                {language === Language.ENGLISH ? TOUR_STEPS[tourStep].desc.en : TOUR_STEPS[tourStep].desc.hi}
                            </p>
                        </div>
                    </div>

                    <div className="p-4 border-t border-indigo-100 bg-white flex justify-between gap-4">
                        <button 
                            onClick={handleTourPrev} 
                            disabled={tourStep === 0}
                            className={`flex-1 py-3 rounded-lg font-bold flex items-center justify-center gap-2 ${tourStep === 0 ? 'bg-slate-100 text-slate-400' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                        >
                            <ChevronLeft size={16} /> {language === Language.ENGLISH ? "Back" : "पीछे"}
                        </button>
                        <button 
                            onClick={handleTourNext} 
                            className="flex-[2] py-3 rounded-lg font-bold flex items-center justify-center gap-2 bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg transition-all"
                        >
                            {tourStep === TOUR_STEPS.length - 1 ? (language === Language.ENGLISH ? "Finish Tour" : "समाप्त") : (language === Language.ENGLISH ? "Next Step" : "अगला स्टेप")} <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
             ) : (
                // --- STANDARD TABS INTERFACE ---
                <>
                    {/* Tabs Header */}
                    <div className="flex bg-slate-50 border-b border-slate-200 overflow-x-auto">
                        {['structure', 'facts', 'impulse', 'cycle', 'quiz'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 flex-shrink-0 ${activeTab === tab ? 'border-rose-500 text-rose-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                            >
                                {tab === 'structure' && (language === Language.ENGLISH ? "Anatomy" : "रचना")}
                                {tab === 'facts' && (language === Language.ENGLISH ? "Facts" : "तथ्य")}
                                {tab === 'impulse' && (language === Language.ENGLISH ? "Impulse" : "धड़कन")}
                                {tab === 'cycle' && (language === Language.ENGLISH ? "Flow" : "प्रवाह")}
                                {tab === 'quiz' && (language === Language.ENGLISH ? "Quiz" : "क्विज़")}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="p-5 overflow-y-auto flex-1 custom-scrollbar">
                        
                        {activeTab === 'structure' && (
                            <div className="space-y-4 animate-fade-in">
                                {selectedPart ? (
                                    <>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-rose-100 text-rose-600 rounded-lg"><HeartIcon size={20}/></div>
                                            <h3 className="text-xl font-bold text-slate-800">
                                                {language === Language.ENGLISH ? HEART_CONTENT.structure.parts[selectedPart].name.en : HEART_CONTENT.structure.parts[selectedPart].name.hi}
                                            </h3>
                                        </div>
                                        <p className="text-slate-600 leading-relaxed">
                                            {language === Language.ENGLISH ? HEART_CONTENT.structure.parts[selectedPart].desc.en : HEART_CONTENT.structure.parts[selectedPart].desc.hi}
                                        </p>
                                        <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
                                            <h4 className="text-xs font-bold text-amber-700 uppercase mb-1 flex items-center gap-1"><AlertCircle size={12}/> Fact</h4>
                                            <p className="text-sm italic text-slate-800">
                                                {language === Language.ENGLISH ? HEART_CONTENT.structure.parts[selectedPart].fact.en : HEART_CONTENT.structure.parts[selectedPart].fact.hi}
                                            </p>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center text-slate-400 py-10">
                                        <HeartIcon size={48} className="mx-auto mb-3 opacity-20"/>
                                        <p>{language === Language.ENGLISH ? "Tap on any heart part to see details." : "विवरण देखने के लिए हृदय के किसी भी भाग पर टैप करें।"}</p>
                                        <button onClick={startTour} className="mt-4 text-indigo-600 font-bold text-sm hover:underline">{language === Language.ENGLISH ? "Or start Auto Explain" : "या ऑटो एक्सप्लेन शुरू करें"}</button>
                                    </div>
                                )}
                            </div>
                        )}

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

                                {/* Location */}
                                <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                                    <div className="text-xs font-bold text-blue-500 uppercase">{language === Language.ENGLISH ? HEART_CONTENT.facts.location.label.en : HEART_CONTENT.facts.location.label.hi}</div>
                                    <div className="text-sm font-bold text-slate-800">{language === Language.ENGLISH ? HEART_CONTENT.facts.location.val.en : HEART_CONTENT.facts.location.val.hi}</div>
                                </div>

                                {/* Layers */}
                                <div>
                                    <h4 className="text-sm font-bold text-slate-800 mb-2 border-b pb-1">{language === Language.ENGLISH ? HEART_CONTENT.facts.layers.title.en : HEART_CONTENT.facts.layers.title.hi}</h4>
                                    <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
                                        {HEART_CONTENT.facts.layers.items.map((l: any, i: number) => (
                                            <li key={i}>{language === Language.ENGLISH ? l.en : l.hi}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {activeTab === 'impulse' && (
                            <div className="space-y-4 animate-fade-in">
                                <h3 className="font-bold text-slate-800 border-b pb-2">{language === Language.ENGLISH ? HEART_CONTENT.impulse.title.en : HEART_CONTENT.impulse.title.hi}</h3>
                                
                                {/* Path Steps */}
                                <div className="relative border-l-2 border-indigo-200 ml-3 space-y-6">
                                    {HEART_CONTENT.impulse.steps.map((step: any, idx: number) => (
                                        <div key={idx} className="relative pl-6">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-500 border-2 border-white"></div>
                                            <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                                                <h4 className="font-bold text-indigo-900 text-sm">{step.title}</h4>
                                                <p className="text-xs text-indigo-700 mt-1">{language === Language.ENGLISH ? step.desc.en : step.desc.hi}</p>
                                            </div>
                                            {idx < 3 && <div className="absolute left-[24px] -bottom-4 text-indigo-300 text-xs">⬇</div>}
                                        </div>
                                    ))}
                                </div>

                                {/* Artificial Pacemaker */}
                                <div className="bg-slate-800 text-white p-4 rounded-xl mt-4">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Zap size={16} className="text-yellow-400" />
                                        <span className="font-bold text-sm">{language === Language.ENGLISH ? HEART_CONTENT.impulse.artificial.title.en : HEART_CONTENT.impulse.artificial.title.hi}</span>
                                    </div>
                                    <p className="text-xs text-slate-300">{language === Language.ENGLISH ? HEART_CONTENT.impulse.artificial.desc.en : HEART_CONTENT.impulse.artificial.desc.hi}</p>
                                </div>
                            </div>
                        )}

                        {activeTab === 'cycle' && (
                            <div className="space-y-4 animate-fade-in">
                                <h3 className="font-bold text-slate-800 border-b pb-2">{language === Language.ENGLISH ? HEART_CONTENT.cycle.title.en : HEART_CONTENT.cycle.title.hi}</h3>
                                <div className="flex flex-col gap-2">
                                    {HEART_CONTENT.cycle.flowChart.map((step: string, idx: number) => (
                                        <div key={idx} className="flex flex-col items-center">
                                            <div className={`w-full p-2 text-center text-sm font-bold rounded border ${
                                                idx === 0 || idx === 14 ? 'bg-amber-100 border-amber-300 text-amber-900' :
                                                step.includes("LUNGS") ? 'bg-sky-100 border-sky-300 text-sky-900' :
                                                'bg-white border-slate-200 text-slate-700'
                                            }`}>
                                                {step}
                                            </div>
                                            {idx < HEART_CONTENT.cycle.flowChart.length - 1 && (
                                                <div className="text-slate-400 my-0.5">↓</div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'quiz' && (
                            <div className="flex flex-col h-full animate-fade-in">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-xs font-bold text-slate-400 uppercase">Question {quizIndex + 1}/{HEART_CONTENT.quiz.length}</span>
                                    <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Score: {quizScore}</span>
                                </div>
                                
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 mb-6 flex-1">
                                    <h4 className="font-bold text-lg text-slate-800 mb-4">
                                        {language === Language.ENGLISH ? HEART_CONTENT.quiz[quizIndex].q.en : HEART_CONTENT.quiz[quizIndex].q.hi}
                                    </h4>
                                    <div className="space-y-2">
                                        {HEART_CONTENT.quiz[quizIndex].options.map((opt: string, i: number) => {
                                             let btnClass = "w-full text-left p-3 rounded-lg text-sm font-medium border transition-all ";
                                             if (quizAnswered) {
                                                 if (opt === HEART_CONTENT.quiz[quizIndex].ans) btnClass += "bg-green-100 border-green-300 text-green-800";
                                                 else if (opt === quizAnswered) btnClass += "bg-red-50 border-red-200 text-red-700";
                                                 else btnClass += "bg-slate-50 border-slate-100 text-slate-400";
                                             } else {
                                                 btnClass += "bg-white hover:bg-indigo-50 border-slate-200 text-slate-700";
                                             }
                                             return (
                                                 <button key={i} onClick={() => handleQuizOption(opt)} className={btnClass} disabled={!!quizAnswered}>
                                                     {opt}
                                                     {quizAnswered && opt === HEART_CONTENT.quiz[quizIndex].ans && <CheckCircle size={16} className="float-right text-green-600"/>}
                                                 </button>
                                             )
                                        })}
                                    </div>
                                </div>

                                {quizAnswered && (
                                    <button onClick={nextQuestion} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors">
                                        {quizIndex < HEART_CONTENT.quiz.length - 1 ? (language === Language.ENGLISH ? "Next Question" : "अगला प्रश्न") : (language === Language.ENGLISH ? "Restart Quiz" : "फिर से शुरू करें")}
                                    </button>
                                )}
                            </div>
                        )}

                    </div>
                </>
             )}
         </div>
      </div>
    </div>
  );
};
export default Heart;