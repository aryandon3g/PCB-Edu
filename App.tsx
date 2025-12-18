
import React, { useState, useEffect, Component, ErrorInfo, ReactNode } from 'react';
import { Atom, FlaskConical, Dna, Languages, Maximize, Minimize, Dumbbell, Eye, EyeOff, LayoutGrid, ChevronRight, AlertCircle, RefreshCcw } from 'lucide-react';
import { Language, Subject } from './types';
import { TRANSLATIONS } from './constants';

// Modules
import PhysicsModule from './components/PhysicsModule';
import ChemistryModule from './components/ChemistryModule';
import BiologyModule from './components/BiologyModule';
import LadoModule from './components/LadoModule';

// Simple Error Boundary for UI Safety
class UIErrorBoundary extends Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error, errorInfo: ErrorInfo) { console.error("UI Bug Detected:", error, errorInfo); }
  render() {
    if (this.state.hasError) {
      return (
        <div className="h-full w-full flex flex-col items-center justify-center p-6 text-center bg-slate-50">
          <AlertCircle size={48} className="text-rose-500 mb-4" />
          <h2 className="text-xl font-black text-slate-800 uppercase">UI Error Detected</h2>
          <p className="text-slate-500 text-sm mt-2">Bhai, is section mein kuch glitch hai. Please reset karo.</p>
          <button onClick={() => window.location.reload()} className="mt-6 flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold shadow-lg hover:bg-indigo-700">
            <RefreshCcw size={18} /> Restart App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [activeSubject, setActiveSubject] = useState<Subject>(Subject.PHYSICS);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  // Auto-hide nav on small landscape devices for better focus
  useEffect(() => {
    const handleResize = () => {
      if (window.innerHeight < 500 && window.innerWidth > window.innerHeight) {
        setIsNavVisible(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === Language.ENGLISH ? Language.HINDI : Language.ENGLISH);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(e => console.error(e));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  };

  useEffect(() => {
    const fsHandler = () => setIsFullScreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", fsHandler);
    return () => document.removeEventListener("fullscreenchange", fsHandler);
  }, []);

  const renderModule = () => {
    switch(activeSubject) {
      case Subject.PHYSICS: return <PhysicsModule language={language} />;
      case Subject.CHEMISTRY: return <ChemistryModule language={language} />;
      case Subject.BIOLOGY: return <BiologyModule language={language} />;
      case Subject.LADO: return <LadoModule language={language} isNavVisible={isNavVisible} />;
      default: return <PhysicsModule language={language} />;
    }
  };

  const NavItem = ({ subject, icon: Icon, label, color }: { subject: Subject, icon: any, label: string, color: string }) => (
    <button
      onClick={() => setActiveSubject(subject)}
      className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-4 p-3.5 rounded-[24px] transition-all duration-300 group w-full ${
        activeSubject === subject 
          ? `text-${color}-700 bg-${color}-50/80 shadow-inner border border-${color}-100` 
          : 'text-slate-400 hover:text-slate-700 hover:bg-slate-100/50'
      }`}
    >
      <div className={`p-2.5 rounded-2xl transition-all duration-300 transform ${activeSubject === subject ? `bg-${color}-600 text-white shadow-lg shadow-${color}-200 scale-110` : 'bg-slate-100 text-slate-400 group-hover:scale-105'}`}>
        <Icon size={22} strokeWidth={activeSubject === subject ? 2.5 : 2} />
      </div>
      <span className="text-[11px] md:text-sm font-black uppercase tracking-tight hidden lg:block">{label}</span>
      {activeSubject === subject && <ChevronRight size={16} className="ml-auto hidden lg:block opacity-40 animate-pulse" />}
    </button>
  );

  return (
    <div className="flex h-[100dvh] w-full bg-slate-50 text-slate-900 overflow-hidden relative font-sans selection:bg-indigo-100">
      
      {/* Sidebar - Desktop Interface */}
      <aside className={`hidden landscape:flex md:flex ${isNavVisible ? 'w-24 lg:w-72' : 'w-0 opacity-0 pointer-events-none'} bg-white border-r border-slate-200 flex-col py-8 flex-shrink-0 z-40 transition-all duration-500 ease-in-out`}>
        
        <div className="mb-12 px-6 flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-[18px] flex items-center justify-center text-white font-black text-2xl shadow-xl rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            V
          </div>
          <div className="hidden lg:block overflow-hidden">
            <span className="font-black text-xl text-slate-900 tracking-tighter uppercase block leading-none whitespace-nowrap">
              {TRANSLATIONS.appTitle[language]}
            </span>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1 block">Ultimate Sandbox</span>
          </div>
        </div>

        <nav className="flex-1 w-full space-y-3 px-4">
          <NavItem subject={Subject.PHYSICS} icon={Atom} label={TRANSLATIONS.physics[language]} color="indigo" />
          <NavItem subject={Subject.CHEMISTRY} icon={FlaskConical} label={TRANSLATIONS.chemistry[language]} color="emerald" />
          <NavItem subject={Subject.BIOLOGY} icon={Dna} label={TRANSLATIONS.biology[language]} color="rose" />
          <NavItem subject={Subject.LADO} icon={Dumbbell} label={TRANSLATIONS.lado[language]} color="green" />
        </nav>

        <div className="px-4 mt-auto space-y-4">
          <div className="p-4 bg-slate-50 rounded-[24px] border border-slate-200 hidden lg:block">
            <button onClick={() => setIsNavVisible(false)} className="w-full flex items-center gap-3 p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-white transition-all text-xs font-black uppercase tracking-wider">
              <EyeOff size={16} /> Hide Nav
            </button>
            <button onClick={toggleFullScreen} className="w-full flex items-center gap-3 p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-white transition-all text-xs font-black uppercase tracking-wider mt-1">
              {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />} {isFullScreen ? 'Exit Window' : 'Fullscreen'}
            </button>
          </div>

          <button onClick={toggleLanguage} className="w-full flex items-center justify-center lg:justify-start gap-4 p-4 rounded-[28px] bg-slate-900 text-white shadow-2xl hover:bg-black transition-all transform active:scale-95 group overflow-hidden">
            <div className="bg-white/10 p-2 rounded-xl group-hover:bg-indigo-600 transition-colors">
              <Languages size={20} />
            </div>
            <span className="font-black text-[10px] lg:text-sm uppercase tracking-widest whitespace-nowrap">
              {language === Language.ENGLISH ? 'हिन्दी' : 'English'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Framework */}
      <main className="flex-1 flex flex-col min-h-0 relative w-full bg-slate-50/50">
        
        {/* Mobile Navbar */}
        <header className="md:hidden h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-5 z-30">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-lg">V</div>
            <span className="font-black text-sm uppercase tracking-tighter">{TRANSLATIONS.appTitle[language]}</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="w-10 h-10 bg-slate-100 rounded-xl font-black text-[10px] text-slate-600 flex items-center justify-center">{language === Language.ENGLISH ? 'HI' : 'EN'}</button>
            <button onClick={() => setIsNavVisible(!isNavVisible)} className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center"><LayoutGrid size={20}/></button>
          </div>
        </header>

        {/* Dynamic Content Container */}
        <div className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-500 ${isNavVisible ? 'pb-24 md:pb-6' : 'pb-6'}`}>
           <UIErrorBoundary>
             <div className="max-w-[1600px] mx-auto p-4 md:p-10 lg:p-12 min-h-full">
                {renderModule()}
             </div>
           </UIErrorBoundary>
        </div>

        {/* Global Controls Overlay */}
        <div className="fixed bottom-6 right-6 z-[50] flex flex-col items-end gap-3 pointer-events-none">
          {!isNavVisible && (
            <button
              onClick={() => setIsNavVisible(true)}
              className="px-6 py-4 bg-slate-900 text-white rounded-3xl shadow-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all pointer-events-auto font-black text-[10px] uppercase tracking-[0.2em] animate-bounce-in"
            >
              <Eye size={20} /> Restore Layout
            </button>
          )}
        </div>

        {/* Mobile Floating Bottom Bar */}
        <nav className={`md:hidden absolute bottom-6 left-5 right-5 h-18 bg-white/90 backdrop-blur-2xl border border-white/20 flex justify-around items-center px-2 z-40 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-500 ease-out ${isNavVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-32 opacity-0 scale-90'}`}>
          <NavItem subject={Subject.PHYSICS} icon={Atom} label={TRANSLATIONS.physics[language]} color="indigo" />
          <NavItem subject={Subject.CHEMISTRY} icon={FlaskConical} label={TRANSLATIONS.chemistry[language]} color="emerald" />
          <NavItem subject={Subject.BIOLOGY} icon={Dna} label={TRANSLATIONS.biology[language]} color="rose" />
          <NavItem subject={Subject.LADO} icon={Dumbbell} label={TRANSLATIONS.lado[language]} color="green" />
        </nav>

      </main>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .animate-bounce-in { animation: bounceIn 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes bounceIn { 
          from { opacity: 0; transform: scale(0.8) translateY(20px); } 
          to { opacity: 1; transform: scale(1) translateY(0); } 
        }
        .glass-panel { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.3); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default App;
