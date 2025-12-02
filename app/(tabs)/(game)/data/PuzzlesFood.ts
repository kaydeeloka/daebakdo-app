import { GameLevel, GameTopic, QuestionType } from '../types';

const LEVELS_GENERAL_FOOD: GameLevel[] = [
  {
    id: 'food1',
    type: QuestionType.WORD_PUZZLE,
    question: 'What fruit is this?',
    imageUrl: 'https://images.unsplash.com/photo-1571771896612-618711422b07?auto=format&fit=crop&w=600&q=80',
    word: '바나나',
  },
  {
    id: 'food2',
    type: QuestionType.WORD_PUZZLE,
    question: 'What fruit is this?',
    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80',
    word: '사과',
  },
  {
    id: 'food3',
    type: QuestionType.WORD_PUZZLE,
    question: 'What fruit is this?',
    imageUrl: 'https://images.unsplash.com/photo-1547514355-408c66e2c342?auto=format&fit=crop&w=600&q=80',
    word: '감귤',
  },
  {
    id: 'food4',
    type: QuestionType.MATCHING_IMAGE,
    question: 'Match the dish to its name.',
    pairs: [
      { id: 'f1', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80', word: 'Pizza' },
      { id: 'f2', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80', word: 'Burger' },
      { id: 'f3', imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=150&q=80', word: 'Pasta' },
      { id: 'f4', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80', word: 'Salad' },
    ], 
  }
];

const LEVELS_DRINKS: GameLevel[] = [
  {
    id: 'drink1',
    type: QuestionType.MCQ_IMAGE,
    question: 'Which drink is this?',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    options: ['Coffee', 'Tea', 'Juice', 'Water'],
    correctAnswer: 'Coffee',
  },
  {
    id: 'drink2',
    type: QuestionType.MCQ,
    question: 'Which of these contains caffeine?',
    options: ['Water', 'Milk', 'Espresso', 'Orange Juice'],
    correctAnswer: 'Espresso',
  },
  {
    id: 'drink3',
    type: QuestionType.WORD_PUZZLE,
    question: 'Unscramble the drink name.',
    imageUrl: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80',
    word: 'WATER',
  },
];

export const FOOD_GAME_TOPICS: GameTopic[] = [
  {
    id: 'general_food',
    name: 'Fruits & Dishes',
    description: 'Common foods you eat every day.',
    icon: 'general',
    levels: LEVELS_GENERAL_FOOD,
  },
  {
    id: 'drinks',
    name: 'Drinks & Beverages',
    description: 'Coffee, tea, and refreshments.',
    icon: 'street',
    levels: LEVELS_DRINKS,
  }
];
