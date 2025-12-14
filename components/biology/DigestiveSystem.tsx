
import React, { useState, useEffect } from 'react';
import { Utensils, BookOpen, FlaskConical, ArrowRight, ArrowLeft, Play, Info, CheckCircle, Shield, Droplet, Clock, RotateCcw } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
}

// --- STORY DATA ---
const STORY_CHAPTERS = [
  {
    id: 1,
    title: { en: "Chapter 1: The Entrance (Mouth)", hi: "अध्याय 1: प्रवेश द्वार (मुँह)" },
    dialogue: {
      en: "Aarti Mam: 'Digestion starts in the mouth! Your teeth (Dental Formula 2123) grind the food. Salivary glands release Amylase enzyme which breaks down Carbs.'",
      hi: "आरती मैम: 'पाचन मुँह से शुरू होता है! आपके दांत (डेंटल फॉर्मूला 2123) भोजन को पीसते हैं। लार ग्रंथियां एमाइलेज एंजाइम छोड़ती हैं जो कार्बोहाइड्रेट को तोड़ता है।'"
    },
    facts: [
      { label: {en: "Dental Formula (Adult)", hi: "दंत सूत्र (वयस्क)"}, val: "2123 (Incisor-2, Canine-1, Premolar-2, Molar-3)" },
      { label: {en: "Dental Formula (Child)", hi: "दंत सूत्र (बच्चा)"}, val: "2102 (Premolars absent)" },
      { label: {en: "Enzyme", hi: "एंजाइम"}, val: {en: "Salivary Amylase (Ptyalin)", hi: "लार एमाइलेज (टायलिन)"} }
    ],
    image: "mouth"
  },
  {
    id: 2,
    title: { en: "Chapter 2: The Slide (Esophagus)", hi: "अध्याय 2: क्रमिक ढलान (ग्रासनली)" },
    dialogue: {
      en: "Aarti Mam: 'The food is now a BOLUS. It travels down the Food Pipe (Esophagus). No digestion happens here. The movement is called Peristalsis.'",
      hi: "आरती मैम: 'भोजन अब बोलस (BOLUS) बन गया है। यह भोजन नली (ग्रासनली) से नीचे जाता है। यहाँ कोई पाचन नहीं होता। इस गति को क्रमाकुंचन (Peristalsis) कहते हैं।'"
    },
    facts: [
      { label: {en: "Movement", hi: "गति"}, val: {en: "Peristalsis", hi: "क्रमाकुंचन"} },
      { label: {en: "Digestion", hi: "पाचन"}, val: {en: "None", hi: "कोई नहीं"} }
    ],
    image: "esophagus"
  },
  {
    id: 3,
    title: { en: "Chapter 3: The Acid Tank (Stomach)", hi: "अध्याय 3: अम्ल का टैंक (आमाशय)" },
    dialogue: {
      en: "Aarti Mam: 'Welcome to the J-shaped Stomach! It's an acid tank (HCl). Mucus protects the walls. Pepsin digests protein. Milk protein (Casein) is broken by Renin.'",
      hi: "आरती मैम: 'J-आकार के आमाशय में स्वागत है! यह एक एसिड टैंक (HCl) है। श्लेष्मा दीवारों की रक्षा करती है। पेप्सिन प्रोटीन को पचाता है। रेनिन दूध के प्रोटीन को तोड़ता है।'"
    },
    facts: [
      { label: {en: "Acid", hi: "अम्ल"}, val: "HCl (Hydrochloric Acid)" },
      { label: {en: "Protein Enzyme", hi: "प्रोटीन एंजाइम"}, val: "Pepsin (Active from Pepsinogen)" },
      { label: {en: "Milk Enzyme", hi: "दूध एंजाइम"}, val: "Renin (Active from Pro-renin)" },
      { label: {en: "Result", hi: "परिणाम"}, val: "Chyme (काइम)" }
    ],
    image: "stomach"
  },
  {
    id: 4,
    title: { en: "Chapter 4: The Factory (Small Intestine)", hi: "अध्याय 4: लंबी अवशोषण फैक्ट्री (छोटी आँत)" },
    dialogue: {
      en: "Aarti Mam: 'This is the longest part (6-7m)! Liver sends Bile (stored in Gallbladder). Pancreas sends Amylase, Trypsin, Lipase. Complete digestion happens here.'",
      hi: "आरती मैम: 'यह सबसे लंबा हिस्सा (6-7m) है! यकृत पित्त (Bile) भेजता है। अग्नाशय एमाइलेज, ट्रिप्सिन, लाइपेज भेजता है। यहाँ पूर्ण पाचन होता है।'"
    },
    facts: [
      { label: {en: "Length", hi: "लंबाई"}, val: "6.5 - 7.5 Meters" },
      { label: {en: "Pancreas Juice", hi: "अग्नाशयी रस"}, val: "Amylase (Carbs), Trypsin (Protein), Lipase (Fats)" },
      { label: {en: "Liver", hi: "यकृत"}, val: {en: "Makes Bile (Emulsifies Fats)", hi: "पित्त बनाता है (वसा को तोड़ता है)"} }
    ],
    image: "small_intestine"
  },
  {
    id: 5,
    title: { en: "Chapter 5: The Exit (Large Intestine)", hi: "अध्याय 5: निकास (बड़ी आँत)" },
    dialogue: {
      en: "Aarti Mam: 'Water is absorbed here. E. coli bacteria make Vitamin K & B12. Waste is stored in Rectum and exits via Anus.'",
      hi: "आरती मैम: 'यहाँ पानी सोखा जाता है। ई. कोलाई बैक्टीरिया विटामिन K और B12 बनाते हैं। अपशिष्ट मलाशय में जमा होता है और गुदा से बाहर निकलता है।'"
    },
    facts: [
      { label: {en: "Parts", hi: "भाग"}, val: "Cecum, Colon, Rectum" },
      { label: {en: "Main Function", hi: "मुख्य कार्य"}, val: {en: "Water Absorption", hi: "जल अवशोषण"} },
      { label: {en: "Bacteria", hi: "बैक्टीरिया"}, val: "E. coli (Symbiotic)" }
    ],
    image: "large_intestine"
  }
];

const DigestiveSystem: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'simulations'>('story');
  const [chapter, setChapter] = useState(0);

  return (
    <div className="flex flex-col h-full bg-slate-50 gap-4">
      {/* Header */}
      <div className="bg-amber-600 p-4 rounded-xl shadow-md text-white flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Utensils className="fill-amber-200 text-amber-100" />
            {language === Language.ENGLISH ? "Digestive System" : "पाचन तंत्र"}
          </h1>
          <p className="text-amber-100 text-xs mt-1 font-mono">STORY & SIMULATION MODE</p>
        </div>
        
        <div className="flex bg-amber-800/50 p-1 rounded-lg">
           <button 
             onClick={() => setActiveTab('story')}
             className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'story' ? 'bg-white text-amber-700 shadow' : 'text-amber-100 hover:text-white'}`}
           >
              <BookOpen size={14} /> {language === Language.ENGLISH ? "Story" : "कहानी"}
           </button>
           <button 
             onClick={() => setActiveTab('simulations')}
             className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'simulations' ? 'bg-white text-amber-700 shadow' : 'text-amber-100 hover:text-white'}`}
           >
              <FlaskConical size={14} /> {language === Language.ENGLISH ? "Simulations" : "प्रयोग"}
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'story' ? (
          <StoryMode language={language} chapter={chapter} setChapter={setChapter} />
        ) : (
          <SimulationMode language={language} />
        )}
      </div>
    </div>
  );
};

// --- STORY MODE COMPONENT ---
const StoryMode = ({ language, chapter, setChapter }: { language: Language, chapter: number, setChapter: (c: number) => void }) => {
  const data = STORY_CHAPTERS[chapter];

  const renderVisual = (img: string) => {
     // Simplified SVG representations for each step
     switch(img) {
        case 'mouth':
           return (
              <svg viewBox="0 0 200 200" className="w-full h-full max-h-[300px]">
                 <path d="M60,100 Q100,150 140,100" fill="none" stroke="#ef4444" strokeWidth="4" />
                 <path d="M60,80 Q100,30 140,80" fill="none" stroke="#ef4444" strokeWidth="4" />
                 {/* Teeth */}
                 <path d="M65,80 L75,80 L75,90 L65,90 Z" fill="white" stroke="#ccc" />
                 <path d="M80,80 L90,80 L90,90 L80,90 Z" fill="white" stroke="#ccc" />
                 <circle cx="50" cy="90" r="10" fill="#fde047" opacity="0.6"><animate attributeName="r" values="10;12;10" dur="2s" repeatCount="indefinite"/></circle>
                 <text x="50" y="115" fontSize="10" textAnchor="middle">Salivary Gland</text>
                 <circle cx="100" cy="90" r="15" fill="#a3e635" opacity="0.8">
                    <animateMotion path="M70,90 Q100,120 130,90" dur="2s" repeatCount="indefinite" />
                 </circle>
                 <text x="100" y="50" fontSize="12" textAnchor="middle" fill="#555">Bolus Formation</text>
              </svg>
           );
        case 'esophagus':
           return (
              <svg viewBox="0 0 200 300" className="w-full h-full max-h-[300px]">
                  <path d="M80,20 Q70,150 80,280" fill="none" stroke="#fca5a5" strokeWidth="20" strokeLinecap="round"/>
                  <path d="M120,20 Q130,150 120,280" fill="none" stroke="#fca5a5" strokeWidth="20" strokeLinecap="round"/>
                  <circle cx="100" cy="50" r="15" fill="#a3e635" stroke="#4d7c0f" strokeWidth="2">
                      <animate attributeName="cy" values="50;250" dur="3s" repeatCount="indefinite" />
                      <animate attributeName="r" values="15;12;15" dur="3s" repeatCount="indefinite" />
                  </circle>
                  <text x="160" y="150" fontSize="12" fill="#ef4444">Peristalsis</text>
              </svg>
           );
        case 'stomach':
            return (
                <svg viewBox="0 0 200 200" className="w-full h-full max-h-[300px]">
                   <path d="M80,20 C80,100 40,150 100,180 C160,200 180,120 160,100" fill="#fecaca" stroke="#dc2626" strokeWidth="4" />
                   <rect x="80" y="100" width="80" height="60" fill="#fef9c3" opacity="0.5" />
                   <text x="120" y="130" fontSize="16" textAnchor="middle" fill="#b91c1c" fontWeight="bold">HCl Tank</text>
                   {/* Bubbles */}
                   <circle cx="100" cy="150" r="2" fill="red"><animate attributeName="cy" values="150;100" dur="1s" repeatCount="indefinite"/></circle>
                   <circle cx="120" cy="160" r="3" fill="red"><animate attributeName="cy" values="160;110" dur="1.5s" repeatCount="indefinite"/></circle>
                   <path d="M78,20 L78,180" stroke="#a3e635" strokeWidth="4" strokeDasharray="5,5" />
                </svg>
            );
        case 'small_intestine':
            return (
                <svg viewBox="0 0 300 300" className="w-full h-full max-h-[300px]">
                    <path d="M50,50 L100,80 L80,100" fill="#fcd34d" stroke="#d97706" strokeWidth="2" />
                    <text x="50" y="40" fontSize="10">Liver</text>
                    <path d="M120,90 L180,90 L150,110" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                    <text x="150" y="80" fontSize="10">Pancreas</text>
                    
                    <path d="M100,120 Q150,120 150,150 Q150,180 100,180 Q50,180 50,210 Q50,240 100,240 Q150,240 150,270" fill="none" stroke="#fca5a5" strokeWidth="15" strokeLinecap="round" />
                    <circle cx="100" cy="120" r="5" fill="#a3e635">
                        <animateMotion path="M0,0 Q50,0 50,30 Q50,60 0,60 Q-50,60 -50,90 Q-50,120 0,120 Q50,120 50,150" dur="4s" repeatCount="indefinite" />
                    </circle>
                    <text x="200" y="200" fontSize="12" fill="#ef4444">6-7 Meters Long</text>
                </svg>
            );
        case 'large_intestine':
            return (
                <svg viewBox="0 0 300 300" className="w-full h-full max-h-[300px]">
                    <path d="M200,250 L200,100 L100,100 L100,250" fill="none" stroke="#166534" strokeWidth="20" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M210,250 L210,100 L90,100 L90,250" fill="none" stroke="#86efac" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                    
                    <circle cx="150" cy="100" r="10" fill="#a3e635">
                        <animate attributeName="fill" values="#a3e635;#713f12" dur="3s" repeatCount="indefinite" />
                        <animateMotion path="M50,150 L50,0 L-50,0 L-50,150" dur="3s" repeatCount="indefinite" />
                    </circle>

                    <text x="150" y="150" fontSize="12" textAnchor="middle" fill="#166534">Water Absorption</text>
                    <text x="230" y="200" fontSize="10" fill="#166534">E. coli</text>
                </svg>
            );
        default: return null;
     }
  };

  return (
    <div className="h-full flex flex-col md:flex-row gap-6 p-4">
       {/* Visual Area */}
       <div className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center p-6 relative">
          {renderVisual(data.image)}
          
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
             {STORY_CHAPTERS.map((c, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === chapter ? 'bg-amber-500 scale-125' : 'bg-slate-200'}`} />
             ))}
          </div>
       </div>

       {/* Story Content */}
       <div className="w-full md:w-96 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-amber-500 flex-1 flex flex-col">
             <h2 className="text-xl font-bold text-slate-800 mb-4">{language === Language.ENGLISH ? data.title.en : data.title.hi}</h2>
             
             <div className="bg-amber-50 p-4 rounded-xl mb-6 relative">
                 <div className="absolute -top-3 -left-3 bg-white p-1 rounded-full border border-amber-200">
                    <Utensils size={20} className="text-amber-600" />
                 </div>
                 <p className="text-slate-700 italic leading-relaxed text-sm md:text-base">
                    "{language === Language.ENGLISH ? data.dialogue.en : data.dialogue.hi}"
                 </p>
             </div>

             <div className="space-y-3 mb-6">
                 {data.facts.map((fact, idx) => (
                    <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                       <span className="font-bold text-slate-500">{language === Language.ENGLISH ? fact.label.en : fact.label.hi}</span>
                       <span className="font-bold text-amber-700 text-right">{typeof fact.val === 'string' ? fact.val : (language === Language.ENGLISH ? fact.val.en : fact.val.hi)}</span>
                    </div>
                 ))}
             </div>

             <div className="mt-auto flex justify-between gap-4">
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
                   className="flex-1 py-3 bg-amber-600 text-white rounded-xl font-bold disabled:opacity-50 flex items-center justify-center gap-2 shadow-md hover:bg-amber-700"
                 >
                   {language === Language.ENGLISH ? "Next" : "अगला"} <ArrowRight size={18}/>
                 </button>
             </div>
          </div>
       </div>
    </div>
  );
};

// --- SIMULATION MODE COMPONENT ---
const SimulationMode = ({ language }: { language: Language }) => {
  const [activeSim, setActiveSim] = useState<'carb' | 'stomach' | 'intestine'>('carb');

  const renderSimContent = () => {
     switch(activeSim) {
        case 'carb': return <CarbSim language={language} />;
        case 'stomach': return <StomachSim language={language} />;
        case 'intestine': return <IntestineSim language={language} />;
        default: return null;
     }
  };

  return (
     <div className="h-full flex flex-col">
        {/* Sim Navigation */}
        <div className="flex bg-white border-b border-slate-200 overflow-x-auto flex-shrink-0">
           {[
              { id: 'carb', label: { en: "Carb Breakdown", hi: "कार्बोहाइड्रेट पाचन" } },
              { id: 'stomach', label: { en: "Stomach Protection", hi: "आमाशय सुरक्षा" } },
              { id: 'intestine', label: { en: "Intestine Function", hi: "आंत का कार्य" } }
           ].map(sim => (
              <button
                key={sim.id}
                onClick={() => setActiveSim(sim.id as any)}
                className={`flex-1 py-3 px-4 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${activeSim === sim.id ? 'border-amber-600 text-amber-700 bg-amber-50' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              >
                 {language === Language.ENGLISH ? sim.label.en : sim.label.hi}
              </button>
           ))}
        </div>
        
        <div className="flex-1 overflow-y-auto bg-slate-50 p-4">
           {renderSimContent()}
        </div>
     </div>
  );
};

// --- SIMULATION 1: CARB BREAKDOWN ---
const CarbSim = ({ language }: { language: Language }) => {
   const [step, setStep] = useState(0);
   const [timer, setTimer] = useState(0);

   useEffect(() => {
      let interval: any;
      if (step === 1 && timer < 100) {
         interval = setInterval(() => setTimer(t => t + 5), 100);
      } else if (step === 1 && timer >= 100) {
         setStep(2);
      }
      return () => clearInterval(interval);
   }, [step, timer]);

   const reset = () => {
      setStep(0);
      setTimer(0);
   };

   return (
      <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto gap-8">
         <div className="flex gap-8 items-end">
             {/* BOWL A (Control) */}
             <div className="flex flex-col items-center gap-2">
                 <div className="w-32 h-24 border-b-4 border-l-4 border-r-4 border-slate-400 rounded-b-full relative overflow-hidden bg-white">
                     <div className={`absolute bottom-0 w-full h-16 transition-colors duration-1000 ${step === 3 ? 'bg-blue-900' : 'bg-slate-100'}`}>
                         {/* Rice particles */}
                         <div className="absolute inset-0 flex flex-wrap gap-1 p-4 justify-center items-end content-end">
                            {Array.from({length: 10}).map((_, i) => <div key={i} className="w-2 h-1 bg-white rounded-full"></div>)}
                         </div>
                     </div>
                 </div>
                 <span className="font-bold text-slate-600">Bowl A (Water Only)</span>
             </div>

             {/* BOWL B (Experimental) */}
             <div className="flex flex-col items-center gap-2">
                 <div className="w-32 h-24 border-b-4 border-l-4 border-r-4 border-slate-400 rounded-b-full relative overflow-hidden bg-white">
                     <div className={`absolute bottom-0 w-full h-16 transition-colors duration-1000 ${step === 3 ? 'bg-amber-100' : (step >= 1 ? 'bg-blue-50' : 'bg-slate-100')}`}>
                         {/* Rice particles */}
                         <div className="absolute inset-0 flex flex-wrap gap-1 p-4 justify-center items-end content-end">
                            {Array.from({length: 10}).map((_, i) => <div key={i} className={`w-2 h-1 rounded-full transition-all ${step >= 2 ? 'bg-transparent border border-slate-300' : 'bg-white'}`}></div>)}
                         </div>
                     </div>
                 </div>
                 <span className="font-bold text-slate-600">Bowl B (Saliva + Water)</span>
             </div>
         </div>

         {/* Steps Display */}
         <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 text-center w-full">
             <div className="text-xl font-bold text-amber-600 mb-2">
                 {step === 0 && (language === Language.ENGLISH ? "Step 1: Preparation" : "चरण 1: तैयारी")}
                 {step === 1 && (language === Language.ENGLISH ? "Step 2: Digestion..." : "चरण 2: पाचन हो रहा है...")}
                 {step === 2 && (language === Language.ENGLISH ? "Step 3: Ready for Test" : "चरण 3: परीक्षण के लिए तैयार")}
                 {step === 3 && (language === Language.ENGLISH ? "Result: Iodine Test" : "परिणाम: आयोडीन परीक्षण")}
             </div>
             
             <p className="text-slate-600 mb-6">
                 {step === 0 && (language === Language.ENGLISH ? "Bowl B contains Amylase enzyme from saliva." : "कटोरी B में लार से एमाइलेज एंजाइम है।")}
                 {step === 1 && (language === Language.ENGLISH ? "Waiting for Amylase to break down Starch..." : "एमाइलेज द्वारा स्टार्च को तोड़ने का इंतजार...")}
                 {step === 2 && (language === Language.ENGLISH ? "Starch is broken down in Bowl B. Add Iodine to check." : "कटोरी B में स्टार्च टूट गया है। जाँच के लिए आयोडीन डालें।")}
                 {step === 3 && (language === Language.ENGLISH ? "Blue/Black = Starch Present. No Color = Starch Digested." : "नीला/काला = स्टार्च मौजूद है। कोई रंग नहीं = स्टार्च पच गया।")}
             </p>

             {step === 1 && (
                 <div className="w-full bg-slate-200 rounded-full h-2 mb-6 overflow-hidden">
                     <div className="bg-amber-500 h-full transition-all duration-100 ease-linear" style={{ width: `${timer}%` }}></div>
                 </div>
             )}

             <div className="flex gap-4 justify-center">
                 {step === 0 && (
                     <button onClick={() => setStep(1)} className="px-6 py-2 bg-amber-600 text-white rounded-lg font-bold shadow hover:bg-amber-700">
                         {language === Language.ENGLISH ? "Add Saliva & Wait" : "लार डालें और प्रतीक्षा करें"}
                     </button>
                 )}
                 {step === 2 && (
                     <button onClick={() => setStep(3)} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow hover:bg-indigo-700 flex items-center gap-2">
                         <Droplet size={18}/> {language === Language.ENGLISH ? "Add Iodine Drops" : "आयोडीन डालें"}
                     </button>
                 )}
                 {step === 3 && (
                     <button onClick={reset} className="px-6 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold hover:bg-slate-200 flex items-center gap-2">
                         <RotateCcw size={18}/> {language === Language.ENGLISH ? "Reset Experiment" : "फिर से करें"}
                     </button>
                 )}
             </div>
         </div>
      </div>
   );
};

// --- SIMULATION 2: STOMACH PROTECTION ---
const StomachSim = ({ language }: { language: Language }) => {
    const [protectedSponge, setProtectedSponge] = useState(false);
    const [acidPoured, setAcidPoured] = useState(false);

    const reset = () => {
        setProtectedSponge(false);
        setAcidPoured(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full max-w-2xl mx-auto gap-8">
            <div className="flex gap-12 items-end">
                {/* SPONGE 1 (Unprotected) */}
                <div className="flex flex-col items-center gap-2">
                    <div className={`w-32 h-20 rounded-lg transition-all duration-1000 relative ${acidPoured ? 'bg-stone-800 scale-90 border-4 border-dashed border-red-500' : 'bg-pink-300'}`}>
                        {acidPoured && <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-red-600 font-bold animate-bounce">BURNED!</div>}
                    </div>
                    <span className="font-bold text-slate-600">Wall (No Mucus)</span>
                </div>

                {/* SPONGE 2 (Protected) */}
                <div className="flex flex-col items-center gap-2">
                    <div className="relative">
                        <div className={`w-32 h-20 bg-pink-300 rounded-lg transition-all duration-500 border-4 ${protectedSponge ? 'border-blue-400' : 'border-transparent'}`}></div>
                        {protectedSponge && <div className="absolute inset-0 bg-blue-400/30 rounded-lg border-2 border-blue-400 flex items-center justify-center text-blue-800 font-bold text-xs">MUCUS LAYER</div>}
                    </div>
                    <span className="font-bold text-slate-600">Wall (With Mucus)</span>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 text-center w-full">
                 <div className="flex justify-center gap-4 mb-6">
                     <button 
                       onClick={() => setProtectedSponge(true)} 
                       disabled={acidPoured || protectedSponge}
                       className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg font-bold disabled:opacity-50 hover:bg-blue-200 flex items-center gap-2"
                     >
                        <Shield size={18}/> {language === Language.ENGLISH ? "Apply Mucus Layer" : "श्लेष्मा परत लगाएं"}
                     </button>
                     <button 
                       onClick={() => setAcidPoured(true)} 
                       disabled={acidPoured}
                       className="px-4 py-2 bg-red-100 text-red-700 rounded-lg font-bold disabled:opacity-50 hover:bg-red-200 flex items-center gap-2"
                     >
                        <FlaskConical size={18}/> {language === Language.ENGLISH ? "Pour Acid (HCl)" : "अम्ल (HCl) डालें"}
                     </button>
                 </div>

                 {acidPoured && (
                     <div className="bg-slate-50 p-4 rounded-lg border-l-4 border-green-500 text-left">
                         <h4 className="font-bold text-slate-800 mb-1">{language === Language.ENGLISH ? "Conclusion:" : "निष्कर्ष:"}</h4>
                         <p className="text-sm text-slate-600">
                             {language === Language.ENGLISH 
                                ? "The unprotected wall is damaged by acid. The mucus layer (Basic) neutralizes the Acid, protecting the stomach lining."
                                : "बिना सुरक्षा वाली दीवार अम्ल से जल गई। श्लेष्मा परत (क्षारीय) ने अम्ल को उदासीन कर दिया, जिससे आमाशय की परत सुरक्षित रही।"}
                         </p>
                         <button onClick={reset} className="mt-4 text-amber-600 font-bold text-sm hover:underline flex items-center gap-1">
                             <RotateCcw size={14}/> {language === Language.ENGLISH ? "Reset" : "रीसेट"}
                         </button>
                     </div>
                 )}
            </div>
        </div>
    );
};

// --- SIMULATION 3: INTESTINE FUNCTION ---
const IntestineSim = ({ language }: { language: Language }) => {
    const [chymePos, setChymePos] = useState(0);
    const [isAbsorbing, setIsAbsorbing] = useState(false);

    useEffect(() => {
        let interval: any;
        if (isAbsorbing) {
            interval = setInterval(() => {
                setChymePos(prev => {
                    if (prev >= 100) {
                        setIsAbsorbing(false);
                        return 100;
                    }
                    return prev + 1;
                });
            }, 50);
        }
        return () => clearInterval(interval);
    }, [isAbsorbing]);

    const reset = () => {
        setChymePos(0);
        setIsAbsorbing(true);
    };

    return (
        <div className="flex flex-col gap-6 h-full">
            {/* COMPARISON CHART */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 flex items-center gap-3">
                    <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center font-bold text-amber-800">S</div>
                    <div>
                        <div className="font-bold text-slate-800">Small Intestine</div>
                        <div className="text-xs text-slate-600">{language === Language.ENGLISH ? "Length: 6.5 - 7.5m" : "लंबाई: 6.5 - 7.5 मी"}</div>
                        <div className="text-xs text-green-700 font-bold">{language === Language.ENGLISH ? "Nutrient Absorption" : "पोषक तत्व अवशोषण"}</div>
                    </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-200 flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center font-bold text-green-800">L</div>
                    <div>
                        <div className="font-bold text-slate-800">Large Intestine</div>
                        <div className="text-xs text-slate-600">{language === Language.ENGLISH ? "Length: 1.5m" : "लंबाई: 1.5 मी"}</div>
                        <div className="text-xs text-blue-700 font-bold">{language === Language.ENGLISH ? "Water Absorption" : "जल अवशोषण"}</div>
                    </div>
                </div>
            </div>

            {/* ANIMATION AREA */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 flex-1 flex flex-col items-center justify-center relative">
                 <div className="relative w-full max-w-lg h-32 bg-slate-100 rounded-full overflow-hidden border-2 border-slate-300">
                     {/* Sections */}
                     <div className="absolute left-0 top-0 bottom-0 w-[70%] bg-amber-100 border-r-2 border-dashed border-slate-300 flex items-center justify-center text-xs text-amber-800 font-bold">Small Intestine</div>
                     <div className="absolute right-0 top-0 bottom-0 w-[30%] bg-green-100 flex items-center justify-center text-xs text-green-800 font-bold">Large Intestine</div>

                     {/* Moving Chyme */}
                     <div 
                        className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full shadow-lg transition-all duration-75 flex items-center justify-center font-bold text-[10px]"
                        style={{ 
                            left: `${chymePos}%`, 
                            backgroundColor: chymePos > 70 ? '#713f12' : '#ca8a04', // Change color from yellow (liquid) to brown (solid)
                            transform: `translate(-50%, -50%) scale(${chymePos > 70 ? 0.8 : 1})` // Shrink as water is lost
                        }}
                     >
                        {chymePos > 70 ? "Waste" : "Chyme"}
                     </div>
                 </div>

                 <div className="mt-8 text-center">
                     <p className="text-slate-600 mb-4 h-6">
                         {chymePos < 70 ? (
                             language === Language.ENGLISH ? "Nutrients are being absorbed into blood..." : "पोषक तत्व रक्त में अवशोषित हो रहे हैं..."
                         ) : (
                             language === Language.ENGLISH ? "Water is absorbed. Waste becomes solid." : "पानी अवशोषित हो गया। अपशिष्ट ठोस हो रहा है।"
                         )}
                     </p>
                     <button onClick={reset} className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-bold shadow hover:bg-indigo-700 flex items-center gap-2 mx-auto">
                        <Play size={18}/> {language === Language.ENGLISH ? "Start Journey" : "यात्रा शुरू करें"}
                     </button>
                 </div>
            </div>
        </div>
    );
};

export default DigestiveSystem;
