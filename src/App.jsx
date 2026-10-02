import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroBanner } from './components/dashboard/HeroBanner';
import { MetricCards } from './components/dashboard/MetricCards';
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

        {/* ۳. کارت معرفی و پیشرفت گام ۲-۳ */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CardTitle>گام ۲-۳: کارت‌های ۴گانه شاخص کلیدی عملکرد (MetricCards.jsx)</CardTitle>
                <Badge variant="live">فاز ۲: گام سوم</Badge>
              </div>
              <Badge variant="paid">تکمیل شد ✓</Badge>
            </div>
            <CardDescription>
              چهار کارت با پالت ۴گانه نئوبروتال (نعنایی، زرد، بنفش، صورتی)، سایه سخت ۴ پیکسلی، اعداد مونو و اتصال زنده به فیلتر ماه.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-3.5 rounded-xl border-2 border-black bg-retro-mint shadow-retro-sm space-y-1">
                <h4 className="font-black text-xs text-black">۱. درآمد کل (Mint)</h4>
                <p className="text-[11px] text-black/80 font-bold leading-relaxed">
                  مجموع واریزی‌های قطعی، درصد رشد فصلی و تعداد فاکتورهای تسویه‌شده.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-black bg-retro-yellow shadow-retro-sm space-y-1">
                <h4 className="font-black text-xs text-black">۲. در انتظار وصول (Yellow)</h4>
                <p className="text-[11px] text-black/80 font-bold leading-relaxed">
                  مبالغ سررسید شده که نیاز به پیگیری دارند و تعداد فاکتورهای باز.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-black bg-retro-lavender shadow-retro-sm space-y-1">
                <h4 className="font-black text-xs text-black">۳. پروژه‌ها (Lavender)</h4>
                <p className="text-[11px] text-black/80 font-bold leading-relaxed">
                  پایپ‌لاین کارهای در حال انجام و ددلاین‌های تحویل هفته استودیو.
                </p>
              </div>
              <div className="p-3.5 rounded-xl border-2 border-black bg-retro-coral shadow-retro-sm space-y-1">
                <h4 className="font-black text-xs text-black">۴. مشتریان (Coral)</h4>
                <p className="text-[11px] text-black/80 font-bold leading-relaxed">
                  تعداد کارفرمایان فعال، کارفرمایان جدید و نوع قراردادها.
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-black bg-white p-4 text-xs font-bold text-black space-y-1 shadow-retro-sm">
              <p className="font-black">📌 تعامل زنده پیاده‌سازی شده:</p>
              <p>• اگر از منوی بالا دوره زمانی را تغییر دهی، هر ۴ کارت به صورت آنی اعداد مربوط به همان بازه را نشان می‌دهند!</p>
              <p>• گام بعدی (۲-۴): ساخت جدول آخرین فاکتورها (Recent Invoices Table) با برچسب‌های وضعیت، مبالغ به تومان و ردیف‌های تعاملی.</p>
            </div>
          </CardContent>

          <CardFooter className="justify-between border-t border-neutral-200 pt-4">
            <span className="text-xs font-bold text-neutral-500">
              پیشرفت فاز ۲: گام ۳ از ۵ تکمیل شد (۶۰٪)
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPeriod('quarter')}
              >
                تست فصل جاری
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => setPeriod('current_month')}
              >
                تست ماه جاری
              </Button>
            </div>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
