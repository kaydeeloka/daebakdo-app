import React from 'react';
import { Button } from './Button';
import { motion } from 'framer-motion';
import { Trophy, PlayCircle, CheckCircle2 } from 'lucide-react';
import { GameTopic } from '../types';

interface StartScreenProps {
  topics: GameTopic[];
  onSelectTopic: (topic: GameTopic) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ topics, onSelectTopic }) => (
  <div className="flex flex-col items-center justify-start min-h-full pt-8 pb-20 w-full max-w-lg mx-auto px-6 space-y-6">
    
    {/* Header */}
    <div className="w-full flex justify-between items-center">
      <h1 className="text-2xl font-bold text-dark-text">Topics</h1>
    </div>

    {/* Topics List */}
    <div className="w-full space-y-6">
      {topics.map((topic, index) => (
        <motion.div
          key={topic.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-lg border border-transparent hover:border-primary/20 transition-all flex flex-col items-center text-center space-y-4"
        >
          {/* Card Title */}
          <div className="space-y-2">
            <div className="text-4xl mb-2">{topic.icon}</div>
            <h3 className="text-2xl font-bold text-dark-text">
              {topic.name}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed px-4">
              {topic.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-3 pt-2">
            <Button 
              variant="primary" 
              fullWidth 
              className="py-3 text-base flex items-center justify-center gap-2"
              onClick={() => onSelectTopic(topic)}
            >
              <PlayCircle className="w-5 h-5" />
              Start Quiz
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
);

interface GameOverScreenProps {
  correctCount: number;
  totalLevels: number;
  onRestart: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({ correctCount, totalLevels, onRestart }) => {
  const percentage = totalLevels > 0 ? Math.round((correctCount / totalLevels) * 100) : 0;
  
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-6 bg-light-bg">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-sm space-y-8"
      >
        <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <Trophy className="w-10 h-10 text-accent" />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-dark-text">Session Complete!</h2>
          <p className="text-gray-500 mt-1">Here is how you did</p>
        </div>
        
        {/* Results / Progress Bar Section */}
        <div className="bg-neutral-bg rounded-2xl p-6">
          <div className="flex justify-between items-end mb-2">
            <span className="text-gray-500 font-bold text-xs uppercase tracking-wider">Accuracy</span>
            <span className="text-2xl font-black text-primary">{percentage}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-3">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
              className="bg-primary h-full rounded-full" 
            />
          </div>

          <div className="flex items-center justify-center gap-2 text-dark-text font-medium">
             <CheckCircle2 className="w-5 h-5 text-green-500" />
             <span>{correctCount} / {totalLevels} Correct</span>
          </div>
        </div>

        <Button onClick={onRestart} fullWidth variant="primary">
          Play Again
        </Button>
      </motion.div>
    </div>
  );
};