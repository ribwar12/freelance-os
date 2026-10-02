# 📘 درس ۱-۵: ساخت اینپوت، نشان‌های وضعیت (Badge) و جمع‌بندی فاز ۱

<div dir="rtl">

سلام! در این گام دو قطعه نهایی پازل فاز ۱ یعنی **ورودی‌ها (`Input.jsx`)** و **نشان‌های کپسولی وضعیت (`Badge.jsx`)** را ساختیم. با اتمام این گام، جعبه‌ابزار پایه‌ای پروژه ۱۰۰٪ کامل شد و آماده ورود مقتدرانه به فاز ۲ (صفحه داشبورد) هستیم.

---

### ۱. کامپوننت ورودی (`src/components/ui/Input.jsx`) چطور کار می‌کند؟

در ری‌اکت به اینپوت‌هایی که استیت خود را از متغیرهای کامپوننت می‌گیرند **Controlled Component (کامپوننت کنترل‌شده)** می‌گویند:

```jsx
export function Input({
  type = 'text',
  placeholder = '',
  value,
  onChange,
  className = '',
  disabled = false,
  ...props
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      className={`flex h-11 w-full rounded-xl border-2 border-black bg-white px-3.5 py-2 text-xs md:text-sm font-semibold text-black placeholder:text-neutral-500 shadow-retro-sm transition-all focus:outline-none focus:ring-2 focus:ring-retro-yellow focus:shadow-retro disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}
```

#### ویژگی‌های این اینپوت:
1. **پراپس `value` و `onChange`:** به راحتی با `useState` دوره ری‌اکت هماهنگ می‌شود.
2. **استایل نئوبروتال:** دارای حاشیه ۲ پیکسلی مشکی، ارتفاع ۴۴ پیکسلی استاندارد (`h-11`)، و زمانی که کاربر داخل آن کلیک می‌کند (Focus)، سایه سخت به همراه یک هاله زرد رنگ به خود می‌گیرد (`focus:ring-retro-yellow`).

---

### ۲. کامپوننت نشان‌های کپسولی (`src/components/ui/Badge.jsx`):

در سیستم‌های مالی و حسابداری، وضعیت هر فاکتور باید در یک نگاه مشخص باشد. این کامپوننت با فونت اعداد مونو (`font-mono`) و کپسول‌های رنگی با حاشیه مشکی طراحی شد:

```jsx
<Badge variant="paid">پرداخت شد • PAID</Badge>     // سبز نعنایی
<Badge variant="pending">در انتظار • PENDING</Badge>   // زرد الکتریک
<Badge variant="overdue">معوقه • OVERDUE</Badge>       // صورتی مرجانی
<Badge variant="draft">پیش‌نویس • DRAFT</Badge>       // طوسی خنثی
```

---

### 🏆 جشن پایان فاز ۱: چه چیزهایی به دست آوردیم؟

ما در این ۵ گام، زیربنای مستحکم و بی‌نقص پروژه را روی **React JavaScript خالص (بدون تایپ‌اسکریپت)** بنا کردیم:

* ✅ **گام ۱-۱:** ستاپ پروژه ری‌اکت خالص جاوااسکریپت و پاک‌سازی تایپ‌اسکریپت.
* ✅ **گام ۱-۲:** تنظیم پالت رنگ‌ها و سایه‌های سخت در Tailwind و `index.css`.
* ✅ **گام ۱-۳:** ساخت دکمه تاکتایل (`Button.jsx`) با افکت فشردگی کلیک.
* ✅ **گام ۱-۴:** ساخت کارت‌های نئوبروتال (`Card.jsx`) با قابلیت تغییر رنگ برای داشبورد.
* ✅ **گام ۱-۵:** ساخت ورودی‌ها (`Input.jsx`) و نشان‌های وضعیت (`Badge.jsx`).

حالا ۴ تا کامپوننت طلایی آماده داریم که در فاز بعدی مثل قطعات لگو کنار هم می‌چینیم تا صفحه کامل داشبورد را بالا بیاوریم!

---

هر زمان این درس را خواندی و آماده بودی، بگو تا **نقشه راه ۵ گام فاز ۲ (صفحه پیشخوان و داشبورد اصلی)** را شروع کنیم!

</div>
