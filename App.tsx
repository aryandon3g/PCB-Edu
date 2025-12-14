import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Atom, FlaskConical, Dna, Languages, Maximize, Minimize, Dumbbell, Eye, EyeOff } from 'lucide-react';
import { Language, Subject } from './types';
import { TRANSLATIONS, SUBJECT_ICONS } from './constants';

// Modules
import PhysicsModule from './components/PhysicsModule';
import ChemistryModule from './components/ChemistryModule';
import BiologyModule from './components/BiologyModule';
import LadoModule from './components/LadoModule';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [activeSubject, setActiveSubject] = useState<Subject>(Subject.PHYSICS);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);

  const toggleLanguage = () => {
    setLanguage(prev => prev === Language.ENGLISH ? Language.HINDI : Language.ENGLISH);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullScreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false);
        });
      }
    }
  };

  // Listen for fullscreen change events (e.g. if user presses ESC)
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullScreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
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

  const NavItem = ({ subject, icon: Icon, label }: { subject: Subject, icon: any, label: string }) => (
    <button
      onClick={() => setActiveSubject(subject)}
      className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 p-2 md:p-3 rounded-xl transition-all duration-200 group w-full ${
        activeSubject === subject 
          ? 'text-indigo-600 md:bg-indigo-50 md:text-indigo-700' 
          : 'text-slate-500 hover:text-slate-800 md:hover:bg-slate-50'
      }`}
    >
      <Icon size={24} className={`mb-1 md:mb-0 ${activeSubject === subject ? "stroke-[2.5px]" : ""}`} />
      <span className="text-[10px] md:text-base font-medium text-center md:text-left leading-tight">{label}</span>
    </button>
  );

  return (
    <div className="flex h-[100dvh] w-full bg-slate-50 overflow-hidden relative">
      
      {/* Sidebar: Visible on Desktop, Tablet AND Landscape Mobile (Togglable) */}
      <aside className={`${isNavVisible ? 'md:flex' : 'md:hidden'} hidden landscape:flex w-20 lg:w-64 bg-white border-r border-slate-200 flex-col py-4 md:py-6 flex-shrink-0 z-20 transition-all duration-300 overflow-y-auto`}>
        
        {/* Logo Area */}
        <div className="mb-6 md:mb-10 px-2 lg:px-6 flex items-center justify-center lg:justify-start gap-3">
          <div className="w-8 h-8 md:w-10 md:h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg md:text-xl shadow-lg shadow-indigo-200 flex-shrink-0">
            V
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight hidden lg:block">
            {TRANSLATIONS.appTitle[language]}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 w-full space-y-2 px-1 md:px-2 lg:px-4">
          <NavItem subject={Subject.PHYSICS} icon={Atom} label={TRANSLATIONS.physics[language]} />
          <NavItem subject={Subject.CHEMISTRY} icon={FlaskConical} label={TRANSLATIONS.chemistry[language]} />
          <NavItem subject={Subject.BIOLOGY} icon={Dna} label={TRANSLATIONS.biology[language]} />
          <NavItem subject={Subject.LADO} icon={Dumbbell} label={TRANSLATIONS.lado[language]} />
        </nav>

        {/* Bottom Actions */}
        <div className="px-1 md:px-2 lg:px-4 mt-auto space-y-2">
           <button 
            onClick={toggleFullScreen}
            className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 lg:gap-3 p-2 rounded-xl border border-transparent hover:bg-slate-50 transition-colors text-slate-500"
            title="Toggle Fullscreen"
          >
            {isFullScreen ? <Minimize size={20} /> : <Maximize size={20} />}
            <span className="hidden lg:inline text-sm font-medium">{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>

          <button 
            onClick={toggleLanguage}
            className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-2 lg:gap-3 p-2 lg:p-3 rounded-xl border border-transparent lg:border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Languages size={20} className="text-slate-600" />
            <span className="font-medium text-slate-700 text-[10px] lg:text-sm text-center lg:text-left">
              {language === Language.ENGLISH ? <span className="hidden lg:inline">Switch to Hindi</span> : <span className="hidden lg:inline">अंग्रेजी में बदलें</span>}
              <span className="lg:hidden">{language === Language.ENGLISH ? 'HI' : 'EN'}</span>
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 relative w-full">
        
        {/* Mobile Header (Hidden in Landscape to save space) */}
        <header className="md:hidden landscape:hidden h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              V
            </div>
            <span className="font-bold text-lg text-slate-800">{TRANSLATIONS.appTitle[language]}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleFullScreen}
              className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 transition-colors border border-slate-200 text-slate-600"
              aria-label="Toggle Fullscreen"
            >
              {isFullScreen ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>

            <button 
              onClick={toggleLanguage}
              className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
            >
              <Languages size={18} className="text-slate-600" />
            </button>
          </div>
        </header>

        {/* Module Render Container */}
        {/* Adjusted padding for landscape */}
        <div className={`flex-1 overflow-y-auto overflow-x-hidden p-3 md:p-6 lg:p-8 landscape:p-4 transition-all duration-300 ${isNavVisible ? 'pb-24 md:pb-8' : 'pb-4'} scroll-smooth -webkit-overflow-scrolling-touch`}>
           <div className="max-w-[1600px] mx-auto h-auto md:h-full landscape:h-full">
              {renderModule()}
           </div>
        </div>

        {/* NAVIGATION TOGGLE BUTTON (Floating) */}
        <button 
           onClick={() => setIsNavVisible(!isNavVisible)}
           className="absolute bottom-4 right-4 z-40 bg-slate-900 text-white p-3 rounded-full shadow-xl hover:bg-slate-800 transition-all active:scale-95"
           title="Toggle Navigation"
        >
           {isNavVisible ? <EyeOff size={24} /> : <Eye size={24} />}
        </button>

        {/* Mobile Bottom Navigation (Hidden in Landscape) */}
        <div className={`md:hidden landscape:hidden absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around items-center py-2 px-1 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe transition-transform duration-300 ${isNavVisible ? 'translate-y-0' : 'translate-y-full'}`}>
          <NavItem subject={Subject.PHYSICS} icon={Atom} label={TRANSLATIONS.physics[language]} />
          <NavItem subject={Subject.CHEMISTRY} icon={FlaskConical} label={TRANSLATIONS.chemistry[language]} />
          <NavItem subject={Subject.BIOLOGY} icon={Dna} label={TRANSLATIONS.biology[language]} />
          <NavItem subject={Subject.LADO} icon={Dumbbell} label={TRANSLATIONS.lado[language]} />
        </div>

      </main>
      <style>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 1rem); }
      `}</style>
    </div>
  );
};

export default App;