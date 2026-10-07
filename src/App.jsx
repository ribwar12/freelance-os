import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroBanner } from './components/dashboard/HeroBanner';
import { MetricCards } from './components/dashboard/MetricCards';
import { RecentInvoices } from './components/dashboard/RecentInvoices';
import { ActiveProjects, StatusTicker } from './components/dashboard/ActiveProjects';
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

        {/* ۳. لایه گرید اصلی داشبورد ۸/۴ ستونی (طبق دیزاین استیچ) */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
          {/* ۸ ستون سمت راست: جدول آخرین فاکتورها (گام ۲-۴) */}
          <div className="lg:col-span-8">
            <RecentInvoices
              totalCount={42}
              onCreateInvoice={() => setActionNotice('کلیک روی «ایجاد فاکتور» از جدول فاکتورها (فاز ۴)')}
              onViewAll={() => setActionNotice('کلیک روی «مشاهده تمام فاکتورها» (فاز ۳)')}
              onViewInvoice={(id) => setActionNotice(`مشاهده جزئیات فاکتور ${id} (فاز ۳)`)}
            />
          </div>

          {/* ۴ ستون سمت چپ: ویجت پروژه‌های فعال (گام ۲-۵) */}
          <div className="lg:col-span-4">
            <ActiveProjects
              onNewProject={() => setActionNotice('کلیک روی «شروع پروژه جدید» (فاز آینده)')}
            />
          </div>
        </section>

        {/* ۴. نوار وضعیت سیستم پایین داشبورد (گام ۲-۵) */}
        <StatusTicker />

        {/* ۵. کارت جشن تکمیل فاز ۲ 🎉 */}
        <Card variant="mint">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CardTitle>🏆 فاز ۲ کاملاً تکمیل شد!</CardTitle>
                <Badge variant="paid">۱۰۰٪ ✓</Badge>
              </div>
              <Badge variant="live">آماده برای فاز ۳</Badge>
            </div>
            <CardDescription>
              تمام ۵ گام فاز ۲ (طراحی پیشخوان جامع فریلنسر) با موفقیت پیاده‌سازی و تست شدند.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="rounded-xl border-2 border-black bg-white p-4 text-xs font-bold text-black space-y-1 shadow-retro-sm">
              <p className="font-black">📌 چک‌لیست نهایی فاز ۲:</p>
              <p>• ✅ گام ۲-۱: هدر ناوبری سراسری (Navbar.jsx)</p>
              <p>• ✅ گام ۲-۲: بنر خوش‌آمدگویی و تولبار (HeroBanner.jsx)</p>
              <p>• ✅ گام ۲-۳: کارت‌های ۴گانه شاخص عملکرد (MetricCards.jsx)</p>
              <p>• ✅ گام ۲-۴: جدول آخرین فاکتورها (RecentInvoices.jsx)</p>
              <p>• ✅ گام ۲-۵: ویجت پروژه‌ها و نوار وضعیت (ActiveProjects.jsx)</p>
            </div>

            <div className="rounded-xl border-2 border-black bg-retro-yellow/20 p-4 text-xs font-bold text-black space-y-1">
              <p className="font-black">🚀 نقشه راه فاز ۳ (صفحه فهرست و فیلتر فاکتورها):</p>
              <p>• گام ۳-۱: لایه‌بندی صفحه مستقل فاکتورها و سیستم ناوبری بین صفحات</p>
              <p>• گام ۳-۲: هدر صفحه فاکتورها با فیلترهای وضعیت و جستجو</p>
              <p>• گام ۳-۳: جدول جامع فاکتورها با صفحه‌بندی (Pagination)</p>
              <p>• گام ۳-۴: مودال جزئیات فاکتور (Invoice Detail Modal)</p>
              <p>• گام ۳-۵: عملیات دسته‌جمعی و خروجی CSV/PDF</p>
            </div>
          </CardContent>

          <CardFooter className="justify-between border-t border-neutral-200 pt-4">
            <span className="text-xs font-bold text-neutral-500">
              پیشرفت کل پروژه: فاز ۲ از ۵ تکمیل شد (۴۰٪)
            </span>
            <Badge variant="default">در انتظار شروع فاز ۳</Badge>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
