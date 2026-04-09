import React, { useEffect } from 'react';
import { Marker, Popup, useMap as useLeafletMap } from 'react-leaflet';
import L from 'leaflet';
import { Place } from '../../types';

interface MarkerLayerProps {
  places: Place[];
  center: [number, number];
  topRecommendation: Place | null;
  onSelectPlace: (place: Place) => void;
}

// Convert price level to icons
const getPriceString = (level: number) => {
  if (level === 1) return '💰 murah';
  if (level === 2) return '💰💰 sedang';
  if (level >= 3) return '💰💰💰 mahal';
  return '💰 unrated';
};

// Custom icons
const defaultIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Create a custom HTML icon for the top recommendation
const createTopIcon = () => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="relative flex items-center justify-center w-10 h-10">
        <div class="absolute inset-0 bg-primary-500 rounded-full opacity-50 animate-ping"></div>
        <div class="relative flex items-center justify-center w-8 h-8 bg-primary-600 border-2 border-white rounded-full shadow-lg z-10 text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20]
  });
};

export const MarkerLayer: React.FC<MarkerLayerProps> = ({ places, center, topRecommendation, onSelectPlace }) => {
  const map = useLeafletMap();

  useEffect(() => {
    if (places.length > 0) {
      map.flyTo(center, 14, {
        animate: true,
        duration: 1.5
      });
    }
  }, [center, places.length, map]);

  return (
    <>
      {places.map((place, idx) => {
        const isTop = topRecommendation?.name === place.name;
        
        return (
          <Marker
            key={`${place.name}-${idx}`}
            position={[place.lat, place.lng]}
            icon={isTop ? createTopIcon() : defaultIcon}
            eventHandlers={{
              click: () => onSelectPlace(place)
            }}
          >
            <Popup className="custom-popup">
              <div className="p-4 w-60">
                {isTop && (
                  <div className="mb-2 inline-flex items-center space-x-1 bg-primary-900/50 text-primary-400 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wider border border-primary-800/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span>Best Match</span>
                  </div>
                )}
                <h3 className="font-bold text-base text-white mb-1 leading-tight">{place.name}</h3>
                
                <div className="flex items-center space-x-3 text-sm text-gray-300 mb-2">
                  <div className="flex items-center text-yellow-500">
                    <span className="font-medium mr-1">{place.rating.toFixed(1)}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-green-400 font-medium">{getPriceString(place.price_level)}</span>
                </div>
                
                <p className="text-xs text-gray-400 leading-relaxed border-t border-gray-700 pt-2 mt-1">
                  {place.address}
                </p>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </>
  );
};
