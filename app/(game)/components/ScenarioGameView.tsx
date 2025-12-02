import React, { useEffect, useRef } from 'react';
import { Scenario } from '../types';
import { ChatMessage } from './ChatMessage';
import { TypingIndicator } from './TypingIndicator';
import { ChoiceArea } from './ChoiceArea';
import { useGameEngine } from '../hooks/useGameEngine';
import { RotateCcw, ArrowLeft, Coffee, Plane, HelpCircle } from 'lucide-react';

// Icon mapping (local to this view or shared if preferred)
const ICON_MAP: Record<string, React.ElementType> = {
  coffee: Coffee,
  plane: Plane,
  default: HelpCircle 
};

interface ScenarioGameViewProps {
  scenario: Scenario;
  onExit: () => void;
}

export const ScenarioGameView: React.FC<ScenarioGameViewProps> = ({ scenario, onExit }) => {
  const {
    messages,
    gameState,
    isTyping,
    showChoices,
    currentChoices,
    startGame,
    handleChoiceSelect
  } = useGameEngine(scenario);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-start when mounted
  useEffect(() => {
    startGame();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scenario.id]);

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showChoices]);

  const renderIcon = (iconName: string) => {
    const Icon = ICON_MAP[iconName] || ICON_MAP.default;
    return <Icon size={24} />;
  };

  return (
    <div className="flex flex-col h-full bg-light-bg relative">
      {/* HEADER: Specific to Scenario View */}
      <header className="bg-white border-b border-border p-4 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center space-x-4">
          <button 
            onClick={onExit}
            className="text-gray-400 hover:text-dark-text transition-colors"
          >
            <ArrowLeft size={28} />
          </button>
          <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${scenario.icon === 'coffee' ? 'bg-primary' : 'bg-secondary'}`}>
            {renderIcon(scenario.icon)}
          </div>
          <div>
            <h1 className="font-bold text-dark-text text-xl leading-tight font-korean">
              {scenario.title}
            </h1>
            <p className="text-sm text-correct font-medium flex items-center">
              <span className="w-2.5 h-2.5 bg-correct rounded-full mr-1.5"></span>
              Live Chat
            </p>
          </div>
        </div>
        <button 
          onClick={startGame}
          className="p-3 text-gray-400 hover:text-primary hover:bg-neutral-bg rounded-full transition-colors"
          title="Restart Scenario"
        >
          <RotateCcw size={24} />
        </button>
      </header>

      {/* CHAT AREA */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* FOOTER: Choices or Game Over */}
      <div className="bg-white z-10 border-t border-border">
        {gameState === 'GAME_OVER' ? (
          <div className="p-6 text-center bg-neutral-bg animate-fadeInScaleUp">
            <h3 className="text-2xl font-bold text-primary-dark mb-2 font-korean">Scenario Complete!</h3>
            <p className="text-dark-text text-lg mb-6">You successfully completed {scenario.title}.</p>
            <div className="flex justify-center space-x-4">
               <button 
                onClick={startGame}
                className="px-8 py-3 bg-primary text-white text-lg rounded-full font-medium shadow-lg hover:bg-primary-dark transition-transform active:scale-95"
              >
                Replay
              </button>
              <button 
                onClick={onExit}
                className="px-8 py-3 bg-white text-primary border border-primary text-lg rounded-full font-medium hover:bg-neutral-bg transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          showChoices && (
            <ChoiceArea 
              choices={currentChoices} 
              onSelect={handleChoiceSelect} 
              disabled={isTyping} 
            />
          )
        )}
      </div>
    </div>
  );
};