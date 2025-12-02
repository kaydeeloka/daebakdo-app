import React from 'react';
import { Choice } from '../types';

interface ChoiceAreaProps {
  choices: Choice[];
  onSelect: (choice: Choice) => void;
  disabled: boolean;
}

export const ChoiceArea: React.FC<ChoiceAreaProps> = ({ choices, onSelect, disabled }) => {
  if (choices.length === 0) return null;

  return (
    <div className="p-4 bg-white border-t border-border animate-fadeInScaleUp">
      <div className="grid grid-cols-1 gap-4">
        {choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onSelect(choice)}
            disabled={disabled}
            className={`
              w-full text-left px-6 py-5 rounded-2xl border border-border 
              text-dark-text hover:bg-neutral-bg hover:border-primary-light hover:text-primary-dark
              transition-all duration-200 active:scale-[0.99] font-medium text-lg md:text-xl
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  );
};