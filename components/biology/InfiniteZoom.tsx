import React, { useState } from 'react';
import { ZoomIn, ZoomOut } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface InfiniteZoomProps {
  language: Language;
}

const InfiniteZoom: React.FC<InfiniteZoomProps> = ({ language }) => {
  const [zoomLevel, setZoomLevel] = useState(0); 

  const STAGES = [
    { level: 0, name: { en: "Organism (Leaf)", hi: "जीव (पत्ती)" }, scaleStart: 1, img: "https://picsum.photos/id/10/800/800" }, 
    { level: 25, name: { en: "Tissue Structure", hi: "ऊतक संरचना" }, scaleStart: 5, img: "https://picsum.photos/id/292/800/800" }, 
    { level: 50, name: { en: "Plant Cell", hi: "पादप कोशिका" }, scaleStart: 20, img: "https://picsum.photos/id/152/800/800" }, 
    { level: 75, name: { en: "Chloroplast", hi: "क्लोरोप्लास्ट" }, scaleStart: 100, img: "https://picsum.photos/id/118/800/800" }, 
    { level: 100, name: { en: "Photosynthesis (Atomic)", hi: "प्रकाश संश्लेषण (परमाणु)" }, scaleStart: 500, img: "https://picsum.photos/id/133/800/800" } 
  ];

  const currentStageIndex = STAGES.findIndex((stage, idx) => {
    const nextStage = STAGES[idx + 1];
    return zoomLevel >= stage.level && (!nextStage || zoomLevel < nextStage.level);
  });
  
  const displayScale = Math.pow(1.1, zoomLevel); 

  return (
    <div className="flex flex-col h-full gap-4 relative overflow-hidden">
      <div className="flex-1 bg-black rounded-xl overflow-hidden relative shadow-inner border border-slate-800">
        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-75 ease-out will-change-transform" style={{ transform: `scale(${displayScale})`, transformOrigin: 'center center' }} />
        {STAGES.map((stage, idx) => {
            const isActive = idx === currentStageIndex;
            const relativeZoom = Math.max(1, Math.pow(1.05, zoomLevel - stage.level));
            return (
                <div key={idx} className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-500" style={{ opacity: isActive ? 1 : 0, zIndex: 10 }}>
                    <img src={stage.img} alt="Zoom Layer" className="w-full h-full object-cover origin-center transition-transform duration-75" style={{ transform: isActive ? `scale(${relativeZoom})` : 'scale(1)' }} />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-widest uppercase opacity-80 drop-shadow-lg text-center px-4">
                            {language === Language.ENGLISH ? stage.name.en : stage.name.hi}
                        </h2>
                    </div>
                </div>
            )
        })}
        <div className="absolute top-4 left-4 bg-black/60 text-white p-3 rounded-lg backdrop-blur-sm border border-white/10 max-w-xs">
            <h3 className="font-semibold text-sm mb-1">{TRANSLATIONS.infiniteZoom[language]}</h3>
            <p className="text-xs text-gray-300">{language === Language.ENGLISH ? `Magnification: ${Math.floor(displayScale)}x` : `बर्धन: ${Math.floor(displayScale)}x`}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center gap-4">
        <div className="flex items-center gap-3 w-full md:w-auto">
             <ZoomOut size={20} className="text-slate-500" />
             <input type="range" min="0" max="100" step="0.5" value={zoomLevel} onChange={(e) => setZoomLevel(parseFloat(e.target.value))} className="w-full md:w-96 h-3 bg-gradient-to-r from-green-300 via-blue-400 to-purple-500 rounded-lg appearance-none cursor-pointer" />
             <ZoomIn size={20} className="text-slate-500" />
        </div>
      </div>
    </div>
  );
};
export default InfiniteZoom;