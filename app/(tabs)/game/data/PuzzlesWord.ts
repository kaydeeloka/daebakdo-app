import { GameLevel, GameTopic, QuestionType } from '../types';

const LEVELS_GREETING: GameLevel[] = [
  {
    id: 'greet1',
    type: QuestionType.MATCHING,
    question: 'Match the greeting.',
    pairs: [
      { id: 'g1', left: 'Hello', right: '안녕' },
      { id: 'g2', left: 'Good morning', right: '좋은 아침' },
      { id: 'g3', left: 'See you later', right: '나중에 봐요' },
      { id: 'g4', left: 'Good night', right: '잘 자요' },
    ],
  },
  {
    id: 'greet2',
    type: QuestionType.MCQ,
    question: 'Which one means goodbye?',
    options: ['한국말 잘 못해요', '안녕히 가세요', '축하해요', '안녕하세요'],
    correctAnswer: '안녕히 가세요',
  },
  {
    id: 'greet3',
    type: QuestionType.MCQ_AUDIO,
    question: 'Listen and choose the correct word.',
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
    options: ['미안합니다', '감사합니다', '사랑해', '주세요'],
    correctAnswer: '미안합니다',
  },
  {
    id: 'phrase2',
    type: QuestionType.YES_NO,
    question: 'Does "주세요" mean "Please give me"?',
    correctAnswer: true,
  },
  {
    id: 'phrase3',
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