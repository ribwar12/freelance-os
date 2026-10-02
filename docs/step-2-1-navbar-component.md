# 📘 درس ۲-۱: ساخت هدر سراسری و منوی ناوبری نئوبروتال (Navbar.jsx)

<div dir="rtl">

سلام! خوش آمدی به **فاز ۲: طراحی پیشخوان جامع فریلنسر (Dashboard Overview)**.  
در این گام، اولین المان کلان و اساسی سایت یعنی **هدر ناوبری سراسری (`Navbar.jsx`)** را با جاوااسکریپت خالص (`.jsx`) ساختیم و به برنامه متصل کردیم.

---

### ۱. نقش نوبار در این پروژه چیست؟
نوار ناوبری بالاترین قسمت برنامه است که در تمام صفحات ثابت (Sticky) می‌ماند. این هدر ۴ وظیفه اصلی دارد:
1. **هویت و لوگو برند:** نمایش نماد زرد رنگ `FL` و عنوان برند `FreelanceOS`.
2. **سوئیچ بین بخش‌های مختلف:** تب‌های دسترسی سریع به «پیشخوان»، «فاکتورها»، «مشتریان»، «پروژه‌ها» و «گزارشات».
3. **دکمه‌های اقدام سریع (Call to Action):** دو دکمه آماده به کار `+ صدور فاکتور جدید` و `+ مشتری جدید` که در مراحل بعد پاپ‌آپ‌های فرم را باز می‌کنند.
4. **پروفایل کاربری:** نمایش نام کاربر، تگ «مدیر سیستم» و آواتار نئوبروتال.

---

### ۲. ساختار کد کامپوننت (`src/components/layout/Navbar.jsx`)

```jsx
import React from 'react';
import { Button } from '../ui/Button';

export function Navbar({ activeTab = 'dashboard', onTabChange, onNewInvoice, onNewClient }) {
  // لیست تب‌های برنامه
  const navItems = [
    { id: 'dashboard', label: 'پیشخوان' },
    { id: 'invoices', label: 'فاکتورها' },
    { id: 'clients', label: 'مشتریان' },
    { id: 'projects', label: 'پروژه‌ها' },
    { id: 'reports', label: 'گزارشات' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-white shadow-retro-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-18 py-3 flex items-center justify-between gap-4">
        
        {/* بخش راست: لوگو و تب‌های اصلی */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="h-10 w-10 rounded-xl bg-retro-yellow border-2 border-black flex items-center justify-center font-black text-sm shadow-retro-sm">
              FL
            </div>
            <span className="font-black text-lg md:text-xl tracking-tight text-black font-mono">
              Freelance<span className="bg-retro-yellow px-1 rounded border border-black">OS</span>
            </span>
          </div>

          {/* تب‌ها با قابلیت انتخاب پویا */}
          <nav className="hidden md:flex items-center gap-1.5 mr-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange && onTabChange(item.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-black border-2 border-black transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-retro-yellow text-black shadow-retro-sm'
                    : 'bg-white text-black hover:bg-neutral-100 shadow-none'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* بخش چپ: دکمه‌های اکشن و کپسول کاربر */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={onNewClient}
          >
            + مشتری جدید
          </Button>

          <Button
            variant="default"
            size="sm"
            className="shadow-retro"
            onClick={onNewInvoice}
          >
            + صدور فاکتور جدید
          </Button>

          {/* کپسول مشخصات کاربر جاری */}
          <div className="hidden lg:flex items-center gap-2 rounded-xl border-2 border-black bg-white px-2.5 py-1 shadow-retro-sm select-none">
            <div className="h-7 w-7 rounded-lg bg-retro-mint border border-black flex items-center justify-center font-black text-xs">
              ک
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-black leading-tight text-black">
                الکس مرادی
              </span>
              <span className="text-[9px] font-mono font-bold text-emerald-700 tracking-wider">
                مدیر سیستم
              </span>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
}

export default Navbar;
```

---

### ۳. نکات آموزشی و فنی این گام:
1. **استفاده مجدد از کامپوننت دکمه (`Button.jsx`):** دکمه‌های «صدور فاکتور» و «مشتری جدید» مستقیماً از کامپوننت پایه‌ای که در فاز ۱ ساختیم تغذیه می‌شوند؛ به همین خاطر تمام افکت‌های فشردگی کلیک و سایه‌های نئوبروتال را به همراه دارند.
2. **پشتیبانی از راست‌چین (RTL):** تمامی چینش‌ها با استاندارد فارسی و راست‌چین تنظیم شده است؛ لوگو در سمت راست و دکمه‌های اقدام و پروفایل در سمت چپ قرار دارند.
3. **ریسپانسیو بودن (Responsive):** در نمایشگرهای موبایل، تب‌ها و جزئیات پروفایل برای تمیز ماندن صفحه مخفی شده و فضای کافی برای لوگو و دکمه اصلی ایجاد می‌شود.
4. **تعامل کامل با `useState` در `App.jsx`:** تب انتخاب‌شده با رنگ زرد بولد مشخص می‌شود و با هر کلیک، رویداد تغییر وضعیت به کامپوننت والد ارسال می‌شود.

---

### ۴. تست بیلد و پایداری:
دستور `npm run build` با خروجی ۱۰۰٪ موفق و زمان ۱.۱ ثانیه اجرا شد.

---

### ۵. گام بعدی چیست؟
در **گام ۲-۲** به سراغ ساخت **بنر خوش‌آمدگویی بالای داشبورد (`HeroBanner.jsx`)** می‌رویم:
- نمایش پیام سلام فارسی و تاریخ روز شمسی.
- نشان اسپرینت جاری به سبک رترو (`اسپرینت مهرماه ۱۴۰۵`).
- سلکتور کشویی بازه زمانی فاکتورها.

هر زمان آماده بودی، بنویس **«بریم»** تا گام ۲-۲ را پیاده‌سازی کنیم! 🚀

</div>
