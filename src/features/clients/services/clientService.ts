import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Client } from '@/types/database.types';

const STORAGE_KEY = 'freelance_os_clients';

const initialClients: Client[] = [
  {
    id: 'cli-1',
    user_id: 'usr-demo-101',
    name: '????? ?????',
    company: '???? ??????? ???? ?????',
    email: 'hosseini@idehpardaz.com',
    phone: '09121112233',
    address: '?????? ?????? ??????? ??? ????? ???? ?',
    created_at: '2026-09-01T10:00:00Z',
  },
  {
    id: 'cli-2',
    user_id: 'usr-demo-101',
    name: '???? ?????',
    company: '???????? ???????????',
    email: 'sara@fastdelivery.ir',
    phone: '09355556677',
    address: '??????? ????? ?????? ???? ??? ???????',
    created_at: '2026-09-10T14:30:00Z',
  },
  {
    id: 'cli-3',
    user_id: 'usr-demo-101',
    name: '??? ????',
    company: '??????? ?????? ??????',
    email: 'charmineh.shop@gmail.com',
    phone: '09139998877',
    address: '?????? ?????? ???? ???? ???',
    created_at: '2026-09-15T09:15:00Z',
  },
];

const getStoredClients = (): Client[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialClients));
    return initialClients;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialClients;
  }
};

export const clientService = {
  getClients: async (): Promise<Client[]> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
    return getStoredClients();
  },

  createClient: async (clientData: Omit<Client, 'id' | 'user_id' | 'created_at'>): Promise<Client> => {
    if (isSupabaseConfigured) {
      const { data: { session } } = await supabase.auth.getSession();
      const { data, error } = await supabase
        .from('clients')
        .insert([{ ...clientData, user_id: session?.user.id }])
        .select()
        .single();
      if (error) throw error;
      return data;
    }

    const current = getStoredClients();
    const newClient: Client = {
      id: 'cli-' + Date.now(),
      user_id: 'usr-demo-101',
      created_at: new Date().toISOString(),
      ...clientData,
    };
    const updated = [newClient, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newClient;
  },

  deleteClient: async (id: string): Promise<void> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('clients').delete().eq('id', id);
      if (error) throw error;
      return;
    }

    const current = getStoredClients();
    const filtered = current.filter((c) => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};
