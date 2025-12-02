import React, { useState, useEffect } from 'react';
import { WordPuzzleLevel as IWordPuzzleLevel } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { shuffleArray } from '../../utils';

interface Letter {
  id: string;
  char: string;
}

interface WordPuzzleLevelProps {
  level: IWordPuzzleLevel;
  onComplete: (success: boolean) => void;
}

export const WordPuzzleLevel: React.FC<WordPuzzleLevelProps> = ({ level, onComplete }) => {
  const [bank, setBank] = useState<Letter[]>([]);
  const [slots, setSlots] = useState<(Letter | null)[]>([]);
  const [status, setStatus] = useState<'playing' | 'correct' | 'wrong'>('playing');

  useEffect(() => {
    const chars = level.word.toUpperCase().split('');
    const initialLetters: Letter[] = chars.map((char, i) => ({
      id: `${char}-${i}-${Math.random()}`,
      char
    }));
    
    setBank(shuffleArray(initialLetters));
    setSlots(new Array(chars.length).fill(null));
    setStatus('playing');
  }, [level]);

  const handleBankClick = (letter: Letter) => {
    if (status !== 'playing') return;

    const firstEmptyIndex = slots.findIndex(s => s === null);
    if (firstEmptyIndex === -1) return;

    const newSlots = [...slots];
    newSlots[firstEmptyIndex] = letter;
    setSlots(newSlots);

    setBank(prev => prev.filter(l => l.id !== letter.id));
  };

  const handleSlotClick = (index: number) => {
    if (status !== 'playing') return;
    
    const letter = slots[index];
    if (!letter) return;

    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);

    setBank(prev => [...prev, letter]);
  };

  useEffect(() => {
    if (slots.length > 0 && slots.every(s => s !== null)) {
      const currentWord = slots.map(s => s?.char).join('');
      if (currentWord === level.word.toUpperCase()) {
        setStatus('correct');
        setTimeout(() => onComplete(true), 1500);
      } else {
        setStatus('wrong');
        setTimeout(() => setStatus('playing'), 1000); 
      }
    }
  }, [slots, level.word, onComplete]);

  return (
    <div className="flex flex-col h-full w-full">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-start pt-2 gap-6">
        {/* CONFIG: Question Text Size */}
        <h2 className="text-xl md:text-2xl font-bold text-dark-text text-center">{level.question}</h2>
        
        {/* CONFIG: Image Container Height (max-h-[30vh]) */}
        <div className="relative group rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white w-full max-h-[30vh] aspect-video">
          <img 
            src={level.imageUrl} 
            alt="Puzzle" 
            className="w-full h-full object-contain"
          />
        </div>

        {/* Answer Slots */}
        <div className="flex gap-2 justify-center flex-wrap w-full mt-4">
          {slots.map((slot, i) => (
            <motion.button
              key={i}
              onClick={() => handleSlotClick(i)}
              layout
              /* CONFIG: Slot Size (w-12 h-14) and Text Size (text-2xl) */
              className={`w-12 h-14 md:w-14 md:h-16 rounded-lg border-b-[4px] flex items-center justify-center text-2xl font-black transition-all
                ${slot 
                  ? (status === 'correct' 
                      ? 'bg-green-500 border-green-700 text-white shadow-green-500/50' 
                      : status === 'wrong'
                        ? 'bg-red-500 border-red-700 text-white shadow-red-500/50'
                        : 'bg-secondary border-secondary-dark text-white shadow-blue-500/30')
                  : 'bg-gray-200 border-gray-300 text-transparent'
                }
              `}
              whileHover={slot ? { y: -2 } : {}}
              whileTap={slot ? { y: 2 } : {}}
              animate={status === 'wrong' ? { x: [-5, 5, -5, 5, 0] } : {}}
            >
              {slot?.char}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Footer: Bank */}
      <div className="flex-shrink-0 pt-4 pb-2">
         {/* CONFIG: Bank Container Padding and Min Height */}
         <div className="flex gap-2 justify-center flex-wrap p-4 bg-white rounded-[1.5rem] w-full min-h-[5rem] border-2 border-gray-100 shadow-xl">
           <AnimatePresence mode='popLayout'>
              {bank.map((letter) => (
                <motion.button
                  key={letter.id}
                  layoutId={letter.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  onClick={() => handleBankClick(letter)}
                  /* CONFIG: Letter Button Size (w-12 h-12) and Text Size (text-xl) */
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-neutral-bg text-dark-text font-bold text-xl shadow-sm hover:shadow-lg hover:bg-white active:scale-95 transition-all border-2 border-gray-200 flex items-center justify-center hover:text-secondary hover:border-secondary/30"
                >
                  {letter.char}
                </motion.button>
              ))}
           </AnimatePresence>
         </div>
      </div>
    </div>
  );
};