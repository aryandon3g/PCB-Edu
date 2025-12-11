import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface ProjectileProps {
  language: Language;
}

const Projectile: React.FC<ProjectileProps> = ({ language }) => {
  const [velocity, setVelocity] = useState(50); // m/s
  const [angle, setAngle] = useState(45); // degrees
  const [gravity, setGravity] = useState(9.8);
  const [path, setPath] = useState<{x:number, y:number}[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Calculate trajectory points
  useEffect(() => {
    const points = [];
    const rad = angle * (Math.PI / 180);
    const vX = velocity * Math.cos(rad);
    const vY = velocity * Math.sin(rad);
    const totalTime = (2 * vY) / gravity;
    
    // Generate 50 points
    for (let t = 0; t <= totalTime; t += totalTime / 50) {
      const x = vX * t;
      const y = (vY * t) - (0.5 * gravity * t * t);
      points.push({ x, y });
    }
    setPath(points);
    setProgress(0);
    setIsAnimating(false);
  }, [velocity, angle, gravity]);

  useEffect(() => {
    let animId: number;
    if (isAnimating && progress < path.length - 1) {
      animId = requestAnimationFrame(() => {
        setProgress(prev => prev + 0.5); // Speed factor
      });
    }
    return () => cancelAnimationFrame(animId);
  }, [isAnimating, progress, path]);

  const handleFire = () => {
    setProgress(0);
    setIsAnimating(true);
  };

  // Scaling for SVG
  const maxX = 300; // Max expected range approx
  const scale = 2; 

  return (
    <div className="flex flex-col h-auto lg:h-full gap-6">
      <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-full">
        {/* Visualization */}
        <div className="w-full lg:flex-1 bg-slate-900 rounded-xl shadow-sm relative overflow-hidden flex items-end justify-start min-h-[300px] p-4">
          <div className="absolute top-4 left-4 text-sm font-semibold text-slate-300">
            {TRANSLATIONS.projectile[language]}
          </div>
          
          <svg className="w-full h-full" viewBox="0 0 600 400" preserveAspectRatio="xMinYMax meet">
             {/* Ground */}
             <line x1="0" y1="380" x2="600" y2="380" stroke="#475569" strokeWidth="2" />
             
             {/* Cannon */}
             <g transform={`translate(20, 380) rotate(${-angle})`}>
                <rect x="0" y="-10" width="40" height="20" fill="#64748b" rx="2" />
             </g>
             
             {/* Trajectory Path (Dashed) */}
             <polyline 
                points={path.map(p => `${20 + p.x * scale},${380 - p.y * scale}`).join(' ')}
                fill="none"
                stroke="#94a3b8"
                strokeWidth="2"
                strokeDasharray="4 4"
                opacity="0.5"
             />

             {/* Ball */}
             {path.length > 0 && (
               <circle 
                  cx={20 + path[Math.min(Math.floor(progress), path.length - 1)].x * scale} 
                  cy={380 - path[Math.min(Math.floor(progress), path.length - 1)].y * scale} 
                  r="6" 
                  fill="#f43f5e" 
               />
             )}
          </svg>

          {/* Stats Overlay */}
          <div className="absolute top-4 right-4 bg-slate-800/80 text-white p-3 rounded text-xs font-mono border border-slate-700">
            <div>Max H: {Math.max(...path.map(p => p.y)).toFixed(1)}m</div>
            <div>Range: {path[path.length-1]?.x.toFixed(1)}m</div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full lg:w-80 flex flex-col gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 space-y-6">
             {/* Velocity */}
             <div>
               <div className="flex justify-between mb-2">
                 <label className="text-sm font-medium text-slate-700">{TRANSLATIONS.velocity[language]}</label>
                 <span className="text-sm text-slate-500">{velocity} m/s</span>
               </div>
               <input type="range" min="10" max="100" value={velocity} onChange={e => setVelocity(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer" />
             </div>

             {/* Angle */}
             <div>
               <div className="flex justify-between mb-2">
                 <label className="text-sm font-medium text-slate-700">{TRANSLATIONS.angle[language]}</label>
                 <span className="text-sm text-slate-500">{angle}°</span>
               </div>
               <input type="range" min="0" max="90" value={angle} onChange={e => setAngle(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer" />
             </div>

             {/* Gravity */}
             <div>
               <div className="flex justify-between mb-2">
                 <label className="text-sm font-medium text-slate-700">{TRANSLATIONS.gravity[language]}</label>
                 <span className="text-sm text-slate-500">{gravity} m/s²</span>
               </div>
               <input type="range" min="1.6" max="20" step="0.1" value={gravity} onChange={e => setGravity(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg cursor-pointer" />
             </div>

             <button onClick={handleFire} className="w-full flex items-center justify-center gap-2 py-3 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold transition-colors">
                <Play size={18} fill="currentColor" /> {TRANSLATIONS.fire[language]}
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Projectile;