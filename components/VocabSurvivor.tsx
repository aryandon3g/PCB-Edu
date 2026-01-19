
import React, { useState } from 'react';
import { Shield, Skull, Heart, Award, ChevronRight, RefreshCw, Zap, AlertTriangle, ArrowLeft } from 'lucide-react';

interface Option {
  word: string;
  action: string;
  outcome: 'success' | 'fail';
  desc: string;
  meaning: string;
}

interface Level {
  id: number;
  situation: string;
  question: string;
  options: Option[];
}

interface Props {
  onBack: () => void;
}

const VocabSurvivor: React.FC<Props> = ({ onBack }) => {
  // Game State
  const [gameState, setGameState] = useState<'start' | 'playing' | 'won' | 'lost'>('start');
  const [currentLevel, setCurrentLevel] = useState(0);
  const [health, setHealth] = useState(100);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string, desc: string, meaning: string } | null>(null);
  const [shake, setShake] = useState(false);

  // The Story Data (Levels)
  const levels: Level[] = [
    {
      id: 1,
      situation: "Tum ek enemy base mein pakde gaye ho. Guard tumse puchta hai: 'Tum yahan kyun aaye ho?' Tumhe pata hai wo jhooth pakad lega.",
      question: "Tumhara best option kya hai?",
      options: [
        { 
          word: "Candid", 
          action: "Sach bolna (Frank/Honest)", 
          outcome: "success", 
          desc: "Tumne sach bola. Guard ko tumhari himmat pasand aayi.",
          meaning: "Candid = Spasht / Sachcha (Jaise Candy khane wala baccha)"
        },
        { 
          word: "Garrulous", 
          action: "Bahut zyada bolna (Talkative)", 
          outcome: "fail", 
          desc: "Tumne itni bakwas ki ki Guard ne gusse mein danda maar diya!",
          meaning: "Garrulous = Baatuni (Gorilla ki tarah shor karne wala)"
        }
      ]
    },
    {
      id: 2,
      situation: "Guard chala gaya, lekin darwaza toota hua hai. Wo kabhi bhi gir sakta hai aur rasta block kar sakta hai.",
      question: "Darwaze ko rokne ke liye kya karoge?",
      options: [
        { 
          word: "Abate", 
          action: "Kam karna (Reduce)", 
          outcome: "fail", 
          desc: "Tumne darwaze ka wajan 'kam' karne ki koshish ki, par wo gir gaya! Chot lag gayi.",
          meaning: "Abate = Kam karna (Ab ate (khana) kam karo)"
        },
        { 
          word: "Bolster", 
          action: "Sahara dena (Support/Strengthen)", 
          outcome: "success", 
          desc: "Tumne lakdi lagakar darwaze ko 'Bolster' kiya. Rasta clear hai!",
          meaning: "Bolster = Mazboot karna / Sahara dena (Bol Sister main support karunga)"
        }
      ]
    },
    {
      id: 3,
      situation: "Tum ventilation shaft se nikal rahe ho. Aage ek patli deewar hai. Tumhe wo todni hai.",
      question: "Kaise todoge?",
      options: [
        { 
          word: "Inept", 
          action: "Anadi tarike se (Clumsy/Unskilled)", 
          outcome: "fail", 
          desc: "Tum 'Inept' tarike se kude aur khud hi gir gaye. Awaz ho gayi!",
          meaning: "Inept = Akushal / Anadi (In-App purchase galti se karne wala)"
        },
        { 
          word: "Diligent", 
          action: "Mehnat aur dhyan se (Hardworking)", 
          outcome: "success", 
          desc: "Tumne bade dhyan se (Diligently) screw khola aur nikal gaye.",
          meaning: "Diligent = Mehnati (Jiska Dil kaam mein lage)"
        }
      ]
    },
    {
      id: 4,
      situation: "Tum building ke sabse upar pahunch gaye ho aur helicopter ka wait kar rahe ho.",
      question: "Tum abhi kahan khade ho?",
      options: [
        { 
          word: "Zenith", 
          action: "Sabse upar (Peak/Top Point)", 
          outcome: "success", 
          desc: "Sahi! Tum building ke Zenith par ho. Helicopter ne tumhe dekh liya.",
          meaning: "Zenith = Shikhar / Top (Jana tha Zenith pe)"
        },
        { 
          word: "Nadir", 
          action: "Sabse neeche (Lowest Point)", 
          outcome: "fail", 
          desc: "Are bhai! Nadir matlab sabse neecha point hota hai. Tum upar ho!",
          meaning: "Nadir = Pataal / Lowest point (Na-gir niche)"
        }
      ]
    },
    {
      id: 5,
      situation: "Helicopter aa gaya, lekin pilot bahut thaka hua lag raha hai. Wo uth hi nahi raha.",
      question: "Pilot kaisa feel kar raha hai?",
      options: [
        { 
          word: "Lethargic", 
          action: "Aalsi / Sust (Sluggish)", 
          outcome: "success", 
          desc: "Pilot Lethargic tha. Tumne use paani pilaya aur hosh mein laye. Mission Complete!",
          meaning: "Lethargic = Sust (Lay-tha raha pure din)"
        },
        { 
          word: "Agile", 
          action: "Furtila (Quick/Active)", 
          outcome: "fail", 
          desc: "Agar wo Agile hota to so thodi raha hota! Mission delay ho gaya.",
          meaning: "Agile = Furtila (Age nikalne wala)"
        }
      ]
    }
  ];

  const handleOptionClick = (option: Option) => {
    if (feedback) return; // Prevent double clicks

    if (option.outcome === 'success') {
      setFeedback({
        type: 'success',
        message: "✅ Correct Choice!",
        desc: option.desc,
        meaning: option.meaning
      });
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setHealth(h => Math.max(0, h - 25));
      setFeedback({
        type: 'error',
        message: "❌ Wrong Move!",
        desc: option.desc,
        meaning: option.meaning
      });
    }
  };

  const handleNext = () => {
    setFeedback(null);
    if (health <= 0) {
      setGameState('lost');
    } else if (currentLevel < levels.length - 1) {
      setCurrentLevel(currentLevel + 1);
    } else {
      setGameState('won');
    }
  };

  const restartGame = () => {
    setGameState('start');
    setCurrentLevel(0);
    setHealth(100);
    setFeedback(null);
  };

  // --- RENDER SCREENS ---

  if (gameState === 'start') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-900 text-white p-6 font-mono relative overflow-hidden">
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors z-20">
            <ArrowLeft size={20} />
        </button>
        <div className="max-w-md w-full text-center space-y-8 animate-in fade-in duration-700 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 blur-3xl opacity-20 rounded-full"></div>
            <Shield className="w-24 h-24 mx-auto text-green-400 mb-4 relative z-10" />
          </div>
          <h1 className="text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
            VOCAB SURVIVOR
          </h1>
          <p className="text-slate-400 text-lg">
            Mission: Enemy Base se Zinda Bacho.<br/>
            Tarika: Sahi Words ka upyog karo.
          </p>
          
          <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-left text-sm space-y-2">
            <p className="flex items-center gap-2"><Zap size={16} className="text-yellow-400"/> Galat word = Health Down</p>
            <p className="flex items-center gap-2"><Award size={16} className="text-green-400"/> Sahi word = Agla Level</p>
          </div>

          <button 
            onClick={() => setGameState('playing')}
            className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl text-xl shadow-lg shadow-green-900/50 transition-all transform hover:scale-105"
          >
            START MISSION
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'lost') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-red-950 text-white p-6 font-mono relative">
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-red-900/50 rounded-full hover:bg-red-800 transition-colors">
            <ArrowLeft size={20} />
        </button>
        <Skull className="w-24 h-24 text-red-500 mb-6 animate-bounce" />
        <h2 className="text-3xl font-bold mb-2">MISSION FAILED</h2>
        <p className="text-red-200 mb-8 text-center">Tumhari English kamzor pad gayi aur dushman jeet gaya.</p>
        <button 
          onClick={restartGame}
          className="px-8 py-3 bg-red-600 hover:bg-red-500 rounded-lg font-bold flex items-center gap-2"
        >
          <RefreshCw size={20} /> Try Again
        </button>
      </div>
    );
  }

  if (gameState === 'won') {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-slate-900 text-white p-6 font-mono relative">
        <button onClick={onBack} className="absolute top-4 left-4 p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors">
            <ArrowLeft size={20} />
        </button>
        <Award className="w-24 h-24 text-yellow-400 mb-6 animate-pulse" />
        <h2 className="text-3xl font-bold mb-2 text-yellow-400">MISSION ACCOMPLISHED!</h2>
        <p className="text-slate-300 mb-8 text-center">Tumne apni vocabulary se dushmano ko hara diya.</p>
        <div className="bg-slate-800 p-6 rounded-xl border border-slate-700 w-full max-w-sm mb-6">
          <h3 className="font-bold border-b border-slate-600 pb-2 mb-2 text-green-400">Yaad Rakhna:</h3>
          <ul className="text-sm space-y-2 text-slate-300 text-left">
            <li>• Candid: Sachcha / Frank</li>
            <li>• Bolster: Sahara dena</li>
            <li>• Inept: Anadi</li>
            <li>• Zenith: Top Point</li>
            <li>• Lethargic: Aalsi</li>
          </ul>
        </div>
        <div className="flex gap-4">
            <button 
            onClick={onBack}
            className="px-8 py-3 bg-slate-700 hover:bg-slate-600 rounded-lg font-bold flex items-center gap-2"
            >
            Exit
            </button>
            <button 
            onClick={restartGame}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-lg font-bold flex items-center gap-2"
            >
            <RefreshCw size={20} /> Play Again
            </button>
        </div>
      </div>
    );
  }

  const currentLevelData = levels[currentLevel];

  return (
    <div className={`h-full bg-slate-900 text-white font-mono flex flex-col ${shake ? 'animate-shake' : ''} overflow-hidden`}>
      {/* HUD */}
      <div className="bg-slate-800 p-4 flex justify-between items-center border-b border-slate-700 sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <button onClick={onBack} className="p-2 hover:bg-slate-700 rounded-lg transition-colors mr-2">
             <ArrowLeft size={18}/>
          </button>
          <div className="bg-slate-700 px-3 py-1 rounded text-xs text-slate-300">
            LEVEL {currentLevel + 1}/{levels.length}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Heart className={`w-5 h-5 ${health < 30 ? 'text-red-500 animate-pulse' : 'text-green-500'}`} fill="currentColor" />
          <div className="w-24 sm:w-32 h-3 bg-slate-700 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${health < 30 ? 'bg-red-500' : 'bg-green-500'}`} 
              style={{ width: `${health}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 max-w-md mx-auto w-full flex flex-col justify-center overflow-y-auto">
        
        {/* Scenario Card */}
        <div className="bg-slate-800/50 border border-slate-600 rounded-2xl p-6 mb-8 backdrop-blur-sm shadow-xl">
          <div className="flex items-start gap-4 mb-4">
            <AlertTriangle className="text-yellow-500 w-8 h-8 flex-shrink-0" />
            <p className="text-lg leading-relaxed text-slate-200">
              {currentLevelData.situation}
            </p>
          </div>
          <p className="text-green-400 font-bold border-t border-slate-700 pt-4 mt-2">
            {currentLevelData.question}
          </p>
        </div>

        {/* Options */}
        {!feedback ? (
          <div className="space-y-4">
            {currentLevelData.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionClick(option)}
                className="w-full bg-slate-700 hover:bg-indigo-600 border border-slate-600 hover:border-indigo-400 p-4 rounded-xl text-left transition-all duration-200 group relative overflow-hidden shadow-lg"
              >
                <div className="relative z-10">
                  <span className="text-xl font-bold block mb-1 text-white group-hover:text-yellow-300">
                    {option.word}
                  </span>
                  <span className="text-sm text-slate-400 group-hover:text-slate-200">
                    {option.action}
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className={`rounded-xl p-6 border-2 animate-in slide-in-from-bottom-5 duration-300 ${feedback.type === 'success' ? 'bg-green-900/30 border-green-500/50' : 'bg-red-900/30 border-red-500/50'}`}>
            <h3 className={`text-xl font-bold mb-2 ${feedback.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
              {feedback.message}
            </h3>
            <p className="text-slate-200 mb-4 text-lg">
              {feedback.desc}
            </p>
            <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-700">
              <p className="text-yellow-300 font-bold text-sm">💡 MEMORY TRICK:</p>
              <p className="text-slate-300 italic text-sm mt-1">{feedback.meaning}</p>
            </div>
            
            <button
              onClick={handleNext}
              className="w-full mt-6 bg-white text-slate-900 font-bold py-3 rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              {feedback.type === 'success' ? 'Next Mission' : (health > 0 ? 'Try Again' : 'Game Over')} <ChevronRight size={20} />
            </button>
          </div>
        )}

      </div>
      
      {/* CSS for Shake Animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 2;
        }
      `}</style>
    </div>
  );
};

export default VocabSurvivor;
