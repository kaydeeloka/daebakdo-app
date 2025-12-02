import React from 'react';

export const TypingIndicator: React.FC = () => {
  return (
    <div className="flex w-full mb-6 justify-start animate-pulse">
      <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-neutral-bg flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden border border-border">
         <img 
            src="https://picsum.photos/64/64"
            alt="Bot Avatar" 
            className="w-full h-full object-cover opacity-50"
          />
      </div>
      <div className="bg-white border border-border rounded-3xl rounded-tl-none px-5 py-4 flex items-center space-x-2 h-auto min-h-[3.5rem] w-24">
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  );
};