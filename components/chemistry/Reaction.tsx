import React, { useState, useEffect } from 'react';
import { RotateCcw, Flame } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface ReactionProps {
  language: Language;
}

const Reaction: React.FC<ReactionProps> = ({ language }) => {
  const [temperature, setTemperature] = useState(25);
  const [concentration, setConcentration] = useState(50);
  const [reactionProgress, setReactionProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    const tempFactor = Math.pow(2, (temperature - 25) / 10);
    const concFactor = concentration / 50;
    const rate = 0.5 * tempFactor * concFactor;

    if (reactionProgress < 100) {
      interval = setInterval(() => {
        setReactionProgress(prev => Math.min(prev + rate, 100));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [temperature, concentration, reactionProgress]);

  const handleReset = () => {
    setReactionProgress(0);
  };

  const getSolutionColor = (progress: number) => {
    const r = Math.min(255, progress * 2.55);
    const b = Math.max(0, 255 - (progress * 2.55));
    return `rgb(${r}, 50, ${b})`;
  };

  const particleSpeed = (temperature / 100) * 2 + 0.5;

  return (
    <div className="flex flex-col h-auto md:h-full landscape:h-full gap-6">
      <div className="flex flex-col md:flex-row landscape:flex-row gap-6 h-auto md:h-full landscape:h-full">
        <div className="w-full md:flex-1 bg-white rounded-xl shadow-sm border border-slate-200 relative flex items-center justify-center p-4 md:p-8 min-h-[350px] landscape:min-h-0">
          <div className="relative w-48 h-64 border-b-4 border-l-4 border-r-4 border-slate-300 rounded-b-xl overflow-hidden bg-slate-50">
             <div className="absolute bottom-0 left-0 right-0 transition-colors duration-500 ease-linear" style={{ height: '80%', backgroundColor: getSolutionColor(reactionProgress) }}>
                {Array.from({ length: Math.floor(concentration / 5) }).map((_, i) => (
                  <div key={i} className="absolute bg-white/40 rounded-full" style={{ width: Math.random() * 8 + 4 + 'px', height: Math.random() * 8 + 4 + 'px', left: Math.random() * 100 + '%', top: Math.random() * 100 + '%', animation: `float ${3/particleSpeed}s infinite linear`, animationDelay: `${Math.random() * 2}s` }} />
                ))}
             </div>
          </div>
          {temperature > 50 && <div className="absolute bottom-10 animate-pulse text-orange-500"><Flame size={32} className="mx-auto" /></div>}
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded shadow-sm text-sm font-mono border border-slate-100">{TRANSLATIONS.reactionRate[language]}: {Math.round(reactionProgress)}%</div>
        </div>

        <div className="w-full md:w-72 lg:w-80 landscape:w-72 flex flex-col gap-6 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6 h-full overflow-y-auto">
             <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">{TRANSLATIONS.temperature[language]}</label>
                <span className="text-sm text-slate-500">{temperature}°C</span>
              </div>
              <input type="range" min="0" max="100" value={temperature} onChange={(e) => setTemperature(parseInt(e.target.value))} className="w-full h-2 bg-gradient-to-r from-blue-300 via-yellow-200 to-red-400 rounded-lg appearance-none cursor-pointer" />
            </div>
             <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">{TRANSLATIONS.concentration[language]}</label>
                <span className="text-sm text-slate-500">{concentration}%</span>
              </div>
              <input type="range" min="10" max="100" value={concentration} onChange={(e) => setConcentration(parseInt(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
            </div>
             <button onClick={handleReset} className="w-full flex items-center justify-center gap-2 py-2 text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"><RotateCcw size={16} />{TRANSLATIONS.reset[language]}</button>
          </div>
        </div>
      </div>
      <style>{`@keyframes float { 0% { transform: translateY(0); opacity: 0; } 50% { opacity: 1; } 100% { transform: translateY(-100px); opacity: 0; } }`}</style>
    </div>
  );
};
export default Reaction;