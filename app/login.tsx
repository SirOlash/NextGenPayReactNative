import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput,TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform} from 'react-native';
import useAppAuth from '../src/hooks/useAppAuth';
import { colors, spacing, radius, shadows } from './theme';
import { Link, useRouter } from 'expo-router';
import { saveToken } from '@/src/utils/authStorage';
import { AuthContext } from '../src/context/AuthContext';
import Toast from 'react-native-toast-message';

const LoginScreen: React.FC = () => {
  const { signIn } = React.useContext(AuthContext);
  const { login, error, loading } = useAppAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try{
        const { message, token } = await login(email, password);
        await signIn(token);

        Toast.show({ type: 'success', text1: message });

        // setTimeout(() => router.replace('/dashboard'), 500);
    } catch (error: any) {
        Toast.show({ type: 'error', text1: error.message,
          autoHide: false,
         });
      
    }
  }

return (
    <SafeAreaView style={styles.fill}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.fill}>
        <View style={styles.container}>
          <Text style={styles.brand}>NextGenPay</Text>
          <View style={styles.card}>
            <Text style={styles.title}>Welcome back</Text>

            <TextInput placeholder="Email" value={email} onChangeText={setEmail}
              placeholderTextColor={colors.muted} keyboardType="email-address" autoCapitalize="none"
              style={styles.input} />

            <TextInput placeholder="Password" value={password} onChangeText={setPassword}
              secureTextEntry placeholderTextColor={colors.muted} style={styles.input} />

            <TouchableOpacity onPress={handleLogin} style={[styles.button, loading && styles.buttonDisabled]} disabled={loading}>
              <Text style={styles.buttonText}>{loading ? 'Logging in…' : 'Login'}</Text>
            </TouchableOpacity>

            <View style={styles.row}>
              <Text style={styles.small}>Don't have an account?</Text>
              <Link href="/register"><Text style={styles.link}> Create one</Text></Link>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: colors.primaryDark },
  container: { flex: 1, padding: spacing.md, justifyContent: 'center' },
  brand: { color: colors.white, fontSize: 28, fontWeight: '800', textAlign: 'center', marginBottom: 24 },
  card: { backgroundColor: '#0f172a', borderRadius: radius.md, padding: spacing.lg, ...shadows.card },
  title: { color: colors.white, fontSize: 18, fontWeight: '700', marginBottom: 12 },
  input: { backgroundColor: '#0b1220', color: colors.white, padding: 12, borderRadius: 10, marginBottom: 12 },
  button: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  buttonDisabled: { backgroundColor: '#9CA3AF' },
  buttonText: { color: colors.white, fontWeight: '700' },
  row: { flexDirection: 'row', justifyContent: 'center', marginTop: 12 },
  small: { color: colors.muted },
  link: { color: colors.accent, marginLeft: 6 }
});