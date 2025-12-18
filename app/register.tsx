import { useAuth } from '@/contexts/auth-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { validation } from '@/utils/validation';

export default function RegisterScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const { register } = useAuth();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<{
        name?: string;
        email?: string;
        password?: string;
        confirmPassword?: string;
    }>({});

    const validateForm = (): boolean => {
        const newErrors: any = {};

        // Validation nom
        if (!form.name.trim()) {
            newErrors.name = t('addTrip.validation.fillAllFields');
        } else if (!validation.isValidName(form.name)) {
            newErrors.name = 'Le nom doit contenir au moins 2 caractères';
        }

        // Validation email
        if (!form.email.trim()) {
            newErrors.email = t('addTrip.validation.fillAllFields');
        } else if (!validation.isValidEmail(form.email)) {
            newErrors.email = t('auth.errors.invalidEmail') || 'Email invalide';
        }

        // Validation password
        if (!form.password) {
            newErrors.password = t('addTrip.validation.fillAllFields');
        } else {
            const passwordCheck = validation.isValidPassword(form.password);
            if (!passwordCheck.valid) {
                newErrors.password = passwordCheck.message;
            }
        }

        // Validation confirmation password
        if (!form.confirmPassword) {
            newErrors.confirmPassword = t('addTrip.validation.fillAllFields');
        } else if (form.password !== form.confirmPassword) {
            newErrors.confirmPassword = t('auth.errors.passwordMismatch') || 'Les mots de passe ne correspondent pas';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleRegister = async () => {
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        try {
            await register(form.name, form.email, form.password);
            Alert.alert(
                t('common.success'),
                'Compte créé avec succès !',
                [
                    {
                        text: 'OK',
                        onPress: () => router.replace('/(tabs)'),
                    },
                ]
            );
        } catch (error: any) {
            Alert.alert(
                t('common.error'),
                error.message || 'Impossible de créer le compte'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardView}
            >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Header */}
                    <LinearGradient
                        colors={['#a855f7', '#ec4899']}
                        style={styles.header}
                    >
                        <TouchableOpacity
                            style={styles.backButton}
                            onPress={() => router.back()}
                        >
                            <Ionicons name="arrow-back" size={24} color="#fff" />
                        </TouchableOpacity>
                        <View style={styles.headerContent}>
                            <Text style={styles.headerTitle}>{t('auth.createAccount')}</Text>
                            <Text style={styles.headerSubtitle}>Rejoignez TravelMate</Text>
                        </View>
                    </LinearGradient>

                    {/* Form */}
                    <View style={styles.formContainer}>
                        {/* Name Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t('auth.name')}</Text>
                            <View style={[styles.inputWrapper, errors.name && styles.inputError]}>
                                <Ionicons name="person-outline" size={20} color="#9ca3af" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Votre nom"
                                    value={form.name}
                                    onChangeText={(text) => {
                                        setForm({ ...form, name: text });
                                        if (errors.name) setErrors({ ...errors, name: undefined });
                                    }}
                                    autoCapitalize="words"
                                />
                            </View>
                            {errors.name && (
                                <Text style={styles.errorText}>{errors.name}</Text>
                            )}
                        </View>

                        {/* Email Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t('auth.email')}</Text>
                            <View style={[styles.inputWrapper, errors.email && styles.inputError]}>
                                <Ionicons name="mail-outline" size={20} color="#9ca3af" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="exemple@email.com"
                                    value={form.email}
                                    onChangeText={(text) => {
                                        setForm({ ...form, email: text });
                                        if (errors.email) setErrors({ ...errors, email: undefined });
                                    }}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                />
                            </View>
                            {errors.email && (
                                <Text style={styles.errorText}>{errors.email}</Text>
                            )}
                        </View>

                        {/* Password Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t('auth.password')}</Text>
                            <View style={[styles.inputWrapper, errors.password && styles.inputError]}>
                                <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChangeText={(text) => {
                                        setForm({ ...form, password: text });
                                        if (errors.password) setErrors({ ...errors, password: undefined });
                                    }}
                                    secureTextEntry={!showPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Ionicons
                                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#9ca3af"
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.password && (
                                <Text style={styles.errorText}>{errors.password}</Text>
                            )}
                        </View>

                        {/* Confirm Password Input */}
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>{t('auth.confirmPassword')}</Text>
                            <View style={[styles.inputWrapper, errors.confirmPassword && styles.inputError]}>
                                <Ionicons name="lock-closed-outline" size={20} color="#9ca3af" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    value={form.confirmPassword}
                                    onChangeText={(text) => {
                                        setForm({ ...form, confirmPassword: text });
                                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: undefined });
                                    }}
                                    secureTextEntry={!showConfirmPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    <Ionicons
                                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#9ca3af"
                                    />
                                </TouchableOpacity>
                            </View>
                            {errors.confirmPassword && (
                                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                            )}
                        </View>

                        {/* Register Button */}
                        <TouchableOpacity
                            style={[styles.registerButton, isLoading && styles.registerButtonDisabled]}
                            onPress={handleRegister}
                            disabled={isLoading}
                        >
                            <LinearGradient
                                colors={['#a855f7', '#ec4899']}
                                style={styles.registerButtonGradient}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={styles.registerButtonText}>{t('auth.registerButton')}</Text>
                                )}
                            </LinearGradient>
                        </TouchableOpacity>

                        {/* Login Link */}
                        <View style={styles.loginContainer}>
                            <Text style={styles.loginText}>{t('auth.hasAccount')}</Text>
                            <TouchableOpacity onPress={() => router.back()}>
                                <Text style={styles.loginLink}>{t('auth.loginButton')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    keyboardView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        paddingHorizontal: 24,
        paddingTop: 16,
        paddingBottom: 80,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    headerContent: {
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 8,
    },
    headerSubtitle: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.9)',
    },
    formContainer: {
        padding: 24,
        marginTop: -40,
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
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        gap: 12,
    },
    inputError: {
        borderColor: '#ef4444',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#111827',
    },
    errorText: {
        color: '#ef4444',
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4,
    },
    registerButton: {
        marginTop: 8,
        borderRadius: 12,
        overflow: 'hidden',
    },
    registerButtonDisabled: {
        opacity: 0.5,
    },
    registerButtonGradient: {
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    registerButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24,
        gap: 8,
    },
    loginText: {
        color: '#6b7280',
        fontSize: 14,
    },
    loginLink: {
        color: '#a855f7',
        fontSize: 14,
        fontWeight: '600',
    },
});