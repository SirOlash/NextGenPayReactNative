import React, { useState, useEffect } from 'react';
import {
    SafeAreaView, View, Text, TextInput,
    TouchableOpacity, StyleSheet, KeyboardAvoidingView, 
    Platform
} from 'react-native';
import useAppAuth from '../src/hooks/useAppAuth';
import { colors, spacing, radius, shadows } from './theme';
import { Link, useRouter } from 'expo-router';
import { AuthContext } from '../src/context/AuthContext';
import Toast from 'react-native-toast-message';

const RegisterScreen: React.FC = () => {
    const { register, loading } = useAppAuth();
    // const { signIn } = React.useContext(AuthContext);
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [passwordsMatch, setPasswordsMatch] = useState<boolean | null>(null);

    useEffect(() => {
        if (confirmPassword.length === 0) {
            setPasswordsMatch(null);
            return;
        }
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    const canSubmit = 
        email.trim().length > 0 &&
        phoneNumber.trim().length > 0 &&
        password.trim().length > 0 &&
        passwordsMatch === true &&
        !loading;

    const handleRegister = async () => {
        if (!canSubmit) {
            Toast.show({ type: 'error', text1: 'Please fill all fields correctly.' });
            return;
        }

        try {
            const payload = {
                email,
                phoneNumber,
                password,
            };

            const resp = await register(payload);
            Toast.show({ type: 'success', text1: resp.message || "Account created " });
            setTimeout(() => router.replace('/login'), 800);
        } catch (error: any) {
            Toast.show({ type: 'error', text1: error.message || 'Registration failed', autoHide: false });
            }
        };

    return (
        <SafeAreaView style={styles.fill}>
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.fill}>
                <View style={styles.container}>
                    <Text style={styles.brand}>NextGenPay</Text>

                    <View style={styles.card}>
                        <Text style={styles.title}>Create Your Account</Text>

                        <TextInput placeholder="Email" value={email} onChangeText={(text) => { setEmail(text); Toast.hide(); }}

                        placeholderTextColor={colors.muted}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        style={styles.input} />

                        <TextInput 
                        placeholder="Phone Number" value={phoneNumber} 
                        onChangeText={(text) => { setPhoneNumber(text); Toast.hide(); }}
                        placeholderTextColor={colors.muted}
                        keyboardType="phone-pad"
                        style={styles.input} />

                        <TextInput
                        placeholder="Confirm Password" value={confirmPassword}
                        onChangeText={(text) => { setConfirmPassword(text); Toast.hide(); }}
                        placeholderTextColor={colors.muted}
                        secureTextEntry
                        style={styles.input} />
                        {passwordsMatch === null ? null: passwordsMatch ? (
                            <Text style={styles.matchTextSuccess}>Passwords match</Text>
                        ) : (
                            <Text style={styles.matchTextError}>Passwords do not match</Text>
                        )}

                        <TouchableOpacity
                            onPress={handleRegister}
                            style={[styles.button, !canSubmit && styles.buttonDisabled]}
                            disabled={!canSubmit || loading }
                        >
                            <Text style={styles.buttonText}>{loading ? 'Registering…' : 'Register Account'}</Text>
                        </TouchableOpacity>

                        <View style={styles.row}>
                            <Text style={styles.small}>Already have an account?</Text>
                            <Link href="/login">
                                <Text style={styles.link}>Log in</Text>
                            </Link>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

export default RegisterScreen;

const styles = StyleSheet.create({
    fill: { flex: 1, backgroundColor: colors.primaryDark },
  container: { flex: 1, padding: spacing.md, justifyContent: 'center' },
  brand: { color: colors.white, fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 18 },
  card: { backgroundColor: '#0f172a', borderRadius: radius.md, padding: spacing.lg, ...shadows.card },
  title: { color: colors.white, fontSize: 18, fontWeight: '700', marginBottom: 12 },
  input: { backgroundColor: '#0b1220', color: colors.white, padding: 12, borderRadius: 10, marginBottom: 12 },
  matchTextSuccess: { color: '#4ade80', marginBottom: 8 }, // green-400
  matchTextError: { color: '#f87171', marginBottom: 8 }, // red-400
  button: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 6 },
  buttonDisabled: { backgroundColor: '#9CA3AF' },
  buttonText: { color: colors.white, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  small: { color: colors.muted },
  link: { color: colors.accent, marginLeft: 6 },
});