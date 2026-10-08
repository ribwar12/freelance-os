import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroBanner } from './components/dashboard/HeroBanner';
import { MetricCards } from './components/dashboard/MetricCards';
import { RecentInvoices } from './components/dashboard/RecentInvoices';
import { ActiveProjects, StatusTicker } from './components/dashboard/ActiveProjects';
import { InvoicesPage } from './components/invoices/InvoicesPage';
import { InvoiceSummaryStrip } from './components/invoices/InvoiceSummaryStrip';
import { InvoiceFilters } from './components/invoices/InvoiceFilters';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/Card';
import { Badge } from './components/ui/Badge';

export default function App() {
  const [activeTab, setActiveTab] = useState('invoices'); // نمایش مستقیم گام‌های فاز ۳
  const [period, setPeriod] = useState('current_month');
  const [actionNotice, setActionNotice] = useState('');

  // استیت‌های فیلتر و جستجوی فاکتورها (گام ۳-۳)
  const [invoiceStatus, setInvoiceStatus] = useState('all');
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [invoiceClient, setInvoiceClient] = useState('all');
  const [invoiceDateRange, setInvoiceDateRange] = useState('1405_all');
  const [invoiceCurrency, setInvoiceCurrency] = useState('TOM');

  const handleResetInvoiceFilters = () => {
    setInvoiceStatus('all');
    setInvoiceSearch('');
    setInvoiceClient('all');
    setInvoiceDateRange('1405_all');
    setActionNotice('تمام فیلترهای صفحه فاکتورها بازنشانی شدند.');
  };

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActionNotice(`انتقال به بخش «${getTabName(tabId)}» انجام شد.`);
  };

  const getTabName = (id) => {
    const map = {
      dashboard: 'پیشخوان',
      invoices: 'فاکتورها',
      clients: 'مشتریان',
      projects: 'پروژه‌ها',
      reports: 'گزارشات',
    };
    return map[id] || id;
  };

  const getPeriodLabel = (val) => {
    const map = {
      current_month: 'این ماه (مهر ۱۴۰۵)',
      last_month: 'ماه قبل (شهریور ۱۴۰۵)',
      quarter: 'فصل جاری (پاییز ۱۴۰۵)',
      year: 'سال مالی ۱۴۰۵',
    };
    return map[val] || val;
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
      {/* کامپوننت نوبار سراسری (فاز ۲ گام ۱) با پشتیبانی کامل از سوئیچ تب‌ها */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onNewInvoice={() => setActionNotice('کلیک روی «صدور فاکتور جدید» از نوبار (فاز ۴)')}
        onNewClient={() => setActionNotice('کلیک روی «مشتری جدید» از نوبار (فاز ۵)')}
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

        {/* ===================== ۱. صفحه فاکتورها (فاز ۳) ===================== */}
        {activeTab === 'invoices' && (
          <InvoicesPage
            onNewInvoice={() => setActionNotice('کلیک روی «صدور فاکتور جدید» از هدر فاکتورها (فاز ۴)')}
            onExportCSV={() => setActionNotice('درخواست استخراج خروجی CSV / گزارش مالی')}
          >
            {/* ۱. نوار کارت‌های ۳گانه خلاصه مالی فاکتورها (گام ۳-۲) */}
            <InvoiceSummaryStrip />

            {/* ۲. جعبه‌ابزار کنترل، فیلتر وضعیت و جستجوی پیشرفته (گام ۳-۳) */}
            <InvoiceFilters
              statusFilter={invoiceStatus}
              onStatusChange={(status) => {
                setInvoiceStatus(status);
                setActionNotice(`فیلتر وضعیت روی «${status}» تنظیم شد.`);
              }}
              searchQuery={invoiceSearch}
              onSearchChange={(q) => setInvoiceSearch(q)}
              selectedClient={invoiceClient}
              onClientChange={(client) => {
                setInvoiceClient(client);
                setActionNotice(`فیلتر کارفرما روی «${client}» تنظیم شد.`);
              }}
              selectedDateRange={invoiceDateRange}
              onDateRangeChange={(range) => {
                setInvoiceDateRange(range);
                setActionNotice(`بازه زمانی روی «${range}» تنظیم شد.`);
              }}
              currency={invoiceCurrency}
              onCurrencyChange={(curr) => {
                setInvoiceCurrency(curr);
                setActionNotice(`واحد پولی به «${curr}» تغییر یافت.`);
              }}
              onResetFilters={handleResetInvoiceFilters}
            />

            {/* ۳. کارت گزارش پیشرفت گام ۳-۳ */}
            <Card variant="default">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <CardTitle>گام ۳-۳: کنترل‌پنل فیلتر و جستجوی پیشرفته (InvoiceFilters.jsx)</CardTitle>
                    <Badge variant="live">فاز ۳: گام سوم</Badge>
                  </div>
                  <Badge variant="paid">تکمیل شد ✓</Badge>
                </div>
                <CardDescription>
                  کنترل‌پنل فیلتر وضعیت کپسولی، اینپوت جستجوی متنی زنده با میانبر، دراپ‌داون کارفرمایان، سوئیچ ارز و دکمه پاکسازی.
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                    <h4 className="font-black text-xs text-black">۱. کپسول‌های وضعیت (Pills)</h4>
                    <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                      فیلتر سریع بر اساس همه (۴۲)، در انتظار (۵)، پرداخت شده (۳۴)، معوقه (۲) و پیش‌نویس (۱).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                    <h4 className="font-black text-xs text-black">۲. جستجوی متنی زنده</h4>
                    <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                      اینپوت با میانبر Ctrl+K برای جستجوی فوری نام شرکت، کد فاکتور یا پروژه.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                    <h4 className="font-black text-xs text-black">۳. فیلترهای کشویی</h4>
                    <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                      انتخاب دوره مالی و فیلتر سازمان کارفرما (اسنپ‌پی، دیجی‌کالا، بازار و...).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                    <h4 className="font-black text-xs text-black">۴. سوئیچ ارز و ریست</h4>
                    <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                      تبدیل بین تومان، دلار و یورو به همراه دکمه پاکسازی سریع فیلترها.
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border-2 border-black bg-retro-mint/30 p-4 text-xs font-bold text-black space-y-1 shadow-retro-sm">
                  <p className="font-black">📌 مقادیر کنونی فیلترها در استیت (Live State):</p>
                  <p>• وضعیت فعال: <span className="bg-white px-2 py-0.5 rounded border border-black font-mono font-black">{invoiceStatus}</span> | عبارت جستجو: <span className="bg-white px-2 py-0.5 rounded border border-black font-black">{invoiceSearch || '(خالی)'}</span> | کارفرما: <span className="bg-white px-2 py-0.5 rounded border border-black font-mono font-black">{invoiceClient}</span> | ارز: <span className="bg-white px-2 py-0.5 rounded border border-black font-mono font-black">{invoiceCurrency}</span></p>
                  <p>• گام بعدی (۳-۴): ساخت جدول کامل فاکتورها (InvoicesTable.jsx) با قابلیت چک‌باکس انتخاب دسته‌جمعی و ستون‌های مرتب‌سازی.</p>
                </div>
              </CardContent>

              <CardFooter className="justify-between border-t border-neutral-200 pt-4 flex-wrap gap-2">
                <span className="text-xs font-bold text-neutral-500">
                  پیشرفت فاز ۳: گام ۳ از ۵ تکمیل شد (۶۰٪)
                </span>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTabChange('dashboard')}
                  >
                    مشاهده پیشخوان اصلی ↶
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </InvoicesPage>
        )}

        {/* ===================== ۲. صفحه پیشخوان جامع (فاز ۲) ===================== */}
        {activeTab === 'dashboard' && (
          <>
            {/* بنر خوش‌آمدگویی داشبورد (گام ۲-۲) */}
            <HeroBanner
              userName="الکس مرادی"
              sprintLabel="اسپرینت مهر ۱۴۰۵"
              selectedPeriod={period}
              onPeriodChange={(newPeriod) => {
                setPeriod(newPeriod);
                setActionNotice(`بازه زمانی گزارشات به «${getPeriodLabel(newPeriod)}» تغییر یافت.`);
              }}
              onNewInvoice={() => {
                setActionNotice('کلیک روی «صدور فاکتور جدید» از بنر هیرو!');
              }}
            />

            {/* کارت‌های ۴گانه شاخص عملکرد مالی و کاری (گام ۲-۳) */}
            <MetricCards metrics={metricsDataByPeriod[period]} />

            {/* لایه گرید اصلی داشبورد ۸/۴ ستونی */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
              <div className="lg:col-span-8">
                <RecentInvoices
                  totalCount={42}
                  onCreateInvoice={() => setActionNotice('کلیک روی «ایجاد فاکتور» از جدول فاکتورها (فاز ۴)')}
                  onViewAll={() => handleTabChange('invoices')}
                  onViewInvoice={(id) => setActionNotice(`مشاهده جزئیات فاکتور ${id} (فاز ۳)`)}
                />
              </div>

              <div className="lg:col-span-4">
                <ActiveProjects
                  onNewProject={() => setActionNotice('کلیک روی «شروع پروژه جدید» (فاز آینده)')}
                />
              </div>
            </section>

            {/* نوار وضعیت سیستم پایین داشبورد (گام ۲-۵) */}
            <StatusTicker />
          </>
        )}

        {/* ===================== ۳. سایر تب‌ها (مشتریان، پروژه‌ها، گزارشات) ===================== */}
        {activeTab !== 'dashboard' && activeTab !== 'invoices' && (
          <Card variant="default">
            <CardHeader>
              <CardTitle>بخش {getTabName(activeTab)}</CardTitle>
              <CardDescription>
                این ماژول در فازهای بعدی توسعه داده خواهد شد.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs font-bold text-neutral-600">
                در حال حاضر فاز ۱ (دیزاین سیستم) و فاز ۲ (پیشخوان) کامل شده‌اند و فاز ۳ (فهرست فاکتورها) در جریان است.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm" variant="default" onClick={() => handleTabChange('invoices')}>
                مشاهده صفحه فاکتورها (فاز ۳)
              </Button>
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  );
}
