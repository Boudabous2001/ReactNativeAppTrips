import { useNotifications } from '@/hooks/use-notifications';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as Device from 'expo-device';
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from 'react';
import { Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function NotificationScreen() {
  const { t } = useTranslation();
  const [logs, setLogs] = useState<string[]>([]);
  const {
    pushToken,
    hasPermission,
    badgeCount,
    initialize,
    send,
    schedule,
    setBadgeCount,
    clearBadge,
  } = useNotifications(
    (notification) => {
      addLog(`✅ ${t('notifications.received')}: ${notification.request.content.title}`);
    },
    (data) => {
      addLog(`🔔 ${t('notifications.tapped')}: ${JSON.stringify(data)}`);
    }
  );

  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString('fr-FR');
    setLogs((prev) => [`${timestamp}: ${message}`, ...prev].slice(0, 10));
  };

  const isWeb = Platform.OS === 'web';

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient colors={['#a855f7', '#ec4899']} style={styles.header}>
          <Text style={styles.headerTitle}>{t('notifications.title')}</Text>
        </LinearGradient>

        <View style={styles.content}>
          {/* Web Warning */}
          {isWeb && (
            <View style={styles.webWarning}>
              <Ionicons name="information-circle" size={20} color="#3b82f6" />
              <Text style={styles.webWarningText}>
                {t('notifications.webWarning')}
              </Text>
            </View>
          )}

          {/* Device Info */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="phone-portrait-outline" size={24} color="#a855f7" />
              <Text style={styles.cardTitle}>{t('notifications.device')}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('notifications.deviceType')}:</Text>
              <Text style={styles.infoValue}>
                {Device.isDevice ? t('notifications.physical') : t('notifications.simulator')}
              </Text>
            </View>
          </View>

          {/* Permissions */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="lock-closed-outline" size={24} color="#a855f7" />
              <Text style={styles.cardTitle}>{t('notifications.permissions')}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('notifications.status')}:</Text>
              <View style={styles.statusBadge}>
                <View
                  style={[
                    styles.statusDot,
                    hasPermission ? styles.statusDotGranted : styles.statusDotDenied,
                  ]}
                />
                <Text style={styles.statusText}>
                  {hasPermission ? t('notifications.granted') : t('notifications.denied')}
                </Text>
              </View>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>{t('notifications.badgeCount')}:</Text>
              <Text style={styles.infoValue}>{badgeCount}</Text>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>{t('notifications.actions')}</Text>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={async () => {
                const token = await initialize();
                addLog(token ? `✅ ${t('notifications.initialized')}` : `❌ ${t('notifications.initFailed')}`);
              }}
            >
              <LinearGradient colors={['#a855f7', '#ec4899']} style={styles.actionButtonGradient}>
                <Ionicons name="notifications-outline" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>{t('notifications.initialize')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                send('Test Notification', t('notifications.testMessage'));
                addLog(`📤 ${t('notifications.immediateSent')}`);
              }}
            >
              <LinearGradient colors={['#10b981', '#059669']} style={styles.actionButtonGradient}>
                <Ionicons name="send-outline" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>{t('notifications.sendImmediate')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={async () => {
                const futureDate = new Date(Date.now() + 5000);
                await schedule(t('notifications.scheduledTitle'), t('notifications.scheduledBody5'), futureDate);
                addLog(`⏰ ${t('notifications.scheduled5')}`);
              }}
            >
              <LinearGradient colors={['#3b82f6', '#2563eb']} style={styles.actionButtonGradient}>
                <Ionicons name="time-outline" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>{t('notifications.schedule5sec')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionButton}
              onPress={async () => {
                const futureDate = new Date(Date.now() + 30000);
                await schedule(t('notifications.scheduledTitle'), t('notifications.scheduledBody30'), futureDate);
                addLog(`⏰ ${t('notifications.scheduled30')}`);
              }}
            >
              <LinearGradient colors={['#3b82f6', '#2563eb']} style={styles.actionButtonGradient}>
                <Ionicons name="time-outline" size={20} color="#fff" />
                <Text style={styles.actionButtonText}>{t('notifications.schedule30sec')}</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.badgeRow}>
              <TouchableOpacity
                style={[styles.actionButton, styles.halfButton]}
                onPress={() => {
                  setBadgeCount(5);
                  addLog(`🔢 ${t('notifications.badgeSet')}: 5`);
                }}
              >
                <LinearGradient colors={['#f59e0b', '#d97706']} style={styles.actionButtonGradient}>
                  <Text style={styles.actionButtonText}>{t('notifications.setBadge')}</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionButton, styles.halfButton]}
                onPress={() => {
                  clearBadge();
                  addLog(`🔢 ${t('notifications.badgeCleared')}`);
                }}
              >
                <LinearGradient colors={['#ef4444', '#dc2626']} style={styles.actionButtonGradient}>
                  <Text style={styles.actionButtonText}>{t('notifications.clearBadge')}</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>

          {/* Test Results */}
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{t('notifications.testResults')}</Text>
              <TouchableOpacity onPress={() => setLogs([])}>
                <Text style={styles.clearButton}>{t('notifications.clear')}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.logsContainer}>
              {logs.length === 0 ? (
                <Text style={styles.noLogs}>{t('notifications.noLogs')}</Text>
              ) : (
                logs.map((log, index) => (
                  <Text key={index} style={styles.logText}>
                    {log}
                  </Text>
                ))
              )}
            </View>
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
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 24,
  },
  webWarning: {
    backgroundColor: '#dbeafe',
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  webWarningText: {
    flex: 1,
    color: '#1e40af',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusDotGranted: {
    backgroundColor: '#10b981',
  },
  statusDotDenied: {
    backgroundColor: '#ef4444',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
  },
  actionButton: {
    marginBottom: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  halfButton: {
    flex: 1,
  },
  actionButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    gap: 8,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 12,
  },
  clearButton: {
    color: '#a855f7',
    fontSize: 14,
    fontWeight: '600',
  },
  logsContainer: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 12,
    maxHeight: 200,
  },
  noLogs: {
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 14,
    fontStyle: 'italic',
  },
  logText: {
    fontSize: 12,
    color: '#374151',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
});