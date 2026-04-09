import React, { useEffect, useRef } from 'react';
import { Message } from '../../types';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { Loader } from '../ui/Loader';

interface ChatContainerProps {
  messages: Message[];
  isLoading: boolean;
  onSendMessage: (text: string) => void;
  error: string | null;
  onRetry: () => void;
}

export const ChatContainer: React.FC<ChatContainerProps> = ({
  messages,
  isLoading,
  onSendMessage,
  error,
  onRetry
}) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex flex-col h-full bg-gray-900 border-r border-gray-800 shadow-2xl relative z-20">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-5 border-b border-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-600 to-primary-400 flex items-center justify-center shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-white tracking-tight">AI Explorer</h1>
            <p className="text-xs text-primary-400 font-medium">Smart Recommendations</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 scroll-smooth">
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        {isLoading && <Loader />}
        
        {error && (
          <div className="flex flex-col items-center mt-4 mb-2 p-4 bg-red-900/20 border border-red-800/50 rounded-xl">
            <p className="text-sm text-red-400 mb-3 text-center">{error}</p>
            <button 
              onClick={onRetry}
              className="px-4 py-1.5 bg-red-800/50 hover:bg-red-700/50 text-red-200 text-sm font-medium rounded-lg transition-colors border border-red-700/50"
            >
              Try Again
            </button>
          </div>
        )}
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* Input */}
      <ChatInput onSend={onSendMessage} disabled={isLoading} />
    </div>
  );
};
