
import React, { useState } from 'react';
import { 
  Library, Play, RotateCcw, Brain, ChevronLeft, ChevronRight, 
  Sparkles, GraduationCap, Briefcase, Plane, Wand2, Lightbulb, 
  Clapperboard, BookOpen, Search, X, Gamepad2, Skull
} from 'lucide-react';
import { Deck, Word, GeminiEnrichmentRequest } from './types';
import { DECKS } from './constants';
import { fetchWordEnrichment } from './services/geminiService';
import VocabSurvivor from './components/VocabSurvivor';

// --- SUB-COMPONENTS (Internal for simplicity in this transformation) ---

// 1. Deck Selector
const DeckGrid = ({ onSelect, onLaunchSurvivor }: { onSelect: (deck: Deck) => void, onLaunchSurvivor: () => void }) => {
  return (
    <div className="p-6 max-w-6xl mx-auto h-full overflow-y-auto">
      <div className="mb-10 text-center">
        <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600 mb-4 tracking-tight">
          VocabVerse
        </h1>
        <p className="text-slate-500 font-medium uppercase tracking-widest text-sm">Master words with the power of AI</p>
      </div>

      {/* Survivor Banner */}
      <button 
        onClick={onLaunchSurvivor}
        className="w-full bg-slate-900 rounded-[40px] p-8 mb-10 text-left relative overflow-hidden group hover:scale-[1.01] transition-all duration-300 border-4 border-slate-800 hover:border-green-500 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-blue-500/10 opacity-50"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
           <div className="flex-1">
              <div className="inline-flex items-center gap-2 bg-green-600 text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 animate-pulse">
                 <Gamepad2 size={12} /> New Game Mode
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-tighter">
                VOCAB SURVIVOR
              </h2>
              <p className="text-slate-400 font-medium">
                Mission: Escape the enemy base using your vocabulary skills. Dark mode story adventure!
              </p>
           </div>
           <div className="bg-slate-800 p-4 rounded-full border-4 border-slate-700 group-hover:border-green-500 transition-colors">
              <Skull className="text-slate-200 group-hover:text-green-400 transition-colors" size={48} />
           </div>
        </div>
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DECKS.map((deck) => {
          const Icon = deck.icon;
          const bgColors: Record<string, string> = {
            violet: 'bg-violet-50 hover:bg-violet-100 border-violet-200',
            indigo: 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200',
            emerald: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200',
            rose: 'bg-rose-50 hover:bg-rose-100 border-rose-200',
          };
          const textColors: Record<string, string> = {
            violet: 'text-violet-600',
            indigo: 'text-indigo-600',
            emerald: 'text-emerald-600',
            rose: 'text-rose-600',
          };

          return (
            <button 
              key={deck.id}
              onClick={() => onSelect(deck)}
              className={`p-8 rounded-[40px] border-2 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl text-left flex flex-col h-64 group ${bgColors[deck.color]}`}
            >
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg ${textColors[deck.color].replace('text-', 'bg-')}`}>
                <Icon size={28} />
              </div>
              <h3 className={`text-2xl font-black mb-2 ${textColors[deck.color]}`}>{deck.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{deck.description}</p>
              <div className="mt-auto pt-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest opacity-60 group-hover:opacity-100 transition-opacity">
                <span>{deck.words.length} Words</span>
                <ChevronRight size={14} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

// 2. Flashcard View
const FlashcardView = ({ deck, onBack }: { deck: Deck; onBack: () => void }) => {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [aiContent, setAiContent] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const word = deck.words[index];

  const handleAiRequest = async (type: 'mnemonic' | 'etymology' | 'pop_culture') => {
    setLoadingAi(true);
    setAiContent(null);
    const result = await fetchWordEnrichment({ word: word.term, type });
    setAiContent(result);
    setLoadingAi(false);
  };

  const nextCard = () => {
    setFlipped(false);
    setAiContent(null);
    setTimeout(() => setIndex((prev) => (prev + 1) % deck.words.length), 200);
  };

  const prevCard = () => {
    setFlipped(false);
    setAiContent(null);
    setTimeout(() => setIndex((prev) => (prev - 1 + deck.words.length) % deck.words.length), 200);
  };

  return (
    <div className="h-full flex flex-col max-w-4xl mx-auto p-4 md:p-8">
      {/* Navbar */}
      <div className="flex items-center justify-between mb-8">
        <button onClick={onBack} className="p-3 bg-white border border-slate-200 rounded-full hover:bg-slate-50 text-slate-500 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="font-black text-slate-800 text-lg">{deck.title}</h2>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{index + 1} / {deck.words.length}</p>
        </div>
        <div className="w-12"></div> {/* Spacer */}
      </div>

      {/* Main Card Area */}
      <div className="flex-1 flex flex-col md:flex-row gap-6 min-h-0">
        
        {/* The Flashcard */}
        <div className="flex-1 perspective-1000 relative group cursor-pointer" onClick={() => setFlipped(!flipped)}>
          <div className={`w-full h-full relative preserve-3d transition-all duration-500 ease-out-back ${flipped ? 'rotate-y-180' : ''}`}>
            
            {/* Front */}
            <div className="absolute inset-0 backface-hidden bg-white rounded-[40px] shadow-2xl border border-slate-100 flex flex-col items-center justify-center p-8 text-center hover:shadow-violet-200/50 transition-shadow">
              <div className="text-xs font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full mb-6 uppercase tracking-widest">
                {word.difficulty}
              </div>
              <h1 className="text-5xl md:text-7xl font-black text-slate-800 mb-4 tracking-tight">{word.term}</h1>
              <p className="text-xl text-slate-400 font-serif italic">{word.pronunciation}</p>
              <div className="absolute bottom-8 text-xs font-bold text-violet-500 uppercase tracking-widest animate-pulse">
                Tap to Flip
              </div>
            </div>

            {/* Back */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 bg-violet-600 text-white rounded-[40px] shadow-2xl flex flex-col items-center justify-center p-10 text-center overflow-y-auto custom-scrollbar">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-black text-violet-200 uppercase tracking-widest mb-2">Definition</h3>
                  <p className="text-2xl font-bold leading-tight">{word.definition.en}</p>
                  <p className="text-lg text-violet-200 mt-1 font-medium">{word.definition.hi}</p>
                </div>
                
                <div className="bg-white/10 p-6 rounded-3xl backdrop-blur-sm">
                  <h3 className="text-xs font-black text-violet-200 uppercase tracking-widest mb-2">Example</h3>
                  <p className="text-lg italic font-serif opacity-90">"{word.example}"</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2">
                  {word.synonyms.map(s => <span key={s} className="px-3 py-1 bg-violet-800 rounded-lg text-xs font-bold">{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* AI Controls Sidebar */}
        <div className="w-full md:w-80 flex flex-col gap-4">
          <div className="bg-white p-6 rounded-[32px] border border-slate-200 shadow-lg flex-1 flex flex-col">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-violet-600" size={20} />
              <h3 className="font-black text-slate-800 uppercase tracking-widest text-sm">AI Magic Wand</h3>
            </div>

            <div className="grid gap-3 mb-6">
              <button 
                onClick={(e) => { e.stopPropagation(); handleAiRequest('mnemonic'); }}
                className="p-4 bg-fuchsia-50 hover:bg-fuchsia-100 text-fuchsia-700 rounded-2xl font-bold text-xs flex items-center gap-3 transition-colors text-left"
              >
                <Lightbulb size={18} /> Memory Trick
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleAiRequest('pop_culture'); }}
                className="p-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-2xl font-bold text-xs flex items-center gap-3 transition-colors text-left"
              >
                <Clapperboard size={18} /> Pop Culture Ref
              </button>
              <button 
                onClick={(e) => { e.stopPropagation(); handleAiRequest('etymology'); }}
                className="p-4 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-2xl font-bold text-xs flex items-center gap-3 transition-colors text-left"
              >
                <BookOpen size={18} /> Word Origin
              </button>
            </div>

            <div className="flex-1 bg-slate-50 rounded-2xl p-4 overflow-y-auto border border-slate-100 relative">
              {loadingAi ? (
                <div className="absolute inset-0 flex items-center justify-center text-slate-400 gap-2">
                  <Wand2 className="animate-spin" size={20} /> Thinking...
                </div>
              ) : aiContent ? (
                <div className="prose prose-sm text-slate-600">
                  <p className="font-medium text-sm leading-relaxed">{aiContent}</p>
                </div>
              ) : (
                <div className="text-center text-slate-400 text-xs font-bold uppercase mt-10">
                  Select an AI tool above
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4">
            <button onClick={prevCard} className="flex-1 py-4 bg-white border border-slate-200 text-slate-600 rounded-2xl font-black hover:bg-slate-50 transition-colors">PREV</button>
            <button onClick={nextCard} className="flex-[2] py-4 bg-slate-900 text-white rounded-2xl font-black shadow-xl hover:bg-black transition-transform active:scale-95">NEXT WORD</button>
          </div>
        </div>
      </div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .ease-out-back { transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  );
};

// 3. Quiz Mode
const QuizView = ({ deck, onBack }: { deck: Deck; onBack: () => void }) => {
  const [qIndex, setQIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [finished, setFinished] = useState(false);

  const currentWord = deck.words[qIndex];
  
  // Generate options (1 correct + 3 random from deck)
  const options = React.useMemo(() => {
    const others = deck.words.filter(w => w.id !== currentWord.id).sort(() => 0.5 - Math.random()).slice(0, 3);
    return [currentWord, ...others].sort(() => 0.5 - Math.random());
  }, [currentWord, deck]);

  const handleAnswer = (answer: string) => {
    if (selected) return;
    setSelected(answer);
    if (answer === currentWord.definition.en) {
      setScore(s => s + 1);
    }
    setTimeout(() => {
      if (qIndex < deck.words.length - 1) {
        setQIndex(prev => prev + 1);
        setSelected(null);
      } else {
        setFinished(true);
      }
    }, 1500);
  };

  if (finished) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center animate-fade-in">
        <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center text-6xl mb-6 shadow-xl animate-bounce">🏆</div>
        <h2 className="text-4xl font-black text-slate-800 mb-2">Quiz Complete!</h2>
        <p className="text-slate-500 font-bold uppercase tracking-widest mb-8">You scored {score} out of {deck.words.length}</p>
        <button onClick={onBack} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-black shadow-lg hover:bg-black transition-all">Back to Library</button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto h-full flex flex-col justify-center p-6">
      <div className="mb-10 text-center">
        <div className="inline-block px-4 py-1 bg-violet-100 text-violet-700 rounded-full text-xs font-black uppercase tracking-widest mb-4">
          Question {qIndex + 1} / {deck.words.length}
        </div>
        <h2 className="text-4xl font-black text-slate-800 mb-2">{currentWord.term}</h2>
        <p className="text-slate-400 font-serif italic">What is the meaning of this word?</p>
      </div>

      <div className="grid gap-4">
        {options.map((opt, i) => {
          let stateClass = "bg-white border-slate-200 text-slate-600 hover:border-violet-400";
          if (selected) {
            if (opt.definition.en === currentWord.definition.en) stateClass = "bg-emerald-500 border-emerald-500 text-white";
            else if (opt.definition.en === selected) stateClass = "bg-red-500 border-red-500 text-white";
            else stateClass = "bg-slate-50 border-slate-100 text-slate-300";
          }

          return (
            <button
              key={i}
              onClick={() => handleAnswer(opt.definition.en)}
              disabled={!!selected}
              className={`p-6 rounded-2xl border-2 font-bold text-left transition-all duration-300 shadow-sm ${stateClass}`}
            >
              {opt.definition.en}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// --- MAIN APP ---

const App: React.FC = () => {
  const [currentDeck, setCurrentDeck] = useState<Deck | null>(null);
  const [mode, setMode] = useState<'learn' | 'quiz'>('learn');
  const [showSurvivor, setShowSurvivor] = useState(false);

  // If in survivor mode, render the game immediately
  if (showSurvivor) {
    return <VocabSurvivor onBack={() => setShowSurvivor(false)} />;
  }

  return (
    <div className="h-[100dvh] w-full bg-slate-50 text-slate-900 font-sans selection:bg-violet-200 overflow-hidden flex flex-col">
      {/* Top Navigation */}
      <nav className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 z-50">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setCurrentDeck(null)}>
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center text-white">
            <Brain size={18} />
          </div>
          <span className="font-black text-lg tracking-tight hidden sm:block">VocabVerse</span>
        </div>

        {currentDeck && (
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setMode('learn')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black flex items-center gap-2 transition-all ${mode === 'learn' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500'}`}
            >
              <Library size={14}/> Learn
            </button>
            <button 
              onClick={() => setMode('quiz')}
              className={`px-4 py-1.5 rounded-lg text-xs font-black flex items-center gap-2 transition-all ${mode === 'quiz' ? 'bg-white text-violet-700 shadow-sm' : 'text-slate-500'}`}
            >
              <Play size={14}/> Quiz
            </button>
          </div>
        )}
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden relative">
        {!currentDeck ? (
          <DeckGrid onSelect={setCurrentDeck} onLaunchSurvivor={() => setShowSurvivor(true)} />
        ) : mode === 'learn' ? (
          <FlashcardView deck={currentDeck} onBack={() => setCurrentDeck(null)} />
        ) : (
          <QuizView deck={currentDeck} onBack={() => setCurrentDeck(null)} />
        )}
      </main>
    </div>
  );
};

export default App;
