import { api } from '@/services/api';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddTripModal() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: '',
  });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const pickImage = async () => {
    if (Platform.OS === 'web') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (event: any) => {
            setSelectedImage(event.target.result);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.8,
      });

      if (!result.canceled) {
        setSelectedImage(result.assets[0].uri);
      }
    }
  };

const handleSubmit = async () => {
  if (!form.title || !form.destination || !form.startDate || !form.endDate) {
    Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
    return;
  }

    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(form.startDate) || !dateRegex.test(form.endDate)) {
    Alert.alert('Erreur', 'Format de date invalide. Utilisez YYYY-MM-DD (ex: 2026-01-22)');
    return;
  }

  setIsLoading(true);
  try {
    console.log('🚀 Creating trip with:', form);
    
    const imageToUse = selectedImage && selectedImage.startsWith('http') 
      ? selectedImage 
      : 'paris';

    const newTrip = await api.createTrip({
      ...form,
      image: imageToUse,
      photos: [],
    });

    console.log('✅ Trip created:', newTrip);

    Alert.alert('Succès', 'Voyage créé avec succès!', [
      { 
        text: 'OK', 
        onPress: () => {
          router.back();
          setTimeout(() => {
            router.push('/trips');
          }, 100);
        }
      },
    ]);
  } catch (error: any) {
    console.error('❌ Error creating trip:', error);
    Alert.alert('Erreur', error.message || 'Impossible de créer le voyage');
  } finally {
    setIsLoading(false);
  }
};

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <LinearGradient colors={['#a855f7', '#ec4899']} style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nouveau Voyage</Text>
          <View style={styles.placeholder} />
        </View>
      </LinearGradient>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Titre *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Voyage à Paris"
              value={form.title}
              onChangeText={(text) => setForm({ ...form, title: text })}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destination *</Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Paris, France"
              value={form.destination}
              onChangeText={(text) => setForm({ ...form, destination: text })}
            />
          </View>

          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
  <Text style={styles.label}>Date début *</Text>
  <TextInput
    style={styles.input}
    placeholder="2026-01-22"  // ✅ Format correct
    value={form.startDate}
    onChangeText={(text) => setForm({ ...form, startDate: text })}
  />
</View>

<View style={[styles.inputGroup, styles.halfWidth]}>
  <Text style={styles.label}>Date fin *</Text>
  <TextInput
    style={styles.input}
    placeholder="2026-01-30"  // ✅ Format correct
    value={form.endDate}
    onChangeText={(text) => setForm({ ...form, endDate: text })}
  />
</View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Décrivez votre voyage..."
              value={form.description}
              onChangeText={(text) => setForm({ ...form, description: text })}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Photo de couverture</Text>
            {selectedImage && (
              <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            )}
            <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
              <Ionicons name="image-outline" size={24} color="#a855f7" />
              <Text style={styles.imageButtonText}>
                {selectedImage ? 'Changer la photo' : 'Ajouter une photo'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.submitButton, isLoading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Ionicons name="checkmark-circle-outline" size={24} color="#fff" />
              <Text style={styles.submitButtonText}>Créer le voyage</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
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
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  form: {
    padding: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: '#111827',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  halfWidth: {
    flex: 1,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginBottom: 12,
  },
  imageButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    borderWidth: 2,
    borderColor: '#a855f7',
    borderStyle: 'dashed',
  },
  imageButtonText: {
    fontSize: 16,
    color: '#a855f7',
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  submitButton: {
    backgroundColor: '#a855f7',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});