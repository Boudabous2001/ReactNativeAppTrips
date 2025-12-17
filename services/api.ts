import { ApiError, Trip } from '@/types';
import { config } from '@/utils/env';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = config.mockBackendUrl;
  }

  private async getAuthHeaders(): Promise<HeadersInit> {
    const token = await AsyncStorage.getItem('accessToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = 'Une erreur est survenue';
      
      try {
        const data = await response.json();
        errorMessage = data.error || data.message || errorMessage;
      } catch (e) {
        // Response n'est pas du JSON
      }

      const error: ApiError = {
        message: errorMessage,
        status: response.status,
      };
      throw error;
    }

    return response.json();
  }

  async get<T>(endpoint: string): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers,
    });
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });
    return this.handleResponse<T>(response);
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    const headers = await this.getAuthHeaders();
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: data ? JSON.stringify(data) : undefined,
    });
    return this.handleResponse<T>(response);
  }

  async uploadImage(uri: string): Promise<string> {
    const token = await AsyncStorage.getItem('accessToken');
    const formData = new FormData();
    
    const filename = uri.split('/').pop() || 'photo.jpg';
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    formData.append('file', {
      uri,
      name: filename,
      type,
    } as any);

    const response = await fetch(`${this.baseURL}/uploads`, {
      method: 'POST',
      body: formData,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
    });

    if (!response.ok) {
      throw new Error('Error uploading image');
    }

    const data = await response.json();
    return data.url;
  }

  async getTrips(): Promise<Trip[]> {
    return this.get<Trip[]>('/trips');
  }

  async getTripById(id: string): Promise<Trip> {
    return this.get<Trip>(`/trips/${id}`);
  }

  async createTrip(trip: Partial<Trip>): Promise<Trip> {
    return this.post<Trip>('/trips', trip);
  }

  async toggleFavorite(id: string): Promise<Trip> {
    return this.patch<Trip>(`/trips/${id}/favorite`);
  }
}

export const api = new ApiService();
export type { ApiError };
