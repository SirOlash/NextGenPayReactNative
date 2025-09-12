import React, { createContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import {jwtDecode} from "jwt-decode";
import { fetchUserByEmail } from "../services/api";

interface TokenPayload {
  exp: number;
  email: string;
}

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (token: string) => Promise<void>;
    signOut: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signIn: async () => {},
    signOut: async () => {},
});

const TOKEN_KEY = "user_token";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    const signIn = async (token: string) => {
        await SecureStore.setItemAsync(TOKEN_KEY, token)
        const { email } = jwtDecode<TokenPayload>(token)
        const userDetails = await fetchUserByEmail(email)
        setUser(userDetails)
    }

    const signOut = async () => {
        await SecureStore.deleteItemAsync(TOKEN_KEY)
        setUser(null)
    }

    useEffect(() => {
        ;(async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY)
            if (!token) return setLoading(false)
            
            const { exp, email } = jwtDecode<TokenPayload>(token)
            if (Date.now() >= exp * 1000) {
                await SecureStore.deleteItemAsync(TOKEN_KEY)
                return setLoading(false)
            }

            const userDetails = await fetchUserByEmail(email)
            setUser(userDetails)
            setLoading(false)
        })()
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;

            