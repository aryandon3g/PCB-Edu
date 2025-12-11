import React, { useState } from 'react';
import { Hand, Lightbulb, User, ZoomIn, ZoomOut, ArrowLeft, Microscope, CheckCircle2, FlaskConical } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface AnimalCellProps {
  language: Language;
}

// SSC & Railway Exam Focused Data
const ANIMAL_CELL_DATA: Record<string, any> = {
  nucleus: {
    name: { en: "Nucleus", hi: "केंद्रक (Nucleus)" },
    scientist: { en: "Robert Brown (1831)", hi: "रॉबर्ट ब्राउन (1831)" },
    trick: { en: "Manager / Brain", hi: "कोशिका का 'दिमाग' या 'मैनेजर'" },
    ssc_fact: { en: "Contains Genetic Material (DNA). Controls all cell activities.", hi: "SSC: इसे 'कोशिका का नियंत्रण कक्ष' कहा जाता है।" },
    desc: { en: "Double membrane bound organelle containing DNA.", hi: "दोहरी झिल्ली वाला अंगक जिसमें DNA होता है।" }
  },
  cellMembrane: {
    name: { en: "Cell Membrane", hi: "कोशिका झिल्ली" },
    scientist: { en: "Singer & Nicholson (Fluid Mosaic Model)", hi: "सिंगर और निकोलसन (1972)" },
    trick: { en: "Security Guard", hi: "द्वारपाल (Guard)" },
    ssc_fact: { en: "Made of Phospholipids and Proteins. Semi-permeable.", hi: "SSC: यह 'अर्ध-पारगम्य' (Semi-permeable) होती है। लिपिड और प्रोटीन से बनी होती है।" },
    desc: { en: "Outer boundary of animal cells.", hi: "जंतु कोशिकाओं की बाहरी सीमा।" }
  },
  mitochondria: {
    name: { en: "Mitochondria", hi: "सूत्रकणिका (Mitochondria)" },
    scientist: { en: "Altmann (Bioblast) / Benda (Named it)", hi: "ऑल्टमैन (खोज) / बेंडा (नामकरण)" },
    trick: { en: "Powerhouse", hi: "ऊर्जा घर (Powerhouse)" },
    ssc_fact: { en: "Site of Cellular Respiration (Krebs Cycle). Has its own DNA.", hi: "SSC IMP: इसके पास 'अपना खुद का DNA' होता है। यहाँ क्रेब्स चक्र (Krebs Cycle) चलता है।" },
    desc: { en: "Produces ATP energy.", hi: "ATP (ऊर्जा मुद्रा) का निर्माण करता है।" }
  },
  lysosome: {
    name: { en: "Lysosome", hi: "लियनकाय (Lysosome)" },
    scientist: { en: "Christian de Duve (1955)", hi: "डी डुवे (1955)" },
    trick: { en: "Suicide Bag", hi: "आत्मघाती थैली" },
    ssc_fact: { en: "Contains Hydrolytic Enzymes. Bursts to destroy damaged cell.", hi: "SSC: इसमें 'हाइड्रोलाइटिक एंजाइम' होते हैं। फटने पर पूरी कोशिका को पचा जाता है।" },
    desc: { en: "Waste disposal system.", hi: "कचरा निपटान प्रणाली।" }
  },
  ribosome: {
    name: { en: "Ribosome", hi: "राइबोसोम" },
    scientist: { en: "George Palade (1955)", hi: "जॉर्ज पैलाडे (1955)" },
    trick: { en: "Protein Factory", hi: "प्रोटीन की फैक्ट्री" },
    ssc_fact: { en: "Smallest organelle. Found on Rough ER and free in cytoplasm.", hi: "SSC: यह सबसे छोटा कोशिकांग है। झिल्ली रहित (Membraneless) होता है।" },
    desc: { en: "Synthesizes proteins.", hi: "प्रोटीन का संश्लेषण करता है।" }
  },
  golgi: {
    name: { en: "Golgi Body", hi: "गॉल्जी काय" },
    scientist: { en: "Camillo Golgi (1898)", hi: "कैमिलो गॉल्जी (1898)" },
    trick: { en: "Traffic Police / Postman", hi: "यातायात प्रबंधक / डाकिया" },
    ssc_fact: { en: "Packages proteins and lipids. Forms Lysosomes.", hi: "SSC: यह लाइसोसोम (Lysosome) का निर्माण करता है और पदार्थों को पैक करता है।" },
    desc: { en: "Packaging center of the cell.", hi: "कोशिका का पैकेजिंग केंद्र।" }
  },
  er: {
    name: { en: "Endoplasmic Reticulum (ER)", hi: "अंतःप्रद्रव्यी जालिका (ER)" },
    scientist: { en: "Porter, Claude, and Fullam", hi: "पोर्टर" },
    trick: { en: "Skeleton of Cell", hi: "कोशिका का कंकाल" },
    ssc_fact: { en: "Rough ER makes Protein. Smooth ER makes Lipids (Fats).", hi: "SSC: 'रफ ER' प्रोटीन बनाता है, 'स्मूथ ER' वसा (Lipid) बनाता है।" },
    desc: { en: "Transport network within cell.", hi: "कोशिका के अंदर परिवहन जाल।" }
  },
  // Nucleus Internal Parts
  nucleolus: {
    name: { en: "Nucleolus", hi: "केंद्रिका" },
    scientist: { en: "Fontana (1781)", hi: "फोंटाना" },
    trick: { en: "Factory of Ribosome", hi: "राइबोसोम की फैक्ट्री" },
    ssc_fact: { en: "It produces Ribosomes inside the Nucleus.", hi: "SSC: यह केंद्रक के अंदर राइबोसोम का निर्माण करती है।" },
    desc: { en: "Dense region in nucleus.", hi: "केंद्रक में घना क्षेत्र।" }
  }
};

const AnimalCell: React.FC<AnimalCellProps> = ({ language }) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [view, setView] = useState<'cell' | 'nucleus'>('cell');
  const [showLabels, setShowLabels] = useState(false);

  const handlePartClick = (partKey: string) => {
    setSelectedPart(partKey);
  };

  const toggleView = () => {
    setView(view === 'cell' ? 'nucleus' : 'cell');
    setSelectedPart(view === 'cell' ? 'nucleolus' : 'nucleus');
    setZoomLevel(1);
  };

  const currentInfo = selectedPart ? ANIMAL_CELL_DATA[selectedPart] : null;

  return (
    <div className="flex flex-col h-auto lg:h-full gap-4 md:gap-6">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-3 rounded-xl border border-slate-200 shadow-sm gap-3">
        <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Microscope className="text-rose-600" />
            {view === 'cell' ? (language === Language.ENGLISH ? "Animal Cell" : "जंतु कोशिका") : (language === Language.ENGLISH ? "Inside Nucleus" : "केंद्रक के अंदर")}
        </h2>
        
        <div className="flex items-center gap-4">
             {/* Label Toggle */}
             <button 
                onClick={() => setShowLabels(!showLabels)}
                className={`text-xs px-3 py-1.5 rounded-full border font-semibold flex items-center gap-1 transition-colors ${showLabels ? 'bg-indigo-100 border-indigo-300 text-indigo-700' : 'bg-slate-50 border-slate-200 text-slate-500'}`}
             >
                <CheckCircle2 size={14} /> {language === Language.ENGLISH ? "Show Labels" : "नाम दिखाएं"}
             </button>

             {/* Zoom Control */}
             <div className="flex items-center gap-2 bg-slate-100 px-3 py-1 rounded-lg">
                  <ZoomOut size={16} className="text-slate-400 cursor-pointer" onClick={() => setZoomLevel(Math.max(1, zoomLevel - 0.5))}/>
                  <span className="text-xs font-mono w-8 text-center">{Math.round(zoomLevel * 100)}%</span>
                  <ZoomIn size={16} className="text-slate-400 cursor-pointer" onClick={() => setZoomLevel(Math.min(3, zoomLevel + 0.5))}/>
             </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-auto lg:flex-1 lg:min-h-0">
        
        {/* VISUALIZATION AREA */}
        <div className="w-full lg:flex-1 bg-gradient-to-br from-rose-50 to-orange-50 rounded-xl shadow-inner border border-rose-100 relative overflow-hidden flex items-center justify-center min-h-[400px]">
           
           <div className="absolute top-4 left-4 flex items-center gap-2 text-rose-800 text-xs sm:text-sm font-semibold bg-white/80 p-2 rounded-lg backdrop-blur z-20 shadow-sm pointer-events-none">
              <Hand size={16} />
              {TRANSLATIONS.clickToExplore[language]}
           </div>

           <div className="transition-transform duration-500 ease-out origin-center w-full h-full flex items-center justify-center" style={{ transform: `scale(${zoomLevel})` }}>
              {view === 'cell' ? (
                <svg viewBox="0 0 500 400" className="w-full h-full max-w-[600px] drop-shadow-2xl overflow-visible">
                    <defs>
                        <radialGradient id="cellGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                            <stop offset="0%" stopColor="#fff1f2" stopOpacity="1" />
                            <stop offset="100%" stopColor="#ffe4e6" stopOpacity="1" />
                        </radialGradient>
                    </defs>

                    {/* Cell Membrane */}
                    <path 
                        d="M250,40 C360,30 460,100 450,220 C440,340 350,390 250,380 C140,390 40,320 50,200 C60,90 150,50 250,40 Z" 
                        fill="url(#cellGradient)" stroke="#fb7185" strokeWidth="6"
                        className={`cursor-pointer transition-all ${selectedPart === 'cellMembrane' ? 'stroke-yellow-400 stroke-[8px] filter drop-shadow-lg' : 'hover:stroke-rose-500'}`}
                        onClick={() => handlePartClick('cellMembrane')}
                    />

                    {/* Endoplasmic Reticulum (ER) - Near Nucleus */}
                    <g className={`cursor-pointer ${selectedPart === 'er' ? 'filter drop-shadow-md brightness-110' : ''}`} onClick={() => handlePartClick('er')}>
                        {/* Rough ER (Left of Nucleus) */}
                        <path d="M190,150 Q160,120 150,160 T130,200 T150,240 Q170,260 200,250" fill="none" stroke="#f472b6" strokeWidth="12" strokeLinecap="round" />
                        <path d="M190,150 Q160,120 150,160 T130,200 T150,240 Q170,260 200,250" fill="none" stroke="#fce7f3" strokeWidth="4" strokeLinecap="round" />
                        {/* Dots for Ribosomes on RER */}
                        {[150, 160, 140, 135].map((y, i) => <circle key={i} cx={150} cy={y} r="2" fill="#be185d" />)}
                    </g>
                    {showLabels && <text x="130" y="270" fontSize="10" fill="#be185d" fontWeight="bold">ER</text>}

                    {/* Golgi Body - Stacked structure */}
                    <g transform="translate(350, 180)" className={`cursor-pointer ${selectedPart === 'golgi' ? 'filter drop-shadow-md brightness-110' : ''}`} onClick={() => handlePartClick('golgi')}>
                        <path d="M0,0 Q20,-10 40,0" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                        <path d="M-5,10 Q20,0 45,10" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                        <path d="M0,20 Q20,10 40,20" fill="none" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                        {/* Vesicles */}
                        <circle cx="50" cy="5" r="4" fill="#fbbf24" />
                        <circle cx="-10" cy="15" r="4" fill="#fbbf24" />
                    </g>
                    {showLabels && <text x="360" y="220" fontSize="10" fill="#b45309" fontWeight="bold">Golgi</text>}

                    {/* Nucleus FIXED: Separated Transform (Position) from Animation (Scale) */}
                    <g transform="translate(250, 210)">
                        <g 
                            className={`cursor-pointer transition-transform duration-300 ${selectedPart === 'nucleus' ? 'scale-110' : 'hover:scale-105'}`}
                            onClick={() => handlePartClick('nucleus')}
                        >
                            <circle cx="0" cy="0" r="45" fill="#e879f9" stroke="#a21caf" strokeWidth="3" className="drop-shadow-lg" />
                            <circle cx="0" cy="0" r="15" fill="#a21caf" opacity="0.6" /> {/* Nucleolus hint */}
                            {selectedPart === 'nucleus' && <text x="0" y="65" textAnchor="middle" fontSize="10" fill="#a21caf" fontWeight="bold" className="animate-bounce">Tap to Enter</text>}
                        </g>
                    </g>
                    {showLabels && <text x="250" y="210" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold" pointerEvents="none">Nucleus</text>}

                    {/* Mitochondria (Powerhouse) */}
                    {[ {x:120, y:100, r:45}, {x:360, y:280, r:-45}, {x:320, y:90, r:10} ].map((pos, i) => (
                        <g key={i} transform={`translate(${pos.x}, ${pos.y}) rotate(${pos.r})`}>
                             <g className={`cursor-pointer transition-transform duration-300 ${selectedPart === 'mitochondria' ? 'scale-110 filter brightness-110' : 'hover:scale-110'}`} onClick={() => handlePartClick('mitochondria')}>
                                <ellipse cx="0" cy="0" rx="25" ry="12" fill="#fca5a5" stroke="#b91c1c" strokeWidth="2" />
                                <path d="M-15,0 Q-5,8 5,0 T15,0" fill="none" stroke="#b91c1c" strokeWidth="1.5" />
                             </g>
                        </g>
                    ))}
                    {showLabels && <text x="360" y="310" fontSize="10" fill="#b91c1c" fontWeight="bold">Mitochondria</text>}

                    {/* Lysosomes (Suicide Bags) */}
                    {[ {x:100, y:280}, {x:400, y:140} ].map((pos, i) => (
                        <circle key={i} cx={pos.x} cy={pos.y} r="14" fill="#fde047" stroke="#b45309" strokeWidth="2"
                            className={`cursor-pointer transition-transform duration-300 ${selectedPart === 'lysosome' ? 'stroke-rose-600 scale-125' : 'hover:scale-110'}`}
                            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                            onClick={() => handlePartClick('lysosome')}
                        />
                    ))}
                    {showLabels && <text x="100" y="310" fontSize="10" fill="#b45309" fontWeight="bold">Lysosome</text>}

                    {/* Ribosomes (Dots) - Free floating */}
                    {Array.from({length: 15}).map((_, i) => (
                         <circle key={`ribo-${i}`} cx={Math.random() * 300 + 100} cy={Math.random() * 250 + 70} r="2" fill="#be185d" opacity="0.7" 
                            className="cursor-pointer hover:scale-150 transition-transform" 
                            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                            onClick={() => handlePartClick('ribosome')}
                         />
                    ))}
                </svg>
              ) : (
                // --- NUCLEUS DEEP DIVE ---
                <svg viewBox="0 0 400 400" className="w-full h-full max-w-[500px] drop-shadow-xl overflow-visible animate-fade-in">
                    <circle cx="200" cy="200" r="190" fill="#f5d0fe" opacity="0.3" filter="blur(20px)" />
                    <circle cx="200" cy="200" r="180" fill="#e879f9" stroke="#a21caf" strokeWidth="6" />
                    
                    {/* Chromatin (DNA) */}
                    <g className={`cursor-pointer ${selectedPart === 'nucleus' ? 'stroke-yellow-500' : 'stroke-purple-800'}`} onClick={() => handlePartClick('nucleus')} fill="none" strokeWidth="3" opacity="0.6">
                        <path d="M100,150 Q140,100 180,140 T240,120 T300,150" />
                        <path d="M120,250 Q160,280 200,240 T260,260 T320,230" />
                    </g>
                    
                    {/* Nucleolus */}
                    <circle cx="200" cy="200" r="50" fill="#a21caf" className={`cursor-pointer ${selectedPart === 'nucleolus' ? 'stroke-yellow-400 stroke-[4px] filter drop-shadow-lg' : ''}`} onClick={() => handlePartClick('nucleolus')} />
                    
                    <text x="200" y="205" textAnchor="middle" fill="white" fontSize="10" opacity="0.8">NUCLEOLUS</text>
                    <text x="200" y="320" textAnchor="middle" fill="#a21caf" fontSize="14" fontWeight="bold">Chromatin (DNA)</text>
                </svg>
              )}
           </div>

           {/* Enter/Exit Button */}
           <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
               {view === 'cell' && selectedPart === 'nucleus' && (
                   <button onClick={toggleView} className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full shadow-lg flex items-center gap-2 animate-bounce font-bold">
                     <ZoomIn size={18} /> {TRANSLATIONS.exploreInside[language]}
                   </button>
               )}
               {view === 'nucleus' && (
                   <button onClick={toggleView} className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 px-6 py-2 rounded-full shadow-lg flex items-center gap-2 font-bold">
                     <ArrowLeft size={18} /> {TRANSLATIONS.goBack[language]}
                   </button>
               )}
           </div>
        </div>

        {/* INFO PANEL (RIGHT SIDE) */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
            {selectedPart && currentInfo ? (
                <div className="bg-white rounded-xl shadow-lg border-2 border-rose-100 overflow-hidden animate-fade-in order-first">
                    <div className="bg-gradient-to-r from-rose-600 to-pink-600 p-3 text-white flex justify-between items-center">
                        <h3 className="font-bold text-lg">{language === Language.ENGLISH ? currentInfo.name.en : currentInfo.name.hi}</h3>
                        <button onClick={() => setSelectedPart(null)} className="text-pink-200 hover:text-white">&times;</button>
                    </div>
                    
                    <div className="p-4 space-y-4">
                        {/* Scientist Info */}
                        <div className="flex gap-3 items-center border-b border-slate-100 pb-2">
                             <div className="bg-rose-100 p-1.5 rounded-md text-rose-600"><User size={16}/></div>
                             <div>
                                <div className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">Discovered By</div>
                                <div className="text-sm font-semibold text-slate-800">{language === Language.ENGLISH ? currentInfo.scientist.en : currentInfo.scientist.hi}</div>
                             </div>
                        </div>

                        {/* Mnemonic / Trick */}
                        <div className="bg-yellow-50 p-2.5 rounded-lg border border-yellow-200 flex gap-2 items-start">
                             <Lightbulb className="text-yellow-600 mt-0.5 flex-shrink-0" size={16}/>
                             <div>
                                <span className="text-xs font-bold text-yellow-700 block mb-0.5">Memory Trick</span>
                                <span className="text-sm font-medium text-slate-800">"{language === Language.ENGLISH ? currentInfo.trick.en : currentInfo.trick.hi}"</span>
                             </div>
                        </div>

                        {/* SSC Exam Fact (New Feature) */}
                        <div className="bg-slate-50 p-3 rounded-lg border-l-4 border-indigo-500">
                             <div className="flex items-center gap-2 mb-1">
                                <FlaskConical size={14} className="text-indigo-600" />
                                <span className="text-xs font-bold text-indigo-700 uppercase">SSC / Competitive Exam Fact</span>
                             </div>
                             <p className="text-sm text-slate-700 italic">
                                 {language === Language.ENGLISH ? currentInfo.ssc_fact.en : currentInfo.ssc_fact.hi}
                             </p>
                        </div>

                        <p className="text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-2">
                            {language === Language.ENGLISH ? currentInfo.desc.en : currentInfo.desc.hi}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="bg-white p-8 rounded-xl border border-dashed border-slate-300 text-center text-slate-400 hidden lg:flex flex-col items-center justify-center h-40">
                    <Hand className="mb-2 opacity-50" size={32} />
                    <p>{language === Language.ENGLISH ? "Tap on any cell organelle to learn" : "सीखने के लिए किसी भी कोशिकांग पर टैप करें"}</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};
export default AnimalCell;