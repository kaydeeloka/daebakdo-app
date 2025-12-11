import { GameLevel, GameTopic, QuestionType } from '../types';

const LEVELS_SINO: GameLevel[] = [
  {
    id: 'sino1',
    type: QuestionType.MATCHING,
    question: 'Match the Sino-Korean number.',
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
  },
  {
    id: 'sino3',
    type: QuestionType.MCQ_AUDIO,
    question: 'Listen and choose the number.',
    textToSpeak: '삼',
    options: ['1', '3', '8', '10'],
    correctAnswer: '3',
  },
];

const LEVELS_NATIVE: GameLevel[] = [
  {
    id: 'native1',
    type: QuestionType.MATCHING,
    question: 'Match the Native Korean number.',
    pairs: [
      { id: 'na1', left: '1', right: 'Hana (하나)' },
      { id: 'na2', left: '2', right: 'Dul (둘)' },
      { id: 'na3', left: '3', right: 'Set (셋)' },
      { id: 'na4', left: '4', right: 'Net (넷)' },
    ],
  },
  {
    id: 'native2',
    type: QuestionType.MATCHING,
    question: 'Match the Native Korean number.',
    pairs: [
      { id: 'na7',  left: '7',  right: 'Ilgop (일곱)' },
      { id: 'na8',  left: '8',  right: 'Yeodeol (여덟)' },
      { id: 'na9',  left: '9',  right: 'Ahop (아홉)' },
      { id: 'na10', left: '10', right: 'Yeol (열)' },
    ],
  },
];

const LEVELS_MONEY: GameLevel[] = [
  {
    id: 'money1',
    type: QuestionType.MCQ,
    question: 'If something costs “만오천원,” how much is it?',
    options: ['1,500 won', '5,000 won', '15,000 won', '50,000 won'],
    correctAnswer: '15,000 won',
  },
  {
    id: 'money2',
    type: QuestionType.YES_NO,
    question: 'Is “만원” equal to 10,000 won?',
    correctAnswer: true,
  },
];

export const NUMBER_GAME_TOPICS: GameTopic[] = [
  {
    id: 'sino',
    name: 'Sino Numbers',
    description: 'Money, phone numbers, months.',
    icon: 'sino',
    levels: LEVELS_SINO,
  },
  {
    id: 'native',
    name: 'Native Numbers',
    description: 'Count items, age.',
    icon: 'native',
    levels: LEVELS_NATIVE,
  },
  {
    id: 'money',
    name: 'Money & Currency',
    description: 'Understanding prices.',
    icon: 'money',
    levels: LEVELS_MONEY,
  }
];