import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput,TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert} from 'react-native';
import useAppAuth from './hooks/useAppAuth';
import { colors, spacing, radius, shadows } from './theme';
import { Link, useRouter } from 'expo-router';

const LoginScreen: React.FC = () => {
  const { login, loading } = useAppAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try{
        const data = await login(email, password);
        // TODO: save token with 
    }
  }