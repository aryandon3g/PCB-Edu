import React, { useState, useEffect } from 'react';
/* Added missing Beaker import to fix error on line 128 */
import { BookOpen, FlaskConical, ArrowRight, ArrowLeft, Bug, ShieldAlert, Zap, Microscope, Info, Activity, AlertTriangle, CheckCircle, RotateCcw, Droplet, Skull, HelpCircle, Dna, Crosshair, Thermometer, Beaker } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
}

const STORY_CHAPTERS = [
  {
    id: 1,
    title: { en: "Chapter 1: The Zoonotic Enemies", hi: "अध्याय 1: ज़ूनोटिक शत्रु (जानवरों से)" },
    text: {
        en: "Dr. Arjun treated Rohan. 'Animals spread Zoonotic Viruses,' he said. 'Rabies comes from dogs/bats (Pathogen). It causes Hydrophobia (fear of water). Ebola and Nipah come from Bats, causing Brain Fever. Swine Flu (H1N1) comes from pigs, and Bird Flu (H5N1) from birds.'",
        hi: "डॉ. अर्जुन ने रोहन का इलाज किया। 'जानवर ज़ूनोटिक वायरस फैलाते हैं,' उन्होंने कहा। 'रेबीज़ कुत्तों/चमगादड़ों से आता है। इससे हाइड्रोफोबिया (पानी से डर) होता है। इबोला और निपाह चमगादड़ों से आते हैं। स्वाइन फ्लू (H1N1) सूअरों से और बर्ड फ्लू (H5N1) पक्षियों से फैलता है।'"
    },
    visual: 'zoonotic'
  },
  {
    id: 2,
    title: { en: "Chapter 2: Bacterial Invaders", hi: "अध्याय 2: जीवाणु हमलावर (Bacterial)" },
    text: {
        en: "Typhoid is caused by Salmonella Typhi. It spreads via Contaminated Food & Water. We use the WIDAL test to find it. Cholera (Vibrio cholerae) also comes from dirty water. Mumps (Paramyxo virus) swells the Salivary Glands.",
        hi: "टाइफाइड साल्मोनेला टाइफी के कारण होता है। यह दूषित भोजन और पानी से फैलता है। हम इसे खोजने के लिए विडाल (WIDAL) टेस्ट करते हैं। हैजा (Vibrio cholerae) भी गंदे पानी से होता है। गलसुआ (Mumps) लार ग्रंथियों को सुजा देता है।"
    },
    visual: 'bacterial'
  },
  {
    id: 3,
    title: { en: "Chapter 3: The Mosquito Vectors", hi: "अध्याय 3: मच्छर वाहक (Vectors)" },
    text: {
        en: "Dengue is spread by Female Aedes Aegypti, lowering Platelets (Thrombocytes). Malaria is caused by Plasmodium but spread by Female Anopheles. It reduces RBC and is treated with Quinine from Cinchona bark.",
        hi: "डेंगू मादा एडीज इजिप्ती द्वारा फैलाया जाता है, जो प्लेटलेट्स कम कर देता है। मलेरिया प्लास्मोडियम के कारण होता है लेकिन मादा एनोफिलीज द्वारा फैलता है। यह RBC को कम करता है और सिनकोना की छाल से कुनैन द्वारा ठीक किया जाता है।"
    },
    visual: 'vector'
  },
  {
    id: 4,
    title: { en: "Chapter 4: Heavy Metal Poisons", hi: "अध्याय 4: भारी धातु विषाक्तता" },
    text: {
        en: "Environmental diseases are dangerous. Mini Mata is caused by Mercury (Hg) and affects the Nervous System. Itai-Itai is caused by Cadmium (Cd) causing severe joint pain. Blue Baby Syndrome is due to excess Nitrates in water.",
        hi: "पर्यावरणीय बीमारियाँ खतरनाक हैं। मिनी माता पारा (Hg) के कारण होती है और तंत्रिका तंत्र को प्रभावित करती है। इताई-इताई कैडमियम (Cd) के कारण होती है जिससे जोड़ों में दर्द होता है। 'ब्लू बेबी' पानी में नाइट्रेट की अधिकता से होता है।"
    },
    visual: 'non-infectious'
  },
  {
    id: 5,
    title: { en: "Chapter 5: The Genetic Errors", hi: "अध्याय 5: आनुवंशिक त्रुटियाँ" },
    text: {
        en: "Some diseases are in our DNA. Hemophilia (Royal Disease) is X-linked; blood doesn't clot. Colour Blindness makes RGB vision difficult. Down Syndrome happens due to Trisomy of Chromosome 21.",
        hi: "कुछ बीमारियाँ हमारे DNA में होती हैं। हीमोफिलिया (शाही बीमारी) X-लिंक्ड है; खून का थक्का नहीं जमता। वर्णान्धता RGB दृष्टि को कठिन बनाती है। डाउन सिंड्रोम गुणसूत्र 21 की त्रिसूत्रता के कारण होता है।"
    },
    visual: 'genetic'
  }
];

const HumanDiseases: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'labs'>('story');
  const [chapter, setChapter] = useState(0);

  return (
    <div className="flex flex-col h-full bg-slate-50 gap-4 overflow-hidden">
      <div className="bg-gradient-to-r from-red-600 to-rose-600 p-4 rounded-xl shadow-md text-white flex justify-between items-center flex-shrink-0 mx-2 mt-2">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-lg shadow-inner">
             <Bug className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-xl font-bold">{language === Language.ENGLISH ? "Pathology Lab" : "पैथोलॉजी लैब"}</h1>
            <p className="text-rose-100 text-[10px] font-mono uppercase tracking-widest">Infectious & Genetic Diseases</p>
          </div>
        </div>
        
        <div className="flex bg-black/20 p-1 rounded-lg border border-white/10">
           <button onClick={() => setActiveTab('story')} className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'story' ? 'bg-white text-red-700 shadow-lg' : 'text-rose-100 hover:text-white'}`}><BookOpen size={14}/> {language === Language.ENGLISH ? "Syllabus" : "पाठ्यक्रम"}</button>
           <button onClick={() => setActiveTab('labs')} className={`px-4 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${activeTab === 'labs' ? 'bg-white text-red-700 shadow-lg' : 'text-rose-100 hover:text-white'}`}><FlaskConical size={14}/> {language === Language.ENGLISH ? "3D Labs" : "3D लैब"}</button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative p-2">
        {activeTab === 'story' ? <StoryMode language={language} chapter={chapter} setChapter={setChapter} /> : <LabHub language={language} />}
      </div>
    </div>
  );
};

const StoryMode = ({ language, chapter, setChapter }: any) => {
    const data = STORY_CHAPTERS[chapter];
    const renderVisual = (type: string) => {
        switch(type) {
            case 'zoonotic': return <div className="grid grid-cols-2 gap-6 animate-fade-in"><div className="bg-white p-6 rounded-2xl text-center shadow-xl border border-slate-100 transform hover:scale-105 transition-transform"><div className="text-5xl mb-2">🐕</div><div className="text-xs font-black text-red-600">RABIES</div><div className="text-[9px] text-slate-400 font-bold">Dog/Bat Pathogen</div></div><div className="bg-white p-6 rounded-2xl text-center shadow-xl border border-slate-100 transform hover:scale-105 transition-transform"><div className="text-5xl mb-2">🦇</div><div className="text-xs font-black text-red-600">EBOLA</div><div className="text-[9px] text-slate-400 font-bold">Hemorrhagic Fever</div></div><div className="bg-white p-6 rounded-2xl text-center shadow-xl border border-slate-100 transform hover:scale-105 transition-transform"><div className="text-5xl mb-2">🐖</div><div className="text-xs font-black text-red-600">H1N1</div><div className="text-[9px] text-slate-400 font-bold">Swine Flu</div></div><div className="bg-white p-6 rounded-2xl text-center shadow-xl border border-slate-100 transform hover:scale-105 transition-transform"><div className="text-5xl mb-2">🦆</div><div className="text-xs font-black text-red-600">H5N1</div><div className="text-[9px] text-slate-400 font-bold">Bird Flu</div></div></div>;
            case 'bacterial': return <div className="flex flex-col items-center gap-6"><div className="w-40 h-40 rounded-full bg-white shadow-[0_20px_50px_rgba(79,70,229,0.2)] border-8 border-indigo-50 flex items-center justify-center relative animate-pulse"><Bug size={64} className="text-indigo-600 animate-bounce"/><div className="absolute -top-4 bg-indigo-600 text-white px-4 py-1 rounded-full text-[10px] font-black shadow-lg">WIDAL POSITIVE</div></div><div className="bg-white px-6 py-2 rounded-full shadow-md border border-indigo-100 font-black text-indigo-800 text-sm">Salmonella Typhi</div></div>;
            case 'vector': return <div className="flex gap-16 items-center"><div className="text-center group"><div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-4xl relative border-b-8 border-red-500 transform group-hover:-translate-y-2 transition-transform">🦟<span className="absolute -bottom-4 bg-red-600 text-white text-[8px] px-2 py-0.5 rounded-full font-bold">DENGUE</span></div><div className="text-[10px] font-black mt-4 text-slate-600">Aedes Aegypti</div></div><div className="text-center group"><div className="w-24 h-24 bg-white rounded-3xl shadow-xl flex items-center justify-center text-4xl relative border-b-8 border-blue-500 transform group-hover:-translate-y-2 transition-transform">🦟<span className="absolute -bottom-4 bg-blue-600 text-white text-[8px] px-2 py-0.5 rounded-full font-bold">MALARIA</span></div><div className="text-[10px] font-black mt-4 text-slate-600">Anopheles</div></div></div>;
            case 'non-infectious': return <div className="flex flex-col items-center gap-6"><div className="w-64 h-32 bg-white rounded-3xl shadow-inner border-4 border-slate-100 relative overflow-hidden flex flex-wrap gap-2 p-4 justify-center items-center">{Array.from({length:12}).map((_,i)=><div key={i} className={`w-8 h-8 rounded-full shadow-lg ${i>7?'bg-red-500 animate-ping':'bg-slate-200'}`}></div>)}<div className="absolute inset-0 bg-red-500/10 animate-pulse pointer-events-none"></div></div><div className="flex gap-3"><div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 text-center"><div className="text-xs font-black text-slate-800">Hg: Mini Mata</div></div><div className="bg-white p-3 rounded-xl shadow-lg border border-slate-100 text-center"><div className="text-xs font-black text-slate-800">Cd: Itai-Itai</div></div></div></div>;
            case 'genetic': return <div className="flex flex-col items-center gap-6"><div className="flex gap-6 animate-bounce"><div className="w-16 h-16 bg-purple-100 border-4 border-purple-500 rounded-2xl flex items-center justify-center text-purple-700 font-black shadow-xl text-2xl">X</div><div className="w-16 h-16 bg-blue-100 border-4 border-blue-500 rounded-2xl flex items-center justify-center text-blue-700 font-black shadow-xl text-2xl">Y</div></div><div className="bg-white p-4 rounded-3xl border-t-8 border-red-500 shadow-2xl text-center"><div className="text-sm font-black text-slate-800 uppercase tracking-tighter">Hemophilia (Royal Disease)</div><div className="text-[9px] text-slate-400 font-bold mt-1">X-Linked Clotting Factor Deficit</div></div></div>;
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-4 p-2">
            <div className="flex-1 bg-white rounded-3xl shadow-inner border border-red-100 flex items-center justify-center p-8 relative overflow-hidden min-h-[300px]">
                {renderVisual(data.visual)}
                <div className="absolute bottom-6 flex gap-2">
                    {STORY_CHAPTERS.map((_, i) => <button key={i} onClick={() => setChapter(i)} className={`h-1.5 rounded-full transition-all ${i === chapter ? 'w-10 bg-red-600' : 'w-2 bg-slate-200'}`} />)}
                </div>
            </div>
            <div className="w-full md:w-80 lg:w-[400px] flex flex-col gap-4">
                <div className="bg-white p-6 rounded-3xl shadow-2xl border-l-[12px] border-red-500 flex-1 flex flex-col">
                    <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-3"><span className="w-8 h-8 bg-red-100 text-red-600 rounded-xl flex items-center justify-center text-sm font-black">{chapter+1}</span>{language === Language.ENGLISH ? data.title.en : data.title.hi}</h2>
                    <div className="bg-red-50/50 p-5 rounded-2xl mb-6 border border-red-100 flex-1 overflow-y-auto"><p className="text-slate-700 leading-relaxed text-base font-medium italic">"{language === Language.ENGLISH ? data.text.en : data.text.hi}"</p></div>
                    <div className="flex justify-between gap-4 mt-auto">
                        <button onClick={() => setChapter(Math.max(0, chapter - 1))} disabled={chapter === 0} className="flex-1 py-4 bg-slate-100 text-slate-500 rounded-2xl font-black disabled:opacity-30 flex items-center justify-center hover:bg-slate-200 transition-colors shadow-sm"><ArrowLeft size={24}/></button>
                        <button onClick={() => setChapter(Math.min(STORY_CHAPTERS.length - 1, chapter + 1))} disabled={chapter === STORY_CHAPTERS.length - 1} className="flex-[2] py-4 bg-red-600 text-white rounded-2xl font-black shadow-xl hover:bg-red-700 flex items-center justify-center gap-2 transform active:scale-95 transition-all">{language === Language.ENGLISH ? "NEXT" : "आगे"} <ArrowRight size={24}/></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const LabHub = ({ language }: { language: Language }) => {
    const [sim, setSim] = useState<'typhoid' | 'genetic' | 'vector' | 'metals' | 'cancer'>('typhoid');
    return (
        <div className="h-full flex flex-col gap-4 animate-fade-in">
            <div className="flex bg-white rounded-2xl shadow-lg border border-slate-200 p-1 flex-shrink-0 overflow-x-auto no-scrollbar">
                {[
                    {id:'typhoid', icon: Beaker, label:{en:'WIDAL LAB', hi:'विडल लैब'}},
                    {id:'genetic', icon: Dna, label:{en:'DNA LOTTERY', hi:'DNA लॉटरी'}},
                    {id:'vector', icon: Bug, label:{en:'VECTOR HUNT', hi:'वाहक शिकार'}},
                    {id:'metals', icon: ShieldAlert, label:{en:'METAL TOXIC', hi:'धातु जहर'}},
                    {id:'cancer', icon: Crosshair, label:{en:'CELL WAR', hi:'कोशिका युद्ध'}}
                ].map(item => (
                    <button key={item.id} onClick={() => setSim(item.id as any)} className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black whitespace-nowrap transition-all flex items-center justify-center gap-2 ${sim === item.id ? 'bg-red-600 text-white shadow-xl scale-105' : 'text-slate-500 hover:bg-slate-50'}`}>
                        <item.icon size={14}/>
                        {language === Language.ENGLISH ? item.label.en : item.label.hi}
                    </button>
                ))}
            </div>
            <div className="flex-1 bg-white rounded-[40px] shadow-2xl border border-slate-100 overflow-hidden relative">
                {sim === 'typhoid' && <TyphoidSim language={language} />}
                {sim === 'genetic' && <GeneticSim language={language} />}
                {sim === 'vector' && <VectorSim language={language} />}
                {sim === 'metals' && <MetalsSim language={language} />}
                {sim === 'cancer' && <CancerSim language={language} />}
            </div>
        </div>
    );
};

// --- SIMULATION 1: TYPHOID WIDAL TEST ---
const TyphoidSim = ({ language }: any) => {
    const [status, setStatus] = useState<'clean' | 'testing' | 'positive' | 'negative'>('clean');
    const [samples, setSamples] = useState([false, false]); // Serum, Antigen

    const run = () => {
        if (!samples[0] || !samples[1]) return;
        setStatus('testing');
        setTimeout(() => setStatus(Math.random() > 0.5 ? 'positive' : 'negative'), 2000);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
            <h3 className="font-black text-slate-800 text-lg uppercase tracking-widest border-b-4 border-indigo-500 pb-2">3D WIDAL Diagnostic Lab</h3>
            
            <div className="flex gap-20 items-end">
                <div className="relative group">
                    <div className={`w-16 h-48 border-4 rounded-b-full bg-indigo-50/50 relative overflow-hidden transition-all duration-500 ${status === 'positive' ? 'border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.4)]' : 'border-slate-200'}`}>
                        <div className={`absolute bottom-0 w-full h-32 transition-all duration-1000 ${status === 'testing' ? 'bg-indigo-200 animate-pulse' : status === 'positive' ? 'bg-red-100' : status === 'negative' ? 'bg-green-100' : (samples[0] ? 'bg-indigo-100' : 'bg-transparent')}`}>
                             {status === 'positive' && <div className="p-2 flex flex-wrap gap-1 justify-center">{Array.from({length:20}).map((_,i)=><div key={i} className="w-2 h-2 bg-red-600 rounded-full animate-bounce" style={{animationDelay:`${i*0.1}s`}}></div>)}</div>}
                        </div>
                    </div>
                    <div className="absolute -top-10 left-1/2 -translate-x-1/2 text-[9px] font-black text-slate-400 group-hover:text-indigo-600 transition-colors uppercase">Test Tube A</div>
                </div>

                <div className="flex flex-col gap-3">
                     <button onClick={() => setSamples([true, samples[1]])} className={`p-4 rounded-2xl font-black text-xs shadow-md transition-all ${samples[0] ? 'bg-indigo-600 text-white scale-95' : 'bg-white text-indigo-600 hover:scale-105 border-2 border-indigo-100'}`}>1. ADD PATIENT SERUM</button>
                     <button onClick={() => setSamples([samples[0], true])} className={`p-4 rounded-2xl font-black text-xs shadow-md transition-all ${samples[1] ? 'bg-orange-600 text-white scale-95' : 'bg-white text-orange-600 hover:scale-105 border-2 border-orange-100'}`}>2. ADD O/H ANTIGENS</button>
                     <button onClick={run} disabled={!samples[0] || !samples[1] || status === 'testing'} className="mt-4 p-5 bg-slate-900 text-white rounded-3xl font-black hover:bg-black transition-all disabled:opacity-30 shadow-2xl flex items-center justify-center gap-2"><Activity size={18}/> RUN DIAGNOSIS</button>
                </div>
            </div>

            <div className={`p-6 rounded-3xl max-w-md w-full text-center border-2 transition-all ${status === 'positive' ? 'bg-red-50 border-red-200' : status === 'negative' ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-100'}`}>
                <p className="text-sm font-bold text-slate-600">
                    {status === 'clean' && (language === Language.ENGLISH ? "Typhoid spreads via contaminated food. Perform WIDAL test to confirm Salmonella presence." : "टाइफाइड दूषित भोजन से फैलता है। साल्मोनेला की पुष्टि के लिए विडाल परीक्षण करें।")}
                    {status === 'testing' && (language === Language.ENGLISH ? "Analyzing serum for agglutination..." : "सीरम में समूहन (Agglutination) का विश्लेषण...")}
                    {status === 'positive' && (language === Language.ENGLISH ? "POSITIVE: Visible clumping (Agglutination) detected. Start Antibiotics." : "धनात्मक: समूहन पाया गया। एंटीबायोटिक्स शुरू करें।")}
                    {status === 'negative' && (language === Language.ENGLISH ? "NEGATIVE: No Salmonalla antigens detected. Patient is clear." : "ऋणात्मक: कोई साल्मोनेला एंटीजन नहीं मिला।")}
                </p>
                {status !== 'clean' && <button onClick={() => {setStatus('clean'); setSamples([false,false]);}} className="mt-4 text-xs font-black text-indigo-600 flex items-center gap-1 mx-auto hover:underline uppercase"><RotateCcw size={12}/> Reset Lab</button>}
            </div>
        </div>
    );
};

// --- SIMULATION 2: GENETIC LOTTERY (HEMOPHILIA) ---
const GeneticSim = ({ language }: any) => {
    const [kids, setKids] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const spawn = () => {
        setLoading(true);
        setTimeout(() => {
            const types = [
                { id: Date.now(), type: 'XXh', label: {en:'Carrier Daughter', hi:'वाहक पुत्री'}, color:'bg-purple-100 border-purple-400 text-purple-700', icon:'👧' },
                { id: Date.now()+1, type: 'XY', label: {en:'Healthy Son', hi:'स्वस्थ पुत्र'}, color:'bg-blue-100 border-blue-400 text-blue-700', icon:'👦' },
                { id: Date.now()+2, type: 'XhY', label: {en:'Affected Son', hi:'प्रभावित पुत्र'}, color:'bg-red-100 border-red-400 text-red-700', icon:'🤒' },
                { id: Date.now()+3, type: 'XX', label: {en:'Healthy Daughter', hi:'स्वस्थ पुत्री'}, color:'bg-pink-100 border-pink-400 text-pink-700', icon:'👧' }
            ];
            setKids(prev => [types[Math.floor(Math.random()*4)], ...prev.slice(0, 3)]);
            setLoading(false);
        }, 800);
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 gap-8">
             <div className="text-center">
                 <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Hemophilia Inheritance Sim</h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase">Mother (X-Xh) x Father (X-Y)</p>
             </div>

             <div className="flex gap-12 items-center bg-slate-50 p-8 rounded-[40px] border-4 border-dashed border-slate-200">
                 <div className="text-center"><div className="text-6xl mb-2 drop-shadow-xl">👩‍🦰</div><div className="text-[10px] font-black bg-purple-500 text-white px-2 py-0.5 rounded">X - Xh</div></div>
                 <div className="text-4xl text-slate-300 font-black">X</div>
                 <div className="text-center"><div className="text-6xl mb-2 drop-shadow-xl">👨‍🦳</div><div className="text-[10px] font-black bg-blue-500 text-white px-2 py-0.5 rounded">X - Y</div></div>
             </div>

             <button onClick={spawn} disabled={loading} className="px-12 py-5 bg-red-600 text-white rounded-3xl font-black shadow-[0_15px_40px_rgba(220,38,38,0.3)] hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                 {loading ? <Activity className="animate-spin" size={24}/> : <Zap size={24}/>}
                 {language === Language.ENGLISH ? "SIMULATE BIRTH" : "जन्म अनुकरण"}
             </button>

             <div className="flex gap-4 h-32 w-full justify-center">
                 {kids.map(k => (
                     <div key={k.id} className={`w-24 h-full p-2 rounded-2xl border-2 flex flex-col items-center justify-center animate-scale-up shadow-lg ${k.color}`}>
                         <div className="text-2xl">{k.icon}</div>
                         <div className="text-[10px] font-black mt-1">{k.type}</div>
                         <div className="text-[8px] font-bold text-center mt-0.5">{language === Language.ENGLISH ? k.label.en : k.label.hi}</div>
                     </div>
                 ))}
             </div>

             <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-[10px] text-amber-800 font-bold max-w-sm text-center">
                <strong>FACT:</strong> Hemophilia is also known as <b>Christmas Disease</b>. Queen Victoria was a carrier, hence called "Royal Disease".
             </div>
        </div>
    );
};

// --- SIMULATION 3: VECTOR HUNT ---
const VectorSim = ({ language }: any) => {
    const [target, setTarget] = useState(0);
    const [score, setScore] = useState(0);
    const PROBLEMS = [
        { q:{en:'Malaria', hi:'मलेरिया'}, v:'Anopheles', h:{en:'RBC Destruction', hi:'RBC विनाश'} },
        { q:{en:'Dengue', hi:'डेंगू'}, v:'Aedes', h:{en:'Platelet Drop', hi:'प्लेटलेट गिरावट'} },
        { q:{en:'Sleeping Sickness', hi:'निद्रा रोग'}, v:'Tse-Tse', h:{en:'Brain Swelling', hi:'मस्तिष्क सूजन'} },
        { q:{en:'Kala Azar', hi:'काला जार'}, v:'Sand Fly', h:{en:'Liver Swelling', hi:'यकृत सूजन'} }
    ];

    const check = (choice: string) => {
        if (choice === PROBLEMS[target].v) {
            setScore(s => s + 10);
            setTarget(t => (t + 1) % PROBLEMS.length);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 gap-8">
            <div className="flex justify-between w-full max-w-md items-center">
                 <h3 className="font-black text-slate-800 text-xl">VECTOR IDENTIFIER</h3>
                 <div className="bg-red-600 text-white px-4 py-1 rounded-full font-black text-sm shadow-lg">SCORE: {score}</div>
            </div>

            <div className="w-full max-w-md bg-white rounded-[40px] shadow-2xl p-10 border border-slate-100 text-center relative overflow-hidden group">
                 <div className="absolute top-0 right-0 bg-red-500 text-white px-4 py-1 text-[10px] font-black uppercase tracking-widest">Active Diagnosis</div>
                 <div className="text-6xl mb-4 group-hover:scale-125 transition-transform duration-500">🤒</div>
                 <h2 className="text-4xl font-black text-slate-800 mb-2 uppercase tracking-tighter">{language === Language.ENGLISH ? PROBLEMS[target].q.en : PROBLEMS[target].q.hi}</h2>
                 <p className="text-xs text-red-500 font-black uppercase flex items-center justify-center gap-2"><Activity size={14}/> {language === Language.ENGLISH ? PROBLEMS[target].h.en : PROBLEMS[target].h.hi}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                {['Anopheles', 'Aedes', 'Tse-Tse', 'Sand Fly'].map(v => (
                    <button key={v} onClick={() => check(v)} className="p-5 bg-slate-50 border-2 border-slate-200 rounded-3xl font-black text-sm text-slate-700 hover:border-red-500 hover:bg-red-50 hover:text-red-700 transition-all shadow-sm active:scale-95">{v}</button>
                ))}
            </div>
            <div className="text-[10px] font-bold text-slate-400 italic">Select the correct insect carrier for the disease shown.</div>
        </div>
    );
};

// --- SIMULATION 4: HEAVY METALS ---
const MetalsSim = ({ language }: any) => {
    const [selected, setSelected] = useState<string | null>(null);
    const POISONS = [
        { id:'hg', symbol:'Hg', name:'Mercury', disease:'Mini Mata', effect:'Nervous System', color:'bg-slate-700' },
        { id:'cd', symbol:'Cd', name:'Cadmium', disease:'Itai-Itai', effect:'Severe Joint Pain', color:'bg-indigo-600' },
        { id:'fe', symbol:'Nitrate', name:'Nitrate', disease:'Blue Baby', effect:'Oxygen Deficit', color:'bg-blue-500' },
        { id:'as', symbol:'As', name:'Arsenic', disease:'Black Foot', effect:'Skin Lesions', color:'bg-stone-800' }
    ];

    const current = POISONS.find(p => p.id === selected);

    return (
        <div className="flex flex-col items-center justify-center h-full p-8 gap-6">
             <h3 className="font-black text-slate-800 text-lg uppercase mb-4 border-b-4 border-slate-900 pb-2">Heavy Metal Toxicity Chart</h3>
             
             <div className="flex gap-4 flex-wrap justify-center">
                 {POISONS.map(p => (
                     <button key={p.id} onClick={() => setSelected(p.id)} className={`w-20 h-20 rounded-2xl flex flex-col items-center justify-center text-white font-black shadow-xl transition-all hover:scale-110 active:rotate-12 ${p.color} ${selected === p.id ? 'ring-8 ring-slate-100 scale-110' : 'opacity-80'}`}>
                         <span className="text-xl">{p.symbol}</span>
                         <span className="text-[8px] uppercase">{p.name}</span>
                     </button>
                 ))}
             </div>

             <div className={`w-full max-w-md bg-white rounded-3xl p-8 border border-slate-100 shadow-2xl transition-all duration-500 min-h-[160px] flex flex-col justify-center ${selected ? 'opacity-100 translate-y-0' : 'opacity-30 blur-sm pointer-events-none'}`}>
                 {selected && (
                     <div className="animate-fade-in text-center">
                         <div className="text-red-600 font-black text-2xl uppercase tracking-tighter mb-2">{current?.disease}</div>
                         <div className="text-slate-500 text-sm font-bold uppercase mb-4 flex items-center justify-center gap-2"><Skull size={18}/> Affected Area: {current?.effect}</div>
                         <div className="bg-slate-50 p-3 rounded-2xl text-[10px] text-slate-600 font-medium">
                            {language === Language.ENGLISH ? `Exposure to toxic levels of ${current?.name} results in permanent damage to the ${current?.effect}.` : `${current?.name} के विषाक्त स्तरों के संपर्क में आने से ${current?.effect} को स्थायी नुकसान होता है।`}
                         </div>
                     </div>
                 )}
                 {!selected && <div className="text-center text-slate-400 font-black uppercase">Select an element to study toxicity</div>}
             </div>
        </div>
    );
};

// --- SIMULATION 5: CANCER WAR ---
const CancerSim = ({ language }: any) => {
    const [cells, setCells] = useState<{id:number, type:'N'|'T', x:number, y:number}[]>([]);
    const [isRunning, setIsRunning] = useState(false);
    const [removed, setRemoved] = useState(0);

    useEffect(() => {
        let interval: any;
        if (isRunning) {
            interval = setInterval(() => {
                setCells(prev => {
                    if (prev.length >= 60) { setIsRunning(false); return prev; }
                    const isTumor = Math.random() > 0.8;
                    return [...prev, {
                        id: Math.random(),
                        type: isTumor ? 'T' : 'N',
                        x: Math.random() * 90,
                        y: Math.random() * 90
                    }];
                });
            }, 400);
        }
        return () => clearInterval(interval);
    }, [isRunning]);

    const kill = (id: number, type: string) => {
        if (type === 'T') {
            setCells(prev => prev.filter(c => c.id !== id));
            setRemoved(r => r + 1);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-full p-4 gap-4">
             <div className="flex justify-between w-full px-8 items-center">
                 <div className="text-slate-800"><span className="text-xs font-black uppercase">Active Cells: </span><span className="font-mono font-black text-red-600">{cells.length}</span></div>
                 <h3 className="font-black text-slate-800 text-lg uppercase tracking-widest flex items-center gap-2"><Microscope size={20}/> Oncology Lab</h3>
                 <div className="text-slate-800"><span className="text-xs font-black uppercase">Destroyed: </span><span className="font-mono font-black text-indigo-600">{removed}</span></div>
             </div>

             <div className="flex-1 w-full bg-slate-50 rounded-[40px] border-4 border-dashed border-slate-200 relative overflow-hidden shadow-inner flex items-center justify-center">
                 {!isRunning && cells.length === 0 ? (
                     <button onClick={() => setIsRunning(true)} className="px-10 py-5 bg-indigo-600 text-white rounded-3xl font-black shadow-2xl hover:scale-105 active:scale-95 transition-all text-xl">START DIAGNOSIS SCAN</button>
                 ) : (
                    <div className="w-full h-full relative">
                        {cells.map(c => (
                            <button 
                                key={c.id} 
                                onClick={() => kill(c.id, c.type)}
                                className={`absolute w-10 h-10 rounded-full flex items-center justify-center font-black transition-all cursor-crosshair transform active:scale-50 ${c.type === 'T' ? 'bg-red-500 text-white animate-pulse shadow-[0_0_15px_red] z-20 scale-125' : 'bg-blue-100 text-blue-800 opacity-40 z-10'}`}
                                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                            >
                                {c.type}
                            </button>
                        ))}
                    </div>
                 )}
                 {isRunning && cells.length >= 60 && <div className="absolute inset-0 bg-red-600/80 backdrop-blur-md flex flex-col items-center justify-center text-white z-50 p-10 text-center animate-fade-in"><AlertTriangle size={64} className="mb-4 animate-bounce"/><h2 className="text-4xl font-black uppercase">Tumor Proliferation High!</h2><p className="font-bold mt-2">Uncontrolled cell division exceeded diagnostic limits. Reset for new scan.</p><button onClick={() => {setCells([]); setRemoved(0);}} className="mt-8 px-10 py-4 bg-white text-red-600 rounded-3xl font-black shadow-xl">RETRY TREATMENT</button></div>}
             </div>

             <div className="bg-white px-6 py-3 rounded-full border border-slate-100 shadow-lg text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                 <Info size={14} className="text-indigo-600"/> {language === Language.ENGLISH ? "Cancer is uncontrolled mitosis. Click 'T' cells to apply Targeted Radiation." : "कैंसर अनियंत्रित समसूत्री विभाजन है। 'T' कोशिकाओं पर रेडिएशन लगाने के लिए क्लिक करें।"}
             </div>
        </div>
    );
};

export default HumanDiseases;