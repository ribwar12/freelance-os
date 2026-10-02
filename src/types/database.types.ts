export type InvoiceStatus = 'draft' | 'pending' | 'paid' | 'overdue';
export type ProjectStatus = 'in_progress' | 'completed' | 'on_hold';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  business_name?: string;
  phone?: string;
  bank_card?: string;
  created_at: string;
}

export interface Client {
  id: string;
  user_id: string;
  name: string;
  company?: string;
  email: string;
  phone: string;
  address?: string;
  created_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  client_id: string;
  title: string;
  description?: string;
  budget: number;
  status: ProjectStatus;
  deadline?: string;
  created_at: string;
  client?: Client;
}

export interface InvoiceItem {
  id: string;
  invoice_id?: string;
  description: string;
  quantity: number; // ???? ?? ?????
  unit_price: number; // ???? ???? ?? ?????
  total: number;
}

export interface Invoice {
  id: string;
  user_id: string;
  client_id: string;
  project_id?: string;
  invoice_number: string;
  issue_date: string;
  due_date: string;
  items: InvoiceItem[];
  subtotal: number;
  tax_percent: number;
  tax_amount: number;
  discount_percent: number;
  discount_amount: number;
  total_amount: number;
  status: InvoiceStatus;
  notes?: string;
  created_at: string;
  client?: Client;
  project?: Project;
}
