
import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { 
  BookOpen, FlaskConical, ArrowRight, ArrowLeft, Accessibility, 
  CheckCircle, RotateCcw, Info, Zap, ShieldCheck, AlertCircle, 
  Trophy, Box, Activity, Microscope, Droplets
} from 'lucide-react';
import { Language } from '../../types';

interface Props {
  language: Language;
}

// --- TOP-LEVEL STORY CONTENT WITH SSC TRICKS & MISSING JOINT DATA ---
const SKELETON_STORY = [
  {
    id: 1,
    title: { en: "The Grand Blueprint: The Framework", hi: "महान ब्लूप्रिंट: शरीर का ढाँचा" },
    text: {
        en: "In Aarti Mam's biology class, Riya looked at a robot that couldn't stand. Mam explained: 'Just as a skyscraper needs a steel frame, our body needs the Skeletal System. It is the Central Framework. It provides support, protects vital organs, and acts as a factory for blood cells.'",
        hi: "आरती मैम की कक्षा में, रिया ने एक रोबोट देखा जो खड़ा नहीं हो पा रहा था। मैम ने समझाया: 'जैसे एक ऊंची इमारत को स्टील के ढांचे की जरूरत होती है, वैसे ही हमारे शरीर को कंकाल प्रणाली की जरूरत होती है। यह हमारा केंद्रीय ढाँचा (Central Framework) है। यह सहारा देता है, अंगों की रक्षा करता है, और रक्त कोशिकाओं के लिए एक कारखाने के रूप में कार्य करता है।'"
    },
    facts: [
        { label: { en: "Study of Bones", hi: "हड्डियों का अध्ययन" }, val: "Osteology" },
        { label: { en: "Bone Count", hi: "हड्डियों की संख्या" }, val: "206 (Adult), 300+ (Baby)" }
    ],
    visual: 'robot'
  },
  {
    id: 2,
    title: { en: "The Connectors: BLB & MTB", hi: "संयोजक: BLB और MTB ट्रिक" },
    text: {
        en: "'Bones don't just float!' Mam said. 'Ligaments (BLB) tie Bone-to-Bone. Tendons (MTB) tie Muscle-to-Bone. And Cartilage is the soft padding that prevents rubbing. These are the building blocks of every joint.'",
        hi: "'हड्डियाँ बस तैरती नहीं हैं!' मैम ने कहा। 'स्नायुबंधन (BLB) हड्डी-से-हड्डी को बांधते हैं। टेंडन (MTB) मांसपेशी-को-हड्डी से जोड़ते हैं। और उपास्थि (Cartilage) वह नरम गद्दी है जो रगड़ को रोकती है। ये हर जोड़ के निर्माण खंड हैं।'"
    },
    facts: [
        { label: { en: "BLB Trick", hi: "BLB ट्रिक" }, val: "Bone - Ligament - Bone" },
        { label: { en: "MTB Trick", hi: "MTB ट्रिक" }, val: "Muscle - Tendon - Bone" }
    ],
    visual: 'connectors'
  },
  {
    id: 3,
    title: { en: "The Pivot Points: Joints", hi: "धुरी बिंदु: जोड़ (Joints)" },
    text: {
        en: "'What is a joint?' Riya asked. 'A joint (Arthrology) is the point where two or more bones meet,' Aarti Mam replied. Joints allow us to move. Without them, we would be stiff like a statue! There are fixed joints (skull) and mobile joints (limbs).'",
        hi: "'जोड़ क्या है?' रिया ने पूछा। 'संधि या जोड़ (Arthrology) वह बिंदु है जहाँ दो या दो से अधिक हड्डियाँ मिलती हैं,' आरती मैम ने उत्तर दिया। जोड़ हमें हिलने-डुलने की अनुमति देते हैं। उनके बिना, हम एक मूर्ति की तरह अकड़ जाते! कुछ जोड़ स्थिर होते हैं (खोपड़ी) और कुछ गतिशील (अंग)।'"
    },
    facts: [
        { label: { en: "Study of Joints", hi: "जोड़ों का अध्ययन" }, val: "Arthrology" },
        { label: { en: "Fixed Joint", hi: "अचल संधि" }, val: { en: "Sutures of Skull", hi: "खोपड़ी की सीवन" } }
    ],
    visual: 'joints'
  },
  {
    id: 4,
    title: { en: "Synovial Joints: The Smooth Secret", hi: "सिनोवियल जोड़: चिकनाई का रहस्य" },
    text: {
        en: "'Most mobile joints are Synovial Joints,' Mam explained. 'They have a Synovial Membrane that secretes Synovial Fluid. This fluid acts like machine oil (Lubricant), making movements smooth and friction-free.'",
        hi: "'ज्यादातर गतिशील जोड़ सिनोवियल जोड़ होते हैं,' मैम ने समझाया। 'उनमें एक सिनोवियल झिल्ली होती है जो सिनोवियल द्रव (Synovial Fluid) निकालती है। यह द्रव मशीन के तेल (लुब्रिकेंट) की तरह काम करता है, जिससे गतिविधियां चिकनी और घर्षण रहित होती हैं।'"
    },
    facts: [
        { label: { en: "Synovial Fluid", hi: "सिनोवियल द्रव" }, val: { en: "Biological Lubricant", hi: "जैविक स्नेहक" } },
        { label: { en: "Degeneration", hi: "क्षय" }, val: { en: "Leads to Arthritis", hi: "गठिया (Arthritis) का कारण" } }
    ],
    visual: 'synovial'
  },
  {
    id: 5,
    title: { en: "Types of Movement", hi: "गति के प्रकार" },
    text: {
        en: "'Every joint has a role,' Mam continued. 'Ball and Socket (Shoulder) gives 360° motion. Hinge joint (Elbow/Knee) is like a door. Pivot joint (Neck) lets you say No by rotating. Every movement is a masterpiece of biology!'",
        hi: "'हर जोड़ की एक भूमिका होती है,' मैम ने आगे कहा। 'बॉल और सॉकेट (कंधा) 360° गति देता है। हिंज जोड़ (कोहनी/घुटना) दरवाजे की तरह होता है। पिवट जोड़ (गर्दन) आपको गर्दन घुमाकर नहीं कहने देता है। हर गति जीव विज्ञान का एक उत्कृष्ट नमूना है!'"
    },
    facts: [
        { label: { en: "Ball & Socket", hi: "कंदुक-खल्लिका" }, val: { en: "Shoulder & Hip", hi: "कंधा और कूल्हा" } },
        { label: { en: "Hinge Joint", hi: "कब्जा संधि" }, val: { en: "Knee & Elbow", hi: "घुटना और कोहनी" } }
    ],
    visual: 'types'
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
                {language === Language.ENGLISH ? "Bones, Joints & Lubrication" : "हड्डियाँ, जोड़ और चिकनाई"}
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
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-red-50 rounded-[40px] shadow-xl flex items-center justify-center text-5xl border-b-8 border-red-500 relative group-hover:rotate-12 transition-transform">
                                    🤖
                                </div>
                                <div className="mt-4 font-black text-[10px] text-red-600 uppercase tracking-widest">Broken Bot</div>
                            </div>
                            <div className="text-center group">
                                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-blue-50 rounded-[40px] shadow-xl flex items-center justify-center text-5xl border-b-8 border-blue-500 relative">
                                    🦴
                                </div>
                                <div className="mt-4 font-black text-[10px] text-blue-600 uppercase tracking-widest">Human Framework</div>
                            </div>
                        </div>
                    </div>
                );
            case 'connectors':
                return (
                    <div className="flex flex-col items-center gap-6 animate-fade-in">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-10 bg-slate-100 rounded-xl border-2 border-slate-300 flex items-center justify-center font-black text-[10px]">BONE</div>
                            <div className="w-8 h-2 bg-orange-400 rounded-full animate-pulse"></div>
                            <div className="w-20 h-10 bg-slate-100 rounded-xl border-2 border-slate-300 flex items-center justify-center font-black text-[10px]">BONE</div>
                        </div>
                        <div className="bg-orange-600 text-white px-4 py-1 rounded-full font-black text-[10px] uppercase">BLB: Ligament</div>
                        <div className="flex items-center gap-4 mt-4">
                            <div className="w-20 h-10 bg-red-100 rounded-xl border-2 border-red-300 flex items-center justify-center font-black text-[10px]">MUSCLE</div>
                            <div className="w-8 h-2 bg-slate-400 rounded-full"></div>
                            <div className="w-20 h-10 bg-slate-100 rounded-xl border-2 border-slate-300 flex items-center justify-center font-black text-[10px]">BONE</div>
                        </div>
                        <div className="bg-slate-600 text-white px-4 py-1 rounded-full font-black text-[10px] uppercase">MTB: Tendon</div>
                    </div>
                );
            case 'joints':
                return (
                    <div className="flex flex-col items-center gap-8 animate-fade-in">
                        <div className="w-32 h-32 bg-indigo-50 rounded-full border-4 border-indigo-200 flex items-center justify-center relative overflow-hidden">
                             <div className="absolute inset-0 border-4 border-indigo-500 rounded-full border-t-transparent animate-spin-slow"></div>
                             <Accessibility size={64} className="text-indigo-600" />
                        </div>
                        <div className="bg-indigo-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase tracking-widest shadow-lg">Arthrology = Study of Joints</div>
                    </div>
                );
            case 'synovial':
                return (
                    <div className="flex flex-col items-center gap-6 animate-fade-in">
                        <div className="relative w-40 h-40 bg-white rounded-3xl border-4 border-blue-100 shadow-xl flex items-center justify-center">
                            <Droplets size={64} className="text-blue-400 animate-bounce" />
                            <div className="absolute inset-0 bg-blue-50/50 rounded-2xl flex items-center justify-center">
                                <div className="w-32 h-32 border-4 border-blue-300 rounded-full border-dashed animate-pulse"></div>
                            </div>
                        </div>
                        <div className="bg-blue-600 text-white px-6 py-2 rounded-full font-black text-xs uppercase shadow-xl">Synovial Fluid (Lubricant)</div>
                    </div>
                );
            case 'types':
                return (
                    <div className="grid grid-cols-2 gap-4 animate-fade-in">
                         <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                             <div className="text-3xl mb-2">🔄</div>
                             <div className="font-black text-[10px] uppercase">Ball & Socket</div>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                             <div className="text-3xl mb-2">🚪</div>
                             <div className="font-black text-[10px] uppercase">Hinge Joint</div>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                             <div className="text-3xl mb-2">📍</div>
                             <div className="font-black text-[10px] uppercase">Pivot Joint</div>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                             <div className="text-3xl mb-2">滑</div>
                             <div className="font-black text-[10px] uppercase">Gliding Joint</div>
                         </div>
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

// --- 3D LAB COMPONENT ---
const Skeleton3DLab = ({ language }: Props) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [mode, setMode] = useState<'framework' | 'tissue' | 'quiz'>('framework');
    const [labState, setLabState] = useState({ cartilage: false, ligament: false, tendon: false, fluid: false });
    const [feedback, setFeedback] = useState<{msg: string, type: string} | null>(null);
    const [isMoving, setIsMoving] = useState(false);
    const [score, setScore] = useState(0);

    // Refs for 3D objects
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const frameworkPartsRef = useRef<{ mesh: THREE.Mesh, targetPos: THREE.Vector3, targetRot: THREE.Euler, startPos: THREE.Vector3 }[]>([]);
    const groupRef = useRef<THREE.Group | null>(null);
    
    // Components of the joint for Sim 2
    const cartilageMeshRef = useRef<THREE.Mesh | null>(null);
    const ligamentMeshRef = useRef<THREE.Mesh | null>(null);
    const tendonMeshRef = useRef<THREE.Mesh | null>(null);
    const fluidMeshRef = useRef<THREE.Mesh | null>(null);
    const lowerBoneRef = useRef<THREE.Mesh | null>(null);

    // Track mouse rotation
    const mouseRef = useRef({ down: false, x: 0, y: 0 });

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Init Scene ---
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

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7);
        dirLight.castShadow = true;
        scene.add(dirLight);

        // Floor / Grid
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

        // Animation loop
        let animId: number;
        const animate = () => {
            animId = requestAnimationFrame(animate);
            
            if (mode === 'tissue' && isMoving) {
                const time = Date.now() * 0.005;
                if (lowerBoneRef.current) {
                    const angle = Math.sin(time) * 0.6;
                    lowerBoneRef.current.rotation.x = angle;
                    if (tendonMeshRef.current) {
                        tendonMeshRef.current.scale.y = 1 + angle * 0.2;
                    }
                }
            }

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
    }, [mode]);

    useEffect(() => {
        if (cartilageMeshRef.current) cartilageMeshRef.current.visible = labState.cartilage;
        if (ligamentMeshRef.current) ligamentMeshRef.current.visible = labState.ligament;
        if (tendonMeshRef.current) tendonMeshRef.current.visible = labState.tendon;
        if (fluidMeshRef.current) fluidMeshRef.current.visible = labState.fluid;
    }, [labState]);

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

        if (newMode === 'framework') {
            frameworkPartsRef.current = [];
            for (let i = 0; i < 10; i++) {
                const geo = new THREE.CylinderGeometry(0.3, 0.3, 2, 16);
                const mat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9 });
                const bone = new THREE.Mesh(geo, mat);
                const startPos = new THREE.Vector3((Math.random() - 0.5) * 12, 1, (Math.random() - 0.5) * 8);
                bone.position.copy(startPos);
                bone.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                group.add(bone);
                
                const targetPos = new THREE.Vector3(0, i * 1 - 4, 0);
                const targetRot = new THREE.Euler(0, 0, 0);
                frameworkPartsRef.current.push({ mesh: bone, targetPos, targetRot, startPos });
            }
        } else if (newMode === 'tissue' || newMode === 'quiz') {
            const boneMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc });

            // Upper Bone
            const upperGeo = new THREE.CylinderGeometry(0.6, 0.6, 6, 20);
            const upperBone = new THREE.Mesh(upperGeo, boneMat);
            upperBone.position.y = 3.5;
            group.add(upperBone);

            // Lower Bone (Pivotable)
            const lowerGeo = new THREE.CylinderGeometry(0.6, 0.6, 6, 20);
            lowerGeo.translate(0, -3, 0); 
            const lowerBone = new THREE.Mesh(lowerGeo, boneMat);
            lowerBone.position.y = 0.5;
            lowerBoneRef.current = lowerBone;
            group.add(lowerBone);

            // 1. Cartilage (Shock Absorber)
            const cartGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.4, 20);
            const cartMat = new THREE.MeshPhongMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.8 });
            const cartilage = new THREE.Mesh(cartGeo, cartMat);
            cartilage.position.y = 0.5;
            cartilage.visible = labState.cartilage;
            cartilageMeshRef.current = cartilage;
            group.add(cartilage);

            // 2. Synovial Fluid (Bio-Lubricant)
            const fluidGeo = new THREE.CylinderGeometry(0.75, 0.75, 0.6, 20);
            const fluidMat = new THREE.MeshPhongMaterial({ color: 0x22d3ee, transparent: true, opacity: 0.3 });
            const fluid = new THREE.Mesh(fluidGeo, fluidMat);
            fluid.position.y = 0.5;
            fluid.visible = labState.fluid;
            fluidMeshRef.current = fluid;
            group.add(fluid);

            // 3. Ligament (Bone to Bone)
            const ligGeo = new THREE.TorusGeometry(0.8, 0.1, 16, 100);
            const ligMat = new THREE.MeshStandardMaterial({ color: 0xfb923c });
            const ligament = new THREE.Mesh(ligGeo, ligMat);
            ligament.rotation.x = Math.PI / 2;
            ligament.position.y = 0.5;
            ligament.visible = labState.ligament;
            ligamentMeshRef.current = ligament;
            group.add(ligament);

            // 4. Tendon (Muscle to Bone)
            const tendonGeo = new THREE.CylinderGeometry(0.15, 0.15, 6, 8);
            const tendonMat = new THREE.MeshStandardMaterial({ color: 0xef4444 });
            const tendon = new THREE.Mesh(tendonGeo, tendonMat);
            tendon.position.set(-0.8, 3, 0);
            tendon.visible = labState.tendon;
            tendonMeshRef.current = tendon;
            group.add(tendon);
        }
    };

    const assembleFramework = () => {
        let frame = 0;
        const animateAssemble = () => {
            frameworkPartsRef.current.forEach(part => {
                part.mesh.position.lerp(part.targetPos, 0.1);
                part.mesh.quaternion.slerp(new THREE.Quaternion().setFromEuler(part.targetRot), 0.1);
            });
            frame++;
            if (frame < 50) requestAnimationFrame(animateAssemble);
            else showFeedback("Stability Achieved! Central Framework Active.", "success");
        };
        animateAssemble();
    };

    const resetFramework = () => {
        frameworkPartsRef.current.forEach(part => {
            part.mesh.position.copy(part.startPos);
            part.mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        });
        if(groupRef.current) {
            groupRef.current.rotation.set(0, 0, 0);
        }
        setFeedback(null);
    };

    const testMovement = () => {
        if (isMoving) return;
        if (!labState.cartilage || !labState.fluid) {
            showFeedback("WARNING: Joint Friction! Missing Cartilage or Synovial Fluid.", "error");
            return;
        }
        setIsMoving(true);
        setTimeout(() => setIsMoving(false), 3000);
    };

    const showFeedback = (msg: string, type: string) => {
        setFeedback({ msg, type });
        if (type === 'success') setTimeout(() => setFeedback(null), 3000);
    };

    const handleQuizAnswer = (correct: boolean) => {
        if (correct) {
            setScore(s => s + 10);
            showFeedback("Correct! You remembered the Joint Secrets!", "success");
        } else {
            showFeedback("Oops! Remember Synovial Fluid vs BLB/MTB.", "error");
        }
    };

    return (
        <div className="h-full flex flex-col relative bg-white min-h-[400px]">
            {/* 3D Container */}
            <div ref={mountRef} className="absolute inset-0 z-0 cursor-move" />

            {/* Overlays */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-4 pointer-events-none w-full max-w-[280px] sm:max-w-xs">
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-[24px] border border-slate-200 shadow-xl pointer-events-auto">
                    <h3 className="text-blue-600 font-black uppercase text-xs mb-2 flex items-center gap-2">
                        {mode === 'framework' ? <Box size={16}/> : mode === 'tissue' ? <Activity size={16}/> : <Trophy size={16}/>}
                        {mode === 'framework' ? "Stability Lab" : mode === 'tissue' ? "Joint Biomechanics" : "Arthrology Quiz"}
                    </h3>
                    <p className="text-slate-600 text-[10px] font-bold leading-relaxed">
                        {mode === 'framework' ? "Isolated bones cannot stand. Assemble the central spine to gain architectural stability." : 
                         mode === 'tissue' ? "Activate synovial fluid and cartilage to reduce friction during movement." : 
                         "Test your knowledge of the Bone-Connective-Muscle system and synovial joints."}
                    </p>
                </div>

                {feedback && (
                    <div className={`p-4 rounded-2xl border-2 animate-bounce shadow-xl backdrop-blur-md pointer-events-auto flex items-center gap-2 font-black text-[10px] uppercase ${feedback.type === 'error' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-green-50 border-green-500 text-green-700'}`}>
                        {feedback.type === 'error' ? <AlertCircle size={18}/> : <CheckCircle size={18}/>}
                        {feedback.msg}
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-4 px-4">
                <div className="flex bg-slate-100 p-1.5 rounded-[24px] border border-slate-200 shadow-2xl overflow-x-auto no-scrollbar max-w-full">
                    <button onClick={() => setMode('framework')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${mode === 'framework' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}>1. Framework</button>
                    <button onClick={() => setMode('tissue')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${mode === 'tissue' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'}`}>2. Joint Components</button>
                    <button onClick={() => setMode('quiz')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${mode === 'quiz' ? 'bg-white text-purple-600 shadow-md' : 'text-slate-500'}`}>3. Exam Quiz</button>
                </div>

                <div className="flex gap-4 pointer-events-auto w-full justify-center">
                    {mode === 'framework' && (
                        <div className="flex gap-2">
                            <button onClick={assembleFramework} className="px-8 py-4 bg-blue-600 text-white rounded-full font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3 text-xs tracking-widest uppercase">
                               <Accessibility size={20}/> Build Spine
                            </button>
                            <button onClick={resetFramework} className="p-4 bg-white text-slate-400 border border-slate-200 rounded-full shadow-lg hover:text-blue-600 transition-all"><RotateCcw size={20}/></button>
                        </div>
                    )}
                    {mode === 'tissue' && (
                        <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                            <button 
                                onClick={() => setLabState(p => ({...p, cartilage: !p.cartilage}))}
                                className={`px-4 py-3 rounded-2xl font-black text-[10px] uppercase border-2 transition-all ${labState.cartilage ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}
                            >Cartilage</button>
                            <button 
                                onClick={() => setLabState(p => ({...p, fluid: !p.fluid}))}
                                className={`px-4 py-3 rounded-2xl font-black text-[10px] uppercase border-2 transition-all ${labState.fluid ? 'bg-cyan-500 border-cyan-400 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}
                            >Synovial Fluid</button>
                            <button 
                                onClick={() => setLabState(p => ({...p, ligament: !p.ligament}))}
                                className={`px-4 py-3 rounded-2xl font-black text-[10px] uppercase border-2 transition-all ${labState.ligament ? 'bg-orange-600 border-orange-400 text-white shadow-lg' : 'bg-white border-slate-200 text-slate-400'}`}
                            >Ligament (BLB)</button>
                            <button onClick={testMovement} className={`px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] shadow-xl hover:bg-black transition-all ${isMoving ? 'opacity-50' : 'animate-pulse'}`}>
                                {isMoving ? "ROTATING..." : "TEST MOVEMENT"}
                            </button>
                        </div>
                    )}
                    {mode === 'quiz' && (
                        <div className="bg-white/90 backdrop-blur-md p-6 rounded-[32px] border border-slate-200 shadow-2xl flex flex-col items-center gap-4 w-full max-w-sm">
                            <div className="text-xs font-black text-slate-800 text-center">Q: Which fluid acts as a lubricant in mobile joints?</div>
                            <div className="grid grid-cols-2 gap-2 w-full">
                                <button onClick={() => handleQuizAnswer(false)} className="px-4 py-3 bg-slate-100 rounded-xl font-bold text-[10px] hover:bg-slate-200 transition-colors uppercase">Plasma Fluid</button>
                                <button onClick={() => handleQuizAnswer(true)} className="px-4 py-3 bg-blue-600 text-white rounded-xl font-bold text-[10px] hover:bg-blue-700 transition-colors uppercase shadow-md">Synovial Fluid</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className="absolute top-6 right-6 pointer-events-none hidden sm:block">
                <div className="bg-white/60 backdrop-blur-sm p-3 rounded-2xl border border-slate-200 text-slate-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <RotateCcw size={12}/> Drag to Rotate &bull; Scroll to Zoom
                </div>
            </div>
        </div>
    );
};

export default SkeletonModule;
