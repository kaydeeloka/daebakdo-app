import { GameLevel, GameTopic, QuestionType } from '../types';

const LEVELS_GREETING: GameLevel[] = [
  {
    id: 'greet1',
    type: QuestionType.MATCHING,
    question: 'Match the greeting.',
    pairs: [
      { id: 'g1', left: 'Hello', right: 'Anyeong' },
      { id: 'g2', left: 'Thank you', right: 'Gamsahamnida' },
      { id: 'g3', left: 'Yes', right: 'Ne' },
      { id: 'g4', left: 'No', right: 'Aniyo' },
    ],
  },
  {
    id: 'greet2',
    type: QuestionType.MCQ,
    question: 'How do you say "Goodbye" when you are staying?',
    options: ['Anyeong-hi Gyeseyo', 'Anyeong-hi Gaseyo', 'Gamsahamnida', 'Sillyehamnida'],
    correctAnswer: 'Anyeong-hi Gaseyo',
  },
  {
    id: 'greet3',
    type: QuestionType.MCQ_AUDIO,
    question: 'Listen and choose the matching word.',
    textToSpeak: '안녕하세요',
    options: ['Hello', 'Goodbye', 'Please', 'Sorry'],
    correctAnswer: 'Hello',
  },
];

const LEVELS_PHRASES: GameLevel[] = [
  {
    id: 'phrase1',
    type: QuestionType.MCQ,
    question: 'Which phrase means "I am sorry"?',
    options: ['Mianhamnida', 'Gamsahamnida', 'Saranghae', 'Juseyo'],
    correctAnswer: 'Mianhamnida',
  },
  {
    id: 'phrase2',
    type: QuestionType.YES_NO,
    question: 'Does "Juseyo" mean "Please give me"?',
    correctAnswer: true,
  },
  {
    id: 'phrase3',
    type: QuestionType.WORD_PUZZLE,
    question: 'Unscramble: "Love"',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80',
    word: 'LOVE',
  },
  {
    id: 'phrase4',
    type: QuestionType.MCQ_AUDIO,
    question: 'What is this word?',
    textToSpeak: '감사합니다',
    options: ['Excuse me', 'Thank you', 'Hello', 'Water'],
    correctAnswer: 'Thank you',
  }
];

export const ESSENTIAL_WORDS_GAME_TOPICS: GameTopic[] = [
  {
    id: 'greeting',
    name: 'Greetings',
    description: 'Hello, Goodbye, and Thanks.',
    icon: 'greeting',
    levels: LEVELS_GREETING,
  },
  {
    id: 'phrases',
    name: 'Common Phrases',
    description: 'Essential daily expressions.',
    icon: 'phrases',
    levels: LEVELS_PHRASES,
  }
];
