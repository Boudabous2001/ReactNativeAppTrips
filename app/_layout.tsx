import { AuthProvider } from '@/contexts/auth-context';
import '@/i18n';
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="login" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen 
          name="modal/add-trip" 
          options={{ 
            presentation: 'modal',
            headerShown: true,
            title: 'Add Trip'
          }} 
        />
      </Stack>
    </AuthProvider>
  );
}