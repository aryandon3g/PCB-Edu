import React, { useState } from 'react';
import { User, Lightbulb } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface DnaHelixProps {
  language: Language;
}

const DNA_INFO = {
    structure: {
        scientist: { en: "Watson, Crick & Franklin (1953)", hi: "वाटसन, क्रिक और फ्रैंकलिन (1953)" },
        trick: { en: "Twisted Ladder", hi: "मुड़ी हुई सीढ़ी" },
    },
    pairs: {
        scientist: { en: "Erwin Chargaff (1950)", hi: "इरविन चार्गाफ (1950)" },
        trick: { en: "Apple in Tree (A-T), Car in Garage (C-G)", hi: "A-T और C-G (जोड़े)" },
    }
};

const DnaHelix: React.FC<DnaHelixProps> = ({ language }) => {
  const [rotation, setRotation] = useState(0);
  const [expanded, setExpanded] = useState(false);

  // SVG Logic for Double Helix
  // Two sine waves phase shifted
  const points = 20;
  const height = 300;
  const width = 100;
  
  const generateStrand = (offset: number) => {
    return Array.from({ length: points }).map((_, i) => {
      const y = (i / (points - 1)) * height;
      // Animate phase based on rotation
      const phase = (i / points) * Math.PI * 4 + (rotation * Math.PI / 180);
      const x = 150 + Math.sin(phase + offset) * (expanded ? 80 : 40);
      // z-index simulation for crossing over
      const z = Math.cos(phase + offset); 
      return { x, y, z, color: offset === 0 ? '#3b82f6' : '#ec4899' };
    });
  };

  const strandA = generateStrand(0);
  const strandB = generateStrand(Math.PI);

  // Combine and sort by z-index to fake 3D
  const allNodes = [...strandA.map(p => ({...p, type: 'A'})), ...strandB.map(p => ({...p, type: 'B'}))];
  
  // Create base pair connections
  const connections = strandA.map((p1, i) => {
    const p2 = strandB[i];
    const zAvg = (p1.z + p2.z) / 2;
    return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y, z: zAvg };
  });

  const renderItems = [
    ...allNodes.map(p => ({ type: 'node', ...p })),
    ...connections.map(c => ({ type: 'link', ...c }))
  ].sort((a, b) => a.z - b.z); // Paint back to front

  return (
    <div className="flex flex-col h-auto lg:h-full gap-6">
      <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-full">
        
        {/* Visualization */}
        <div className="w-full lg:flex-1 bg-slate-900 rounded-xl shadow-sm overflow-hidden flex flex-col items-center justify-center p-8 relative min-h-[400px]">
           <div className="absolute top-4 left-4 bg-slate-800/80 p-3 rounded-lg backdrop-blur border border-slate-700 max-w-xs z-10">
                <div className="flex gap-2 items-center mb-2">
                    <User size={14} className="text-blue-400" />
                    <span className="text-xs text-slate-300">
                        {language === Language.ENGLISH ? DNA_INFO.structure.scientist.en : DNA_INFO.structure.scientist.hi}
                    </span>
                </div>
                <div className="flex gap-2 items-center">
                    <Lightbulb size={14} className="text-yellow-400" />
                    <span className="text-xs font-bold text-white">
                        {language === Language.ENGLISH ? DNA_INFO.structure.trick.en : DNA_INFO.structure.trick.hi}
                    </span>
                </div>
           </div>
           
           <svg width="300" height="350" className="overflow-visible cursor-pointer" onClick={() => setExpanded(!expanded)}>
               {renderItems.map((item, i) => {
                   if (item.type === 'link') {
                       return <line key={`l-${i}`} x1={(item as any).x1} y1={(item as any).y1} x2={(item as any).x2} y2={(item as any).y2} stroke="#cbd5e1" strokeWidth="2" opacity="0.5" />
                   } else {
                       const node = item as any;
                       const radius = 6 + node.z * 2; // Size by depth
                       return (
                           <g key={`n-${i}`}>
                               <circle cx={node.x} cy={node.y} r={radius} fill={node.color} />
                               {expanded && (
                                   <text x={node.x + 10} y={node.y + 4} fill="white" fontSize="10" opacity={0.8}>
                                      {node.type === 'A' ? (i % 2 === 0 ? 'A' : 'G') : (i % 2 === 0 ? 'T' : 'C')}
                                   </text>
                               )}
                           </g>
                       )
                   }
               })}
           </svg>
           <div className="absolute bottom-4 left-4 text-slate-400 text-sm">
             {language === Language.ENGLISH ? "Tap Helix to Expand" : "खोलने के लिए टैप करें"}
           </div>
        </div>

        {/* Controls */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
              <div>
                  <label className="text-sm font-medium text-slate-700 mb-2 block">Rotation</label>
                  <input type="range" min="0" max="360" value={rotation} onChange={e => setRotation(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer" />
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <span className="text-sm font-medium text-slate-700">{TRANSLATIONS.basePairs[language]}</span>
                  <button 
                    onClick={() => setExpanded(!expanded)}
                    className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wide transition-colors ${expanded ? 'bg-indigo-600 text-white' : 'bg-slate-200 text-slate-600'}`}
                  >
                      {expanded ? 'ON' : 'OFF'}
                  </button>
              </div>

              {expanded && (
                  <div className="p-3 bg-indigo-50 rounded border border-indigo-100 text-sm">
                      <div className="font-bold text-indigo-800 mb-1">{language === Language.ENGLISH ? "Chargaff's Rule" : "चार्गाफ का नियम"}</div>
                      <p className="text-slate-600 text-xs mb-2">
                          {language === Language.ENGLISH ? DNA_INFO.pairs.scientist.en : DNA_INFO.pairs.scientist.hi}
                      </p>
                      <div className="font-semibold text-indigo-600">
                          {language === Language.ENGLISH ? DNA_INFO.pairs.trick.en : DNA_INFO.pairs.trick.hi}
                      </div>
                  </div>
              )}
          </div>
        </div>

      </div>
    </div>
  );
};
export default DnaHelix;