import React, { useState, useEffect } from 'react';
import { MCQAudioLevel } from '../../types';
import { Button } from '../Button';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Play, Volume2 } from 'lucide-react';
import { shuffleArray } from '../../utils';

interface McqAudioLevelProps {
  level: MCQAudioLevel;
  onComplete: (success: boolean) => void;
}

export const McqAudioLevel: React.FC<McqAudioLevelProps> = ({ level, onComplete }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    setShuffledOptions(shuffleArray(level.options));
    cancelSpeech();
  }, [level]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => cancelSpeech();
  }, []);

  const cancelSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  const handleSpeak = () => {
    if (!('speechSynthesis' in window)) {
      alert("Text-to-Speech is not supported in this browser.");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(level.textToSpeak);
    
    // LOGIC: Language Detection
    // 1. If explicit language is provided in data, use it.
    // 2. If text contains Korean characters, use 'ko-KR'.
    // 3. Otherwise default to 'en-US'.
    if (level.language) {
      utterance.lang = level.language;
    } else {
      const hasKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(level.textToSpeak);
      utterance.lang = hasKorean ? 'ko-KR' : 'en-US';
    }
    
    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSelect = (option: string) => {
    if (hasSubmitted) return;
    
    cancelSpeech();
    
    setSelectedOption(option);
    setHasSubmitted(true);
    
    const isCorrect = option === level.correctAnswer;
    setTimeout(() => {
      onComplete(isCorrect);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full w-full">
      {/* Main Content */}
      <div className="flex-grow flex flex-col items-center justify-center text-center pb-6">
        {/* CONFIG: Question Text Size */}
        <h2 className="text-xl md:text-2xl font-bold text-dark-text mb-8">{level.question}</h2>

        <div className="relative">
          {isPlaying && (
            <motion.div 
              className="absolute inset-0 bg-secondary rounded-full blur-xl opacity-40"
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />
          )}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSpeak}
            /* CONFIG: Play Button Size (w-32 h-32) */
            className={`
              relative z-10 w-32 h-32 rounded-full flex items-center justify-center shadow-xl border-4 transition-all
              ${isPlaying 
                ? 'bg-secondary border-secondary-light shadow-blue-500/50 text-white' 
                : 'bg-white border-gray-100 hover:border-secondary/30 text-secondary'
              }
            `}
          >
            {isPlaying ? (
              <div className="flex gap-2 items-end h-12">
                 <motion.div animate={{ height: [15, 40, 15] }} transition={{ repeat: Infinity, duration: 0.6 }} className="w-2 bg-white rounded-full" />
                 <motion.div animate={{ height: [25, 35, 25] }} transition={{ repeat: Infinity, duration: 0.5, delay: 0.1 }} className="w-2 bg-white rounded-full" />
                 <motion.div animate={{ height: [20, 45, 20] }} transition={{ repeat: Infinity, duration: 0.7, delay: 0.2 }} className="w-2 bg-white rounded-full" />
              </div>
            ) : (
              <Play className="w-12 h-12 ml-2 fill-current" />
            )}
          </motion.button>
        </div>

        <div className="mt-6 flex items-center gap-2 text-gray-500 text-sm font-bold uppercase tracking-widest">
          <Volume2 className="w-4 h-4" />
          <span>Tap to listen</span>
        </div>
      </div>

      {/* Footer: Options */}
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