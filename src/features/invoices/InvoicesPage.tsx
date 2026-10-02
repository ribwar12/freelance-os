import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Eye, CheckCircle, Trash2, Search, FileText } from 'lucide-react';
import { useInvoices, useUpdateInvoiceStatus, useDeleteInvoice } from './hooks/useInvoices';
import { useAppSelector } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPrice, formatDate } from '@/lib/utils';
import { InvoiceStatus } from '@/types/database.types';

export const InvoicesPage: React.FC = () => {
  const { data: invoices = [], isLoading } = useInvoices();
  const updateStatus = useUpdateInvoiceStatus();
  const deleteInvoice = useDeleteInvoice();
  const { globalSearch } = useAppSelector((state) => state.ui);

  const [activeTab, setActiveTab] = useState<string>('all');
  const [search, setSearch] = useState('');

  const activeSearch = globalSearch || search;

  const filteredInvoices = invoices.filter((inv) => {
    const matchesTab = activeTab === 'all' || inv.status === activeTab;
    const matchesSearch =
      inv.invoice_number.toLowerCase().includes(activeSearch.toLowerCase()) ||
      (inv.client?.name && inv.client.name.toLowerCase().includes(activeSearch.toLowerCase())) ||
      (inv.project?.title && inv.project.title.toLowerCase().includes(activeSearch.toLowerCase()));

    return matchesTab && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">??????????? ? ????????</h1>
          <p className="text-sm text-muted-foreground mt-1">
            ???? ????????? ????? ????? ????????? ? ???????????? ????
          </p>
        </div>
        <Link to="/invoices/new">
          <Button size="sm" className="gap-2 shadow-md cursor-pointer">
            <Plus className="h-4 w-4" />
            <span>???? ?????? ????</span>
          </Button>
        </Link>
      </div>

      {/* Tabs and Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 bg-muted/60 p-1 rounded-xl w-fit">
          {[
            { key: 'all', label: '???' },
            { key: 'pending', label: '?? ?????? ??????' },
            { key: 'paid', label: '?????? ???' },
            { key: 'draft', label: '????????' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={
                'px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ' +
                (activeTab === tab.key
                  ? 'bg-card text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground')
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="?????? ????? ?????? ?? ?????..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-9 text-xs"
          />
        </div>
      </div>

      {/* Invoices Table Card */}
      <Card className="shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-32">????? ??????</TableHead>
                <TableHead>??? ???? (?????)</TableHead>
                <TableHead>????? ??????</TableHead>
                <TableHead>????? ????</TableHead>
                <TableHead>??????</TableHead>
                <TableHead>???? ??</TableHead>
                <TableHead>?????</TableHead>
                <TableHead className="text-left">??????</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-32 text-center text-muted-foreground text-xs">
                    ??????? ?? ??? ?????? ???? ???.
                  </TableCell>
                </TableRow>
              ) : (
                filteredInvoices.map((inv) => (
                  <TableRow key={inv.id} className="hover:bg-muted/40">
                    <TableCell className="font-mono text-xs font-bold text-primary">
                      <Link to={'/invoices/' + inv.id} className="hover:underline flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        <span>{inv.invoice_number}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="text-xs font-semibold">
                      {inv.client?.name || '---'}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground truncate max-w-[150px]">
                      {inv.project?.title || '????? ?????'}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(inv.issue_date)}
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(inv.due_date)}
                    </TableCell>
                    <TableCell className="text-xs font-extrabold text-foreground">
                      {formatPrice(inv.total_amount)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          inv.status === 'paid'
                            ? 'paid'
                            : inv.status === 'pending'
                            ? 'pending'
                            : 'draft'
                        }
                      >
                        {inv.status === 'paid'
                          ? '????? ??'
                          : inv.status === 'pending'
                          ? '?? ?????? ?????'
                          : '????????'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-left">
                      <div className="flex items-center justify-end gap-1.5">
                        {inv.status === 'pending' && (
                          <button
                            onClick={() => updateStatus.mutate({ id: inv.id, status: 'paid' })}
                            className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 rounded transition-colors cursor-pointer"
                            title="????? ????? ?? ????? ???"
                          >
                            <CheckCircle className="h-4 w-4" />
                          </button>
                        )}
                        <Link
                          to={'/invoices/' + inv.id}
                          className="p-1.5 text-muted-foreground hover:text-primary hover:bg-muted rounded transition-colors"
                          title="?????? ? ???"
                        >
                          <Eye className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => deleteInvoice.mutate(inv.id)}
                          className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-muted rounded transition-colors cursor-pointer"
                          title="??? ??????"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
