
import React, { useState, useEffect } from 'react';
import { Activity, Heart as HeartIcon, Play, Pause, ZoomIn, ZoomOut, Droplets, Zap, ChevronRight, ChevronLeft, Info, Layers, FileText, Box, CheckCircle, XCircle, Stethoscope, History, BookOpen } from 'lucide-react';
import { Language } from '../../types';

interface HeartProps {
  language: Language;
}

const HEART_CONTENT: Record<string, any> = {
    structure: {
        title: { en: "Anatomy", hi: "संरचना" },
        parts: {
            ra: { name: { en: "Right Atrium", hi: "दायां आलिंद" }, desc: { en: "Receives deoxygenated blood from body.", hi: "शरीर से अशुद्ध रक्त प्राप्त करता है।" }, fact: { en: "Contains SA Node.", hi: "इसमें SA Node होता है।" } },
            rv: { name: { en: "Right Ventricle", hi: "दायां निलय" }, desc: { en: "Pumps blood to lungs.", hi: "फेफड़ों में रक्त पंप करता है।" }, fact: { en: "Thinner walls than L.V.", hi: "इसकी दीवारें L.V. से पतली होती हैं।" } },
            la: { name: { en: "Left Atrium", hi: "बायां आलिंद" }, desc: { en: "Receives pure blood from lungs.", hi: "फेफड़ों से शुद्ध रक्त प्राप्त करता है।" }, fact: { en: "Oxygenated blood is red.", hi: "शुद्ध रक्त लाल होता है।" } },
            lv: { name: { en: "Left Ventricle", hi: "बायां निलय" }, desc: { en: "Pumps blood to the whole body.", hi: "पूरे शरीर में रक्त पंप करता है।" }, fact: { en: "THICKEST muscular wall.", hi: "सबसे मोटी मांसपेशीय दीवार।" } },
            aorta: { name: { en: "Aorta", hi: "महाधमनी" }, desc: { en: "Largest artery.", hi: "सबसे बड़ी धमनी।" }, fact: { en: "Originates from L.V.", hi: "यह बाएं निलय से निकलती है।" } },
            pa: { name: { en: "Pulmonary Artery", hi: "फुफ्फुसीय धमनी" }, desc: { en: "Carries impure blood to lungs.", hi: "अशुद्ध रक्त फेफड़ों तक ले जाती है।" }, fact: { en: "Exception: Only impure artery.", hi: "अपवाद: एकमात्र अशुद्ध धमनी।" } },
            pv: { name: { en: "Pulmonary Vein", hi: "फुफ्फुसीय शिरा" }, desc: { en: "Brings pure blood to heart.", hi: "शुद्ध रक्त हृदय तक लाती है।" }, fact: { en: "Exception: Only pure vein.", hi: "अपवाद: एकमात्र शुद्ध शिरा।" } },
            vc: { name: { en: "Vena Cava", hi: "महाशिरा" }, desc: { en: "Returns blood to heart.", hi: "रक्त को हृदय में वापस लाती है।" }, fact: { en: "Largest vein in body.", hi: "शरीर की सबसे बड़ी शिरा।" } }
        }
    },
    facts: {
        title: { en: "Exam Facts", hi: "महत्वपूर्ण तथ्य" },
        groups: [
            { title: { en: "General Stats", hi: "सामान्य आँकड़े" }, icon: BookOpen, color: "blue", items: [{ label: { en: "Study", hi: "अध्ययन" }, val: "Cardiology" }, { label: { en: "Weight", hi: "वजन" }, val: "280-340g" }] },
            { title: { en: "Physiology", hi: "कार्यिकी" }, icon: Stethoscope, color: "rose", items: [{ label: { en: "Sound", hi: "ध्वनि" }, val: "LUBB - DUB" }, { label: { en: "BP", hi: "BP" }, val: "120/80 mmHg" }] }
        ]
    },
    quiz: [
        { q: { en: "Who discovered the Circulatory System?", hi: "परिसंचरण तंत्र की खोज किसने की?" }, options: ["Newton", "Einstein", "William Harvey", "Hooke"], ans: "William Harvey" },
        { q: { en: "Thickest chamber of heart?", hi: "हृदय का सबसे मोटा कक्ष?" }, options: ["R.A.", "L.A.", "R.V.", "L.V."], ans: "L.V." }
    ]
};

const FLOW_COORDS = [
    { x: 130, y: 450, color: "#3b82f6" }, { x: 130, y: 350, color: "#3b82f6" }, { x: 120, y: 200, color: "#3b82f6" },
    { x: 160, y: 320, color: "#3b82f6" }, { x: 50, y: 50, color: "#ef4444" }, { x: 300, y: 180, color: "#ef4444" },
    { x: 260, y: 350, color: "#ef4444" }, { x: 260, y: 80, color: "#ef4444" }
];

const IMPULSE_STEPS = [
    { id: 'sa', x: 110, y: 140, title: "SA Node" },
    { id: 'av', x: 155, y: 210, title: "AV Node" },
    { id: 'his', x: 180, y: 260, title: "Bundle of His" },
    { id: 'purkinje', x: 200, y: 350, title: "Purkinje" }
];

const Heart: React.FC<HeartProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'structure' | 'facts' | 'impulse' | 'flow' | 'quiz'>('structure');
  const [viewMode, setViewMode] = useState<'realistic' | 'diagram'>('realistic');
  const [zoom, setZoom] = useState(1);
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [flowIndex, setFlowIndex] = useState(0);
  const [impulseIndex, setImpulseIndex] = useState(-1);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);

  useEffect(() => {
      let timer: any;
      if (activeTab === 'impulse' && impulseIndex >= 0 && impulseIndex < IMPULSE_STEPS.length) {
          timer = setTimeout(() => setImpulseIndex(prev => prev + 1), 1200); 
      } else if (impulseIndex >= IMPULSE_STEPS.length) {
          timer = setTimeout(() => setImpulseIndex(-1), 1000); 
      }
      return () => clearTimeout(timer);
  }, [impulseIndex, activeTab]);

  const handlePartClick = (part: string) => {
    if (activeTab === 'impulse' || activeTab === 'flow') return;
    setSelectedPart(part);
    setActiveTab('structure');
  };

  const getPartColor = (part: string, baseColor: string) => selectedPart === part ? "#facc15" : baseColor;

  return (
    <div className="flex flex-col h-full gap-6 animate-slide-up">
      {/* Dynamic Header */}
      <div className="bg-white p-4 rounded-[28px] border border-slate-200 shadow-sm flex justify-between items-center flex-shrink-0">
         <div className="flex items-center gap-3">
             <div className={`p-2 rounded-xl ${isPlaying ? 'bg-rose-100 text-rose-600 animate-pulse' : 'bg-slate-100 text-slate-500'}`}>
                 <Activity size={20} />
             </div>
             <div>
                <h2 className="font-black text-slate-800 uppercase tracking-tight leading-none text-lg">
                    {language === Language.ENGLISH ? "Cardio Lab" : "हृदय प्रयोगशाला"}
                </h2>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Live Hemodynamics</span>
             </div>
         </div>

         <div className="flex items-center gap-2">
             <div className="flex bg-slate-100 p-1 rounded-xl">
                 <button onClick={() => setViewMode('realistic')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'realistic' ? 'bg-white shadow text-rose-600' : 'text-slate-500'}`}>3D</button>
                 <button onClick={() => setViewMode('diagram')} className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${viewMode === 'diagram' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}>2D</button>
             </div>
             <button onClick={() => setIsPlaying(!isPlaying)} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all flex items-center gap-2 ${isPlaying ? 'bg-rose-600 text-white shadow-xl shadow-rose-200' : 'bg-white border border-slate-200 text-slate-600'}`}>
                 {isPlaying ? <Pause size={14}/> : <Play size={14}/>} {isPlaying ? 'Stop' : 'Beat'}
             </button>
         </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
         {/* Main Visual Window */}
         <div className="flex-1 bg-white rounded-[40px] shadow-sm border border-slate-200 relative overflow-hidden flex items-center justify-center">
             <div className="absolute bottom-6 left-6 z-20 flex flex-col gap-2">
                 <button onClick={() => setZoom(Math.min(2, zoom + 0.2))} className="p-3 bg-white/80 backdrop-blur rounded-xl shadow-md text-slate-600 hover:bg-indigo-600 hover:text-white transition-all"><ZoomIn size={18}/></button>
                 <button onClick={() => setZoom(Math.max(0.6, zoom - 0.2))} className="p-3 bg-white/80 backdrop-blur rounded-xl shadow-md text-slate-600 hover:bg-indigo-600 hover:text-white transition-all"><ZoomOut size={18}/></button>
             </div>

             <div className="transition-transform duration-500 ease-out" style={{ transform: `scale(${zoom})` }}>
                <svg width="350" height="450" viewBox="0 0 400 500" className="overflow-visible drop-shadow-2xl">
                    <defs>
                         <radialGradient id="realRed" cx="40%" cy="30%" r="80%"><stop offset="0%" stopColor="#ef4444" /><stop offset="100%" stopColor="#7f1d1d" /></radialGradient>
                         <radialGradient id="realBlue" cx="40%" cy="30%" r="80%"><stop offset="0%" stopColor="#60a5fa" /><stop offset="100%" stopColor="#1e3a8a" /></radialGradient>
                         <style>{`.hb { animation: b 0.8s infinite ease-in-out; transform-origin: center; } @keyframes b { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.02); } }`}</style>
                    </defs>

                    <g className={isPlaying ? "hb" : ""} opacity={activeTab === 'impulse' ? 0.4 : 1}>
                        {viewMode === 'diagram' ? (
                            <g>
                                <path d="M80,50 L80,180 L130,180 L130,50 Z" fill={getPartColor('vc', '#bfdbfe')} stroke="#1e3a8a" onClick={() => handlePartClick('vc')} className="cursor-pointer"/>
                                <path d="M180,150 L150,80 L50,60 L50,110 L150,130 L180,180" fill={getPartColor('pa', '#60a5fa')} stroke="#1e3a8a" onClick={() => handlePartClick('pa')} className="cursor-pointer"/>
                                <path d="M200,160 C200,40 320,40 320,160 L280,160 C280,100 240,100 240,160 Z" fill={getPartColor('aorta', '#ef4444')} stroke="#7f1d1d" onClick={() => handlePartClick('aorta')} className="cursor-pointer"/>
                                <path d="M360,180 L400,180 L400,230 L360,230 Z" fill={getPartColor('pv', '#fca5a5')} stroke="#7f1d1d" onClick={() => handlePartClick('pv')} className="cursor-pointer"/>
                                <path d="M130,180 Q200,180 200,240 Q130,240 130,180 Z" fill={getPartColor('ra', '#dbeafe')} stroke="#1e3a8a" onClick={() => handlePartClick('ra')} className="cursor-pointer"/>
                                <path d="M140,260 Q200,260 200,380 Q160,420 140,260 Z" fill={getPartColor('rv', '#93c5fd')} stroke="#1e3a8a" onClick={() => handlePartClick('rv')} className="cursor-pointer"/>
                                <path d="M260,180 Q330,180 330,240 Q260,240 260,180 Z" fill={getPartColor('la', '#fee2e2')} stroke="#7f1d1d" onClick={() => handlePartClick('la')} className="cursor-pointer"/>
                                <path d="M260,260 Q320,260 320,380 Q280,450 260,260 Z" fill={getPartColor('lv', '#fca5a5')} stroke="#7f1d1d" onClick={() => handlePartClick('lv')} className="cursor-pointer"/>
                            </g>
                        ) : (
                            <g>
                                <path d="M130,20 L130,150 L160,150 L160,20" fill={getPartColor('vc', 'url(#realBlue)')} onClick={() => handlePartClick('vc')} className="cursor-pointer"/>
                                <path d="M130,480 L130,320 C130,290 160,290 170,320 L170,480" fill={getPartColor('vc', 'url(#realBlue)')} onClick={() => handlePartClick('vc')} className="cursor-pointer"/>
                                <path d="M220,200 C220,100 220,60 260,40 C320,20 340,60 340,100 L300,100 C300,80 280,60 260,80 C250,90 250,150 250,200" fill={getPartColor('aorta', 'url(#realRed)')} onClick={() => handlePartClick('aorta')} className="cursor-pointer"/>
                                <path d="M120,140 C80,140 80,200 120,240 C140,240 150,220 150,200" fill={getPartColor('ra', 'url(#realBlue)')} onClick={() => handlePartClick('ra')} className="cursor-pointer"/>
                                <path d="M300,140 C340,140 340,200 300,220 C280,220 280,180 300,140" fill={getPartColor('la', 'url(#realRed)')} onClick={() => handlePartClick('la')} className="cursor-pointer"/>
                                <path d="M140,240 C120,280 160,400 220,460 C230,420 240,300 220,220" fill={getPartColor('rv', 'url(#realBlue)')} onClick={() => handlePartClick('rv')} className="cursor-pointer"/>
                                <path d="M220,220 C260,220 340,260 340,320 C340,400 280,450 220,480" fill={getPartColor('lv', 'url(#realRed)')} onClick={() => handlePartClick('lv')} className="cursor-pointer"/>
                            </g>
                        )}
                    </g>

                    {activeTab === 'impulse' && (
                        <g>
                             {IMPULSE_STEPS.map((node, i) => (
                                 <g key={node.id} opacity={impulseIndex >= i ? 1 : 0.2}>
                                     <circle cx={node.x} cy={node.y} r={impulseIndex === i ? 14 : 8} fill="#facc15" stroke="white" strokeWidth="3" />
                                     <text x={node.x + 20} y={node.y} fill="#1e293b" fontSize="11" fontWeight="900" className="uppercase tracking-tighter">{node.title}</text>
                                 </g>
                             ))}
                        </g>
                    )}

                    {activeTab === 'flow' && (
                        <g style={{ transform: `translate(${FLOW_COORDS[flowIndex].x}px, ${FLOW_COORDS[flowIndex].y}px)`, transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}>
                            <circle r="15" fill={FLOW_COORDS[flowIndex].color} stroke="white" strokeWidth="3" className="animate-ping opacity-40" />
                            <circle r="12" fill={FLOW_COORDS[flowIndex].color} stroke="white" strokeWidth="3" />
                            <Droplets size={12} className="text-white -ml-1.5 -mt-1.5 absolute" />
                        </g>
                    )}
                </svg>
             </div>
         </div>

         {/* Sidebar Control Panel */}
         <div className="w-full md:w-[450px] flex flex-col gap-6 h-full overflow-hidden">
             <div className="bg-white rounded-[40px] shadow-sm border border-slate-200 overflow-hidden flex flex-col h-full">
                 <div className="flex bg-slate-50 border-b border-slate-200 p-1 flex-shrink-0">
                     {['structure', 'impulse', 'flow', 'facts', 'quiz'].map(tab => (
                         <button 
                            key={tab}
                            onClick={() => { setActiveTab(tab as any); setImpulseIndex(-1); setFlowIndex(0); }}
                            className={`flex-1 py-3 text-[9px] font-black uppercase tracking-widest transition-all rounded-xl ${activeTab === tab ? 'bg-white shadow text-indigo-700' : 'text-slate-400 hover:text-slate-600'}`}
                         >
                             {tab.charAt(0)}
                         </button>
                     ))}
                 </div>

                 <div className="p-8 overflow-y-auto flex-1 custom-scrollbar">
                     {activeTab === 'structure' && (
                         <div className="space-y-6">
                             {selectedPart ? (
                                <div className="animate-fade-in">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl shadow-inner"><HeartIcon size={24}/></div>
                                        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">
                                            {language === Language.ENGLISH ? HEART_CONTENT.structure.parts[selectedPart].name.en : HEART_CONTENT.structure.parts[selectedPart].name.hi}
                                        </h3>
                                    </div>
                                    <p className="text-slate-500 text-lg leading-relaxed font-medium mb-8 italic">
                                        {language === Language.ENGLISH ? HEART_CONTENT.structure.parts[selectedPart].desc.en : HEART_CONTENT.structure.parts[selectedPart].desc.hi}
                                    </p>
                                    <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-4 shadow-sm">
                                        <Zap size={22} className="text-indigo-600 flex-shrink-0 mt-1" />
                                        <p className="text-indigo-900 text-sm font-bold leading-relaxed">
                                            {language === Language.ENGLISH ? HEART_CONTENT.structure.parts[selectedPart].fact.en : HEART_CONTENT.structure.parts[selectedPart].fact.hi}
                                        </p>
                                    </div>
                                </div>
                             ) : (
                                 <div className="text-center py-20 opacity-30">
                                     <HeartIcon size={64} className="mx-auto mb-6"/>
                                     <p className="text-xs font-black uppercase tracking-widest">Select anatomy</p>
                                 </div>
                             )}
                         </div>
                     )}

                     {activeTab === 'flow' && (
                         <div className="flex flex-col h-full animate-fade-in">
                             <div className="bg-blue-50 p-10 rounded-[48px] border border-blue-100 text-center mb-8 shadow-inner">
                                 <div className="w-16 h-16 bg-blue-600 text-white rounded-3xl flex items-center justify-center font-black text-2xl mx-auto mb-6 shadow-2xl shadow-blue-100">
                                     {flowIndex + 1}
                                 </div>
                                 <h4 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Hemodynamics Loop</h4>
                                 <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">Circulation cycle mapping</p>
                             </div>
                             <div className="flex gap-4 mt-auto">
                                 <button onClick={() => setFlowIndex(prev => (prev - 1 + FLOW_COORDS.length) % FLOW_COORDS.length)} className="p-5 bg-slate-100 rounded-3xl text-slate-600 hover:bg-slate-200 transition-all"><ChevronLeft/></button>
                                 <button onClick={() => setFlowIndex(prev => (prev + 1) % FLOW_COORDS.length)} className="flex-1 py-5 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:bg-indigo-700 transition-all">Next Pulse</button>
                             </div>
                         </div>
                     )}

                     {activeTab === 'impulse' && (
                        <div className="flex flex-col items-center justify-center h-full animate-fade-in text-center">
                            <Zap className="text-yellow-500 mb-8 animate-bounce" size={60} fill="currentColor"/>
                            <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Electrical System</h3>
                            <p className="text-slate-400 text-xs font-bold uppercase mt-2 mb-10">Bio-electric potential mapping</p>
                            <button onClick={() => setImpulseIndex(0)} className="w-full py-6 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">Trigger SA Node</button>
                        </div>
                     )}
                 </div>
             </div>
         </div>
      </div>
    </div>
  );
};
export default Heart;
