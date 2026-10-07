# 📘 درس ۳-۲: ساخت نوار کارت‌های ۳گانه خلاصه مالی فاکتورها (InvoiceSummaryStrip.jsx)

<div dir="rtl">

سلام! به دومین گام از **فاز ۳ (صفحه فهرست و فیلتر فاکتورها)** خوش آمدی.  
در این درس، نوار سه‌گانه شاخص‌های مالی فاکتورها را ساختیم که درست بالای جدول قرار می‌گیرد و وضعیت فوری نقدینگی، مبالغ معلق و معوقات بحرانی را به فریلنسر نشان می‌دهد.

---

### ۱. ویژگی بصری شاخص در این کامپوننت (Accent Header Stripe):
طبق راهنمای دیزاین استیچ (Google Stitch)، این ۳ کارت دارای یک **نوار رنگی ۸ پیکسلی در بالاترین لبه** هستند که با یک خط مشکی ۲ پیکسلی از بقیه کارت جدا شده است:

```jsx
<div className="absolute top-0 left-0 right-0 h-2 bg-retro-mint border-b-2 border-black" />
```

این خط رنگی در اولین نگاه به چشم کاربر می‌آید و بار معنایی کارت را مخابره می‌کند:
* 🟢 **خط سبز نعنایی (`bg-retro-mint`):** حجم کل فاکتورها و وضعیت سالم جریان درآمدی.
* 🟠 **خط نارنجی (`bg-retro-tangerine`):** مبالغ سررسید نشده که در انتظار واریز کارفرما هستند.
* 🔴 **خط قرمز مرجانی (`bg-retro-coral`):** معوقات بحرانی که موعد پرداخت‌شان گذشته و نیازمند پیگیری فوری هستند.

---

### ۲. ساختار کد کامپوننت (`src/components/invoices/InvoiceSummaryStrip.jsx`):

```jsx
import React from 'react';

export function InvoiceSummaryStrip({ stats }) {
  const defaultStats = {
    totalInvoiced: {
      title: 'مجموع صورت‌حساب‌ها',
      badge: '۴۲ فاکتور',
      amount: '۱۶۲,۷۰۰,۰۰۰',
      trend: '↑ ۱۴.۸٪',
      trendSub: 'رشد نسبت به فصل قبل',
      stripeColor: 'bg-retro-mint',
    },
    pending: {
      title: 'در انتظار وصول / معلق',
      badge: '۵ فاکتور باز',
      amount: '۳۸,۲۰۰,۰۰۰',
      note: 'میانگین دوره تسویه: ۱۲ روز کاری',
      stripeColor: 'bg-retro-tangerine',
    },
    overdue: {
      title: 'معوقات سررسید گذشته',
      badge: '۲ بحرانی',
      amount: '۱۸,۵۰۰,۰۰۰',
      warning: 'نیازمند پیگیری فوری: کافه بازار (۲۲+ روز تاخیر)',
      stripeColor: 'bg-retro-coral',
    },
  };

  const data = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 my-2">
      {/* کارت ۱: کل مبالغ فاکتور شده */}
      <div className="relative bg-white border-2 border-black rounded-xl p-4 md:p-5 shadow-retro overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-retro-lg transition-all select-none">
        <div className={`absolute top-0 left-0 right-0 h-2 ${data.totalInvoiced.stripeColor} border-b-2 border-black`} />
        ...
      </div>

      {/* کارت ۲: مبالغ در انتظار واریز */}
      <div className="relative bg-white border-2 border-black rounded-xl p-4 md:p-5 shadow-retro overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-retro-lg transition-all select-none">
        <div className={`absolute top-0 left-0 right-0 h-2 ${data.pending.stripeColor} border-b-2 border-black`} />
        ...
      </div>

      {/* کارت ۳: معوقات بحرانی */}
      <div className="relative bg-white border-2 border-black rounded-xl p-4 md:p-5 shadow-retro overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-retro-lg transition-all select-none">
        <div className={`absolute top-0 left-0 right-0 h-2 ${data.overdue.stripeColor} border-b-2 border-black`} />
        ...
      </div>
    </div>
  );
}

export default InvoiceSummaryStrip;
```

---

### ۳. تحلیل نکات آموزشی و تجربه کاربری (UX):
1. **تمایز کارت بحرانی (Critical Alert):**  
   در کارت سوم، رقم مبلغ با رنگ قرمز تند (`text-retro-coral`) چاپ شده و بج آن کپسول صورتی `۲ بحرانی` است. در زیرنویس آن نیز نام کارفرمای بدهکار با تاخیر روزانه درج شده است (`کافه بازار: ۲۲+ روز`). این رویکرد در نرم‌افزارهای مدرن مالی باعث کاهش نرخ عدم وصول مطالبات می‌شود.
2. **شبکه ۳ ستونه واکنش‌گرا (`grid-cols-1 md:grid-cols-3`):**  
   در دسکتاپ و تبلت‌های بزرگ به شکل ۳ ستونه موازی قرار می‌گیرد و در موبایل به صورت ردیف‌های کارت زیر هم می‌آید تا اعداد کاملاً درشت و خوانا بمانند.
3. **تایپوگرافی مونو برای ارقام مالی:**  
   تمام ارقام با فونت `JetBrains Mono` و حاشیه ضخیم طراحی شده‌اند تا حس حسابداری و اسناد رسمی را القا کنند.

---

### ۴. تست بیلد:
پروژه با موفقیت بیلد شد: `✓ built in 1.49s`

---

### ۵. گام بعدی چیست؟ (گام ۳-۳: کنترل‌پنل فیلتر و جستجوی پیشرفته)
در **گام ۳-۳**، جعبه‌ابزار فیلتر بالای جدول را می‌سازیم:
- **دکمه‌های کپسولی وضعیت (Filter Pills):**  
  همه (۴۲)، در انتظار (۵)، پرداخت شده (۳۴)، معوقه (۲)، پیش‌نویس (۱) با استیت اکتیو نئوبروتال.
- **اینپوت جستجوی متنی زنده:**  
  جستجو بر اساس شماره فاکتور، نام کارفرما یا موضوع پروژه.
- **دراپ‌داون فیلتر کارفرما و مرتب‌سازی:**  
  بر اساس جدیدترین تاریخ، بالاترین مبلغ و وضعیت.

هر زمان آماده بودی، بنویس **«بریم»**! 🚀

</div>
