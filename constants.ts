import { Language, Subject, TranslationDictionary } from './types';

export const TRANSLATIONS: TranslationDictionary = {
  appTitle: {
    en: "VigyanScope",
    hi: "विज्ञानस्कोप"
  },
  physics: {
    en: "Physics",
    hi: "भौतिक विज्ञान"
  },
  chemistry: {
    en: "Chemistry",
    hi: "रसायन विज्ञान"
  },
  biology: {
    en: "Biology",
    hi: "जीव विज्ञान"
  },
  lado: {
    en: "Lado",
    hi: "लाडो"
  },
  dashboard: {
    en: "Experiments Dashboard",
    hi: "प्रयोगशाला डैशबोर्ड"
  },
  selectTopic: {
    en: "Select an Experiment",
    hi: "एक प्रयोग चुनें"
  },
  backToTopics: {
    en: "Back to Topics",
    hi: "विषयों पर वापस"
  },
  // Controls
  zoomLevel: { en: "Zoom Level", hi: "ज़ूम स्तर" },
  temperature: { en: "Temperature", hi: "तापमान" },
  gravity: { en: "Gravity", hi: "गुरुत्वाकर्षण" },
  friction: { en: "Friction", hi: "घर्षण" },
  length: { en: "Length", hi: "लंबाई" },
  concentration: { en: "Concentration", hi: "सांद्रता" },
  velocity: { en: "Velocity", hi: "वेग" },
  angle: { en: "Angle", hi: "कोण" },
  phLevel: { en: "pH Level", hi: "pH स्तर" },
  basePairs: { en: "Base Pairs", hi: "बेस पेअर" },
  
  // Actions
  reset: { en: "Reset", hi: "रीसेट करें" },
  start: { en: "Start", hi: "शुरू करें" },
  stop: { en: "Stop", hi: "रुकें" },
  fire: { en: "Fire", hi: "फायर करें" },
  clickToExplore: { en: "Tap parts to explore", hi: "जानने के लिए अंगों पर क्लिक करें" },
  exploreInside: { en: "Zoom Inside", hi: "अंदर देखें" },
  goBack: { en: "Zoom Out", hi: "बाहर जाएं" },
  speed: { en: "Speed", hi: "गति" },
  slow: { en: "Slow", hi: "धीमी" },
  normal: { en: "Normal", hi: "सामान्य" },
  fast: { en: "Fast", hi: "तेज़" },
  quizMode: { en: "Quiz Mode", hi: "क्विज़ मोड" },
  submit: { en: "Submit", hi: "जमा करें" },
  next: { en: "Next", hi: "अगला" },
  score: { en: "Score", hi: "अंक" },

  // Topic Specific
  pendulum: { en: "Pendulum Motion", hi: "लोलक की गति" },
  reactionRate: { en: "Reaction Rate", hi: "प्रतिक्रिया दर" },
  projectile: { en: "Projectile Motion", hi: "प्रक्षेप्य गति" },
  phScale: { en: "pH Scale", hi: "pH पैमाना" },
  dnaStructure: { en: "DNA Structure", hi: "डीएनए संरचना" },
  plantCell: { en: "Plant Cell Model", hi: "पादप कोशिका मॉडल" },
  animalCell: { en: "Animal Cell Model", hi: "जंतु कोशिका मॉडल" },
  photosynthesis: { en: "Photosynthesis Lab", hi: "प्रकाश संश्लेषण लैब" },
  heart: { en: "Human Heart", hi: "मानव हृदय" },
  brain: { en: "Human Brain", hi: "मानव मस्तिष्क" },
  peYoga: { en: "PE & Yoga", hi: "शारीरिक शिक्षा और योग" },
  blood: { en: "Blood & Circulation", hi: "रक्त और परिसंचरण" },
  respiratory: { en: "Respiratory System", hi: "श्वसन तंत्र" },
  vitamins: { en: "Vitamins: Life Controllers", hi: "विटामिन: जीवन के नियंत्रक" },
  humanDiseases: { en: "Human Diseases", hi: "मानव रोग" },
  reproduction: { en: "Reproduction System", hi: "प्रजनन तंत्र" },
  glands: { en: "Glands & Hormones", hi: "ग्रंथियां और हार्मोन" },
  skeleton: { en: "Skeletal System", hi: "कंकाल प्रणाली" },
  
  // Skeleton Specific
  bones: { en: "Bones", hi: "हड्डियाँ" },
  cartilage: { en: "Cartilage", hi: "उपास्थि" },
  tendons: { en: "Tendons", hi: "टेंडन" },
  ligaments: { en: "Ligaments", hi: "स्नायुबंधन" },
  framework: { en: "Central Framework", hi: "केंद्रीय ढाँचा" },

  // Glands Specific
  exocrine: { en: "Exocrine (Pipeline)", hi: "बहिःस्रावी (पाइपलाइन)" },
  endocrine: { en: "Endocrine (Wireless)", hi: "अंतःस्रावी (वायरलेस)" },
  mixedGland: { en: "Mixed Gland", hi: "मिश्रित ग्रंथि" },
  glucoseBalance: { en: "Glucose Balance", hi: "ग्लूकोज संतुलन" },
  bioClock: { en: "Biological Clock", hi: "जैविक घड़ी" },
  emergencyRush: { en: "Emergency (3F)", hi: "आपातकाल (3F)" },
  
  // Reproduction Specific
  reproStory: { en: "Life's Copy: The Journey", hi: "जीवन की प्रतिलिपि: यात्रा" },
  maleSystem: { en: "Male Workshop", hi: "पुरुष प्रणाली" },
  fusion: { en: "Life Fusion", hi: "जीवन का संलयन" },
  gestation: { en: "Gestation & Arrival", hi: "गर्भावधि और आगमन" },
  familyPlanning: { en: "Family Planning", hi: "परिवार नियोजन" },
  
  // Biology specific
  nucleus: { en: "Nucleus", hi: "केंद्रक (Nucleus)" },
  mitochondria: { en: "Mitochondria", hi: "सूत्रकणिका (Mitochondria)" },
  chloroplast: { en: "Chloroplast", hi: "हरितलवक (Chloroplast)" },
  vacuole: { en: "Vacuole", hi: "रिक्तिका (Vacuole)" },
  cellWall: { en: "Cell Wall", hi: "कोशिका भित्ति" },
  lysosome: { en: "Lysosome", hi: "लियनकाय (Lysosome)" },
  centriole: { en: "Centriole", hi: "तारककेंद्र (Centriole)" },
  cellMembrane: { en: "Cell Membrane", hi: "कोशिका झिल्ली" },
  chromatin: { en: "Chromatin (DNA)", hi: "क्रोमैटिन (DNA)" },
  nucleolus: { en: "Nucleolus", hi: "केंद्रिका (Nucleolus)" },
  nuclearPore: { en: "Nuclear Pore", hi: "केंद्रक छिद्र" },
  
  lightIntensity: { en: "Light Intensity", hi: "प्रकाश की तीव्रता" },
  co2Level: { en: "CO2 Level", hi: "CO2 स्तर" },
  waterLevel: { en: "Water Level", hi: "जल स्तर" },
  productionRate: { en: "Sugar Production", hi: "शर्करा उत्पादन" },
  infiniteZoom: { en: "Infinite Zoom", hi: "अनंत ज़ूम" },
};

export const SUBJECT_ICONS = {
  [Subject.PHYSICS]: "🚀",
  [Subject.CHEMISTRY]: "🧪",
  [Subject.BIOLOGY]: "🧬",
  [Subject.LADO]: "🧘"
};