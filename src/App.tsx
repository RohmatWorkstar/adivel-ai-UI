import React, { useState } from 'react';
import { ChatContainer } from './components/chat/ChatContainer';
import { MapView } from './components/map/MapView';
import { useChat } from './hooks/useChat';

const App: React.FC = () => {
  const { messages, places, isLoading, error, sendMessage, retryLastMessage } = useChat();
  const [isMapVisibleOnMobile, setIsMapVisibleOnMobile] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-900 text-gray-100 overflow-hidden font-sans">
      
      {/* Mobile Toggle Button */}
      <button 
        className="md:hidden fixed top-4 right-4 z-[1000] p-3 glass-panel rounded-full text-white shadow-xl"
        onClick={() => setIsMapVisibleOnMobile(!isMapVisibleOnMobile)}
      >
        {isMapVisibleOnMobile ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
        )}
      </button>

      {/* Chat Panel - Left (30%) */}
      <div 
        className={`w-full md:w-[32%] lg:w-[30%] min-w-[320px] max-w-md h-full flex-shrink-0 transition-transform duration-300 ease-in-out absolute md:relative z-40
          ${isMapVisibleOnMobile ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}
        `}
      >
        <ChatContainer 
          messages={messages} 
          isLoading={isLoading} 
          onSendMessage={sendMessage}
          error={error}
          onRetry={retryLastMessage}
        />
      </div>

      {/* Map Panel - Right (70%) */}
      <div 
        className={`w-full md:flex-1 h-full relative
          ${isMapVisibleOnMobile ? 'block' : 'hidden md:block'}
        `}
      >
        <MapView places={places} isLoading={isLoading} />
      </div>

    </div>
  );
};

export default App;
