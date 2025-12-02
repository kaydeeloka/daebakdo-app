import React, { useState, useEffect } from 'react';
import { MatchingLevel as IMatchingLevel } from '../../types';
import { motion } from 'framer-motion';
import { shuffleArray } from '../../utils';

interface MatchingLevelProps {
  level: IMatchingLevel;
  onComplete: (success: boolean) => void;
}

export const MatchingLevel: React.FC<MatchingLevelProps> = ({ level, onComplete }) => {
  const [rightItems, setRightItems] = useState<{id: string, text: string}[]>([]);
  const [leftItems, setLeftItems] = useState<{id: string, text: string}[]>([]);
  
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [wrongShake, setWrongShake] = useState<string | null>(null);

  useEffect(() => {
    const rightSide = level.pairs.map(p => ({ id: p.id, text: p.right }));
    const leftSide = level.pairs.map(p => ({ id: p.id, text: p.left }));

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
        <p className="text-gray-500 text-sm mt-1">Tap left item, then match on right.</p>
      </div>
      
      {/* CONFIG: Grid Layout Spacing (gap-4) */}
      <div className="flex-grow flex justify-between gap-4 md:gap-8 items-stretch pb-2">
        {/* Left Column */}
        <div className="flex flex-col gap-3 flex-1 justify-center">
          {leftItems.map((item) => {
            const isMatched = matchedIds.has(item.id);
            const isSelected = selectedLeft === item.id;

            return (
              <motion.button
                key={item.id}
                layout
                onClick={() => handleLeftClick(item.id)}
                /* CONFIG: Tile Padding (p-4) and Text Size (text-base) */
                className={`p-4 rounded-xl text-base md:text-lg font-bold transition-all shadow-md text-left h-full flex items-center ${
                  isMatched 
                    ? 'bg-green-100 text-green-700 border border-green-200 cursor-default shadow-none' 
                    : isSelected 
                      ? 'bg-secondary text-white shadow-xl shadow-secondary/30 scale-105' 
                      : 'bg-white text-dark-text hover:border-secondary/30 border-2 border-transparent'
                }`}
                disabled={isMatched}
              >
                {item.text}
              </motion.button>
            );
          })}
        </div>

        {/* Right Column */}
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
                /* CONFIG: Tile Padding (p-4) and Text Size (text-base) */
                className={`p-4 rounded-xl text-base md:text-lg font-bold transition-all shadow-md text-right h-full flex items-center justify-end ${
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