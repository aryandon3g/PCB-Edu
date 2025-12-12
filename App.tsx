import React, { useState } from 'react';
import { LayoutDashboard, Atom, FlaskConical, Dna, Languages } from 'lucide-react';
import { Language, Subject } from './types';
import { TRANSLATIONS, SUBJECT_ICONS } from './constants';

// Modules
import PhysicsModule from './components/PhysicsModule';
import ChemistryModule from './components/ChemistryModule';
import BiologyModule from './components/BiologyModule';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.ENGLISH);
  const [activeSubject, setActiveSubject] = useState<Subject>(Subject.PHYSICS);

  const toggleLanguage = () => {
    setLanguage(prev => prev === Language.ENGLISH ? Language.HINDI : Language.ENGLISH);
  };

  const renderModule = () => {
    switch(activeSubject) {
      case Subject.PHYSICS: return <PhysicsModule language={language} />;
      case Subject.CHEMISTRY: return <ChemistryModule language={language} />;
      case Subject.BIOLOGY: return <BiologyModule language={language} />;
      default: return <PhysicsModule language={language} />;
    }
  };

  const NavItem = ({ subject, icon: Icon, label }: { subject: Subject, icon: any, label: string }) => (
    <button
      onClick={() => setActiveSubject(subject)}
      className={`flex flex-col lg:flex-row items-center justify-center lg:justify-start gap-1 lg:gap-3 p-2 lg:p-3 rounded-xl transition-all duration-200 group w-full ${
        activeSubject === subject 
          ? 'text-indigo-600 lg:bg-indigo-50 lg:text-indigo-700' 
          : 'text-slate-500 hover:text-slate-800 lg:hover:bg-slate-50'
      }`}
    >
      <Icon size={24} className={`mb-1 lg:mb-0 ${activeSubject === subject ? "stroke-[2.5px]" : ""}`} />
      <span className="text-[10px] lg:text-base font-medium text-center lg:text-left leading-tight">{label}</span>
    </button>
  );

  return (
    <div className="flex h-[100dvh] w-full bg-slate-50 overflow-hidden">
      
      {/* Desktop/Tablet Sidebar (Hidden on Mobile) */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-slate-200 flex-col py-6 flex-shrink-0 z-20">
        
        {/* Logo Area */}
        <div className="mb-10 px-6 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-200">
            V
          </div>
          <span className="font-bold text-xl text-slate-800 tracking-tight">
            {TRANSLATIONS.appTitle[language]}
          </span>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 w-full space-y-2 px-4">
          <NavItem subject={Subject.PHYSICS} icon={Atom} label={TRANSLATIONS.physics[language]} />
          <NavItem subject={Subject.CHEMISTRY} icon={FlaskConical} label={TRANSLATIONS.chemistry[language]} />
          <NavItem subject={Subject.BIOLOGY} icon={Dna} label={TRANSLATIONS.biology[language]} />
        </nav>

        {/* Bottom Actions */}
        <div className="px-4 mt-auto">
          <button 
            onClick={toggleLanguage}
            className="w-full flex items-center gap-3 p-3 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors"
          >
            <Languages size={20} className="text-slate-600" />
            <span className="font-medium text-slate-700">
              {language === Language.ENGLISH ? 'Switch to Hindi' : 'अंग्रेजी में बदलें'}
            </span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-0 relative w-full">
        
        {/* Mobile Header */}
        <header className="lg:hidden h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">
              V
            </div>
            <span className="font-bold text-lg text-slate-800">{TRANSLATIONS.appTitle[language]}</span>
          </div>
          <button 
            onClick={toggleLanguage}
            className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
          >
            <Languages size={18} className="text-slate-600" />
          </button>
        </header>

        {/* Module Render Container */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-3 lg:p-8 pb-24 lg:pb-8 scroll-smooth -webkit-overflow-scrolling-touch">
           <div className="max-w-7xl mx-auto h-auto lg:h-full">
              {renderModule()}
           </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <div className="lg:hidden absolute bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around items-center py-2 px-1 z-30 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] pb-safe">
          <NavItem subject={Subject.PHYSICS} icon={Atom} label={TRANSLATIONS.physics[language]} />
          <NavItem subject={Subject.CHEMISTRY} icon={FlaskConical} label={TRANSLATIONS.chemistry[language]} />
          <NavItem subject={Subject.BIOLOGY} icon={Dna} label={TRANSLATIONS.biology[language]} />
        </div>

      </main>
      <style>{`
        .pb-safe { padding-bottom: env(safe-area-inset-bottom, 1rem); }
      `}</style>
    </div>
  );
};

export default App;