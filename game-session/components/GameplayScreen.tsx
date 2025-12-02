import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GameLevel, QuestionType } from '../types';
import { ArrowLeft } from 'lucide-react';
import { McqLevel } from './levels/McqLevel';
import { YesNoLevel } from './levels/YesNoLevel';
import { MatchingLevel } from './levels/MatchingLevel';
import { WordPuzzleLevel } from './levels/WordPuzzleLevel';
import { McqImageLevel } from './levels/McqImageLevel';
import { McqAudioLevel } from './levels/McqAudioLevel';
import { MatchingImageLevel } from './levels/MatchingImageLevel';

interface GameplayScreenProps {
  levels: GameLevel[];
  currentLevelIndex: number;
  topicName?: string;
  onLevelComplete: (success: boolean) => void;
  onExit: () => void;
}

export const GameplayScreen: React.FC<GameplayScreenProps> = ({
  levels,
  currentLevelIndex,
  topicName,
  onLevelComplete,
  onExit,
}) => {
  
  const renderLevel = () => {
    const level = levels[currentLevelIndex];
    if (!level) return null;

    const key = level.id;

    switch (level.type) {
      case QuestionType.MCQ:
        return <McqLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.YES_NO:
        return <YesNoLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.MATCHING:
        return <MatchingLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.WORD_PUZZLE:
        return <WordPuzzleLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.MCQ_IMAGE:
        return <McqImageLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.MCQ_AUDIO:
        return <McqAudioLevel key={key} level={level} onComplete={onLevelComplete} />;
      case QuestionType.MATCHING_IMAGE:
        return <MatchingImageLevel key={key} level={level} onComplete={onLevelComplete} />;
      default:
        return <div>Unknown Level Type</div>;
    }
  };

  const progressPercentage = ((currentLevelIndex + 1) / levels.length) * 100;

  return (
    <div className="flex flex-col h-full w-full max-w-2xl mx-auto px-6 py-6">
      {/* HEADER: Title, Counter, Progress Bar */}
      <header className="flex-shrink-0 mb-6">
        <div className="flex justify-between items-end mb-3">
          <div className="flex flex-col items-start">
            <button 
              onClick={onExit} 
              className="flex items-center gap-2 text-gray-400 hover:text-secondary transition-colors text-sm font-bold mb-1"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>
            {/* CONFIG: Header Title Size */}
            <h2 className="text-xl md:text-2xl font-bold text-dark-text leading-none tracking-tight">{topicName}</h2>
          </div>
          <div className="text-right">
             <span className="text-[10px] text-gray-400 font-bold block mb-0.5 uppercase tracking-wider">Level</span>
             {/* CONFIG: Level Counter Size */}
             <p className="text-2xl font-black text-secondary leading-none">
               {currentLevelIndex + 1} <span className="text-gray-300 text-lg">/</span> {levels.length}
             </p>
          </div>
        </div>
        
        {/* Linear Progress Bar */}
        {/* CONFIG: Progress Bar Height (h-2 = 0.5rem) */}
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden shadow-inner">
          <motion.div 
            className="bg-secondary h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </header>

      {/* MAIN: Content Area */}
      <main className="flex-grow flex flex-col relative w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={levels[currentLevelIndex]?.id || 'level'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-full h-full flex"
          >
            {renderLevel()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};