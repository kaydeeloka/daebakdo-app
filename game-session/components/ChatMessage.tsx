import React from 'react';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

/**
 * COMPONENT: ChatMessage
 * Renders a single speech bubble. 
 * Style changes dynamically based on who sent the message.
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  
  // DESIGN: Layout Alignment
  // Bot messages align Left (justify-start), User messages align Right (justify-end)
  const alignmentClass = isBot ? 'justify-start' : 'justify-end';
  
  // DESIGN: Bubble Colors
  // isBot: White background, dark text
  // User: Secondary (Vibrant Blue) background, white text
  // Error: Red tint
  let bubbleColorClass = isBot 
    ? 'bg-white text-dark-text border border-border shadow-sm' 
    : 'bg-secondary text-white shadow-md';

  if (message.isErrorFeedback) {
    bubbleColorClass = 'bg-red-50 text-incorrect border border-red-200';
  }

  return (
    <div className={`flex w-full mb-6 ${alignmentClass} animate-pop`}>
      {/* 
          Bot Avatar 
          CUSTOMIZATION: Change the src string to use a different image.
      */}
      {isBot && (
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-bg flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden border border-border">
          <img 
            src="https://picsum.photos/64/64" 
            alt="Bot Avatar" 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      {/* The Text Bubble */}
      <div className={`max-w-[85%] px-6 py-4 rounded-3xl text-lg md:text-xl leading-relaxed ${bubbleColorClass} ${isBot ? 'rounded-tl-none' : 'rounded-tr-none'}`}>
        {message.text}
      </div>
    </div>
  );
};