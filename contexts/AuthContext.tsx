import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setIsLoading(false);
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        const storedUser = JSON.parse(userData);
        if (storedUser.email === email && storedUser.password === password) {
          setUser(storedUser);
          await AsyncStorage.setItem('user', JSON.stringify(storedUser));
        } else {
          throw new Error('Invalid email or password');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error) {
      throw error;
    }
  }

  async function signUp(email: string, password: string) {
    try {
      const newUser = { email, password };
      await AsyncStorage.setItem('user', JSON.stringify(newUser));
      setUser(newUser);
    } catch (error) {
      throw error;
    }
  }

  async function signOut() {
    try {
      await AsyncStorage.removeItem('user');
      setUser(null);
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const getXP = async () => {
  const xp = await AsyncStorage.getItem('xp');
  return xp ? parseInt(xp, 10) : 0;
};

export const setXP = async (xp) => {
  await AsyncStorage.setItem('xp', xp.toString());
};

export const getStreak = async () => {
  const streak = await AsyncStorage.getItem('streak');
  return streak ? parseInt(streak, 10) : 0;
};

export const setStreak = async (streak) => {
  await AsyncStorage.setItem('streak', streak.toString());
};

export const getLastActiveDate = async () => {
  return await AsyncStorage.getItem('lastActiveDate');
};

export const setLastActiveDate = async (date) => {
  await AsyncStorage.setItem('lastActiveDate', date);
}; 