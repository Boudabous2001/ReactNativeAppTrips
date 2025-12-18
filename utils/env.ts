export const config = {
  mockBackendUrl: 'http://192.168.1.164:4000', 
  jsonplaceholderUrl: process.env.EXPO_PUBLIC_JSONPLACEHOLDER_URL || 'https://jsonplaceholder.typicode.com',
  
  // Debug mode
  debugMode: process.env.EXPO_PUBLIC_DEBUG_MODE === 'true',
} as const;

export type Config = typeof config;
