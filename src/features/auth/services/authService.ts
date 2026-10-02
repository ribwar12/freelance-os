import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { UserProfile } from '@/types/database.types';

const STORAGE_KEY = 'freelance_os_user';

const defaultUser: UserProfile = {
  id: 'usr-demo-101',
  email: 'developer@freelance-os.ir',
  full_name: '???? ?????',
  business_name: '??????? ????? ? ????? ??????',
  phone: '09123456789',
  bank_card: '????-????-????-????',
  created_at: new Date().toISOString(),
};

export const authService = {
  getCurrentUser: async (): Promise<UserProfile | null> => {
    if (isSupabaseConfigured) {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) return null;
      
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();
        
      if (profile) return profile;
      return {
        id: session.user.id,
        email: session.user.email || '',
        full_name: session.user.user_metadata?.full_name || '????? ?????',
        created_at: session.user.created_at,
      };
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return defaultUser;
      }
    }
    // Return default demo user so immediate testing works smoothly
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  },

  signIn: async (email: string, password: string): Promise<UserProfile> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      const user = data.user;
      return {
        id: user.id,
        email: user.email || email,
        full_name: user.user_metadata?.full_name || email.split('@')[0],
        created_at: user.created_at,
      };
    }

    // Demo Mode sign in
    const user: UserProfile = {
      ...defaultUser,
      email,
      full_name: email.split('@')[0] || defaultUser.full_name,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  signUp: async (email: string, password: string, fullName: string): Promise<UserProfile> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      if (error) throw error;
      if (!data.user) throw new Error('??? ??? ?? ??? ????? ??');
      return {
        id: data.user.id,
        email: data.user.email || email,
        full_name: fullName,
        created_at: data.user.created_at,
      };
    }

    const user: UserProfile = {
      ...defaultUser,
      id: 'usr-' + Date.now(),
      email,
      full_name: fullName,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    return user;
  },

  signOut: async (): Promise<void> => {
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem(STORAGE_KEY);
  },
};
