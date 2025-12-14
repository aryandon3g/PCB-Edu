
import React, { useState } from 'react';
import { Wind, Activity, Zap, Search, AlertTriangle, ArrowDown, ArrowUp, Lightbulb, User } from 'lucide-react';
import { Language } from '../../types';

interface RespiratoryProps {
  language: Language;
}

// --- SSC DATA & FACTS ---
const RESPIRATORY_DATA = {
  anatomy: {
    nose: {
      name: { en: "Nasal Cavity", hi: "नासा गुहा (Nasal Cavity)" },
      desc: { en: "The entry point. Contains 'Cilia' (Nasal Hair) and Mucus.", hi: "प्रवेश द्वार। इसमें 'सिलिया' (बाल) और श्लेष्मा (Mucus) होते हैं।" },
      fact: { en: "SSC FACT: Cilia acts as an Air Filter. Mucus regulates air temperature.", hi: "SSC तथ्य: सिलिया एयर फिल्टर का काम करते हैं। श्लेष्मा हवा के तापमान को नियंत्रित करता है।" }
    },
    pharynx: {
      name: { en: "Pharynx", hi: "ग्रसनी (Pharynx)" },
      desc: { en: "Common passage for food and air.", hi: "भोजन और हवा के लिए सामान्य मार्ग।" },
      fact: { en: "Connects mouth/nose to esophagus/larynx.", hi: "मुंह/नाक को भोजन नली/कंठ से जोड़ता है।" }
    },
    larynx: {
      name: { en: "Larynx", hi: "कंठ / स्वर यंत्र (Larynx)" },
      desc: { en: "The Voice Box.", hi: "आवाज़ का बक्सा (Voice Box)।" },
      fact: { en: "SSC IMP: Male size: 20-25mm (Adam's Apple). Female: 15-20mm.", hi: "SSC IMP: पुरुषों में माप: 20-25mm (एडम का सेब)। महिलाओं में: 15-20mm।" }
    },
    trachea: {
      name: { en: "Trachea", hi: "श्वासनली (Trachea)" },
      desc: { en: "The Windpipe. Reinforced with C-shaped cartilage rings.", hi: "हवा की नली। C-आकार के उपास्थि (Cartilage) छल्लों से बनी होती है।" },
      fact: { en: "Cartilage prevents the trachea from collapsing.", hi: "उपास्थि नली को पिचकने से रोकती है।" }
    },
    alveoli: {
      name: { en: "Alveoli", hi: "कुपिकाएं (Alveoli)" },
      desc: { en: "Tiny air sacs. The functional UNIT of the system.", hi: "हवा की छोटी थैलियां। तंत्र की कार्यात्मक इकाई (Unit)।" },
      fact: { en: "SSC MOST ASKED: Gas exchange (O2/CO2) happens here. 2 Lakh+ Alveoli.", hi: "SSC प्रश्न: गैसों का आदान-प्रदान यहाँ होता है। संख्या 2 लाख से अधिक।" }
    }
  },
  gases: {
    inhale: { n2: "78%", o2: "21%", co2: "0.04%" },
    exhale: { n2: "78%", o2: "16%", co2: "4-5%" }
  }
};

const RespiratorySystem: React.FC<RespiratoryProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'anatomy' | 'mechanism' | 'cellular' | 'facts'>('anatomy');

  return (
    <div className="flex flex-col h-full bg-slate-50 gap-4">
      {/* HEADER */}
      <div className="bg-sky-600 p-4 rounded-xl shadow-md text-white flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Wind className="fill-sky-200 text-sky-100" />
            {language === Language.ENGLISH ? "Respiratory System" : "श्वसन तंत्र"}
          </h1>
          <p className="text-sky-100 text-xs mt-1 font-mono">SSC / RAILWAY / COMPETITIVE EXAM MODE</p>
        </div>
      </div>

      {/* TABS */}
      <div className="flex bg-white rounded-lg p-1 shadow-sm overflow-x-auto border border-slate-200 flex-shrink-0">
        {[
          { id: 'anatomy', icon: Search, label: { en: "Anatomy", hi: "संरचना" } },
          { id: 'mechanism', icon: Activity, label: { en: "Breathing", hi: "श्वास क्रिया" } },
          { id: 'cellular', icon: Zap, label: { en: "Respiration", hi: "श्वसन (ऊर्जा)" } },
          { id: 'facts', icon: AlertTriangle, label: { en: "Diseases & Facts", hi: "तथ्य और रोग" } }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-md transition-all whitespace-nowrap text-sm font-bold ${activeTab === tab.id ? 'bg-sky-50 text-sky-700 shadow-sm border border-sky-100' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <tab.icon size={16} />
            <span>{language === Language.ENGLISH ? tab.label.en : tab.label.hi}</span>
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
        {activeTab === 'anatomy' && <AnatomyTab language={language} />}
        {activeTab === 'mechanism' && <MechanismTab language={language} />}
        {activeTab === 'cellular' && <CellularRespirationTab language={language} />}
        {activeTab === 'facts' && <FactsTab language={language} />}
      </div>
    </div>
  );
};

// --- TAB 1: ANATOMY ---
const AnatomyTab = ({ language }: { language: Language }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="flex-1 bg-sky-50 flex items-center justify-center p-4 relative overflow-y-auto min-h-[300px]">
        
        <div className="absolute top-4 left-4 bg-white/80 p-2 rounded-lg text-xs text-slate-500 font-bold backdrop-blur">
          {language === Language.ENGLISH ? "Tap parts to learn more" : "विवरण जानने के लिए अंगों पर टैप करें"}
        </div>

        <svg viewBox="0 0 300 400" className="h-full max-h-[500px] w-auto drop-shadow-lg">
           <path d="M100,50 Q100,10 150,10 Q200,10 200,50 L200,100 L180,120 L180,150" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.5"/>
           <path d="M100,50 L100,90 L120,110 L120,150" fill="none" stroke="#94a3b8" strokeWidth="2" opacity="0.5"/>
           
           <path d="M110,60 Q130,50 150,60 L150,90" fill={selectedPart === 'nose' ? '#fde047' : '#e2e8f0'} stroke="#64748b" strokeWidth="3" className="cursor-pointer hover:fill-sky-200 transition-colors" onClick={() => setSelectedPart('nose')} />
           <path d="M150,90 L150,120" stroke={selectedPart === 'pharynx' ? '#facc15' : '#64748b'} strokeWidth="8" className="cursor-pointer hover:stroke-sky-300 transition-colors" onClick={() => setSelectedPart('pharynx')} />
           <rect x="140" y="120" width="20" height="25" rx="5" fill={selectedPart === 'larynx' ? '#fde047' : '#cbd5e1'} stroke="#475569" strokeWidth="2" className="cursor-pointer hover:fill-sky-200 transition-colors" onClick={() => setSelectedPart('larynx')} />
           
           <g className="cursor-pointer hover:opacity-80 transition-opacity" onClick={() => setSelectedPart('trachea')}>
             <path d="M150,145 L150,220" stroke={selectedPart === 'trachea' ? '#facc15' : '#94a3b8'} strokeWidth="12" />
             {[155, 165, 175, 185, 195, 205, 215].map(y => <line key={y} x1="144" y1={y} x2="156" y2={y} stroke="#475569" strokeWidth="2" />)}
           </g>

           <path d="M150,220 L120,250 C80,260 80,350 120,380 C150,370 150,220 150,220" fill="#fca5a5" stroke="#ef4444" strokeWidth="2" />
           <path d="M150,220 L180,250 C220,260 220,350 180,380 C150,370 150,220 150,220" fill="#fca5a5" stroke="#ef4444" strokeWidth="2" />
           
           <g onClick={() => setSelectedPart('alveoli')} className="cursor-pointer hover:scale-105 transition-transform" transform="translate(180, 300)">
              <circle r="25" fill={selectedPart === 'alveoli' ? '#fde047' : 'white'} stroke="#ef4444" strokeWidth="2" opacity="0.9" />
              <circle cx="-10" cy="-5" r="8" fill="#fecaca" stroke="#ef4444" />
              <circle cx="10" cy="-5" r="8" fill="#fecaca" stroke="#ef4444" />
              <circle cx="0" cy="10" r="8" fill="#fecaca" stroke="#ef4444" />
              <text x="0" y="35" fontSize="10" textAnchor="middle" fill="#991b1b">Alveoli</text>
           </g>

           <text x="90" y="65" fontSize="10" textAnchor="end">Nose</text>
           <text x="120" y="135" fontSize="10" textAnchor="end">Larynx</text>
           <text x="120" y="180" fontSize="10" textAnchor="end">Trachea</text>
        </svg>
      </div>

      <div className="w-full md:w-80 bg-white p-6 border-l border-slate-200 overflow-y-auto">
        <h3 className="font-bold text-lg text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
           <Search size={20} className="text-sky-600"/>
           {language === Language.ENGLISH ? "Anatomy Details" : "संरचना विवरण"}
        </h3>
        
        {selectedPart ? (
           <div className="space-y-4 animate-fade-in">
              <div className="bg-sky-50 p-4 rounded-xl border border-sky-100">
                  <h4 className="text-xl font-bold text-sky-800 mb-2">
                    {(RESPIRATORY_DATA.anatomy as any)[selectedPart].name[language === Language.ENGLISH ? 'en' : 'hi']}
                  </h4>
                  <p className="text-slate-700 text-sm leading-relaxed">
                    {(RESPIRATORY_DATA.anatomy as any)[selectedPart].desc[language === Language.ENGLISH ? 'en' : 'hi']}
                  </p>
              </div>
              
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                  <span className="text-[10px] font-bold text-yellow-700 uppercase block mb-1">SSC Exam Fact</span>
                  <p className="text-sm font-medium text-slate-800">
                    {(RESPIRATORY_DATA.anatomy as any)[selectedPart].fact[language === Language.ENGLISH ? 'en' : 'hi']}
                  </p>
              </div>
           </div>
        ) : (
           <div className="text-center text-slate-400 py-10">
              <User size={48} className="mx-auto mb-3 opacity-20"/>
              <p>{language === Language.ENGLISH ? "Tap on parts of the diagram to see details." : "विवरण देखने के लिए चित्र के अंगों पर टैप करें।"}</p>
           </div>
        )}
      </div>
    </div>
  );
};

// --- TAB 2: MECHANISM ---
const MechanismTab = ({ language }: { language: Language }) => {
  const [diaphragmLevel, setDiaphragmLevel] = useState(50);
  const lungScale = 0.8 + (diaphragmLevel / 100) * 0.4;
  const diaphragmCurve = 60 - (diaphragmLevel / 100) * 40;
  const inhaling = diaphragmLevel > 60;
  
  return (
    <div className="h-full flex flex-col md:flex-row">
      <div className="flex-1 bg-gradient-to-b from-sky-50 to-white flex flex-col items-center justify-center p-6 relative">
         <div className="relative w-64 h-80 border-4 border-slate-300 rounded-3xl bg-white/50 backdrop-blur-sm overflow-hidden flex flex-col items-center pt-8 shadow-xl">
             <div className="w-4 h-12 bg-slate-300"></div>
             <div className="flex gap-1 transition-transform duration-100 ease-linear origin-top" style={{ transform: `scale(${lungScale})` }}>
                 <div className="w-20 h-32 bg-pink-400 rounded-tl-3xl rounded-bl-xl rounded-br-lg"></div>
                 <div className="w-20 h-32 bg-pink-400 rounded-tr-3xl rounded-br-xl rounded-bl-lg"></div>
             </div>
             <div className="absolute bottom-10 w-full px-2">
                 <svg viewBox="0 0 100 40" className="w-full h-12 overflow-visible">
                     <path d={`M0,20 Q50,-${diaphragmCurve} 100,20 L100,40 L0,40 Z`} fill="#ef4444" stroke="#b91c1c" strokeWidth="2" />
                 </svg>
                 <div className="text-center text-xs font-bold text-red-700 mt-1">Diaphragm</div>
             </div>
             {inhaling && (
                <div className="absolute top-20 flex gap-4 animate-pulse">
                    <ArrowDown className="text-sky-500" size={32} strokeWidth={3} />
                    <ArrowDown className="text-sky-500" size={32} strokeWidth={3} />
                </div>
             )}
         </div>
      </div>

      <div className="w-full md:w-80 bg-white p-6 border-l border-slate-200">
         <h3 className="font-bold text-lg text-slate-800 mb-4">{language === Language.ENGLISH ? "Breathing Mechanism" : "श्वास क्रियाविधि"}</h3>
         
         <div className="mb-6">
            <label className="text-sm font-medium text-slate-600 block mb-2">{language === Language.ENGLISH ? "Diaphragm Position" : "डायाफ्राम की स्थिति"}</label>
            <input type="range" min="0" max="100" value={diaphragmLevel} onChange={(e) => setDiaphragmLevel(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-sky-600"/>
            <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>{language === Language.ENGLISH ? "Relaxed (Dome)" : "शिथिल (गुंबद)"}</span>
                <span>{language === Language.ENGLISH ? "Contracted (Flat)" : "संकुचित (सपाट)"}</span>
            </div>
         </div>

         <div className={`p-4 rounded-xl border-l-4 transition-colors ${inhaling ? 'bg-green-50 border-green-500' : 'bg-orange-50 border-orange-500'}`}>
            <h4 className={`font-bold ${inhaling ? 'text-green-800' : 'text-orange-800'}`}>
                {inhaling ? (language === Language.ENGLISH ? "INHALATION" : "अंतःश्वसन") : (language === Language.ENGLISH ? "EXHALATION" : "उच्छ्वसन")}
            </h4>
            <ul className="text-sm mt-2 space-y-2 opacity-80">
                <li>• <strong>Diaphragm:</strong> {inhaling ? (language === Language.ENGLISH ? "Moves Down (Contracts)" : "नीचे जाता है (संकुचन)") : (language === Language.ENGLISH ? "Moves Up (Relaxes)" : "ऊपर जाता है (शिथिल)")}</li>
                <li>• <strong>Volume:</strong> {inhaling ? (language === Language.ENGLISH ? "Increases" : "बढ़ता है") : (language === Language.ENGLISH ? "Decreases" : "घटता है")}</li>
                <li>• <strong>Pressure:</strong> {inhaling ? (language === Language.ENGLISH ? "Decreases (Air rushes IN)" : "घटता है (हवा अंदर आती है)") : (language === Language.ENGLISH ? "Increases (Air rushes OUT)" : "बढ़ता है (हवा बाहर जाती है)")}</li>
            </ul>
         </div>
      </div>
    </div>
  );
};

// --- TAB 3: CELLULAR RESPIRATION ---
const CellularRespirationTab = ({ language }: { language: Language }) => {
  const [hasOxygen, setHasOxygen] = useState(true);

  return (
    <div className="h-full flex flex-col md:flex-row">
       <div className="flex-1 bg-slate-900 flex flex-col items-center justify-center p-6">
           <div className={`w-full max-w-md p-6 rounded-2xl border-4 transition-all duration-500 ${hasOxygen ? 'bg-green-900/50 border-green-500' : 'bg-red-900/50 border-red-500'}`}>
               <h3 className="text-2xl font-bold text-white text-center mb-6">
                   {hasOxygen ? (language === Language.ENGLISH ? "Aerobic Respiration" : "ऑक्सी श्वसन") : (language === Language.ENGLISH ? "Anaerobic Respiration" : "अनॉक्सी श्वसन")}
               </h3>
               
               <div className="flex items-center justify-between text-white font-mono text-sm md:text-base">
                   <div className="text-center">
                       <div className="bg-white/10 p-2 rounded">Glucose</div>
                       <div className="text-xs text-slate-400 mt-1">C₆H₁₂O₆</div>
                   </div>
                   <div className="text-xl">+</div>
                   <div className="text-center">
                       <div className={`p-2 rounded transition-colors ${hasOxygen ? 'bg-sky-500/20 text-sky-300' : 'bg-slate-700 text-slate-500 line-through'}`}>Oxygen</div>
                       <div className="text-xs text-slate-400 mt-1">O₂</div>
                   </div>
                   <div className="text-xl">→</div>
                   <div className="text-center">
                       <div className={`p-2 rounded font-bold ${hasOxygen ? 'bg-yellow-500 text-black shadow-[0_0_15px_#eab308]' : 'bg-yellow-900 text-yellow-500'}`}>
                           {hasOxygen ? "38 ATP" : "2 ATP"}
                       </div>
                       <div className="text-xs text-slate-400 mt-1">{language === Language.ENGLISH ? "Energy" : "ऊर्जा"}</div>
                   </div>
               </div>

               {!hasOxygen && (
                   <div className="mt-6 bg-red-500/20 border border-red-500/50 p-3 rounded text-red-200 text-center text-sm">
                       ⚠️ {language === Language.ENGLISH ? "Produces Lactic Acid → Muscle Cramps" : "लैक्टिक अम्ल बनता है → मांसपेशियों में ऐंठन"}
                   </div>
               )}
               {hasOxygen && (
                   <div className="mt-6 bg-green-500/20 border border-green-500/50 p-3 rounded text-green-200 text-center text-sm">
                       ✅ {language === Language.ENGLISH ? "Occurs in Mitochondria. Complete breakdown." : "माइटोकॉन्ड्रिया में होता है। पूर्ण विखंडन।"}
                   </div>
               )}
           </div>

           <button 
             onClick={() => setHasOxygen(!hasOxygen)}
             className="mt-8 px-6 py-3 bg-white text-slate-900 font-bold rounded-full hover:scale-105 transition-transform"
           >
              {language === Language.ENGLISH ? "Toggle Oxygen Supply" : "ऑक्सीजन चालू/बंद करें"}
           </button>
       </div>
    </div>
  );
};

// --- TAB 4: FACTS ---
const FactsTab = ({ language }: { language: Language }) => {
  return (
    <div className="h-full p-6 overflow-y-auto bg-slate-50">
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {/* Gas Table */}
           <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-lg text-slate-800 mb-4">{language === Language.ENGLISH ? "Air Composition" : "वायु का संगठन"}</h3>
               <table className="w-full text-sm">
                   <thead className="bg-slate-100 text-slate-600">
                       <tr><th className="p-2 text-left">Gas</th><th className="p-2">Inhaled</th><th className="p-2">Exhaled</th></tr>
                   </thead>
                   <tbody className="divide-y">
                       <tr><td className="p-2 font-bold text-slate-700">Nitrogen</td><td className="p-2 text-center">78%</td><td className="p-2 text-center">78%</td></tr>
                       <tr><td className="p-2 font-bold text-green-700">Oxygen</td><td className="p-2 text-center font-bold">21%</td><td className="p-2 text-center text-red-600 font-bold">16%</td></tr>
                       <tr><td className="p-2 font-bold text-blue-700">CO₂</td><td className="p-2 text-center">0.04%</td><td className="p-2 text-center font-bold">4-5%</td></tr>
                   </tbody>
               </table>
           </div>

           {/* Diseases */}
           <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200">
               <h3 className="font-bold text-lg text-slate-800 mb-4">{language === Language.ENGLISH ? "Diseases (SSC)" : "प्रमुख रोग (SSC)"}</h3>
               <ul className="space-y-3 text-sm">
                   <li className="flex gap-2">
                       <AlertTriangle size={16} className="text-red-500 mt-0.5 flex-shrink-0"/>
                       <span>
                           <strong>Tuberculosis (TB):</strong> {language === Language.ENGLISH ? "Caused by Bacteria (Mycobacterium). Vaccine: BCG." : "जीवाणु (माइकोबैक्टीरियम) से होता है। टीका: BCG।"}
                       </span>
                   </li>
                   <li className="flex gap-2">
                       <AlertTriangle size={16} className="text-orange-500 mt-0.5 flex-shrink-0"/>
                       <span>
                           <strong>Pneumonia:</strong> {language === Language.ENGLISH ? "Fluid in Alveoli. Affects Lungs." : "एल्वियोली में पानी भरना। फेफड़ों को प्रभावित करता है।"}
                       </span>
                   </li>
                   <li className="flex gap-2">
                       <AlertTriangle size={16} className="text-blue-500 mt-0.5 flex-shrink-0"/>
                       <span>
                           <strong>Asthma:</strong> {language === Language.ENGLISH ? "Allergic reaction in Bronchi." : "श्वास नलियों में एलर्जी।"}
                       </span>
                   </li>
                   <li className="flex gap-2">
                       <AlertTriangle size={16} className="text-slate-500 mt-0.5 flex-shrink-0"/>
                       <span>
                           <strong>Emphysema:</strong> {language === Language.ENGLISH ? "Caused by Smoking. Damages Alveoli walls." : "धूम्रपान से होता है। एल्वियोली की दीवारें नष्ट हो जाती हैं।"}
                       </span>
                   </li>
               </ul>
           </div>
           
           <div className="md:col-span-2 bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex items-start gap-3">
               <Lightbulb className="text-indigo-600 mt-1 flex-shrink-0" />
               <div>
                   <h4 className="font-bold text-indigo-900 text-sm uppercase mb-1">Did You Know?</h4>
                   <p className="text-indigo-800 text-sm">
                       {language === Language.ENGLISH ? "The left lung is slightly smaller than the right lung to make space for the heart." : "बायां फेफड़ा दाएं फेफड़े से थोड़ा छोटा होता है ताकि दिल (हृदय) के लिए जगह बन सके।"}
                   </p>
               </div>
           </div>
       </div>
    </div>
  );
};

export default RespiratorySystem;
