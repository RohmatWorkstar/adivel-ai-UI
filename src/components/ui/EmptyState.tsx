import React from 'react';

export const EmptyState: React.FC = () => {
  return (
    <div className="absolute inset-0 z-[999] flex flex-col items-center justify-center bg-gray-900 p-8 text-center pointer-events-none">
      <div className="w-24 h-24 mb-6 rounded-full bg-gray-800 flex items-center justify-center shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-2">Discover New Places</h3>
      <p className="text-gray-400 max-w-sm mb-8">
        Try searching for food, cafes, or restaurants nearby. I'll help you find the best spots.
      </p>
      <div className="grid grid-cols-2 gap-3 w-full max-w-md">
        <div className="bg-gray-800 text-gray-300 py-3 px-4 rounded-xl text-sm border border-gray-700 pointer-events-auto cursor-pointer hover:bg-gray-700 transition-colors">
          "Best coffee in Sudirman"
        </div>
        <div className="bg-gray-800 text-gray-300 py-3 px-4 rounded-xl text-sm border border-gray-700 pointer-events-auto cursor-pointer hover:bg-gray-700 transition-colors">
          "Affordable sushi nearby"
        </div>
        <div className="bg-gray-800 text-gray-300 py-3 px-4 rounded-xl text-sm border border-gray-700 pointer-events-auto cursor-pointer hover:bg-gray-700 transition-colors">
          "Quiet place to work"
        </div>
        <div className="bg-gray-800 text-gray-300 py-3 px-4 rounded-xl text-sm border border-gray-700 pointer-events-auto cursor-pointer hover:bg-gray-700 transition-colors">
          "Top rated steakhouses"
        </div>
      </div>
    </div>
  );
};
