export interface Place {
  name: string;
  rating: number;
  address: string;
  lat: number;
  lng: number;
  price_level: number;
}

export interface SearchResponse {
  places: Place[];
  summary: string;
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}
