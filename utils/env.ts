export const config = {
  mockBackendUrl: 'https://reactnativeapptrips.onrender.com', 
  jsonplaceholderUrl: process.env.EXPO_PUBLIC_JSONPLACEHOLDER_URL || 'https://jsonplaceholder.typicode.com',
    debugMode: process.env.EXPO_PUBLIC_DEBUG_MODE === 'true',
} as const;

export type Config = typeof config;
