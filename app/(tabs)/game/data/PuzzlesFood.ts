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
      { id: 'f1', imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=150&q=80', word: '피자' },
      { id: 'f2', imageUrl: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=150&q=80', word: '버거' },
      { id: 'f3', imageUrl: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=150&q=80', word: '파스타' },
      { id: 'f4', imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80', word: '샐러드' },
    ], 
  }
];

const LEVELS_STREET: GameLevel[] = [
  {
    id: 'drink1',
    type: QuestionType.MCQ_IMAGE,
    question: 'Which drink is this?',
    imageUrl: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    options: ['커피', '차', '쥬스', '물'],
    correctAnswer: '커피',
  },
  {
    id: 'drink2',
    type: QuestionType.MCQ,
    question: 'You are in a Korean café. The barista asks: “테이크아웃인가요?” What are they asking?',
    options: ['Hot or iced?', 'Size?', 'For here or to go?', 'Do you want syrup?'],
    correctAnswer: 'For here or to go?',
  },
  {
    id: 'drink3',
    type: QuestionType.WORD_PUZZLE,
    question: 'Unscramble the drink name.',
    imageUrl: 'https://www.forkinthekitchen.com/wp-content/uploads/2022/08/220629.iced_.latte_.vanilla-9009.jpg',
    word: '바닐라라떼',
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
    levels: LEVELS_STREET,
  }
];