import { GameLevel, GameTopic, QuestionType } from '../types';

const LEVELS_VEHICLES: GameLevel[] = [
  {
    id: 'trans1',
    type: QuestionType.WORD_PUZZLE,
    question: 'What vehicle is this?',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    word: '버스',
  },
  {
    id: 'trans2',
    type: QuestionType.MCQ_IMAGE,
    question: 'Identify this mode of transport.',
    imageUrl: 'https://images.unsplash.com/photo-1532939163844-547f958e91b4?auto=format&fit=crop&w=600&q=80',
    options: ['차', '배', '기차', '자전거'],
    correctAnswer: '기차',
  },
  {
    id: 'trans3',
    type: QuestionType.MATCHING,
    question: 'Match the vehicle.',
    pairs: [
      { id: 'v1', left: 'Train', right: '기차' },
      { id: 'v2', left: 'Car', right: '차' },
      { id: 'v3', left: 'Plane', right: '비행기' },
      { id: 'v4', left: 'Taxi', right: '택시' },
    ],
  },
];

const LEVELS_AIRPORT: GameLevel[] = [
  {
    id: 'air1',
    type: QuestionType.WORD_PUZZLE,
    question: 'Where is this?',
    imageUrl: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80',
    word: '공항',
  },
  {
    id: 'air2',
    type: QuestionType.YES_NO,
    question: 'Does "출입국" mean "immigration"?',
    correctAnswer: true,
  },
  {
    id: 'air3',
    type: QuestionType.MCQ,
    question: 'Which one means passport?',
    options: ['학생증', '여권', '영수증', '메뉴'],
    correctAnswer: '여권',
  }
];

export const TRANSPORT_GAME_TOPICS: GameTopic[] = [
  {
    id: 'vehicles',
    name: 'Vehicles',
    description: 'Cars, buses, and trains.',
    icon: 'vehicles',
    levels: LEVELS_VEHICLES,
  },
  {
    id: 'airport_vocab',
    name: 'Travel',
    description: 'Travel vocabulary.',
    icon: 'travel',
    levels: LEVELS_AIRPORT,
  }
];