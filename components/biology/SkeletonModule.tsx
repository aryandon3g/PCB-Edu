import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'https://esm.sh/three@0.174.0';
import { BookOpen, FlaskConical, ArrowRight, ArrowLeft, Accessibility, Microscope, CheckCircle, RotateCcw, Info, User, HelpCircle, Zap, ShieldCheck, AlertCircle, Trophy } from 'lucide-react';
import { Language } from '../../types';
import { TRANSLATIONS } from '../../constants';

interface Props {
  language: Language;
}

// --- STORY CONTENT BASED ON USER PROMPT ---
const SKELETON_STORY = [
  {
    id: 1,
    title: { en: "The Framework of Life", hi: "ढाँचा जो हमें खड़ा रखता है" },
    text: {
        en: "Morning in Aarti Mam's class. Riya brought a broken robot model. 'Mam, why does it keep falling?' Riya asked. Mam smiled, 'Riya, it has everything, but its Central Framework is missing! Just like our body needs a Skeletal System to stand, sit, and walk.'",
        hi: "आरती मैम की कक्षा में रिया एक टूटा हुआ रोबोट मॉडल लेकर आई। 'मैम, यह गिर क्यों रहा है?' रिया ने पूछा। मैम मुस्कुराईं, 'रिया, इसमें सब है, पर इसका केंद्रीय ढाँचा (Framework) नहीं है! ठीक वैसे ही जैसे हमारे शरीर को खड़े होने के लिए कंकाल प्रणाली की ज़रूरत होती है।'"
    },
    facts: [
        { label: { en: "Definition", hi: "परिभाषा" }, val: { en: "Central Framework of the body", hi: "शरीर का केंद्रीय ढाँचा" } },
        { label: { en: "Function", hi: "कार्य" }, val: { en: "Provides Stability & Support", hi: "स्थिरता और सहारा प्रदान करता है" } }
    ],
    visual: 'robot'
  },
  {
    id: 2,
    title: { en: "The Pillars of the Body", hi: "शरीर के मुख्य स्तंभ" },
    text: {
        en: "Mam explained on the board, 'The skeleton isn't just bones. It's an engineering marvel made of Bones and Connective Tissues. Bones are the main pillars, but we need specialized tissues to connect and protect them.'",
        hi: "मैम ने बोर्ड पर समझाया, 'कंकाल सिर्फ हड्डियों से नहीं बना है। यह हड्डियों और संयोजी ऊतकों (Connective Tissues) से बना एक इंजीनियरिंग चमत्कार है। हड्डियाँ मुख्य स्तंभ हैं, लेकिन उन्हें जोड़ने और बचाने के लिए विशेष ऊतकों की आवश्यकता होती है।'"
    },
    facts: [
        { label: { en: "Bones", hi: "हड्डियाँ" }, val: { en: "Main structural pillars", hi: "मुख्य संरचनात्मक स्तंभ" } },
        { label: { en: "System", hi: "प्रणाली" }, val: { en: "Musculoskeletal System", hi: "मस्कुलोस्केलेटल सिस्टम" } }
    ],
    visual: 'bones'
  },
  {
    id: 3,
    title: { en: "Soft Padding: Cartilage", hi: "नरम गद्दी: उपास्थि (Cartilage)" },
    text: {
        en: "'Touch your nose or ear,' Mam said. 'They are softer than bones! This is Cartilage. It sits at the ends of bones acting as a shock absorber to prevent bones from rubbing against each other.'",
        hi: "मैम ने कहा, 'अपनी नाक या कान को छूकर देखो। ये हड्डियों से थोड़े नरम हैं! यह उपास्थि (Cartilage) है। यह अक्सर हड्डियों के सिरों पर होती है और उन्हें रगड़ खाने से बचाती है (शॉक अब्ज़ॉर्बर)।'"
    },
    facts: [
        { label: { en: "Cartilage", hi: "उपास्थि" }, val: { en: "Soft padding / Shock absorber", hi: "नरम गद्दी / शॉक अब्ज़ॉर्बर" } },
        { label: { en: "Location", hi: "स्थान" }, val: { en: "Nose, Ears, Joint Ends", hi: "नाक, कान, जोड़ों के सिरे" } }
    ],
    visual: 'cartilage'
  },
  {
    id: 4,
    title: { en: "The Movement Tie: Tendons", hi: "गति का बंधन: टेंडन (Tendons)" },
    text: {
        en: "Mam clenched her fist. 'How do muscles pull bones? Through Tendons! They connect muscles to bones, allowing us to move things. It's like a strong string pulling a lever.'",
        hi: "मैम ने अपनी मुट्ठी बाँध ली। 'मांसपेशियां हड्डियों को कैसे खींचती हैं? टेंडन (Tendons) के माध्यम से! टेंडन मांसपेशियों को हड्डियों से जोड़ते हैं, जिससे हम चीज़ों को खींच पाते हैं।'"
    },
    facts: [
        { label: { en: "Tendon", hi: "टेंडन" }, val: { en: "Connects Muscle to Bone", hi: "मांसपेशी को हड्डी से जोड़ता है" } },
        { label: { en: "Purpose", hi: "उद्देश्य" }, val: { en: "Enables movement by pulling", hi: "खिंचाव द्वारा गति सक्षम करना" } }
    ],
    visual: 'tendons'
  },
  {
    id: 5,
    title: { en: "Bone-to-Bone: Ligaments", hi: "हड्डी-से-हड्डी: स्नायुबंधन (Ligaments)" },
    text: {
        en: "'When you run or jump, what holds two bones together?' Mam asked. 'Ligaments! They act like strong rubber bands holding joints in place so bones don't fly apart during activity.'",
        hi: "मैम ने पूछा, 'जब तुम दौड़ती हो या कूदती हो, तो दो हड्डियों को एक साथ कौन कसकर पकड़ता है? स्नायुबंधन (Ligaments)! ये रबर बैंड की तरह एक हड्डी को दूसरी हड्डी से बाँधते हैं।'"
    },
    facts: [
        { label: { en: "Ligament", hi: "लिगामेंट" }, val: { en: "Connects Bone to Bone", hi: "हड्डी को हड्डी से जोड़ता है" } },
        { label: { en: "Role", hi: "भूमिका" }, val: { en: "Joint stability and alignment", hi: "जोड़ों की स्थिरता और संरेखण" } }
    ],
    visual: 'ligaments'
  }
];

const SkeletonModule: React.FC<Props> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'story' | 'lab'>('story');
  const [chapter, setChapter] = useState(0);

  return (
    <div className="flex flex-col h-full bg-white gap-4 overflow-hidden border border-slate-200 rounded-[32px] shadow-sm">
      {/* Header */}
      <div className="bg-slate-50 p-4 rounded-t-[32px] border-b border-slate-200 flex justify-between items-center flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="bg-blue-600 p-3 rounded-2xl shadow-lg">
             <Accessibility className="text-white" size={28} />
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight leading-none text-slate-900 uppercase">Skeleton Lab</h1>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">
                {language === Language.ENGLISH ? "Framework & Connective Tissues" : "ढाँचा और संयोजी ऊतक"}
            </p>
          </div>
        </div>
        
        <div className="flex bg-slate-200 p-1 rounded-2xl">
           <button 
             onClick={() => setActiveTab('story')} 
             className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all uppercase tracking-widest ${activeTab === 'story' ? 'bg-white text-blue-700 shadow-md scale-105' : 'text-slate-500 hover:text-slate-800'}`}
           >
              <BookOpen size={16} /> {language === Language.ENGLISH ? "Story" : "कहानी"}
           </button>
           <button 
             onClick={() => setActiveTab('lab')} 
             className={`px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 transition-all uppercase tracking-widest ${activeTab === 'lab' ? 'bg-white text-indigo-700 shadow-md scale-105' : 'text-slate-500 hover:text-slate-800'}`}
           >
              <FlaskConical size={16} /> {language === Language.ENGLISH ? "3D Lab" : "3D लैब"}
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
                    <div className="flex flex-col items-center gap-8 animate-fade-in h-full justify-center">
                        <div className="flex gap-12">
                            <div className="text-center group">
                                <div className="w-28 h-28 bg-red-50 rounded-[40px] shadow-xl flex items-center justify-center text-5xl border-b-8 border-red-500 relative group-hover:rotate-12 transition-transform">
                                    🤖
                                    <div className="absolute top-2 right-2 text-xs">⚠️</div>
                                </div>
                                <div className="mt-4 font-black text-[10px] text-red-600 uppercase tracking-widest">Broken Model</div>
                            </div>
                            <div className="text-center group">
                                <div className="w-28 h-28 bg-blue-50 rounded-[40px] shadow-xl flex items-center justify-center text-5xl border-b-8 border-blue-500 relative">
                                    🦴
                                </div>
                                <div className="mt-4 font-black text-[10px] text-blue-600 uppercase tracking-widest">The Framework</div>
                            </div>
                        </div>
                    </div>
                );
            case 'bones':
                return (
                    <div className="flex flex-col items-center gap-6 h-full justify-center animate-fade-in">
                        <div className="relative w-48 h-64 bg-slate-50 rounded-full border-4 border-slate-200 flex items-center justify-center">
                            <Accessibility size={80} className="text-slate-800 opacity-20" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                                <div className="w-24 h-4 bg-slate-300 rounded-full animate-pulse"></div>
                                <div className="w-32 h-4 bg-slate-300 rounded-full animate-pulse delay-75"></div>
                                <div className="w-28 h-4 bg-slate-300 rounded-full animate-pulse delay-150"></div>
                            </div>
                        </div>
                        <div className="text-center font-black text-slate-400 text-[10px] uppercase tracking-widest">Main Pillars: Bones</div>
                    </div>
                );
            case 'cartilage':
                return (
                    <div className="flex flex-col items-center gap-6 h-full justify-center animate-fade-in">
                        <div className="flex gap-6">
                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex flex-col items-center justify-center shadow-lg border border-blue-200">
                                <div className="text-3xl">👂</div>
                                <span className="text-[8px] font-black text-blue-800 mt-1 uppercase">Ear</span>
                            </div>
                            <div className="w-20 h-20 bg-blue-50 rounded-2xl flex flex-col items-center justify-center shadow-lg border border-blue-200">
                                <div className="text-3xl">👃</div>
                                <span className="text-[8px] font-black text-blue-800 mt-1 uppercase">Nose</span>
                            </div>
                        </div>
                        <div className="w-48 h-12 bg-white rounded-full border-4 border-blue-200 flex items-center justify-center px-4 shadow-md">
                            <div className="w-4 h-4 bg-blue-400 rounded-full animate-ping"></div>
                            <span className="ml-3 font-black text-blue-900 text-[10px] uppercase">Soft Shock Absorber</span>
                        </div>
                    </div>
                );
            case 'tendons':
                return (
                    <div className="flex flex-col items-center gap-6 h-full justify-center animate-fade-in">
                        <div className="flex flex-col items-center">
                            <div className="w-16 h-16 bg-red-100 rounded-xl flex items-center justify-center text-red-600 shadow-sm border border-red-200">
                                <Zap size={32} />
                            </div>
                            <div className="w-1 h-12 bg-slate-300 relative">
                                <div className="absolute top-0 bottom-0 w-full bg-red-400 animate-height-fill"></div>
                            </div>
                            <div className="w-16 h-8 bg-slate-200 rounded-lg flex items-center justify-center font-black text-[10px] text-slate-600 border border-slate-300">BONE</div>
                        </div>
                        <div className="font-black text-red-600 text-[10px] uppercase tracking-widest">Tendon: Muscle to Bone</div>
                    </div>
                );
            case 'ligaments':
                return (
                    <div className="flex flex-col items-center gap-6 h-full justify-center animate-fade-in">
                        <div className="flex items-center gap-1">
                            <div className="w-16 h-24 bg-slate-100 rounded-lg flex items-center justify-center font-black text-[10px] text-slate-500 border border-slate-200 shadow-sm">BONE 1</div>
                            <div className="w-12 h-4 bg-orange-400 rounded-full border-2 border-orange-600 animate-pulse"></div>
                            <div className="w-16 h-24 bg-slate-100 rounded-lg flex items-center justify-center font-black text-[10px] text-slate-500 border border-slate-200 shadow-sm">BONE 2</div>
                        </div>
                        <div className="font-black text-orange-600 text-[10px] uppercase tracking-widest">Ligament: Bone to Bone</div>
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
                        <span className="w-10 h-10 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center text-sm font-black">{chapter+1}</span>
                        {language === Language.ENGLISH ? data.title.en : data.title.hi}
                    </h2>
                    
                    <div className="bg-blue-50/50 p-6 rounded-[32px] mb-6 border border-blue-100 flex-1 overflow-y-auto">
                        <p className="text-slate-700 leading-relaxed text-base font-medium italic">
                            "{language === Language.ENGLISH ? data.text.en : data.text.hi}"
                        </p>
                    </div>

                    <div className="space-y-2 mb-8">
                        {data.facts.map((f:any, idx:number) => (
                           <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{language === Language.ENGLISH ? f.label.en : f.label.hi}</span>
                               <span className="text-xs font-black text-blue-600">{typeof f.val === 'string' ? f.val : (language === Language.ENGLISH ? f.val.en : f.val.hi)}</span>
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
    const [labState, setLabState] = useState({ cartilage: false, ligament: false, tendon: false });
    const [feedback, setFeedback] = useState<{msg: string, type: string} | null>(null);
    const [isMoving, setIsMoving] = useState(false);
    const [score, setScore] = useState(0);

    // Refs for 3D objects
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const currentObjectsRef = useRef<THREE.Object3D[]>([]);
    const frameworkPartsRef = useRef<{ mesh: THREE.Mesh, targetPos: THREE.Vector3, targetRot: THREE.Euler }[]>([]);
    
    // Components of the joint for Sim 2
    const jointRef = useRef<THREE.Group | null>(null);
    const cartilageMeshRef = useRef<THREE.Mesh | null>(null);
    const ligamentMeshRef = useRef<THREE.Mesh | null>(null);
    const tendonMeshRef = useRef<THREE.Mesh | null>(null);
    const lowerBoneRef = useRef<THREE.Mesh | null>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Init Scene ---
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        scene.background = new THREE.Color(0xffffff); // White Background as requested

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
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
        scene.add(ambientLight);
        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(5, 10, 7);
        dirLight.castShadow = true;
        scene.add(dirLight);

        // Ground Grid (Subtle)
        const gridHelper = new THREE.GridHelper(50, 50, 0xeeeeee, 0xf9f9f9);
        scene.add(gridHelper);

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
    }, [labState]);

    const clearObjects = () => {
        const scene = sceneRef.current;
        if (!scene) return;
        currentObjectsRef.current.forEach(obj => scene.remove(obj));
        currentObjectsRef.current = [];
    };

    const loadScene = (newMode: string) => {
        clearObjects();
        const scene = sceneRef.current;
        if (!scene) return;

        if (newMode === 'framework') {
            frameworkPartsRef.current = [];
            // Create "scattered" bones
            for (let i = 0; i < 8; i++) {
                const geo = new THREE.CylinderGeometry(0.2, 0.2, 3, 16);
                const mat = new THREE.MeshStandardMaterial({ color: 0xe5e7eb });
                const bone = new THREE.Mesh(geo, mat);
                bone.position.set((Math.random() - 0.5) * 10, 1, (Math.random() - 0.5) * 10);
                bone.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
                scene.add(bone);
                currentObjectsRef.current.push(bone);
                
                // Target: A stable "Spine" column
                const targetPos = new THREE.Vector3(0, i * 0.8 + 1, 0);
                const targetRot = new THREE.Euler(0, 0, 0);
                frameworkPartsRef.current.push({ mesh: bone, targetPos, targetRot });
            }
        } else if (newMode === 'tissue' || newMode === 'quiz') {
            const group = new THREE.Group();
            
            // Upper Bone
            const upperGeo = new THREE.CylinderGeometry(0.5, 0.5, 5, 16);
            const boneMat = new THREE.MeshStandardMaterial({ color: 0xf3f4f6 });
            const upperBone = new THREE.Mesh(upperGeo, boneMat);
            upperBone.position.y = 3;
            group.add(upperBone);

            // Lower Bone (Pivotable)
            const lowerGeo = new THREE.CylinderGeometry(0.5, 0.5, 5, 16);
            lowerGeo.translate(0, -2.5, 0); // Move pivot to top of lower bone
            const lowerBone = new THREE.Mesh(lowerGeo, boneMat);
            lowerBone.position.y = 0.5;
            lowerBoneRef.current = lowerBone;
            group.add(lowerBone);

            // 1. Cartilage (Shock Absorber)
            const cartGeo = new THREE.CylinderGeometry(0.55, 0.55, 0.4, 16);
            const cartMat = new THREE.MeshPhongMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.7 });
            const cartilage = new THREE.Mesh(cartGeo, cartMat);
            cartilage.position.y = 0.5;
            cartilage.visible = labState.cartilage;
            cartilageMeshRef.current = cartilage;
            group.add(cartilage);

            // 2. Ligament (Bone to Bone)
            const ligGeo = new THREE.BoxGeometry(0.2, 2, 0.1);
            const ligMat = new THREE.MeshStandardMaterial({ color: 0xfb923c });
            const ligament = new THREE.Mesh(ligGeo, ligMat);
            ligament.position.set(0.6, 0.5, 0);
            ligament.visible = labState.ligament;
            ligamentMeshRef.current = ligament;
            group.add(ligament);

            // 3. Tendon (Muscle to Bone)
            const tendonGeo = new THREE.CylinderGeometry(0.1, 0.1, 4, 8);
            const tendonMat = new THREE.MeshStandardMaterial({ color: 0xf87171 });
            const tendon = new THREE.Mesh(tendonGeo, tendonMat);
            tendon.position.set(-0.6, 2.5, 0.5);
            tendon.visible = labState.tendon;
            tendonMeshRef.current = tendon;
            group.add(tendon);

            scene.add(group);
            currentObjectsRef.current.push(group);
            jointRef.current = group;
        }
    };

    const assembleFramework = () => {
        frameworkPartsRef.current.forEach(part => {
            part.mesh.position.lerp(part.targetPos, 1);
            part.mesh.rotation.copy(part.targetRot);
        });
        showFeedback("Framework Assembled! Stability Achieved.", "success");
    };

    const testMovement = () => {
        if (isMoving) return;
        if (!labState.cartilage) {
            showFeedback("WARNING: Bone Rubbing! No Cartilage detected.", "error");
            return;
        }
        setIsMoving(true);
        setTimeout(() => setIsMoving(false), 3000);
    };

    const showFeedback = (msg: string, type: string) => {
        setFeedback({ msg, type });
        setTimeout(() => setFeedback(null), 3000);
    };

    const handleQuizAnswer = (correct: boolean) => {
        if (correct) {
            setScore(s => s + 10);
            showFeedback("Correct! Great Understanding.", "success");
        } else {
            showFeedback("Oops! Try again.", "error");
        }
    };

    return (
        <div className="h-full flex flex-col relative bg-white">
            {/* 3D Container */}
            <div ref={mountRef} className="absolute inset-0 z-0 cursor-move" />

            {/* Overlays */}
            <div className="absolute top-6 left-6 z-10 flex flex-col gap-4 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-md p-5 rounded-[24px] border border-slate-200 shadow-xl max-w-xs pointer-events-auto">
                    <h3 className="text-blue-600 font-black uppercase text-sm mb-2 flex items-center gap-2">
                        {mode === 'framework' ? <Info size={16}/> : mode === 'tissue' ? <FlaskConical size={16}/> : <Trophy size={16}/>}
                        {mode === 'framework' ? "Stability Lab" : mode === 'tissue' ? "Connective Lab" : "Osteo Quiz"}
                    </h3>
                    <p className="text-slate-600 text-[10px] font-bold leading-relaxed">
                        {mode === 'framework' ? "Scattered pieces cannot support weight. Build the central framework for stability." : 
                         mode === 'tissue' ? "Toggle different tissues to see how they protect and move joints." : 
                         "Test your knowledge of bones and connective tissues."}
                    </p>
                </div>

                {feedback && (
                    <div className={`p-4 rounded-2xl border-2 animate-bounce shadow-xl backdrop-blur-md pointer-events-auto flex items-center gap-2 font-black text-xs uppercase ${feedback.type === 'error' ? 'bg-red-50 border-red-500 text-red-700' : 'bg-green-50 border-green-500 text-green-700'}`}>
                        {feedback.type === 'error' ? <AlertCircle size={18}/> : <CheckCircle size={18}/>}
                        {feedback.msg}
                    </div>
                )}
            </div>

            {/* Bottom Controls */}
            <div className="absolute bottom-8 left-0 right-0 z-10 flex flex-col items-center gap-4">
                <div className="flex bg-slate-100 p-1.5 rounded-[24px] border border-slate-200 shadow-2xl">
                    <button onClick={() => setMode('framework')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${mode === 'framework' ? 'bg-white text-blue-600 shadow-md' : 'text-slate-500'}`}>1. Framework</button>
                    <button onClick={() => setMode('tissue')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${mode === 'tissue' ? 'bg-white text-indigo-600 shadow-md' : 'text-slate-500'}`}>2. Tissues</button>
                    <button onClick={() => setMode('quiz')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all ${mode === 'quiz' ? 'bg-white text-purple-600 shadow-md' : 'text-slate-500'}`}>3. Quiz</button>
                </div>

                <div className="flex gap-4 pointer-events-auto">
                    {mode === 'framework' && (
                        <button onClick={assembleFramework} className="px-10 py-4 bg-blue-600 text-white rounded-full font-black shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
                           <Accessibility size={20}/> ASSEMBLE SPINE
                        </button>
                    )}
                    {mode === 'tissue' && (
                        <div className="flex flex-wrap justify-center gap-3">
                            <button 
                                onClick={() => setLabState(p => ({...p, cartilage: !p.cartilage}))}
                                className={`px-4 py-3 rounded-2xl font-black text-[10px] uppercase border-2 transition-all ${labState.cartilage ? 'bg-blue-600 border-blue-400 text-white' : 'bg-white border-slate-200 text-slate-400'}`}
                            >Cartilage</button>
                            <button 
                                onClick={() => setLabState(p => ({...p, ligament: !p.ligament}))}
                                className={`px-4 py-3 rounded-2xl font-black text-[10px] uppercase border-2 transition-all ${labState.ligament ? 'bg-orange-600 border-orange-400 text-white' : 'bg-white border-slate-200 text-slate-400'}`}
                            >Ligament</button>
                            <button 
                                onClick={() => setLabState(p => ({...p, tendon: !p.tendon}))}
                                className={`px-4 py-3 rounded-2xl font-black text-[10px] uppercase border-2 transition-all ${labState.tendon ? 'bg-red-600 border-red-400 text-white' : 'bg-white border-slate-200 text-slate-400'}`}
                            >Tendon</button>
                            <button onClick={testMovement} className={`px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] shadow-xl hover:bg-black transition-all ${isMoving ? 'opacity-50' : 'animate-pulse'}`}>
                                {isMoving ? "MOVING..." : "TEST MOVEMENT"}
                            </button>
                        </div>
                    )}
                    {mode === 'quiz' && (
                        <div className="bg-white/90 backdrop-blur-md p-6 rounded-[32px] border border-slate-200 shadow-2xl flex flex-col items-center gap-4">
                            <div className="text-sm font-black text-slate-800">Q: Which tissue connects "Muscle to Bone"?</div>
                            <div className="flex gap-2">
                                <button onClick={() => handleQuizAnswer(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors uppercase">Ligament</button>
                                <button onClick={() => handleQuizAnswer(true)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors uppercase">Tendon</button>
                                <button onClick={() => handleQuizAnswer(false)} className="px-4 py-2 bg-slate-100 rounded-xl font-bold text-xs hover:bg-slate-200 transition-colors uppercase">Cartilage</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Hint for dragging */}
            <div className="absolute top-6 right-6 pointer-events-none">
                <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 text-slate-400 text-[9px] font-black uppercase tracking-widest flex items-center gap-2">
                    <RotateCcw size={12}/> Drag to Orbit 3D Space
                </div>
            </div>
        </div>
    );
};

export default SkeletonModule;