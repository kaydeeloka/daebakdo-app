import React, { useState } from 'react';
import { YesNoLevel as IYesNoLevel } from '../../types';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown, HelpCircle } from 'lucide-react';

interface YesNoLevelProps {
  level: IYesNoLevel;
  onComplete: (success: boolean) => void;
}

export const YesNoLevel: React.FC<YesNoLevelProps> = ({ level, onComplete }) => {
  const [selected, setSelected] = useState<boolean | null>(null);

  const handleSelect = (choice: boolean) => {
    if (selected !== null) return;
    setSelected(choice);

    const isCorrect = choice === level.correctAnswer;
    setTimeout(() => {
      onComplete(isCorrect);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
        {/* CONFIG: Icon Size */}
        <div className="w-16 h-16 mb-6 bg-white rounded-full flex items-center justify-center shadow-lg text-secondary border-4 border-secondary/10">
          <HelpCircle className="w-8 h-8" />
        </div>
        {/* CONFIG: Question Text Size */}
        <h2 className="text-2xl md:text-3xl font-bold text-dark-text leading-snug">
          {level.question}
        </h2>
        
        {selected !== null && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 px-6 py-2 rounded-full bg-white border border-gray-200 shadow-xl"
          >
            {selected === level.correctAnswer ? (
              <span className="text-green-500 font-bold text-xl flex items-center gap-2">Correct! 🎉</span>
            ) : (
              <span className="text-red-500 font-bold text-xl flex items-center gap-2">Incorrect ❌</span>
            )}
          </motion.div>
        )}
      </div>
      
      {/* Footer Buttons */}
      <div className="flex-shrink-0 grid grid-cols-2 gap-4 pb-2">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(true)}
          disabled={selected !== null}
          /* CONFIG: Button Height (h-28) and Text Size (text-xl) */
          className={`
            h-28 md:h-36 rounded-2xl flex flex-col items-center justify-center transition-all shadow-lg
            ${selected === true 
              ? (level.correctAnswer === true ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-red-500 text-white shadow-red-500/30')
              : 'bg-white text-gray-700 hover:border-secondary border-4 border-transparent hover:text-secondary'
            }
            ${selected !== null && selected !== true ? 'opacity-30' : ''}
          `}
        >
          <ThumbsUp className={`w-8 h-8 mb-2 ${selected === true ? 'text-white' : 'text-secondary'}`} />
          <span className="text-xl font-black tracking-wide">YES</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => handleSelect(false)}
          disabled={selected !== null}
          /* CONFIG: Button Height (h-28) and Text Size (text-xl) */
          className={`
            h-28 md:h-36 rounded-2xl flex flex-col items-center justify-center transition-all shadow-lg
            ${selected === false 
              ? (level.correctAnswer === false ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-red-500 text-white shadow-red-500/30')
              : 'bg-white text-gray-700 hover:border-secondary border-4 border-transparent hover:text-secondary'
            }
            ${selected !== null && selected !== false ? 'opacity-30' : ''}
          `}
        >
          <ThumbsDown className={`w-8 h-8 mb-2 ${selected === false ? 'text-white' : 'text-secondary'}`} />
          <span className="text-xl font-black tracking-wide">NO</span>
        </motion.button>
      </div>
    </div>
  );
};