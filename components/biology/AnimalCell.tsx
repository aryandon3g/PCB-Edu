
import React, { useState } from 'react';
import { Microscope, ZoomIn, ZoomOut, Lightbulb, User, Hand, X } from 'lucide-react';
import { Language } from '../../types';

interface AnimalCellProps {
  language: Language;
}

const DATA: Record<string, any> = {
  nucleus: { 
    name: { en: "Nucleus", hi: "केंद्रक" }, 
    trick: { en: "The Brain / CEO", hi: "मस्तिष्क / बॉस" }, 
    desc: { en: "Contains genetic material and controls all cell activities. The main CPU of the cell.", hi: "आनुवंशिक सामग्री रखता है और सभी गतिविधियों को नियंत्रित करता है।" } 
  },
  mitochondria: { 
    name: { en: "Mitochondria", hi: "सूत्रकणिका" }, 
    trick: { en: "Powerhouse", hi: "ऊर्जा घर" }, 
    desc: { en: "Generates ATP, the energy currency of the cell. Essential for life processes.", hi: "कोशिका के लिए ऊर्जा (ATP) उत्पन्न करता है।" } 
  },
  lysosome: { 
    name: { en: "Lysosome", hi: "लियनकाय" }, 
    trick: { en: "Suicide Bag", hi: "आत्मघाती थैली" }, 
    desc: { en: "Disposes of waste and cellular debris. Can digest the whole cell if it bursts.", hi: "कचरा निपटान प्रणाली। यह कोशिका को साफ रखता है।" } 
  }
};

const AnimalCell: React.FC<AnimalCellProps> = ({ language }) => {
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  return (
    <div className="flex flex-col gap-6 h-full animate-slide-up pb-10">
      
      {/* Lab Header */}
      <div className="bg-white/80 backdrop-blur-xl p-5 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-rose-100 text-rose-600 rounded-2xl shadow-inner"><Microscope size={24}/></div>
           <h2 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Animal Cell Morphology</h2>
        </div>
        
        <div className="flex items-center gap-4 bg-slate-100/50 p-2 rounded-xl border border-slate-200">
             <button onClick={() => setZoom(Math.max(1, zoom - 0.5))} className="p-2 text-slate-500 hover:text-rose-600 transition-colors"><ZoomOut size={20}/></button>
             <span className="text-xs font-black w-10 text-center text-slate-600">{Math.round(zoom * 100)}%</span>
             <button onClick={() => setZoom(Math.min(3, zoom + 0.5))} className="p-2 text-slate-500 hover:text-rose-600 transition-colors"><ZoomIn size={20}/></button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* SVG Visualization Container */}
        <div className="flex-1 bg-white rounded-[32px] border border-slate-200 shadow-sm relative overflow-hidden flex items-center justify-center p-10">
           <div className="absolute top-6 left-6 flex items-center gap-2 bg-slate-50 p-2 rounded-lg text-slate-400 pointer-events-none">
              <Hand size={16}/> <span className="text-[10px] font-black uppercase tracking-widest">Click Organelles to Scan</span>
           </div>

           <div className="transition-transform duration-500 ease-out" style={{ transform: `scale(${zoom})` }}>
                <svg viewBox="0 0 500 400" className="w-[350px] md:w-[450px] drop-shadow-2xl overflow-visible">
                    {/* Cell Membrane */}
                    <path 
                        d="M250,40 C360,30 460,100 450,220 C440,340 350,390 250,380 C140,390 40,320 50,200 C60,90 150,50 250,40 Z" 
                        fill="#fff1f2" stroke="#fb7185" strokeWidth="8" strokeDasharray="10 5"
                        className="cursor-pointer hover:stroke-rose-400 transition-all"
                    />
                    {/* Nucleus */}
                    <circle 
                        cx="250" cy="210" r="45" 
                        fill="#e879f9" stroke="#a21caf" strokeWidth={selected === 'nucleus' ? 6 : 2} 
                        onClick={() => setSelected('nucleus')} 
                        className="cursor-pointer hover:scale-110 transition-all origin-center" 
                    />
                    {/* Mitochondria */}
                    <ellipse 
                        cx="120" cy="100" rx="25" ry="12" 
                        fill="#fca5a5" stroke="#b91c1c" strokeWidth={selected === 'mitochondria' ? 4 : 2} 
                        onClick={() => setSelected('mitochondria')} 
                        className="cursor-pointer hover:scale-110 transition-all origin-center" 
                    />
                    {/* Lysosome */}
                    <circle 
                        cx="100" cy="280" r="14" 
                        fill="#fde047" stroke="#b45309" strokeWidth={selected === 'lysosome' ? 4 : 2} 
                        onClick={() => setSelected('lysosome')} 
                        className="cursor-pointer hover:scale-110 transition-all origin-center" 
                    />
                </svg>
           </div>
        </div>

        {/* Info Card Panel */}
        <div className="w-full lg:w-96 flex flex-col gap-4">
            {selected ? (
                <div className="bg-white/90 backdrop-blur-md rounded-[32px] border border-slate-200 shadow-2xl overflow-hidden animate-fade-in flex flex-col flex-1 h-full">
                    <div className="bg-rose-600 p-6 text-white flex justify-between items-center">
                        <h3 className="font-black text-xl tracking-tight uppercase">{DATA[selected].name[language]}</h3>
                        <button onClick={() => setSelected(null)} className="p-2 hover:bg-white/10 rounded-xl transition-colors"><X size={24}/></button>
                    </div>
                    <div className="p-8 space-y-8 overflow-y-auto">
                        <div className="bg-yellow-50 p-6 rounded-2xl border border-yellow-200 flex gap-4">
                             <Lightbulb className="text-yellow-600 flex-shrink-0" size={28}/>
                             <div>
                                <span className="text-[10px] font-black text-yellow-700 uppercase tracking-widest block mb-1">Memory Trick</span>
                                <span className="text-lg font-bold text-slate-800">"{DATA[selected].trick[language]}"</span>
                             </div>
                        </div>
                        <div className="flex gap-4 items-start">
                             <User className="text-slate-300 mt-1" size={20}/>
                             <p className="text-slate-600 text-sm md:text-base leading-relaxed font-medium">
                                {DATA[selected].desc[language]}
                             </p>
                        </div>
                    </div>
                    <div className="p-4 mt-auto border-t border-slate-100 text-center">
                         <button onClick={() => setSelected(null)} className="text-[10px] font-black text-rose-600 uppercase tracking-widest hover:underline">Scan Another Organelle</button>
                    </div>
                </div>
            ) : (
                <div className="bg-slate-50 p-10 rounded-[32px] border-4 border-dashed border-slate-200 text-center flex flex-col items-center justify-center flex-1 opacity-60">
                    <Hand className="mb-4 text-slate-400" size={48} />
                    <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Select part of the cell to begin scanning</p>
                </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default AnimalCell;
