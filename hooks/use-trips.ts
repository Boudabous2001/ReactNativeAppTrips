import { api } from '@/services/api';
import { Trip } from '@/types';
import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadTrips = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await api.getTrips();
      console.log('✅ Trips chargés:', data);
      setTrips(data);
    } catch (error: any) {
      console.error('❌ Error loading trips:', error);
      Alert.alert('Erreur', error.message || 'Impossible de charger les voyages');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshTrips = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const data = await api.getTrips();
      setTrips(data);
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const createTrip = useCallback(async (trip: Partial<Trip>) => {
    try {
      console.log('🚀 Creating trip:', trip);
      const newTrip = await api.createTrip(trip);
      console.log('✅ Trip créé:', newTrip);
      setTrips(prev => [newTrip, ...prev]);
      return newTrip;
    } catch (error: any) {
      console.error('❌ Error creating trip:', error);
      Alert.alert('Erreur', error.message);
      throw error;
    }
  }, []);

  useEffect(() => {
    loadTrips();
  }, [loadTrips]);

  return {
    trips,
    isLoading,
    isRefreshing,
    refreshTrips,
    createTrip,
  };
}