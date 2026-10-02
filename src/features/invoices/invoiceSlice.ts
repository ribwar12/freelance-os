import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InvoiceItem, InvoiceStatus } from '@/types/database.types';

export interface InvoiceDraftState {
  clientId: string;
  projectId: string;
  invoiceNumber: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceItem[];
  subtotal: number;
  taxPercent: number;
  taxAmount: number;
  discountPercent: number;
  discountAmount: number;
  totalAmount: number;
  status: InvoiceStatus;
  notes: string;
}

const calculateTotals = (
  items: InvoiceItem[],
  taxPercent: number,
  discountPercent: number
) => {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round((taxableAmount * taxPercent) / 100);
  const totalAmount = taxableAmount + taxAmount;

  return { subtotal, discountAmount, taxAmount, totalAmount };
};

const getInitialState = (): InvoiceDraftState => {
  const today = new Date().toISOString().split('T')[0];
  const nextMonth = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  const randomNum = Math.floor(1000 + Math.random() * 9000);

  const initialItems: InvoiceItem[] = [
    {
      id: 'item-1',
      description: '????? ???? ?????? ? ????? ?????? (UI/UX)',
      quantity: 20,
      unit_price: 450000,
      total: 9000000,
    },
    {
      id: 'item-2',
      description: '?????????? ???????????? ????????? ?? React ? Tailwind',
      quantity: 35,
      unit_price: 550000,
      total: 19250000,
    },
  ];

  const totals = calculateTotals(initialItems, 10, 0);

  return {
    clientId: '',
    projectId: '',
    invoiceNumber: 'INV-' + randomNum,
    issueDate: today,
    dueDate: nextMonth,
    items: initialItems,
    taxPercent: 10,
    discountPercent: 0,
    notes: '????? ???? ?????? ?? ??? ??? ?? ??? ?? ????? ??? ??? ??? ????? ??????.',
    status: 'pending',
    ...totals,
  };
};

export const invoiceSlice = createSlice({
  name: 'invoiceDraft',
  initialState: getInitialState(),
  reducers: {
    setClientId: (state, action: PayloadAction<string>) => {
      state.clientId = action.payload;
    },
    setProjectId: (state, action: PayloadAction<string>) => {
      state.projectId = action.payload;
    },
    setInvoiceNumber: (state, action: PayloadAction<string>) => {
      state.invoiceNumber = action.payload;
    },
    setIssueDate: (state, action: PayloadAction<string>) => {
      state.issueDate = action.payload;
    },
    setDueDate: (state, action: PayloadAction<string>) => {
      state.dueDate = action.payload;
    },
    setNotes: (state, action: PayloadAction<string>) => {
      state.notes = action.payload;
    },
    setStatus: (state, action: PayloadAction<InvoiceStatus>) => {
      state.status = action.payload;
    },
    addItem: (state, action: PayloadAction<Omit<InvoiceItem, 'id' | 'total'>>) => {
      const newItem: InvoiceItem = {
        id: 'item-' + Date.now(),
        description: action.payload.description,
        quantity: action.payload.quantity,
        unit_price: action.payload.unit_price,
        total: action.payload.quantity * action.payload.unit_price,
      };
      state.items.push(newItem);
      const totals = calculateTotals(state.items, state.taxPercent, state.discountPercent);
      Object.assign(state, totals);
    },
    removeItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      const totals = calculateTotals(state.items, state.taxPercent, state.discountPercent);
      Object.assign(state, totals);
    },
    updateItem: (
      state,
      action: PayloadAction<{ id: string; field: keyof InvoiceItem; value: any }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        (item as any)[action.payload.field] = action.payload.value;
        item.total = item.quantity * item.unit_price;
        const totals = calculateTotals(state.items, state.taxPercent, state.discountPercent);
        Object.assign(state, totals);
      }
    },
    setTaxPercent: (state, action: PayloadAction<number>) => {
      state.taxPercent = Math.max(0, action.payload);
      const totals = calculateTotals(state.items, state.taxPercent, state.discountPercent);
      Object.assign(state, totals);
    },
    setDiscountPercent: (state, action: PayloadAction<number>) => {
      state.discountPercent = Math.max(0, Math.min(100, action.payload));
      const totals = calculateTotals(state.items, state.taxPercent, state.discountPercent);
      Object.assign(state, totals);
    },
    resetDraft: () => getInitialState(),
  },
});

export const {
  setClientId,
  setProjectId,
  setInvoiceNumber,
  setIssueDate,
  setDueDate,
  setNotes,
  setStatus,
  addItem,
  removeItem,
  updateItem,
  setTaxPercent,
  setDiscountPercent,
  resetDraft,
} = invoiceSlice.actions;

export default invoiceSlice.reducer;
