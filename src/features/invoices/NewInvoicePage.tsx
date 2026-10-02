import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, FileText, ArrowRight, Calculator } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import {
  setClientId,
  setProjectId,
  setInvoiceNumber,
  setIssueDate,
  setDueDate,
  setNotes,
  addItem,
  removeItem,
  updateItem,
  setTaxPercent,
  setDiscountPercent,
  resetDraft,
} from './invoiceSlice';
import { useCreateInvoice } from './hooks/useInvoices';
import { useClients } from '@/features/clients/hooks/useClients';
import { useProjects } from '@/features/projects/hooks/useProjects';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { formatPrice } from '@/lib/utils';

export const NewInvoicePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const draft = useAppSelector((state) => state.invoiceDraft);
  const { data: clients = [] } = useClients();
  const { data: projects = [] } = useProjects();
  const createInvoice = useCreateInvoice();

  const filteredProjects = projects.filter((p) => !draft.clientId || p.client_id === draft.clientId);

  const handleAddNewItem = () => {
    dispatch(
      addItem({
        description: '??? ???? ????',
        quantity: 1,
        unit_price: 1000000,
      })
    );
  };

  const handleSaveInvoice = async () => {
    if (!draft.clientId) {
      alert('????? ????? ????? ??? ???? ?? ?????? ????.');
      return;
    }
    if (draft.items.length === 0) {
      alert('????? ?? ???? ???? ?? ????? ???? ?? ?????? ???? ????? ????.');
      return;
    }

    await createInvoice.mutateAsync({
      client_id: draft.clientId,
      project_id: draft.projectId || undefined,
      invoice_number: draft.invoiceNumber,
      issue_date: draft.issueDate,
      due_date: draft.dueDate,
      items: draft.items,
      subtotal: draft.subtotal,
      tax_percent: draft.taxPercent,
      tax_amount: draft.taxAmount,
      discount_percent: draft.discountPercent,
      discount_amount: draft.discountAmount,
      total_amount: draft.totalAmount,
      status: 'pending',
      notes: draft.notes,
    });

    dispatch(resetDraft());
    navigate('/invoices');
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/invoices')}
            className="cursor-pointer"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">???? ?????? ????</h1>
            <p className="text-sm text-muted-foreground mt-1">
              ???? ???????? ?????? ?? ?????? ??????? ??????
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => dispatch(resetDraft())}
            className="cursor-pointer"
          >
            ???????? ???
          </Button>
          <Button
            onClick={handleSaveInvoice}
            size="sm"
            className="gap-2 shadow-md cursor-pointer"
          >
            <Save className="h-4 w-4" />
            <span>??? ? ???? ??????</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left 2 Cols: Form and Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Metadata Card */}
          <Card>
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                <span>??????? ???? ? ??? ????</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold">????? (??? ????) *</label>
                <select
                  value={draft.clientId}
                  onChange={(e) => dispatch(setClientId(e.target.value))}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">-- ?????? ????? --</option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} {c.company ? '(' + c.company + ')' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">????? ????? (???????)</label>
                <select
                  value={draft.projectId}
                  onChange={(e) => dispatch(setProjectId(e.target.value))}
                  className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">-- ???? ?????? ?????? --</option>
                  {filteredProjects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold">????? ??????</label>
                <Input
                  dir="ltr"
                  value={draft.invoiceNumber}
                  onChange={(e) => dispatch(setInvoiceNumber(e.target.value))}
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold">????? ????</label>
                  <Input
                    type="date"
                    dir="ltr"
                    value={draft.issueDate}
                    onChange={(e) => dispatch(setIssueDate(e.target.value))}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold">???? ?????</label>
                  <Input
                    type="date"
                    dir="ltr"
                    value={draft.dueDate}
                    onChange={(e) => dispatch(setDueDate(e.target.value))}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Line Items Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-3">
              <div>
                <CardTitle className="text-base font-bold">???????? ????? ? ?????</CardTitle>
                <CardDescription className="text-xs">
                  ??? ???? ????? ?????? ? ????? ????
                </CardDescription>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleAddNewItem}
                className="gap-1.5 text-xs cursor-pointer"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>?????? ????</span>
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {draft.items.map((item, index) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 items-center bg-muted/30 p-3 rounded-xl border border-dashed"
                >
                  <div className="col-span-12 md:col-span-5 space-y-1">
                    <span className="text-[11px] text-muted-foreground font-semibold">
                      ???? {index + 1}: ??? ?????
                    </span>
                    <Input
                      value={item.description}
                      onChange={(e) =>
                        dispatch(
                          updateItem({
                            id: item.id,
                            field: 'description',
                            value: e.target.value,
                          })
                        )
                      }
                      placeholder="????? ? ??? ??????..."
                    />
                  </div>

                  <div className="col-span-4 md:col-span-2 space-y-1">
                    <span className="text-[11px] text-muted-foreground font-semibold">?????/????</span>
                    <Input
                      type="number"
                      dir="ltr"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        dispatch(
                          updateItem({
                            id: item.id,
                            field: 'quantity',
                            value: Number(e.target.value) || 0,
                          })
                        )
                      }
                    />
                  </div>

                  <div className="col-span-4 md:col-span-2 space-y-1">
                    <span className="text-[11px] text-muted-foreground font-semibold">????? ????</span>
                    <Input
                      type="number"
                      dir="ltr"
                      step={50000}
                      value={item.unit_price}
                      onChange={(e) =>
                        dispatch(
                          updateItem({
                            id: item.id,
                            field: 'unit_price',
                            value: Number(e.target.value) || 0,
                          })
                        )
                      }
                    />
                  </div>

                  <div className="col-span-3 md:col-span-2 text-left space-y-1">
                    <span className="text-[11px] text-muted-foreground font-semibold">??? ????</span>
                    <div className="text-xs font-bold pt-2 text-foreground truncate">
                      {formatPrice(item.total)}
                    </div>
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <button
                      onClick={() => dispatch(removeItem(item.id))}
                      className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors cursor-pointer"
                      title="??? ????"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Notes Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-bold">??????? ? ????? ??????</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={draft.notes}
                onChange={(e) => dispatch(setNotes(e.target.value))}
                rows={3}
                placeholder="??????? ?????? ????? ??? ?? ?????? ?????..."
                className="w-full rounded-lg border border-input bg-background p-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
            </CardContent>
          </Card>
        </div>

        {/* Right 1 Col: Live Calculation Breakdown (Redux Showcase) */}
        <div className="space-y-6">
          <Card className="sticky top-20 border-primary/20 bg-gradient-to-b from-card to-primary/5 shadow-md">
            <CardHeader className="border-b pb-4">
              <CardTitle className="text-base font-bold flex items-center gap-2">
                <Calculator className="h-4 w-4 text-primary" />
                <span>????? ??????? ???????</span>
              </CardTitle>
              <CardDescription className="text-xs">
                ?????? ??? ?? Redux Toolkit
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-4 text-xs">
              <div className="flex items-center justify-between text-muted-foreground">
                <span>??? ?? ????? (Subtotal):</span>
                <span className="font-bold text-foreground">{formatPrice(draft.subtotal)}</span>
              </div>

              {/* Discount Input */}
              <div className="flex items-center justify-between gap-3 border-t pt-3">
                <div className="flex items-center gap-1.5">
                  <span>????? (%):</span>
                  <Input
                    type="number"
                    dir="ltr"
                    min={0}
                    max={100}
                    value={draft.discountPercent}
                    onChange={(e) => dispatch(setDiscountPercent(Number(e.target.value) || 0))}
                    className="h-8 w-16 text-center text-xs"
                  />
                </div>
                <span className="font-semibold text-rose-600">
                  {draft.discountAmount > 0 ? '- ' + formatPrice(draft.discountAmount) : '? ?????'}
                </span>
              </div>

              {/* Tax Input */}
              <div className="flex items-center justify-between gap-3 border-t pt-3">
                <div className="flex items-center gap-1.5">
                  <span>?????? ???? ?????? (%):</span>
                  <Input
                    type="number"
                    dir="ltr"
                    min={0}
                    value={draft.taxPercent}
                    onChange={(e) => dispatch(setTaxPercent(Number(e.target.value) || 0))}
                    className="h-8 w-16 text-center text-xs"
                  />
                </div>
                <span className="font-semibold text-foreground">
                  {draft.taxAmount > 0 ? '+ ' + formatPrice(draft.taxAmount) : '? ?????'}
                </span>
              </div>

              {/* Total Amount */}
              <div className="border-t-2 border-primary/30 pt-4 flex items-center justify-between">
                <span className="font-black text-sm text-foreground">???? ????? ???? ??????:</span>
                <span className="font-black text-lg text-primary">
                  {formatPrice(draft.totalAmount)}
                </span>
              </div>

              <Button
                onClick={handleSaveInvoice}
                className="w-full gap-2 mt-4 shadow-lg cursor-pointer"
              >
                <Save className="h-4 w-4" />
                <span>??? ?????? ?? ???????</span>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
