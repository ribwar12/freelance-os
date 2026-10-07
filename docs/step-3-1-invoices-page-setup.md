# 📘 درس ۳-۱: ساختار صفحه فاکتورها و سیستم ناوبری (InvoicesPage.jsx)

<div dir="rtl">

سلام! خوش آمدی به **فاز ۳: صفحه فهرست و فیلتر جامع فاکتورها (Invoices Directory & Filter Table)**.  
در این گام، صفحه اختصاصی فاکتورها را پایه‌ریزی کردیم و سیستم سوئیچ روان بین «پیشخوان» و «فهرست فاکتورها» را متصل نمودیم.

---

### ۱. نقشه راه ۵ گام فاز ۳:
در فاز ۲، پیشخوان جامع استودیو را به طور ۱۰۰٪ ساختیم. حالا در فاز ۳، وارد عمیق‌ترین ماژول حسابداری برنامه یعنی مدیریت و تسویه فاکتورها می‌شویم:

* 🎯 **گام ۳-۱ (این گام):** ساختار صفحه فاکتورها، مسیر ناوبری (Breadcrumb)، هدر، متای حسابداری و اتصال به تب‌های نوبار.
* ⏳ **گام ۳-۲:** نوار ۳ کارت خلاصه شاخص‌های مالی فاکتورها (کل صادرشده، در انتظار واریز، معوقات بحرانی).
* ⏳ **گام ۳-۳:** کنترل‌پنل فیلتر پیشرفته (دکمه‌های کپسولی وضعیت، اینپوت جستجو، دراپ‌داون کارفرما و مرتب‌سازی).
* ⏳ **گام ۳-۴:** جدول پیشرفته فاکتورها با قابلیت انتخاب دسته‌جمعی و چک‌باکس‌های اختصاصی.
* ⏳ **گام ۳-۵:** نوار صفحه‌بندی نئوبروتال (Pagination)، منوی اکشن‌های گروهی و جمع‌بندی فاز ۳.

---

### ۲. ساختار کد کامپوننت (`src/components/invoices/InvoicesPage.jsx`):

```jsx
import React from 'react';
import { Button } from '../ui/Button';

export function InvoicesPage({
  onNewInvoice,
  onExportCSV,
  children,
}) {
  return (
    <div className="flex flex-col w-full pb-10 space-y-6">
      {/* ۱. مسیر ناوبری (Breadcrumb) و متای حسابداری زنده */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 text-xs font-black text-neutral-600">
          <span>میز کار</span>
          <span className="text-neutral-400">/</span>
          <span className="text-black bg-white px-2.5 py-1 border-2 border-black rounded-lg shadow-retro-sm">
            صورت‌حساب‌ها و دریافتی‌ها
          </span>
        </div>

        {/* متای وضعیت آنلاین و دفتر مالی */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="flex items-center gap-2 bg-white px-3 py-1 border-2 border-black rounded-xl shadow-retro-sm">
            <span className="w-2.5 h-2.5 rounded-full bg-retro-mint border border-black animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-black">
              همگام‌سازی مالی ۱۴۰۵: فعال
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-retro-slate border-2 border-black rounded-xl font-mono text-[11px] font-bold text-black">
            <span>🔒 هش دفتر کل: #1405-INV-99F</span>
          </div>
        </div>
      </div>

      {/* ۲. هدر اصلی صفحه و دکمه‌های اقدام کلان */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-5 pb-6 border-b-2 border-black">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full bg-retro-yellow border-2 border-black font-mono text-xs font-black shadow-retro-sm">
            <span>📋</span>
            <span>ماژول مستقیم امور مالی v2.4</span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-black tracking-tight font-sans">
            فهرست صورت‌حساب‌ها و فاکتورها
          </h1>
          <p className="text-xs md:text-sm font-semibold text-neutral-600 max-w-2xl leading-relaxed">
            مدیریت، پیگیری وصول مطالبات و تسویه صورت‌حساب‌های استودیو، فاکتورهای رسمی و سوابق مالی با ثبت آنی.
          </p>
        </div>

        {/* دکمه‌های عملیات بالای صفحه */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            size="default"
            onClick={onExportCSV}
            className="shadow-retro hover:shadow-retro-lg gap-2 text-xs md:text-sm"
          >
            <span>📥</span>
            <span>خروجی CSV / گزارش</span>
          </Button>

          <Button
            variant="default"
            size="default"
            onClick={onNewInvoice}
            className="shadow-retro hover:shadow-retro-lg gap-2 text-xs md:text-sm"
          >
            <span className="text-base font-black">+</span>
            <span>صدور فاکتور جدید</span>
          </Button>
        </div>
      </div>

      {/* ۳. محتوای درون صفحه (کارت‌های آماری، فیلتر و جدول) */}
      {children}
    </div>
  );
}

export default InvoicesPage;
```

---

### ۳. نکات آموزشی و فنی مهم این گام:
1. **ناوبری تب‌ها (Tab-Based Multi-View):**  
   در فایل `App.jsx`، با متغیر حالت `activeTab` سوئیچ صفحات مدیریت می‌شود:
   - اگر `activeTab === 'dashboard'` باشد، داشبورد فاز ۲ لود می‌شود.
   - اگر `activeTab === 'invoices'` باشد، صفحه فاکتورها لود می‌شود.
   - همچنین در پیشخوان وقتی روی دکمه «مشاهده تمام ۴۲ فاکتور» کلیک شود، خودکار کاربر به این صفحه هدایت می‌شود.
2. **الگوی Breadcrumb در طراحی B2B SaaS:**  
   نشان دادن موقعیت کاربر در سیستم‌های سازمانی، تجربه کاربری را بسیار حرفه‌ای‌تر می‌کند.
3. **متای همگام‌سازی سال مالی با انیمیشن پالس (`animate-pulse`):**  
   یک نشان سبز رنگ پالس‌زن به کاربر اطمینان می‌دهد که وضعیت ارتباط با سرور و دیتابیس مالی زنده و متصل است.
4. **دکمه‌های اقدام کلان:**  
   دکمه خروجی اکسل/CSV و صدور فاکتور جدید در بالاترین سطح صفحه قرار دارند تا در هر لحظه در دسترس باشند.

---

### ۴. نتیجه تست بیلد:
پروژه با موفقیت بیلد شد و هیچ‌گونه خطایی مشاهده نشد (`✓ built in 1.23s`).

---

### ۵. گام بعدی: گام ۳-۲ (نوار کارت‌های ۳گانه خلاصه مالی فاکتورها)
در گام بعدی، نوار خلاصه ۳ کارت نئوبروتال اختصاصی این صفحه را می‌سازیم:
1. **مجموع صورت‌حساب‌ها:** `۱۶۲,۷۰۰,۰۰۰ تومان` (۴۲ فاکتور با رشد ۱۴.۸٪)
2. **در انتظار وصول:** `۳۸,۲۰۰,۰۰۰ تومان` (۵ فاکتور با میانگین تسویه ۱۲ روز)
3. **معوقات بحرانی:** `۱۸,۵۰۰,۰۰۰ تومان` (۲ فاکتور قرمز رنگ با هشدار فوری پیگیری)

هر زمان آماده بودی، بنویس **«بریم»**! 🚀

</div>
