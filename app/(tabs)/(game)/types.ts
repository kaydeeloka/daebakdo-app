export enum QuestionType {
  MCQ = 'MCQ',
  YES_NO = 'YES_NO',
  MATCHING = 'MATCHING',
  WORD_PUZZLE = 'WORD_PUZZLE',
  MCQ_IMAGE = 'MCQ_IMAGE',
  MCQ_AUDIO = 'MCQ_AUDIO',
  MATCHING_IMAGE = 'MATCHING_IMAGE',
}

export interface BaseLevel {
  id: string;
  type: QuestionType;
  question: string;
}

export interface MCQLevel extends BaseLevel {
  type: QuestionType.MCQ;
  options: string[];
  correctAnswer: string;
}

export interface YesNoLevel extends BaseLevel {
  type: QuestionType.YES_NO;
  correctAnswer: boolean;
}

export interface MatchingPair {
  id: string;
  left: string;
  right: string;
}

export interface MatchingLevel extends BaseLevel {
  type: QuestionType.MATCHING;
  pairs: MatchingPair[];
}

export interface WordPuzzleLevel extends BaseLevel {
  type: QuestionType.WORD_PUZZLE;
  imageUrl: string;
  word: string;
}

export interface MCQImageLevel extends BaseLevel {
  type: QuestionType.MCQ_IMAGE;
  imageUrl: string;
  options: string[];
  correctAnswer: string;
}

export interface MCQAudioLevel extends BaseLevel {
  type: QuestionType.MCQ_AUDIO;
  textToSpeak: string;
  options: string[];
  correctAnswer: string;
  language?: string; 
}

export interface MatchingImagePair {
  id: string;
  imageUrl: string;
  word: string;
}

export interface MatchingImageLevel extends BaseLevel {
  type: QuestionType.MATCHING_IMAGE;
  pairs: MatchingImagePair[];
}

export type GameLevel = 
  | MCQLevel 
  | YesNoLevel 
  | MatchingLevel 
  | WordPuzzleLevel 
  | MCQImageLevel 
  | MCQAudioLevel
  | MatchingImageLevel;

export interface GameTopic {
  id: string;
  name: string;
  description: string;
  icon: string; // Emoji or icon name
  levels: GameLevel[];
}

// Represents a single choice option in the MCQ interface
export interface Choice {
  id: string;
  text: string; // The text displayed on the button (and sent as user message)
  nextId: string | null; // The ID of the next scenario node. Null implies end of conversation.
  isCorrect: boolean; // Determines if the flow progresses or loops
  feedback?: string; // Specific response from the bot if this wrong answer is chosen
}

// Represents a node in the conversation graph
export interface ScenarioNode {
  id: string;
  text: string; // The message the bot sends when entering this node
  choices: Choice[]; // Available user responses
}

// Wrapper for a complete game scenario
export interface Scenario {
  subtitle: any;
  id: string;
  title: string;
  description: string;
  icon: string; // Simple string identifier for icons
  initialNodeId: string;
  nodes: Record<string, ScenarioNode>;
}

// Represents a message in the chat history
export interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  isErrorFeedback?: boolean; // Styling flag for correction messages
}

export type GameState = 'START' | 'PLAYING' | 'GAME_OVER';