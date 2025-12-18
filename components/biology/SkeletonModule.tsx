
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  BookOpen, FlaskConical, ArrowRight, ArrowLeft, Accessibility, 
  CheckCircle, RotateCcw, Info, Zap, ShieldCheck, AlertCircle, 
  Trophy, Box, Activity, Microscope, Droplets, Layers, Shield
} from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
}

// --- STORY CONTENT UPDATED WITH PDF DATA ---
const SKELETON_STORY = [
  {
    id: 1,
    title: { en: "The Grand Blueprint: Framework", hi: "महान ब्लूप्रिंट: शरीर का ढाँचा" },
    text: {
        en: "In Aarti Mam's class, Riya learned that the skeleton provides support and strength. It protects vital organs: the Skull protects the Brain, Vertebrae protect the Spinal Cord, and the Rib Cage protects the Lungs and Heart. Even the Sternum protects major blood vessels!",
        hi: "आरती मैम की कक्षा में, रिया ने सीखा कि कंकाल सहारा और मजबूती प्रदान करता है। यह महत्वपूर्ण अंगों की रक्षा करता है: खोपड़ी मस्तिष्क की, कशेरुक रीढ़ की हड्डी की, और पसलियां फेफड़ों और हृदय की रक्षा करती हैं। यहाँ तक कि स्टर्नम (Sternum) मुख्य रक्त वाहिकाओं की रक्षा करता है!"
    },
    facts: [
        { label: { en: "Study", hi: "अध्ययन" }, val: "Osteology" },
        { label: { en: "Secret Functions", hi: "गुप्त कार्य" }, val: { en: "Mineral Storage & Endocrine Regulation", hi: "खनिज संचय और अंतःस्रावी विनियमन" } },
        { label: { en: "Blood Factory", hi: "रक्त कारखाना" }, val: { en: "Hematopoiesis in Bone Marrow", hi: "अस्थि मज्जा में रक्त निर्माण" } }
    ],
    visual: 'robot'
  },
  {
    id: 2,
    title: { en: "The Bone Count: 80 + 126", hi: "हड्डियों की गिनती: 80 + 126" },
    text: {
        en: "At birth, we have about 300 bones! By maturity, many fuse into 206. These are split into two groups: Axial Skeleton (80 bones) forming the central axis, and Appendicular Skeleton (126 bones) including your limbs and girdles.",
        hi: "जन्म के समय हमारे पास लगभग 300 हड्डियाँ होती हैं! वयस्क होने तक कई जुड़कर 206 रह जाती हैं। इन्हें दो समूहों में बांटा गया है: अक्षीय (Axial) कंकाल (80 हड्डियाँ) जो केंद्रीय अक्ष बनाता है, और उपांगीय (Appendicular) कंकाल (126 हड्डियाँ) जिसमें आपके हाथ-पैर और मेखलाएं (Girdles) शामिल हैं।"
    },
    facts: [
        { label: { en: "Axial (80)", hi: "अक्षीय (80)" }, val: { en: "Skull, Spine, Rib Cage", hi: "खोपड़ी, रीढ़, पसली पिंजर" } },
        { label: { en: "Appendicular (126)", hi: "उपांगीय (126)" }, val: { en: "Limbs, Pelvis, Girdles", hi: "हाथ-पैर, कूल्हा, मेखलाएं" } }
    ],
    visual: 'classification'
  },
  {
    id: 3,
    title: { en: "Connectors: BLB & MTB", hi: "संयोजक: BLB और MTB" },
    text: {
        en: "Ligaments (BLB) tie Bone-to-Bone for stability. Tendons (MTB) tie Muscle-to-Bone for movement. Cartilage is the soft padding that prevents friction. These components allow the framework to move safely.",
        hi: "स्नायुबंधन (BLB) स्थिरता के लिए हड्डी-से-हड्डी को बांधते हैं। टेंडन (MTB) गति के लिए मांसपेशी-को-हड्डी से जोड़ते हैं। उपास्थि (Cartilage) वह नरम गद्दी है जो घर्षण को रोकती है। ये घटक ढांचे को सुरक्षित रूप से हिलने-डुलने की अनुमति देते हैं।"
    },
    facts: [
        { label: { en: "BLB", hi: "BLB ट्रिक" }, val: "Bone - Ligament - Bone" },
        { label: { en: "MTB", hi: "MTB ट्रिक" }, val: "Muscle - Tendon - Bone" }
    ],
    visual: 'connectors'
  },
  {
    id: 4,
    title: { en: "Synovial Joints & Lubrication", hi: "सिनोवियल जोड़ और चिकनाई" },
    text: {
        en: "Mobile joints are called Synovial Joints. They contain a Synovial Membrane that secretes Synovial Fluid. This biological lubricant acts like oil in a machine, ensuring frictionless movement of our bones.",
        hi: "गतिशील जोड़ों को सिनोवियल जोड़ कहा जाता है। इनमें एक सिनोवियल झिल्ली होती है जो सिनोवियल द्रव स्रावित करती है। यह जैविक स्नेहक (Lubricant) मशीन में तेल की तरह काम करता है, जिससे हड्डियों की घर्षण रहित गति सुनिश्चित होती है।"
    },
    facts: [
        { label: { en: "Fluid", hi: "द्रव" }, val: "Synovial Fluid" },
        { label: { en: "Arthrology", hi: "अध्ययन" }, val: { en: "Study of Joints", hi: "जोड़ों का अध्ययन" } }
    ],
    visual: 'synovial'
  }
];

const SkeletonModule: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'lab'>('story');
  const [chapter, setChapter] = useState(0);

  return (
    <div className="flex flex-col h-full bg-white gap-4 overflow-hidden border border-slate-200 rounded-[32px] shadow-sm min-h-[600px]">
      {/* Header */}
      <div className="bg-slate-50 p-4 rounded-t-[32px] border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-100">
             <Accessibility className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase leading-none">Skeleton Lab 3D</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                {language === Language.ENGLISH ? "Axial & Appendicular Systems" : "अक्षीय और उपांगीय प्रणालियाँ"}
            </p>
          </div>
        </div>
        
        <div className="flex bg-slate-200 p-1 rounded-2xl w-full md:w-auto">
           <button 
             onClick={() => setActiveTab('story')} 
             className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all uppercase tracking-widest ${activeTab === 'story' ? 'bg-white text-blue-700 shadow-md scale-105' : 'text-slate-500 hover:text-slate-800'}`}
           >
              <BookOpen size={16} /> {language === Language.ENGLISH ? "Theory" : "सिद्धांत"}
           </button>
           <button 
             onClick={() => setActiveTab('lab')} 
             className={`flex-1 md:flex-none px-6 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition-all uppercase tracking-widest ${activeTab === 'lab' ? 'bg-white text-indigo-700 shadow-md scale-105' : 'text-slate-500 hover:text-slate-800'}`}
           >
              <FlaskConical size={16} /> {language === Language.ENGLISH ? "3D Sim" : "3D सिम"}
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {activeTab === 'story' ? (
          <StoryView language={language} chapter={chapter} setChapter={setChapter} />
        ) : (
          <Skeleton3DLab language={language} />
        )}
      </div>
    </div>
  );
};

// --- STORY VIEW COMPONENT ---
const StoryView = ({ language, chapter, setChapter }: any) => {
    const data = SKELETON_STORY[chapter];
    const renderVisual = (type: string) => {
        switch(type) {
            case 'robot':
                return (
                    <div className="flex flex-col items-center gap-12 animate-fade-in">
                        <div className="flex gap-8 sm:gap-16">
                            <div className="text-center group">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-red-50 rounded-[40px] shadow-xl flex items-center justify-center text-5xl border-b-8 border-red-500 relative">
                                    🤖
                                </div>
                                <div className="mt-4 font-black text-[10px] text-red-600 uppercase tracking-widest">No Support</div>
                            </div>
                            <div className="text-center group">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-[40px] shadow-xl flex items-center justify-center text-5xl border-b-8 border-blue-500 relative">
                                    🛡️
                                </div>
                                <div className="mt-4 font-black text-[10px] text-blue-600 uppercase tracking-widest">Protection</div>
                            </div>
                        </div>
                    </div>
                );
            case 'classification':
                return (
                    <div className="flex flex-col items-center gap-6 animate-fade-in">
                         <div className="flex gap-4">
                             <div className="bg-indigo-600 text-white p-6 rounded-3xl shadow-xl text-center">
                                 <div className="text-2xl font-black">AXIAL</div>
                                 <div className="text-4xl mt-2">80</div>
                                 <div className="text-[8px] mt-1 font-bold uppercase tracking-widest">Bones</div>
                             </div>
                             <div className="bg-emerald-600 text-white p-6 rounded-3xl shadow-xl text-center">
                                 <div className="text-2xl font-black">APPEND</div>
                                 <div className="text-4xl mt-2">126</div>
                                 <div className="text-[8px] mt-1 font-bold uppercase tracking-widest">Bones</div>
                             </div>
                         </div>
                         <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Total: 206 Bones</div>
                    </div>
                );
            case 'connectors':
                return (
                    <div className="flex flex-col items-center gap-6 animate-fade-in">
                        <div className="bg-white p-6 rounded-[32px] border-2 border-slate-100 shadow-xl flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-6 bg-slate-200 rounded-lg"></div>
                                <div className="w-6 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                                <div className="w-12 h-6 bg-slate-200 rounded-lg"></div>
                                <span className="text-[10px] font-black text-orange-600">BLB</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-6 bg-red-400 rounded-lg"></div>
                                <div className="w-6 h-2 bg-slate-400 rounded-full"></div>
                                <div className="w-12 h-6 bg-slate-200 rounded-lg"></div>
                                <span className="text-[10px] font-black text-slate-600">MTB</span>
                            </div>
                        </div>
                    </div>
                );
            case 'synovial':
                return (
                    <div className="flex flex-col items-center gap-6 animate-fade-in">
                        <div className="relative w-40 h-40 bg-white rounded-3xl border-4 border-blue-100 shadow-xl flex items-center justify-center">
                            <Droplets size={64} className="text-blue-400 animate-bounce" />
                        </div>
                        <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase shadow-xl">Synovial Lubricant</div>
                    </div>
                );
            default: return null;
        }
    };

    return (
        <div className="h-full flex flex-col md:flex-row gap-4 p-4 bg-white">
            <div className="flex-1 bg-slate-50 rounded-[40px] border border-slate-100 flex items-center justify-center p-8 relative overflow-hidden min-h-[350px]">
                {renderVisual(data.visual)}
                <div className="absolute bottom-8 flex gap-2.5">
                    {SKELETON_STORY.map((_, i) => (
                        <button key={i} onClick={() => setChapter(i)} className={`h-1.5 rounded-full transition-all duration-500 ${i === chapter ? 'w-10 bg-blue-600 shadow-lg' : 'w-2 bg-slate-200 hover:bg-slate-300'}`} />
                    ))}
                </div>
            </div>
            
            <div className="w-full md:w-80 lg:w-[450px] flex flex-col gap-4">
                <div className="bg-white p-8 rounded-[48px] shadow-2xl border-l-[16px] border-blue-600 flex-1 flex flex-col relative overflow-hidden border border-slate-100">
                    <h2 className="text-2xl font-black text-slate-800 mb-4 flex items-center gap-4">
                        <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-sm font-black shadow-inner">{chapter+1}</span>
                        {language === Language.ENGLISH ? data.title.en : data.title.hi}
                    </h2>
                    
                    <div className="bg-blue-50/50 p-6 rounded-[32px] mb-6 border border-blue-100 flex-1 overflow-y-auto custom-scrollbar">
                        <p className="text-slate-700 leading-relaxed text-base font-medium italic">
                            "{language === Language.ENGLISH ? data.text.en : data.text.hi}"
                        </p>
                    </div>

                    <div className="space-y-2 mb-8">
                        {data.facts.map((f:any, idx:number) => (
                           <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm hover:scale-[1.02] transition-transform">
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{language === Language.ENGLISH ? f.label.en : f.label.hi}</span>
                               <span className="text-xs font-black text-blue-600 text-right">{typeof f.val === 'string' ? f.val : (language === Language.ENGLISH ? f.val.en : f.val.hi)}</span>
                           </div>
                        ))}
                    </div>

                    <div className="flex justify-between gap-4 mt-auto">
                        <button onClick={() => setChapter(Math.max(0, chapter - 1))} disabled={chapter === 0} className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-3xl font-black disabled:opacity-30 flex items-center justify-center hover:bg-slate-200 transition-all"><ArrowLeft size={24}/></button>
                        <button onClick={() => setChapter(Math.min(SKELETON_STORY.length - 1, chapter + 1))} disabled={chapter === SKELETON_STORY.length - 1} className="flex-[2.5] py-5 bg-blue-600 text-white rounded-3xl font-black shadow-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                            {language === Language.ENGLISH ? "Next" : "आगे"} <ArrowRight size={20}/>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- 3D LAB COMPONENT WITH PDF UPDATES ---
const Skeleton3DLab = ({ language }: Props) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [mode, setMode] = useState<'framework' | 'classification' | 'quiz'>('framework');
    const [highlight, setHighlight] = useState<'axial' | 'appendicular' | 'none'>('none');
    const [feedback, setFeedback] = useState<{msg: string, type: string} | null>(null);
    const [score, setScore] = useState(0);

    // Refs for 3D objects
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const groupRef = useRef<THREE.Group | null>(null);
    
    // Internal state for mouse tracking
    const mouseRef = useRef({ down: false, x: 0, y: 0 });

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        sceneRef.current = scene;
        scene.background = new THREE.Color(0xffffff);

        const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        cameraRef.current = camera;
        camera.position.set(0, 5, 15);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        rendererRef.current = renderer;
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        mountRef.current.appendChild(renderer.domElement);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7);
        dirLight.castShadow = true;
        scene.add(dirLight);

        const gridHelper = new THREE.GridHelper(50, 50, 0xeeeeee, 0xf9f9f9);
        scene.add(gridHelper);

        const group = new THREE.Group();
        groupRef.current = group;
        scene.add(group);

        // Interaction listeners
        const onMouseDown = (e: MouseEvent) => { 
            mouseRef.current.down = true; 
            mouseRef.current.x = e.clientX; 
            mouseRef.current.y = e.clientY; 
        };
        const onMouseUp = () => { mouseRef.current.down = false; };
        const onMouseMove = (e: MouseEvent) => {
            if (!mouseRef.current.down || !groupRef.current) return;
            const dx = e.clientX - mouseRef.current.x;
            const dy = e.clientY - mouseRef.current.y;
            groupRef.current.rotation.y += dx * 0.01;
            groupRef.current.rotation.x += dy * 0.01;
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        mountRef.current.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('mousemove', onMouseMove);

        let animId: number;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };
        animate();

        loadScene(mode);

        const handleResize = () => {
            if (!mountRef.current || !cameraRef.current || !rendererRef.current) return;
            cameraRef.current.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('mousemove', onMouseMove);
            cancelAnimationFrame(animId);
            if (rendererRef.current && mountRef.current) {
                mountRef.current.removeChild(rendererRef.current.domElement);
            }
        };
    }, []);

    useEffect(() => {
        loadScene(mode);
    }, [mode, highlight]);

    const clearObjects = () => {
        const group = groupRef.current;
        if (!group) return;
        while(group.children.length > 0){ 
            group.remove(group.children[0]); 
        }
    };

    const loadScene = (newMode: string) => {
        clearObjects();
        const group = groupRef.current;
        if (!group) return;

        const axialMat = new THREE.MeshStandardMaterial({ color: highlight === 'axial' ? 0x4f46e5 : 0xe2e8f0 });
        const appendMat = new THREE.MeshStandardMaterial({ color: highlight === 'appendicular' ? 0x10b981 : 0xe2e8f0 });
        const neutralMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0 });

        if (newMode === 'framework' || newMode === 'classification' || newMode === 'quiz') {
            // Simplified Skeletal Schematic
            // 1. Skull (Axial)
            const skull = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), highlight === 'axial' ? axialMat : neutralMat);
            skull.position.y = 5.5;
            group.add(skull);

            // 2. Spine (Axial)
            const spine = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 6, 16), highlight === 'axial' ? axialMat : neutralMat);
            spine.position.y = 2.5;
            group.add(spine);

            // 3. Ribcage (Axial)
            const ribs = new THREE.Mesh(new THREE.TorusGeometry(2, 0.1, 16, 100), highlight === 'axial' ? axialMat : neutralMat);
            ribs.rotation.x = Math.PI / 2;
            ribs.position.y = 4;
            group.add(ribs);

            // 4. Arms (Appendicular)
            const lArm = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 16), highlight === 'appendicular' ? appendMat : neutralMat);
            lArm.position.set(-2.5, 3.5, 0);
            lArm.rotation.z = Math.PI / 4;
            group.add(lArm);

            const rArm = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 4, 16), highlight === 'appendicular' ? appendMat : neutralMat);
            rArm.position.set(2.5, 3.5, 0);
            rArm.rotation.z = -Math.PI / 4;
            group.add(rArm);

            // 5. Legs (Appendicular)
            const lLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.2, 5, 16), highlight === 'appendicular' ? appendMat : neutralMat);
            lLeg.position.set(-1, -2, 0);
            group.add(lLeg);

            const rLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.2, 5, 16), highlight === 'appendicular' ? appendMat : neutralMat);
            rLeg.position.set(1, -2, 0);
            group.add(rLeg);

            // 6. Pelvis (Appendicular)
            const pelvis = new THREE.Mesh(new THREE.TorusGeometry(1.2, 0.4, 16, 100), highlight === 'appendicular' ? appendMat : neutralMat);
            pelvis.rotation.x = Math.PI / 2;
            pelvis.position.y = 0;
            group.add(pelvis);
        }
    };

    const showFeedback = (msg: string, type: string) => {
        setFeedback({ msg, type });
        setTimeout(() => setFeedback(null), 3000);
    };

    const handleQuizAnswer = (correct: boolean) => {
        if (correct) {
            setScore(s => s + 10);
            showFeedback(language === Language.ENGLISH ? "Correct! 206 is total, 80 is Axial." : "सही! कुल 206 हैं, अक्षीय 80 हैं।", "success");
        } else {
            showFeedback(language === Language.ENGLISH ? "Oops! Remember 80 (Axial) + 126 (Appendicular)." : "गलत! 80 (अक्षीय) + 126 (उपांगीय) याद रखें।", "error");
        }
    };

    return (
        <div className="h-full flex flex-col relative bg-white min-h-[400px]">
            <div ref={mountRef} className="absolute inset-0 z-0 cursor-move" />

            <div className="absolute top-6 left-6 z-10 flex flex-col gap-4 pointer-events-none w-full max-w-[280px] sm:max-w-xs">
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-[24px] border border-slate-200 shadow-xl pointer-events-auto">
                    <h3 className="text-blue-600 font-black uppercase text-xs mb-2 flex items-center gap-2">
                        {mode === 'framework' ? <Shield size={16}/> : mode === 'classification' ? <Layers size={16}/> : <Trophy size={16}/>}
                        {mode === 'framework' ? "Support & Protection" : mode === 'classification' ? "Classification Lab" : "PDF Fact Quiz"}
                    </h3>
                    <p className="text-slate-600 text-[10px] font-bold leading-relaxed">
                        {mode === 'framework' ? "Tap highlight below to see the central protection vs movement framework." : 
                         mode === 'classification' ? "The PDF classifies 206 bones into 80 Axial and 126 Appendicular bones." : 
                         "Test your knowledge of bone counts and PDF data points."}
                    </p>
                </div>

                {feedback && (
                    <div className={`p-4 rounded-2xl border-2 animate-bounce shadow-xl backdrop-blur-md pointer-events-auto flex items-center gap-2 font-black text-[10px] uppercase ${feedback.type === 'error' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-green-50 border-green-500 text-green-700'}`}>
                        {feedback.type === 'error' ? <AlertCircle size={18}/> : <CheckCircle size={18}/>}
                        {feedback.msg}
                    </div>
                )}
            </div>

            <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-4 px-4">
                <div className="flex bg-slate-100 p-1.5 rounded-[24px] border border-slate-200 shadow-2xl overflow-x-auto no-scrollbar max-w-full">
                    <button onClick={() => setMode('framework')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${mode === 'framework' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}>1. Anatomy Explorer</button>
                    <button onClick={() => setMode('classification')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${mode === 'classification' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'}`}>2. Axial vs Append</button>
                    <button onClick={() => setMode('quiz')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${mode === 'quiz' ? 'bg-white text-purple-600 shadow-md' : 'text-slate-500'}`}>3. Exam Quiz</button>
                </div>

                <div className="flex gap-4 pointer-events-auto w-full justify-center">
                    {mode !== 'quiz' && (
                        <div className="flex gap-2">
                            <button onClick={() => setHighlight('axial')} className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase border-2 transition-all ${highlight === 'axial' ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}>Axial (80)</button>
                            <button onClick={() => setHighlight('appendicular')} className={`px-6 py-3 rounded-2xl font-black text-[10px] uppercase border-2 transition-all ${highlight === 'appendicular' ? 'bg-emerald-600 border-emerald-400 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}>Appendicular (126)</button>
                            <button onClick={() => setHighlight('none')} className="p-3 bg-white text-slate-400 border border-slate-200 rounded-2xl hover:text-red-500 transition-all"><RotateCcw size={16}/></button>
                        </div>
                    )}
                    {mode === 'quiz' && (
                        <div className="bg-white/90 backdrop-blur-md p-6 rounded-[32px] border border-slate-200 shadow-2xl flex flex-col items-center gap-4 w-full max-w-sm">
                            <div className="text-xs font-black text-slate-800 text-center">Q: How many bones form the AXIAL skeleton in adults?</div>
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <button onClick={() => handleQuizAnswer(false)} className="px-4 py-3 bg-slate-100 rounded-xl font-bold text-[10px] hover:bg-slate-200 transition-colors uppercase">126 Bones</button>
                                <button onClick={() => handleQuizAnswer(true)} className="px-4 py-3 bg-blue-600 text-white rounded-xl font-bold text-[10px] hover:bg-blue-700 transition-colors uppercase shadow-md">80 Bones</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute top-6 right-6 pointer-events-none hidden sm:block">
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-slate-200 text-slate-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <RotateCcw size={12}/> Drag to Rotate Schematic
                </div>
            </div>
        </div>
    );
};

export default SkeletonModule;
