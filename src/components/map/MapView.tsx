import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { MarkerLayer } from './MarkerLayer';
import { EmptyState } from '../ui/EmptyState';
import { MapLoader } from '../ui/Loader';
import { useMap } from '../../hooks/useMap';
import { Place } from '../../types';

interface MapViewProps {
  places: Place[];
  isLoading: boolean;
}

export const MapView: React.FC<MapViewProps> = ({ places, isLoading }) => {
  const { center, topRecommendation, handleSelectPlace } = useMap(places);

  return (
    <div className="relative w-full h-full bg-gray-900 overflow-hidden">
      {isLoading && <MapLoader />}
      {!isLoading && places.length === 0 && <EmptyState />}
      
      <MapContainer
        center={center}
        zoom={13}
        className="w-full h-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
          // Using a dark theme reliable tile from CartoDB (free without key for small usage, great for dark mode saas)
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {places.length > 0 && (
          <MarkerLayer
            places={places}
            center={center}
            topRecommendation={topRecommendation}
            onSelectPlace={handleSelectPlace}
          />
        )}
      </MapContainer>

      {/* Map Overlay Top Bar (optional, to add to the SaaS feel) */}
      <div className="absolute top-4 right-4 z-10 pointer-events-none">
        <div className="glass-panel px-4 py-2 rounded-full flex items-center space-x-2 text-sm text-gray-300 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="font-medium tracking-wide">Live Map</span>
        </div>
      </div>
    </div>
  );
};
