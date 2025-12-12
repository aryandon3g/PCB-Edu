import React, { useState } from 'react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface PhScaleProps {
  language: Language;
}

const PhScale: React.FC<PhScaleProps> = ({ language }) => {
  const [ph, setPh] = useState(7);

  // Colors mapping from 0 (Red) to 7 (Green) to 14 (Purple)
  const getPhColor = (val: number) => {
    if (val < 7) {
      // Red to Green
      const r = 255;
      const g = Math.floor((val / 7) * 255);
      const b = 0;
      return `rgb(${r}, ${g}, ${b})`;
    } else {
      // Green to Purple
      const r = Math.floor(((val - 7) / 7) * 128);
      const g = Math.floor(255 - ((val - 7) / 7) * 255);
      const b = Math.floor(((val - 7) / 7) * 128 + 127);
      return `rgb(${r}, ${g}, ${b})`;
    }
  };

  // Calculate H+ vs OH- icons
  // Logarithmic scale visual representation (simplified)
  const hIcons = Math.max(1, Math.floor(Math.pow(10, (7 - ph) / 3) * 5));
  const ohIcons = Math.max(1, Math.floor(Math.pow(10, (ph - 7) / 3) * 5));
  
  // Cap for visual sanity
  const displayH = Math.min(hIcons, 50);
  const displayOh = Math.min(ohIcons, 50);

  return (
    <div className="flex flex-col h-auto md:h-full landscape:h-full gap-6">
      <div className="flex flex-col md:flex-row landscape:flex-row gap-6 h-auto md:h-full landscape:h-full">
        
        {/* Visual */}
        <div className="w-full md:flex-1 bg-white rounded-xl shadow-sm border border-slate-200 relative flex flex-col items-center justify-center p-4 md:p-8 min-h-[400px] landscape:min-h-0">
           <div className="text-xl font-bold mb-4" style={{ color: getPhColor(ph) }}>pH {ph}</div>
           
           <div className="w-48 h-64 md:w-64 md:h-80 border-4 border-slate-300 rounded-b-2xl bg-slate-50 relative overflow-hidden transition-colors duration-500"
                style={{ backgroundColor: getPhColor(ph) + '40' }}> {/* 40 is opacity in hex */}
               
               <div className="absolute inset-0 p-4 flex flex-wrap content-end gap-1">
                  {Array.from({ length: displayH }).map((_, i) => (
                      <div key={`h-${i}`} className="w-3 h-3 rounded-full bg-red-500 animate-bounce" style={{ animationDelay: Math.random() + 's', animationDuration: (Math.random() + 1) + 's' }} title="H+ Ion" />
                  ))}
                  {Array.from({ length: displayOh }).map((_, i) => (
                      <div key={`oh-${i}`} className="w-4 h-4 rounded-full bg-blue-600 animate-pulse" style={{ animationDelay: Math.random() + 's' }} title="OH- Ion" />
                  ))}
               </div>
               
               <div className="absolute bottom-0 left-0 right-0 h-full bg-gradient-to-t from-black/10 to-transparent pointer-events-none"></div>
           </div>
           
           <div className="flex gap-8 mt-6 text-sm font-semibold">
              <div className="flex items-center gap-2">
                 <div className="w-3 h-3 rounded-full bg-red-500"></div>
                 <span>H+ (Acidic)</span>
              </div>
              <div className="flex items-center gap-2">
                 <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                 <span>OH- (Basic)</span>
              </div>
           </div>
        </div>

        {/* Controls */}
        <div className="w-full md:w-72 lg:w-80 landscape:w-72 flex flex-col gap-6 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6 h-full overflow-y-auto">
             <div>
                <div className="flex justify-between mb-2">
                   <label className="text-sm font-medium text-slate-700">{TRANSLATIONS.phLevel[language]}</label>
                   <span className="text-sm font-bold" style={{ color: getPhColor(ph) }}>{ph}</span>
                </div>
                {/* pH Gradient Slider Background */}
                <div className="relative h-4 rounded-lg w-full mb-2" style={{ background: 'linear-gradient(to right, #ff0000, #00ff00, #4b0082)' }}>
                    <input 
                        type="range" 
                        min="0" 
                        max="14" 
                        step="0.5" 
                        value={ph} 
                        onChange={e => setPh(Number(e.target.value))} 
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    />
                    <div 
                        className="absolute top-0 bottom-0 w-1 bg-white border border-black pointer-events-none"
                        style={{ left: `${(ph/14)*100}%` }}
                    ></div>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                    <span>Acid (0)</span>
                    <span>Neutral (7)</span>
                    <span>Base (14)</span>
                </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
export default PhScale;