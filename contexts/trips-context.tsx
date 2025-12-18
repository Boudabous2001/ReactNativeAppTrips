import React, { createContext, useContext, ReactNode } from 'react';
import { useTrips } from '@/hooks/use-trips';
import { Trip } from '@/types';

interface TripsContextType {
  trips: Trip[];
  isLoading: boolean;
  isRefreshing: boolean;
  refreshTrips: () => Promise<void>;
  createTrip: (trip: Partial<Trip>) => Promise<Trip>;
  toggleFavorite: (tripId: string) => Promise<Trip>;
}

const TripsContext = createContext<TripsContextType | undefined>(undefined);

export function TripsProvider({ children }: { children: ReactNode }) {
  const tripsData = useTrips();
  
  return (
    <TripsContext.Provider value={tripsData}>
      {children}
    </TripsContext.Provider>
  );
}

export function useTripsContext() {
  const context = useContext(TripsContext);
  if (!context) {
    throw new Error('useTripsContext must be used within TripsProvider');
  }
  return context;
}