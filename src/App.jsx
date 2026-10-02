import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Button } from './components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './components/ui/Card';
import { Badge } from './components/ui/Badge';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
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

  return (
    <div className="min-h-screen bg-canvas font-sans" dir="rtl">
      {/* کامپوننت نوبار سراسری (گام ۲-۱) */}
      <Navbar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onNewInvoice={() => setActionNotice('کلیک روی «صدور فاکتور جدید» (پیاده‌سازی در فاز ۴)')}
        onNewClient={() => setActionNotice('کلیک روی «مشتری جدید» (پیاده‌سازی در فاز ۵)')}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* اعلان اکشن تعاملی */}
        {actionNotice && (
          <div className="rounded-xl border-2 border-black bg-retro-mint p-3 text-xs md:text-sm font-black text-black shadow-retro-sm flex items-center justify-between">
            <span>⚡ رویداد تعاملی دریافتی از نوبار: {actionNotice}</span>
            <button
              onClick={() => setActionNotice('')}
              className="text-black font-bold hover:underline px-2 cursor-pointer"
            >
              بستن ×
            </button>
          </div>
        )}

        {/* کارت معرفی گام ۲-۱ */}
        <Card variant="default">
          <CardHeader>
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <CardTitle>گام ۲-۱: هدر و ناوبری سراسری (Navbar.jsx)</CardTitle>
                <Badge variant="live">فاز ۲: گام اول</Badge>
              </div>
              <Badge variant="paid">تکمیل شد ✓</Badge>
            </div>
            <CardDescription>
              طراحی و اتصال نوار ناوبری ریسپانسیو با استایل نئوبروتال، پشتیبانی از راست‌چین (RTL) و جاوااسکریپت خالص.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-2">
                <h4 className="font-black text-sm text-black">۱. لوگوی برند و هویت بصری</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  باکس زرد نئوبروتال با بردر مشکی ۲ پیکسلی و تایپوگرافی مونو، نمایشگر نام برند FreelanceOS.
                </p>
              </div>
              <div className="p-4 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-2">
                <h4 className="font-black text-sm text-black">۲. تب‌های ناوبری ماژول‌ها</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  تب‌های پیشخوان، فاکتورها، مشتریان و پروژه‌ها با قابلیت انتخاب و استیت اکتیو زرد رنگ.
                </p>
              </div>
              <div className="p-4 rounded-xl border-2 border-black bg-white shadow-retro-sm space-y-2">
                <h4 className="font-black text-sm text-black">۳. دکمه‌های اکشن و پروفایل</h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  دکمه‌های اقدام سریع جهت صدور فاکتور و ایجاد مشتری به همراه آواتار و برچسب نقش کاربر.
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-black bg-retro-yellow/20 p-4 text-xs font-bold text-black space-y-1">
              <p className="font-black">📌 وضعیت فعلی سیستم:</p>
              <p>تب فعال فعلی: <span className="bg-retro-yellow px-2 py-0.5 rounded border border-black font-black">{getTabName(activeTab)}</span></p>
              <p>آماده برای گام بعدی (۲-۲): ساخت بنر خوش‌آمدگویی داشبورد (HeroBanner.jsx).</p>
            </div>
          </CardContent>

          <CardFooter className="justify-between border-t border-neutral-200 pt-4">
            <span className="text-xs font-bold text-neutral-500">
              گام ۱ از ۵ در فاز ۲ (طراحی داشبورد جامع)
            </span>
            <Button
              variant="default"
              onClick={() => handleTabChange(activeTab === 'dashboard' ? 'invoices' : 'dashboard')}
            >
              تغییر تب تستی ⟳
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
}
