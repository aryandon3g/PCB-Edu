import React, { useState, useEffect } from 'react';
import { BrainCircuit, Play, Pause, ZoomIn, ZoomOut, Zap, Lightbulb, ScanFace, Layers, MessageCircle, AlertCircle, XCircle, CheckCircle, SplitSquareVertical, FileText, Box } from 'lucide-react';
import { Language } from '../../types';

interface BrainProps {
  language: Language;
}

// --- EDUCATIONAL DATA (SSC / RAILWAY FOCUSED) ---
const BRAIN_CONTENT: Record<string, any> = {
    // --- LOBES (EXTERNAL) ---
    frontal: { 
        name: { en: "Frontal Lobe", hi: "ललाट खंड (Frontal Lobe)" }, 
        trick: { en: "Front Desk / CEO", hi: "ऑफिस का बॉस (निर्णय लेने वाला)" },
        desc: { en: "The 'CEO' of the brain. Located at the front.", hi: "मस्तिष्क का 'सीईओ'। सबसे सामने स्थित।" },
        fact: { 
            en: "It acts as the command center for personality, reasoning, and judgment. It contains Broca's Area for speech production. Damage here can alter behavior and decision-making abilities significantly.", 
            hi: "यह व्यक्तित्व, तर्क और निर्णय लेने के लिए कमांड सेंटर के रूप में कार्य करता है। इसमें बोलने के लिए 'ब्रोका क्षेत्र' होता है। यहाँ चोट लगने से व्यवहार और निर्णय लेने की क्षमता बदल सकती है।" 
        }
    },
    parietal: { 
        name: { en: "Parietal Lobe", hi: "पार्श्विक खंड (Parietal Lobe)" }, 
        trick: { en: "P for Pain/Pressure", hi: "P से Pain (दर्द) और Pressure (दबाव)" },
        desc: { en: "The 'Sensor'. Located at the top-center.", hi: "'सेंसर'। ऊपरी-मध्य भाग में स्थित।" },
        fact: { 
            en: "This lobe processes sensory information like touch, pain, and temperature from the skin. It also helps in understanding numbers and spatial orientation, acting as your body's navigation system.", 
            hi: "यह लोब त्वचा से स्पर्श, दर्द और तापमान जैसी संवेदी जानकारी को संसाधित करता है। यह संख्याओं और दिशा ज्ञान को समझने में भी मदद करता है, जो शरीर के नेविगेशन सिस्टम की तरह काम करता है।" 
        }
    },
    occipital: { 
        name: { en: "Occipital Lobe", hi: "पश्च खंड (Occipital Lobe)" }, 
        trick: { en: "O for Optical (Vision)", hi: "O से Optical (आँख/दृष्टि)" },
        desc: { en: "The 'Camera'. Located at the back of the head.", hi: "'कैमरा'। सिर के पीछे स्थित।" },
        fact: { 
            en: "The dedicated visual processing center of the brain. It decodes shapes, colors, and movement. Even if your eyes are perfect, damage to this lobe can cause blindness because the brain cannot process images.", 
            hi: "मस्तिष्क का समर्पित दृश्य प्रसंस्करण केंद्र। यह आकृतियों, रंगों और गति को डिकोड करता है। भले ही आपकी आंखें ठीक हों, इस लोब को नुकसान होने से अंधापन हो सकता है क्योंकि मस्तिष्क छवियों को समझ नहीं पाता।" 
        }
    },
    temporal: { 
        name: { en: "Temporal Lobe", hi: "शंख खंड (Temporal Lobe)" }, 
        trick: { en: "Tempo (Music) / Temple (Ear)", hi: "क कनपटी = क कान (सुनना)" },
        desc: { en: "The 'Recorder'. Located on the sides near ears.", hi: "'रिकॉर्डर'। कानों के पास किनारों पर स्थित।" },
        fact: { 
            en: "Located near the ears, it handles auditory processing and memory storage. It houses Wernicke's Area, which is critical for understanding language. Damage can lead to memory loss or difficulty understanding words.", 
            hi: "कानों के पास स्थित, यह सुनने और याददाश्त को संभालने का काम करता है। इसमें 'वर्र्निक क्षेत्र' होता है, जो भाषा समझने के लिए महत्वपूर्ण है। नुकसान होने पर याददाश्त जा सकती है या शब्दों को समझने में कठिनाई हो सकती है।" 
        }
    },
    cerebellum: { 
        name: { en: "Cerebellum", hi: "अनुमस्तिष्क (Cerebellum)" }, 
        trick: { en: "Bella Balance", hi: "बेल (Bell) बजी तो बैलेंस बिगड़ा" },
        desc: { en: "'Little Brain' located at the bottom back.", hi: "पीछे नीचे स्थित 'छोटा दिमाग'।" },
        fact: { 
            en: "Known as the 'Little Brain', it coordinates voluntary muscle movements, posture, and balance. It is highly sensitive to alcohol; when affected, it causes the staggering gait and loss of coordination seen in intoxication.", 
            hi: "'छोटा दिमाग' के नाम से जाना जाता है, यह मांसपेशियों की गति, मुद्रा और संतुलन का समन्वय करता है। यह शराब के प्रति बहुत संवेदनशील है; प्रभावित होने पर यह लड़खड़ाहट और संतुलन बिगड़ने का कारण बनता है।" 
        }
    },
    
    // --- BRAIN STEM PARTS ---
    midbrain: {
        name: { en: "Midbrain", hi: "मध्य मस्तिष्क (Midbrain)" },
        trick: { en: "Middle Manager (Reflexes)", hi: "बीच का बिचौलिया (संकेत भेजना)" },
        desc: { en: "Top part of the brainstem.", hi: "मस्तिष्क स्तंभ का ऊपरी भाग।" },
        fact: { 
            en: "The topmost part of the brainstem, acting as a relay for visual and auditory information. It controls reflex actions like moving your eyes to track a moving object or pupils dilating in light.", 
            hi: "मस्तिष्क स्तंभ का सबसे ऊपरी हिस्सा, जो दृश्य और श्रवण जानकारी के लिए रिले का काम करता है। यह चलती वस्तु को देखने के लिए आँखों की गति या प्रकाश में पुतलियों के फैलने जैसे रिफ्लेक्स को नियंत्रित करता है।" 
        }
    },
    pons: {
        name: { en: "Pons", hi: "पोंस (Pons)" },
        trick: { en: "Pons = Ponds (Breathing)", hi: "साँस लेना और सोना" },
        desc: { en: "Middle bulge of the brainstem. Means 'Bridge'.", hi: "मस्तिष्क स्तंभ का मध्य उभार। इसका अर्थ 'पुल' है।" },
        fact: { 
            en: "Translating to 'bridge', it connects the upper and lower parts of the brain. It plays a key role in regulating the intensity of breathing and controlling sleep cycles, including REM sleep where dreaming occurs.", 
            hi: "इसका अर्थ 'पुल' है, यह मस्तिष्क के ऊपरी और निचले हिस्सों को जोड़ता है। यह सांस लेने की तीव्रता को नियंत्रित करने और नींद के चक्र (जिसमें सपने आते हैं) को नियंत्रित करने में मुख्य भूमिका निभाता है।" 
        }
    },
    medulla: {
        name: { en: "Medulla Oblongata", hi: "मेड्यूला ऑबलोंगाटा" },
        trick: { en: "Medal of Life", hi: "इसके बिना जीवन नहीं (धड़कन/साँस)" },
        desc: { en: "Lowest part of the brain stem connecting to spinal cord.", hi: "मस्तिष्क स्तंभ का सबसे निचला भाग जो रीढ़ की हड्डी से जुड़ता है।" },
        fact: { 
            en: "The most critical part for survival, connecting to the spinal cord. It regulates involuntary life-sustaining functions like heart rate, blood pressure, and breathing, as well as reflexes like vomiting and sneezing.", 
            hi: "जीवित रहने के लिए सबसे महत्वपूर्ण हिस्सा, जो रीढ़ की हड्डी से जुड़ता है। यह हृदय गति, रक्तचाप और सांस लेने जैसे अनैच्छिक कार्यों के साथ-साथ उल्टी और छींकने जैसे रिफ्लेक्स को नियंत्रित करता है।" 
        }
    },
    
    // --- INTERNAL PARTS ---
    corpus: {
        name: { en: "Corpus Callosum", hi: "कॉर्पस कैलोसम" }, 
        trick: { en: "Call/Connection Bridge", hi: "कनेक्शन केबल" },
        desc: { en: "Thick band of nerve fibers connecting Left and Right Hemispheres.", hi: "बाएं और दाएं गोलार्द्धों को जोड़ने वाली तंत्रिका तंतुओं की मोटी पट्टी।" },
        fact: { 
            en: "A massive bundle of over 200 million nerve fibers connecting the left and right hemispheres. It ensures both sides of the brain communicate effectively, allowing for coordinated body movements and complex thought.", 
            hi: "20 करोड़ से अधिक तंत्रिका तंतुओं का एक विशाल बंडल जो बाएं और दाएं गोलार्द्धों को जोड़ता है। यह सुनिश्चित करता है कि मस्तिष्क के दोनों हिस्से प्रभावी ढंग से संवाद करें, जिससे शरीर की समन्वित गति और जटिल विचार संभव होते हैं।" 
        }
    },
    thalamus: { 
        name: { en: "Thalamus", hi: "थैलेमस" }, 
        trick: { en: "Traffic Police / Relay Station", hi: "डाकिया (Postman)" },
        desc: { en: "The 'Relay Station'. Egg-shaped structure in the center.", hi: "'रिले स्टेशन'। केंद्र में अंडे के आकार की संरचना।" },
        fact: { 
            en: "Acts as the brain's sensory relay station. It receives signals for pain, touch, and vision and directs them to the cortex. Interestingly, the sense of smell is the only sense that bypasses the thalamus.", 
            hi: "मस्तिष्क के संवेदी रिले स्टेशन के रूप में कार्य करता है। यह दर्द, स्पर्श और दृष्टि के संकेत प्राप्त करता है और उन्हें कॉर्टेक्स भेजता है। दिलचस्प बात यह है कि सूंघने की शक्ति (गंध) ही एकमात्र ऐसी इंद्रिय है जो थैलेमस से नहीं गुजरती।" 
        }
    },
    hypothalamus: { 
        name: { en: "Hypothalamus", hi: "हाइपोथैलेमस" }, 
        trick: { en: "Hypo-Thermometer", hi: "थर्मामीटर (तापमान/भूख/प्यास)" },
        desc: { en: "Located below Thalamus. Small but powerful.", hi: "थैलेमस के नीचे स्थित। छोटा लेकिन शक्तिशाली।" },
        fact: { 
            en: "The body's thermostat and master regulator. It maintains homeostasis by controlling hunger, thirst, sleep, and body temperature. It also controls the pituitary gland, linking the nervous system to the endocrine system.", 
            hi: "शरीर का थर्मोस्टेट और मास्टर रेगुलेटर। यह भूख, प्यास, नींद और शरीर के तापमान को नियंत्रित करके संतुलन बनाए रखता है। यह पीयूष ग्रंथि को भी नियंत्रित करता है, जो तंत्रिका तंत्र को अंतःस्रावी तंत्र से जोड़ता है।" 
        }
    },
    pituitary: {
        name: { en: "Pituitary Gland", hi: "पीयूष ग्रंथि (Pituitary)" }, 
        trick: { en: "Master Gland", hi: "मास्टर जी (ग्रंथि)" },
        desc: { en: "Pea-sized gland hanging from Hypothalamus.", hi: "हाइपोथैलेमस से लटकी मटर के आकार की ग्रंथि।" },
        fact: { 
            en: "Called the 'Master Gland' because it directs other glands to release hormones. Though pea-sized, it controls vital processes like growth (HGH), metabolism, and reproduction. It sits safely in a bony cavity called the Sella Turcica.", 
            hi: "इसे 'मास्टर ग्रंथि' कहा जाता है क्योंकि यह अन्य ग्रंथियों को हार्मोन छोड़ने का निर्देश देती है। मटर के आकार की होने के बावजूद, यह वृद्धि, चयापचय और प्रजनन जैसी महत्वपूर्ण प्रक्रियाओं को नियंत्रित करती है।" 
        }
    },
    pineal: {
        name: { en: "Pineal Gland", hi: "पीनियल ग्रंथि" },
        trick: { en: "Biological Clock", hi: "जैविक घड़ी (सोना/जागना)" },
        desc: { en: "Tiny gland located deep in the center.", hi: "केंद्र में स्थित बहुत छोटी ग्रंथि।" },
        fact: { 
            en: "A tiny gland that regulates your internal biological clock (Circadian Rhythm). It secretes Melatonin in response to darkness, signaling your body that it is time to sleep. It is often referred to as the 'Third Eye'.", 
            hi: "एक छोटी ग्रंथि जो आपकी आंतरिक जैविक घड़ी (सर्केडियन रिदम) को नियंत्रित करती है। यह अंधेरे के जवाब में मेलाटोनिन छोड़ती है, जिससे शरीर को संकेत मिलता है कि सोने का समय हो गया है। इसे अक्सर 'तीसरी आंख' कहा जाता है।" 
        }
    },
    amygdala: {
        name: { en: "Amygdala", hi: "एमिग्डाला" },
        trick: { en: "Angry Amy (Fear/Anger)", hi: "डर और गुस्सा" },
        desc: { en: "Almond-shaped mass deep in the temporal lobe.", hi: "टेम्पोरल लोब में बादाम के आकार की संरचना।" },
        fact: { 
            en: "The emotional center of the brain, part of the Limbic system. It processes intense emotions like aggression and fear, triggering the 'Fight or Flight' response to prepare the body for immediate danger.", 
            hi: "मस्तिष्क का भावनात्मक केंद्र, जो लिम्बिक सिस्टम का हिस्सा है। यह आक्रामकता और डर जैसी तीव्र भावनाओं को संसाधित करता है, और शरीर को तत्काल खतरे के लिए तैयार करने के लिए 'लड़ो या भागो' प्रतिक्रिया शुरू करता है।" 
        }
    },
    hippocampus: {
        name: { en: "Hippocampus", hi: "हिप्पोकैम्पस" },
        trick: { en: "Hippo on Campus (Memory)", hi: "हार्ड डिस्क (Hard Disk)" },
        desc: { en: "Curved structure resembling a seahorse.", hi: "समुद्री घोड़े जैसी मुड़ी हुई संरचना।" },
        fact: { 
            en: "Critical for learning and memory formation. It acts like a 'Save' button, converting short-term memories into long-term ones. Damage here causes the inability to form new memories, a hallmark of Alzheimer's.", 
            hi: "सीखने और स्मृति निर्माण के लिए महत्वपूर्ण। यह 'सेव' बटन की तरह काम करता है, अल्पकालिक यादों को दीर्घकालिक यादों में बदलता है। यहाँ नुकसान होने पर नई यादें नहीं बन पातीं, जो अल्जाइमर का मुख्य लक्षण है।" 
        }
    }
};

const BRAIN_FACTS = [
    { label: { en: "Weight", hi: "वजन" }, val: { en: "1350 - 1400g (Adult)", hi: "1350 - 1400 ग्राम (वयस्क)" } },
    { label: { en: "Energy Use", hi: "ऊर्जा खपत" }, val: { en: "20% of Body Oxygen", hi: "शरीर की 20% ऑक्सीजन" } },
    { label: { en: "Grey Matter", hi: "ग्रे मैटर" }, val: { en: "Outer Layer (Processing)", hi: "बाहरी परत (प्रोसेसिंग)" } },
    { label: { en: "White Matter", hi: "व्हाइट मैटर" }, val: { en: "Inner Part (Connecting)", hi: "भीतरी भाग (कनेक्टिंग)" } },
    { label: { en: "Covering", hi: "आवरण (Meninges)" }, val: { en: "Dura, Arachnoid, Pia", hi: "ड्यूरा, एराक्नोइड, पिया" } },
    { label: { en: "Fluid", hi: "द्रव" }, val: { en: "CSF (Protection)", hi: "CSF (सुरक्षा)" } },
];

const DID_YOU_KNOW = [
    { en: "The brain has no pain receptors, so brain surgery can be performed while the patient is awake!", hi: "मस्तिष्क में दर्द रिसेप्टर्स नहीं होते, इसलिए मरीज के जागते हुए भी ब्रेन सर्जरी की जा सकती है!" },
    { en: "Information travels in the brain at speeds of up to 268 mph (431 km/h).", hi: "मस्तिष्क में सूचना 268 मील प्रति घंटे (431 किमी/घंटा) की गति से यात्रा करती है।" },
    { en: "The human brain is about 75% water.", hi: "मानव मस्तिष्क लगभग 75% पानी है।" },
    { en: "Your brain generates enough electricity to power a small light bulb (approx 20 watts)!", hi: "मस्तिष्क इतनी बिजली पैदा करता है जिससे एक छोटा बल्ब (लगभग 20 वाट) जल सकता है!" }
];

const QUIZ_QUESTIONS = [
    { q: { en: "Which part is known as the 'Little Brain'?", hi: "किस भाग को 'छोटा दिमाग' (Little Brain) कहा जाता है?" }, options: ["Cerebrum", "Cerebellum", "Medulla", "Pons"], ans: "Cerebellum" },
    { q: { en: "Which part regulates Body Temperature?", hi: "शरीर का तापमान (Body Temperature) कौन नियंत्रित करता है?" }, options: ["Thalamus", "Hypothalamus", "Pons", "Cerebellum"], ans: "Hypothalamus" },
    { q: { en: "Where is the center for Vision?", hi: "दृष्टि (Vision) का केंद्र कहाँ स्थित है?" }, options: ["Frontal Lobe", "Parietal Lobe", "Occipital Lobe", "Temporal Lobe"], ans: "Occipital Lobe" },
    { q: { en: "Which gland is called the 'Master Gland'?", hi: "किस ग्रंथि को 'मास्टर ग्रंथि' (Master Gland) कहा जाता है?" }, options: ["Thyroid", "Adrenal", "Pituitary", "Pineal"], ans: "Pituitary" },
    { q: { en: "Which part controls vomiting and sneezing?", hi: "उल्टी और छींकने जैसी क्रियाओं को कौन नियंत्रित करता है?" }, options: ["Medulla", "Cerebellum", "Midbrain", "Pons"], ans: "Medulla" },
    { q: { en: "Which part regulates Sleep-Wake cycle?", hi: "सोने-जागने के चक्र को कौन नियंत्रित करता है?" }, options: ["Pineal", "Hippocampus", "Thalamus", "Amygdala"], ans: "Pineal" },
];

// --- GUIDED TOUR STEPS ---
const TOUR_STEPS = [
    {
        partId: 'frontal',
        view: 'external',
        title: { en: "1. The CEO: Frontal Lobe", hi: "1. सीईओ: ललाट खंड (Frontal Lobe)" },
        desc: { 
            en: "Located right behind your forehead (Blue). This is the 'thinking' part. It handles personality, logic, and planning.",
            hi: "माथे के ठीक पीछे स्थित (नीला)। यह 'सोचने' वाला हिस्सा है। यह व्यक्तित्व, तर्क और योजना को संभालता है।"
        }
    },
    {
        partId: 'parietal',
        view: 'external',
        title: { en: "2. The Sensor: Parietal Lobe", hi: "2. सेंसर: पार्श्विक खंड (Parietal Lobe)" },
        desc: { 
            en: "Located at the top (Green). It processes touch, pain, and temperature.",
            hi: "ऊपर स्थित (हरा)। यह स्पर्श, दर्द और तापमान को संसाधित करता है।"
        }
    },
    {
        partId: 'occipital',
        view: 'external',
        title: { en: "3. The Camera: Occipital Lobe", hi: "3. कैमरा: पश्च खंड (Occipital Lobe)" },
        desc: { 
            en: "Located at the very back (Yellow). This is your vision center.",
            hi: "बिल्कुल पीछे स्थित (पीला)। यह आपका दृष्टि केंद्र है।"
        }
    },
    {
        partId: 'temporal',
        view: 'external',
        title: { en: "4. The Recorder: Temporal Lobe", hi: "4. रिकॉर्डर: शंख खंड (Temporal Lobe)" },
        desc: { 
            en: "Located on the sides (Orange). It handles hearing and language.",
            hi: "किनारों पर स्थित (नारंगी)। यह सुनने और भाषा को संभालता है।"
        }
    },
    {
        partId: 'cerebellum',
        view: 'external',
        title: { en: "5. The Balancer: Cerebellum", hi: "5. संतुलनकर्ता: अनुमस्तिष्क (Cerebellum)" },
        desc: { 
            en: "The 'Little Brain' at the bottom (Purple). It controls balance and muscle coordination.",
            hi: "नीचे 'छोटा दिमाग' (बैंगनी)। यह संतुलन और मांसपेशियों के समन्वय को नियंत्रित करता है।"
        }
    },
    {
        partId: 'corpus',
        view: 'internal',
        title: { en: "6. The Bridge: Corpus Callosum", hi: "6. पुल: कॉर्पस कैलोसम" },
        desc: { 
            en: "Let's look inside! This C-shaped band connects the left and right brain.",
            hi: "चलिए अंदर देखते हैं! यह C-आकार का बैंड बाएं और दाएं मस्तिष्क को जोड़ता है।"
        }
    },
    {
        partId: 'thalamus',
        view: 'internal',
        title: { en: "7. The Relay: Thalamus", hi: "7. रिले: थैलेमस" },
        desc: { 
            en: "The egg-shaped center. It acts like a post office for sensory signals.",
            hi: "अंडे के आकार का केंद्र। यह संवेदी संकेतों के लिए डाकघर की तरह काम करता है।"
        }
    },
    {
        partId: 'hypothalamus',
        view: 'internal',
        title: { en: "8. The Thermostat: Hypothalamus", hi: "8. थर्मोस्टेट: हाइपोथैलेमस" },
        desc: { 
            en: "Controls body temperature, hunger, and thirst.",
            hi: "शरीर का तापमान, भूख और प्यास को नियंत्रित करता है।"
        }
    },
    {
        partId: 'pituitary',
        view: 'internal',
        title: { en: "9. The Master: Pituitary Gland", hi: "9. मास्टर: पीयूष ग्रंथि" },
        desc: { 
            en: "A pea-sized gland that controls growth and other hormones.",
            hi: "मटर के आकार की ग्रंथि जो वृद्धि और अन्य हार्मोन को नियंत्रित करती है।"
        }
    },
    {
        partId: 'pineal',
        view: 'internal',
        title: { en: "10. Biological Clock: Pineal Gland", hi: "10. जैविक घड़ी: पीनियल ग्रंथि" },
        desc: { 
            en: "Controls sleep cycle by releasing Melatonin.",
            hi: "मेलटोनिन छोड़ कर नींद के चक्र को नियंत्रित करती है।"
        }
    },
    {
        partId: 'medulla',
        view: 'internal',
        title: { en: "11. The Lifeline: Medulla", hi: "11. लाइफलाइन: मेड्यूला" },
        desc: { 
            en: "Controls heartbeat and breathing. Essential for life.",
            hi: "धड़कन और सांस को नियंत्रित करता है। जीवन के लिए आवश्यक।"
        }
    }
];

const Brain: React.FC<BrainProps> = ({ language }) => {
  const [activeTab, setActiveTab] = useState<'structure' | 'facts' | 'quiz'>('structure');
  const [viewMode, setViewMode] = useState<'external' | 'internal'>('external');
  const [displayStyle, setDisplayStyle] = useState<'realistic' | 'diagram'>('realistic'); // 3D vs 2D Toggle
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const [tourActive, setTourActive] = useState(false);
  const [tourStep, setTourStep] = useState(0);
  const [signalActive, setSignalActive] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState<string | null>(null);
  const [factIndex, setFactIndex] = useState(0);

  // Tour Logic
  useEffect(() => {
    let timer: any;
    if (tourActive) {
      const step = TOUR_STEPS[tourStep];
      setViewMode(step.view as any);
      setSelectedPart(step.partId);
      setSignalActive(true); // Animate signals during explanation
      
      // Auto advance after 8 seconds (simulated narration time)
      timer = setTimeout(() => {
          if (tourStep < TOUR_STEPS.length - 1) {
              setTourStep(prev => prev + 1);
          } else {
              setTourActive(false);
              setSignalActive(false);
              setSelectedPart(null);
              setTourStep(0);
          }
      }, 8000);
    }
    return () => clearTimeout(timer);
  }, [tourActive, tourStep]);

  // Cycle facts
  useEffect(() => {
      const interval = setInterval(() => {
          setFactIndex(prev => (prev + 1) % DID_YOU_KNOW.length);
      }, 5000);
      return () => clearInterval(interval);
  }, []);

  const toggleTour = () => {
      if (tourActive) {
          setTourActive(false);
          setSignalActive(false);
          setSelectedPart(null);
          setTourStep(0);
      } else {
          setTourActive(true);
          setTourStep(0);
          setActiveTab('structure');
      }
  };

  const handlePartClick = (part: string) => {
      if (tourActive) return;
      if (activeTab === 'quiz') return; // Quiz logic handled separately
      
      setSelectedPart(part === selectedPart ? null : part);
      
      // Auto switch view for internal parts
      if (['thalamus', 'hypothalamus', 'corpus', 'pituitary', 'midbrain', 'pons', 'amygdala', 'hippocampus', 'pineal'].includes(part)) {
          setViewMode('internal');
      }
  };

  // Quiz Logic
  const handleQuizOption = (option: string) => {
      if (quizAnswered) return;
      const correct = QUIZ_QUESTIONS[quizIndex].ans === option;
      setQuizAnswered(option);
      if (correct) setQuizScore(s => s + 1);
  };

  const nextQuizQuestion = () => {
      if (quizIndex < QUIZ_QUESTIONS.length - 1) {
          setQuizIndex(i => i + 1);
          setQuizAnswered(null);
      } else {
          // Reset
          setQuizIndex(0);
          setQuizScore(0);
          setQuizAnswered(null);
      }
  };

  // Styling helper
  const getPartStyle = (partId: string, realisticFill: string, diagramFill: string) => {
      const isActive = selectedPart === partId;
      const isDiagram = displayStyle === 'diagram';
      
      // Base styles
      let fill = isDiagram ? diagramFill : realisticFill;
      let stroke = isDiagram ? '#334155' : 'rgba(0,0,0,0.2)';
      let strokeWidth = isDiagram ? 1.5 : 1;
      let filter = isActive ? 'drop-shadow(0px 0px 8px rgba(251, 191, 36, 0.6))' : 'none';

      // Active overrides
      if (isActive) {
          fill = '#fbbf24'; // Active Amber
          stroke = '#b45309';
          strokeWidth = 2;
      }

      return {
          fill,
          stroke,
          strokeWidth,
          filter,
          transition: 'all 0.3s ease'
      };
  };

  return (
    <div className="flex flex-col h-auto md:h-full landscape:h-full gap-4">
      {/* HEADER CONTROL BAR */}
      <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row flex-wrap gap-4 justify-between items-start md:items-center flex-shrink-0">
         <div className="flex items-center gap-2">
             <div className={`p-2 rounded-full ${tourActive ? 'bg-indigo-600 text-white animate-pulse' : 'bg-indigo-50 text-indigo-600'}`}>
                 <BrainCircuit size={20} />
             </div>
             <div>
                <h2 className="font-bold text-slate-800 leading-none">{language === Language.ENGLISH ? "Human Brain" : "मानव मस्तिष्क"}</h2>
                <span className="text-[10px] text-slate-500 font-medium">SSC/Railway Special</span>
             </div>
         </div>

         {/* View Switchers Group */}
         <div className="flex flex-wrap gap-2 w-full md:w-auto">
             {/* 3D (Realistic) vs 2D (Diagram) Toggle */}
             <div className="flex bg-slate-100 p-1 rounded-lg flex-1 md:flex-none justify-center">
                 <button 
                    onClick={() => setDisplayStyle('realistic')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${displayStyle === 'realistic' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                 >
                    <Box size={14} /> {language === Language.ENGLISH ? "3D" : "3D"}
                 </button>
                 <button 
                    onClick={() => setDisplayStyle('diagram')}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${displayStyle === 'diagram' ? 'bg-white shadow text-indigo-600' : 'text-slate-500'}`}
                 >
                    <FileText size={14} /> {language === Language.ENGLISH ? "2D" : "2D"}
                 </button>
             </div>

             {/* External vs Internal (Split) Toggle */}
             <div className="flex bg-slate-100 p-1 rounded-lg flex-1 md:flex-none justify-center">
                 <button 
                    onClick={() => { setViewMode('external'); setSignalActive(false); }}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'external' ? 'bg-white shadow text-blue-600' : 'text-slate-500'}`}
                 >
                    <ScanFace size={14} /> {language === Language.ENGLISH ? "Whole" : "संपूर्ण"}
                 </button>
                 <button 
                    onClick={() => { setViewMode('internal'); setSignalActive(false); }}
                    className={`px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-2 transition-all ${viewMode === 'internal' ? 'bg-white shadow text-pink-600' : 'text-slate-500'}`}
                 >
                    <SplitSquareVertical size={14} /> {language === Language.ENGLISH ? "Split" : "आधा"}
                 </button>
             </div>
         </div>

         <div className="flex gap-2 w-full md:w-auto">
             <button 
                onClick={() => setSignalActive(!signalActive)}
                className={`flex-1 md:flex-none px-3 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border transition-all ${signalActive ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : 'bg-white border-slate-200 text-slate-600'}`}
             >
                 <Zap size={14} fill={signalActive ? "currentColor" : "none"} /> {language === Language.ENGLISH ? "Signals" : "सिग्नल"}
             </button>
             <button 
                onClick={toggleTour}
                className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 border transition-all ${tourActive ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-indigo-600'}`}
             >
                 {tourActive ? <Pause size={14} /> : <Play size={14} />} {language === Language.ENGLISH ? "Explain" : "समझायें"}
             </button>
         </div>
      </div>

      <div className="flex flex-col md:flex-row landscape:flex-row gap-6 h-auto md:flex-1 landscape:flex-1 min-h-0">
         
         {/* LEFT: VISUALIZATION */}
         <div className="w-full md:flex-1 bg-gradient-to-b from-slate-50 to-indigo-50/30 rounded-xl shadow-inner border border-slate-200 relative overflow-hidden flex flex-col items-center justify-center min-h-[300px] landscape:min-h-0 lg:min-h-[400px]">
             
             {/* Labels Overlay */}
             <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 pointer-events-none">
                 <div className="flex items-center gap-2 text-slate-500 text-xs bg-white/60 px-2 py-1 rounded shadow-sm backdrop-blur">
                     {viewMode === 'external' ? <ScanFace size={12}/> : <SplitSquareVertical size={12}/>}
                     {viewMode === 'external' ? (language === Language.ENGLISH ? 'External View' : 'बाहरी दृश्य') : (language === Language.ENGLISH ? 'Sagittal Section' : 'ऊर्ध्वाधर विभाजन')}
                 </div>
                 <div className="flex items-center gap-2 text-slate-500 text-xs bg-white/60 px-2 py-1 rounded shadow-sm backdrop-blur">
                     {displayStyle === 'realistic' ? <Box size={12}/> : <FileText size={12}/>}
                     {displayStyle === 'realistic' ? (language === Language.ENGLISH ? '3D Realistic' : '3D असली जैसा') : (language === Language.ENGLISH ? '2D Diagram' : '2D आरेख')}
                 </div>
             </div>

             {/* Zoom */}
             <div className="absolute bottom-4 right-4 flex gap-2">
                 <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 bg-white text-slate-600 border border-slate-200 rounded hover:bg-slate-50 shadow-sm"><ZoomOut size={16}/></button>
                 <button onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="p-2 bg-white text-slate-600 border border-slate-200 rounded hover:bg-slate-50 shadow-sm"><ZoomIn size={16}/></button>
             </div>

             <div className="w-full h-full flex items-center justify-center" style={{ transform: `scale(${zoom})`, transition: 'transform 0.3s' }}>
                <svg viewBox="0 0 500 400" className="w-full h-full max-h-[400px] overflow-visible filter drop-shadow-xl">
                    <defs>
                        <radialGradient id="gradBlue" cx="30%" cy="30%" r="80%"><stop offset="0%" stopColor="#60a5fa"/><stop offset="100%" stopColor="#1e3a8a"/></radialGradient>
                        <radialGradient id="gradGreen" cx="30%" cy="30%" r="80%"><stop offset="0%" stopColor="#4ade80"/><stop offset="100%" stopColor="#14532d"/></radialGradient>
                        <radialGradient id="gradYellow" cx="30%" cy="30%" r="80%"><stop offset="0%" stopColor="#facc15"/><stop offset="100%" stopColor="#854d0e"/></radialGradient>
                        <radialGradient id="gradOrange" cx="30%" cy="30%" r="80%"><stop offset="0%" stopColor="#fb923c"/><stop offset="100%" stopColor="#9a3412"/></radialGradient>
                        <radialGradient id="gradPurple" cx="30%" cy="30%" r="80%"><stop offset="0%" stopColor="#c084fc"/><stop offset="100%" stopColor="#6b21a8"/></radialGradient>
                        <radialGradient id="gradRed" cx="30%" cy="30%" r="80%"><stop offset="0%" stopColor="#f87171"/><stop offset="100%" stopColor="#991b1b"/></radialGradient>
                    </defs>

                    {viewMode === 'external' ? (
                        <g>
                            {/* Brain Stem (Underlayer) - Visible at bottom */}
                            <path d="M260,280 L290,280 L300,320 L290,380 L260,380 L250,320 Z" onClick={() => handlePartClick('medulla')} style={getPartStyle('medulla', '#475569', '#cbd5e1')} className="cursor-pointer" />
                            
                            {/* Cerebellum (Purple) */}
                            <path d="M300,280 C340,280 380,300 380,330 C340,360 300,340 290,300" onClick={() => handlePartClick('cerebellum')} style={getPartStyle('cerebellum', 'url(#gradPurple)', '#e9d5ff')} className="cursor-pointer" />
                            
                            {/* Temporal Lobe (Orange) */}
                            <path d="M200,240 C200,200 240,180 300,180 C360,180 380,220 360,260 C320,280 240,280 200,240" onClick={() => handlePartClick('temporal')} style={getPartStyle('temporal', 'url(#gradOrange)', '#fed7aa')} className="cursor-pointer" />
                            
                            {/* Occipital Lobe (Yellow) */}
                            <path d="M360,260 C380,220 420,200 450,220 C460,260 420,280 380,280 C360,270 360,260 360,260" onClick={() => handlePartClick('occipital')} style={getPartStyle('occipital', 'url(#gradYellow)', '#fef08a')} className="cursor-pointer" />
                            
                            {/* Parietal Lobe (Green) */}
                            <path d="M200,60 C260,40 340,40 380,100 C400,140 380,180 300,180 L260,150 C260,100 240,70 200,60" onClick={() => handlePartClick('parietal')} style={getPartStyle('parietal', 'url(#gradGreen)', '#bbf7d0')} className="cursor-pointer" />
                            
                            {/* Frontal Lobe (Blue) */}
                            <path d="M100,240 C80,200 100,100 200,60 C240,60 260,100 260,150 L240,240 C180,240 140,280 100,240" onClick={() => handlePartClick('frontal')} style={getPartStyle('frontal', 'url(#gradBlue)', '#bfdbfe')} className="cursor-pointer" />

                            {/* Wernicke's Area Indicator (Temporal/Parietal junction) */}
                            <circle cx="310" cy="190" r="8" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
                            <text x="310" y="190" fontSize="8" fill={displayStyle === 'diagram' ? 'black' : 'white'} textAnchor="middle" dy="2.5">Wernicke</text>

                            {/* Broca's Area Indicator (Frontal) */}
                            <circle cx="200" cy="220" r="8" fill="rgba(255,255,255,0.3)" stroke="white" strokeWidth="1" strokeDasharray="2 2" />
                            <text x="200" y="220" fontSize="8" fill={displayStyle === 'diagram' ? 'black' : 'white'} textAnchor="middle" dy="2.5">Broca</text>

                            {/* Sulci Textures (Only in Realistic Mode) */}
                            {displayStyle === 'realistic' && (
                                <path d="M140,120 Q160,150 180,100 M220,80 Q240,120 250,90 M320,100 Q340,140 360,110" fill="none" stroke="rgba(0,0,0,0.1)" strokeWidth="2" pointerEvents="none" />
                            )}

                            {/* Signal Animation */}
                            {signalActive && (
                                <g>
                                    <circle r="4" fill="#ffff00"><animateMotion dur="2s" repeatCount="indefinite" path="M120,220 C150,150 250,100 350,150" /></circle>
                                    <circle r="4" fill="#ffffff"><animateMotion dur="1.5s" repeatCount="indefinite" path="M350,150 C300,200 200,250 120,220" /></circle>
                                </g>
                            )}
                        </g>
                    ) : (
                        <g>
                            {/* Base Silhouette - Cut View */}
                            <path d="M100,250 C80,200 100,100 200,50 C300,10 420,50 450,150 C470,220 450,300 400,320 L350,330 L320,380 L280,380 L260,320 C200,330 140,300 100,250" fill={displayStyle === 'diagram' ? '#f8fafc' : '#f1f5f9'} stroke={displayStyle === 'diagram' ? '#94a3b8' : '#cbd5e1'} strokeWidth="2" opacity="1" />

                            {/* BRAIN STEM GROUP */}
                            {/* Midbrain (Top) */}
                            <path d="M250,220 L280,220 L285,240 L245,240 Z" onClick={() => handlePartClick('midbrain')} style={getPartStyle('midbrain', '#94a3b8', '#e2e8f0')} className="cursor-pointer" />
                            {/* Pons (Middle Bulge) */}
                            <path d="M245,240 L285,240 C295,260 290,280 280,290 L250,290 C240,280 235,260 245,240 Z" onClick={() => handlePartClick('pons')} style={getPartStyle('pons', '#64748b', '#cbd5e1')} className="cursor-pointer" />
                            {/* Medulla (Bottom) */}
                            <path d="M250,290 L280,290 L270,380 L255,380 Z" onClick={() => handlePartClick('medulla')} style={getPartStyle('medulla', '#475569', '#94a3b8')} className="cursor-pointer" />

                            {/* Corpus Callosum (C-Shape) */}
                            <path d="M180,160 C180,110 280,110 320,160 C320,180 300,180 290,170 C280,140 220,140 210,170 C200,180 180,180 180,160" onClick={() => handlePartClick('corpus')} style={getPartStyle('corpus', '#fcd34d', '#fde68a')} className="cursor-pointer" />

                            {/* Thalamus (Oval) */}
                            <ellipse cx="250" cy="190" rx="30" ry="20" onClick={() => handlePartClick('thalamus')} style={getPartStyle('thalamus', '#38bdf8', '#bae6fd')} className="cursor-pointer" />

                            {/* Hypothalamus (Triangle) */}
                            <path d="M230,210 L270,210 L250,240 Z" onClick={() => handlePartClick('hypothalamus')} style={getPartStyle('hypothalamus', '#f472b6', '#fbcfe8')} className="cursor-pointer" />

                            {/* Pituitary (Pea) */}
                            <circle cx="250" cy="255" r="8" onClick={() => handlePartClick('pituitary')} style={getPartStyle('pituitary', '#ec4899', '#f9a8d4')} className="cursor-pointer" />
                            <line x1="250" y1="240" x2="250" y2="247" stroke="#ec4899" strokeWidth="2" />

                            {/* Pineal (New addition) - Small dot back of Thalamus */}
                            <circle cx="290" cy="190" r="5" onClick={() => handlePartClick('pineal')} style={getPartStyle('pineal', '#a855f7', '#d8b4fe')} className="cursor-pointer" />
                            <text x="295" y="185" fontSize="8" fill={displayStyle === 'diagram' ? '#7e22ce' : '#a855f7'}>Pineal</text>

                            {/* Limbic System Schematic */}
                            {/* Hippocampus (Curved green) */}
                            <path d="M280,200 C320,200 340,240 320,260 C300,280 270,220 280,200" onClick={() => handlePartClick('hippocampus')} style={getPartStyle('hippocampus', '#86efac', '#dcfce7')} className="cursor-pointer" />
                            {/* Amygdala (Red tip) */}
                            <circle cx="320" cy="260" r="6" onClick={() => handlePartClick('amygdala')} style={getPartStyle('amygdala', '#f87171', '#fca5a5')} className="cursor-pointer" />

                            {/* Cerebellum Internal (Arbor Vitae) */}
                            <g onClick={() => handlePartClick('cerebellum')} className="cursor-pointer">
                                <path d="M300,280 C340,280 380,300 380,330 C340,360 300,340 290,300" style={getPartStyle('cerebellum', '#a78bfa', '#ddd6fe')} />
                                {displayStyle === 'realistic' && (
                                    <path d="M310,300 L350,320 M320,310 L340,330" stroke="white" strokeWidth="1" opacity="0.6" pointerEvents="none" />
                                )}
                            </g>

                            {/* Labels - Light Mode Safe */}
                            <text x="250" y="100" fill="#64748b" fontSize="10" textAnchor="middle" opacity="0.8">CEREBRUM (Inner)</text>
                        </g>
                    )}
                </svg>
             </div>
         </div>

         {/* RIGHT: INFO PANEL */}
         <div className="w-full md:w-80 landscape:w-80 flex flex-col h-full bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden flex-shrink-0">
             
             {/* Tab Navigation */}
             <div className="flex border-b border-slate-200 bg-slate-50">
                 {['structure', 'facts', 'quiz'].map(tab => (
                     <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`flex-1 py-3 text-sm font-bold uppercase tracking-wide transition-colors ${activeTab === tab ? 'bg-white text-indigo-600 border-t-2 border-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                     >
                         {tab === 'structure' ? (language === Language.ENGLISH ? "Anatomy" : "संरचना") : 
                          tab === 'facts' ? (language === Language.ENGLISH ? "SSC Facts" : "तथ्य") :
                          (language === Language.ENGLISH ? "Quiz" : "क्विज़")}
                     </button>
                 ))}
             </div>

             <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
                 
                 {/* 1. ANATOMY TAB */}
                 {activeTab === 'structure' && (
                     <div className="space-y-4 animate-fade-in">
                         {tourActive && (
                             <div className="bg-indigo-50 border border-indigo-200 p-3 rounded-lg mb-4 flex items-start gap-3">
                                 <MessageCircle className="text-indigo-600 mt-1 flex-shrink-0" size={18} />
                                 <div>
                                     <div className="text-xs font-bold text-indigo-500 uppercase mb-1">Auto Explain Mode</div>
                                     <div className="text-sm font-bold text-slate-800">
                                         {language === Language.ENGLISH ? TOUR_STEPS[tourStep].title.en : TOUR_STEPS[tourStep].title.hi}
                                     </div>
                                     <div className="text-sm text-slate-600 mt-1">
                                         {language === Language.ENGLISH ? TOUR_STEPS[tourStep].desc.en : TOUR_STEPS[tourStep].desc.hi}
                                     </div>
                                     <div className="mt-2 h-1 w-full bg-indigo-200 rounded-full overflow-hidden">
                                         <div className="h-full bg-indigo-600 animate-width-fill" style={{ animationDuration: '8s' }}></div>
                                     </div>
                                 </div>
                             </div>
                         )}

                         {selectedPart ? (
                             <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
                                 <div className="bg-slate-100 p-3 border-b border-slate-200 flex justify-between items-center">
                                     <h3 className="font-bold text-slate-800">
                                         {language === Language.ENGLISH ? BRAIN_CONTENT[selectedPart].name.en : BRAIN_CONTENT[selectedPart].name.hi}
                                     </h3>
                                     <button onClick={() => setSelectedPart(null)} className="text-slate-400 hover:text-slate-600"><XCircle size={18}/></button>
                                 </div>
                                 <div className="p-4 space-y-4">
                                     {/* MNEMONIC TRICK SECTION - NEW */}
                                     <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200 flex gap-2 items-start">
                                         <Lightbulb size={18} className="text-yellow-600 mt-0.5 flex-shrink-0" />
                                         <div>
                                            <div className="text-xs font-bold text-yellow-700 uppercase mb-0.5">Memory Trick</div>
                                            <div className="text-sm font-bold text-slate-800">
                                                "{language === Language.ENGLISH ? BRAIN_CONTENT[selectedPart].trick.en : BRAIN_CONTENT[selectedPart].trick.hi}"
                                            </div>
                                         </div>
                                     </div>

                                     <p className="text-sm text-slate-600 leading-relaxed">
                                         {language === Language.ENGLISH ? BRAIN_CONTENT[selectedPart].desc.en : BRAIN_CONTENT[selectedPart].desc.hi}
                                     </p>

                                     <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg">
                                         <div className="flex items-center gap-2 mb-1">
                                             <AlertCircle size={14} className="text-amber-600" />
                                             <span className="text-xs font-bold text-amber-700 uppercase">SSC Exam Fact</span>
                                         </div>
                                         <p className="text-sm text-slate-800 font-medium">
                                             {language === Language.ENGLISH ? BRAIN_CONTENT[selectedPart].fact.en : BRAIN_CONTENT[selectedPart].fact.hi}
                                         </p>
                                     </div>
                                 </div>
                             </div>
                         ) : (
                             !tourActive && (
                                <div className="text-center text-slate-400 py-10">
                                    <ScanFace size={40} className="mx-auto mb-3 opacity-30" />
                                    <p className="text-sm">{language === Language.ENGLISH ? "Select a part to learn more" : "विवरण देखने के लिए किसी भाग को चुनें"}</p>
                                    <button onClick={toggleTour} className="mt-4 text-indigo-600 text-xs font-bold hover:underline">
                                        {language === Language.ENGLISH ? "Start Guided Tour" : "गाइडेड टूर शुरू करें"}
                                    </button>
                                </div>
                             )
                         )}
                     </div>
                 )}

                 {/* 2. FACTS TAB */}
                 {activeTab === 'facts' && (
                     <div className="space-y-3 animate-fade-in">
                         {BRAIN_FACTS.map((fact, i) => (
                             <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                 <span className="text-sm font-semibold text-slate-600">{language === Language.ENGLISH ? fact.label.en : fact.label.hi}</span>
                                 <span className="text-sm font-bold text-indigo-600">{language === Language.ENGLISH ? fact.val.en : fact.val.hi}</span>
                             </div>
                         ))}
                         {/* Enhanced Did You Know with cycling facts */}
                         <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
                             <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2"><Lightbulb size={16}/> {language === Language.ENGLISH ? "Did You Know?" : "क्या आप जानते हैं?"}</h4>
                             <p className="text-sm text-blue-700 leading-relaxed min-h-[60px] animate-fade-in">
                                 {language === Language.ENGLISH ? DID_YOU_KNOW[factIndex].en : DID_YOU_KNOW[factIndex].hi}
                             </p>
                             <div className="flex justify-center gap-1 mt-2">
                                 {DID_YOU_KNOW.map((_, i) => (
                                     <div key={i} className={`w-1.5 h-1.5 rounded-full ${i === factIndex ? 'bg-blue-600' : 'bg-blue-200'}`} />
                                 ))}
                             </div>
                         </div>
                     </div>
                 )}

                 {/* 3. QUIZ TAB */}
                 {activeTab === 'quiz' && (
                     <div className="flex flex-col h-full animate-fade-in">
                         <div className="flex justify-between items-center mb-4">
                             <span className="text-xs font-bold text-slate-400 uppercase">Question {quizIndex + 1}/{QUIZ_QUESTIONS.length}</span>
                             <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">Score: {quizScore}</span>
                         </div>
                         
                         <div className="bg-white border border-slate-200 rounded-xl p-4 mb-4 shadow-sm">
                             <h4 className="font-bold text-slate-800 text-lg mb-4">
                                 {language === Language.ENGLISH ? QUIZ_QUESTIONS[quizIndex].q.en : QUIZ_QUESTIONS[quizIndex].q.hi}
                             </h4>
                             <div className="space-y-2">
                                 {QUIZ_QUESTIONS[quizIndex].options.map((opt, i) => {
                                     let btnClass = "w-full text-left p-3 rounded-lg text-sm font-medium border transition-all ";
                                     if (quizAnswered) {
                                         if (opt === QUIZ_QUESTIONS[quizIndex].ans) btnClass += "bg-green-100 border-green-300 text-green-800";
                                         else if (opt === quizAnswered) btnClass += "bg-red-50 border-red-200 text-red-700";
                                         else btnClass += "bg-slate-50 border-slate-100 text-slate-400";
                                     } else {
                                         btnClass += "bg-slate-50 border-slate-200 hover:bg-indigo-50 hover:border-indigo-200 text-slate-700";
                                     }
                                     return (
                                         <button key={i} onClick={() => handleQuizOption(opt)} className={btnClass} disabled={!!quizAnswered}>
                                             {opt}
                                             {quizAnswered && opt === QUIZ_QUESTIONS[quizIndex].ans && <CheckCircle size={16} className="float-right text-green-600"/>}
                                         </button>
                                     )
                                 })}
                             </div>
                         </div>

                         {quizAnswered && (
                             <button onClick={nextQuizQuestion} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold transition-colors shadow-md">
                                 {quizIndex < QUIZ_QUESTIONS.length - 1 ? (language === Language.ENGLISH ? "Next Question" : "अगला प्रश्न") : (language === Language.ENGLISH ? "Restart Quiz" : "फिर से शुरू करें")}
                             </button>
                         )}
                     </div>
                 )}

             </div>
         </div>
      </div>
      <style>{`
        @keyframes width-fill { from { width: 0%; } to { width: 100%; } }
        .animate-width-fill { animation-timing-function: linear; }
      `}</style>
    </div>
  );
};
export default Brain;