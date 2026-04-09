import { useState, useCallback, useMemo } from 'react';
import { Place } from '../types';

export const useMap = (places: Place[]) => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  // Compute map center and bounds
  const center = useMemo<[number, number]>(() => {
    if (places.length === 0) {
      return [ -6.200000, 106.816666 ]; // Default to Jakarta
    }
    
    // Calculate center based on places
    const sumLat = places.reduce((sum, p) => sum + p.lat, 0);
    const sumLng = places.reduce((sum, p) => sum + p.lng, 0);
    return [sumLat / places.length, sumLng / places.length];
  }, [places]);

  // Determine top recommendation (could be the first item, or one with highest rating)
  const topRecommendation = useMemo<Place | null>(() => {
    if (!places.length) return null;
    
    // Sort by rating desc, return first
    const sorted = [...places].sort((a, b) => b.rating - a.rating);
    return sorted[0];
  }, [places]);

  const handleSelectPlace = useCallback((place: Place) => {
    setSelectedPlace(place);
  }, []);

  return {
    center,
    selectedPlace,
    topRecommendation,
    handleSelectPlace,
    setSelectedPlace
  };
};
