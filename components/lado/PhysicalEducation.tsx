
import React, { useState, useMemo, useEffect } from 'react';
import { Book, ChevronDown, ChevronRight, Check, X, Trophy, List, Play, CheckCircle, Lock, Star, ArrowLeft, RotateCcw, SkipForward, ArrowRight, AlertCircle, Bookmark } from 'lucide-react';
import { Language } from '../../types';

interface PEProps {
  language: Language;
  isNavVisible?: boolean;
}

const SYLLABUS = [
  {
    id: 'unit1',
    title: 'Unit I: शारीरिक शिक्षा (Physical Education)',
    color: 'indigo',
    content: `
      <div class="space-y-6">
        <div class="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
          <h3 class="font-black text-indigo-900 text-lg mb-4 uppercase tracking-tight">1. अर्थ, परिभाषा, लक्ष्य एवं उद्देश्य</h3>
          <ul class="space-y-3 text-slate-700">
            <li class="flex gap-2"><strong>अर्थ:</strong> <span class="text-slate-600">शारीरिक शिक्षा वह शिक्षा है जो शारीरिक क्रियाओं के माध्यम से संपूर्ण व्यक्तित्व का विकास करती है।</span></li>
            <li class="flex gap-2"><strong>लक्ष्य:</strong> <span class="text-slate-600">शरीर को स्वस्थ, सक्षम और सक्रिय बनाना।</span></li>
            <li class="flex gap-2"><strong>उद्देश्य:</strong> <span class="text-slate-600">स्वास्थ्य सुधार, नैतिकता, अनुशासन, समाज में सहयोग और चरित्र निर्माण।</span></li>
          </ul>
        </div>
        <div class="bg-indigo-50/50 p-6 rounded-3xl border border-indigo-100 shadow-sm">
          <h3 class="font-black text-indigo-900 text-lg mb-4 uppercase tracking-tight">2. इतिहास (स्वतंत्रता पूर्व एवं उत्तर भारत)</h3>
          <p class="text-slate-600 leading-relaxed font-medium text-sm">ब्रिटिश काल के दौरान शारीरिक शिक्षा की उपेक्षा से लेकर आधुनिक 'खेलो इंडिया' जैसे सरकारी मिशनों तक की लंबी यात्रा। 1920 में मद्रास में YMCA कॉलेज की स्थापना एक बड़ा मील का पत्थर था।</p>
        </div>
      </div>
    `
  },
  {
    id: 'unit2',
    title: 'Unit II: पोषण, वजन प्रबंधन एवं जीवन शैली',
    color: 'emerald',
    content: `
      <div class="space-y-6">
        <div class="bg-emerald-50/50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <h3 class="font-black text-emerald-900 text-lg mb-4 uppercase tracking-tight">1. संतुलित आहार (Balanced Diet)</h3>
          <p class="text-slate-600 leading-relaxed font-medium text-sm">कार्बोहाइड्रेट, प्रोटीन, वसा, विटामिन, खनिज और जल का सही अनुपात ही स्वस्थ शरीर का आधार है। कार्बोहाइड्रेट मुख्य ऊर्जा स्रोत हैं, जबकि प्रोटीन मांसपेशियों की मरम्मत के लिए आवश्यक हैं।</p>
          <div class="mt-4 p-4 bg-white rounded-2xl border border-emerald-100 flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-700">BMI FORMULA:</span>
            <span class="text-sm font-black text-slate-800">वजन (kg) / ऊँचाई² (m²)</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'unit3',
    title: 'Unit III: योग एवं ध्यान (Yoga & Meditation)',
    color: 'rose',
    content: `
      <div class="space-y-6">
        <div class="bg-rose-50/50 p-6 rounded-3xl border border-rose-100 shadow-sm">
          <h3 class="font-black text-rose-900 text-lg mb-4 uppercase tracking-tight">1. अष्टांग योग (महर्षि पतंजलि)</h3>
          <div class="grid grid-cols-2 gap-3">
             ${['यम', 'नियम', 'आसन', 'प्राणायाम', 'प्रत्याहार', 'धारणा', 'ध्यान', 'समाधि'].map(y => `<div class="bg-white p-2 text-center rounded-xl text-[11px] font-black text-rose-600 border border-rose-100 shadow-sm">${y}</div>`).join('')}
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'unit4',
    title: 'Unit IV: खेल एवं मनोरंजन (Sports)',
    color: 'amber',
    content: `
      <div class="space-y-6">
        <div class="bg-amber-50/50 p-6 rounded-3xl border border-amber-100 shadow-sm">
          <h3 class="font-black text-amber-900 text-lg mb-4 uppercase tracking-tight">1. प्राथमिक उपचार (First Aid)</h3>
          <p class="text-slate-600 leading-relaxed font-medium mb-4">खेलों में चोट लगना आम है। इसके तुरंत उपचार के लिए R.I.C.E. तकनीक सर्वश्रेष्ठ मानी जाती है।</p>
          <div class="space-y-2">
            <div class="flex items-center gap-3 p-2 bg-white rounded-xl border border-amber-100"><span class="w-6 h-6 bg-amber-600 text-white rounded flex items-center justify-center font-bold">R</span> <span class="text-xs font-bold">REST</span></div>
            <div class="flex items-center gap-3 p-2 bg-white rounded-xl border border-amber-100"><span class="w-6 h-6 bg-amber-600 text-white rounded flex items-center justify-center font-bold">I</span> <span class="text-xs font-bold">ICE</span></div>
            <div class="flex items-center gap-3 p-2 bg-white rounded-xl border border-amber-100"><span class="w-6 h-6 bg-amber-600 text-white rounded flex items-center justify-center font-bold">C</span> <span class="text-xs font-bold">COMPRESSION</span></div>
            <div class="flex items-center gap-3 p-2 bg-white rounded-xl border border-amber-100"><span class="w-6 h-6 bg-amber-600 text-white rounded flex items-center justify-center font-bold">E</span> <span class="text-xs font-bold">ELEVATION</span></div>
          </div>
        </div>
      </div>
    `
  }
];

// Reusing ALL_QUESTIONS and logic but with UI/UX Bug Fixes
const ALL_QUESTIONS = [
  {u:1, q:"शारीरिक शिक्षा का मुख्य लक्ष्य क्या है?", a:"सर्वांगीण विकास", o:["केवल शारीरिक विकास", "केवल मानसिक विकास", "खेलकूद में जीतना"]},
  {u:1, q:"‘स्वास्थ्य ही धन है’ यह कथन किस संदर्भ में सर्वाधिक उपयुक्त है?", a:"शारीरिक शिक्षा", o:["अर्थशास्त्र", "राजनीति विज्ञान", "सामाजिक विज्ञान"]},
  {u:2, q:"1 ग्राम वसा (Fat) से कितनी कैलोरी ऊर्जा मिलती है?", a:"9 कैलोरी", o:["4 कैलोरी", "6 कैलोरी", "12 कैलोरी"]},
  {u:3, q:"अष्टांग योग का चौथा अंग कौन सा है?", a:"प्राणायाम", o:["आसन", "प्रत्याहार", "नियम"]},
  {u:4, q:"क्रिकेट पिच की लंबाई कितनी होती है?", a:"22 गज (Yards)", o:["20 गज", "24 गज", "18 गज"]}
];

const PhysicalEducation: React.FC<PEProps> = ({ language, isNavVisible }) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz'>('notes');
  const [expandedUnit, setExpandedUnit] = useState<string | null>('unit1');
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [activeQuizSet, setActiveQuizSet] = useState<any | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  // Bug Fix: Option Shuffling to ensure consistency during render
  const generateShuffledOptions = (q: any) => {
    return [...(q.o || []), q.a].sort(() => Math.random() - 0.5);
  };

  const startQuizSet = (unitId: number) => {
    const q = ALL_QUESTIONS.find(x => x.u === unitId) || ALL_QUESTIONS[0];
    const newSet = { id: `unit-${unitId}`, questions: [q], name: `Unit ${unitId} Test` };
    setActiveQuizSet(newSet);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setShowResult(false);
    setCurrentOptions(generateShuffledOptions(q));
  };

  const handleAnswer = (option: string) => {
    if (userAnswers[currentQuestionIndex]) return; // Bug: Prevent multiple clicks
    setUserAnswers(prev => ({...prev, [currentQuestionIndex]: option}));
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden animate-fade-in relative">
      
      {/* Module Navigation */}
      <div className="flex bg-slate-50/80 backdrop-blur-md border-b border-slate-200 p-2 flex-shrink-0">
          <button onClick={() => {setActiveTab('notes'); setActiveQuizSet(null);}} className={`flex-1 py-4 px-6 rounded-[24px] flex items-center justify-center gap-3 transition-all font-black text-xs uppercase tracking-widest ${activeTab === 'notes' ? 'bg-white shadow-lg text-slate-900 border border-slate-200' : 'text-slate-400 hover:bg-slate-100'}`}>
              <Book size={18} /> Syllabus Notes
          </button>
          <button onClick={() => setActiveTab('quiz')} className={`flex-1 py-4 px-6 rounded-[24px] flex items-center justify-center gap-3 transition-all font-black text-xs uppercase tracking-widest ${activeTab === 'quiz' ? 'bg-white shadow-lg text-slate-900 border border-slate-200' : 'text-slate-400 hover:bg-slate-100'}`}>
              <List size={18} /> Assessment
          </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-10 custom-scrollbar">
        {activeTab === 'notes' && !activeQuizSet && (
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="mb-10 text-center md:text-left">
                   <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Course Material</h2>
                   <p className="text-slate-400 text-sm font-bold mt-2 uppercase tracking-widest">Paper: Physical Education & Yoga (Z040401)</p>
                </div>
                
                <div className="grid gap-4">
                  {SYLLABUS.map(unit => (
                    <div key={unit.id} className="group">
                       <button 
                        onClick={() => setExpandedUnit(expandedUnit === unit.id ? null : unit.id)}
                        className={`w-full p-6 rounded-[32px] border-2 transition-all flex items-center justify-between text-left ${expandedUnit === unit.id ? `border-${unit.color}-500 bg-white shadow-xl shadow-${unit.color}-100` : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}
                       >
                          <div className="flex items-center gap-5">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white font-black shadow-lg ${expandedUnit === unit.id ? `bg-${unit.color}-600` : 'bg-slate-300'}`}>
                                {unit.id.slice(-1)}
                             </div>
                             <span className={`text-lg font-black uppercase tracking-tight ${expandedUnit === unit.id ? 'text-slate-900' : 'text-slate-500'}`}>{unit.title}</span>
                          </div>
                          {expandedUnit === unit.id ? <ChevronDown size={24} className="text-slate-400"/> : <ChevronRight size={24} className="text-slate-300"/>}
                       </button>
                       {expandedUnit === unit.id && (
                         <div className="mt-4 p-8 bg-white rounded-[40px] border border-slate-100 shadow-inner animate-fade-in text-slate-700 leading-relaxed" dangerouslySetInnerHTML={{__html: unit.content}}></div>
                       )}
                    </div>
                  ))}
                </div>
            </div>
        )}

        {activeTab === 'quiz' && !activeQuizSet && (
           <div className="max-w-4xl mx-auto py-10">
              <div className="text-center mb-16">
                 <div className="w-20 h-20 bg-amber-50 text-amber-600 rounded-[28px] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-amber-100 border border-amber-100">
                    <Trophy size={32} />
                 </div>
                 <h2 className="text-4xl font-black text-slate-900 uppercase tracking-tighter">Knowledge Check</h2>
                 <p className="text-slate-400 font-bold mt-2 uppercase tracking-widest">Select a unit to begin your practice test</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {SYLLABUS.map((unit, i) => (
                    <button key={i} onClick={() => startQuizSet(i+1)} className="p-8 bg-white rounded-[40px] border-2 border-slate-100 hover:border-indigo-500 transition-all text-left shadow-sm hover:shadow-2xl hover:shadow-indigo-100 group relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-[100px] -mr-10 -mt-10 group-hover:bg-indigo-50 transition-colors"></div>
                       <h3 className="text-xl font-black text-slate-800 mb-2 relative z-10">{unit.title}</h3>
                       <p className="text-slate-400 text-xs font-bold uppercase relative z-10">Exam Practice Set</p>
                       <div className="mt-8 flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest relative z-10 group-hover:translate-x-2 transition-transform">
                          Start Practice <Play size={14} fill="currentColor" />
                       </div>
                    </button>
                 ))}
              </div>
           </div>
        )}

        {activeQuizSet && (
          <div className="max-w-3xl mx-auto h-full flex flex-col py-6">
             <div className="flex items-center gap-6 mb-12">
                <button onClick={() => setActiveQuizSet(null)} className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors"><ArrowLeft size={20}/></button>
                <div className="flex-1">
                   <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                      <span>Assessment In Progress</span>
                      <span>1 Question</span>
                   </div>
                   <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                      <div className="h-full bg-indigo-600 animate-pulse transition-all duration-1000 w-full"></div>
                   </div>
                </div>
             </div>

             <div className="bg-white p-10 rounded-[48px] border border-slate-100 shadow-2xl shadow-slate-200/50 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-indigo-600/10"></div>
                <div className="mb-10 w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 shadow-inner"><Bookmark size={24}/></div>
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 text-center leading-tight max-w-2xl mb-12">{activeQuizSet.questions[0].q}</h2>
                
                <div className="grid gap-4 w-full max-w-xl">
                   {currentOptions.map((opt, i) => {
                     const isSelected = userAnswers[0] === opt;
                     const isCorrect = opt === activeQuizSet.questions[0].a;
                     const showsResult = !!userAnswers[0];
                     
                     let styles = "w-full p-6 rounded-[24px] border-2 font-bold text-sm transition-all text-left flex items-center justify-between ";
                     if (showsResult) {
                       if (isCorrect) styles += "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-100 scale-[1.02] ";
                       else if (isSelected) styles += "bg-rose-50 border-rose-500 text-rose-700 shadow-lg shadow-rose-100 ";
                       else styles += "bg-slate-50 border-slate-100 text-slate-300 opacity-50 ";
                     } else {
                       styles += "bg-slate-50 border-slate-100 text-slate-600 hover:border-indigo-500 hover:bg-white hover:shadow-xl ";
                     }

                     return (
                       <button key={i} onClick={() => handleAnswer(opt)} disabled={showsResult} className={styles}>
                          <span>{opt}</span>
                          {showsResult && isCorrect && <Check size={20} className="text-emerald-600"/>}
                          {showsResult && isSelected && !isCorrect && <X size={20} className="text-rose-600"/>}
                       </button>
                     )
                   })}
                </div>

                {userAnswers[0] && (
                   <div className="mt-12 flex items-center gap-6 animate-bounce-in">
                      <button onClick={() => startQuizSet(1)} className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:text-indigo-600 transition-colors">
                        <RotateCcw size={16}/> Try Another
                      </button>
                      <button onClick={() => setActiveQuizSet(null)} className="px-10 py-4 bg-slate-900 text-white rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all transform active:scale-95">Complete Set</button>
                   </div>
                )}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysicalEducation;
