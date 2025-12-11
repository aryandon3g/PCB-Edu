import React, { useState, useEffect } from 'react';
import { Sun, CloudRain, Wind, Hand, AlertCircle } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface PhotosynthesisProps {
  language: Language;
}

// SSC Exam Specific Data Enrichment
const PROCESS_DATA: Record<string, any> = {
  sun: {
    name: { en: "Sunlight (Photo)", hi: "सूर्य का प्रकाश (फोटो)" },
    scientist: { en: "Jan Ingenhousz", hi: "जन इंगेनहाउस" },
    ssc_fact: { 
        en: "Sunlight energy breaks down water molecules. This is called 'Photolysis of Water'.", 
        hi: "सूर्य की ऊर्जा पानी के अणुओं को तोड़ती है। इसे 'जल का प्रकाश-अपघटन' (Photolysis) कहते हैं।" 
    },
    trick: { en: "Source of Energy", hi: "ऊर्जा का स्रोत" },
    desc: { en: "Initiates the Light Reaction in the Grana of Chloroplasts.", hi: "यह क्लोरोप्लास्ट के 'ग्राना' (Grana) में प्रकाश अभिक्रिया शुरू करता है।" }
  },
  water: {
    name: { en: "Water (H₂O)", hi: "जल (H₂O)" },
    scientist: { en: "Van Helmont", hi: "वैन हेल्मोंट" },
    ssc_fact: { 
        en: "SSC IMP: The Oxygen (O₂) released comes from Water, NOT Carbon Dioxide.", 
        hi: "SSC प्रश्न: मुक्त होने वाली ऑक्सीजन (O₂) 'पानी' से आती है, कार्बन डाइऑक्साइड से नहीं।" 
    },
    trick: { en: "H donor", hi: "हाइड्रोजन दाता" },
    desc: { en: "Absorbed by Xylem tissues from roots.", hi: "जड़ों से 'जाइलम' (Xylem) ऊतकों द्वारा अवशोषित किया जाता है।" }
  },
  co2: {
    name: { en: "Carbon Dioxide (CO₂)", hi: "कार्बन डाइऑक्साइड" },
    scientist: { en: "Jean Senebier", hi: "जीन सेनेबियर" },
    ssc_fact: { 
        en: "Reduced to form Glucose in the 'Dark Reaction' (Calvin Cycle) inside Stroma.", 
        hi: "स्ट्रोमा (Stroma) के अंदर 'डार्क रिएक्शन' में ग्लूकोज बनाने के लिए इसका उपयोग होता है।" 
    },
    trick: { en: "Source of Carbon", hi: "कार्बन का स्रोत" },
    desc: { en: "Enters through Stomata. Essential for making sugar.", hi: "रंध्रों (Stomata) से प्रवेश करता है। शर्करा बनाने के लिए आवश्यक।" }
  },
  plant: {
    name: { en: "Chlorophyll", hi: "क्लोरोफिल (पर्णहरित)" },
    scientist: { en: "Simpson & Schimper", hi: "सिम्पसन और शिम्पर" },
    ssc_fact: { 
        en: "SSC MOST REPEATED: Contains 'Magnesium' (Mg) as the central metal ion.", 
        hi: "SSC में सबसे ज्यादा पूछा गया: इसके केंद्र में 'मैग्नीशियम' (Mg) धातु पाई जाती है।" 
    },
    trick: { en: "The Kitchen", hi: "कोशिका का रसोईघर" },
    desc: { en: "Found in Chloroplasts. Green pigment that traps light.", hi: "क्लोरोप्लास्ट में पाया जाता है। हरा वर्णक जो प्रकाश को फँसाता है।" }
  }
};

const Photosynthesis: React.FC<PhotosynthesisProps> = ({ language }) => {
  const [light, setLight] = useState(50);
  const [water, setWater] = useState(50);
  const [co2, setCo2] = useState(50);
  const [productionRate, setProductionRate] = useState(0);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  // Limiting Factor Logic (Liebig's Law of the Minimum)
  useEffect(() => {
    const rate = Math.min(light, water, co2);
    setProductionRate(rate);
  }, [light, water, co2]);

  const handleItemClick = (key: string) => {
      setSelectedItem(key);
  };

  const animSpeed = productionRate > 0 ? 5000 / (productionRate + 10) : 0;
  const currentInfo = selectedItem ? PROCESS_DATA[selectedItem] : null;

  return (
    <div className="flex flex-col h-auto lg:h-full gap-4">
      
      {/* SECTION 1: Chemical Equation Bar (SSC Important) */}
      <div className="bg-slate-900 text-white p-3 rounded-lg shadow-md flex items-center justify-center text-sm md:text-lg font-mono tracking-wider relative overflow-hidden flex-shrink-0">
         <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" style={{ transform: `translateX(${productionRate - 100}%)` }}></div>
         <span className={co2 < 30 ? "opacity-30" : "text-green-400"}>6CO₂</span>
         <span className="mx-2">+</span>
         <span className={water < 30 ? "opacity-30" : "text-blue-400"}>12H₂O</span>
         <span className="mx-2 text-yellow-500">→</span>
         <span className={productionRate < 30 ? "opacity-30" : "text-white font-bold"}>C₆H₁₂O₆ (Glucose)</span>
         <span className="mx-2">+</span>
         <span className={productionRate < 30 ? "opacity-30" : "text-sky-300"}>6O₂↑</span>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-full lg:min-h-0">
        
        {/* SECTION 2: Visualization */}
        <div className="w-full lg:flex-1 bg-gradient-to-b from-sky-300 to-sky-100 rounded-xl shadow-sm border border-slate-200 relative overflow-hidden flex flex-col items-center justify-end p-0 min-h-[400px]">
           
           <div className="absolute top-4 left-4 flex items-center gap-2 text-sky-900 text-xs font-semibold bg-white/60 p-2 rounded-lg backdrop-blur z-40">
              <Hand size={14} />
              {language === Language.ENGLISH ? "Tap elements to see SSC Facts" : "SSC तथ्य देखने के लिए टैप करें"}
           </div>

           {/* Sun */}
           <div 
              className={`absolute top-6 left-6 transition-all duration-500 cursor-pointer hover:scale-110 z-30 ${selectedItem === 'sun' ? 'scale-110 drop-shadow-[0_0_15px_rgba(255,255,0,0.8)]' : ''}`}
              style={{ opacity: 0.2 + (light / 100) * 0.8 }}
              onClick={() => handleItemClick('sun')}
           >
              <div className="w-24 h-24 bg-yellow-400 rounded-full shadow-[0_0_40px_rgba(250,204,21,0.8)] animate-pulse-slow flex items-center justify-center">
                  <Sun className="text-yellow-100 opacity-50" size={40} />
              </div>
           </div>

           {/* Clouds/Rain */}
           <div 
                className={`absolute top-10 right-10 flex gap-4 transition-all duration-500 cursor-pointer z-30 hover:scale-105 ${selectedItem === 'water' ? 'scale-110 drop-shadow-lg' : ''}`} 
                style={{ opacity: Math.max(0.3, water / 100) }}
                onClick={() => handleItemClick('water')}
            >
               <CloudRain size={56} className="text-slate-100 drop-shadow-md" />
           </div>

           {/* Rain Particles */}
           {water > 0 && (
               <div className="absolute inset-0 pointer-events-none overflow-hidden">
                   {Array.from({ length: Math.floor(water / 5) }).map((_, i) => (
                       <div key={i} className="absolute bg-blue-400 w-0.5 h-4 opacity-60 rounded-full"
                          style={{ left: `${Math.random() * 100}%`, top: `-20px`, animation: `fall ${1 + Math.random()}s linear infinite` }} 
                       />
                   ))}
               </div>
           )}

           {/* CO2 Particles */}
           <div className="absolute inset-0 z-20" onClick={() => handleItemClick('co2')}>
                {Array.from({ length: Math.floor(co2 / 5) }).map((_, i) => (
                    <div key={`co2-${i}`} className="absolute w-2 h-2 rounded-full bg-white/70 border border-slate-400/30 cursor-pointer hover:bg-slate-800"
                        style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 60}%`, animation: `float-particle ${5 + Math.random() * 5}s infinite ease-in-out` }}
                    />
                ))}
           </div>

           {/* Plant */}
           <div 
               className={`relative z-30 w-48 h-64 flex flex-col items-center justify-end cursor-pointer transition-transform ${selectedItem === 'plant' ? 'scale-105 brightness-110' : 'hover:scale-105'}`}
               onClick={() => handleItemClick('plant')}
           >
              <div className="w-4 h-32 bg-green-700 rounded-full relative">
                  {/* Leaves */}
                  <div className="absolute top-10 -left-12 w-16 h-8 bg-green-500 rounded-full rotate-[-20deg] border border-green-800 shadow-sm group"></div>
                  <div className="absolute top-16 -right-12 w-16 h-8 bg-green-500 rounded-full rotate-[20deg] border border-green-800 shadow-sm"></div>
                  
                  {/* Oxygen Animation */}
                  {productionRate > 10 && (
                      <>
                        <div className="absolute top-10 -left-6 w-3 h-3 bg-white rounded-full opacity-80 animate-bubble flex items-center justify-center text-[8px] text-sky-800 font-bold" style={{ animationDuration: `${animSpeed}s` }}>O₂</div>
                        <div className="absolute top-16 -right-6 w-3 h-3 bg-white rounded-full opacity-80 animate-bubble flex items-center justify-center text-[8px] text-sky-800 font-bold" style={{ animationDuration: `${animSpeed * 1.2}s`, animationDelay: '0.5s' }}>O₂</div>
                      </>
                  )}
              </div>
              <div className="absolute bottom-0 w-[150%] h-8 bg-amber-800 rounded-t-[50%]"></div>
           </div>

           {/* Ground Label */}
           <div className="w-full h-16 bg-amber-900/90 relative z-20 flex flex-col items-center justify-center border-t border-amber-950">
               <span className="text-amber-200/50 text-sm font-mono">ROOTS (XYLEM)</span>
           </div>
        </div>

        {/* SECTION 3: Controls & Information */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
          
          {/* Info Card (SSC Focused) */}
          {selectedItem && currentInfo && (
              <div className="bg-white rounded-xl shadow-lg border-2 border-sky-100 overflow-hidden animate-fade-in order-first">
                 <div className="bg-gradient-to-r from-sky-600 to-blue-600 p-3 text-white flex justify-between items-center">
                    <h3 className="font-bold flex items-center gap-2">
                        {language === Language.ENGLISH ? currentInfo.name.en : currentInfo.name.hi}
                    </h3>
                    <button onClick={() => setSelectedItem(null)} className="text-sky-200 hover:text-white bg-white/20 rounded-full w-6 h-6 flex items-center justify-center">&times;</button>
                 </div>
                 <div className="p-4 space-y-3">
                    
                    {/* Scientist Name */}
                    <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                        <span className="text-xs font-bold text-slate-400 uppercase">Discovered By</span>
                        <span className="text-sm font-semibold text-slate-700">{language === Language.ENGLISH ? currentInfo.scientist.en : currentInfo.scientist.hi}</span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-slate-600 leading-snug">
                         {language === Language.ENGLISH ? currentInfo.desc.en : currentInfo.desc.hi}
                    </p>

                    {/* SSC Important Fact Box */}
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-200 mt-2">
                        <div className="flex items-center gap-2 mb-1">
                            <AlertCircle size={14} className="text-red-500" />
                            <span className="text-xs font-bold text-red-600 uppercase tracking-wider">SSC Exam Fact</span>
                        </div>
                        <p className="text-sm text-slate-800 font-medium italic">
                            "{language === Language.ENGLISH ? currentInfo.ssc_fact.en : currentInfo.ssc_fact.hi}"
                        </p>
                    </div>
                 </div>
              </div>
          )}

          <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 space-y-5">
             {/* Production Rate Meter */}
             <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-xs font-bold text-slate-500 uppercase">{TRANSLATIONS.productionRate[language]}</span>
                    <span className={`text-xl font-bold ${productionRate < 30 ? 'text-red-500' : 'text-emerald-600'}`}>
                        {Math.round(productionRate)}%
                    </span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div className={`h-full transition-all duration-300 ${productionRate < 30 ? 'bg-red-400' : 'bg-emerald-500'}`} style={{ width: `${productionRate}%` }}></div>
                </div>
                <div className="text-[10px] text-slate-400 mt-1 text-right">
                    {productionRate < 100 ? (language === Language.ENGLISH ? "Limiting factor active" : "सीमित कारक सक्रिय") : "Optimal"}
                </div>
             </div>

             {/* Sliders */}
             {[
                 { label: TRANSLATIONS.lightIntensity[language], icon: Sun, color: "orange", val: light, set: setLight },
                 { label: TRANSLATIONS.waterLevel[language], icon: CloudRain, color: "blue", val: water, set: setWater },
                 { label: TRANSLATIONS.co2Level[language], icon: Wind, color: "slate", val: co2, set: setCo2 }
             ].map((item, idx) => (
                 <div key={idx}>
                    <div className="flex justify-between mb-2">
                       <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                           <item.icon size={16} className={`text-${item.color}-500`} /> {item.label}
                       </label>
                       <span className={`text-sm font-bold text-${item.color}-600`}>{item.val}%</span>
                    </div>
                    <input type="range" min="0" max="100" value={item.val} onChange={e => item.set(Number(e.target.value))} className={`w-full h-2 bg-slate-200 rounded-lg cursor-pointer accent-${item.color}-500`} />
                 </div>
             ))}
          </div>
        </div>

      </div>
      <style>{`
        @keyframes fall { to { transform: translateY(400px); } }
        @keyframes float-particle { 
            0% { transform: translate(0,0); } 
            50% { transform: translate(10px, -10px); } 
            100% { transform: translate(0,0); } 
        }
        @keyframes bubble {
            0% { transform: translateY(0) scale(0.5); opacity: 0; }
            50% { opacity: 1; }
            100% { transform: translateY(-40px) scale(1.2); opacity: 0; }
        }
        @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
        }
        .animate-pulse-slow { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
};
export default Photosynthesis;