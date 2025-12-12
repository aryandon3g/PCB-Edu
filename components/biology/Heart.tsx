import React, { useState, useEffect } from 'react';
import { Activity, Heart as HeartIcon, Play, Pause, RotateCcw, ZoomIn, ZoomOut, Droplets, BookOpen, AlertCircle, HelpCircle, CheckCircle, XCircle, Eye, MessageCircle, ChevronRight, ChevronLeft, Lightbulb } from 'lucide-react';
import { Language } from '../../types';

interface HeartProps {
  language: Language;
}

// --- EDUCATIONAL DATA (SSC / RAILWAY FOCUSED) ---
const HEART_CONTENT: Record<string, any> = {
    structure: {
        title: { en: "Structure", hi: "संरचना" },
        parts: {
            ra: { 
                name: { en: "Right Atrium", hi: "दायां आलिंद" }, 
                desc: { en: "Receives deoxygenated blood from the body via Vena Cava.", hi: "महाशिरा के माध्यम से शरीर से अशुद्ध रक्त प्राप्त करता है।" },
                fact: { en: "Contains the SA Node (Natural Pacemaker).", hi: "इसमें SA Node (प्राकृतिक पेसमेकर) होता है।" }
            },
            rv: { 
                name: { en: "Right Ventricle", hi: "दायां निलय" }, 
                desc: { en: "Pumps deoxygenated blood to lungs via Pulmonary Artery.", hi: "फुफ्फुसीय धमनी के जरिए फेफड़ों में अशुद्ध रक्त पंप करता है।" },
                fact: { en: "Thinner walls than Left Ventricle.", hi: "बाएं निलय की तुलना में दीवारें पतली होती हैं।" }
            },
            la: { 
                name: { en: "Left Atrium", hi: "बायां आलिंद" }, 
                desc: { en: "Receives oxygenated blood from lungs via Pulmonary Veins.", hi: "फुफ्फुसीय शिराओं के जरिए फेफड़ों से शुद्ध रक्त प्राप्त करता है।" },
                fact: { en: "Oxygenated blood looks bright red.", hi: "शुद्ध रक्त चमकीला लाल दिखता है।" }
            },
            lv: { 
                name: { en: "Left Ventricle", hi: "बायां निलय" }, 
                desc: { en: "Pumps oxygenated blood to the whole body via Aorta.", hi: "महाधमनी के जरिए पूरे शरीर में शुद्ध रक्त पंप करता है।" },
                fact: { en: "SSC IMP: Has the THICKEST muscular wall.", hi: "SSC प्रश्न: इसकी दीवार सबसे मोटी होती है।" }
            },
            aorta: { 
                name: { en: "Aorta", hi: "महाधमनी" }, 
                desc: { en: "Main artery carrying blood to body.", hi: "शरीर तक रक्त ले जाने वाली मुख्य धमनी।" },
                fact: { en: "Largest artery in the human body.", hi: "मानव शरीर की सबसे बड़ी धमनी।" }
            },
            pa: { 
                name: { en: "Pulmonary Artery", hi: "फुफ्फुसीय धमनी" }, 
                desc: { en: "Carries blood to lungs for oxygenation.", hi: "ऑक्सीजन के लिए रक्त को फेफड़ों तक ले जाती है।" },
                fact: { en: "EXCEPTION: Only artery carrying IMPURE blood.", hi: "अपवाद: एकमात्र धमनी जो अशुद्ध रक्त ले जाती है।" }
            },
            pv: { 
                name: { en: "Pulmonary Vein", hi: "फुफ्फुसीय शिरा" }, 
                desc: { en: "Brings blood from lungs to heart.", hi: "फेफड़ों से रक्त को हृदय तक लाती है।" },
                fact: { en: "EXCEPTION: Only vein carrying PURE blood.", hi: "अपवाद: एकमात्र शिरा जो शुद्ध रक्त ले जाती है।" }
            },
            vc: { 
                name: { en: "Vena Cava", hi: "महाशिरा" }, 
                desc: { en: "Superior (top) & Inferior (bottom) veins bringing blood from body.", hi: "शरीर से रक्त लाने वाली ऊपरी (Superior) और निचली (Inferior) महाशिरा।" },
                fact: { en: "Carries CO₂ rich blood. Inferior Vena Cava is the largest vein.", hi: "CO₂ युक्त रक्त ले जाती है। इन्फीरियर वेना कावा सबसे बड़ी शिरा है।" }
            }
        }
    },
    facts: {
        title: { en: "SSC Facts", hi: "SSC तथ्य" },
        items: [
            { label: { en: "Weight", hi: "वजन" }, val: { en: "~300 grams", hi: "~300 ग्राम" } },
            { label: { en: "Location", hi: "स्थान" }, val: { en: "Mediastinum (Tilted Left)", hi: "छाती के बीच (बायीं ओर झुका)" } },
            { label: { en: "Covering", hi: "आवरण" }, val: { en: "Pericardium", hi: "पेरिकार्डियम (हृदयावरण)" } },
            { label: { en: "Pacemaker", hi: "पेसमेकर" }, val: { en: "SA Node (Right Atrium)", hi: "SA नोड (दायां आलिंद)" } },
            { label: { en: "Sound", hi: "ध्वनि" }, val: { en: "LUB-DUB (Valve closure)", hi: "लब-डब (वाल्व बंद होने से)" } },
            { label: { en: "Resting Rate", hi: "हृदय दर" }, val: { en: "72 beats/min", hi: "72 धड़कन/मिनट" } },
        ]
    },
    cycle: {
        title: { en: "Cardiac Cycle", hi: "हृदय चक्र" },
        steps: [
            { title: { en: "1. Diastole (Relaxation)", hi: "1. डायस्टोल (विश्राम)" }, text: { en: "Heart muscles relax. Blood flows into atria.", hi: "हृदय की मांसपेशियां शिथिल होती हैं। रक्त आलिंद में भरता है।" } },
            { title: { en: "2. Atrial Systole", hi: "2. एट्रियल सिस्टोल" }, text: { en: "Atria contract. Blood pushed to ventricles.", hi: "आलिंद सिकुड़ते हैं। रक्त निलय में धकेला जाता है।" } },
            { title: { en: "3. Ventricular Systole", hi: "3. वेंट्रिकुलर सिस्टोल" }, text: { en: "Ventricles contract. Blood pumped to lungs/body. 'LUB' sound.", hi: "निलय सिकुड़ते हैं। रक्त फेफड़ों/शरीर में पंप होता है। 'लब' की आवाज।" } }
        ]
    },
    bp: {
        title: { en: "Blood Pressure", hi: "रक्तचाप" },
        normal: "120/80 mmHg",
        sys: { en: "Systolic (120): Pumping Pressure", hi: "सिस्टोलिक (120): पंपिंग दबाव" },
        dia: { en: "Diastolic (80): Resting Pressure", hi: "डायस्टोलिक (80): विश्राम दबाव" },
        inst: { en: "Instrument: Sphygmomanometer", hi: "यंत्र: स्फिग्मोमैनोमीटर" }
    },
    quiz: [
        { q: { en: "Where is the natural pacemaker (SA Node) located?", hi: "प्राकृतिक पेसमेकर (SA Node) कहाँ स्थित होता है?" }, options: ["ra", "la", "rv", "lv"], ans: "ra" },
        { q: { en: "Which chamber has the thickest wall?", hi: "किस कक्ष की दीवार सबसे मोटी होती है?" }, options: ["ra", "la", "rv", "lv"], ans: "lv" },
        { q: { en: "Which vessel carries oxygenated blood to the body?", hi: "कौन सी वाहिका शरीर में शुद्ध रक्त ले जाती है?" }, options: ["pa", "pv", "aorta", "vc"], ans: "aorta" },
        { q: { en: "Which artery carries IMPURE blood?", hi: "कौन सी धमनी अशुद्ध रक्त ले जाती है?" }, options: ["aorta", "pa", "vc", "pv"], ans: "pa" },
    ]
};

// --- GUIDED TOUR STEPS (DEEP EXPLANATION) ---
const TOUR_STEPS = [
    {
        partId: 'vc',
        title: { en: "1. The Entry: Vena Cava", hi: "1. प्रवेश द्वार: महाशिरा (Vena Cava)" },
        desc: { 
            en: "The process begins here. The Vena Cava acts like a massive drain pipe. It collects 'dirty' (deoxygenated) blood rich in CO₂ from your entire body (Superior from head, Inferior from legs) and dumps it into the heart.",
            hi: "प्रक्रिया यहाँ से शुरू होती है। महाशिरा एक बड़े पाइप की तरह काम करती है। यह पूरे शरीर से 'गंदा' (CO₂ युक्त) रक्त इकट्ठा करती है और उसे हृदय में डालती है। ऊपर से Superior और नीचे से Inferior Vena Cava आती है।"
        },
        why: {
            en: "Why is it blue? Because the body's cells have already used up the oxygen and replaced it with waste Carbon Dioxide.",
            hi: "यह नीला क्यों है? क्योंकि शरीर की कोशिकाओं ने ऑक्सीजन का उपयोग कर लिया है और बदले में कार्बन डाइऑक्साइड (CO₂) भर दी है।"
        }
    },
    {
        partId: 'ra',
        title: { en: "2. The Waiting Room: Right Atrium", hi: "2. वेटिंग रूम: दायां आलिंद (Right Atrium)" },
        desc: { 
            en: "This chamber receives the blood from the Vena Cava. Think of it as a 'Waiting Room'. It holds the blood briefly before the door (Tricuspid Valve) opens.",
            hi: "यह कक्ष महाशिरा से रक्त प्राप्त करता है। इसे एक 'वेटिंग रूम' समझें। यह रक्त को थोड़ी देर के लिए रोकता है जब तक कि दरवाजा (Tricuspid Valve) नहीं खुलता।"
        },
        why: {
            en: "Special Feature: This wall contains the 'SA Node', your heart's natural pacemaker that generates the electric spark to beat.",
            hi: "खास बात: इसकी दीवार में 'SA Node' होता है, जो हृदय का प्राकृतिक पेसमेकर है और धड़कन के लिए बिजली का करंट बनाता है।"
        }
    },
    {
        partId: 'rv',
        title: { en: "3. The First Pump: Right Ventricle", hi: "3. पहला पंप: दायां निलय (Right Ventricle)" },
        desc: { 
            en: "When the atrium contracts, blood falls into this chamber. The Right Ventricle's job is to push this dirty blood out to the lungs for cleaning.",
            hi: "जब आलिंद सिकुड़ता है, तो रक्त इस कक्ष में गिरता है। दायां निलय का काम इस गंदे रक्त को साफ करने के लिए फेफड़ों (Lungs) की ओर धक्का देना है।"
        },
        why: {
            en: "Why are its walls thin? Because it only needs to push blood to the lungs which are right next door. High pressure isn't needed here.",
            hi: "इसकी दीवारें पतली क्यों हैं? क्योंकि इसे रक्त को केवल पास में स्थित फेफड़ों तक भेजना होता है। यहाँ बहुत अधिक दबाव की आवश्यकता नहीं होती।"
        }
    },
    {
        partId: 'pa',
        title: { en: "4. The Exception: Pulmonary Artery", hi: "4. अपवाद: फुफ्फुसीय धमनी (Pulmonary Artery)" },
        desc: { 
            en: "This vessel carries the blood from the Right Ventricle to the Lungs. In the lungs, we breathe out CO₂ and breathe in fresh Oxygen.",
            hi: "यह नली रक्त को दायां निलय से फेफड़ों तक ले जाती है। फेफड़ों में, हम CO₂ बाहर छोड़ते हैं और ताजी ऑक्सीजन अंदर लेते हैं।"
        },
        why: {
            en: "Exam Trick: Normally Arteries carry PURE blood. This is the ONLY Artery in the body that carries IMPURE (Blue) blood.",
            hi: "परीक्षा ट्रिक: आमतौर पर धमनियाँ (Arteries) शुद्ध रक्त ले जाती हैं। लेकिन यह शरीर की एकमात्र धमनी है जो अशुद्ध (नीला) रक्त ले जाती है।"
        }
    },
    {
        partId: 'pv',
        title: { en: "5. Return Journey: Pulmonary Vein", hi: "5. वापसी: फुफ्फुसीय शिरा (Pulmonary Vein)" },
        desc: { 
            en: "After getting fresh oxygen in the lungs, the blood turns bright RED. It travels back to the heart through these veins.",
            hi: "फेफड़ों में ऑक्सीजन मिलने के बाद रक्त चमकीला लाल हो जाता है। यह इन शिराओं के माध्यम से वापस हृदय में आता है।"
        },
        why: {
            en: "Exam Trick: Normally Veins carry IMPURE blood. These are the ONLY Veins in the body that carry PURE (Red) blood.",
            hi: "परीक्षा ट्रिक: आमतौर पर शिराएँ (Veins) अशुद्ध रक्त ले जाती हैं। लेकिन यह शरीर की एकमात्र शिरा है जो शुद्ध (लाल) रक्त ले जाती है।"
        }
    },
    {
        partId: 'la',
        title: { en: "6. Fresh Holding: Left Atrium", hi: "6. शुद्ध वेटिंग रूम: बायां आलिंद (Left Atrium)" },
        desc: { 
            en: "The oxygen-rich blood enters here. It waits for the Mitral Valve to open so it can go to the final pumping chamber.",
            hi: "ऑक्सीजन से भरपूर रक्त यहाँ प्रवेश करता है। यह मिट्रल वाल्व (Mitral Valve) के खुलने का इंतजार करता है ताकि यह अंतिम पंपिंग कक्ष में जा सके।"
        },
        why: {
            en: "It simply acts as a reservoir for oxygenated blood coming from the lungs.",
            hi: "यह बस फेफड़ों से आने वाले शुद्ध रक्त के लिए एक संग्रह पात्र (reservoir) का काम करता है।"
        }
    },
    {
        partId: 'lv',
        title: { en: "7. The Powerhouse: Left Ventricle", hi: "7. पावरहाउस: बायां निलय (Left Ventricle)" },
        desc: { 
            en: "This is the most important chamber. When it contracts, it generates massive pressure to shoot blood out to the entire body.",
            hi: "यह सबसे महत्वपूर्ण कक्ष है। जब यह सिकुड़ता है, तो यह पूरे शरीर में रक्त भेजने के लिए भारी दबाव पैदा करता है।"
        },
        why: {
            en: "Why is it the THICKEST? It has to push blood against gravity to your brain and down to your toes. It needs strong muscles!",
            hi: "यह सबसे मोटा क्यों है? क्योंकि इसे गुरुत्वाकर्षण के खिलाफ दिमाग तक और नीचे पैरों तक रक्त पहुँचाना होता है। इसे मजबूत मांसपेशियों की जरूरत होती है!"
        }
    },
    {
        partId: 'aorta',
        title: { en: "8. The Super Highway: Aorta", hi: "8. सुपर हाईवे: महाधमनी (Aorta)" },
        desc: { 
            en: "The pure blood blasts out through the Aorta, the largest artery. From here, it branches out to feed every cell in your body.",
            hi: "शुद्ध रक्त महाधमनी (Aorta) के माध्यम से बाहर निकलता है, जो सबसे बड़ी धमनी है। यहाँ से यह शरीर की हर कोशिका को पोषण देने के लिए शाखाओं में बंट जाती है।"
        },
        why: {
            en: "Cycle Complete: The cells use the oxygen, the blood turns dirty (blue) again, and returns to the Vena Cava. The cycle repeats 72 times a minute!",
            hi: "चक्र पूरा: कोशिकाएं ऑक्सीजन का उपयोग करती हैं, रक्त फिर से गंदा (नीला) हो जाता है, और महाशिरा में वापस आता है। यह चक्र एक मिनट में 72 बार दोहराया जाता है!"
        }
    }
];

const Heart: React.FC<HeartProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<0.5 | 1 | 2>(1);
  const [activeTab, setActiveTab] = useState<'structure' | 'facts' | 'cycle' | 'bp' | 'quiz'>('structure');
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
        // Ensure flow mode is on for visualization
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
      setActiveTab('structure'); // Just to reset visual tab state if needed
      setIsPlaying(true);
  };

  const handlePartClick = (part: string) => {
    if (tourActive) return; // Disable manual click during tour

    if (activeTab === 'quiz') {
       if (quizAnswered) return;
       const correct = HEART_CONTENT.quiz[quizIndex].ans === part;
       setQuizAnswered(part);
       if (correct) setQuizScore(p => p + 1);
    } else {
        setSelectedPart(part);
        setActiveTab('structure');
    }
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
      if (activeTab === 'quiz') {
          if (quizAnswered) {
              const currentQ = HEART_CONTENT.quiz[quizIndex];
              if (part === currentQ.ans) return "#22c55e"; // Correct Green
              if (part === quizAnswered && part !== currentQ.ans) return "#ef4444"; // Wrong Red
          }
          return baseColor; // Default
      }
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
                <span className="text-[10px] text-slate-500 font-medium">SSC/Railway Exam Special</span>
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
                            // === DIAGRAM / SCHEMATIC VIEW (Previous Implementation) ===
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
                            // === REALISTIC / ANATOMIC VIEW (New) ===
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
                                        <text x="90" y="210">RA</text>
                                        <text x="160" y="320">RV</text>
                                        <text x="290" y="210">LA</text>
                                        <text x="290" y="340">LV</text>
                                    </>
                                ) : (
                                    <>
                                        <text x="110" y="190">RA</text>
                                        <text x="170" y="350">RV</text>
                                        <text x="310" y="180">LA</text>
                                        <text x="280" y="320">LV</text>
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

                        <div className="bg-amber-50 p-3 rounded-lg border-l-4 border-amber-400">
                             <div className="flex items-center gap-2 mb-1">
                                <Lightbulb size={16} className="text-amber-600" />
                                <span className="text-xs font-bold text-amber-700 uppercase">{language === Language.ENGLISH ? "Why does it work this way?" : "यह ऐसे काम क्यों करता है?"}</span>
                             </div>
                             <p className="text-sm text-slate-800 italic">
                                {language === Language.ENGLISH ? TOUR_STEPS[tourStep].why.en : TOUR_STEPS[tourStep].why.hi}
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
                        {['structure', 'facts', 'cycle', 'bp', 'quiz'].map(tab => (
                            <button 
                                key={tab}
                                onClick={() => setActiveTab(tab as any)}
                                className={`px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors border-b-2 flex-shrink-0 ${activeTab === tab ? 'border-rose-500 text-rose-600 bg-white' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                            >
                                {tab === 'structure' && (language === Language.ENGLISH ? "Anatomy" : "रचना")}
                                {tab === 'facts' && (language === Language.ENGLISH ? "SSC Facts" : "तथ्य")}
                                {tab === 'cycle' && (language === Language.ENGLISH ? "Cycle" : "चक्र")}
                                {tab === 'bp' && "BP"}
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
                                            <h4 className="text-xs font-bold text-amber-700 uppercase mb-1 flex items-center gap-1"><AlertCircle size={12}/> SSC Fact</h4>
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
                            <div className="space-y-3 animate-fade-in">
                                <h3 className="font-bold text-slate-800 border-b pb-2 mb-4">{language === Language.ENGLISH ? HEART_CONTENT.facts.title.en : HEART_CONTENT.facts.title.hi}</h3>
                                {HEART_CONTENT.facts.items.map((item: any, idx: number) => (
                                    <div key={idx} className="flex justify-between items-center bg-slate-50 p-3 rounded hover:bg-slate-100 transition-colors">
                                        <span className="text-sm font-semibold text-slate-600">{language === Language.ENGLISH ? item.label.en : item.label.hi}</span>
                                        <span className="text-sm font-bold text-rose-600">{language === Language.ENGLISH ? item.val.en : item.val.hi}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {activeTab === 'cycle' && (
                            <div className="space-y-4 animate-fade-in">
                                <h3 className="font-bold text-slate-800 border-b pb-2">{language === Language.ENGLISH ? HEART_CONTENT.cycle.title.en : HEART_CONTENT.cycle.title.hi}</h3>
                                <div className="space-y-4">
                                    {HEART_CONTENT.cycle.steps.map((step: any, idx: number) => (
                                        <div key={idx} className="relative pl-6 border-l-2 border-slate-200">
                                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-rose-500 border-2 border-white"></div>
                                            <h4 className="font-bold text-slate-800 text-sm">{language === Language.ENGLISH ? step.title.en : step.title.hi}</h4>
                                            <p className="text-sm text-slate-600 mt-1">{language === Language.ENGLISH ? step.text.en : step.text.hi}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'bp' && (
                            <div className="space-y-4 animate-fade-in">
                                <div className="text-center py-4 bg-slate-900 text-white rounded-xl mb-4">
                                    <div className="text-xs uppercase text-slate-400 tracking-widest mb-1">{language === Language.ENGLISH ? "Normal BP" : "सामान्य रक्तचाप"}</div>
                                    <div className="text-4xl font-mono font-bold text-green-400">{HEART_CONTENT.bp.normal}</div>
                                </div>
                                <div className="space-y-2">
                                    <div className="p-3 bg-red-50 text-red-800 rounded-lg text-sm font-medium border border-red-100">
                                        ⬆️ {language === Language.ENGLISH ? HEART_CONTENT.bp.sys.en : HEART_CONTENT.bp.sys.hi}
                                    </div>
                                    <div className="p-3 bg-blue-50 text-blue-800 rounded-lg text-sm font-medium border border-blue-100">
                                        ⬇️ {language === Language.ENGLISH ? HEART_CONTENT.bp.dia.en : HEART_CONTENT.bp.dia.hi}
                                    </div>
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-2">
                                        <BookOpen size={14} /> {language === Language.ENGLISH ? HEART_CONTENT.bp.inst.en : HEART_CONTENT.bp.inst.hi}
                                    </div>
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
                                    <p className="text-sm text-slate-500 mb-4 italic">
                                        {language === Language.ENGLISH ? "Tap the correct part on the Heart diagram to answer." : "उत्तर देने के लिए हृदय चित्र पर सही भाग को टैप करें।"}
                                    </p>
                                    
                                    {quizAnswered && (
                                        <div className={`p-3 rounded-lg flex items-center gap-2 ${quizAnswered === HEART_CONTENT.quiz[quizIndex].ans ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                            {quizAnswered === HEART_CONTENT.quiz[quizIndex].ans ? <CheckCircle size={18}/> : <XCircle size={18}/>}
                                            <span className="font-bold">{quizAnswered === HEART_CONTENT.quiz[quizIndex].ans ? (language === Language.ENGLISH ? "Correct!" : "सही!") : (language === Language.ENGLISH ? "Wrong!" : "गलत!")}</span>
                                        </div>
                                    )}
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