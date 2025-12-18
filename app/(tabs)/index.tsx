import { useAuth } from '@/contexts/auth-context';
import { useTrips } from '@/hooks/use-trips';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export const IMAGES_SOURCES = {
  paris: require('@/assets/images/paris.jpeg'),
  tokyo: require('@/assets/images/tokyo.jpeg'),
  bali: require('@/assets/images/bali.jpeg'),
};

export default function HomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = useAuth();
  const { trips, isLoading, refreshTrips, isRefreshing } = useTrips();

  // Calculer les stats depuis les vraies données
  const stats = [
    { label: t('home.trips'), value: trips.length, icon: 'airplane-outline' },
    { label: t('home.photos'), value: trips.reduce((acc, trip) => acc + (trip.photos?.length || 0), 0), icon: 'camera-outline' },
    { label: t('home.countries'), value: new Set(trips.map(t => t.destination.split(',')[1]?.trim())).size, icon: 'globe-outline' },
  ] as const;

  // Filtrer les voyages à venir
  const upcomingTrips = trips
    .filter(trip => new Date(trip.startDate) > new Date())
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  const getDaysUntil = (date: string) => {
    const now = new Date();
    const tripDate = new Date(date);
    const diff = tripDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const formatDateRange = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startStr = start.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    const endStr = end.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
    return `${startStr} - ${endStr}`;
  };

  const activities = [
    { icon: 'walk-outline', text: t('home.activity1'), time: t('home.activity1Time') },
    { icon: 'camera-outline', text: t('home.activity2'), time: t('home.activity2Time') },
    { icon: 'airplane-outline', text: t('home.activity3'), time: t('home.activity3Time') },
  ] as const;

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#a855f7" />
          <Text style={styles.loadingText}>{t('common.loading')}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={refreshTrips} />
        }
      >
        {/* Header */}
        <LinearGradient colors={['#a855f7', '#ec4899']} style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greentingText}>{t('home.hello')}</Text>
              <Text style={styles.firstnameText}>{user?.name || t('home.traveler')}!</Text>
            </View>
            <TouchableOpacity 
              style={styles.notificationBtn}
              onPress={() => router.push('/notification')}
            >
              <Ionicons name="notifications-outline" size={24} color="rgba(255, 255, 255, 0.8)" />
            </TouchableOpacity>
          </View>

          {/* Stats */}
          <View style={styles.statsContainer}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <Ionicons name={stat.icon} color="#fff" style={styles.statIcon} />
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </LinearGradient>

        {/* Content */}
        <View style={styles.homeContent}>
          {/* Upcoming trips */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>{t('home.upcomingTrips')}</Text>
              <TouchableOpacity onPress={() => router.push('/trips')}>
                <Text style={styles.homeSeeAllBtn}>{t('home.seeAll')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {upcomingTrips.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="airplane-outline" size={64} color="#9ca3af" />
            <Text style={styles.emptyStateText}>{t('home.noUpcomingTrips')}</Text>
            <TouchableOpacity
              style={styles.addTripButton}
              onPress={() => router.push('/modal/add-trip')}
            >
              <Text style={styles.addTripButtonText}>{t('home.createTrip')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          upcomingTrips.map((trip) => (
            <TouchableOpacity 
              key={trip.id} 
              style={styles.tripCard}
              onPress={() => router.push({
                pathname: '/trip/[id]',
                params: { id: trip.id }
              })}
            >
              <Image
                source={
                  trip.image?.includes('http')
                    ? { uri: trip.image }
                    : IMAGES_SOURCES[trip.image as keyof typeof IMAGES_SOURCES] || IMAGES_SOURCES.paris
                }
                style={styles.tripImage}
              />
              <View style={styles.tripInfo}>
                <Text style={styles.tripTitle}>{trip.title}</Text>
                <View style={styles.tripDate}>
                  <Ionicons name="calendar-outline" size={16} color="#6b7280" />
                  <Text style={styles.tripDateText}>{formatDateRange(trip.startDate, trip.endDate)}</Text>
                </View>
                <View style={styles.tripBadge}>
                  <Text style={styles.tripBadgeText}>
                    {t('home.in')} {getDaysUntil(trip.startDate)} {t('home.days')}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={{ ...styles.sectionTitle, paddingHorizontal: 12 }}>{t('home.quickActions')}</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity onPress={() => router.push('/modal/add-trip')}>
              <LinearGradient colors={['#a855f7', '#ec4899']} style={styles.quickActionCard}>
                <Ionicons name="add-circle-outline" size={24} color="#fff" />
                <Text style={styles.quickActionLabel}>{t('home.newTrip')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/modal/add-trip')}>
              <LinearGradient colors={['#3b82f6', '#06b6d4']} style={styles.quickActionCard}>
                <Ionicons name="camera-outline" size={24} color="#fff" />
                <Text style={styles.quickActionLabel}>{t('home.addPhoto')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/trips')}>
              <LinearGradient colors={['#10b981', '#059669']} style={styles.quickActionCard}>
                <Ionicons name="map-outline" size={24} color="#fff" />
                <Text style={styles.quickActionLabel}>{t('home.explore')}</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <View style={{ paddingHorizontal: 12 }}>
            <Text style={{ ...styles.sectionTitle, paddingHorizontal: 12 }}>{t('home.recentActivity')}</Text>
            {activities.map((activity, idx) => (
              <View style={styles.activityCard} key={idx}>
                <Text style={styles.activityIcon}>
                  <Ionicons name={activity.icon} size={24} color="#6b7280" />
                </Text>
                <View>
                  <Text style={styles.activityText}>{activity.text}</Text>
                  <Text style={styles.activityTime}>{activity.time}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greentingText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 24,
  },
  firstnameText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  notificationBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  statValue: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
  homeContent: {
    padding: 24,
    paddingBottom: 0,
    marginBottom: 0,
  },
  section: {
    marginBottom: 24,
    marginTop: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111827',
  },
  homeSeeAllBtn: {
    color: '#a855f7',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 48,
    marginHorizontal: 24,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 16,
    marginBottom: 24,
  },
  addTripButton: {
    backgroundColor: '#a855f7',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  addTripButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  tripCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    marginBottom: 12,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tripImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
  },
  tripInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
  },
  tripDate: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  tripDateText: {
    color: '#6b7280',
    fontSize: 14,
  },
  tripBadge: {
    backgroundColor: '#ede9fe',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  tripBadgeText: {
    color: '#7c3aed',
    fontSize: 12,
    fontWeight: 'bold',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingHorizontal: 12,
  },
  quickActionCard: {
    width: 110,
    height: 110,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionLabel: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
    marginTop: 8,
  },
  activityIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  activityText: {
    fontSize: 14,
    color: '#111827',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#9ca3af',
  },
});