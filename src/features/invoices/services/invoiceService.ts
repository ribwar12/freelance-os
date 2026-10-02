import { supabase, isSupabaseConfigured } from '@/lib/supabase';
import { Invoice, InvoiceStatus } from '@/types/database.types';
import { clientService } from '@/features/clients/services/clientService';
import { projectService } from '@/features/projects/services/projectService';

const STORAGE_KEY = 'freelance_os_invoices';

const initialInvoices: Invoice[] = [
  {
    id: 'inv-1',
    user_id: 'usr-demo-101',
    client_id: 'cli-1',
    project_id: 'prj-1',
    invoice_number: 'INV-1405-01',
    issue_date: '2026-09-05',
    due_date: '2026-10-05',
    items: [
      { id: 'i-1', description: '????? ????????? ????? ?? Figma', quantity: 15, unit_price: 500000, total: 7500000 },
      { id: 'i-2', description: '????? ?????? ????? ???????????', quantity: 20, unit_price: 600000, total: 12000000 },
    ],
    subtotal: 19500000,
    tax_percent: 10,
    tax_amount: 1950000,
    discount_percent: 0,
    discount_amount: 0,
    total_amount: 21450000,
    status: 'paid',
    notes: '??? ??? ?????????? ????? ???? ????? ?? ????',
    created_at: '2026-09-05T12:00:00Z',
  },
  {
    id: 'inv-2',
    user_id: 'usr-demo-101',
    client_id: 'cli-2',
    project_id: 'prj-2',
    invoice_number: 'INV-1405-02',
    issue_date: '2026-09-20',
    due_date: '2026-10-20',
    items: [
      { id: 'i-3', description: '????? ????????? ??? ?????? ??? ? ?????', quantity: 40, unit_price: 700000, total: 28000000 },
      { id: 'i-4', description: '??????? ????? ? ????? ?? ???? ????', quantity: 10, unit_price: 500000, total: 5000000 },
    ],
    subtotal: 33000000,
    tax_percent: 10,
    tax_amount: 3135000,
    discount_percent: 5,
    discount_amount: 1650000,
    total_amount: 34485000,
    status: 'pending',
    notes: '????? ????? ??????? ? ???????????',
    created_at: '2026-09-20T17:00:00Z',
  },
  {
    id: 'inv-3',
    user_id: 'usr-demo-101',
    client_id: 'cli-3',
    project_id: 'prj-3',
    invoice_number: 'INV-1405-03',
    issue_date: '2026-09-18',
    due_date: '2026-10-02',
    items: [
      { id: 'i-5', description: '???? ??????? ???????? ? ????? ???????', quantity: 1, unit_price: 15000000, total: 15000000 },
    ],
    subtotal: 15000000,
    tax_percent: 0,
    tax_amount: 0,
    discount_percent: 0,
    discount_amount: 0,
    total_amount: 15000000,
    status: 'pending',
    notes: '?????????? ?? ????? ????? ??????? ??????',
    created_at: '2026-09-18T10:00:00Z',
  },
];

const getStoredInvoices = async (): Promise<Invoice[]> => {
  const data = localStorage.getItem(STORAGE_KEY);
  let invoices: Invoice[] = initialInvoices;
  if (data) {
    try {
      invoices = JSON.parse(data);
    } catch {
      invoices = initialInvoices;
    }
  } else {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialInvoices));
  }

  const [clients, projects] = await Promise.all([
    clientService.getClients(),
    projectService.getProjects(),
  ]);

  return invoices.map((inv) => ({
    ...inv,
    client: clients.find((c) => c.id === inv.client_id),
    project: projects.find((p) => p.id === inv.project_id),
  }));
};

export const invoiceService = {
  getInvoices: async (): Promise<Invoice[]> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('invoices')
        .select('*, client:clients(*), project:projects(*), items:invoice_items(*)')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    }
    return getStoredInvoices();
  },

  getInvoiceById: async (id: string): Promise<Invoice | null> => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase
        .from('invoices')
        .select('*, client:clients(*), project:projects(*), items:invoice_items(*)')
        .eq('id', id)
        .single();
      if (error) return null;
      return data;
    }
    const all = await getStoredInvoices();
    return all.find((i) => i.id === id) || null;
  },

  createInvoice: async (invoiceData: Omit<Invoice, 'id' | 'user_id' | 'created_at'>): Promise<Invoice> => {
    if (isSupabaseConfigured) {
      const { data: { session } } = await supabase.auth.getSession();
      const { items, ...mainInvoice } = invoiceData;
      
      const { data: inv, error } = await supabase
        .from('invoices')
        .insert([{ ...mainInvoice, user_id: session?.user.id }])
        .select('*, client:clients(*), project:projects(*)')
        .single();
      if (error) throw error;

      if (items && items.length > 0) {
        const itemRows = items.map((it) => ({
          invoice_id: inv.id,
          description: it.description,
          quantity: it.quantity,
          unit_price: it.unit_price,
          total: it.total,
        }));
        await supabase.from('invoice_items').insert(itemRows);
      }
      return { ...inv, items };
    }

    const current = await getStoredInvoices();
    const newInvoice: Invoice = {
      id: 'inv-' + Date.now(),
      user_id: 'usr-demo-101',
      created_at: new Date().toISOString(),
      ...invoiceData,
    };
    const [clients, projects] = await Promise.all([
      clientService.getClients(),
      projectService.getProjects(),
    ]);
    newInvoice.client = clients.find((c) => c.id === newInvoice.client_id);
    newInvoice.project = projects.find((p) => p.id === newInvoice.project_id);

    const updated = [newInvoice, ...current];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newInvoice;
  },

  updateInvoiceStatus: async (id: string, status: InvoiceStatus): Promise<void> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase
        .from('invoices')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
      return;
    }

    const current = await getStoredInvoices();
    const updated = current.map((inv) =>
      inv.id === id ? { ...inv, status } : inv
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  },

  deleteInvoice: async (id: string): Promise<void> => {
    if (isSupabaseConfigured) {
      const { error } = await supabase.from('invoices').delete().eq('id', id);
      if (error) throw error;
      return;
    }

    const current = await getStoredInvoices();
    const filtered = current.filter((inv) => inv.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  },
};
