
import { Deck, Difficulty } from './types';
import { Brain, Briefcase, Plane, Sparkles, GraduationCap } from 'lucide-react';

export const DECKS: Deck[] = [
  {
    id: 'sophisticated',
    title: 'Daily Sophistication',
    description: 'Elevate your daily conversation.',
    icon: Sparkles,
    color: 'violet',
    words: [
      {
        id: '1',
        term: 'Serendipity',
        pronunciation: '/ˌser.ənˈdɪp.ə.ti/',
        definition: { en: 'Finding something good without looking for it.', hi: 'अचानक मिला हुआ सौभाग्य' },
        example: 'Meeting my childhood friend in Paris was pure serendipity.',
        synonyms: ['Chance', 'Luck'],
        antonyms: ['Misfortune'],
        difficulty: Difficulty.MEDIUM
      },
      {
        id: '2',
        term: 'Ephemeral',
        pronunciation: '/ɪˈfem.ər.əl/',
        definition: { en: 'Lasting for a very short time.', hi: 'क्षणिक / अल्पकालिक' },
        example: 'Fashions are ephemeral, changing with every season.',
        synonyms: ['Fleeting', 'Transient'],
        antonyms: ['Eternal', 'Permanent'],
        difficulty: Difficulty.HARD
      },
      {
        id: '3',
        term: 'Ubiquitous',
        pronunciation: '/juːˈbɪk.wɪ.təs/',
        definition: { en: 'Present, appearing, or found everywhere.', hi: 'सर्वव्यापी' },
        example: 'Smartphones have become ubiquitous in modern life.',
        synonyms: ['Omnipresent', 'Pervasive'],
        antonyms: ['Rare', 'Scarce'],
        difficulty: Difficulty.HARD
      }
    ]
  },
  {
    id: 'academic',
    title: 'Academic & GRE',
    description: 'Words for scholars and test takers.',
    icon: GraduationCap,
    color: 'indigo',
    words: [
      {
        id: '4',
        term: 'Pragmatic',
        pronunciation: '/præɡˈmæt.ɪk/',
        definition: { en: 'Dealing with things sensibly and realistically.', hi: 'व्यावहारिक' },
        example: 'We need a pragmatic solution, not just theories.',
        synonyms: ['Practical', 'Realistic'],
        antonyms: ['Idealistic'],
        difficulty: Difficulty.MEDIUM
      },
      {
        id: '5',
        term: 'Cacophony',
        pronunciation: '/kəˈkɒf.ə.ni/',
        definition: { en: 'A harsh, discordant mixture of sounds.', hi: 'कोलाहल / शोरगुल' },
        example: 'The classroom erupted into a cacophony of shouts.',
        synonyms: ['Din', 'Racket'],
        antonyms: ['Harmony', 'Silence'],
        difficulty: Difficulty.HARD
      }
    ]
  },
  {
    id: 'business',
    title: 'Business Elite',
    description: 'Impress in the boardroom.',
    icon: Briefcase,
    color: 'emerald',
    words: [
      {
        id: '6',
        term: 'Synergy',
        pronunciation: '/ˈsɪn.ə.dʒi/',
        definition: { en: 'Interaction producing a combined effect greater than the sum.', hi: 'तालमेल / सहक्रिया' },
        example: 'The synergy between the two teams boosted profits.',
        synonyms: ['Cooperation', 'Alliance'],
        antonyms: ['Conflict'],
        difficulty: Difficulty.MEDIUM
      },
      {
        id: '7',
        term: 'Paradigm',
        pronunciation: '/ˈpær.ə.daɪm/',
        definition: { en: 'A typical example or pattern of something.', hi: 'मिसाल / प्रतिमान' },
        example: 'This discovery represents a paradigm shift in science.',
        synonyms: ['Model', 'Pattern'],
        antonyms: ['Anomaly'],
        difficulty: Difficulty.HARD
      }
    ]
  },
  {
    id: 'travel',
    title: 'Wanderlust',
    description: 'Words for the soul traveler.',
    icon: Plane,
    color: 'rose',
    words: [
      {
        id: '8',
        term: 'Wanderlust',
        pronunciation: '/ˈwɒn.də.lʌst/',
        definition: { en: 'A strong desire to travel.', hi: 'घूमने की तीव्र इच्छा' },
        example: 'His wanderlust took him to every continent.',
        synonyms: ['Restlessness'],
        antonyms: ['Homesickness'],
        difficulty: Difficulty.EASY
      },
      {
        id: '9',
        term: 'Sojourn',
        pronunciation: '/ˈsɒdʒ.ən/',
        definition: { en: 'A temporary stay.', hi: 'डेरा / अल्पकालीन निवास' },
        example: 'Her sojourn in Rome inspired her painting.',
        synonyms: ['Stay', 'Visit'],
        antonyms: ['Residence'],
        difficulty: Difficulty.MEDIUM
      }
    ]
  }
];

export const TRANSLATIONS: Record<string, { en: string; hi: string }> = {
  backToTopics: { en: 'Back to Topics', hi: 'विषयों पर वापस जाएं' },
  selectTopic: { en: 'Select a Topic', hi: 'एक विषय चुनें' },
  physics: { en: 'Physics Lab', hi: 'भौतिक विज्ञान प्रयोगशाला' },
  chemistry: { en: 'Chemistry Lab', hi: 'रसायन विज्ञान प्रयोगशाला' },
  biology: { en: 'Biology Lab', hi: 'जीव विज्ञान प्रयोगशाला' },
  botany: { en: 'Botany Lab', hi: 'वनस्पति विज्ञान प्रयोगशाला' },
  lado: { en: 'LADO (Physical Edu)', hi: 'लाडो (शारीरिक शिक्षा)' },
  pendulum: { en: 'Simple Pendulum', hi: 'सरल लोलक' },
  gravity: { en: 'Gravity', hi: 'गुरुत्वाकर्षण' },
  length: { en: 'Length', hi: 'लंबाई' },
  start: { en: 'Start', hi: 'शुरू करें' },
  stop: { en: 'Stop', hi: 'रोकें' },
  velocity: { en: 'Velocity', hi: 'वेग' },
  angle: { en: 'Angle', hi: 'कोण' },
  fire: { en: 'Fire', hi: 'फायर' },
  projectile: { en: 'Projectile Motion', hi: 'प्रक्षेप्य गति' },
  temperature: { en: 'Temperature', hi: 'तापमान' },
  concentration: { en: 'Concentration', hi: 'सांद्रता' },
  reactionRate: { en: 'Reaction Rate', hi: 'प्रतिक्रिया दर' },
  reset: { en: 'Reset', hi: 'रीसेट' },
  phLevel: { en: 'pH Level', hi: 'pH स्तर' },
  infiniteZoom: { en: 'Infinite Zoom', hi: 'अनंत ज़ूम' },
  basePairs: { en: 'Show Base Pairs', hi: 'बेस पेअर दिखाएं' },
  plantCell: { en: 'Plant Cell', hi: 'पादप कोशिका' },
  clickToExplore: { en: 'Click parts to explore', hi: 'अन्वेषण करने के लिए भागों पर क्लिक करें' },
  exploreInside: { en: 'Zoom Inside', hi: 'अंदर देखें' },
  goBack: { en: 'Go Back', hi: 'वापस जाएं' },
  productionRate: { en: 'Production Rate', hi: 'उत्पादन दर' },
  lightIntensity: { en: 'Light Intensity', hi: 'प्रकाश की तीव्रता' },
  waterLevel: { en: 'Water Level', hi: 'जल स्तर' },
  co2Level: { en: 'CO2 Level', hi: 'CO2 स्तर' },
  glucoseBalance: { en: 'Glucose Balance', hi: 'ग्लूकोज संतुलन' },
  bioClock: { en: 'Bio Clock', hi: 'जैविक घड़ी' },
  emergencyRush: { en: 'Emergency Rush', hi: 'आपातकालीन रश' }
};
