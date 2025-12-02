import { GameLevel, QuestionType, GameTopic } from '../types';

const LEVELS_VEHICLES: GameLevel[] = [
  {
    id: 'trans1',
    type: QuestionType.WORD_PUZZLE,
    question: 'What vehicle is this?',
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80',
    word: 'BUS',
    points: 150,
  },
  {
    id: 'trans2',
    type: QuestionType.MCQ_IMAGE,
    question: 'Identify this mode of transport.',
    imageUrl: 'https://images.unsplash.com/photo-1532939163844-547f958e91b4?auto=format&fit=crop&w=600&q=80',
    options: ['Car', 'Truck', 'Train', 'Bike'],
    correctAnswer: 'Train',
    points: 120,
  },
  {
    id: 'trans3',
    type: QuestionType.MATCHING,
    question: 'Match the vehicle to its path.',
    points: 150,
    pairs: [
      { id: 'v1', left: 'Train', right: 'Tracks' },
      { id: 'v2', left: 'Car', right: 'Road' },
      { id: 'v3', left: 'Plane', right: 'Sky' },
      { id: 'v4', left: 'Boat', right: 'Water' },
    ],
  },
];

const LEVELS_AIRPORT: GameLevel[] = [
  {
    id: 'air1',
    type: QuestionType.WORD_PUZZLE,
    question: 'Where do you catch a flight?',
    imageUrl: 'https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=600&q=80',
    word: 'AIRPORT',
    points: 150,
  },
  {
    id: 'air2',
    type: QuestionType.YES_NO,
    question: 'Do you need a passport for international flights?',
    correctAnswer: true,
    points: 50,
  },
  {
    id: 'air3',
    type: QuestionType.MCQ,
    question: 'What do you show to get on the plane?',
    options: ['Library Card', 'Boarding Pass', 'Receipt', 'Menu'],
    correctAnswer: 'Boarding Pass',
    points: 100,
  }
];

export const TRANSPORT_GAME_TOPICS: GameTopic[] = [
  {
    id: 'vehicles',
    name: 'Vehicles',
    description: 'Cars, buses, and trains.',
    icon: '🚌',
    levels: LEVELS_VEHICLES,
  },
  {
    id: 'airport_vocab',
    name: 'At the Airport',
    description: 'Travel vocabulary.',
    icon: '✈️',
    levels: LEVELS_AIRPORT,
  }
];
