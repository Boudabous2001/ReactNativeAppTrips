import { NotificationPreferences, notifications, PushToken } from "@/services/notification";
import * as Notifications from 'expo-notifications';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

export const useNotifications = (
    onReceived?: (notification: Notifications.Notification) => void,
    onTapped?: (datam: any) => void
) => {
    const [pushToken, setPushToken] = useState<PushToken | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [hasPermission, setHasPermission] = useState(false);
    const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
    const [scheduled, setScheduled] = useState<Notifications.NotificationRequest[]>([]);
    const [badgeCount, setBadgeCount] = useState(0);

    const cleanupRef = useRef<(() => void) | null>(null);
    const isLoadingRef = useRef(false); // Évite les boucles infinies

    useEffect(() => {
        if (!isLoadingRef.current) {
            isLoadingRef.current = true;
            loadData();
            if (Platform.OS !== 'web') {
                setupListeners();
            }
        }
        return () => {
            cleanupRef.current?.();
            isLoadingRef.current = false;
        };
    }, []);

    const loadData = async () => {
        try {
            if (Platform.OS === 'web') {
                // Sur web, pas de notifications natives
                setIsLoading(false);
                return;
            }

            const [token, prefs, badge, scheduledList] = await Promise.all([
                notifications.getToken(),
                notifications.getPreferences(),
                notifications.getBadge(),
                notifications.getScheduled(),
            ]);

            setPushToken(token);
            setPreferences(prefs);
            setBadgeCount(badge);
            setScheduled(scheduledList);
            setHasPermission(!!token);
        } catch (error) {
            console.error('Error loading notifications:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const setupListeners = () => {
        cleanupRef.current = notifications.setupListeners(
            (n) => onReceived?.(n),
            (r) => onTapped?.(r.notification.request.content.data)
        );
    };

    const initialize = useCallback(async () => {
        if (Platform.OS === 'web') return null;
        
        setIsLoading(true);
        try {
            const token = await notifications.initialize();
            if (token) {
                setPushToken(token);
                setHasPermission(true);
            }
            return token;
        } finally {
            setIsLoading(false);
        }
    }, []);

    const send = useCallback((title: string, body: string, data?: any) => {
        if (Platform.OS === 'web') return Promise.resolve('');
        return notifications.send(title, body, data);
    }, []);

    const schedule = useCallback(async (title: string, body: string, date: Date, data?: any) => {
        if (Platform.OS === 'web') return '';
        const id = await notifications.schedule(title, body, date, data);
        await refreshScheduled();
        return id;
    }, []);

    const scheduleTripReminder = useCallback(async (id: string, title: string, date: Date) => {
        if (Platform.OS === 'web') return '';
        const id_ = await notifications.scheduleTripReminder(id, title, date);
        await refreshScheduled();
        return id_;
    }, []);

    const cancel = useCallback(async (id: string) => {
        if (Platform.OS === 'web') return;
        await notifications.cancel(id);
        await refreshScheduled();
    }, []);

    const cancelAll = useCallback(async () => {
        if (Platform.OS === 'web') return;
        await notifications.cancelAll();
        await setScheduled([]);
    }, []);

    const updatePreferences = useCallback(async (updates: Partial<NotificationPreferences>) => {
        if (Platform.OS === 'web') return;
        const current = preferences || await notifications.getPreferences();
        const updated = { ...current, ...updates };
        await notifications.savePreferences(updated);
        setPreferences(updated);
    }, [preferences]);

    const updateBadge = useCallback(async (count: number) => {
        if (Platform.OS === 'web') return;
        await notifications.setBadge(count);
        setBadgeCount(count);
    }, []);

    const clearBadge = useCallback(async () => {
        if (Platform.OS === 'web') return;
        await notifications.clearBadge();
        setBadgeCount(0);
    }, []);

    const refreshScheduled = useCallback(async () => {
        if (Platform.OS === 'web') return;
        const list = await notifications.getScheduled();
        setScheduled(list);
    }, []);

    return {
        pushToken,
        isLoading,
        hasPermission,
        preferences,
        scheduled,
        badgeCount,
        initialize,
        send,
        schedule,
        scheduleTripReminder,
        cancel,
        cancelAll,
        updatePreferences,
        setBadgeCount: updateBadge,
        clearBadge,
        refreshScheduled,
    };
};

export const useLastNotificationResponse = () => {
    const [response, setResponse] = useState<Notifications.NotificationResponse | null>(null);
    useEffect(() => {
        if (Platform.OS !== 'web') {
            Notifications.getLastNotificationResponseAsync().then((r) => {
                if (r) setResponse(r);
            });
        }
    }, []);

    return response;
};