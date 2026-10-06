import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroBanner } from './components/dashboard/HeroBanner';
import { MetricCards } from './components/dashboard/MetricCards';
import { RecentInvoices } from './components/dashboard/RecentInvoices';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/Card';
import { Badge } from './components/ui/Badge';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [period, setPeriod] = useState('current_month');
  const [actionNotice, setActionNotice] = useState('');

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setActionNotice(`تب «${getTabName(tabId)}» انتخاب شد.`);
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
      {/* کامپوننت نوبار سراسری (گام ۲-۱) */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onNewInvoice={() => setActionNotice('کلیک روی «صدور فاکتور جدید» از نوبار (فاز ۴)')}
        onNewClient={() => setActionNotice('کلیک روی «مشتری جدید» از نوبار (فاز ۵)')}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* اعلان اکشن تعاملی */}
        {actionNotice && (
          <div className="rounded-xl border-2 border-black bg-retro-mint p-3 text-xs md:text-sm font-black text-black shadow-retro-sm flex items-center justify-between">
            <span>⚡ رویداد دریافتی: {actionNotice}</span>
            <button
              onClick={() => setActionNotice('')}
              className="text-black font-bold hover:underline px-2 cursor-pointer"
            >
              بستن ×
            </button>
          </div>
        )}

        {/* ۱. بنر خوش‌آمدگویی داشبورد (گام ۲-۲) */}
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

        {/* ۲. کارت‌های ۴گانه شاخص عملکرد مالی و کاری (گام ۲-۳) */}
        <MetricCards metrics={metricsDataByPeriod[period]} />

        {/* ۳. جدول آخرین فاکتورها (گام ۲-۴) */}
        <RecentInvoices
          totalCount={42}
          onCreateInvoice={() => setActionNotice('کلیک روی «ایجاد فاکتور» از جدول فاکتورها (فاز ۴)')}
          onViewAll={() => setActionNotice('کلیک روی «مشاهده تمام فاکتورها» (فاز ۳)')}
          onViewInvoice={(id) => setActionNotice(`مشاهده جزئیات فاکتور ${id} (فاز ۳)`)}
        />

        {/* ۴. کارت معرفی و پیشرفت گام ۲-۴ */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CardTitle>گام ۲-۴: جدول آخرین فاکتورها (RecentInvoices.jsx)</CardTitle>
                <Badge variant="live">فاز ۲: گام چهارم</Badge>
              </div>
              <Badge variant="paid">تکمیل شد ✓</Badge>
            </div>
            <CardDescription>
              جدول نئوبروتال با ۶ ستون فارسی، ۵ ردیف داده نمونه، برچسب‌های رنگی وضعیت، مبالغ مونو و دکمه‌های عملیات.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                <h4 className="font-black text-xs text-black">۱. هدر جدول با نشان «زنده»</h4>
                <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                  عنوان فارسی «آخرین فاکتورها»، تگ زنده (LIVE) و لینک تعاملی ایجاد فاکتور.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                <h4 className="font-black text-xs text-black">۲. ردیف‌های تعاملی فارسی</h4>
                <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                  ۵ فاکتور نمونه با نام‌های شرکت‌ها و استارتاپ‌های ایرانی، مبالغ تومانی و تاریخ شمسی.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-1">
                <h4 className="font-black text-xs text-black">۳. دکمه‌های عملیات هوشمند</h4>
                <p className="text-[11px] text-neutral-600 font-bold leading-relaxed">
                  بسته به وضعیت هر فاکتور دکمه‌های متفاوتی نمایش داده می‌شود (مشاهده، دانلود، یادآوری، ویرایش).
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-black bg-white p-4 text-xs font-bold text-black space-y-1 shadow-retro-sm">
              <p className="font-black">📌 وضعیت تکمیل فاز ۲:</p>
              <p>• ✅ گام ۲-۱: هدر ناوبری (Navbar.jsx)</p>
              <p>• ✅ گام ۲-۲: بنر خوش‌آمدگویی (HeroBanner.jsx)</p>
              <p>• ✅ گام ۲-۳: کارت‌های KPI (MetricCards.jsx)</p>
              <p>• ✅ گام ۲-۴: جدول فاکتورها (RecentInvoices.jsx)</p>
              <p>• ⏳ گام ۲-۵: ویجت پروژه‌های فعال و نوار وضعیت (ActiveProjects.jsx)</p>
            </div>
          </CardContent>

          <CardFooter className="justify-between border-t border-neutral-200 pt-4">
            <span className="text-xs font-bold text-neutral-500">
              پیشرفت فاز ۲: گام ۴ از ۵ تکمیل شد (۸۰٪)
            </span>
            <Badge variant="pending">در انتظار گام ۲-۵</Badge>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
