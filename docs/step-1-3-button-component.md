# 📘 درس ۱-۳: ساخت کامپوننت دکمه نئوبروتال (Button.jsx) با جاوااسکریپت ساده

<div dir="rtl">

سلام! در این گام اولین کامپوننت بازاستفاده‌پذیر (Reusable Component) واقعی پروژه‌مان را ساختیم: **دکمه تاکتایل نئوبروتال (`Button.jsx`)**. 

در این درس یاد می‌گیری که چطور بدون نیاز به کدهای پیچیده تایپ‌اسکریپت، یک کامپوننت استاندارد بنویسی که دقیقاً شبیه درس‌های دوره کار کند.

---

### ۱. هدف ساخت کامپوننت دکمه چیست؟
به جای اینکه در هر صفحه ۲۰ خط کد طولانی برای تگ `<button>` بنویسی:
```jsx
// روش قدیمی و خسته‌کننده (تکرار استایل‌ها در همه جا)
<button className="border-2 border-black bg-retro-yellow px-4 py-2 font-black shadow-retro neo-press ...">
  صدور فاکتور
</button>
```
یک بار کامپوننت `<Button>` را می‌سازیم، و در هر کجای پروژه به شکل یک خطی و تمیز صدا می‌زنیم:
```jsx
// روش حرفه‌ای و تمیز
<Button variant="default">صدور فاکتور</Button>
<Button variant="secondary" size="sm">مشتری جدید</Button>
<Button variant="destructive">حذف فاکتور</Button>
```

---

### ۲. بررسی خط‌به‌خط کدهای `src/components/ui/Button.jsx`:

```jsx
import React from 'react';

export function Button({
  children,
  variant = 'default',
  size = 'default',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  ...props
}) {
  // ۱. دیکشنری رنگ‌ها
  const variants = {
    default: 'bg-retro-yellow text-black hover:bg-yellow-400',
    secondary: 'bg-retro-mint text-black hover:bg-emerald-300',
    lavender: 'bg-retro-lavender text-black hover:bg-purple-300',
    outline: 'bg-white text-black hover:bg-neutral-100',
    destructive: 'bg-retro-coral text-black hover:bg-rose-400',
    dark: 'bg-black text-white hover:bg-neutral-800',
  };

  // ۲. دیکشنری اندازه‌ها
  const sizes = {
    sm: 'h-8 px-3 text-xs rounded-lg shadow-retro-sm',
    default: 'h-10 px-4 py-2 text-xs md:text-sm rounded-xl shadow-retro',
    lg: 'h-12 px-6 text-sm md:text-base rounded-2xl shadow-retro-lg',
  };

  // ۳. بازگرداندن المنت نهایی
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`neo-press inline-flex items-center justify-center gap-2 border-2 border-black font-black select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none transition-all ${
        variants[variant] || variants.default
      } ${sizes[size] || sizes.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
```

#### این کدها چطور کار می‌کنند؟
1. **پراپس `children`:** متنی که بین دو تگ `<Button>متن دکمه</Button>` می‌گذاری، از طریق `children` وارد دکمه می‌شود.
2. **پراپس `variant` با مقدار پیش‌فرض `'default'`:** اگر هیچ رنگی ندهی، خودکار رنگ زرد موزی را اعمال می‌کند.
3. **پترن Lookup Table (دیکشنری آبجکت):** به جای ۱۰ تا شرط `if-else` طولانی، از یک آبجکت ساده جاوااسکریپت استفاده کردیم (`variants[variant]`). اگر به آن بگویی `variant="secondary"`، بلافاصله کلاس‌های رنگ سبز نعنایی را برمی‌دارد.
4. **کلاس `.neo-press`:** افکت فشرده شدن دکمه هنگام کلیک را فعال می‌کند.
5. **عملگر `...props`:** هر رویداد یا ویژگی اضافه‌ای (مثل `id`، `title` یا `data-*`) را بدون نیاز به تعریف دستی به دکمه منتقل می‌کند.

---

### ۳. الان کجای کاریم؟
* ✅ **گام ۱-۱:** ستاپ پروژه ری‌اکت جاوااسکریپت خالص (انجام شد).
* ✅ **گام ۱-۲:** تنظیم پالت رنگ‌ها و سایه‌های نئوبروتال در Tailwind (انجام شد).
* ✅ **گام ۱-۳:** ساخت کامپوننت دکمه نئوبروتال (`Button.jsx`) با جاوااسکریپت ساده (الان انجام شد!).
* ⏳ **گام ۱-۴:** ساخت کامپوننت کارت نئوبروتال (`Card.jsx`) با رنگ‌های متنوع.
* ⏳ **گام ۱-۵:** ساخت ورودی‌ها (`Input.jsx`) و نشان‌های وضعیت (`Badge.jsx`) و تست نهایی.

---

هر زمان این درس را خواندی و آماده بودی، بگو تا برویم سراغ **گام ۱-۴ یعنی ساخت کامپوننت کارت نئوبروتال (`Card.jsx`)**!

</div>
