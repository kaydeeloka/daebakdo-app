import { GameLevel, GameTopic, QuestionType } from '../types';

// ==========================================
// DATA CONFIGURATION (THE CONTENT CMS)
// ==========================================
// This file acts as the database for the game. 
// To add more content, simply copy an object block, give it a unique ID, 
// and fill in the details according to the specific QuestionType.

// --- TOPIC 1: GENERAL KNOWLEDGE ---
const LEVELS_GENERAL: GameLevel[] = [
  // TYPE: Standard Multiple Choice
  {
    id: 'g1',
    type: QuestionType.MCQ,
    question: 'Which planet in our solar system is known as the "Red Planet"?',
    options: ['Venus', 'Jupiter', 'Mars', 'Saturn'], // DATA: The list of buttons to show
    correctAnswer: 'Mars', // CORE LOGIC: Must match exactly one of the options above
    points: 100, // CORE LOGIC: Score added upon success
  },
  // TYPE: Word Puzzle (Spelling from Image)
  {
    id: 'g2',
    type: QuestionType.WORD_PUZZLE,
    question: 'What animal is shown in the picture?',
    // DATA: Can be a local path (e.g., '/assets/cat.jpg') or a remote URL
    imageUrl: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=600&q=80',
    word: 'CAT', // CORE LOGIC: The target word. Case insensitive in logic, but standard convention is uppercase here.
    points: 150,
  },
  // TYPE: Yes/No (Boolean Logic)
  {
    id: 'g3',
    type: QuestionType.YES_NO,
    question: 'Is HTML a programming language?',
    correctAnswer: false, // CORE LOGIC: true = Thumbs Up, false = Thumbs Down
    points: 50,
  },
  // TYPE: Text Matching (Left vs Right)
  {
    id: 'g4',
    type: QuestionType.MATCHING,
    question: 'Match the country to its capital city.',
    points: 150,
    pairs: [
      // DATA: Add as many pairs as you want. The game will shuffle them automatically.
      { id: 'p1', left: 'France', right: 'Paris' },
      { id: 'p2', left: 'Japan', right: 'Tokyo' },
      { id: 'p3', left: 'Brazil', right: 'Brasilia' },
      { id: 'p4', left: 'Australia', right: 'Canberra' },
    ],
  },
  {
    id: 'g5',
    type: QuestionType.MCQ,
    question: 'What is the chemical symbol for Gold?',
    options: ['Ag', 'Au', 'Fe', 'Cu'],
    correctAnswer: 'Au',
    points: 100,
  },
  {
    id: 'g6',
    type: QuestionType.WORD_PUZZLE,
    question: 'Identify this popular food item.',
    imageUrl: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
    word: 'PIZZA',
    points: 150,
  },
  {
    id: 'g7',
    type: QuestionType.YES_NO,
    question: 'Do sharks have bones?',
    correctAnswer: false,
    points: 50,
  },
  {
    id: 'g8',
    type: QuestionType.MATCHING,
    question: 'Match the tech giant to its founder(s).',
    points: 150,
    pairs: [
      { id: 't1', left: 'Microsoft', right: 'Bill Gates' },
      { id: 't2', left: 'Apple', right: 'Steve Jobs' },
      { id: 't3', left: 'Amazon', right: 'Jeff Bezos' },
      { id: 't4', left: 'Facebook', right: 'Mark Zuckerberg' },
    ],
  },
  // TYPE: MCQ with Image Header
  {
    id: 'g9',
    type: QuestionType.MCQ_IMAGE,
    question: 'Which famous landmark is this?',
    imageUrl: 'https://images.unsplash.com/photo-1543349689-9a4d426bee8e?auto=format&fit=crop&w=600&q=80',
    options: ['Eiffel Tower', 'Burj Khalifa', 'Empire State Building', 'Tokyo Tower'],
    correctAnswer: 'Eiffel Tower',
    points: 120,
  },
  // TYPE: MCQ with Audio Player (TTS)
  {
    id: 'g10',
    type: QuestionType.MCQ_AUDIO,
    question: 'Listen and choose the word you hear.',
    // DATA: String to be spoken by the TTS engine
    textToSpeak: 'Cello',
    options: ['Piano', 'Violin', 'Cello', 'Flute'],
    correctAnswer: 'Cello',
    points: 150,
  },
  // TYPE: Image Matching (Image Left vs Text Right)
  {
    id: 'g11',
    type: QuestionType.MATCHING_IMAGE,
    question: 'Match the sport to the ball.',
    points: 150,
    pairs: [
      { id: 's1', imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?auto=format&fit=crop&w=150&q=80', word: 'Soccer' },
      { id: 's2', imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ee2?auto=format&fit=crop&w=150&q=80', word: 'Basketball' },
      { id: 's3', imageUrl: 'https://images.unsplash.com/photo-1533299346627-36224c0d00ad?auto=format&fit=crop&w=150&q=80', word: 'Tennis' },
      { id: 's4', imageUrl: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=150&q=80', word: 'American Football' },
    ],
  }
];

// --- TOPIC 2: NATURE & SCIENCE ---
const LEVELS_NATURE: GameLevel[] = [
  {
    id: 'n1',
    type: QuestionType.MCQ,
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'],
    correctAnswer: 'Pacific',
    points: 100,
  },
  {
    id: 'n2',
    type: QuestionType.YES_NO,
    question: 'Is a tomato a fruit?',
    correctAnswer: true,
    points: 50,
  },
  {
    id: 'n3',
    type: QuestionType.WORD_PUZZLE,
    question: 'Name this majestic animal.',
    imageUrl: 'https://images.unsplash.com/photo-1546182990-dced71b4a789?auto=format&fit=crop&w=600&q=80',
    word: 'LION',
    points: 150,
  },
  {
    id: 'n4',
    type: QuestionType.MATCHING,
    question: 'Match the animal to its habitat.',
    points: 150,
    pairs: [
      { id: 'h1', left: 'Camel', right: 'Desert' },
      { id: 'h2', left: 'Polar Bear', right: 'Arctic' },
      { id: 'h3', left: 'Frog', right: 'Pond' },
      { id: 'h4', left: 'Monkey', right: 'Jungle' },
    ],
  },
  {
    id: 'n5',
    type: QuestionType.MCQ,
    question: 'Which of these is the fastest land animal?',
    options: ['Lion', 'Cheetah', 'Horse', 'Leopard'],
    correctAnswer: 'Cheetah',
    points: 100,
  },
  {
    id: 'n6',
    type: QuestionType.WORD_PUZZLE,
    question: 'What natural feature is this?',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80',
    word: 'MOUNTAIN',
    points: 150,
  },
  {
    id: 'n7',
    type: QuestionType.YES_NO,
    question: 'Do bats use echolocation to navigate?',
    correctAnswer: true,
    points: 50,
  },
  {
    id: 'n8',
    type: QuestionType.MATCHING,
    question: 'Match the baby animal name.',
    points: 150,
    pairs: [
      { id: 'b1', left: 'Cat', right: 'Kitten' },
      { id: 'b2', left: 'Dog', right: 'Puppy' },
      { id: 'b3', left: 'Kangaroo', right: 'Joey' },
      { id: 'b4', left: 'Sheep', right: 'Lamb' },
    ],
  },
  {
    id: 'n9',
    type: QuestionType.MCQ_IMAGE,
    question: 'Identify this weather phenomenon.',
    imageUrl: 'https://images.unsplash.com/photo-1516912481808-3406841bd33c?auto=format&fit=crop&w=600&q=80',
    options: ['Tornado', 'Hurricane', 'Lightning', 'Blizzard'],
    correctAnswer: 'Lightning',
    points: 120,
  },
  {
    id: 'n10',
    type: QuestionType.MCQ_AUDIO,
    question: 'Listen and choose the animal name.',
    textToSpeak: 'Sheep',
    options: ['Cow', 'Sheep', 'Goat', 'Horse'],
    correctAnswer: 'Sheep',
    points: 150,
  },
  {
    id: 'n11',
    type: QuestionType.MATCHING_IMAGE,
    question: 'Match the fruit to its name.',
    points: 150,
    pairs: [
      { id: 'f1', imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=150&q=80', word: 'Apple' },
      { id: 'f2', imageUrl: 'https://images.unsplash.com/photo-1571771896612-618711422b07?auto=format&fit=crop&w=150&q=80', word: 'Strawberry' },
      { id: 'f3', imageUrl: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?auto=format&fit=crop&w=150&q=80', word: 'Orange' },
      { id: 'f4', imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?auto=format&fit=crop&w=150&q=80', word: 'Kiwi' },
    ], 
  }
];

// DATA: This exports the list of topics seen on the Start Screen.
export const GAME_TOPICS: GameTopic[] = [
  {
    id: 'general',
    name: 'General Knowledge', // DESIGN: Title on card
    description: 'A mix of geography, tech, and trivia.', // DESIGN: Subtitle
    icon: '💡', // DESIGN: Emoji or you could replace with an Icon component
    levels: LEVELS_GENERAL, // CORE LOGIC: Links to the array of questions above
  },
  {
    id: 'nature',
    name: 'Nature & Science',
    description: 'Animals, environment, and biology.',
    icon: '🌿',
    levels: LEVELS_NATURE,
  }
];