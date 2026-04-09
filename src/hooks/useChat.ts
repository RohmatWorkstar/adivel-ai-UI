import { useState, useCallback } from 'react';
import { Message, Place } from '../types';
import { searchPlaces } from '../services/api';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    text: 'Hi there! I am your AI map assistant. Where would you like to go or what are you looking for?',
    sender: 'ai',
    timestamp: new Date()
  }]);
  
  const [places, setPlaces] = useState<Place[]>([]);
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    // Clear previous results slightly for a clean UX, or keep them if preferred.
    // Let's keep them until new results arrive.

    try {
      const response = await searchPlaces(text);
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.summary,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, aiMessage]);
      setPlaces(response.places);
      setSummary(response.summary);
    } catch (err) {
      console.error('Search failed:', err);
      // Simulate friendly error state
      setError('I could not reach the server. Please try again later.');
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I am having trouble connecting to the backend. Please check your connection or try again later.',
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const retryLastMessage = useCallback(() => {
    // Find the last user message
    const lastUserMessage = [...messages].reverse().find(m => m.sender === 'user');
    if (lastUserMessage) {
      sendMessage(lastUserMessage.text);
    }
  }, [messages, sendMessage]);

  return {
    messages,
    places,
    summary,
    isLoading,
    error,
    sendMessage,
    retryLastMessage,
    clearError: () => setError(null)
  };
};
