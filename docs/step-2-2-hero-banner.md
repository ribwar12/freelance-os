# 📘 درس ۲-۲: ساخت بنر بالای داشبورد و جعبه‌ابزار کنترل (HeroBanner.jsx)

<div dir="rtl">

سلام! به دومین گام از **فاز ۲ (پیشخوان جامع فریلنسر)** خوش آمدی.  
در این درس یاد می‌گیریم که چطور بنر خوش‌آمدگویی بالای داشبورد را با هویت بصری استیچ (Neo-Brutalism)، متن‌های فارسی و جاوااسکریپت خالص طراحی و متصل کنیم.

---

### ۱. هدف کامپوننت `HeroBanner.jsx` چیست؟
وقتی فریلنسر وارد پیشخوان کاری خود می‌شود، اولین چیزی که می‌بیند این بنر است. این المان ۳ هدف کلیدی دارد:
1. **احوالپرسی و حس سرزندگی:** نمایش نام فریلنسر («الکس مرادی») همراه با آیکون رعد ⚡ که با انیمیشن جهش (`animate-bounce`) جلوه جذابی به صفحه می‌دهد.
2. **نشان اسپرینت جاری (Sprint Pill):** برچسب کپسولی با رنگ زرد رترو که نشان می‌دهد استودیو هم‌اکنون در چه بازه زمانی یا اسپرینتی قرار دارد (مثلاً `اسپرینت مهر ۱۴۰۵`).
3. **کنترل و فیلتر زمان به همراه اکشن فوری:** سلکتور برای فیلتر کردن دوره مالی (این ماه، ماه قبل، فصل جاری، سال مالی) و دکمه تاکتایل برای ایجاد فاکتور جدید.

---

### ۲. ساختار کد کامپوننت (`src/components/dashboard/HeroBanner.jsx`)

```jsx
import React from 'react';
import { Button } from '../ui/Button';

export function HeroBanner({
  userName = 'الکس مرادی',
  sprintLabel = 'اسپرینت مهر ۱۴۰۵',
  selectedPeriod = 'current_month',
  onPeriodChange,
  onNewInvoice,
}) {
  return (
    <section className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-5 md:p-6 bg-white border-[3px] border-black rounded-2xl shadow-retro">
      
      {/* بخش راست: پیام خوش‌آمدگویی و تگ اسپرینت */}
      <div className="flex flex-col gap-1.5 text-right">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-black tracking-tight font-sans">
            خوش آمدید، {userName}
          </h1>
          <span className="inline-flex items-center justify-center text-2xl animate-bounce select-none">
            ⚡
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-xs font-black px-3 py-1 bg-retro-yellow text-black border-2 border-black rounded-full shadow-retro-sm">
            <span>🎯</span>
            <span>{sprintLabel}</span>
          </span>
        </div>
        <p className="text-xs md:text-sm font-semibold text-neutral-600 leading-relaxed">
          خلاصه جریان نقدینگی، وضعیت تسویه فاکتورها و سلامت مالی استودیو در این دوره کاری.
        </p>
      </div>

      {/* بخش چپ: انتخاب دوره زمانی و دکمه اقدام */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* سلکتور دراپ‌داون */}
        <div className="relative inline-flex items-center">
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
            className="appearance-none bg-white text-xs md:text-sm font-black text-black pr-4 pl-9 py-2.5 rounded-xl border-2 border-black shadow-retro-sm hover:shadow-retro focus:outline-none focus:bg-canvas cursor-pointer transition-all"
          >
            <option value="current_month">این ماه (مهر ۱۴۰۵)</option>
            <option value="last_month">ماه قبل (شهریور ۱۴۰۵)</option>
            <option value="quarter">فصل جاری (پاییز ۱۴۰۵)</option>
            <option value="year">سال مالی ۱۴۰۵</option>
          </select>
          <span className="absolute left-3 pointer-events-none text-xs font-black text-neutral-700 select-none">
            ▼
          </span>
        </div>

        {/* دکمه صدور فاکتور */}
        <Button
          variant="default"
          size="default"
          className="shadow-retro hover:shadow-retro-lg gap-2 text-xs md:text-sm whitespace-nowrap"
          onClick={onNewInvoice}
        >
          <span className="text-base font-black leading-none">+</span>
          <span>صدور فاکتور جدید</span>
        </Button>
      </div>

    </section>
  );
}

export default HeroBanner;
```

---

### ۳. تحلیل فنی و الگوهای ری‌اکت:
1. **پراپس پیش‌فرض (Default Props):** مقادیری مثل `userName` یا `sprintLabel` با مقدار اولیه جاوااسکریپت تعریف شده‌اند؛ یعنی اگر مقداری پاس داده نشود، صفحه خطا نمی‌دهد و مقدار پیش‌فرض را نشان می‌دهد.
2. **ارتباط دوطرفه با والد (Lifting State Up):** وقتی کاربر دوره زمانی را از دراپ‌داون تغییر می‌دهد، تابع `onPeriodChange` صدا زده می‌شود و استیت `period` در فایل `App.jsx` آپدیت می‌شود. این کار باعث می‌شود در گام‌های بعدی، اعداد و کارت‌های آماری متناسب با ماه انتخاب‌شده تغییر کنند.
3. **ریسپانسیو کامل (`flex-col lg:flex-row`):** در موبایل اجزا زیر هم مرتب چیده می‌شوند و در دسکتاپ به صورت دو ستونه (متن در راست، ابزارها در چپ) قرار می‌گیرند.
4. **استفاده از دکمه مشترک فاز ۱:** به جای نوشتن تگ خام `<button>`، از همان کامپوننت پایه [`Button.jsx`](file:///D:/freelance-os/src/components/ui/Button.jsx) استفاده کردیم تا یکپارچگی استایل و انیمیشن کلیک حفظ شود.

---

### ۴. گام بعدی: گام ۲-۳ (کارت‌های ۴گانه شاخص کلیدی - KPI Cards)
در گام بعدی، ۴ کارت مستطیلی پرانرژی با رنگ‌های پالت رترو را می‌سازیم:
1. **Mint Green (سبز نعنایی):** مجموع درآمد کل وصول شده (`۱۲۴,۵۰۰,۰۰۰ تومان`) + درصد رشد.
2. **Electric Yellow (زرد الکتریک):** مبالغ در انتظار وصول (`۳۸,۲۰۰,۰۰۰ تومان`).
3. **Lavender (بنفش اسطوخودوس):** وضعیت پروژه‌های فعال استودیو (`۷ پروژه در حال انجام`).
4. **Retro Coral (صورتی مرجانی):** تعداد مشتریان طرف‌حساب (`۱۸ مشتری ثبت‌شده`).

هر زمان آماده بودی، بنویس **«بریم»** تا گام ۲-۳ را پیاده‌سازی کنیم! 🚀

</div>
