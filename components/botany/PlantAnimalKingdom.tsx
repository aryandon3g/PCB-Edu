import React, { useState, useEffect } from 'react';
/* Added missing Wind icon import to fix the error on line 302 */
import { TreePine, Zap, Info, ArrowRight, ArrowLeft, CheckCircle, Bug, Droplets, Heart, Baby, Microscope, List, Star, Activity, BookOpen, Layers, Search, History, Fish, Scissors, ShieldAlert, Award, Wind } from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
}

const PlantAnimalKingdom: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'plant' | 'animal' | 'sim' | 'quiz'>('intro');

  return (
    <div className="flex flex-col h-full bg-slate-50 gap-4 overflow-hidden rounded-[32px]">
      {/* Module Navbar */}
      <div className="flex bg-white border-b border-slate-200 overflow-x-auto no-scrollbar flex-shrink-0">
        {[
          { id: 'intro', icon: History, label: { en: 'History & Intro', hi: 'इतिहास और परिचय' } },
          { id: 'plant', icon: TreePine, label: { en: 'Plantae', hi: 'पादप जगत' } },
          { id: 'animal', icon: Bug, label: { en: 'Animalia', hi: 'जंतु जगत' } },
          { id: 'sim', icon: Activity, label: { en: 'Interactive Labs', hi: 'प्रयोगशाला' } },
          { id: 'quiz', icon: Star, label: { en: 'SSC Exam Practice', hi: 'SSC अभ्यास' } }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 py-4 px-6 flex items-center justify-center gap-2 transition-all whitespace-nowrap border-b-4 ${activeTab === tab.id ? 'border-green-600 bg-green-50 text-green-700' : 'border-transparent text-slate-500 hover:bg-slate-100'}`}
          >
            <tab.icon size={16} />
            <span className="font-black text-[11px] uppercase tracking-wider">{language === Language.ENGLISH ? tab.label.en : tab.label.hi}</span>
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {activeTab === 'intro' && <IntroductionTab language={language} />}
        {activeTab === 'plant' && <PlantKingdomTab language={language} />}
        {activeTab === 'animal' && <AnimalKingdomTab language={language} />}
        {activeTab === 'sim' && <LabsTab language={language} />}
        {activeTab === 'quiz' && <QuizTab language={language} />}
      </div>
    </div>
  );
};

// --- 1. INTRODUCTION TAB: CLASSIFICATION HISTORY ---

const IntroductionTab = ({ language }: Props) => {
  const systems = [
    { year: "1735", system: "2 Kingdom", scientist: "Carolus Linnaeus", groups: "Animalia, Plantae", fact: { en: "Father of Taxonomy & Animal Kingdom", hi: "जंतु जगत के जनक" } },
    { year: "1866", system: "3 Kingdom", scientist: "Ernst Haeckel", groups: "Animalia, Protista, Plantae", fact: { en: "Added Protista", hi: "प्रोटिस्टा जोड़ा" } },
    { year: "1938", system: "4 Kingdom", scientist: "Copeland", groups: "Animalia, Protista, Plantae, Monera", fact: { en: "Added Monera", hi: "मोनेरा जोड़ा" } },
    { year: "1969", system: "5 Kingdom", scientist: "R.H. Whittaker", groups: "Monera, Protista, Fungi, Plantae, Animalia", fact: { en: "Added Fungi", hi: "कवक (Fungi) जोड़ा" } },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="bg-white p-10 rounded-[48px] border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-bl-full pointer-events-none"></div>
        <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-6">
          {language === Language.ENGLISH ? "Evolution of Classification" : "वर्गीकरण का विकास"}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[10px] font-black uppercase tracking-widest border-b border-slate-200">
                <th className="p-4">System</th>
                <th className="p-4">Scientist</th>
                <th className="p-4">Kingdoms</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {systems.map((s, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-black text-indigo-600">{s.system}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-800">{s.scientist}</div>
                    <div className="text-[10px] text-green-600 font-bold uppercase tracking-tighter">{language === Language.ENGLISH ? s.fact.en : s.fact.hi}</div>
                  </td>
                  <td className="p-4 text-xs font-medium text-slate-500">{s.groups}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 bg-indigo-50 p-6 rounded-3xl border border-indigo-200 flex items-start gap-4">
          <Zap className="text-indigo-600 flex-shrink-0 mt-1" size={24} />
          <div>
            <span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Mnemonic Trick: 2L, 3H, 4C, 5W</span>
            <p className="text-indigo-900 font-bold text-sm">
              {language === Language.ENGLISH 
                ? "Remember the sequence: L(innaeus) → H(aeckel) → C(opeland) → W(hittaker)!" 
                : "क्रम याद रखें: L(Linnaeus) → H(Haeckel) → C(Copeland) → W(Whittaker)!"}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
           <h3 className="text-xl font-black text-slate-800 uppercase mb-4">{language === Language.ENGLISH ? "Evolution Order" : "विकास का क्रम"}</h3>
           <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
              {['Fish', 'Amphibian', 'Reptile', 'Bird', 'Mammal'].map((item, idx) => (
                <React.Fragment key={item}>
                   <div className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase">{item}</div>
                   {idx < 4 && <ArrowRight size={14} className="text-slate-300" />}
                </React.Fragment>
              ))}
           </div>
        </div>
        <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-sm">
           <h3 className="text-xl font-black text-slate-800 uppercase mb-4">{language === Language.ENGLISH ? "Heterotroph Types" : "विषमपोषी के प्रकार"}</h3>
           <div className="flex gap-4">
              <div className="flex-1 p-4 bg-orange-50 rounded-2xl border border-orange-100">
                 <div className="font-black text-orange-700 text-sm">Holozoic (समपोषी)</div>
                 <div className="text-[9px] text-orange-600 mt-1 uppercase font-bold tracking-tighter">Digestion + Absorb + Excretion</div>
              </div>
              <div className="flex-1 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                 <div className="font-black text-blue-700 text-sm">Saprophyte (सप्रोफाइट्स)</div>
                 <div className="text-[9px] text-blue-600 mt-1 uppercase font-bold tracking-tighter">Feeds on Dead Matter</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- 2. PLANT KINGDOM TAB ---

const PlantKingdomTab = ({ language }: Props) => {
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const GROUPS = [
    { id: 'thallo', name: { en: 'Thallophyta', hi: 'थैलोफाइटा' }, desc: { en: 'Simplest aquatic plants known as ALGAE. No stem/roots.', hi: 'सबसे सरल जलीय पौधे, जिन्हें शैवाल (Algae) कहते हैं। कोई तना/जड़ नहीं।' }, trick: 'Algae = Thallus (थैला)', examples: 'Spirogyra, Ulothrix, Chara' },
    { id: 'bryo', name: { en: 'Bryophyta', hi: 'ब्रायोफाइटा' }, desc: { en: 'Amphibians of plant kingdom. Need water for reproduction.', hi: 'पादप जगत के उभयचर। प्रजनन के लिए पानी आवश्यक।' }, trick: 'B for Boat (Water)', examples: 'Moss (Funaria), Marchantia' },
    { id: 'pteri', name: { en: 'Pteridophyta', hi: 'टेरिडोफाइटा' }, desc: { en: 'First terrestrial plants with vascular tissue (Xylem/Phloem).', hi: 'संवहनी ऊतक (जाइलम/फ्लोएम) वाले पहले स्थलीय पौधे।' }, trick: 'Pioneer (Vascular)', examples: 'Marsilea, Ferns' },
    { id: 'gymno', name: { en: 'Gymnosperms', hi: 'जिम्नोस्पर्म' }, desc: { en: 'Produce naked seeds (No fruit). Evergreen and woody.', hi: 'नग्न बीज (बिना आवरण) पैदा करते हैं। सदाबहार और काष्ठीय।' }, trick: 'Naked Seeds', examples: 'Pine, Deodar, Cycas' },
    { id: 'angio', name: { en: 'Angiosperms', hi: 'एंजियोस्पर्म' }, desc: { en: 'Flowering plants with covered seeds. Monocots & Dicots.', hi: 'ढके हुए बीज वाले फूल वाले पौधे। एकबीजपत्री और द्विबीजपत्री।' }, trick: 'Covered (Box)', examples: 'Rice, Pea, Wheat' }
  ];

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in pb-10">
      <div className="space-y-4">
        <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter flex items-center gap-3 mb-6">
          <TreePine className="text-green-600" />
          {language === Language.ENGLISH ? "Plantae Classification" : "पादप जगत का वर्गीकरण"}
        </h3>
        {GROUPS.map(g => (
          <button key={g.id} onClick={() => setActiveGroup(g.id)} className={`w-full text-left p-6 rounded-3xl border-2 transition-all ${activeGroup === g.id ? 'border-green-500 bg-white shadow-xl scale-105' : 'border-slate-100 bg-slate-50 hover:border-slate-200'}`}>
            <div className="flex justify-between items-center">
              <span className="font-black text-lg uppercase tracking-tight text-slate-800">{language === Language.ENGLISH ? g.name.en : g.name.hi}</span>
              <ArrowRight size={20} className={activeGroup === g.id ? 'text-green-600' : 'text-slate-300'} />
            </div>
          </button>
        ))}
      </div>

      <div className="relative">
        {activeGroup ? (
          <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-2xl animate-scale-up h-full flex flex-col">
            <h4 className="text-4xl font-black text-green-600 mb-4 uppercase tracking-tighter">{language === Language.ENGLISH ? GROUPS.find(x => x.id === activeGroup)?.name.en : GROUPS.find(x => x.id === activeGroup)?.name.hi}</h4>
            <p className="text-slate-600 text-lg font-medium leading-relaxed mb-8 border-b border-slate-100 pb-8">{language === Language.ENGLISH ? GROUPS.find(x => x.id === activeGroup)?.desc.en : GROUPS.find(x => x.id === activeGroup)?.desc.hi}</p>
            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 mb-8 flex items-start gap-4">
              <Zap className="text-indigo-600 flex-shrink-0" size={24} />
              <div><span className="text-[10px] font-black text-indigo-600 uppercase tracking-widest block mb-1">Mnemonic</span><p className="text-indigo-900 font-bold">"{GROUPS.find(x => x.id === activeGroup)?.trick}"</p></div>
            </div>
            <div className="mt-auto bg-slate-50 p-6 rounded-3xl border border-slate-200">
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Key Examples</div>
               <div className="flex flex-wrap gap-2">{GROUPS.find(x => x.id === activeGroup)?.examples.split(', ').map(ex => <span key={ex} className="px-4 py-2 bg-white rounded-xl text-sm font-bold text-slate-700 shadow-sm border border-slate-100">{ex}</span>)}</div>
            </div>
          </div>
        ) : <div className="h-full flex flex-col items-center justify-center text-center p-10 bg-white/50 rounded-[40px] border-4 border-dashed border-slate-200"><Layers className="text-slate-300 mb-4" size={64} /><p className="text-slate-400 font-black uppercase tracking-widest">Select a plant group to study</p></div>}
      </div>
    </div>
  );
};

// --- 3. ANIMAL KINGDOM TAB: 11 PHYLA ---

const AnimalKingdomTab = ({ language }: Props) => {
  const [activePhylum, setActivePhylum] = useState<string | null>(null);

  const PHYLA = [
    { id: 'proto', name: { en: 'Protozoa', hi: 'प्रोटोजोआ' }, desc: { en: 'Unicellular, aquatic. No tissues/organs.', hi: 'एककोशकीय, जलीय। ऊतक/अंग नहीं होते।' }, examples: 'Amoeba, Plasmodium', trick: 'Unicellular Ancestors' },
    { id: 'pori', name: { en: 'Porifera', hi: 'पोरीफेरा' }, desc: { en: 'Multicellular, non-motile. Have holes called OSTIA.', hi: 'बहुकोशकीय, गतिहीन। छिद्र (Ostia) होते हैं।' }, examples: 'Sycon, Spongilla', trick: 'Pores = Porifera' },
    { id: 'cnid', name: { en: 'Cnidaria', hi: 'सीलेन्टेरा' }, desc: { en: 'No blood. Heterotrophs with tentacles.', hi: 'रक्त नहीं होता। स्पर्शक युक्त विषमपोषी।' }, examples: 'Hydra, Corals', trick: 'No Blood' },
    { id: 'cten', name: { en: 'Ctenophora', hi: 'टीनोफोरा' }, desc: { en: 'Bioluminescent, transparent, marine.', hi: 'जैवदीप्तिशील, पारदर्शी, समुद्री।' }, examples: 'Jellyfish, Ctenoplana', trick: 'Bio-Luminous' },
    { id: 'platy', name: { en: 'Platyhelminthes', hi: 'प्लैटीहेल्मिंथिस' }, desc: { en: 'Flatworms, parasites. FLAME CELLS for excretion.', hi: 'चपटे कृमि, परजीवी। फ्लेम सेल द्वारा उत्सर्जन।' }, examples: 'Tapeworm, Planaria', trick: 'Flat Body' },
    { id: 'nema', name: { en: 'Nematoda', hi: 'नेमाटोडा' }, desc: { en: 'Roundworms. Small Intestine related.', hi: 'गोल कृमि। छोटी आंत से संबंधित।' }, examples: 'Ascaris, Wuchereria', trick: 'Round Worm' },
    { id: 'anne', name: { en: 'Annelida', hi: 'एनीलीडा' }, desc: { en: 'Segmented body with rings. Closed circulation.', hi: 'छल्लेदार विखंडित शरीर। बंद परिसंचरण।' }, examples: 'Earthworm, Leech', trick: 'Closed Pipe Rings' },
    { id: 'arth', name: { en: 'Arthropoda', hi: 'आर्थ्रोपोडा' }, desc: { en: 'LARGEST PHYLUM (83%). Jointed legs, chitin exoskeleton.', hi: 'सबसे बड़ा संघ। जोड़ वाले पैर, चिटिन कंकाल।' }, examples: 'Cockroach, Butterfly', trick: 'Largest + Joint Legs' },
    { id: 'moll', name: { en: 'Mollusca', hi: 'मोलस्का' }, desc: { en: 'Soft body with CaCO3 shell. Blue blood (Copper).', hi: 'नरम शरीर, CaCO3 आवरण। नीला रक्त (तांबा)।' }, examples: 'Octopus, Snail', trick: 'Soft + Blue Blood' },
    { id: 'echi', name: { en: 'Echinodermata', hi: 'एकाइनोडर्मेटा' }, desc: { en: 'Spiny skin, marine habitat.', hi: 'कांटेदार त्वचा, समुद्री आवास।' }, examples: 'Starfish, Sea Urchin', trick: 'Echino = Spines' },
    { id: 'chor', name: { en: 'Chordata', hi: 'कॉर्डेटा' }, desc: { en: 'Backbone (Notochord) present. Includes 5 classes.', hi: 'रीढ़ की हड्डी मौजूद। 5 वर्ग शामिल हैं।' }, examples: 'Humans, Birds, Fish', trick: 'Notochord Backbone' }
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-10 animate-fade-in pb-20">
      <div className="bg-slate-900 text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-8 items-center">
        <div className="flex-1">
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">{language === Language.ENGLISH ? "Animalia: The Kingdom of Millions" : "एनिमेलिया: लाखों का जगत"}</h2>
          <p className="text-slate-400 font-medium leading-relaxed max-w-2xl italic">
            "Pro -> Po -> Ki -> Teen -> Plat -> a -> a -> a -> Ma -> Kha -> Ye"
          </p>
          <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {['Protozoa', 'Porifera', 'Cnidaria', 'Ctenophora', 'Platy', 'Nema', 'Annelida', 'Arthro', 'Mollu', 'Echino', 'Chordata'].map(n => <span key={n} className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-bold uppercase">{n}</span>)}
          </div>
        </div>
        <div className="bg-red-600 p-6 rounded-3xl shadow-xl text-center border-t-4 border-white/20">
            <div className="text-xs font-black uppercase">Arthropoda</div>
            <div className="text-4xl font-black mt-1">83%</div>
            <div className="text-[8px] font-bold uppercase opacity-80 mt-1">Largest Phylum</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {PHYLA.map(p => (
          <button key={p.id} onClick={() => setActivePhylum(p.id)} className={`p-6 rounded-[32px] border-2 text-left transition-all relative overflow-hidden group ${activePhylum === p.id ? 'border-red-500 bg-white shadow-2xl scale-105' : 'border-slate-100 bg-white hover:border-slate-300'}`}>
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-colors ${activePhylum === p.id ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                {p.name.en[0]}
              </div>
              <h4 className="font-black text-slate-800 uppercase tracking-tighter">{language === Language.ENGLISH ? p.name.en : p.name.hi}</h4>
            </div>
            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4">{language === Language.ENGLISH ? p.desc.en : p.desc.hi}</p>
            <div className={`p-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${activePhylum === p.id ? 'bg-red-50 text-red-700' : 'bg-slate-50 text-slate-400'}`}>
               Trick: {p.trick}
            </div>
            {activePhylum === p.id && (
               <div className="mt-4 animate-fade-in border-t border-slate-100 pt-4">
                  <div className="text-[9px] font-black text-slate-400 uppercase mb-2">SSC Examples</div>
                  <div className="flex flex-wrap gap-1">
                     {p.examples.split(', ').map(ex => <span key={ex} className="px-2 py-1 bg-slate-900 text-white rounded-lg text-[10px] font-black">{ex}</span>)}
                  </div>
               </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

// --- 4. LABS TAB: SIMULATIONS ---

const LabsTab = ({ language }: Props) => {
  const [activeLab, setActiveLab] = useState<'heart' | 'classification' | 'phylum'>('heart');

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-10">
      <div className="flex bg-slate-200 p-1.5 rounded-3xl w-fit mx-auto shadow-inner">
        {[
          { id: 'heart', icon: Heart, label: 'Heart & Organs' },
          { id: 'classification', icon: History, label: 'Kingdom Tree' },
          { id: 'phylum', icon: Search, label: 'Phylum Hunt' }
        ].map(lab => (
          <button key={lab.id} onClick={() => setActiveLab(lab.id as any)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${activeLab === lab.id ? 'bg-white text-indigo-600 shadow-xl' : 'text-slate-500 hover:text-slate-800'}`}>
            <lab.icon size={16}/> {lab.label}
          </button>
        ))}
      </div>

      <div className="bg-white p-8 rounded-[48px] border border-slate-200 shadow-sm min-h-[500px] flex items-center justify-center relative overflow-hidden">
        {activeLab === 'heart' ? <HeartChamberLab language={language} /> : 
         activeLab === 'classification' ? <KingdomTreeLab language={language} /> : 
         <PhylumHuntLab language={language} />}
      </div>
    </div>
  );
};

const HeartChamberLab = ({ language }: Props) => {
  const [idx, setIdx] = useState(0);
  const data = [
    { type: 'Pices (Fish)', chambers: 2, icon: '🐟', organs: 'Gills', fact: 'Dolphin/Whale exception: 4' },
    { type: 'Amphibian', chambers: 3, icon: '🐸', organs: 'Skin/Lungs/Gills', fact: 'Performs Hibernation' },
    { type: 'Reptile', chambers: 3, icon: '🦎', organs: 'Lungs', fact: 'Crocodile/Alligator exception: 4' },
    { type: 'Bird/Aves', chambers: 4, icon: '🦅', organs: 'Lungs', fact: 'Endothermic' },
    { type: 'Mammal', chambers: 4, icon: '🐋', organs: 'Lungs', fact: 'Placental/Egg/Pouch' },
    { type: 'Cockroach', chambers: 13, icon: '🪳', organs: 'Trachea', fact: 'White Blood (Haemolymph)' }
  ];

  const current = data[idx];

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl animate-fade-in">
       <div className="flex justify-between w-full items-center px-4">
          <button onClick={() => setIdx(prev => (prev - 1 + data.length) % data.length)} className="p-4 bg-slate-100 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-md"><ArrowLeft/></button>
          <div className="text-center">
             <div className="text-6xl mb-2 drop-shadow-xl">{current.icon}</div>
             <h4 className="text-3xl font-black text-slate-800 uppercase tracking-tighter">{current.type}</h4>
          </div>
          <button onClick={() => setIdx(prev => (prev + 1) % data.length)} className="p-4 bg-slate-100 rounded-2xl hover:bg-indigo-600 hover:text-white transition-all shadow-md"><ArrowRight/></button>
       </div>

       <div className="grid grid-cols-2 gap-4 w-full">
          <div className="bg-indigo-50 p-6 rounded-3xl border-2 border-indigo-100 text-center shadow-inner">
             <div className="text-xs font-black text-indigo-400 uppercase mb-1">Respiratory Organ</div>
             <div className="text-xl font-black text-indigo-700 uppercase flex items-center justify-center gap-2">
                <Wind size={20}/> {current.organs}
             </div>
          </div>
          <div className="bg-red-50 p-6 rounded-3xl border-2 border-red-100 text-center shadow-inner">
             <div className="text-xs font-black text-red-400 uppercase mb-1">Heart Chambers</div>
             <div className="text-3xl font-black text-red-600 animate-pulse">{current.chambers}</div>
          </div>
       </div>

       <div className="bg-yellow-50 p-6 rounded-3xl border border-yellow-200 w-full relative overflow-hidden">
          <div className="absolute top-2 right-4 text-[8px] font-black text-yellow-600 uppercase tracking-widest">SSC Important Exception</div>
          <div className="flex gap-4 items-start">
             <ShieldAlert className="text-yellow-600 flex-shrink-0 mt-1" size={24}/>
             <p className="text-yellow-900 font-bold leading-relaxed">{current.fact}</p>
          </div>
       </div>

       {current.type === 'Mammal' && (
          <div className="grid grid-cols-3 gap-3 w-full animate-bounce-in">
             {['Protheria (Eggs)', 'Metatheria (Pouch)', 'Eutheria (Placenta)'].map(m => (
               <div key={m} className="p-3 bg-slate-900 text-white rounded-2xl text-[9px] font-black text-center border-t-2 border-white/20 uppercase tracking-tighter">{m}</div>
             ))}
          </div>
       )}
    </div>
  );
};

const KingdomTreeLab = ({ language }: Props) => {
  const [level, setLevel] = useState(4);
  const data = [
    { name: "2 Kingdoms", scientist: "Linnaeus", k: "Animalia, Plantae", icon: "🌱" },
    { name: "3 Kingdoms", scientist: "Haeckel", k: "Protista added", icon: "🧬" },
    { name: "4 Kingdoms", scientist: "Copeland", k: "Monera added", icon: "🦠" },
    { name: "5 Kingdoms", scientist: "Whittaker", k: "Fungi added", icon: "🍄" }
  ];

  return (
    <div className="flex flex-col items-center gap-10 w-full animate-fade-in">
       <div className="text-center">
          <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tighter">Whittaker Tree Evolution</h3>
          <p className="text-xs font-bold text-slate-400 mt-2">Adjust timeline to see kingdom branching</p>
       </div>

       <div className="relative h-64 w-full max-w-md flex items-end justify-center">
           {/* Trunk */}
           <div className="w-8 h-20 bg-amber-900 rounded-t-xl z-0"></div>
           
           {/* Branches */}
           <div className="absolute inset-0 flex items-center justify-center">
              {Array.from({length: level + 1}).map((_, i) => (
                <div key={i} className="absolute transition-all duration-700" style={{ transform: `rotate(${(i * 50) - 100}deg) translateY(-80px)` }}>
                   <div className="w-16 h-16 bg-green-500 rounded-[20px] shadow-xl border-4 border-white flex flex-col items-center justify-center text-white scale-125">
                      <span className="text-xl">{(['🦠', '🧬', '🍄', '🌱', '🦍'])[i]}</span>
                   </div>
                </div>
              ))}
           </div>
       </div>

       <div className="w-full max-w-sm space-y-6">
          <input type="range" min="1" max="4" value={level} onChange={e => setLevel(Number(e.target.value))} className="w-full h-4 bg-slate-100 rounded-full appearance-none cursor-pointer accent-green-600" />
          <div className="bg-slate-900 p-6 rounded-[32px] text-white border-t-4 border-green-500 shadow-2xl relative">
             <div className="text-green-400 font-black text-xl uppercase tracking-tighter">{data[level-1].name}</div>
             <div className="text-xs font-bold opacity-60 uppercase mb-2">Proposed by {data[level-1].scientist}</div>
             <p className="text-sm font-bold">{data[level-1].k}</p>
          </div>
       </div>
    </div>
  );
};

const PhylumHuntLab = ({ language }: Props) => {
  const [target, setTarget] = useState(0);
  const [score, setScore] = useState(0);
  const CHALLENGES = [
    { q: "Who has 'Flame Cells' for excretion?", a: "Platyhelminths", h: "Hint: They are Flatworms." },
    { q: "Largest phylum with jointed legs?", a: "Arthropoda", h: "Hint: Chitin exoskeleton." },
    { q: "Blue blood with CaCO3 shell?", a: "Mollusca", h: "Hint: Octopus belongs here." },
    { q: "Spiny skin, marine only?", a: "Echinodermata", h: "Hint: Starfish." },
    { q: "No blood, has tentacles?", a: "Cnidaria", h: "Hint: Hydra." }
  ];

  const check = (ans: string) => {
    if (ans === CHALLENGES[target].a) {
      setScore(s => s + 10);
      setTarget(prev => (prev + 1) % CHALLENGES.length);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-xl animate-fade-in p-6">
       <div className="flex justify-between w-full items-center">
          <div className="text-indigo-600 font-black text-xl flex items-center gap-2"><Search size={24}/> Phylum Hunt</div>
          <div className="bg-indigo-600 text-white px-5 py-2 rounded-2xl font-black shadow-lg">SCORE: {score}</div>
       </div>

       <div className="w-full bg-slate-900 p-10 rounded-[48px] border-b-8 border-indigo-500 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full pointer-events-none"></div>
          <Microscope className="text-indigo-400 mb-4 opacity-50 group-hover:scale-125 transition-transform" size={48}/>
          <h2 className="text-2xl font-black text-white uppercase tracking-tight leading-tight mb-4">{CHALLENGES[target].q}</h2>
          <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest italic">{CHALLENGES[target].h}</div>
       </div>

       <div className="grid grid-cols-2 gap-3 w-full">
          {['Platyhelminths', 'Arthropoda', 'Mollusca', 'Echinodermata', 'Cnidaria', 'Annelida'].map(btn => (
            <button key={btn} onClick={() => check(btn)} className="p-4 bg-white border-2 border-slate-100 rounded-2xl font-black text-xs text-slate-700 hover:border-indigo-600 hover:text-indigo-600 transition-all active:scale-95 shadow-sm">{btn}</button>
          ))}
       </div>
    </div>
  );
};

// --- 5. QUIZ TAB ---

const QuizTab = ({ language }: Props) => {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);

  const QUESTIONS = [
    { q: {en: "Who is known as the Father of Animal Kingdom?", hi: "जंतु जगत के जनक कौन हैं?"}, a: "Linnaeus", o: ["Aristotle", "Linnaeus", "Whittaker", "Darwin"] },
    { q: {en: "How many heart chambers does a Crocodile have?", hi: "मगरमच्छ के हृदय में कितने कक्ष होते हैं?"}, a: "4", o: ["2", "3", "4", "5"] },
    { q: {en: "Which phylum is the largest (83%) in the animal kingdom?", hi: "जंतु जगत का सबसे बड़ा संघ कौन सा है?"}, a: "Arthropoda", o: ["Mollusca", "Chordata", "Arthropoda", "Annelida"] },
    { q: {en: "Which cells perform excretion in flatworms?", hi: "चपटे कृमियों में उत्सर्जन कौन सी कोशिकाएं करती हैं?"}, a: "Flame Cells", o: ["Kidney", "Skin", "Flame Cells", "Nephridia"] },
    { q: {en: "Who proposed the 5 Kingdom classification?", hi: "5 जगत वर्गीकरण किसने प्रस्तावित किया?"}, a: "Whittaker", o: ["Copeland", "Haeckel", "Whittaker", "Linnaeus"] },
    { q: {en: "Blue blood in Octopus is due to what?", hi: "ऑक्टोपस का नीला रक्त किसके कारण होता है?"}, a: "Haemocyanin", o: ["Hemoglobin", "Haemocyanin", "Magnesium", "Copper"] }
  ];

  const handleAnswer = (opt: string) => {
    if (answered !== null) return;
    if (opt === QUESTIONS[index].a) {
      setScore(s => s + 1);
      setAnswered(true);
    } else setAnswered(false);
  };

  const next = () => {
    setIndex(i => (i + 1) % QUESTIONS.length);
    setAnswered(null);
  };

  return (
    <div className="max-w-2xl mx-auto py-10 animate-fade-in">
       <div className="mb-10 flex justify-between items-center bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div>
            <h3 className="font-black text-slate-800 uppercase tracking-tighter flex items-center gap-2"><Award className="text-yellow-500" size={20}/> Exam Drill</h3>
            <p className="text-xs text-slate-400 font-bold uppercase">Question {index + 1} of {QUESTIONS.length}</p>
          </div>
          <div className="bg-green-600 text-white px-5 py-2 rounded-2xl font-black shadow-lg">Points: {score * 10}</div>
       </div>

       <div className="bg-white p-10 rounded-[48px] border-4 border-slate-100 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-green-500/20"></div>
          <h2 className="text-2xl font-black text-slate-800 mb-10 leading-tight">Q: {language === Language.ENGLISH ? QUESTIONS[index].q.en : QUESTIONS[index].q.hi}</h2>
          
          <div className="grid gap-3">
             {QUESTIONS[index].o.map(opt => (
                <button
                  key={opt}
                  onClick={() => handleAnswer(opt)}
                  className={`w-full p-5 rounded-2xl font-bold text-left transition-all border-2 ${answered !== null ? (opt === QUESTIONS[index].a ? 'bg-green-50 border-green-500 text-green-700' : 'bg-slate-50 border-slate-200 text-slate-300') : 'bg-white border-slate-100 hover:border-green-500 hover:bg-green-50 text-slate-600'}`}
                >
                  {opt}
                </button>
             ))}
          </div>

          {answered !== null && (
            <button onClick={next} className="mt-10 w-full py-5 bg-slate-900 text-white rounded-3xl font-black uppercase tracking-widest shadow-xl hover:bg-black active:scale-95 transition-all">Next Question</button>
          )}
       </div>
    </div>
  );
};

export default PlantAnimalKingdom;