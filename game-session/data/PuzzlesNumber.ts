import { GameLevel, QuestionType, GameTopic } from '../types';

const LEVELS_SINO: GameLevel[] = [
  {
    id: 'sino1',
    type: QuestionType.MATCHING,
    question: 'Match the Sino-Korean number.',
    points: 150,
    pairs: [
      { id: 'n1', left: '1', right: 'Il (일)' },
      { id: 'n2', left: '2', right: 'I (이)' },
      { id: 'n3', left: '3', right: 'Sam (삼)' },
      { id: 'n4', left: '10', right: 'Sip (십)' },
    ],
  },
  {
    id: 'sino2',
    type: QuestionType.MCQ,
    question: 'Which is the number 5 (Sino)?',
    options: ['O (오)', 'Yuk (육)', 'Sa (사)', 'Gu (구)'],
    correctAnswer: 'O (오)',
    points: 100,
  },
  {
    id: 'sino3',
    type: QuestionType.MCQ_AUDIO,
    question: 'Listen and choose the number.',
    textToSpeak: 'Sam',
    options: ['1', '3', '8', '10'],
    correctAnswer: '3',
    points: 150,
  },
];

const LEVELS_NATIVE: GameLevel[] = [
  {
    id: 'native1',
    type: QuestionType.MATCHING,
    question: 'Match the Native Korean number.',
    points: 150,
    pairs: [
      { id: 'na1', left: '1', right: 'Hana (하나)' },
      { id: 'na2', left: '2', right: 'Dul (둘)' },
      { id: 'na3', left: '3', right: 'Set (셋)' },
      { id: 'na4', left: '4', right: 'Net (넷)' },
    ],
  },
  {
    id: 'native2',
    type: QuestionType.WORD_PUZZLE,
    question: 'Spell the number "One" in English.',
    imageUrl: 'https://images.unsplash.com/photo-1555861496-0666c8981751?auto=format&fit=crop&w=600&q=80',
    word: 'ONE',
    points: 150,
  },
];

const LEVELS_MONEY: GameLevel[] = [
  {
    id: 'money1',
    type: QuestionType.MCQ,
    question: 'What is the currency of South Korea?',
    options: ['Yen', 'Won', 'Dollar', 'Yuan'],
    correctAnswer: 'Won',
    points: 100,
  },
  {
    id: 'money2',
    type: QuestionType.MCQ_IMAGE,
    question: 'Is this a coin or a bill?',
    imageUrl: 'https://images.unsplash.com/photo-1621981386829-9b788a825eb3?auto=format&fit=crop&w=600&q=80',
    options: ['Coin', 'Bill', 'Credit Card', 'Check'],
    correctAnswer: 'Coin',
    points: 120,
  },
  {
    id: 'money3',
    type: QuestionType.YES_NO,
    question: 'Is 100 cents equal to 1 dollar?',
    correctAnswer: true,
    points: 50,
  },
];

export const NUMBER_GAME_TOPICS: GameTopic[] = [
  {
    id: 'sino',
    name: 'Sino Numbers',
    description: 'Dates, money, and minutes.',
    icon: '🔢',
    levels: LEVELS_SINO,
  },
  {
    id: 'native',
    name: 'Native Numbers',
    description: 'Counting items and people.',
    icon: '1️⃣',
    levels: LEVELS_NATIVE,
  },
  {
    id: 'money',
    name: 'Money & Currency',
    description: 'Understanding prices.',
    icon: '💵',
    levels: LEVELS_MONEY,
  }
];
