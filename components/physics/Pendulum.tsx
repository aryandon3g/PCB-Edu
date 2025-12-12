import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface PendulumProps {
  language: Language;
}

const Pendulum: React.FC<PendulumProps> = ({ language }) => {
  const [gravity, setGravity] = useState(9.8);
  const [length, setLength] = useState(1.5);
  const [isRunning, setIsRunning] = useState(false);
  const [angle, setAngle] = useState(Math.PI / 4);
  const [time, setTime] = useState(0);

  const requestRef = useRef<number | null>(null);

  const animate = () => {
    if (!isRunning) return;
    const omega = Math.sqrt(gravity / length);
    const dt = 0.016;
    setTime(prev => {
      const newTime = prev + dt;
      const newAngle = (Math.PI / 4) * Math.cos(omega * newTime);
      setAngle(newAngle);
      return newTime;
    });
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isRunning) requestRef.current = requestAnimationFrame(animate);
    else if (requestRef.current) cancelAnimationFrame(requestRef.current);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, [isRunning, gravity, length]);

  const pivotX = 150;
  const pivotY = 20;
  const scale = 80;
  const bobX = pivotX + Math.sin(angle) * (length * scale);
  const bobY = pivotY + Math.cos(angle) * (length * scale);

  return (
    <div className="flex flex-col h-auto md:h-full landscape:h-full gap-6">
      <div className="flex flex-col md:flex-row landscape:flex-row gap-6 h-auto md:h-full landscape:h-full">
        <div className="w-full md:flex-1 bg-white rounded-xl shadow-sm border border-slate-200 relative overflow-hidden flex items-center justify-center min-h-[300px] landscape:min-h-0">
          <div className="absolute top-4 left-4 text-sm font-semibold text-slate-500">{TRANSLATIONS.pendulum[language]}</div>
          <svg viewBox="0 0 300 400" className="w-full h-full max-h-[400px] overflow-visible">
            <line x1="100" y1="20" x2="200" y2="20" stroke="#334155" strokeWidth="4" />
            <line x1={pivotX} y1={pivotY} x2={bobX} y2={bobY} stroke="#64748b" strokeWidth="2" />
            <circle cx={bobX} cy={bobY} r="15" fill="#4f46e5" />
          </svg>
          <div className="absolute bottom-4 right-4 bg-slate-900/80 text-white p-2 rounded text-xs font-mono">
            T ≈ {(2 * Math.PI * Math.sqrt(length / gravity)).toFixed(2)}s
          </div>
        </div>
        <div className="w-full md:w-72 lg:w-80 landscape:w-72 flex flex-col gap-6 flex-shrink-0">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6 h-full overflow-y-auto">
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">{TRANSLATIONS.gravity[language]}</label>
                <span className="text-sm text-slate-500">{gravity} m/s²</span>
              </div>
              <input type="range" min="1.6" max="24.8" step="0.1" value={gravity} onChange={(e) => setGravity(parseFloat(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-medium text-slate-700">{TRANSLATIONS.length[language]}</label>
                <span className="text-sm text-slate-500">{length} m</span>
              </div>
              <input type="range" min="0.5" max="3.0" step="0.1" value={length} onChange={(e) => setLength(parseFloat(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIsRunning(!isRunning)} className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${isRunning ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                {isRunning ? <Pause size={16} /> : <Play size={16} />} {isRunning ? TRANSLATIONS.stop[language] : TRANSLATIONS.start[language]}
              </button>
              <button onClick={() => { setIsRunning(false); setAngle(Math.PI/4); setTime(0); }} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg"><RotateCcw size={20} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pendulum;