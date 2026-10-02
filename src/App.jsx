import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { HeroBanner } from './components/dashboard/HeroBanner';
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

        {/* کامپوننت بنر خوش‌آمدگویی و تولبار کنترل (گام ۲-۲) */}
        <HeroBanner
          userName="الکس مرادی"
          sprintLabel="اسپرینت مهر ۱۴۰۵"
          selectedPeriod={period}
          onPeriodChange={(newPeriod) => {
            setPeriod(newPeriod);
            setActionNotice(`بازه زمانی گزارشات به «${getPeriodLabel(newPeriod)}» تغییر یافت.`);
          }}
          onNewInvoice={() => {
            setActionNotice('کلیک روی «صدور فاکتور جدید» از بنر هیرو داشبورد!');
          }}
        />

        {/* کارت معرفی و گزارش گام ۲-۲ */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CardTitle>گام ۲-۲: بنر خوش‌آمدگویی داشبورد (HeroBanner.jsx)</CardTitle>
                <Badge variant="live">فاز ۲: گام دوم</Badge>
              </div>
              <Badge variant="paid">تکمیل شد ✓</Badge>
            </div>
            <CardDescription>
              طراحی و اتصال بنر بالای پیشخوان به سبک استیچ با تایپوگرافی فارسی، انیمیشن بانس، نشان اسپرینت و سلکتور زمانی.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-2">
                <h4 className="font-black text-sm text-black">۱. تایپوگرافی و تبریک شخصی‌سازی‌شده</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  تیتر پرانرژی بولد با ایموجی جرقه ⚡ (همراه انیمیشن بانس) و متن راهنمای سلامت مالی استودیو.
                </p>
              </div>
              <div className="p-4 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-2">
                <h4 className="font-black text-sm text-black">۲. نشان اسپرینت فعال (Sprint Badge)</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  کپسول فونت مونو با پس‌زمینه زرد الکتریک و بردر ۲ پیکسلی که نام دوره کاری جاری را نشان می‌دهد.
                </p>
              </div>
              <div className="p-4 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-2">
                <h4 className="font-black text-sm text-black">۳. فیلتر بازه زمانی و دکمه CTA</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  منوی دراپ‌داون استایل نئوبروتال برای سوئیچ دوره‌های مالی به همراه دکمه برجسته صدور فاکتور جدید.
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-black bg-retro-mint/30 p-4 text-xs font-bold text-black space-y-1">
              <p className="font-black">📌 مقادیر کنونی استیت (Live State):</p>
              <p>• دوره مالی انتخاب‌شده: <span className="bg-white px-2 py-0.5 rounded border border-black font-black">{getPeriodLabel(period)}</span></p>
              <p>• تب فعال در نوبار: <span className="bg-white px-2 py-0.5 rounded border border-black font-black">{getTabName(activeTab)}</span></p>
              <p>• گام بعدی (۲-۳): ساخت ۴ کارت شاخص کلیدی عملکرد (KPI Metric Cards) با رنگ‌های ۴گانه رترو.</p>
            </div>
          </CardContent>

          <CardFooter className="justify-between border-t border-neutral-200 pt-4">
            <span className="text-xs font-bold text-neutral-500">
              پیشرفت فاز ۲: گام ۲ از ۵ تکمیل شد
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const periods = ['current_month', 'last_month', 'quarter', 'year'];
                const next = periods[(periods.indexOf(period) + 1) % periods.length];
                setPeriod(next);
                setActionNotice(`بازه زمانی به صورت تستی به «${getPeriodLabel(next)}» تغییر یافت.`);
              }}
            >
              تغییر دوره به عنوان تست ⟳
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
