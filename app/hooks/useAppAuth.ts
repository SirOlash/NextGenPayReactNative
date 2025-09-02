import { useState, useCallback } from "react";

export default function useAppAuth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const login = useCallback(async (email: string, password: string) => {
        setLoading(true); setError(null);

        try {
            const res = await fetch('',{
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');
            return data;
        } catch (err: any) {
            setError(err.message || 'An error occurred'); throw err;
        } finally { setLoading(false); }
    }, []);

    const register = useCallback(async (payload: any) => {
        setLoading(true); setError(null);
        try {
            const res = await fetch('', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration failed');
            return data; 
        } catch (e:any) {
            setError(e.message || 'An error occurred'); throw e;
        } finally { setLoading(false); }
    }, []);
    return { loading, error, login, register };
    }
    
