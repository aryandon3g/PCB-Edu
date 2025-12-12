import React, { useState } from 'react';
import { Info, Hand, Lightbulb, User, BookOpen, ZoomIn, ZoomOut, ArrowLeft } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface PlantCellProps {
  language: Language;
}

// Educational Data Structure
const CELL_DATA: Record<string, any> = {
  nucleus: {
    name: { en: "Nucleus", hi: "केंद्रक (Nucleus)" },
    scientist: { en: "Robert Brown (1831)", hi: "रॉबर्ट ब्राउन (1831)" },
    trick: { en: "The Brain / Boss", hi: "कोशिका का 'दिमाग' या 'बॉस'" },
    desc: { 
      en: "It controls all cell activities and contains DNA. Tap 'Zoom Inside' to see what's inside!", 
      hi: "यह कोशिका की सभी गतिविधियों को नियंत्रित करता है। अंदर देखने के लिए 'अंदर देखें' पर क्लिक करें!" 
    }
  },
  mitochondria: {
    name: { en: "Mitochondria", hi: "सूत्रकणिका (Mitochondria)" },
    scientist: { en: "Richard Altmann (1890)", hi: "रिचर्ड ऑल्टमैन (1890)" },
    trick: { en: "Mighty Powerhouse", hi: "कोशिका का 'बिजली घर' (Powerhouse)" },
    desc: { 
      en: "It breaks down sugar to create energy (ATP). It is the engine of the cell.", 
      hi: "यह ऊर्जा (ATP) बनाने के लिए चीनी को तोड़ता है। यह कोशिका का इंजन है।" 
    }
  },
  chloroplast: {
    name: { en: "Chloroplast", hi: "हरितलवक (Chloroplast)" },
    scientist: { en: "Hugo von Mohl (1837)", hi: "ह्यूगो वॉन मोहल (1837)" },
    trick: { en: "The Kitchen / Chef", hi: "कोशिका का 'रसोई घर'" },
    desc: { 
      en: "It contains chlorophyll and makes food using sunlight (Photosynthesis). Found only in plants.", 
      hi: "इसमें क्लोरोफिल होता है और यह सूर्य के प्रकाश (प्रकाश संश्लेषण) का उपयोग करके भोजन बनाता है। केवल पौधों में पाया जाता है।" 
    }
  },
  vacuole: {
    name: { en: "Vacuole", hi: "रिक्तिका (Vacuole)" },
    scientist: { en: "Felix Dujardin (1841)", hi: "फेलिक्स डुजार्डिन (1841)" },
    trick: { en: "Vacuum Storage Bag", hi: "स्टोरेज बैग या गोदाम" },
    desc: { 
      en: "A large sac that stores water, food, and waste. It helps keep the plant upright by maintaining pressure.", 
      hi: "एक बड़ी थैली जो पानी, भोजन और अपशिष्ट जमा करती है। यह पौधे को सीधा रखने में मदद करता है।" 
    }
  },
  cellWall: {
    name: { en: "Cell Wall", hi: "कोशिका भित्ति (Cell Wall)" },
    scientist: { en: "Robert Hooke (1665)", hi: "रॉबर्ट हुक (1665)" },
    trick: { en: "The Fortress Wall", hi: "मजबूत दीवार / किला" },
    desc: { 
      en: "A tough outer layer made of cellulose. It protects the cell and gives it shape.", 
      hi: "सेल्यूलोज से बनी एक कठोर बाहरी परत। यह कोशिका की रक्षा करती है और उसे आकार देती है।" 
    }
  },
  // Deep Dive Parts
  nucleolus: {
    name: { en: "Nucleolus", hi: "केंद्रिका (Nucleolus)" },
    scientist: { en: "Felice Fontana (1781)", hi: "फेलिस फोंटाना (1781)" },
    trick: { en: "Ribosome Factory", hi: "राइबोसोम फैक्ट्री" },
    desc: { en: "A dense region inside the nucleus that produces ribosomes.", hi: "केंद्रक के अंदर एक घना क्षेत्र जो राइबोसोम का उत्पादन करता है।" }
  },
  chromatin: {
    name: { en: "Chromatin (DNA)", hi: "क्रोमैटिन (DNA)" },
    scientist: { en: "Walther Flemming (1879)", hi: "वाल्थर फ्लेमिंग (1879)" },
    trick: { en: "Noodle Recipe Book", hi: "नूडल्स जैसी रेसिपी बुक" },
    desc: { en: "Thread-like structures containing genetic instructions (DNA).", hi: "धागे जैसी संरचनाएं जिनमें आनुवंशिक निर्देश (DNA) होते हैं।" }
  },
  nuclearPore: {
    name: { en: "Nuclear Pore", hi: "केंद्रक छिद्र" },
    scientist: { en: "Callan & Tomlin (1950)", hi: "कालन और टॉमलिन" },
    trick: { en: "The Gatekeeper", hi: "दरवाजा / गेटकीपर" },
    desc: { en: "Holes in the nuclear membrane that allow RNA and proteins to pass.", hi: "केंद्रक झिल्ली में छेद जो RNA और प्रोटीन को गुजरने देते हैं।" }
  }
};

const PlantCell: React.FC<PlantCellProps> = ({ language }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [view, setView] = useState<'cell' | 'nucleus'>('cell');

  const handlePartClick = (partKey: string) => {
    setSelectedPart(partKey);
  };

  const toggleView = () => {
    if (view === 'cell') {
      setView('nucleus');
      setSelectedPart('nucleolus');
      setZoomLevel(1);
    } else {
      setView('cell');
      setSelectedPart('nucleus');
      setZoomLevel(1);
    }
  };

  const currentInfo = selectedPart ? CELL_DATA[selectedPart] : null;

  return (
    <div className="flex flex-col h-auto md:h-full landscape:h-full gap-4 md:gap-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm gap-2 flex-shrink-0">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            {view === 'cell' ? TRANSLATIONS.plantCell[language] : (language === Language.ENGLISH ? "Inside the Nucleus" : "केंद्रक के अंदर")}
            {view === 'nucleus' && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">Deep Zoom</span>}
        </h2>
        <div className="flex items-center gap-2 w-full sm:w-auto">
             <ZoomOut size={18} className="text-slate-400"/>
             <input 
                type="range" min="1" max="3" step="0.1" 
                value={zoomLevel} onChange={e => setZoomLevel(Number(e.target.value))}
                className="flex-1 sm:w-32 h-2 bg-slate-200 rounded-lg accent-indigo-600 cursor-pointer"
             />
             <ZoomIn size={18} className="text-slate-400"/>
        </div>
      </div>

      <div className="flex flex-col md:flex-row landscape:flex-row gap-6 h-auto md:flex-1 landscape:flex-1 min-h-0">
        
        {/* Visualization Window */}
        <div className="w-full md:flex-1 bg-emerald-50 rounded-xl shadow-inner border border-emerald-100 relative overflow-hidden flex items-center justify-center min-h-[350px] landscape:min-h-0 md:h-auto">
           
           <div className="absolute top-4 left-4 flex items-center gap-2 text-emerald-800 text-xs sm:text-sm font-semibold bg-white/80 p-2 rounded-lg backdrop-blur z-20 shadow-sm pointer-events-none">
              <Hand size={16} />
              {TRANSLATIONS.clickToExplore[language]}
           </div>

           {/* Animated Transformation Group */}
           <div 
             className="transition-transform duration-300 ease-out origin-center will-change-transform w-full h-full flex items-center justify-center"
             style={{ transform: `scale(${zoomLevel})` }}
           >
             {view === 'cell' ? (
                // --- PLANT CELL VIEW ---
                <svg viewBox="0 0 400 300" className="w-full h-full max-w-[500px] max-h-[400px] drop-shadow-xl overflow-visible touch-manipulation">
                    {/* Cell Wall */}
                    <path 
                        d="M50,60 Q50,20 90,20 L310,20 Q350,20 350,60 L350,240 Q350,280 310,280 L90,280 Q50,280 50,240 Z" 
                        fill="#4ade80" stroke="#15803d" strokeWidth="8"
                        className={`cursor-pointer transition-all ${selectedPart === 'cellWall' ? 'stroke-yellow-400 scale-[1.01]' : 'hover:stroke-emerald-600'}`}
                        onClick={() => handlePartClick('cellWall')}
                    />
                    {/* Cytoplasm */}
                    <path d="M58,64 Q58,28 94,28 L306,28 Q342,28 342,64 L342,236 Q342,272 306,272 L94,272 Q58,272 58,236 Z" fill="#dcfce7" className="pointer-events-none"/>

                    {/* Vacuole */}
                    <path 
                        d="M100,80 Q140,50 200,70 Q260,90 280,150 Q290,210 230,240 Q160,260 110,200 Q80,140 100,80 Z" 
                        fill="#bfdbfe" stroke="#3b82f6" strokeWidth="2" opacity="0.8"
                        className={`cursor-pointer transition-all ${selectedPart === 'vacuole' ? 'stroke-yellow-400 stroke-[3px]' : 'hover:stroke-blue-500'}`}
                        onClick={() => handlePartClick('vacuole')}
                    />

                    {/* Nucleus Group */}
                    <g 
                        transform="translate(260, 100)" 
                        className={`cursor-pointer transition-all duration-300 ${selectedPart === 'nucleus' ? 'filter drop-shadow-[0_0_10px_rgba(168,85,247,0.6)] scale-105' : 'hover:scale-105'}`}
                        onClick={() => handlePartClick('nucleus')}
                    >
                        <circle cx="0" cy="0" r="35" fill="#e879f9" stroke="#a21caf" strokeWidth={selectedPart === 'nucleus' ? 4 : 2} />
                        <circle cx="0" cy="0" r="12" fill="#a21caf" opacity="0.6" />
                        {/* Hint to zoom in */}
                        {selectedPart === 'nucleus' && (
                           <text x="0" y="55" textAnchor="middle" fontSize="10" fill="#a21caf" fontWeight="bold">Click to Enter</text>
                        )}
                    </g>

                    {/* Chloroplasts */}
                    {[ {x:90,y:80,r:0}, {x:80,y:180,r:45}, {x:300,y:220,r:-15} ].map((pos, i) => (
                        <g key={i} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}
                           className={`cursor-pointer ${selectedPart === 'chloroplast' ? 'filter brightness-110 drop-shadow' : ''}`}
                           onClick={() => handlePartClick('chloroplast')}>
                            <ellipse cx="0" cy="0" rx="25" ry="15" fill="#22c55e" stroke={selectedPart === 'chloroplast' ? '#facc15' : '#166534'} strokeWidth={selectedPart === 'chloroplast' ? 3 : 1} />
                            <line x1="-15" y1="0" x2="15" y2="0" stroke="#14532d" opacity="0.5"/>
                            <line x1="-10" y1="-8" x2="10" y2="-8" stroke="#14532d" opacity="0.5"/>
                            <line x1="-10" y1="8" x2="10" y2="8" stroke="#14532d" opacity="0.5"/>
                        </g>
                    ))}

                    {/* Mitochondria */}
                    {[ {x:220,y:50,r:20}, {x:150,y:250,r:-10} ].map((pos, i) => (
                        <g key={i} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}
                           className={`cursor-pointer ${selectedPart === 'mitochondria' ? 'filter brightness-110 drop-shadow' : ''}`}
                           onClick={() => handlePartClick('mitochondria')}>
                            <path d="M-20,-10 C-5,-15 5,-15 20,-10 C25,-5 25,5 20,10 C5,15 -5,15 -20,10 C-25,5 -25,-5 -20,-10 Z" fill="#fca5a5" stroke={selectedPart === 'mitochondria' ? '#facc15' : '#b91c1c'} strokeWidth={selectedPart === 'mitochondria' ? 3 : 1} />
                            <path d="M-15,0 L-5,5 L5,-5 L15,0" fill="none" stroke="#b91c1c"/>
                        </g>
                    ))}
                </svg>
             ) : (
                // --- NUCLEUS DEEP DIVE VIEW ---
                <svg viewBox="0 0 400 400" className="w-full h-full max-w-[500px] max-h-[500px] drop-shadow-xl overflow-visible animate-fade-in touch-manipulation">
                    {/* Background Halo */}
                    <circle cx="200" cy="200" r="190" fill="#f5d0fe" opacity="0.3" filter="blur(20px)" />
                    
                    {/* Nuclear Membrane */}
                    <circle cx="200" cy="200" r="180" fill="#e879f9" stroke="#a21caf" strokeWidth="6" />
                    
                    {/* Nuclear Pores */}
                    {Array.from({length: 12}).map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const x = 200 + Math.cos(angle) * 180;
                        const y = 200 + Math.sin(angle) * 180;
                        return (
                            <circle 
                                key={i} cx={x} cy={y} r="10" fill="#fae8ff" stroke="#a21caf" strokeWidth="2" 
                                className={`cursor-pointer hover:fill-yellow-100 ${selectedPart === 'nuclearPore' ? 'stroke-yellow-400 stroke-[3px]' : ''}`}
                                onClick={() => handlePartClick('nuclearPore')}
                            />
                        )
                    })}

                    {/* Chromatin (Squiggly Lines) */}
                    <g 
                        className={`cursor-pointer ${selectedPart === 'chromatin' ? 'stroke-yellow-500' : 'stroke-purple-800 hover:stroke-purple-600'}`}
                        onClick={() => handlePartClick('chromatin')}
                        fill="none" strokeWidth="3" opacity="0.6"
                    >
                        <path d="M100,150 Q120,100 150,140 T200,120 T250,150" />
                        <path d="M120,250 Q150,280 180,240 T230,260 T280,230" />
                        <path d="M250,100 Q280,130 260,180" />
                        <path d="M80,200 Q120,200 100,240" />
                    </g>

                    {/* Nucleolus */}
                    <circle 
                        cx="200" cy="200" r="50" fill="#a21caf" 
                        className={`cursor-pointer transition-all ${selectedPart === 'nucleolus' ? 'fill-purple-900 stroke-yellow-400 stroke-[4px]' : 'hover:fill-purple-800'}`}
                        onClick={() => handlePartClick('nucleolus')}
                    />
                    
                    {/* Label */}
                    <text x="200" y="30" textAnchor="middle" fill="#86198f" fontWeight="bold" fontSize="14" letterSpacing="1">INSIDE NUCLEUS</text>
                </svg>
             )}
           </div>

           {/* Enter/Exit Nucleus Button Overlay */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
               {view === 'cell' && selectedPart === 'nucleus' && (
                   <button 
                     onClick={toggleView}
                     className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce font-bold transition-all whitespace-nowrap"
                   >
                     <ZoomIn size={18} /> {TRANSLATIONS.exploreInside[language]}
                   </button>
               )}
               {view === 'nucleus' && (
                   <button 
                     onClick={toggleView}
                     className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-6 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold transition-all whitespace-nowrap"
                   >
                     <ArrowLeft size={18} /> {TRANSLATIONS.goBack[language]}
                   </button>
               )}
           </div>

        </div>

        {/* Info Panel */}
        <div className="w-full md:w-72 lg:w-80 landscape:w-72 flex flex-col gap-4 flex-shrink-0">
            {selectedPart && currentInfo ? (
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in h-full overflow-y-auto">
                    <div className="bg-emerald-600 p-3 text-white flex justify-between items-center">
                    <h3 className="font-bold">{language === Language.ENGLISH ? currentInfo.name.en : currentInfo.name.hi}</h3>
                    </div>
                    <div className="p-4 space-y-4">
                    <div className="flex gap-2">
                        <div className="w-6 h-6 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0"><User size={14}/></div>
                        <div className="text-sm">
                            <span className="text-xs text-slate-400 block uppercase">{language === Language.ENGLISH ? "Discovered By" : "खोजकर्ता"}</span>
                            <span className="font-medium">{language === Language.ENGLISH ? currentInfo.scientist.en : currentInfo.scientist.hi}</span>
                        </div>
                    </div>
                    <div className="flex gap-2 bg-amber-50 p-2 rounded border border-amber-100">
                        <div className="w-6 h-6 rounded bg-amber-200 text-amber-700 flex items-center justify-center flex-shrink-0"><Lightbulb size={14}/></div>
                        <div className="text-sm">
                            <span className="text-xs text-amber-600 block uppercase">{language === Language.ENGLISH ? "Memory Trick" : "ट्रिक"}</span>
                            <span className="font-bold">"{language === Language.ENGLISH ? currentInfo.trick.en : currentInfo.trick.hi}"</span>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="w-6 h-6 rounded bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0"><BookOpen size={14}/></div>
                        <p className="text-sm text-slate-600 leading-snug">
                            {language === Language.ENGLISH ? currentInfo.desc.en : currentInfo.desc.hi}
                        </p>
                    </div>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-500 italic hidden md:block">
                    <Hand className="mx-auto mb-2 opacity-50" size={32} />
                    {language === Language.ENGLISH ? "Tap a cell part to reveal its secrets!" : "इसके रहस्यों को जानने के लिए किसी भाग पर टैप करें!"}
                </div>
            )}
        </div>

      </div>
    </div>
  );
};
export default PlantCell;