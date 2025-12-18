import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTranslation } from 'react-i18next';
import Ionicons from '@expo/vector-icons/Ionicons';

export function LanguageSelector() {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  const handleChangeLanguage = async (languageCode: string) => {
    try {
      if (i18n && typeof i18n.changeLanguage === 'function') {
        await i18n.changeLanguage(languageCode);
        Alert.alert('Langue changée', `Language changed to ${languageCode.toUpperCase()}`);
      } else {
        console.error('i18n.changeLanguage is not available');
        Alert.alert('Erreur', 'Impossible de changer la langue');
      }
    } catch (error) {
      console.error('Error changing language:', error);
      Alert.alert('Erreur', 'Impossible de changer la langue');
    }
  };

  const currentLanguage = i18n?.language || 'fr';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Langue / Language</Text>
      {languages.map((lang) => (
        <TouchableOpacity
          key={lang.code}
          style={[
            styles.languageButton,
            currentLanguage === lang.code && styles.activeLanguage,
          ]}
          onPress={() => handleChangeLanguage(lang.code)}
        >
          <Text style={styles.flag}>{lang.flag}</Text>
          <Text
            style={[
              styles.label,
              currentLanguage === lang.code && styles.activeLabel,
            ]}
          >
            {lang.label}
          </Text>
          {currentLanguage === lang.code && (
            <Ionicons name="checkmark-circle" size={20} color="#a855f7" />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  activeLanguage: {
    borderWidth: 2,
    borderColor: '#a855f7',
    backgroundColor: '#faf5ff',
  },
  flag: {
    fontSize: 24,
    marginRight: 12,
  },
  label: {
    flex: 1,
    fontSize: 16,
    color: '#6b7280',
  },
  activeLabel: {
    color: '#111827',
    fontWeight: '600',
  },
});