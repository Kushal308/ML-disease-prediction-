import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../services/supabase';
import { UserProfile } from '../types/disease';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password?: string) => Promise<{ error?: string }>;
  signUp: (email: string, password?: string, fullName?: string) => Promise<{ error?: string }>;
  signOut: () => Promise<void>;
  updateProfile: (fullName: string) => Promise<{ error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_USER_KEY = 'medipredict_active_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isSupabaseConfigured && supabase) {
      // 1. Get initial session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            created_at: session.user.created_at,
          });
        }
        setLoading(false);
      });

      // 2. Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        if (session?.user) {
          setUser({
            id: session.user.id,
            email: session.user.email || '',
            full_name: session.user.user_metadata?.full_name || session.user.email?.split('@')[0],
            created_at: session.user.created_at,
          });
        } else {
          setUser(null);
        }
        setLoading(false);
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      // Local Auth Fallback Mode
      try {
        const stored = localStorage.getItem(LOCAL_USER_KEY);
        if (stored) {
          setUser(JSON.parse(stored));
        } else {
          // Pre-populate with a demo clinical researcher user so the dashboard is immediately accessible
          const demoUser: UserProfile = {
            id: 'demo-clinician-01',
            email: 'researcher@medipredict.ai',
            full_name: 'Dr. Alex Mercer, MD',
            created_at: new Date().toISOString(),
          };
          setUser(demoUser);
          localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(demoUser));
        }
      } catch {
        setUser(null);
      }
      setLoading(false);
    }
  }, []);

  const signIn = async (email: string, password?: string): Promise<{ error?: string }> => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password: password || 'SecurePassword123!',
      });
      setLoading(false);
      if (error) return { error: error.message };
      return {};
    } else {
      // Local fallback
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        full_name: email.split('@')[0].replace('.', ' ').toUpperCase(),
        created_at: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
      setLoading(false);
      return {};
    }
  };

  const signUp = async (email: string, password?: string, fullName?: string): Promise<{ error?: string }> => {
    setLoading(true);
    if (isSupabaseConfigured && supabase) {
      const { error } = await supabase.auth.signUp({
        email,
        password: password || 'SecurePassword123!',
        options: {
          data: { full_name: fullName || email.split('@')[0] },
        },
      });
      setLoading(false);
      if (error) return { error: error.message };
      return {};
    } else {
      const newUser: UserProfile = {
        id: `user-${Date.now()}`,
        email,
        full_name: fullName || email.split('@')[0],
        created_at: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(newUser));
      setLoading(false);
      return {};
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(LOCAL_USER_KEY);
    }
    setUser(null);
  };

  const updateProfile = async (fullName: string): Promise<{ error?: string }> => {
    if (!user) return { error: 'Not authenticated' };
    const updated = { ...user, full_name: fullName };
    setUser(updated);
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.updateUser({
        data: { full_name: fullName },
      });
    } else {
      localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(updated));
    }
    return {};
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isConfigured: isSupabaseConfigured,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
