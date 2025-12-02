import React, { useState, useEffect } from 'react';
import { MatchingImageLevel as IMatchingImageLevel } from '../../types';
import { motion } from 'framer-motion';
import { shuffleArray } from '../../utils';

interface MatchingImageLevelProps {
  level: IMatchingImageLevel;
  onComplete: (success: boolean) => void;
}

export const MatchingImageLevel: React.FC<MatchingImageLevelProps> = ({ level, onComplete }) => {
  const [rightItems, setRightItems] = useState<{id: string, text: string}[]>([]);
  const [leftItems, setLeftItems] = useState<{id: string, imageUrl: string}[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongShake, setWrongShake] = useState<string | null>(null);

  useEffect(() => {
    const rightSide = level.pairs.map(p => ({ id: p.id, text: p.word }));
    const leftSide = level.pairs.map(p => ({ id: p.id, imageUrl: p.imageUrl }));

    setRightItems(shuffleArray(rightSide));
    setLeftItems(shuffleArray(leftSide));
  }, [level]);

  const handleLeftClick = (id: string) => {
    if (matchedIds.has(id)) return;
    setSelectedLeft(id);
    setWrongShake(null);
  };

  const handleRightClick = (targetId: string) => {
    if (matchedIds.has(targetId)) return;
    
    if (selectedLeft) {
      if (selectedLeft === targetId) {
        const newMatched = new Set(matchedIds);
        newMatched.add(targetId);
        setMatchedIds(newMatched);
        setSelectedLeft(null);

        if (newMatched.size === level.pairs.length) {
          setTimeout(() => onComplete(true), 1000);
        }
      } else {
        setWrongShake(targetId);
        setTimeout(() => setWrongShake(null), 500);
        setSelectedLeft(null);
      }
    }
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex-shrink-0 mb-6 text-center">
        {/* CONFIG: Question Text Size */}
        <h2 className="text-xl md:text-2xl font-bold text-dark-text">{level.question}</h2>
      </div>
      
      {/* CONFIG: Grid Gap (gap-4) */}
      <div className="flex-grow flex justify-between gap-4 items-stretch pb-2">
        {/* Left Column - Images */}
        <div className="flex flex-col gap-3 flex-1 justify-center">
          {leftItems.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedLeft === item.id;

            return (
              <motion.button
                key={item.id}
                layout
                onClick={() => handleLeftClick(item.id)}
                className={`relative rounded-xl overflow-hidden shadow-lg transition-all border-4 flex-1 ${
                  isMatched 
                    ? 'border-green-400 opacity-40 grayscale' 
                    : isSelected 
                      ? 'border-secondary ring-4 ring-secondary/20 scale-105 z-10' 
                      : 'border-white hover:border-gray-200'
                }`}
                disabled={isMatched}
              >
                <img 
                  src={item.imageUrl} 
                  alt="Match option" 
                  className="w-full h-full object-cover absolute inset-0"
                />
                {isMatched && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-4xl text-green-500">✓</span>
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Right Column - Words */}
        <div className="flex flex-col gap-3 flex-1 justify-center">
          {rightItems.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isShake = wrongShake === item.id;

            return (
              <motion.button
                key={item.id}
                layout
                animate={isShake ? { x: [-10, 10, -10, 10, 0] } : {}}
                transition={{ duration: 0.4 }}
                onClick={() => handleRightClick(item.id)}
                /* CONFIG: Text Size (text-lg) */
                className={`flex-1 flex items-center justify-center rounded-xl text-base md:text-lg font-bold transition-all shadow-md text-center px-2 ${
                  isMatched 
                    ? 'bg-green-100 text-green-700 border border-green-200 cursor-default shadow-none' 
                    : 'bg-white text-dark-text hover:border-secondary/30 border-2 border-transparent'
                }`}
                disabled={isMatched}
              >
                {item.text}
              </motion.button>
            );
          })}
        </div>
      </div>
    </div>
  );
};