import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex space-x-2 justify-start items-center ml-2 my-2 py-3 px-4 bg-gray-800 rounded-2xl rounded-tl-sm w-max max-w-[80%]">
      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce"></div>
      <span className="ml-3 text-sm text-gray-400 font-medium tracking-wide">AI is thinking...</span>
    </div>
  );
};

export const MapLoader: React.FC = () => {
  return (
    <div className="absolute inset-0 z-[1000] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div className="glass-panel p-6 rounded-2xl flex flex-col items-center">
        <div className="w-10 h-10 border-4 border-gray-700 border-t-primary-500 rounded-full animate-spin mb-4"></div>
        <p className="text-gray-300 font-medium">Finding the best spots...</p>
      </div>
    </div>
  );
};
