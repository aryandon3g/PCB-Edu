import React, { useState, useMemo, useEffect } from 'react';
import { Book, ChevronDown, ChevronRight, Check, X, Trophy, List, Play, CheckCircle, Lock, Star, Volume2, ArrowLeft, RotateCcw, SkipForward, ArrowRight } from 'lucide-react';
import { Language } from '../../types';

interface PEProps {
  language: Language;
  isNavVisible?: boolean;
}

// --- SYLLABUS DATA (Same as before) ---
const SYLLABUS = [
  {
    id: 'unit1',
    title: 'Unit I: शारीरिक शिक्षा (Physical Education)',
    color: 'blue',
    content: `
      <div class="space-y-4">
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 class="font-bold text-blue-800 text-lg mb-2">1. अर्थ, परिभाषा, लक्ष्य एवं उद्देश्य</h3>
          <ul class="list-disc pl-5 space-y-1 text-slate-700">
            <li><strong>अर्थ:</strong> शारीरिक शिक्षा वह शिक्षा है जो शारीरिक क्रियाओं के माध्यम से संपूर्ण व्यक्तित्व का विकास करती है।</li>
            <li><strong>लक्ष्य:</strong> शरीर को स्वस्थ, सक्षम और सक्रिय बनाना।</li>
            <li><strong>उद्देश्य:</strong> स्वास्थ्य सुधार, नैतिकता, अनुशासन, समाज में सहयोग और चरित्र निर्माण।</li>
          </ul>
        </div>
        <div class="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <h3 class="font-bold text-blue-800 text-lg mb-2">2. इतिहास (स्वतंत्रता पूर्व एवं उत्तर भारत)</h3>
          <p class="text-slate-700">ब्रिटिश काल से लेकर 'खेलो इंडिया' तक की यात्रा।</p>
        </div>
      </div>
    `
  },
  {
    id: 'unit2',
    title: 'Unit II: पोषण, वजन प्रबंधन एवं जीवन शैली',
    color: 'orange',
    content: `
      <div class="space-y-4">
        <div class="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <h3 class="font-bold text-orange-800 text-lg mb-2">1. पोषण (Nutrition)</h3>
          <ul class="list-disc pl-5 space-y-1 text-slate-700">
            <li><strong>संतुलित आहार:</strong> कार्बोहाइड्रेट, प्रोटीन, वसा, विटामिन, खनिज और जल का सही अनुपात।</li>
            <li><strong>BMI:</strong> वजन (kg) / ऊँचाई² (m²).</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 'unit3',
    title: 'Unit III: योग एवं ध्यान (Yoga)',
    color: 'purple',
    content: `
      <div class="space-y-4">
        <div class="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <h3 class="font-bold text-purple-800 text-lg mb-2">1. अष्टांग योग</h3>
          <p class="text-slate-700">यम, नियम, आसन, प्राणायाम, प्रत्याहार, धारणा, ध्यान, समाधि।</p>
        </div>
      </div>
    `
  },
  {
    id: 'unit4',
    title: 'Unit IV: खेल एवं मनोरंजन (Sports)',
    color: 'green',
    content: `
      <div class="space-y-4">
        <div class="bg-green-50 p-4 rounded-lg border border-green-100">
          <h3 class="font-bold text-green-800 text-lg mb-2">1. खेल और प्राथमिक उपचार</h3>
          <p class="text-slate-700">खेल भावना, मनोरंजन के साधन और RICE (Rest, Ice, Compression, Elevation) तकनीक।</p>
        </div>
      </div>
    `
  }
];

// --- UPDATED QUESTION BANK WITH TRICKY OPTIONS (o) ---
// u: Unit, q: Question, a: Answer, o: Wrong Options (Tricky Distractors)
const ALL_QUESTIONS = [
  // UNIT 1: Physical Education
  {u:1, q:"शारीरिक शिक्षा का मुख्य लक्ष्य क्या है?", a:"सर्वांगीण विकास", o:["केवल शारीरिक विकास", "केवल मानसिक विकास", "खेलकूद में जीतना"]},
  {u:1, q:"‘स्वास्थ्य ही धन है’ यह कथन किस संदर्भ में सर्वाधिक उपयुक्त है?", a:"शारीरिक शिक्षा", o:["अर्थशास्त्र", "राजनीति विज्ञान", "सामाजिक विज्ञान"]},
  {u:1, q:"WHO के अनुसार स्वास्थ्य का अर्थ है?", a:"सम्पूर्ण शारीरिक, मानसिक और सामाजिक कल्याण", o:["बीमारी का न होना", "शारीरिक रूप से फिट होना", "मानसिक तनाव न होना"]},
  {u:1, q:"आधुनिक शारीरिक शिक्षा के जनक कौन माने जाते हैं?", a:"जोहान हेनरिक लिंग", o:["फ्रेडरिक लुडविग जान", "हिप्पोक्रेट्स", "अरस्तु"]},
  {u:1, q:"भारत में शारीरिक शिक्षा को अकादमिक विषय बनाने में किसने योगदान दिया?", a:"हैरी क्रो बक (H.C. Buck)", o:["जी.डी. सोंधी", "दोराबजी टाटा", "जवाहरलाल नेहरू"]},
  {u:1, q:"शारीरिक शिक्षा में ‘फिटनेस’ शब्द का सही तकनीकी अर्थ क्या है?", a:"दैनिक कार्य बिना थकान के करने की क्षमता", o:["सिक्स पैक एब्स होना", "तेज दौड़ने की क्षमता", "बीमार न पड़ना"]},
  {u:1, q:"शारीरिक शिक्षा का दर्शन (Philosophy) मुख्य रूप से किस पर आधारित है?", a:"व्यावहारिकतावाद (Pragmatism)", o:["आदर्शवाद", "यथार्थवाद", "प्रकृतिवाद"]},
  {u:1, q:"‘फेयर प्ले’ (Fair Play) का वास्तविक अर्थ क्या है?", a:"नियमों का पालन और सम्मान", o:["मैच जीतना", "रेफरी से बहस न करना", "धीमी गति से खेलना"]},
  {u:1, q:"शारीरिक शिक्षा और मनोरंजन में मुख्य अंतर क्या है?", a:"उद्देश्य और संरचना", o:["गतिविधि का प्रकार", "समय की अवधि", "उपकरणों का उपयोग"]},
  {u:1, q:"शारीरिक शिक्षा का नारा क्या है?", a:"“स्वस्थ शरीर में स्वस्थ मन”", o:["“खेलो और जीतो”", "“दौड़ना ही जीवन है”", "“योग भगाए रोग”"]},
  {u:1, q:"YMCA कॉलेज ऑफ फिजिकल एजुकेशन की स्थापना कब हुई?", a:"1920", o:["1924", "1932", "1948"]},
  {u:1, q:"शारीरिक शिक्षा शिक्षक के लिए सबसे महत्वपूर्ण गुण क्या है?", a:"नेतृत्व और धैर्य", o:["अच्छा खिलाड़ी होना", "तेज आवाज", "सख्त अनुशासन"]},
  {u:1, q:"“A sound mind in a sound body” (स्वस्थ शरीर में स्वस्थ मन) यह कथन किसका है?", a:"अरस्तु (Aristotle)", o:["प्लेटो", "सुकरात", "रूसो"]},
  {u:1, q:"शारीरिक शिक्षा का 'सामाजिक' उद्देश्य क्या विकसित करना है?", a:"सहयोग और खेल भावना", o:["शारीरिक शक्ति", "तकनीकी कौशल", "व्यक्तिगत रिकॉर्ड"]},
  {u:1, q:"भारत में खेल दिवस 29 अगस्त को क्यों मनाया जाता है?", a:"मेजर ध्यानचंद के जन्मदिवस पर", o:["ओलंपिक पदक जीतने पर", "क्रिकेट विश्व कप जीत पर", "एशियाई खेलों की शुरुआत पर"]},
  {u:1, q:"खेल मनोविज्ञान (Sports Psychology) शारीरिक शिक्षा में क्यों महत्वपूर्ण है?", a:"व्यवहार और प्रदर्शन सुधारने के लिए", o:["चोट ठीक करने के लिए", "आहार योजना बनाने के लिए", "इतिहास जानने के लिए"]},
  {u:1, q:"शारीरिक पुष्टि (Physical Fitness) के कितने मुख्य घटक माने जाते हैं?", a:"5 (शक्ति, गति, सहनशक्ति, लचीलापन, समन्वय)", o:["3 (आहार, निद्रा, व्यायाम)", "2 (दौड़ना, कूदना)", "4 (योग, जिम, खेल, डांस)"]},
  {u:1, q:"शारीरिक शिक्षा में 'Wellness' का क्या अर्थ है?", a:"जीवन की गुणवत्ता और संतुलन", o:["बीमारी का इलाज", "केवल शारीरिक व्यायाम", "मोटापा कम करना"]},
  {u:1, q:"प्राचीन भारत में शारीरिक शिक्षा का मुख्य रूप क्या था?", a:"धनुर्विद्या और कुश्ती", o:["क्रिकेट और फुटबॉल", "हॉकी और बैडमिंटन", "जिमनास्टिक्स"]},
  {u:1, q:"शारीरिक शिक्षा का एक प्रमुख भ्रांति (Misconception) क्या है?", a:"यह केवल खेलने-कूदने का विषय है", o:["यह स्वास्थ्य सुधारता है", "यह अनुशासन सिखाता है", "यह चरित्र निर्माण करता है"]},

  // UNIT 2: Nutrition & Lifestyle
  {u:2, q:"संतुलित आहार (Balanced Diet) का सही अनुपात (कार्बो:प्रोटीन:वसा) लगभग क्या होना चाहिए?", a:"4:1:1", o:["1:1:1", "2:2:1", "3:2:1"]},
  {u:2, q:"1 ग्राम वसा (Fat) से कितनी कैलोरी ऊर्जा मिलती है?", a:"9 कैलोरी", o:["4 कैलोरी", "6 कैलोरी", "12 कैलोरी"]},
  {u:2, q:"1 ग्राम कार्बोहाइड्रेट से कितनी ऊर्जा मिलती है?", a:"4 कैलोरी", o:["9 कैलोरी", "2 कैलोरी", "10 कैलोरी"]},
  {u:2, q:"विटामिन 'C' का रासायनिक नाम क्या है?", a:"एस्कॉर्बिक एसिड", o:["रेटिनॉल", "थायमिन", "कैल्सिफेरॉल"]},
  {u:2, q:"कौन सा विटामिन 'Water Soluble' (जल में घुलनशील) है?", a:"विटामिन B और C", o:["विटामिन A और D", "विटामिन K और E", "विटामिन D और K"]},
  {u:2, q:"BMI (Body Mass Index) का सही फॉर्मूला क्या है?", a:"वजन (kg) / ऊँचाई (m²)", o:["ऊँचाई (cm) / वजन (kg)", "वजन (lbs) / ऊँचाई (inch)", "ऊँचाई (m) / वजन (kg)"]},
  {u:2, q:"यदि किसी का BMI 30 से अधिक है, तो उसे किस श्रेणी में रखा जाएगा?", a:"मोटापा (Obesity)", o:["अधिक वजन (Overweight)", "सामान्य (Normal)", "कम वजन (Underweight)"]},
  {u:2, q:"प्रोटीन की कमी से बच्चों में कौन सा रोग होता है?", a:"क्वाशिओरकर (Kwashiorkor)", o:["रिकेट्स", "स्कर्वी", "बेरी-बेरी"]},
  {u:2, q:"शरीर में आयोडीन की कमी से कौन सी ग्रंथि बढ़ जाती है?", a:"थायरॉयड (Goitre)", o:["पिट्यूटरी", "एड्रिनल", "पैंक्रियाज"]},
  {u:2, q:"रक्त का थक्का (Blood Clotting) जमने के लिए कौन सा विटामिन आवश्यक है?", a:"विटामिन K", o:["विटामिन E", "विटामिन A", "विटामिन C"]},
  {u:2, q:"जीवनशैली से जुड़ी बीमारी (Lifestyle Disease) कौन सी है?", a:"मधुमेह (Diabetes Type 2)", o:["मलेरिया", "टाइफाइड", "चिकन पॉक्स"]},
  {u:2, q:"निर्जलीकरण (Dehydration) से बचने के लिए क्या लेना चाहिए?", a:"ORS का घोल", o:["चाय या कॉफी", "कोल्ड ड्रिंक", "गर्म दूध"]},
  {u:2, q:"'Roughage' (रेशा) आहार में क्यों जरूरी है?", a:"कब्ज रोकने और पाचन के लिए", o:["ऊर्जा प्रदान करने के लिए", "मांसपेशियां बनाने के लिए", "खून बढ़ाने के लिए"]},
  {u:2, q:"सबसे अधिक प्रोटीन किसमें पाया जाता है?", a:"सोयाबीन", o:["अंडा", "दूध", "हरी सब्जियां"]},
  {u:2, q:"तनाव (Stress) का मुख्य शारीरिक प्रभाव क्या है?", a:"कॉर्टिसोल हार्मोन का बढ़ना", o:["इंसुलिन का बढ़ना", "पाचन तेज होना", "नींद अच्छी आना"]},
  {u:2, q:"स्वस्थ रहने के लिए वयस्कों को प्रतिदिन कम से कम कितनी देर व्यायाम करना चाहिए?", a:"30-45 मिनट", o:["10 मिनट", "2 घंटे", "5 मिनट"]},
  {u:2, q:"रतौंधी (Night Blindness) किस विटामिन की कमी से होता है?", a:"विटामिन A", o:["विटामिन B", "विटामिन C", "विटामिन D"]},
  {u:2, q:"हड्डियों की मजबूती के लिए कौन सा खनिज (Mineral) सबसे जरूरी है?", a:"कैल्शियम और फास्फोरस", o:["आयरन और आयोडीन", "सोडियम और पोटैशियम", "जिंक और मैग्नीशियम"]},
  {u:2, q:"मोटापा (Obesity) मापने का सबसे सामान्य तरीका क्या है?", a:"BMI", o:["रक्तचाप", "हृदय गति", "लचीलापन परीक्षण"]},
  {u:2, q:"वसा (Fat) में घुलनशील विटामिन कौन से हैं?", a:"A, D, E, K", o:["B, C", "B Complex", "C, D, E"]},

  // UNIT 3: Yoga
  {u:3, q:"पतंजलि योगसूत्र में योग के कितने अंग (Limbs) बताए गए हैं?", a:"8 (अष्टांग)", o:["6 (षडांग)", "4 (चतुरंग)", "10 (दशांग)"]},
  {u:3, q:"'योगश्चित्तवृत्तिनिरोधः' (चित्त की वृत्तियों का निरोध ही योग है) - यह परिभाषा किसकी है?", a:"महर्षि पतंजलि", o:["महर्षि वेद व्यास", "स्वामी विवेकानंद", "बाबा रामदेव"]},
  {u:3, q:"अष्टांग योग का चौथा अंग कौन सा है?", a:"प्राणायाम", o:["आसन", "प्रत्याहार", "नियम"]},
  {u:3, q:"'यम' (Yama) के अंतर्गत कितने सामाजिक अनुशासन आते हैं?", a:"5 (अहिंसा, सत्य, अस्तेय, ब्रह्मचर्य, अपरिग्रह)", o:["3 (तप, स्वाध्याय, ईश्वर प्रणिधान)", "4 (मैत्री, करुणा, मुदिता, उपेक्षा)", "6 (शौच, संतोष, तप, आदि)"]},
  {u:3, q:"किस आसन को 'आसनों का राजा' (King of Asanas) कहा जाता है?", a:"शीर्षासन", o:["पद्मासन", "सर्वांगासन", "सूर्य नमस्कार"]},
  {u:3, q:"सूर्य नमस्कार में कुल कितने चरण (Steps) होते हैं?", a:"12", o:["10", "14", "8"]},
  {u:3, q:"'प्राणायाम' शब्द में 'आयाम' का क्या अर्थ है?", a:"नियंत्रण या विस्तार", o:["सांस लेना", "सांस छोड़ना", "तेजी से सांस लेना"]},
  {u:3, q:"कपालभाति वास्तव में क्या है?", a:"एक शुद्धि क्रिया (Shatkarma)", o:["एक प्राणायाम", "एक आसन", "एक ध्यान विधि"]},
  {u:3, q:"मधुमेह (Diabetes) रोगियों के लिए कौन सा आसन सबसे लाभकारी माना जाता है?", a:"मंडूकासन", o:["शवासन", "ताड़ासन", "गरुड़ासन"]},
  {u:3, q:"पीठ दर्द के लिए कौन सा आसन वर्जित (मना) है?", a:"आगे झुकने वाले आसन (जैसे पादहस्तासन)", o:["भुजंगासन", "मकरासन", "मर्कटासन"]},
  {u:3, q:"अंतर्राष्ट्रीय योग दिवस (International Yoga Day) पहली बार कब मनाया गया?", a:"21 जून 2015", o:["21 जून 2014", "21 जून 2016", "21 जून 2000"]},
  {u:3, q:"'समाधि' से ठीक पहले की अवस्था कौन सी है?", a:"ध्यान (Dhyana)", o:["धारणा (Dharana)", "प्रत्याहार (Pratyahara)", "आसन (Asana)"]},
  {u:3, q:"ध्यान (Meditation) का मुख्य उद्देश्य क्या है?", a:"चित्त की एकाग्रता और शांति", o:["नींद आना", "भविष्य देखना", "शारीरिक व्यायाम"]},
  {u:3, q:"'त्राटक' (Trataka) क्रिया का संबंध किससे है?", a:"आंखों की रोशनी और एकाग्रता से", o:["पेट की सफाई से", "सांस की नली की सफाई से", "कागों की सफाई से"]},
  {u:3, q:"भोजन के तुरंत बाद कौन सा एकमात्र आसन किया जा सकता है?", a:"वज्रासन", o:["पद्मासन", "सुखासन", "सिद्धासन"]},
  {u:3, q:"'पूरक' का अर्थ क्या है?", a:"सांस अंदर लेना (Inhalation)", o:["सांस बाहर छोड़ना (Exhalation)", "सांस रोकना (Retention)", "तेजी से सांस लेना"]},
  {u:3, q:"'कुम्भक' का अर्थ क्या है?", a:"सांस को रोकना", o:["सांस लेना", "सांस छोड़ना", "पेट हिलाना"]},
  {u:3, q:"इनमें से कौन सा 'नियम' का भाग है?", a:"संतोष", o:["अहिंसा", "सत्य", "अस्तेय"]},
  {u:3, q:"शवासन किस प्रकार का आसन है?", a:"विश्रामात्मक आसन (Relaxative)", o:["ध्यानात्मक आसन", "संवर्धनात्मक आसन", "संतुलन आसन"]},
  {u:3, q:"योग का जन्मदाता देश कौन सा है?", a:"भारत", o:["नेपाल", "चीन", "अमेरिका"]},

  // UNIT 4: Sports & First Aid
  {u:4, q:"खेल चोटों के इलाज के लिए 'RICE' का पूर्ण रूप क्या है?", a:"Rest, Ice, Compression, Elevation", o:["Rest, Ice, Care, Exercise", "Run, Ice, Cold, Elevation", "Rest, Ibuprofen, Cold, Exercise"]},
  {u:4, q:"मोच (Sprain) शरीर के किस भाग में होती है?", a:"लिगामेंट (Ligament)", o:["हड्डी (Bone)", "टेंडन (Tendon)", "त्वचा (Skin)"]},
  {u:4, q:"खिंचाव (Strain) का संबंध किससे है?", a:"मांसपेशियों या टेंडन से", o:["हड्डियों से", "जोड़ों से", "सिर से"]},
  {u:4, q:"प्राथमिक चिकित्सा (First Aid) का स्वर्ण नियम (Golden Rule) क्या है?", a:"सबसे पहले खुद को सुरक्षित रखें फिर मदद करें", o:["तुरंत पानी पिलाएं", "भीड़ जमा करें", "दवा दें"]},
  {u:4, q:"CPR का पूर्ण रूप क्या है?", a:"Cardiopulmonary Resuscitation", o:["Cardiac Pulse Rate", "Common Pulse Revival", "Cardio Pressure Relief"]},
  {u:4, q:"खेल में 'डोपिंग' (Doping) का क्या अर्थ है?", a:"प्रतिबंधित दवाओं का सेवन", o:["खेल के नियम तोड़ना", "रेफरी से बहस करना", "मैच हार जाना"]},
  {u:4, q:"राजीव गांधी खेल रत्न (अब मेजर ध्यानचंद खेल रत्न) पुरस्कार सबसे पहले किसे मिला?", a:"विश्वनाथन आनंद", o:["सचिन तेंदुलकर", "कपिल देव", "पी.टी. उषा"]},
  {u:4, q:"ओलंपिक ध्वज में कितने छल्ले (Rings) होते हैं?", a:"5 (पाँच)", o:["4 (चार)", "6 (छह)", "7 (सात)"]},
  {u:4, q:"एथलेटिक्स में 'स्प्रिंट' (Sprint) दौड़ कौन सी है?", a:"100 मीटर, 200 मीटर", o:["800 मीटर", "1500 मीटर", "मैराथन"]},
  {u:4, q:"हड्डी टूटने (Fracture) पर प्राथमिक उपचार क्या होना चाहिए?", a:"अंग को हिलाएं नहीं और सहारा (Splint) दें", o:["मालिश करें", "गर्म पानी डालें", "खींच कर सीधा करें"]},
  {u:4, q:"सांप के काटने पर क्या नहीं करना चाहिए?", a:"कट लगाना और खून चूसना", o:["व्यक्ति को शांत रखना", "हिलने-डुलने से रोकना", "अस्पताल ले जाना"]},
  {u:4, q:"नाक से खून बहने (Epistaxis) पर सिर को किस स्थिति में रखना चाहिए?", a:"आगे की ओर झुकाकर", o:["पीछे की ओर झुकाकर", "लेट कर", "दाहिनी ओर मोड़कर"]},
  {u:4, q:"खेल भावना (Sportsmanship) का असली परीक्षण कब होता है?", a:"हारने पर व्यवहार में", o:["जीतने पर जश्न में", "प्रैक्टिस के दौरान", "वार्म-अप में"]},
  {u:4, q:"'नॉकआउट' टूर्नामेंट का मुख्य नुकसान क्या है?", a:"अच्छी टीम एक मैच हारकर बाहर हो सकती है", o:["यह बहुत लंबा चलता है", "यह बहुत महंगा है", "इसमें कम मैच होते हैं"]},
  {u:4, q:"वॉलीबॉल टीम में एक समय में कितने खिलाड़ी खेलते हैं?", a:"6", o:["5", "7", "11"]},
  {u:4, q:"भारत का राष्ट्रीय खेल आधिकारिक तौर पर क्या है?", a:"कोई नहीं (हॉकी माना जाता है पर घोषित नहीं)", o:["हॉकी", "क्रिकेट", "कबड्डी"]},
  {u:4, q:"खेलों में 'WADA' का क्या कार्य है?", a:"डोपिंग को नियंत्रित करना", o:["नियम बनाना", "प्रायोजक ढूँढना", "टिकट बेचना"]},
  {u:4, q:"अगर किसी के कपड़ों में आग लग जाए, तो सबसे पहले क्या करें?", a:"रुकें, लेटें और लुढ़कें (Stop, Drop, Roll)", o:["भागें", "पानी डालें", "कपड़े उतारें"]},
  {u:4, q:"मनोरंजन (Recreation) का मुख्य उद्देश्य क्या है?", a:"खोई हुई ऊर्जा पुनः प्राप्त करना", o:["समय बर्बाद करना", "पैसे कमाना", "प्रतियोगिता जीतना"]},
  {u:4, q:"क्रिकेट पिच की लंबाई कितनी होती है?", a:"22 गज (Yards)", o:["20 गज", "24 गज", "18 गज"]},
];

interface QuizSet {
  id: string;
  name: string;
  questions: any[];
  isLocked: boolean;
  score: number | null;
}

const PhysicalEducation: React.FC<PEProps> = ({ language, isNavVisible }) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'quiz'>('notes');
  const [expandedUnit, setExpandedUnit] = useState<string | null>('unit1');
  
  // Progress State
  const [progress, setProgress] = useState<Record<string, number>>({});
  
  // Quiz Mode State
  const [activeQuizSet, setActiveQuizSet] = useState<QuizSet | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({}); 
  const [historyOptions, setHistoryOptions] = useState<Record<number, string[]>>({});
  const [showResult, setShowResult] = useState(false);
  const [currentOptions, setCurrentOptions] = useState<string[]>([]);

  // Sound Effects (Keep existing logic)
  const playSound = (type: 'correct' | 'wrong' | 'complete') => {
    let url = "";
    if (type === 'correct') url = "https://assets.mixkit.co/sfx/preview/mixkit-correct-answer-tone-2870.mp3";
    else if (type === 'wrong') url = "https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-fail-notification-946.mp3";
    else if (type === 'complete') url = "https://assets.mixkit.co/sfx/preview/mixkit-winning-chimes-2015.mp3";
    
    if(url) {
      const audio = new Audio(url);
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Audio play failed", e));
    }
  };

  const toggleDetails = (id: string) => {
    setExpandedUnit(expandedUnit === id ? null : id);
  };

  // --- QUIZ LOGIC HELPERS ---
  
  const questionsByUnit = useMemo(() => {
    const grouped: Record<number, any[]> = { 1: [], 2: [], 3: [], 4: [] };
    ALL_QUESTIONS.forEach(q => {
      if(grouped[q.u]) grouped[q.u].push(q);
    });
    return grouped;
  }, []);

  const getSetsForUnit = (unitId: number) => {
    const unitQs = questionsByUnit[unitId] || [];
    const sets: QuizSet[] = [];
    const chunkSize = 10; // Reduced to 10 for better user experience per set
    
    for (let i = 0; i < unitQs.length; i += chunkSize) {
      const chunk = unitQs.slice(i, i + chunkSize);
      const setId = `unit${unitId}-set${i/chunkSize}`;
      
      const prevSetId = `unit${unitId}-set${(i/chunkSize) - 1}`;
      const isLocked = i > 0 && progress[prevSetId] === undefined;

      sets.push({
        id: setId,
        name: `Set ${Math.floor(i/chunkSize) + 1}`,
        questions: chunk,
        isLocked: isLocked,
        score: progress[setId] ?? null
      });
    }
    return sets;
  };

  // --- UPDATED GENERATE OPTIONS LOGIC ---
  const generateOptions = (question: any, unitId: number) => {
    // Priority 1: Check if manual tricky options (o) exist in data
    if (question.o && Array.isArray(question.o) && question.o.length > 0) {
        // Take the specific tricky options and the correct answer
        const specificOptions = [...question.o, question.a];
        // Shuffle them
        return specificOptions.sort(() => 0.5 - Math.random());
    }

    // Priority 2: Fallback to Random Shuffle (Old Logic)
    // Only happens if 'o' is missing from the data
    const allUnitAnswers = questionsByUnit[unitId].map(q => q.a).filter(a => a !== question.a);
    const wrong = allUnitAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);
    return [...wrong, question.a].sort(() => 0.5 - Math.random());
  };

  const startQuiz = (set: QuizSet, unitId: number) => {
    setActiveQuizSet(set);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setHistoryOptions({}); 
    setShowResult(false);
    
    const opts = generateOptions(set.questions[0], unitId);
    setHistoryOptions({ 0: opts });
    setCurrentOptions(opts);
  };

  const handleAnswer = (option: string) => {
    if (!activeQuizSet) return;
    
    setUserAnswers(prev => ({...prev, [currentQuestionIndex]: option}));
    const isCorrect = activeQuizSet.questions[currentQuestionIndex].a === option;
    if (isCorrect) playSound('correct'); else playSound('wrong');
  };

  const handleNext = () => {
    if (!activeQuizSet) return;

    if (currentQuestionIndex < activeQuizSet.questions.length - 1) {
       const nextIdx = currentQuestionIndex + 1;
       setCurrentQuestionIndex(nextIdx);
       
       if (!historyOptions[nextIdx]) {
           const unitId = parseInt(activeQuizSet.id.split('-')[0].replace('unit',''));
           const opts = generateOptions(activeQuizSet.questions[nextIdx], unitId);
           setHistoryOptions(prev => ({...prev, [nextIdx]: opts}));
           setCurrentOptions(opts);
       } else {
           setCurrentOptions(historyOptions[nextIdx]);
       }
    } else {
       finishQuiz();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
        const prevIdx = currentQuestionIndex - 1;
        setCurrentQuestionIndex(prevIdx);
        setCurrentOptions(historyOptions[prevIdx]);
    }
  };

  const handleSkip = () => {
    handleNext(); 
  };

  const finishQuiz = () => {
    if(!activeQuizSet) return;
    
    let correctCount = 0;
    activeQuizSet.questions.forEach((q, idx) => {
        if (userAnswers[idx] === q.a) {
            correctCount++;
        }
    });

    setShowResult(true);
    playSound('complete');
    
    const percentage = Math.round((correctCount / activeQuizSet.questions.length) * 100);
    
    setProgress(prev => ({
      ...prev,
      [activeQuizSet.id]: percentage
    }));
  };

  const exitQuiz = () => {
    setActiveQuizSet(null);
  };

  const getUnitProgress = (unitId: number) => {
    const sets = getSetsForUnit(unitId);
    if(sets.length === 0) return 0;
    const completedCount = sets.filter(s => s.score !== null).length;
    return Math.round((completedCount / sets.length) * 100);
  };

  const selectedOption = userAnswers[currentQuestionIndex];

  return (
    <div className="flex flex-col h-full bg-slate-50 relative font-sans">
      
      {/* Header Tabs */}
      {(isNavVisible ?? true) && (
        <header className="bg-green-700 text-white shadow-md flex-shrink-0 rounded-t-xl overflow-hidden animate-fade-in">
            <div className="px-4 py-3 flex justify-between items-center">
                <h1 className="text-lg font-bold flex items-center gap-2">
                    PE & Yoga <span className="text-xs bg-green-800 px-2 py-1 rounded">Z040401</span>
                </h1>
            </div>
            <div className="flex overflow-x-auto bg-green-800 text-green-100">
                <button 
                    onClick={() => setActiveTab('notes')}
                    className={`flex-1 py-3 px-4 hover:bg-green-600 transition flex flex-col items-center gap-1 ${activeTab === 'notes' ? 'bg-green-600 border-b-4 border-white' : 'border-b-4 border-transparent'}`}
                >
                    <Book size={18} />
                    <span className="text-sm font-medium">पाठ्यक्रम (Syllabus)</span>
                </button>
                <button 
                    onClick={() => setActiveTab('quiz')}
                    className={`flex-1 py-3 px-4 hover:bg-green-600 transition flex flex-col items-center gap-1 ${activeTab === 'quiz' ? 'bg-green-600 border-b-4 border-white' : 'border-b-4 border-transparent'}`}
                >
                    <List size={18} />
                    <span className="text-sm font-medium">अभ्यास (Practice)</span>
                </button>
            </div>
        </header>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-20 bg-gray-50 relative custom-scrollbar">
        
        {/* VIEW 1: SYLLABUS NOTES */}
        {activeTab === 'notes' && (
            <div className="space-y-4 max-w-4xl mx-auto animate-fade-in">
                {SYLLABUS.map(unit => {
                    const isOpen = expandedUnit === unit.id;
                    const color = unit.color;
                    return (
                        <div key={unit.id} className={`bg-white rounded-lg shadow-sm border-l-4 border-${color}-500 overflow-hidden`}>
                             <div 
                                onClick={() => toggleDetails(unit.id)}
                                className={`p-4 bg-${color}-50 font-bold text-${color}-800 flex justify-between cursor-pointer items-center`}
                             >
                                 <div className="flex items-center gap-3">
                                     <span>{unit.title}</span> 
                                 </div>
                                 {isOpen ? <ChevronDown size={20}/> : <ChevronRight size={20}/>}
                             </div>
                             {isOpen && (
                                 <div className="p-5 text-sm space-y-2 text-slate-700 bg-white border-t border-slate-100 leading-relaxed" dangerouslySetInnerHTML={{__html: unit.content}}></div>
                             )}
                        </div>
                    )
                })}
            </div>
        )}

        {/* VIEW 2: QUIZ SETS */}
        {activeTab === 'quiz' && !activeQuizSet && (
            <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
                {SYLLABUS.map((unit, idx) => {
                    const unitId = idx + 1;
                    const sets = getSetsForUnit(unitId);
                    const unitProgress = getUnitProgress(unitId);
                    const isUnitComplete = unitProgress === 100;

                    return (
                        <div key={unit.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                            {/* Unit Header */}
                            <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg">{unit.title}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${unitProgress}%` }}></div>
                                        </div>
                                        <span className="text-xs text-slate-500 font-bold">{unitProgress}% Done</span>
                                    </div>
                                </div>
                                {isUnitComplete && <Trophy className="text-yellow-500" size={24} />}
                            </div>

                            {/* Sets Grid */}
                            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {sets.map((set) => (
                                    <button
                                        key={set.id}
                                        onClick={() => !set.isLocked && startQuiz(set, unitId)}
                                        disabled={set.isLocked}
                                        className={`relative p-4 rounded-xl border-2 text-left transition-all group ${
                                            set.isLocked 
                                                ? 'bg-slate-50 border-slate-200 opacity-70 cursor-not-allowed' 
                                                : set.score !== null 
                                                    ? 'bg-green-50 border-green-200 hover:border-green-300'
                                                    : 'bg-white border-indigo-100 hover:border-indigo-300 hover:shadow-md'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                                                set.score !== null ? 'bg-green-200 text-green-800' : 'bg-indigo-100 text-indigo-700'
                                            }`}>
                                                {set.name}
                                            </span>
                                            {set.isLocked ? (
                                                <Lock size={16} className="text-slate-400" />
                                            ) : set.score !== null ? (
                                                <div className="flex text-yellow-500">
                                                    {[1,2,3].map(s => <Star key={s} size={12} fill={set.score! > s*30 ? "currentColor" : "none"} />)}
                                                </div>
                                            ) : (
                                                <Play size={20} className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            )}
                                        </div>
                                        
                                        <div className="text-sm font-semibold text-slate-700 mb-1">
                                            {set.questions.length} Questions
                                        </div>
                                        
                                        {set.score !== null && (
                                            <div className="text-xs font-bold text-green-700">
                                                Best Score: {set.score}%
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        )}

        {/* VIEW 3: ACTIVE QUIZ */}
        {activeTab === 'quiz' && activeQuizSet && (
            <div className="max-w-2xl mx-auto h-full flex flex-col animate-fade-in relative">
                {/* Quiz Header */}
                <div className="flex items-center justify-between mb-6">
                    <button onClick={exitQuiz} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <ArrowLeft className="text-slate-600" />
                    </button>
                    <div className="flex-1 mx-4">
                        <div className="flex justify-between text-xs font-bold text-slate-500 mb-1">
                            <span>Question {currentQuestionIndex + 1}/{activeQuizSet.questions.length}</span>
                            <span>{activeQuizSet.name}</span>
                        </div>
                        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-indigo-600 transition-all duration-300"
                                style={{ width: `${((currentQuestionIndex + 1) / activeQuizSet.questions.length) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                {!showResult ? (
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 flex-1 flex flex-col overflow-y-auto">
                        <div className="flex-1 flex flex-col justify-start min-h-0">
                             {/* Question Box */}
                             <div className="bg-indigo-50 p-6 rounded-xl border border-indigo-100 mb-8">
                                <h2 className="text-xl md:text-2xl font-bold text-indigo-900 leading-snug">
                                     {activeQuizSet.questions[currentQuestionIndex].q}
                                </h2>
                             </div>
                             
                             <div className="space-y-3 mb-6">
                                 {currentOptions.map((opt, idx) => {
                                     let btnClass = "w-full text-left p-4 rounded-xl border-2 font-medium transition-all duration-200 relative ";
                                     
                                     if (selectedOption) {
                                       if (opt === activeQuizSet.questions[currentQuestionIndex].a) {
                                            btnClass += "bg-green-100 border-green-500 text-green-800"; // Correct
                                       } else if (opt === selectedOption) {
                                            btnClass += "bg-red-50 border-red-400 text-red-700"; // Wrong selected
                                       } else {
                                            btnClass += "bg-slate-50 border-slate-100 text-slate-400 opacity-60"; // Others
                                       }
                                     } else {
                                          btnClass += "bg-white border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 text-slate-700 hover:shadow-md";
                                     }

                                     return (
                                       <button 
                                            key={idx} 
                                            onClick={() => handleAnswer(opt)}
                                            disabled={!!selectedOption}
                                            className={btnClass}
                                       >
                                            {opt}
                                            {selectedOption && opt === activeQuizSet.questions[currentQuestionIndex].a && (
                                                 <Check className="absolute right-4 top-1/2 -translate-y-1/2 text-green-600" size={20} />
                                            )}
                                            {selectedOption && opt === selectedOption && opt !== activeQuizSet.questions[currentQuestionIndex].a && (
                                                 <X className="absolute right-4 top-1/2 -translate-y-1/2 text-red-600" size={20} />
                                            )}
                                       </button>
                                     )
                                 })}
                             </div>
                             
                             {/* Navigation Controls */}
                             <div className="grid grid-cols-3 gap-3 mt-auto">
                                 <button 
                                     onClick={handlePrev} 
                                     disabled={currentQuestionIndex === 0}
                                     className="py-3 px-4 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                 >
                                     <ArrowLeft size={18}/> Prev
                                 </button>
                                 
                                 <button 
                                     onClick={handleSkip}
                                     disabled={!!selectedOption}
                                     className="py-3 px-4 rounded-xl font-bold bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                 >
                                     Skip <SkipForward size={18}/>
                                 </button>

                                 <button 
                                     onClick={handleNext}
                                     className="py-3 px-4 rounded-xl font-bold bg-indigo-600 text-white hover:bg-indigo-700 flex items-center justify-center gap-2 shadow-md"
                                 >
                                     {currentQuestionIndex < activeQuizSet.questions.length - 1 ? (
                                         <>Next <ArrowRight size={18}/></>
                                     ) : (
                                         <>Finish <Trophy size={18}/></>
                                     )}
                                 </button>
                             </div>

                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8 text-center flex-1 flex flex-col items-center justify-center animate-scale-up">
                        
                        {(() => {
                           let correctCount = 0;
                           activeQuizSet.questions.forEach((q, idx) => {
                               if (userAnswers[idx] === q.a) correctCount++;
                           });
                           const percentage = Math.round((correctCount / activeQuizSet.questions.length) * 100);
                           
                           return (
                               <>
                                   <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center mb-6 text-yellow-500 shadow-inner">
                                        <Trophy size={48} />
                                   </div>
                                   <h2 className="text-3xl font-bold text-slate-800 mb-2">Set Completed!</h2>
                                   <div className="text-5xl font-black text-indigo-600 mb-2">{percentage}%</div>
                                   <p className="text-slate-500 mb-8">You got {correctCount} out of {activeQuizSet.questions.length} correct.</p>
                               </>
                           )
                        })()}

                        <div className="flex gap-4 w-full">
                            <button onClick={() => startQuiz(activeQuizSet, parseInt(activeQuizSet.id.split('-')[0].replace('unit','')))} className="flex-1 py-3 border-2 border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 flex items-center justify-center gap-2">
                                <RotateCcw size={18}/> Retry
                            </button>
                            <button onClick={exitQuiz} className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 flex items-center justify-center gap-2">
                                Continue <ChevronRight size={18}/>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        )}

      </main>
      <style>{`
        .animate-fade-in { animation: fadeIn 0.4s ease-out; }
        .animate-scale-up { animation: scaleUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .animate-bounce-in { animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes scaleUp { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
        @keyframes bounceIn { from { opacity: 0; transform: scale(0.8); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
};

export default PhysicalEducation;