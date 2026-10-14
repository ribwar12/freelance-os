import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { InvoicesPage } from './components/invoices/InvoicesPage';
import { InvoiceSummaryStrip } from './components/invoices/InvoiceSummaryStrip';
import { InvoiceFilters } from './components/invoices/InvoiceFilters';
import { InvoicesTable, INITIAL_INVOICES_DATA } from './components/invoices/InvoicesTable';
import { InvoiceShortcutsDock } from './components/invoices/InvoicePagination';
import { CreateInvoicePage } from './components/invoices/CreateInvoicePage';
import { InvoiceMetadataCard } from './components/invoices/InvoiceMetadataCard';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/Card';
import { Badge } from './components/ui/Badge';

export default function App() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('current_month');
  const [actionNotice, setActionNotice] = useState('');

  // لیست کامل فاکتورها در استیت جهت عملیات واقعی و زنده CRUD (گام ۳-۴)
  const [invoicesList, setInvoicesList] = useState(INITIAL_INVOICES_DATA);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);

  // استیت‌های فیلتر و جستجوی فاکتورها (گام ۳-۳)
  const [invoiceStatus, setInvoiceStatus] = useState('all');
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [invoiceClient, setInvoiceClient] = useState('all');
  const [invoiceDateRange, setInvoiceDateRange] = useState('1405_all');
  const [invoiceCurrency, setInvoiceCurrency] = useState('TOM');

  // استیت‌های صفحه‌بندی نئوبروتال (گام ۳-۵)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // استیت‌های فرم صدور فاکتور جدید (فاز ۴)
  const [newInvoiceClient, setNewInvoiceClient] = useState('digikala');
  const [newInvoiceProject, setNewInvoiceProject] = useState('دیزاین سیستم و توکن‌ها (تحویل فاز ۲)');
  const [newInvoicePoRef, setNewInvoicePoRef] = useState('PO-DK-9041');
  const [newInvoiceIssueDate, setNewInvoiceIssueDate] = useState('۱۴۰۵/۰۷/۱۰');
  const [newInvoiceDueDate, setNewInvoiceDueDate] = useState('۱۴۰۵/۰۸/۰۱');

  // شنودگر میانبرهای صفحه‌کلید صنعتی (N, F, /, E)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // اگر کاربر داخل یک فیلد متنی تایپ می‌کند، میانبر فعال نشود
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        navigate('/invoices/new');
        setActionNotice('⚡ کلید میانبر [N]: هدایت به صفحه صدور فاکتور جدید (فاز ۴)');
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        const searchInput = document.getElementById('invoiceSearchInput');
        if (searchInput) searchInput.focus();
        setActionNotice('⚡ کلید میانبر [F]: تمرکز روی فیلترها و جستجو');
      } else if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.getElementById('invoiceSearchInput');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
        setActionNotice('⚡ کلید میانبر [/]: فعال‌سازی جستجوی زنده');
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        setActionNotice('⚡ کلید میانبر [E]: خروجی گزارش مالی و دفتر کل (Export Ledger)');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // فیلتر کردن هوشمند لیست فاکتورها بر اساس استیت فیلترها و جستجو
  const filteredInvoices = invoicesList.filter((inv) => {
    if (invoiceStatus !== 'all' && inv.status !== invoiceStatus) {
      return false;
    }
    if (invoiceSearch.trim()) {
      const q = invoiceSearch.trim().toLowerCase();
      const matchId = inv.id.toLowerCase().includes(q);
      const matchClient = inv.client.toLowerCase().includes(q);
      const matchProject = inv.project.toLowerCase().includes(q);
      if (!matchId && !matchClient && !matchProject) return false;
    }
    if (invoiceClient !== 'all') {
      const clientMap = {
        digikala: 'دیجی‌کالا',
        snappay: 'اسنپ‌پی',
        cafebazaar: 'کافه بازار',
        torob: 'ترب',
        divar: 'دیوار',
        alibaba: 'علی‌بابا',
      };
      const target = clientMap[invoiceClient];
      if (target && !inv.client.includes(target)) return false;
    }
    return true;
  });

  // محاسبه پویای تعداد هر وضعیت برای بج‌های فیلتر
  const dynamicCounts = {
    all: invoicesList.length,
    pending: invoicesList.filter((i) => i.status === 'pending').length,
    paid: invoicesList.filter((i) => i.status === 'paid').length,
    overdue: invoicesList.filter((i) => i.status === 'overdue').length,
    draft: invoicesList.filter((i) => i.status === 'draft').length,
  };

  // محاسبات صفحه‌بندی نئوبروتال (گام ۳-۵)
  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  // توابع کنترل چک‌باکس‌ها و عملیات تکی و دسته‌جمعی
  const handleSelectRow = (id) => {
    setSelectedInvoiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedInvoiceIds.length === filteredInvoices.length) {
      setSelectedInvoiceIds([]);
    } else {
      setSelectedInvoiceIds(filteredInvoices.map((i) => i.id));
    }
  };

  const handleMarkAsPaid = (inv) => {
    setInvoicesList((prev) =>
      prev.map((item) =>
        item.id === inv.id
          ? { ...item, status: 'paid', statusLabel: 'تسویه شد', isOverdue: false }
          : item
      )
    );
    setActionNotice(`فاکتور ${inv.id} با موفقیت به وضعیت «تسویه شد» تغییر یافت! ✓`);
  };

  const handleDeleteInvoice = (inv) => {
    setInvoicesList((prev) => prev.filter((item) => item.id !== inv.id));
    setSelectedInvoiceIds((prev) => prev.filter((id) => id !== inv.id));
    setActionNotice(`فاکتور ${inv.id} با موفقیت حذف شد.`);
  };

  const handleBulkAction = (action, ids) => {
    if (action === 'paid') {
      setInvoicesList((prev) =>
        prev.map((item) =>
          ids.includes(item.id)
            ? { ...item, status: 'paid', statusLabel: 'تسویه شد', isOverdue: false }
            : item
        )
      );
      setActionNotice(`تسویه گروهی برای ${ids.length} فاکتور با موفقیت اعمال شد! ✓`);
    } else if (action === 'delete') {
      setInvoicesList((prev) => prev.filter((item) => !ids.includes(item.id)));
      setActionNotice(`${ids.length} فاکتور انتخاب‌شده حذف شدند.`);
    } else if (action === 'export') {
      setActionNotice(`خروجی اکسل/CSV برای ${ids.length} فاکتور آماده دانلود شد.`);
    }
    setSelectedInvoiceIds([]);
  };

  const handleResetInvoiceFilters = () => {
    setInvoiceStatus('all');
    setInvoiceSearch('');
    setInvoiceClient('all');
    setInvoiceDateRange('1405_all');
    setSelectedInvoiceIds([]);
    setCurrentPage(1);
    setActionNotice('تمام فیلترهای صفحه فاکتورها بازنشانی شدند.');
  };

  // داده‌های پویا متناسب با دوره زمانی انتخاب‌شده
  const metricsDataByPeriod = {
    current_month: [
      {
        id: 'revenue',
        title: 'درآمد کل وصول شده',
        badge: '+۱۸.۴٪ ↗',
        amount: '۱۲۴,۵۰۰,۰۰۰',
        currency: 'تومان • تسویه نهایی مهر',
        footerText: '۳۴ فاکتور پرداخت شده',
        footerIcon: '✓',
        bgClass: 'bg-retro-mint',
      },
      {
        id: 'pending',
        title: 'در انتظار وصول',
        badge: 'نیازمند پیگیری',
        amount: '۳۸,۲۰۰,۰۰۰',
        currency: 'تومان • ۵ صورت‌حساب',
        footerText: '۵ فاکتور در انتظار پرداخت',
        footerIcon: '⏳',
        bgClass: 'bg-retro-yellow',
      },
      {
        id: 'projects',
        title: 'پایپ‌لاین پروژه‌ها',
        badge: '۲ موعد نزدیک',
        amount: '۷ پروژه فعال',
        currency: '۳ اسپرینت تحویل شده',
        footerText: '۲ تحویل تا انتهای هفته',
        footerIcon: '🚀',
        bgClass: 'bg-retro-lavender',
      },
      {
        id: 'clients',
        title: 'باشگاه مشتریان',
        badge: '+۲ مشتری جدید',
        amount: '۱۸ مشتری',
        currency: 'شرکت‌ها و استارتاپ‌ها',
        footerText: '۳ قرارداد جدید این ماه',
        footerIcon: '👥',
        bgClass: 'bg-retro-coral',
      },
    ],
    last_month: [
      {
        id: 'revenue',
        title: 'درآمد کل وصول شده',
        badge: '+۱۲.۱٪ ↗',
        amount: '۹۸,۲۰۰,۰۰۰',
        currency: 'تومان • تسویه کامل شهریور',
        footerText: '۲۸ فاکتور تسویه شده',
        footerIcon: '✓',
        bgClass: 'bg-retro-mint',
      },
      {
        id: 'pending',
        title: 'در انتظار وصول',
        badge: 'تسویه شده',
        amount: '۴,۰۰۰,۰۰۰',
        currency: 'تومان • ۱ صورت‌حساب باز',
        footerText: '۱ فاکتور باقی‌مانده',
        footerIcon: '⏳',
        bgClass: 'bg-retro-yellow',
      },
      {
        id: 'projects',
        title: 'پایپ‌لاین پروژه‌ها',
        badge: 'تکمیل شد',
        amount: '۵ پروژه بسته شده',
        currency: 'تحویل ۱۰۰٪ تعهدات',
        footerText: 'همه پروژه‌ها تحویل شدند',
        footerIcon: '🚀',
        bgClass: 'bg-retro-lavender',
      },
      {
        id: 'clients',
        title: 'باشگاه مشتریان',
        badge: '+۱ مشتری',
        amount: '۱۶ مشتری',
        currency: 'سازمانی',
        footerText: '۱ قرارداد در شهریور',
        footerIcon: '👥',
        bgClass: 'bg-retro-coral',
      },
    ],
    quarter: [
      {
        id: 'revenue',
        title: 'درآمد کل وصول شده',
        badge: '+۲۴.۸٪ ↗',
        amount: '۳۴۵,۰۰۰,۰۰۰',
        currency: 'تومان • پاییز ۱۴۰۵',
        footerText: '۸۲ فاکتور پرداخت شده',
        footerIcon: '✓',
        bgClass: 'bg-retro-mint',
      },
      {
        id: 'pending',
        title: 'در انتظار وصول',
        badge: 'جریان باز',
        amount: '۵۲,۰۰۰,۰۰۰',
        currency: 'تومان • ۸ صورت‌حساب',
        footerText: '۸ فاکتور در گردش کار',
        footerIcon: '⏳',
        bgClass: 'bg-retro-yellow',
      },
      {
        id: 'projects',
        title: 'پایپ‌لاین پروژه‌ها',
        badge: 'فصل پرفشار',
        amount: '۱۴ پروژه ثبت‌شده',
        currency: '۹ اسپرینت اجرا شده',
        footerText: '۶ تحویل موعد مقرر',
        footerIcon: '🚀',
        bgClass: 'bg-retro-lavender',
      },
      {
        id: 'clients',
        title: 'باشگاه مشتریان',
        badge: '+۵ مشتری جدید',
        amount: '۱۸ مشتری',
        currency: 'کل مشتریان پاییز',
        footerText: 'رشد ۲۸ درصدی مشتریان',
        footerIcon: '👥',
        bgClass: 'bg-retro-coral',
      },
    ],
    year: [
      {
        id: 'revenue',
        title: 'درآمد کل وصول شده',
        badge: '+۴۱.۵٪ ↗',
        amount: '۱,۱۸۰,۰۰۰,۰۰۰',
        currency: 'تومان • سال مالی جاری',
        footerText: '۲۱۰ فاکتور پرداخت شده',
        footerIcon: '✓',
        bgClass: 'bg-retro-mint',
      },
      {
        id: 'pending',
        title: 'در انتظار وصول',
        badge: 'معوقات سالانه',
        amount: '۷۸,۵۰۰,۰۰۰',
        currency: 'تومان • ۱۲ صورت‌حساب',
        footerText: '۱۲ فاکتور در گردش وصول',
        footerIcon: '⏳',
        bgClass: 'bg-retro-yellow',
      },
      {
        id: 'projects',
        title: 'پایپ‌لاین پروژه‌ها',
        badge: 'سالانه',
        amount: '۳۶ پروژه انجام‌شده',
        currency: 'تکمیل ۲۲ اسپرینت استودیو',
        footerText: '۹۸٪ رضایت کارفرمایان',
        footerIcon: '🚀',
        bgClass: 'bg-retro-lavender',
      },
      {
        id: 'clients',
        title: 'باشگاه مشتریان',
        badge: '+۱۸ مشتری کل',
        amount: '۱۸ مشتری',
        currency: 'پرتفوی رسمی استودیو',
        footerText: '۱۰۰٪ قرارداد رسمی',
        footerIcon: '👥',
        bgClass: 'bg-retro-coral',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-canvas font-sans" dir="rtl">
      {/* کامپوننت نوبار سراسری مجهز به React Router NavLink */}
      <Navbar
        onNewInvoice={() => {
          navigate('/invoices/new');
          setActionNotice('انتقال به صفحه صدور فاکتور جدید (فاز ۴)');
        }}
        onNewClient={() => {
          navigate('/clients');
          setActionNotice('انتقال به بخش ثبت مشتری جدید');
        }}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* اعلان اکشن تعاملی زنده */}
        {actionNotice && (
          <div className="rounded-xl border-2 border-black bg-retro-mint p-3 text-xs md:text-sm font-black text-black shadow-retro-sm flex items-center justify-between">
            <span>⚡ رویداد تعاملی: {actionNotice}</span>
            <button
              onClick={() => setActionNotice('')}
              className="text-black font-bold hover:underline px-2 cursor-pointer"
            >
              بستن ×
            </button>
          </div>
        )}

        {/* تعریف روت‌های استاندارد صنعتی React Router */}
        <Routes>
          {/* روت اصلی: پیشخوان جامع (/) */}
          <Route
            path="/"
            element={
              <DashboardPage
                period={period}
                onPeriodChange={setPeriod}
                metricsDataByPeriod={metricsDataByPeriod}
                onActionNotice={setActionNotice}
              />
            }
          />

          {/* روت دوم: فهرست و فیلتر فاکتورها (/invoices) */}
          <Route
            path="/invoices"
            element={
              <InvoicesPage
                onNewInvoice={() => {
                  navigate('/invoices/new');
                  setActionNotice('انتقال به صفحه صدور فاکتور جدید (فاز ۴)');
                }}
                onExportCSV={() => setActionNotice('درخواست استخراج خروجی CSV / گزارش مالی')}
              >
                {/* ۱. نوار کارت‌های ۳گانه خلاصه مالی فاکتورها (گام ۳-۲) */}
                <InvoiceSummaryStrip />

                {/* ۲. جعبه‌ابزار کنترل، فیلتر وضعیت و جستجوی پیشرفته (گام ۳-۳) */}
                <InvoiceFilters
                  statusFilter={invoiceStatus}
                  onStatusChange={(status) => {
                    setInvoiceStatus(status);
                    setCurrentPage(1);
                    setActionNotice(`فیلتر وضعیت روی «${status}» تنظیم شد.`);
                  }}
                  searchQuery={invoiceSearch}
                  onSearchChange={(q) => {
                    setInvoiceSearch(q);
                    setCurrentPage(1);
                  }}
                  selectedClient={invoiceClient}
                  onClientChange={(client) => {
                    setInvoiceClient(client);
                    setCurrentPage(1);
                    setActionNotice(`فیلتر کارفرما روی «${client}» تنظیم شد.`);
                  }}
                  selectedDateRange={invoiceDateRange}
                  onDateRangeChange={(range) => {
                    setInvoiceDateRange(range);
                    setCurrentPage(1);
                    setActionNotice(`بازه زمانی روی «${range}» تنظیم شد.`);
                  }}
                  currency={invoiceCurrency}
                  onCurrencyChange={(curr) => {
                    setInvoiceCurrency(curr);
                    setActionNotice(`واحد پولی به «${curr}» تغییر یافت.`);
                  }}
                  counts={dynamicCounts}
                  onResetFilters={handleResetInvoiceFilters}
                />

                {/* ۳. جدول جامع فاکتورها همراه با نوار صفحه‌بندی نئوبروتال (گام‌های ۳-۴ و ۳-۵) */}
                <InvoicesTable
                  invoices={paginatedInvoices}
                  selectedIds={selectedInvoiceIds}
                  onSelectRow={handleSelectRow}
                  onSelectAll={handleSelectAll}
                  onMarkAsPaid={handleMarkAsPaid}
                  onDeleteInvoice={handleDeleteInvoice}
                  onBulkAction={handleBulkAction}
                  onViewInvoice={(inv) => setActionNotice(`مشاهده جزئیات فاکتور ${inv.id}`)}
                  onEditInvoice={(inv) => setActionNotice(`ویرایش اطلاعات فاکتور ${inv.id}`)}
                  onRefresh={() => {
                    setInvoicesList(INITIAL_INVOICES_DATA);
                    setSelectedInvoiceIds([]);
                    setCurrentPage(1);
                    setActionNotice('داده‌های جدول فاکتورها با موفقیت تازه‌سازی شدند! 🔄');
                  }}
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  totalItems={filteredInvoices.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={(page) => setCurrentPage(page)}
                  onItemsPerPageChange={(count) => {
                    setItemsPerPage(count);
                    setCurrentPage(1);
                  }}
                />

                {/* ۴. داک دسترسی سریع و راهنمای کلیدهای میانبر کیبورد (برگرفته از طرح صنعتی Stitch) */}
                <InvoiceShortcutsDock
                  onNewInvoice={() => setActionNotice('⚡ کلید میانبر [N]: آغاز صدور فاکتور جدید')}
                  onExportLedger={() => setActionNotice('⚡ کلید میانبر [E]: خروجی اکسل و دفتر کل')}
                />

                {/* ۵. کارت گزارش موفقیت و تکمیل ۱۰۰٪ فاز ۳ */}
                <Card variant="default">
                  <CardHeader>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <CardTitle>گام ۳-۵: نوار صفحه‌بندی نئوبروتال و پایان فاز ۳ (InvoicePagination.jsx)</CardTitle>
                        <Badge variant="paid">فاز ۳: ۱۰۰٪ تکمیل شد 🎉</Badge>
                      </div>
                      <Badge variant="live">آماده فاز ۴ (فرم صدور فاکتور)</Badge>
                    </div>
                    <CardDescription>
                      تمام ۵ گام ماژول صورت‌حساب‌ها (Invoices) پیاده‌سازی شدند: لایه‌بندی، کارت‌های آماری، فیلتر پیشرفته، ماتریس داده‌ها با عملیات CRUD و نوار صفحه‌بندی هوشمند.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                        <h4 className="font-black text-xs text-black">۱. ناوبری صفحات قطور</h4>
                        <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                          دکمه‌های صفحات، قبلی و بعدی با استایل چانکی نئوبروتال و اعداد مونو فارسی.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                        <h4 className="font-black text-xs text-black">۲. گزینش تعداد در صفحه</h4>
                        <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                          امکان تغییر سایز صفحه (۵، ۱۰، ۲۰، ۵۰ ردیف) با محاسبه آنی اسلایس داده‌ها.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                        <h4 className="font-black text-xs text-black">۳. شمارنده ردیف‌های فعال</h4>
                        <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                          نمایش زنده تعداد فاکتورهای چک‌باکس‌شده همراه با نشان اصالت بانکی شبا.
                        </p>
                      </div>

                      <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                        <h4 className="font-black text-xs text-black">۴. کلیدهای میانبر کیبورد</h4>
                        <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                          شنود سراسری کلیدهای N (فاکتور نو)، F (فیلتر)، / (سرچ زنده) و E (اکسپورت).
                        </p>
                      </div>
                    </div>

                    <div className="rounded-xl border-2 border-black bg-retro-mint/30 p-4 text-xs font-bold text-black space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="font-black text-emerald-900">🏆 وضعیت کلی نقشه راه پروژه Freelance OS:</span>
                        <span className="font-mono font-black text-black bg-white px-2 py-0.5 rounded border border-black">
                          ۱۵ گام از ۲۵ گام (۶۰٪ کل پروژه)
                        </span>
                      </div>
                      <p>• ✅ فاز ۱: دیزاین سیستم کامل نئوبروتال (۵ از ۵ گام - ۱۰۰٪)</p>
                      <p>• ✅ فاز ۲: پیشخوان و داشبورد اجرایی و KPIها (۵ از ۵ گام - ۱۰۰٪)</p>
                      <p>• ✅ فاز ۳: ماژول جامع فاکتورها، فیلترها، جدول و صفحه‌بندی (۵ از ۵ گام - ۱۰۰٪)</p>
                      <p className="font-black text-black pt-1">
                        • 🎯 مقصد بعدی (فاز ۴): فرم پیشرفته و تعاملی صدور فاکتور با محاسبه مالیات و تخفیف
                      </p>
                    </div>
                  </CardContent>

                  <CardFooter className="justify-between border-t border-neutral-200 pt-4 flex-wrap gap-2">
                    <span className="text-xs font-bold text-neutral-500">
                      پایان موفقیت‌آمیز فاز ۳ • آماده ارائه در نمایشگاه کار مهر ۲۲
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => navigate('/invoices/new')}
                        className="bg-black text-white hover:bg-neutral-800 shadow-retro"
                      >
                        ورود به فاز ۴: صدور فاکتور جدید 🚀
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate('/')}
                      >
                        بازگشت به پیشخوان اصلی ↶
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </InvoicesPage>
            }
          />

          {/* روت ایجاد و صدور فاکتور جدید تعاملی (/invoices/new) - فاز ۴ */}
          <Route
            path="/invoices/new"
            element={
              <CreateInvoicePage
                invoiceNumber="INV-1405-10"
                currency="تومان"
                leftDeck={
                  <div className="space-y-6">
                    {/* ۱. کارت ۱: مشخصات کارفرما و متادیتای صورت‌حساب (گام ۴-۲) */}
                    <InvoiceMetadataCard
                      client={newInvoiceClient}
                      onClientChange={(val) => {
                        setNewInvoiceClient(val);
                        setActionNotice(`کارفرما به «${val}» تغییر یافت.`);
                      }}
                      project={newInvoiceProject}
                      onProjectChange={(val) => {
                        setNewInvoiceProject(val);
                        setActionNotice(`پروژه به «${val}» تغییر یافت.`);
                      }}
                      invoiceId="INV-1405-10"
                      poRef={newInvoicePoRef}
                      onPoRefChange={(val) => {
                        setNewInvoicePoRef(val);
                        setActionNotice(`شماره قرارداد/سفارش به «${val}» تغییر یافت.`);
                      }}
                      issueDate={newInvoiceIssueDate}
                      onIssueDateChange={setNewInvoiceIssueDate}
                      dueDate={newInvoiceDueDate}
                      onDueDateChange={setNewInvoiceDueDate}
                      onNewClientClick={() => {
                        navigate('/clients');
                        setActionNotice('انتقال به بخش ثبت کارفرمای جدید');
                      }}
                    />

                    {/* ۲. کارت پیش‌نمایش گام‌های بعدی و گزارش پیشرفت گام ۴-۲ */}
                    <Card variant="default">
                      <CardHeader>
                        <div className="flex items-center justify-between flex-wrap gap-2">
                          <div className="flex items-center gap-2">
                            <CardTitle>گام ۴-۲: کارت مشخصات کارفرما و متادیتا (InvoiceMetadataCard.jsx)</CardTitle>
                            <Badge variant="paid">گام دوم تکمیل شد ✓</Badge>
                          </div>
                          <Badge variant="live">آماده گام ۴-۳ (جدول آیتم‌ها)</Badge>
                        </div>
                        <CardDescription>
                          کارت ۱ با انتخابگر داینامیک کارفرمایان استودیو، پروژه‌های تعریف‌شده، سریال سیستمی، کد PO و تاریخ‌های شمسی با موفقیت مستقر شد.
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1.5">
                            <span className="w-6 h-6 rounded-md bg-retro-mint border border-black flex items-center justify-center font-black text-xs">
                              ۲
                            </span>
                            <h4 className="font-black text-xs text-black">کارت ۲ (گام بعدی ۴-۳)</h4>
                            <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                              جدول داینامیک خدمات و اقلام، ساعت کارکرد، نرخ ساعتی و محاسبه لحظه‌ای سطرها.
                            </p>
                          </div>

                          <div className="p-4 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1.5">
                            <span className="w-6 h-6 rounded-md bg-retro-lavender border border-black flex items-center justify-center font-black text-xs">
                              ۳
                            </span>
                            <h4 className="font-black text-xs text-black">کارت ۳ (گام ۴-۴)</h4>
                            <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                              یادداشت‌های حقوقی، شرایط تسویه و کارت استعلام شبای بانکی با دکمه کپی.
                            </p>
                          </div>
                        </div>

                        <div className="rounded-xl border-2 border-black bg-retro-yellow/20 p-4 text-xs font-bold text-black space-y-1">
                          <p className="font-black">📌 وضعیت نقشه راه فاز ۴ (سازنده تعاملی فاکتور):</p>
                          <p>• ✅ گام ۴-۱: لایوت دو ستونه، ناوبری بازگشت و اتصال روت /invoices/new</p>
                          <p>• ✅ گام ۴-۲: کارت ۱ - مشخصات کارفرما و متادیتای فاکتور (تکمیل شد)</p>
                          <p>• ⏳ گام ۴-۳ (گام بعدی): کارت ۲ - جدول آیتم‌ها و خدمات قابل فاکتور</p>
                          <p>• ⏳ گام ۴-۴: کارت ۳ - شرایط تسویه و کارت بانکی شبا</p>
                          <p>• ⏳ گام ۴-۵: سایدبار ماشین‌حساب صندوق، تخفیف و مالیات زنده</p>
                        </div>
                      </CardContent>

                      <CardFooter className="justify-between border-t border-neutral-200 pt-4 flex-wrap gap-2">
                        <span className="text-xs font-bold text-neutral-500">
                          پیشرفت فاز ۴: گام ۲ از ۵ تکمیل شد (۴۰٪)
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate('/invoices')}
                        >
                          بازگشت به فهرست فاکتورها ↶
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                }
                rightDeck={
                  <div className="space-y-4">
                    {/* پیش‌نمایش سایدبار صندوق حسابداری زنده */}
                    <div className="bg-white border-2 border-black rounded-2xl shadow-retro overflow-hidden flex flex-col">
                      <div className="bg-black text-white px-4 py-3 border-b-2 border-black flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[10px] tracking-widest text-retro-yellow block font-bold">
                            صندوق حسابداری زنده
                          </span>
                          <h3 className="font-mono text-sm font-black text-white mt-0.5">
                            خلاصه صورت‌حساب
                          </h3>
                        </div>
                        <span className="text-xl">🧾</span>
                      </div>

                      <div className="p-4 space-y-3 text-xs font-bold text-neutral-700">
                        <div className="flex justify-between items-center pb-2 border-b-2 border-dashed border-neutral-300">
                          <span>جمع ناخالص خدمات:</span>
                          <span className="font-mono font-black text-black">۴۵,۰۰۰,۰۰۰ تومان</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b-2 border-dashed border-neutral-300">
                          <span className="text-retro-coral font-black">تخفیف همکاری (۱۰٪):</span>
                          <span className="font-mono font-black text-retro-coral">-۴,۵۰۰,۰۰۰ تومان</span>
                        </div>
                        <div className="flex justify-between items-center pb-2 border-b-2 border-dashed border-neutral-300">
                          <span className="text-emerald-700">مالیات بر ارزش افزوده (۱۰٪):</span>
                          <span className="font-mono font-black text-emerald-800">+۴,۰۵۰,۰۰۰ تومان</span>
                        </div>

                        <div className="bg-retro-yellow p-3 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] space-y-0.5">
                          <span className="text-[10px] font-black text-black block">مبلغ نهایی قابل پرداخت:</span>
                          <span className="font-mono text-xl font-black text-black block">۴۴,۵۵۰,۰۰۰ تومان</span>
                        </div>

                        <Button
                          variant="default"
                          size="default"
                          className="w-full shadow-retro justify-center font-black mt-2 bg-black text-white hover:bg-neutral-800"
                          onClick={() => setActionNotice('در گام‌های بعدی، این دکمه فاکتور را در استیت ثبت می‌کند.')}
                        >
                          💾 ذخیره و صدور فاکتور رسمی
                        </Button>
                      </div>
                    </div>

                    <div className="bg-white border-2 border-black rounded-xl p-3 shadow-retro-sm flex items-center justify-between">
                      <div>
                        <span className="font-mono text-[10px] text-neutral-500 font-bold block">شاخص کارفرما</span>
                        <span className="font-black text-xs text-black">دیجی‌کالا: ۱۰۰٪ خوش‌حساب</span>
                      </div>
                      <span className="w-7 h-7 rounded-full bg-retro-mint border border-black flex items-center justify-center text-xs font-black">
                        ✓
                      </span>
                    </div>
                  </div>
                }
              />
            }
          />

          {/* روت مشتریان (/clients) */}
          <Route
            path="/clients"
            element={
              <Card variant="default">
                <CardHeader>
                  <CardTitle>بخش مشتریان (/clients)</CardTitle>
                  <CardDescription>
                    ماژول مدیریت کارفرمایان و باشگاه مشتریان استودیو (در فاز ۵ تکمیل خواهد شد).
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-bold text-neutral-600">
                    این مسیر با React Router فعال است. می‌توانید به پیشخوان یا فاکتورها برگردید.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="default" onClick={() => navigate('/invoices')}>
                    مشاهده فاکتورها (/invoices)
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => navigate('/')}>
                    پیشخوان اصلی (/)
                  </Button>
                </CardFooter>
              </Card>
            }
          />

          {/* روت پروژه‌ها (/projects) */}
          <Route
            path="/projects"
            element={
              <Card variant="default">
                <CardHeader>
                  <CardTitle>بخش پروژه‌ها (/projects)</CardTitle>
                  <CardDescription>
                    پایپ‌لاین اسپرینت‌ها و ددلاین‌های تحویل استودیو.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-bold text-neutral-600">
                    ویجت خلاصه پروژه‌های فعال در پیشخوان اصلی قرار دارد.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="default" onClick={() => navigate('/')}>
                    مشاهده پیشخوان (/)
                  </Button>
                </CardFooter>
              </Card>
            }
          />

          {/* روت گزارشات (/reports) */}
          <Route
            path="/reports"
            element={
              <Card variant="default">
                <CardHeader>
                  <CardTitle>بخش گزارشات (/reports)</CardTitle>
                  <CardDescription>
                    آنالیز مالی، رشد فصلی و گزارشات ارزش افزوده.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-xs font-bold text-neutral-600">
                    کارت‌های شاخص عملکرد زنده در پیشخوان فعال هستند.
                  </p>
                </CardContent>
                <CardFooter className="gap-2">
                  <Button size="sm" variant="default" onClick={() => navigate('/')}>
                    مشاهده پیشخوان (/)
                  </Button>
                </CardFooter>
              </Card>
            }
          />

          {/* هر مسیر تعریف‌نشده به پیشخوان هدایت می‌شود */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
