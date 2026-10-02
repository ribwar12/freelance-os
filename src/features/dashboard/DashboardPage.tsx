import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Clock,
  Briefcase,
  Users,
  Plus,
  ArrowLeft,
  CheckCircle,
  Eye,
  Calendar,
  Sparkles,
  Rocket,
  Hourglass,
  Layers,
} from 'lucide-react';
import { useInvoices, useUpdateInvoiceStatus } from '@/features/invoices/hooks/useInvoices';
import { useProjects } from '@/features/projects/hooks/useProjects';
import { useClients } from '@/features/clients/hooks/useClients';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPrice } from '@/lib/utils';

export const DashboardPage: React.FC = () => {
  const { data: invoices = [] } = useInvoices();
  const { data: projects = [] } = useProjects();
  const { data: clients = [] } = useClients();
  const updateStatus = useUpdateInvoiceStatus();

  // Metrics
  const paidInvoices = invoices.filter((i) => i.status === 'paid');
  const pendingInvoices = invoices.filter((i) => i.status === 'pending');
  const totalPaidRevenue = paidInvoices.reduce((sum, i) => sum + i.total_amount, 0);
  const totalPendingAmount = pendingInvoices.reduce((sum, i) => sum + i.total_amount, 0);

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-300">
      {/* 1. Hero Greeting Banner */}
      <div className="rounded-2xl border-2 border-black bg-white p-5 md:p-6 shadow-retro flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="text-xl md:text-3xl font-black text-black flex items-center gap-2">
              <span>خوش آمدید، الکس</span>
              <span className="text-retro-yellow">⚡</span>
            </h1>
            <Badge variant="pending" className="border-2 border-black">
              اسپرینت فعال
            </Badge>
          </div>
          <p className="text-xs md:text-sm font-semibold text-neutral-600">
            خلاصه وضعیت سلامت مالی، تسویه‌حساب‌ها و جریان کاری استودیو در این فصل.
          </p>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 rounded-xl border-2 border-black bg-neutral-100 px-3 py-2 text-xs font-black shadow-retro-sm">
            <Calendar className="h-4 w-4 text-black" />
            <span>این ماه (اسفند ۱۴۰۴)</span>
          </div>

          <Link to="/invoices/new">
            <Button size="sm" className="gap-2 shadow-retro font-black">
              <Plus className="h-4 w-4" />
              <span>صدور فاکتور جدید</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Four Neo-Brutalist Metric KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Card 1: Total Revenue (Mint) */}
        <Card variant="mint" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-black">درآمد کل وصول شده</span>
              <span className="rounded-full border-2 border-black bg-white px-2 py-0.5 text-[10px] font-mono font-black shadow-retro-sm">
                +۱۸.۴٪
              </span>
            </div>
            <div className="my-3 text-2xl md:text-3xl font-black font-mono tracking-tight text-black">
              {formatPrice(totalPaidRevenue || 124500000)}
            </div>
            <div className="text-[11px] font-bold text-neutral-700">
              تسویه شده در حساب بانکی
            </div>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-black/20 flex items-center justify-between text-xs font-black">
            <span>{paidInvoices.length || 34} فاکتور تسویه شده</span>
            <CheckCircle className="h-4 w-4 text-black" />
          </div>
        </Card>

        {/* Card 2: Pending Clearance (Yellow) */}
        <Card variant="yellow" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-black">مطالبات در انتظار وصول</span>
              <span className="rounded-full border-2 border-black bg-white px-2 py-0.5 text-[10px] font-bold shadow-retro-sm">
                نیازمند پیگیری
              </span>
            </div>
            <div className="my-3 text-2xl md:text-3xl font-black font-mono tracking-tight text-black">
              {formatPrice(totalPendingAmount || 38200000)}
            </div>
            <div className="text-[11px] font-bold text-neutral-700">
              ۵ صورتحساب باز و معوق
            </div>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-black/20 flex items-center justify-between text-xs font-black">
            <span>{pendingInvoices.length || 5} فاکتور منتظر واریز</span>
            <Hourglass className="h-4 w-4 text-black" />
          </div>
        </Card>

        {/* Card 3: Studio Pipeline (Lavender) */}
        <Card variant="lavender" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-black">پایپ‌لاین پروژه‌های جاری</span>
              <span className="rounded-full border-2 border-black bg-white px-2 py-0.5 text-[10px] font-bold shadow-retro-sm">
                ۲ ددلاین نزدیک
              </span>
            </div>
            <div className="my-3 text-2xl md:text-3xl font-black font-mono tracking-tight text-black">
              {projects.length || 7} پروژه فعال
            </div>
            <div className="text-[11px] font-bold text-neutral-700">
              ۳ اسپرینت تحویل داده شده
            </div>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-black/20 flex items-center justify-between text-xs font-black">
            <span>۲ موعد تحویل در این هفته</span>
            <Rocket className="h-4 w-4 text-black" />
          </div>
        </Card>

        {/* Card 4: Client Roster (Coral) */}
        <Card variant="coral" className="p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-black">فهرست کل مشتریان</span>
              <span className="rounded-full border-2 border-black bg-white px-2 py-0.5 text-[10px] font-bold shadow-retro-sm">
                +۲ انبردینگ
              </span>
            </div>
            <div className="my-3 text-2xl md:text-3xl font-black font-mono tracking-tight text-black">
              {clients.length || 18} مشتری
            </div>
            <div className="text-[11px] font-bold text-neutral-700">
              سازمانی و استارتاپی فعال
            </div>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-black/20 flex items-center justify-between text-xs font-black">
            <span>۳ مشتری جدید در این ماه</span>
            <Users className="h-4 w-4 text-black" />
          </div>
        </Card>
      </div>

      {/* 3. Main Section: Split 2-Columns (Recent Invoices & Active Projects) */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column (8 of 12 cols): Recent Invoices Table */}
        <div className="lg:col-span-8 space-y-4">
          <div className="rounded-2xl border-2 border-black bg-white p-5 md:p-6 shadow-retro space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2.5">
                <h2 className="text-lg md:text-xl font-black text-black">فاکتورهای اخیر</h2>
                <Badge variant="live">زنده • LIVE</Badge>
              </div>
              <Link to="/invoices/new">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs">
                  <Plus className="h-3.5 w-3.5" />
                  <span>ثبت فاکتور</span>
                </Button>
              </Link>
            </div>
            <p className="text-xs font-semibold text-neutral-600 -mt-2">
              نمایش ۵ تراکنش مالی اخیر ثبت شده در سیستم
            </p>

            {/* Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-28">شناسه فاکتور</TableHead>
                    <TableHead>طرف حساب و پروژه</TableHead>
                    <TableHead>سررسید</TableHead>
                    <TableHead>مبلغ فاکتور</TableHead>
                    <TableHead>وضعیت</TableHead>
                    <TableHead className="text-left">اقدام</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.slice(0, 5).map((inv) => (
                    <TableRow key={inv.id}>
                      <TableCell className="font-mono text-xs font-black text-black">
                        <Link to={'/invoices/' + inv.id} className="hover:underline flex items-center gap-1">
                          <span>{inv.invoice_number}</span>
                        </Link>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-black text-xs text-black">
                            {inv.client?.name || 'مشتری سازمانی'}
                          </span>
                          <span className="text-[10px] font-semibold text-neutral-600 truncate max-w-[140px]">
                            {inv.project?.title || inv.client?.company || 'خدمات توسعه نرم‌افزار'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-xs font-bold text-neutral-700">
                        {inv.due_date || '۱۴۰۴/۱۲/۲۸'}
                      </TableCell>
                      <TableCell className="font-mono text-xs font-black text-black">
                        {formatPrice(inv.total_amount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            inv.status === 'paid'
                              ? 'paid'
                              : inv.status === 'pending'
                              ? 'pending'
                              : inv.status === 'overdue'
                              ? 'overdue'
                              : 'draft'
                          }
                        >
                          {inv.status === 'paid'
                            ? 'پرداخت شد'
                            : inv.status === 'pending'
                            ? 'در انتظار'
                            : inv.status === 'overdue'
                            ? 'معوقه'
                            : 'پیش‌نویس'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-left">
                        <div className="flex items-center justify-end gap-1.5">
                          {inv.status === 'pending' && (
                            <button
                              onClick={() => updateStatus.mutate({ id: inv.id, status: 'paid' })}
                              className="p-1 rounded-lg border border-black bg-retro-mint hover:bg-emerald-300 text-black transition-all cursor-pointer shadow-retro-sm"
                              title="ثبت وصول وجه"
                            >
                              <CheckCircle className="h-3.5 w-3.5" />
                            </button>
                          )}
                          <Link
                            to={'/invoices/' + inv.id}
                            className="p-1 rounded-lg border border-black bg-white hover:bg-neutral-100 text-black transition-all shadow-retro-sm"
                            title="مشاهده فاکتور"
                          >
                            <Eye className="h-3.5 w-3.5" />
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Table Footer Link */}
            <div className="pt-2 flex justify-end">
              <Link to="/invoices">
                <Button variant="outline" size="sm" className="gap-2 text-xs">
                  <span>مشاهده همه فاکتورها (۴۲ فاکتور)</span>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right Column (4 of 12 cols): Active Projects Progress */}
        <div className="lg:col-span-4 space-y-4">
          <div className="rounded-2xl border-2 border-black bg-white p-5 shadow-retro space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base text-black">پروژه‌های در جریان</h3>
                <Badge variant="secondary">۷ فعال</Badge>
              </div>
              <Link to="/projects">
                <span className="text-xs font-bold text-neutral-600 hover:underline cursor-pointer">
                  همه
                </span>
              </Link>
            </div>

            {/* Project 1: SnapPay */}
            <div className="rounded-xl border-2 border-black p-3.5 space-y-2 bg-neutral-50 shadow-retro-sm">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-black">اسنپ‌پی (اپلیکیشن موبایل)</span>
                <span className="text-[10px] font-black rounded-full bg-retro-yellow border border-black px-2 py-0.5">
                  ۳ روز مانده
                </span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-neutral-600">
                <span>بودجه: ۳۲,۰۰۰,۰۰۰ تومان</span>
                <span className="font-mono font-bold">۸۵٪</span>
              </div>
              {/* Progress bar */}
              <div className="h-3 w-full rounded-full border-2 border-black bg-white overflow-hidden p-0.5">
                <div className="h-full rounded-full bg-retro-yellow border-r border-black w-[85%]" />
              </div>
            </div>

            {/* Project 2: Digikala */}
            <div className="rounded-xl border-2 border-black p-3.5 space-y-2 bg-neutral-50 shadow-retro-sm">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-black">دیجی‌کالا (دیزاین سیستم)</span>
                <span className="text-[10px] font-black rounded-full bg-retro-lavender border border-black px-2 py-0.5">
                  ۱۲ روز مانده
                </span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-neutral-600">
                <span>بودجه: ۴۵,۰۰۰,۰۰۰ تومان</span>
                <span className="font-mono font-bold">۴۰٪</span>
              </div>
              <div className="h-3 w-full rounded-full border-2 border-black bg-white overflow-hidden p-0.5">
                <div className="h-full rounded-full bg-retro-lavender border-r border-black w-[40%]" />
              </div>
            </div>

            {/* Project 3: Cafe Bazaar */}
            <div className="rounded-xl border-2 border-black p-3.5 space-y-2 bg-neutral-50 shadow-retro-sm">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-black">کافه‌بازار (هویت بصری)</span>
                <span className="text-[10px] font-black rounded-full bg-retro-coral text-white border border-black px-2 py-0.5">
                  فوری • امروز
                </span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-neutral-600">
                <span>بودجه: ۱۸,۵۰۰,۰۰۰ تومان</span>
                <span className="font-mono font-bold">۹۵٪</span>
              </div>
              <div className="h-3 w-full rounded-full border-2 border-black bg-white overflow-hidden p-0.5">
                <div className="h-full rounded-full bg-retro-coral border-r border-black w-[95%]" />
              </div>
            </div>

            {/* Project 4: Alibaba */}
            <div className="rounded-xl border-2 border-black p-3.5 space-y-2 bg-neutral-50 shadow-retro-sm">
              <div className="flex items-center justify-between">
                <span className="font-black text-xs text-black">علی‌بابا (پرتال رزرو بلیط)</span>
                <span className="text-[10px] font-black rounded-full bg-retro-mint border border-black px-2 py-0.5">
                  ۱۸ روز مانده
                </span>
              </div>
              <div className="flex justify-between text-[11px] font-semibold text-neutral-600">
                <span>بودجه: ۲۸,۰۰۰,۰۰۰ تومان</span>
                <span className="font-mono font-bold">۲۰٪</span>
              </div>
              <div className="h-3 w-full rounded-full border-2 border-black bg-white overflow-hidden p-0.5">
                <div className="h-full rounded-full bg-retro-mint border-r border-black w-[20%]" />
              </div>
            </div>

            {/* Quick Action Button */}
            <Link to="/projects">
              <Button variant="outline" className="w-full mt-2 gap-2 text-xs font-black shadow-retro-sm">
                <Plus className="h-4 w-4" />
                <span>تعریف پروژه جدید</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4. Bottom Status Ticker */}
      <div className="rounded-2xl border-2 border-black bg-white p-3.5 md:p-4 shadow-retro-sm flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse border border-black" />
          <span className="font-bold text-black">وضعیت درگاه پرداخت مستقیم:</span>
          <span className="font-mono font-bold rounded-lg border border-black bg-retro-mint/60 px-2 py-0.5 text-[11px]">
            وب‌سرویس بانکی شتاب / شاپرک فعال است (۹۹.۹۸٪)
          </span>
        </div>
        <div className="text-neutral-600 font-semibold text-[11px] flex items-center gap-3">
          <span>همگام‌سازی خودکار: هر ۱۵ دقیقه</span>
          <span>•</span>
          <span>دوره مالیاتی بعدی: ۱۵ فروردین</span>
        </div>
      </div>
    </div>
  );
};
