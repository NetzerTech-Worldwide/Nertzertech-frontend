'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

import type { AuthContextType, User } from '@/types/user';

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    void fetchUser();
  }, []);

  const fetchUser = async (): Promise<void> => {
    try {
      setLoading(true);

      const res = await fetch('/api/me');    

      if (res.ok) {
        const data: { user: User } = await res.json();

        setUser(data.user);
        setError(null);
      } else if (res.status === 401) {
        setUser(null);
        setError(null);
      } else {
        throw new Error('Failed to fetch user');
      }
    } catch (err) {
      console.error('Failed to fetch user:', err);

      setUser(null);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  const setUserData = (userData: User | null): void => {
    setUser(userData);
  };

  const logout = (): void => {
    setUser(null);
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        setUserData,
        logout,
        refetchUser: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}