import React, { useState, useEffect } from 'react';
import { MCQLevel } from '../../types';
import { Button } from '../Button';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle } from 'lucide-react';
import { shuffleArray } from '../../utils';

interface McqLevelProps {
  level: MCQLevel;
  onComplete: (success: boolean) => void;
}

export const McqLevel: React.FC<McqLevelProps> = ({ level, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    setShuffledOptions(shuffleArray(level.options));
  }, [level]);

  const handleSelect = (option: string) => {
    if (hasSubmitted) return;
    setSelectedOption(option);
    setHasSubmitted(true);

    const isCorrect = option === level.correctAnswer;
    setTimeout(() => {
      onComplete(isCorrect);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Main Content: Question */}
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        {/* CONFIG: Icon Size (w-16 h-16) */}
        <div className="w-16 h-16 mb-6 bg-white rounded-full flex items-center justify-center shadow-lg text-secondary border-4 border-secondary/10">
          <HelpCircle className="w-8 h-8" />
        </div>
        {/* CONFIG: Question Text Size (text-2xl md:text-3xl) */}
        <h2 className="text-2xl md:text-3xl font-bold text-dark-text leading-snug">
          {level.question}
        </h2>
      </div>
      
      {/* Footer: Options Grid */}
      <div className="flex-shrink-0 grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
        {shuffledOptions.map((option, index) => {
          let variant: 'outline' | 'success' | 'danger' = 'outline';
          let Icon = null;

          if (hasSubmitted) {
            if (option === level.correctAnswer) {
              variant = 'success';
              Icon = CheckCircle2;
            } else if (option === selectedOption) {
              variant = 'danger';
              Icon = XCircle;
            }
          }

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Button
                fullWidth
                variant={variant}
                onClick={() => handleSelect(option)}
                disabled={hasSubmitted}
                whileHover={{ scale: 1.02 }}
                /* CONFIG: Button Height (h-16) and Text Size (text-lg) */
                className={`relative flex items-center justify-center h-16 md:h-20 text-lg font-bold ${
                  hasSubmitted && option !== level.correctAnswer && option !== selectedOption ? 'opacity-40' : ''
                } ${variant === 'outline' ? 'bg-white text-dark-text shadow-sm hover:shadow-md hover:border-secondary/30' : ''}`}
              >
                <span>{option}</span>
                {Icon && <Icon className="w-5 h-5 ml-2 absolute right-4" />}
              </Button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};