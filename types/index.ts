export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  roles?: string[];
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface Trip {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  image?: string;
  description?: string;
  photos?: string[];
  isFavorite?: boolean;  
  location?: {
    lat: number;
    lng: number;
  };
}

export interface ApiError {
  message: string;
  status: number;
}