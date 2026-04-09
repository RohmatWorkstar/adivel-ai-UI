import React from 'react';
import { Message } from '../../types';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 fade-in duration-300`}>
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-primary-600 flex-shrink-0 flex items-center justify-center mr-3 mt-1 shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      )}
      
      <div 
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm
          ${isUser 
            ? 'bg-primary-600 text-white rounded-br-sm' 
            : 'bg-gray-800 text-gray-200 border border-gray-700 rounded-tl-sm'
          }`}
      >
        <p className="whitespace-pre-wrap font-medium">{message.text}</p>
        <span className={`text-[10px] block mt-1.5 opacity-60 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};
