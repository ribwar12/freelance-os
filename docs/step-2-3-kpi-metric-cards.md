# 📘 درس ۲-۳: ساخت کارت‌های ۴گانه شاخص کلیدی عملکرد (MetricCards.jsx)

<div dir="rtl">

سلام! در سومین گام از **فاز ۲ (پیشخوان جامع فریلنسر)**، یکی از جذاب‌ترین و کلیدی‌ترین بخش‌های بصری داشبورد یعنی **کارت‌های آماری ۴گانه (KPI Metric Cards)** را طراحی و پیاده‌سازی کردیم.

این بخش قلب تپنده داشبورد مالی هر فریلنسر است؛ جایی که در یک نگاه کلی، تمام وضعیت مالی و کاری استودیو جلوی چشمانش قرار می‌گیرد.

---

### ۱. پالت ۴گانه نئوبروتال و مفهوم هر کارت:
طراحی این بخش مستقیماً بر اساس راهنمای دیزاین استیچ (Google Stitch) انجام شده و هر رنگ حامل یک بار معنایی خاص است:

| رنگ کارت | نام رنگ در Tailwind | شاخص مالی و کاری | مفهوم و کاربرد در نرم‌افزار |
| :--- | :--- | :--- | :--- |
| 🟢 **سبز نعنایی** | `bg-retro-mint` | **درآمد کل وصول شده** | مجموع دریافتی‌های قطعی و تسویه‌شده به همراه درصد رشد |
| 🟡 **زرد الکتریک** | `bg-retro-yellow` | **در انتظار وصول** | مبالغ فاکتورهایی که صادر شده اما هنوز مشتری واریز نکرده |
| 🟣 **بنفش رترو** | `bg-retro-lavender` | **پایپ‌لاین پروژه‌ها** | پروژه‌های در حال اجرا و ددلاین‌های تحویل هفتگی |
| 🔴 **صورتی مرجانی** | `bg-retro-coral` | **باشگاه مشتریان** | تعداد شرکت‌ها و مشتریان فعال طرف قرارداد |

---

### ۲. ساختار کد کامپوننت (`src/components/dashboard/MetricCards.jsx`)

برای اینکه کدمان تمیز و قابل استفاده مجدد (Modular) باشد، آن را به دو بخش تقسیم کردیم:
1. **کامپوننت `MetricCard`:** مسئول رندر یک کارت منفرد.
2. **کامپوننت `MetricCards`:** شبکه یا گرید ۴ ستونه که داده‌ها را می‌گیرد و نمایش می‌دهد.

```jsx
import React from 'react';

// ۱. کامپوننت کارت تکی (دارای هاور نرم و سایه نئوبروتال)
export function MetricCard({
  title,
  badge,
  amount,
  currency,
  footerText,
  footerIcon,
  bgClass = 'bg-retro-mint',
}) {
  return (
    <div
      className={`${bgClass} border-[3px] border-black rounded-2xl p-5 shadow-retro flex flex-col justify-between relative overflow-hidden transition-all duration-150 hover:-translate-y-1 hover:shadow-retro-lg select-none`}
    >
      {/* ردیف بالا: عنوان کارت و بج سفید وضعیت */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-black text-black">
          {title}
        </span>
        <span className="bg-white font-mono text-[11px] font-black text-black px-2.5 py-0.5 rounded-full border-2 border-black shadow-retro-sm">
          {badge}
        </span>
      </div>

      {/* ردیف میانی: مقدار شاخص و توضیحات */}
      <div className="my-4">
        <div className="text-2xl md:text-3xl font-mono font-black text-black tracking-tight">
          {amount}
        </div>
        <span className="text-xs font-bold text-black/85 mt-1 block">
          {currency}
        </span>
      </div>

      {/* ردیف پایین: حاشیه مشکی جداکننده و جزئیات پاورقی */}
      <div className="pt-3 border-t-2 border-black flex items-center justify-between text-black text-xs font-bold">
        <span>{footerText}</span>
        <span className="text-sm font-black">{footerIcon}</span>
      </div>
    </div>
  );
}

// ۲. شبکه گرید ریسپانسیو (در موبایل ۱ ستون، تبلت ۲ ستون، دسکتاپ ۴ ستون)
export function MetricCards({ metrics }) {
  // اگر دیتایی از بیرون ارسال نشود از این دیتای پیش‌فرض استفاده می‌شود
  const defaultMetrics = [ ... ];

  const data = metrics || defaultMetrics;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
      {data.map((item) => (
        <MetricCard key={item.id} {...item} />
      ))}
    </section>
  );
}

export default MetricCards;
```

---

### ۳. نکات آموزشی و فنی مهم این گام:
1. **شبکه گرید ریسپانسیو (`grid-cols-1 sm:grid-cols-2 xl:grid-cols-4`):**
   - در گوشی‌های موبایل: کارت‌ها زیر هم به صورت تک‌ستونه می‌آیند تا متن و ارقام بزرگ و خوانا باشند.
   - در تبلت: در دو ردیف دوتایی (۲ ستونه) قرار می‌گیرند.
   - در دسکتاپ: در یک خط زیبا کنار هم (۴ ستونه) قرار می‌گیرند.
2. **ارقام با فونت ماشین‌حسابی و مونو (`font-mono`):**
   - طبق راهنمای نئوبروتالیسم، تمام اعداد مالی و آماری از فونت مونو (`JetBrains Mono`) با وزن ۹۰۰ (فوق‌العاده بولد) استفاده می‌کنند تا شبیه به فیش‌های کاغذی و ماشین‌های حسابداری کلاسیک باشند.
3. **تعاملی بودن زنده با سلکتور ماه (`Lifting State Up`):**
   - وقتی در بنر بالایی ماه جاری، ماه قبل، فصل جاری یا سال مالی را انتخاب می‌کنی، هر ۴ کارت به صورت خودکار مقادیر مربوط به همان دوره را نشان می‌دهند.

---

### ۴. نتیجه بیلد:
پروژه با موفقیت بیلد شد و بدون هیچ خطایی در ۱.۱ ثانیه کامپایل گردید (`✓ built in 1.15s`).

---

### ۵. گام بعدی چیست؟ (گام ۲-۴: جدول آخرین فاکتورها)
در **گام ۲-۴**، جدول جامع **آخرین فاکتورهای صادرشده (Recent Invoices Table)** را می‌سازیم:
- نمایش شماره فاکتور، نام کارفرما و نام پروژه
- تاریخ موعد سررسید شمسی و مبالغ به تومان
- برچسب‌های وضعیت پرداخت (سبز: تسویه شد، زرد: در انتظار، قرمز: معوقه)
- دکمه‌های عملیات سریع (مشاهده فاکتور، کپی لینک، دانلود).

هر زمان آماده بودی، بنویس **«بریم»**! 🚀

</div>
