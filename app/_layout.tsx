import React, { useState } from "react";
import { Slot } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";
import { SafeAreaProvider } from "react-native-safe-area-context";
import LogoSplash from "./components/LogoSplash";
import Toast from 'react-native-toast-message';

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SafeAreaProvider>
      <AuthProvider>
        {showSplash ? (
          <LogoSplash onDone={() => setShowSplash(false)} />
        ) : (
          <Slot />
        )}
      </AuthProvider>
      <Toast />
    </SafeAreaProvider>
  );
}