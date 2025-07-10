import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const adminStatus = localStorage.getItem('isAdmin');
    if (adminStatus === 'true') {
      setIsAdmin(true);
      setUser({ id: 'admin', email: 'admin@divyyadav.com', is_admin: true });
    }
    setLoading(false);
  }, []);

  const signIn = async (password: string) => {
    try {
      // Simple password check for admin
      if (password === 'admin123') {
        const adminUser = { id: 'admin', email: 'admin@divyyadav.com', is_admin: true };
        setUser(adminUser);
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
      } else {
        throw new Error('Invalid password');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      throw new Error('Invalid admin password');
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setIsAdmin(false);
      localStorage.removeItem('isAdmin');
    } catch (error) {
      console.error('Error during sign out:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    isAdmin,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};