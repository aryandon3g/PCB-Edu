import React, { useState, useEffect } from 'react';
import { Droplet, Circle, Activity, ShieldAlert, TestTube2, Wind, Syringe, Heart, Bug, User, Info, CheckCircle, Truck, Shield, Bandage, AlertTriangle, BookOpen, Lightbulb, Skull, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface BloodProps {
  language: Language;
}

// --- SSC EXAM FACTS DATA ---
const EXAM_FACTS = {
  volume: { en: "Normal Blood Volume: 5-6 Liters (7% of body weight)", hi: "सामान्य रक्त की मात्रा: 5-6 लीटर (शरीर के वजन का 7%)" },
  ph: { en: "pH of Blood: 7.4 (Slightly Alkaline/Basic)", hi: "रक्त का pH: 7.4 (हल्का क्षारीय)" },
  study: { en: "Study of Blood: Haematology", hi: "रक्त का अध्ययन: हेमेटोलॉजी (Haematology)" },
  day: { en: "Blood Donor Day: 14th June", hi: "रक्तदान दिवस: 14 जून" },
  spleen: { en: "Spleen is called 'Blood Bank' & 'Graveyard of RBC'.", hi: "प्लीहा (Spleen) को 'ब्लड बैंक' और 'RBC का कब्रिस्तान' कहा जाता है।" },
  heparin: { en: "Heparin prevents blood clotting INSIDE the body.", hi: "हेपरिन शरीर के 'अंदर' रक्त को जमने से रोकता है।" }
};

const Blood: React.FC<BloodProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'circulation' | 'composition' | 'rbc' | 'gas' | 'groups'>('circulation');

  return (
    <div className="flex flex-col h-full bg-slate-50 gap-4">
      {/* HEADER */}
      <div className="bg-red-700 p-4 rounded-xl shadow-md text-white flex justify-between items-center flex-shrink-0">
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">
            <Droplet className="fill-red-400 text-red-200" />
            {language === Language.ENGLISH ? "Blood Circulatory System" : "रक्त परिसंचरण तंत्र"}
          </h1>
          <p className="text-red-200 text-xs mt-1 font-mono">SSC MTS / RAILWAY PREPARATION MODE</p>
        </div>
        
        {/* Quick Facts Ticker */}
        <div className="hidden md:flex bg-red-800/50 px-4 py-2 rounded-lg text-xs items-center gap-4 border border-red-600">
            <span className="flex items-center gap-1"><Info size={12}/> {language === Language.ENGLISH ? EXAM_FACTS.ph.en : EXAM_FACTS.ph.hi}</span>
            <span className="w-px h-4 bg-red-500"></span>
            <span className="flex items-center gap-1"><BookOpen size={12}/> {language === Language.ENGLISH ? EXAM_FACTS.study.en : EXAM_FACTS.study.hi}</span>
        </div>
      </div>

      {/* TABS */}
      <div className="flex bg-white rounded-lg p-1 shadow-sm overflow-x-auto border border-slate-200 flex-shrink-0">
           {[
             {id: 'circulation', icon: Activity, label: {en: "Circulation", hi: "परिसंचरण तंत्र"}},
             {id: 'composition', icon: TestTube2, label: {en: "Composition", hi: "रक्त के घटक"}},
             {id: 'rbc', icon: Circle, label: {en: "RBC Cycle", hi: "RBC जीवन चक्र"}},
             {id: 'gas', icon: Wind, label: {en: "Gas Transport", hi: "गैस परिवहन"}},
             {id: 'groups', icon: Syringe, label: {en: "Blood Groups", hi: "रक्त समूह"}}
           ].map(tab => (
             <button 
               key={tab.id}
               onClick={() => setActiveTab(tab.id as any)}
               className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-md transition-all whitespace-nowrap text-sm font-bold ${activeTab === tab.id ? 'bg-red-50 text-red-700 shadow-sm border border-red-100' : 'text-slate-500 hover:bg-slate-50'}`}
             >
               <tab.icon size={16} className={activeTab === tab.id ? "fill-red-200" : ""} />
               <span>{language === Language.ENGLISH ? tab.label.en : tab.label.hi}</span>
             </button>
           ))}
      </div>

      {/* CONTENT AREA */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden relative">
         {activeTab === 'circulation' && <CirculationTab language={language} />}
         {activeTab === 'composition' && <CompositionTab language={language} />}
         {activeTab === 'rbc' && <RbcJourneyTab language={language} />}
         {activeTab === 'gas' && <GasTransportTab language={language} />}
         {activeTab === 'groups' && <BloodGroupsTab language={language} />}
      </div>
    </div>
  );
};

// --- HELPER COMPONENTS ---
const SSCFactCard = ({ text, language }: { text: { en: string, hi: string }, language: Language }) => (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded my-2 flex items-start gap-2">
        <Lightbulb className="text-yellow-600 flex-shrink-0 mt-0.5" size={16} />
        <div>
            <span className="text-[10px] font-bold text-yellow-700 uppercase tracking-wide block mb-0.5">SSC / Railway Exam Fact</span>
            <p className="text-sm text-slate-800 font-medium leading-snug">{language === Language.ENGLISH ? text.en : text.hi}</p>
        </div>
    </div>
);

// --- 1. CIRCULATION TAB (SIMPLIFIED) ---
const CirculationTab = ({ language }: { language: Language }) => {
  const [mode, setMode] = useState<'human' | 'insect'>('human');

  return (
    <div className="h-full flex flex-col md:flex-row">
       <div className="flex-1 relative bg-slate-50 flex flex-col items-center justify-center p-6 overflow-hidden">
          
          {mode === 'human' ? (
            <div className="relative text-center animate-fade-in">
               <div className="w-64 h-64 relative mx-auto mb-6">
                   {/* Simple Loop Visualization */}
                   <svg viewBox="0 0 200 200" className="w-full h-full">
                       <path d="M100,20 C160,20 180,80 180,100 C180,160 140,180 100,180" fill="none" stroke="#ef4444" strokeWidth="12" className="animate-pulse" />
                       <path d="M100,180 C60,180 20,160 20,100 C20,40 60,20 100,20" fill="none" stroke="#3b82f6" strokeWidth="12" className="animate-pulse" />
                       <Heart className="text-red-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" size={48} fill="currentColor" />
                       
                       {/* Moving dots */}
                       <circle r="4" fill="white"><animateMotion dur="2s" repeatCount="indefinite" path="M100,20 C160,20 180,80 180,100 C180,160 140,180 100,180" /></circle>
                       <circle r="4" fill="white"><animateMotion dur="2s" repeatCount="indefinite" path="M100,180 C60,180 20,160 20,100 C20,40 60,20 100,20" /></circle>
                   </svg>
                   <div className="absolute top-0 right-0 bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-bold">
                       {language === Language.ENGLISH ? "Artery (Pure)" : "धमनी (शुद्ध)"}
                   </div>
                   <div className="absolute bottom-0 left-0 bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-bold">
                       {language === Language.ENGLISH ? "Vein (Impure)" : "शिरा (अशुद्ध)"}
                   </div>
               </div>
               <h3 className="text-xl font-bold text-slate-800">{language === Language.ENGLISH ? "Closed Circulatory System" : "बंद परिसंचरण तंत्र"}</h3>
               <p className="text-slate-500 text-sm mt-1">{language === Language.ENGLISH ? "Blood flows inside pipes (Veins/Arteries)" : "रक्त नसों (पाइप) के अंदर बहता है"}</p>
            </div>
          ) : (
            <div className="relative text-center animate-fade-in">
                <div className="w-64 h-64 relative mx-auto mb-6 flex items-center justify-center">
                    <Bug size={120} className="text-slate-400" />
                    <div className="absolute inset-0 bg-blue-100/30 rounded-full animate-ping"></div>
                </div>
                <h3 className="text-xl font-bold text-slate-800">{language === Language.ENGLISH ? "Open Circulatory System" : "खुला परिसंचरण तंत्र"}</h3>
                <p className="text-slate-500 text-sm mt-1">{language === Language.ENGLISH ? "Blood flows openly in body cavity" : "रक्त खुले में बहता है (नसों में नहीं)"}</p>
            </div>
          )}

       </div>

       {/* INFO PANEL */}
       <div className="w-full md:w-80 bg-white p-6 border-l border-slate-200 overflow-y-auto">
          <div className="flex gap-2 mb-6">
              <button 
                onClick={() => setMode('human')} 
                className={`flex-1 py-2 rounded-lg border-2 font-bold text-sm ${mode === 'human' ? 'border-red-500 bg-red-50 text-red-700' : 'border-slate-200 text-slate-500'}`}
              >
                  {language === Language.ENGLISH ? "Human (Closed)" : "मानव (बंद)"}
              </button>
              <button 
                onClick={() => setMode('insect')} 
                className={`flex-1 py-2 rounded-lg border-2 font-bold text-sm ${mode === 'insect' ? 'border-slate-500 bg-slate-100 text-slate-700' : 'border-slate-200 text-slate-500'}`}
              >
                  {language === Language.ENGLISH ? "Insect (Open)" : "कीट (खुला)"}
              </button>
          </div>

          <div className="space-y-4">
              <SSCFactCard 
                language={language}
                text={{
                    en: "William Harvey (1628) discovered the Blood Circulation system.",
                    hi: "विलियम हार्वे (1628) ने रक्त परिसंचरण तंत्र की खोज की थी।"
                }} 
              />
              
              <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                  <h4 className="font-bold text-slate-800 mb-2 border-b pb-2">{language === Language.ENGLISH ? "Key Differences" : "मुख्य अंतर (SSC IMP)"}</h4>
                  <ul className="space-y-3 text-sm">
                      <li className="flex gap-2">
                          <span className="w-2 h-2 rounded-full bg-red-500 mt-1.5 flex-shrink-0"></span>
                          <span>
                              <strong>{language === Language.ENGLISH ? "Arteries (Dhamani):" : "धमनी (Artery):"}</strong> <br/>
                              {language === Language.ENGLISH ? "Carry Pure Blood (O2) AWAY from Heart." : "हृदय से शुद्ध रक्त (O2) अंगों तक ले जाती हैं।"}
                              <br/><span className="text-xs text-red-600 font-bold">{language === Language.ENGLISH ? "Exception: Pulmonary Artery" : "अपवाद: फुफ्फुसीय धमनी (अशुद्ध)"}</span>
                          </span>
                      </li>
                      <li className="flex gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                          <span>
                              <strong>{language === Language.ENGLISH ? "Veins (Shira):" : "शिरा (Vein):"}</strong> <br/>
                              {language === Language.ENGLISH ? "Carry Impure Blood (CO2) TOWARDS Heart." : "अंगों से अशुद्ध रक्त (CO2) हृदय तक लाती हैं।"}
                              <br/><span className="text-xs text-blue-600 font-bold">{language === Language.ENGLISH ? "Exception: Pulmonary Vein" : "अपवाद: फुफ्फुसीय शिरा (शुद्ध)"}</span>
                          </span>
                      </li>
                  </ul>
              </div>

              <div className="p-3 bg-blue-50 rounded-lg text-xs text-blue-800">
                 <strong>{language === Language.ENGLISH ? "Fact:" : "तथ्य:"}</strong> {language === Language.ENGLISH ? "Cockroach blood is white (No Hemoglobin). Octopus blood is blue (Haemocyanin - Copper)." : "कॉकरोच का खून सफेद होता है (हीमोग्लोबिन नहीं)। ऑक्टोपस का खून नीला होता है (हेमोसायनिन - तांबा)।"}
              </div>
          </div>
       </div>
    </div>
  )
}

// --- 2. COMPOSITION TAB (ANALOGY BASED) ---
const CompositionTab = ({ language }: { language: Language }) => {
  const [spun, setSpun] = useState(false);

  return (
    <div className="h-full flex flex-col md:flex-row">
       <div className="flex-1 bg-gradient-to-br from-slate-100 to-white flex flex-col items-center justify-center p-6 relative">
          
          {/* SIMULATION */}
          <div className="flex items-end gap-8">
              <div className="text-center">
                  <div className={`w-24 h-64 border-4 border-slate-300 rounded-b-3xl bg-red-600 relative overflow-hidden transition-all duration-1000 ${spun ? 'opacity-50' : 'opacity-100'}`}>
                       <div className="absolute inset-0 bg-red-600 flex items-center justify-center text-white font-bold opacity-80">{language === Language.ENGLISH ? "BLOOD" : "रक्त"}</div>
                  </div>
                  <p className="mt-2 font-bold text-slate-400">{language === Language.ENGLISH ? "Normal Blood" : "सामान्य रक्त"}</p>
              </div>

              <ArrowRight className={`text-slate-400 transition-all duration-500 ${spun ? 'opacity-100' : 'opacity-0'}`} />

              <div className="text-center">
                  <div className={`w-24 h-64 border-4 border-slate-300 rounded-b-3xl relative overflow-hidden transition-all duration-1000 ${spun ? 'scale-105 shadow-xl' : 'opacity-50 blur-sm'}`}>
                       {/* Plasma */}
                       <div className="h-[55%] bg-yellow-200 w-full flex items-center justify-center text-yellow-800 font-bold text-sm text-center px-1">
                           {language === Language.ENGLISH ? "Plasma 55%" : "प्लाज्मा 55%"}
                       </div>
                       {/* Buffy Coat */}
                       <div className="h-[1%] bg-white w-full"></div>
                       {/* Cells */}
                       <div className="h-[44%] bg-red-700 w-full flex items-center justify-center text-white font-bold text-sm text-center px-1">
                           {language === Language.ENGLISH ? "Cells 45%" : "कोशिकाएं 45%"}
                       </div>
                  </div>
                  <p className="mt-2 font-bold text-slate-800">{language === Language.ENGLISH ? "Separated" : "अलग किया हुआ"}</p>
              </div>
          </div>

          <button 
            onClick={() => setSpun(!spun)} 
            className="mt-8 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold shadow-lg transition-transform active:scale-95 flex items-center gap-2"
          >
             <Activity size={20} className={spun ? "" : "animate-spin"} />
             {spun ? (language === Language.ENGLISH ? "Reset" : "रीसेट करें") : (language === Language.ENGLISH ? "Spin Centrifuge" : "घुमाएं (Centrifuge)")}
          </button>
       </div>

       {/* INFO PANEL WITH ANALOGIES */}
       <div className="w-full md:w-96 bg-white p-6 border-l border-slate-200 overflow-y-auto">
          <h3 className="font-bold text-lg text-slate-800 mb-4">{language === Language.ENGLISH ? "Components & Analogies" : "घटक और उदाहरण"}</h3>
          
          <div className="space-y-4">
              {/* PLASMA */}
              <div className="bg-yellow-50 p-3 rounded-xl border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                      <Droplet className="text-yellow-600" size={20} />
                      <h4 className="font-bold text-yellow-800">{language === Language.ENGLISH ? "Plasma (55%)" : "प्लाज्मा (55%)"}</h4>
                  </div>
                  <p className="text-xs text-slate-600 mb-2">{language === Language.ENGLISH ? "The liquid part. 90% Water." : "तरल भाग। 90% पानी होता है।"}</p>
                  <ul className="text-xs space-y-1 text-slate-700">
                      <li>• <strong>{language === Language.ENGLISH ? "Fibrinogen:" : "फाइब्रिनोजेन:"}</strong> {language === Language.ENGLISH ? "Helps in clotting (Glue)." : "रक्त जमाने में मदद करता है (गोंद)।"}</li>
                      <li>• <strong>{language === Language.ENGLISH ? "Globulin:" : "ग्लोबुलिन:"}</strong> {language === Language.ENGLISH ? "Immunity (Defense)." : "रोग प्रतिरोधक क्षमता (रक्षा)।"}</li>
                      <li>• <strong>{language === Language.ENGLISH ? "Color:" : "रंग:"}</strong> {language === Language.ENGLISH ? "Pale Yellow (Due to Bilirubin)." : "हल्का पीला (बिलीरुबिन के कारण)।"}</li>
                  </ul>
              </div>

              {/* RBC */}
              <div className="bg-red-50 p-3 rounded-xl border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                      <Truck className="text-red-600" size={20} />
                      <div>
                          <h4 className="font-bold text-red-800">{language === Language.ENGLISH ? "RBC (Erythrocytes)" : "RBC (एरिथ्रोसाइट्स - लाल रक्त कण)"}</h4>
                          <span className="text-[10px] bg-red-200 text-red-800 px-1.5 rounded">{language === Language.ENGLISH ? "The Delivery Truck" : "डिलीवरी ट्रक"}</span>
                      </div>
                  </div>
                  <ul className="text-xs space-y-1 text-slate-700 list-disc pl-4">
                      <li><strong>{language === Language.ENGLISH ? "Work:" : "कार्य:"}</strong> {language === Language.ENGLISH ? "Transports Oxygen (O2)." : "ऑक्सीजन (O2) पहुँचाना।"}</li>
                      <li><strong>{language === Language.ENGLISH ? "Contains:" : "इसमें है:"}</strong> {language === Language.ENGLISH ? "Hemoglobin (Iron/Fe)." : "हीमोग्लोबिन (लोहा/Fe)।"}</li>
                      <li><strong>{language === Language.ENGLISH ? "Fact:" : "तथ्य:"}</strong> {language === Language.ENGLISH ? "No Nucleus (Brainless) to store more O2." : "इसमें केंद्रक (Brain) नहीं होता ताकि ज्यादा O2 आ सके।"}</li>
                      <li><strong>{language === Language.ENGLISH ? "Disease:" : "बीमारी:"}</strong> {language === Language.ENGLISH ? "Anemia (Low RBC)." : "एनीमिया (खून की कमी)।"}</li>
                  </ul>
              </div>

              {/* WBC */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                      <Shield className="text-slate-600" size={20} />
                      <div>
                          <h4 className="font-bold text-slate-800">{language === Language.ENGLISH ? "WBC (Leukocytes)" : "WBC (ल्यूकोसाइट्स - श्वेत कण)"}</h4>
                          <span className="text-[10px] bg-slate-200 text-slate-800 px-1.5 rounded">{language === Language.ENGLISH ? "The Bodyguard / Soldier" : "सिपाही / बॉडीगार्ड"}</span>
                      </div>
                  </div>
                  <ul className="text-xs space-y-1 text-slate-700 list-disc pl-4">
                      <li><strong>{language === Language.ENGLISH ? "Work:" : "कार्य:"}</strong> {language === Language.ENGLISH ? "Fights infections/virus." : "संक्रमण/वायरस से लड़ना।"}</li>
                      <li><strong>{language === Language.ENGLISH ? "Shape:" : "आकार:"}</strong> {language === Language.ENGLISH ? "Irregular (Like Amoeba)." : "अनिश्चित (अमीबा जैसा)।"}</li>
                      <li><strong>{language === Language.ENGLISH ? "Disease:" : "बीमारी:"}</strong> {language === Language.ENGLISH ? "Leukemia (Blood Cancer - High WBC)." : "ल्यूकेमिया (ब्लड कैंसर - ज्यादा WBC)।"}</li>
                  </ul>
              </div>

              {/* PLATELETS */}
              <div className="bg-purple-50 p-3 rounded-xl border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                      <Bandage className="text-purple-600" size={20} />
                      <div>
                          <h4 className="font-bold text-purple-800">{language === Language.ENGLISH ? "Platelets (Thrombocytes)" : "प्लेटलेट्स (थ्रोम्बोसाइट्स)"}</h4>
                          <span className="text-[10px] bg-purple-200 text-purple-800 px-1.5 rounded">{language === Language.ENGLISH ? "The Repair Crew" : "मरम्मत दल"}</span>
                      </div>
                  </div>
                  <ul className="text-xs space-y-1 text-slate-700 list-disc pl-4">
                      <li><strong>{language === Language.ENGLISH ? "Work:" : "कार्य:"}</strong> {language === Language.ENGLISH ? "Clots blood (stops bleeding)." : "खून जमाना (रक्तस्राव रोकना)।"}</li>
                      <li><strong>{language === Language.ENGLISH ? "Fact:" : "तथ्य:"}</strong> {language === Language.ENGLISH ? "Dengue fever kills Platelets." : "डेंगू बुखार में प्लेटलेट्स कम हो जाते हैं।"}</li>
                  </ul>
              </div>
          </div>
       </div>
    </div>
  )
}

// --- 3. RBC JOURNEY TAB (STORY MODE) ---
const RbcJourneyTab = ({ language }: { language: Language }) => {
   const [step, setStep] = useState(0);

   const STEPS = [
       { 
           title: { en: "1. Birth (The Factory)", hi: "1. जन्म (फैक्ट्री)" },
           desc: { en: "RBC is born in the Red Bone Marrow of long bones.", hi: "RBC का जन्म लंबी हड्डियों के 'लाल अस्थि मज्जा' (Red Bone Marrow) में होता है।" },
           icon: CheckCircle,
           color: "green"
       },
       { 
           title: { en: "2. Life (The Job)", hi: "2. जीवन (काम)" },
           desc: { en: "It lives for 120 Days. It travels the body delivering Oxygen.", hi: "यह 120 दिनों तक जीवित रहता है। पूरे शरीर में ऑक्सीजन पहुंचाता है।" },
           icon: Truck,
           color: "blue"
       },
       { 
           title: { en: "3. Death (The Graveyard)", hi: "3. मृत्यु (कब्रिस्तान)" },
           desc: { en: "It dies in the Spleen. Spleen is called 'Graveyard of RBC'.", hi: "यह 'प्लीहा' (Spleen) में मरता है। प्लीहा को 'RBC का कब्रिस्तान' कहते हैं।" },
           icon: Skull,
           color: "red"
       }
   ];

   return (
      <div className="h-full flex flex-col md:flex-row p-6 gap-6 bg-rose-50/50">
         {/* LEFT VISUAL */}
         <div className="flex-1 flex flex-col items-center justify-center gap-8">
             <div className="flex items-center gap-4 w-full justify-center">
                 {STEPS.map((s, i) => (
                     <div key={i} className="flex items-center">
                         <button 
                            onClick={() => setStep(i)}
                            className={`w-12 h-12 rounded-full flex items-center justify-center border-4 transition-all ${step === i ? `border-${s.color}-500 bg-white scale-110 shadow-lg` : 'border-slate-200 bg-slate-100 opacity-60'}`}
                         >
                             <s.icon size={20} className={`text-${s.color}-600`} />
                         </button>
                         {i < 2 && <div className={`w-16 h-1 bg-slate-200 ${step > i ? 'bg-green-400' : ''}`}></div>}
                     </div>
                 ))}
             </div>

             {/* MAIN CARD */}
             <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 max-w-md w-full text-center animate-scale-up">
                 <div className={`w-16 h-16 mx-auto rounded-full bg-${STEPS[step].color}-100 flex items-center justify-center mb-4`}>
                     <StepsIcon step={STEPS[step]} size={32} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-800 mb-2">{language === Language.ENGLISH ? STEPS[step].title.en : STEPS[step].title.hi}</h2>
                 <p className="text-slate-600 mb-6">{language === Language.ENGLISH ? STEPS[step].desc.en : STEPS[step].desc.hi}</p>
                 
                 <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 text-left">
                     <span className="text-[10px] font-bold text-yellow-700 uppercase block mb-1">{language === Language.ENGLISH ? "Exam Note" : "परीक्षा नोट"}</span>
                     {step === 0 && <p className="text-xs text-slate-800">{language === Language.ENGLISH ? "In Embryo (fetus), RBC forms in " : "भ्रूण (Fetus) अवस्था में, RBC का निर्माण "}<strong>{language === Language.ENGLISH ? "Liver" : "यकृत (Liver)"}</strong>{language === Language.ENGLISH ? "." : " में होता है।"}</p>}
                     {step === 1 && <p className="text-xs text-slate-800">{language === Language.ENGLISH ? "RBC Count: Measured by " : "RBC की संख्या: "}<strong>{language === Language.ENGLISH ? "Haemocytometer" : "हीमोसाइटोमीटर"}</strong>{language === Language.ENGLISH ? "." : " द्वारा मापी जाती है।"}</p>}
                     {step === 2 && <p className="text-xs text-slate-800">{language === Language.ENGLISH ? "Liver breaks down dead RBC into " : "यकृत मृत RBC को तोड़कर "}<strong>{language === Language.ENGLISH ? "Bile Juice" : "पित्त रस (Bile Juice)"}</strong>{language === Language.ENGLISH ? " (Yellow)." : " (पीला) बनाता है।"}</p>}
                 </div>
             </div>
         </div>
      </div>
   )
}
// Helper to render icon dynamically
const StepsIcon = ({step, size}: {step: any, size: number}) => { const I = step.icon; return <I size={size} className={`text-${step.color}-600`}/> }


// --- 4. GAS TRANSPORT TAB (BUS ANALOGY) ---
const GasTransportTab = ({ language }: { language: Language }) => {
   const [passenger, setPassenger] = useState<'none' | 'O2' | 'CO2' | 'CO'>('none');

   return (
      <div className="h-full flex flex-col md:flex-row">
         <div className="flex-1 bg-white flex flex-col items-center justify-center p-8 relative">
            
            {/* THE BUS (HEMOGLOBIN) */}
            <div className="relative">
                <div className={`w-64 h-32 rounded-3xl border-4 transition-colors duration-500 flex items-center justify-center relative shadow-xl ${
                    passenger === 'O2' ? 'bg-red-500 border-red-700' : 
                    passenger === 'CO2' ? 'bg-blue-600 border-blue-800' : 
                    passenger === 'CO' ? 'bg-pink-500 border-pink-700' : 'bg-slate-300 border-slate-400'
                }`}>
                    <div className="text-white font-bold text-2xl drop-shadow-md flex flex-col items-center">
                        <Truck size={40} className="mb-1" />
                        <span>{language === Language.ENGLISH ? "Hemoglobin Bus" : "हीमोग्लोबिन बस"}</span>
                    </div>

                    {/* WHEELS */}
                    <div className="absolute -bottom-4 left-8 w-10 h-10 bg-black rounded-full border-4 border-slate-500"></div>
                    <div className="absolute -bottom-4 right-8 w-10 h-10 bg-black rounded-full border-4 border-slate-500"></div>
                </div>

                {/* PASSENGER VISUAL */}
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-500 ${passenger !== 'none' ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className={`px-4 py-2 rounded-lg font-bold text-white shadow-lg whitespace-nowrap ${
                        passenger === 'O2' ? 'bg-red-600' : 
                        passenger === 'CO2' ? 'bg-blue-700' : 
                        'bg-pink-600'
                    }`}>
                        {passenger === 'O2' 
                            ? (language === Language.ENGLISH ? "OXYGEN (Pure)" : "ऑक्सीजन (शुद्ध)") 
                            : passenger === 'CO2' 
                                ? (language === Language.ENGLISH ? "CO2 (Waste)" : "CO2 (कचरा)") 
                                : (language === Language.ENGLISH ? "CO (POISON)" : "CO (जहर)")
                        }
                    </div>
                </div>
            </div>

            <div className="mt-12 text-center max-w-md">
                <h3 className="text-xl font-bold text-slate-800 mb-2">
                    {passenger === 'none' && (language === Language.ENGLISH ? "Empty Bus" : "खाली बस")}
                    {passenger === 'O2' && (language === Language.ENGLISH ? "Oxy-Hemoglobin (Fresh)" : "ऑक्सी-हीमोग्लोबिन (ताज़ा)")}
                    {passenger === 'CO2' && (language === Language.ENGLISH ? "Carbamino-Hemoglobin (Dirty)" : "कार्बामिनो-हीमोग्लोबिन (गंदा)")}
                    {passenger === 'CO' && (language === Language.ENGLISH ? "Carboxy-Hemoglobin (Deadly)" : "कार्बोक्सी-हीमोग्लोबिन (जानलेवा)")}
                </h3>
                <p className="text-slate-500 text-sm">
                    {passenger === 'CO' ? 
                        (language === Language.ENGLISH ? "Carbon Monoxide binds 200x faster! It hijacks the bus and doesn't let go. Suffocation occurs." : "कार्बन मोनोऑक्साइड 200 गुना तेजी से जुड़ता है! यह बस को हाईजैक कर लेता है और दम घुटने लगता है।") :
                        (language === Language.ENGLISH ? "Hemoglobin (Fe) carries gases through the blood." : "हीमोग्लोबिन (आयरन) रक्त के माध्यम से गैसों का परिवहन करता है।")
                    }
                </p>
            </div>
         </div>

         {/* CONTROLS */}
         <div className="w-full md:w-80 bg-slate-50 p-6 border-l border-slate-200">
            <h3 className="font-bold text-slate-800 mb-4 uppercase text-xs tracking-wider">{language === Language.ENGLISH ? "Load Passenger" : "यात्री बैठाएं"}</h3>
            
            <div className="space-y-3">
               <button onClick={() => setPassenger('O2')} className="w-full p-4 rounded-xl bg-white border border-slate-200 hover:border-red-400 hover:shadow-md flex items-center gap-3 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center font-bold group-hover:bg-red-600 group-hover:text-white transition-colors">O₂</div>
                  <div className="text-left">
                     <div className="font-bold text-slate-800">{language === Language.ENGLISH ? "Oxygen" : "ऑक्सीजन"}</div>
                     <div className="text-xs text-slate-500">{language === Language.ENGLISH ? "Normal (Lungs to Body)" : "सामान्य (फेफड़ों से शरीर)"}</div>
                  </div>
               </button>

               <button onClick={() => setPassenger('CO2')} className="w-full p-4 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:shadow-md flex items-center gap-3 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition-colors">CO₂</div>
                  <div className="text-left">
                     <div className="font-bold text-slate-800">{language === Language.ENGLISH ? "Carbon Dioxide" : "कार्बन डाइऑक्साइड"}</div>
                     <div className="text-xs text-slate-500">{language === Language.ENGLISH ? "Waste (Body to Lungs)" : "कचरा (शरीर से फेफड़े)"}</div>
                  </div>
               </button>

               <button onClick={() => setPassenger('CO')} className="w-full p-4 rounded-xl bg-pink-50 border-2 border-pink-200 hover:border-pink-500 flex items-center gap-3 transition-all group">
                  <div className="w-8 h-8 rounded-full bg-pink-600 text-white flex items-center justify-center font-bold animate-pulse">CO</div>
                  <div className="text-left">
                     <div className="font-bold text-pink-700">{language === Language.ENGLISH ? "Carbon Monoxide" : "कार्बन मोनोऑक्साइड"}</div>
                     <div className="text-xs text-pink-600 font-bold">{language === Language.ENGLISH ? "⚠️ DANGER (Smoke)" : "⚠️ खतरा (धुआं)"}</div>
                  </div>
               </button>
            </div>

            <div className="mt-6">
                <SSCFactCard 
                    language={language}
                    text={{
                        en: "Hemoglobin is a Protein containing IRON (Fe). Its affinity for CO is 200 times more than Oxygen.",
                        hi: "हीमोग्लोबिन एक प्रोटीन है जिसमें लोहा (Fe) होता है। CO (धुआं) के प्रति इसका आकर्षण ऑक्सीजन से 200 गुना अधिक है।"
                    }}
                />
            </div>
         </div>
      </div>
   )
}

// --- 5. BLOOD GROUPS TAB (CHEAT SHEET + GAME) ---
const BloodGroupsTab = ({ language }: { language: Language }) => {
   const [showTable, setShowTable] = useState(false);

   return (
      <div className="h-full flex flex-col p-6 bg-slate-50 overflow-y-auto">
         <div className="flex justify-between items-center mb-6">
             <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                 <Syringe className="text-red-600" />
                 {language === Language.ENGLISH ? "Blood Groups (ABO System)" : "रक्त समूह (ABO)"}
             </h2>
             <button 
                onClick={() => setShowTable(!showTable)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-bold shadow hover:bg-indigo-700 transition-colors"
             >
                 {showTable ? (language === Language.ENGLISH ? "Hide Cheat Sheet" : "तालिका छिपाएं") : (language === Language.ENGLISH ? "Show Cheat Sheet (SSC)" : "तालिका देखें (SSC)")}
             </button>
         </div>

         {/* CHEAT SHEET TABLE (SSC FAQ) */}
         {showTable && (
             <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 mb-6 animate-slide-down">
                 <table className="w-full text-sm text-left">
                     <thead className="bg-slate-100 text-slate-700 uppercase">
                         <tr>
                             <th className="p-2">{language === Language.ENGLISH ? "Group" : "समूह"}</th>
                             <th className="p-2">{language === Language.ENGLISH ? "Antigen (On RBC)" : "एंटीजन (RBC पर)"}</th>
                             <th className="p-2">{language === Language.ENGLISH ? "Antibody (In Plasma)" : "एंटीबॉडी (प्लाज्मा में)"}</th>
                             <th className="p-2">{language === Language.ENGLISH ? "Give To" : "किसे दे सकता है"}</th>
                             <th className="p-2">{language === Language.ENGLISH ? "Take From" : "किससे ले सकता है"}</th>
                         </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-100">
                         <tr><td className="p-2 font-bold">A</td><td>A</td><td>b</td><td>A, AB</td><td>A, O</td></tr>
                         <tr><td className="p-2 font-bold">B</td><td>B</td><td>a</td><td>B, AB</td><td>B, O</td></tr>
                         <tr className="bg-green-50"><td className="p-2 font-bold text-green-700">AB+ ({language === Language.ENGLISH ? "Universal Receiver" : "सर्वग्राही"})</td><td>A, B</td><td>{language === Language.ENGLISH ? "None" : "कोई नहीं"}</td><td>AB</td><td>{language === Language.ENGLISH ? "ALL" : "सभी"}</td></tr>
                         <tr className="bg-blue-50"><td className="p-2 font-bold text-blue-700">O- ({language === Language.ENGLISH ? "Universal Donor" : "सर्वदाता"})</td><td>{language === Language.ENGLISH ? "None" : "कोई नहीं"}</td><td>a, b</td><td>{language === Language.ENGLISH ? "ALL" : "सभी"}</td><td>O</td></tr>
                     </tbody>
                 </table>
             </div>
         )}

         {/* FACTS GRID */}
         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
             <div className="bg-blue-100 p-4 rounded-xl border border-blue-200 flex items-center gap-4">
                 <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl">O-</div>
                 <div>
                     <h3 className="font-bold text-blue-900">{language === Language.ENGLISH ? "Universal Donor" : "सर्वदाता (Universal Donor)"}</h3>
                     <p className="text-xs text-blue-800">{language === Language.ENGLISH ? "Can give blood to ANYONE. Has no Antigens." : "किसी को भी रक्त दे सकता है। इसमें कोई एंटीजन नहीं होता।"}</p>
                 </div>
             </div>
             <div className="bg-green-100 p-4 rounded-xl border border-green-200 flex items-center gap-4">
                 <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xl">AB+</div>
                 <div>
                     <h3 className="font-bold text-green-900">{language === Language.ENGLISH ? "Universal Recipient" : "सर्वग्राही (Universal Recipient)"}</h3>
                     <p className="text-xs text-green-800">{language === Language.ENGLISH ? "Can take blood from ANYONE. Has no Antibodies." : "किसी से भी रक्त ले सकता है। इसमें कोई एंटीबॉडी नहीं होती।"}</p>
                 </div>
             </div>
         </div>

         {/* DISCOVERY INFO */}
         <div className="bg-white p-6 rounded-xl border border-slate-200">
             <h3 className="font-bold text-slate-800 mb-4 border-b pb-2">{language === Language.ENGLISH ? "Scientists to Remember" : "महत्वपूर्ण वैज्ञानिक"}</h3>
             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <div className="flex gap-3">
                     <User className="text-slate-400" />
                     <div>
                         <div className="font-bold text-slate-700">Karl Landsteiner (1900)</div>
                         <div className="text-xs text-slate-500">{language === Language.ENGLISH ? "Discovered A, B, O groups. Nobel Prize winner." : "A, B, O समूहों की खोज की। नोबेल पुरस्कार विजेता।"}</div>
                     </div>
                 </div>
                 <div className="flex gap-3">
                     <User className="text-slate-400" />
                     <div>
                         <div className="font-bold text-slate-700">Decastello & Sturli (1902)</div>
                         <div className="text-xs text-slate-500">{language === Language.ENGLISH ? "Discovered AB group." : "AB समूह की खोज की।"}</div>
                     </div>
                 </div>
                 <div className="flex gap-3">
                     <User className="text-slate-400" />
                     <div>
                         <div className="font-bold text-slate-700">Weiner & Landsteiner (1940)</div>
                         <div className="text-xs text-slate-500">{language === Language.ENGLISH ? "Discovered " : "रिसस बंदर में "}<strong>{language === Language.ENGLISH ? "Rh Factor" : "Rh फैक्टर"}</strong>{language === Language.ENGLISH ? " in Rhesus Monkey." : " की खोज की।"}</div>
                     </div>
                 </div>
             </div>
         </div>
         
         <div className="mt-4 p-4 bg-rose-50 rounded-lg text-sm text-rose-800 border border-rose-100">
             <strong>{language === Language.ENGLISH ? "Erythroblastosis Fetalis:" : "एरिथ्रोब्लास्टोसिस फेटालिस:"}</strong> {language === Language.ENGLISH ? "A condition where Rh- Mother carries Rh+ Baby. Dangerous for 2nd baby." : "एक स्थिति जहाँ Rh- माँ के गर्भ में Rh+ शिशु होता है। यह दूसरे बच्चे के लिए खतरनाक है।"}
         </div>
      </div>
   )
}

export default Blood;