# 📘 درس ۳-۳: ساخت جعبه‌ابزار فیلتر و جستجوی پیشرفته (InvoiceFilters.jsx)

<div dir="rtl">

سلام! به سومین گام از **فاز ۳ (صفحه فهرست و فیلتر فاکتورها)** خوش آمدی.  
در این درس، یکی از مهم‌ترین بخش‌های تجربه کاربری هر نرم‌افزار مالی یعنی **کنترل‌پنل فیلتر وضعیت و جستجوی زنده فاکتورها (`InvoiceFilters.jsx`)** را به سبک نئوبروتال و با جاوااسکریپت خالص ساختیم.

---

### ۱. معماری و اجزای کنترل‌پنل فیلتر:
طبق طراحی استیچ (Google Stitch)، این پنل در دو ردیف منظم و ریسپانسیو قرار گرفته است:

#### ردیف اول: کپسول‌های وضعیت و سوئیچ ارز
* **دکمه‌های کپسولی (Segmented Status Pills):**
  - دکمه **همه (۴۲)** با وضعیت اکتیو تیره (`bg-black text-white`) و بج شمارنده زرد (`bg-retro-yellow`).
  - دکمه **در انتظار (۵)** همراه با نقطه نشانگر نارنجی (`bg-retro-tangerine`).
  - دکمه **پرداخت شده (۳۴)** همراه با نقطه نشانگر سبز نعنایی (`bg-retro-mint`).
  - دکمه **معوقه (۲)** همراه با نقطه نشانگر قرمز مرجانی (`bg-retro-coral`).
  - دکمه **پیش‌نویس (۱)** همراه با نقطه نشانگر طوسی (`bg-retro-slate`).
* **سوئیچ واحد پولی (Currency Selector):**  
  امکان انتخاب آسان بین `تومان (TOM)`، `دلار ($)` و `یورو (€)`.

#### ردیف دوم: اینپوت جستجو و فیلترهای کشویی
* **اینپوت جستجوی زنده (Live Search):**  
  آیکون ذره‌بین در سمت راست (RTL)، تایپ آنی برای فیلتر شماره فاکتور یا نام شرکت، و برچسب کلید میانبر `Ctrl+K`.
* **سلکتور دوره زمانی:**  
  انتخاب سال مالی ۱۴۰۵، فصل پاییز، فصل تابستان یا آرشیو سال قبل.
* **سلکتور سازمان کارفرما:**  
  فیلتر سریع بر اساس برندهای ایرانی طرف حساب (دیجی‌کالا، اسنپ‌پی، کافه بازار، ترب، دیوار، علی‌بابا).
* **نوار هوشمند بازنشانی (Conditional Reset Bar):**  
  اگر کاربر فیلتری را تغییر دهد یا چیزی جستجو کند، نوار اعلان کوچکی در پایین ظاهر شده و با یک کلیک تمام فیلترها را ریست می‌کند.

---

### ۲. ساختار کد کامپوننت (`src/components/invoices/InvoiceFilters.jsx`):

```jsx
import React from 'react';

export function InvoiceFilters({
  statusFilter = 'all',
  onStatusChange,
  searchQuery = '',
  onSearchChange,
  selectedClient = 'all',
  onClientChange,
  selectedDateRange = '1405_all',
  onDateRangeChange,
  currency = 'TOM',
  onCurrencyChange,
  counts = { all: 42, pending: 5, paid: 34, overdue: 2, draft: 1 },
  onResetFilters,
}) {
  const statusOptions = [
    { id: 'all', label: 'همه', count: counts.all, dotColor: null },
    { id: 'pending', label: 'در انتظار واریز', count: counts.pending, dotColor: 'bg-retro-tangerine' },
    { id: 'paid', label: 'پرداخت شده', count: counts.paid, dotColor: 'bg-retro-mint' },
    { id: 'overdue', label: 'معوقه', count: counts.overdue, dotColor: 'bg-retro-coral' },
    { id: 'draft', label: 'پیش‌نویس', count: counts.draft, dotColor: 'bg-retro-slate' },
  ];

  const hasActiveFilters =
    statusFilter !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedClient !== 'all' ||
    selectedDateRange !== '1405_all';

  return (
    <div className="bg-white border-2 border-black rounded-xl p-4 md:p-5 shadow-retro flex flex-col gap-4 select-none">
      {/* ردیف اول: کپسول‌های وضعیت و ارز */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        ...
      </div>

      {/* ردیف دوم: جستجو و دراپ‌داون‌ها */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t-2 border-neutral-200">
        ...
      </div>

      {/* نوار بازنشانی فیلترها */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-neutral-200 text-xs">
          ...
        </div>
      )}
    </div>
  );
}

export default InvoiceFilters;
```

---

### ۳. الگوهای فنی ری‌اکت در این گام:
1. **کامپوننت کنترل‌شده (Controlled Component Pattern):**  
   این کامپوننت خود هیچ استیت داخلی مستقلی نگه نمی‌دارد؛ بلکه تمام مقادیر (`statusFilter`، `searchQuery` و...) را از والد (`App.jsx`) دریافت می‌کند و تغییرات را با `callback` برمی‌گرداند. این الگو باعث می‌شود در گام بعدی، دیتای جدول فاکتورها دقیقاً بر اساس همین متغیرها فیلتر و رندر شود.
2. **رندر مشروط نوار ریست (`hasActiveFilters && ...`):**  
   وقتی فیلترها در حالت پیش‌فرض هستند، رابط کاربری خلوت است. به محض تایپ کردن یا انتخاب یک وضعیت، دکمه قرمز رنگ «پاکسازی فیلترها» پدیدار می‌شود.
3. **ریسپانسیو ۱۲ ستونه (`grid-cols-1 md:grid-cols-12`):**  
   در موبایل اینپوت و دراپ‌داون‌ها زیر هم قرار می‌گیرند و در دسکتاپ اینپوت ۶ ستون (نصف عرض) و هر دراپ‌داون ۳ ستون را پر می‌کنند.

---

### ۴. نتیجه بیلد:
پروژه بدون هیچ هشداری در ۸۸۱ میلی‌ثانیه بیلد شد: `✓ built in 881ms`

---

### ۵. گام بعدی: گام ۳-۴ (جدول جامع فاکتورها با انتخاب دسته‌جمعی)
در **گام ۳-۴**، جدول اصلی صفحه فاکتورها (`InvoicesTable.jsx`) را می‌سازیم:
- چک‌باکس انتخاب همه / انتخاب تکی برای عملیات دسته‌جمعی
- ستون‌های: چک‌باکس، کد فاکتور، کارفرما و پروژه، موعد سررسید، مبلغ، وضعیت، عملیات
- اتصال مستقیم به فیلترها (جستجو و فیلتر بر اساس وضعیت انتخاب‌شده)
- نوار ابزار عملیات گروهی (وقتی چند فاکتور انتخاب می‌شوند)

هر زمان آماده بودی، بنویس **«بریم»**! 🚀

</div>
