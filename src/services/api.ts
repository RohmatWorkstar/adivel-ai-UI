import axios from 'axios';
import { SearchResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const searchPlaces = async (query: string): Promise<SearchResponse> => {
  const response = await api.post<SearchResponse>('/api/search', { query });
  return response.data;
};
