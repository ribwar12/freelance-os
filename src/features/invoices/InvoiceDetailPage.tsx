import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Printer, ArrowRight, CheckCircle2, Building, Mail, Phone, CreditCard } from 'lucide-react';
import { useInvoice, useUpdateInvoiceStatus } from './hooks/useInvoices';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPrice, formatDate } from '@/lib/utils';

export const InvoiceDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: invoice, isLoading } = useInvoice(id || '');
  const updateStatus = useUpdateInvoiceStatus();

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="text-center py-12 space-y-4">
        <h2 className="text-xl font-bold">?????? ???? ??? ???? ???.</h2>
        <Button onClick={() => navigate('/invoices')}>?????? ?? ???? ????????</Button>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 pb-12 animate-in fade-in duration-500">
      {/* Top Toolbar (Hidden on print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
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
            <h1 className="text-xl font-extrabold flex items-center gap-2">
              <span>????????</span>
              <span className="font-mono text-primary">{invoice.invoice_number}</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {invoice.status === 'pending' && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateStatus.mutate({ id: invoice.id, status: 'paid' })}
              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950 cursor-pointer"
            >
              <CheckCircle2 className="h-4 w-4 ml-1.5" />
              <span>??? ?? ????? ?????? ???</span>
            </Button>
          )}
          <Button onClick={handlePrint} size="sm" className="gap-2 shadow-md cursor-pointer">
            <Printer className="h-4 w-4" />
            <span>??? ? ????? PDF</span>
          </Button>
        </div>
      </div>

      {/* Printable Sheet (Standard A4 design) */}
      <div className="bg-card print:bg-white text-card-foreground print:text-black border print:border-none rounded-2xl shadow-sm print:shadow-none p-8 md:p-12 space-y-8">
        {/* Header: Issuer Info and Status */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary print:text-black">
              <Building className="h-6 w-6" />
              <h2 className="text-2xl font-black">{user?.business_name || '??????? ??????'}</h2>
            </div>
            <p className="text-xs text-muted-foreground print:text-gray-600">
              ???? ? ??????????? ?????????: {user?.full_name || '????? ?????'}
            </p>
            <div className="text-xs text-muted-foreground print:text-gray-600 flex items-center gap-4 pt-1">
              <span>????: {user?.phone || '???????????'}</span>
              <span>?????: {user?.email}</span>
            </div>
          </div>

          <div className="text-left space-y-2 sm:self-start">
            <div className="flex items-center justify-end gap-2">
              <span className="text-xs text-muted-foreground">?????:</span>
              <Badge
                variant={
                  invoice.status === 'paid'
                    ? 'paid'
                    : invoice.status === 'pending'
                    ? 'pending'
                    : 'draft'
                }
              >
                {invoice.status === 'paid'
                  ? '????? ???'
                  : invoice.status === 'pending'
                  ? '?? ?????? ??????'
                  : '????????'}
              </Badge>
            </div>
            <div className="text-xs text-muted-foreground print:text-gray-600 space-y-1 font-mono">
              <div>?????: {invoice.invoice_number}</div>
              <div>????? ????: {formatDate(invoice.issue_date)}</div>
              <div>??????: {formatDate(invoice.due_date)}</div>
            </div>
          </div>
        </div>

        {/* Client & Project Info */}
        <div className="grid sm:grid-cols-2 gap-6 bg-muted/20 print:bg-gray-50 p-4 rounded-xl border">
          <div className="space-y-1 text-xs">
            <span className="font-bold text-muted-foreground">?????? ??? ???? (?????? / ???????):</span>
            <div className="font-extrabold text-sm text-foreground print:text-black">
              {invoice.client?.name || '????? ??????'}
            </div>
            {invoice.client?.company && (
              <div className="text-muted-foreground">{invoice.client.company}</div>
            )}
            {invoice.client?.phone && (
              <div className="text-muted-foreground">????: {invoice.client.phone}</div>
            )}
            {invoice.client?.address && (
              <div className="text-muted-foreground">{invoice.client.address}</div>
            )}
          </div>

          {invoice.project && (
            <div className="space-y-1 text-xs sm:border-r sm:pr-6">
              <span className="font-bold text-muted-foreground">????? ? ??????? ??????:</span>
              <div className="font-extrabold text-sm text-foreground print:text-black">
                {invoice.project.title}
              </div>
              <div className="text-muted-foreground">
                ????? ??? ???????: {formatPrice(invoice.project.budget)}
              </div>
            </div>
          )}
        </div>

        {/* Itemized Table */}
        <div className="border rounded-xl overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50 print:bg-gray-100">
              <TableRow>
                <TableHead className="w-12 text-center">????</TableHead>
                <TableHead>??? ????? / ????</TableHead>
                <TableHead className="w-24 text-center">????? / ????</TableHead>
                <TableHead className="w-36 text-left">????? ???? (?????)</TableHead>
                <TableHead className="w-36 text-left">???? ?? (?????)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items && invoice.items.length > 0 ? (
                invoice.items.map((item, index) => (
                  <TableRow key={item.id || index}>
                    <TableCell className="text-center font-mono text-xs">{index + 1}</TableCell>
                    <TableCell className="font-medium text-xs">{item.description}</TableCell>
                    <TableCell className="text-center font-mono text-xs">{item.quantity}</TableCell>
                    <TableCell className="text-left font-mono text-xs">
                      {new Intl.NumberFormat('fa-IR').format(item.unit_price)}
                    </TableCell>
                    <TableCell className="text-left font-mono text-xs font-bold">
                      {new Intl.NumberFormat('fa-IR').format(item.total)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-xs text-muted-foreground py-4">
                    ???? ????
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Summary Breakdown & Bank Info */}
        <div className="grid sm:grid-cols-2 gap-8 pt-4">
          {/* Payment & Bank Details */}
          <div className="space-y-3 text-xs bg-muted/20 print:bg-gray-50 p-4 rounded-xl border">
            <span className="font-bold flex items-center gap-1.5 text-foreground print:text-black">
              <CreditCard className="h-4 w-4 text-primary" />
              <span>??????? ????? ???:</span>
            </span>
            <div className="space-y-1 font-mono text-muted-foreground print:text-gray-700">
              <div>???? ????: ???? ??? / ?????</div>
              <div>????? ????: {user?.bank_card || '????-????-????-????'}</div>
              <div>?? ???: {user?.full_name || '???? ?????'}</div>
            </div>
            {invoice.notes && (
              <p className="text-[11px] text-muted-foreground border-t pt-2 mt-2 leading-relaxed">
                {invoice.notes}
              </p>
            )}
          </div>

          {/* Totals Table */}
          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 text-muted-foreground">
              <span>??? ?????? ?????:</span>
              <span className="font-bold text-foreground print:text-black">
                {formatPrice(invoice.subtotal)}
              </span>
            </div>

            {invoice.discount_amount > 0 && (
              <div className="flex justify-between py-1 text-rose-600">
                <span>????? ({invoice.discount_percent}?):</span>
                <span className="font-bold">- {formatPrice(invoice.discount_amount)}</span>
              </div>
            )}

            {invoice.tax_amount > 0 && (
              <div className="flex justify-between py-1 text-muted-foreground">
                <span>?????? ?? ???? ?????? ({invoice.tax_percent}?):</span>
                <span className="font-bold text-foreground print:text-black">
                  + {formatPrice(invoice.tax_amount)}
                </span>
              </div>
            )}

            <div className="flex justify-between py-3 border-t-2 border-primary/40 text-sm font-black">
              <span className="text-foreground print:text-black">???? ?? ???? ??????:</span>
              <span className="text-primary print:text-black text-base">
                {formatPrice(invoice.total_amount)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer Seal & Signature */}
        <div className="flex justify-between items-end pt-12 border-t text-xs text-muted-foreground print:text-gray-600">
          <div>????? ????????? ??????</div>
          <div>??? ? ????? ????? ???????</div>
        </div>
      </div>
    </div>
  );
};
