import React, { useState, useRef, useEffect } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
  disabled: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [disabled]);

  const handleSend = () => {
    if (text.trim() && !disabled) {
      onSend(text);
      setText('');
      // Reset height
      if (inputRef.current) {
        inputRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    // Auto resize
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="p-4 bg-gray-900 border-t border-gray-800 w-full relative z-10">
      <div className="relative flex items-end w-full bg-gray-800 rounded-2xl border border-gray-700 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500 transition-all p-1 shadow-lg">
        <textarea
          ref={inputRef}
          value={text}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask me to find places..."
          disabled={disabled}
          className="w-full max-h-[120px] bg-transparent border-none focus:outline-none focus:ring-0 resize-none text-gray-100 placeholder-gray-500 py-3 pl-4 pr-12 text-sm disabled:opacity-50"
          rows={1}
        />
        <button
          onClick={handleSend}
          disabled={!text.trim() || disabled}
          className="absolute right-2 bottom-2 p-2 rounded-xl bg-primary-600 text-white disabled:bg-gray-700 disabled:text-gray-500 transition-colors flex items-center justify-center hover:bg-primary-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
          </svg>
        </button>
      </div>
      <div className="text-center mt-2">
        <span className="text-[10px] text-gray-500">AI can make mistakes. Verify important information.</span>
      </div>
    </div>
  );
};
