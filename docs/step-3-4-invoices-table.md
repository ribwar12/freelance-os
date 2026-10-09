# 📘 درس ۳-۴: ساخت جدول جامع فاکتورها با انتخاب دسته‌جمعی (InvoicesTable.jsx)

<div dir="rtl">

سلام! به چهارمین گام از **فاز ۳ (صفحه فهرست و فیلتر فاکتورها)** خوش آمدی.  
در این گام، قلب تپنده دایرکتوری فاکتورها یعنی **جدول داده‌های جامع با قابلیت انتخاب چندتایی، اکشن‌های گروهی و عملیات واقعی زنده (`InvoicesTable.jsx`)** را به سبک نئوبروتال ساختیم.

این کامپوننت نمونه‌ای واقعی از یک **Data Grid تعاملی در سطح سیستم‌های سازمانی (B2B SaaS)** است.

---

### ۱. معماری و قابلیت‌های جدول فاکتورها:

#### الف) نوار سربرگ ماتریس زنده (LIVE Matrix Header):
در بالاترین بخش جدول، یک نوار با پس‌زمینه طوسی رترو قرار دارد که شامل:
- عنوان مهندسی: `ماتریس زنده حساب‌های دریافتنی (LIVE AR MATRIX)`
- شمارنده فاکتورهای فیلترشده (`X فاکتور از ۴۲ مورد`)
- وضعیت ذخیره‌سازی خودکار و دکمه **تازه‌سازی داده‌ها (Refresh)** که با یک کلیک لیست را به حالت اولیه بازمی‌گرداند.

#### ب) نوار ابزار عملیات دسته‌جمعی (Floating Bulk Actions Toolbar):
به محض اینکه کاربر حتی یک فاکتور را تیک بزند، یک نوار زرد رنگ برجسته بالای جدول ظاهر می‌شود:
```jsx
{selectedIds.length > 0 && (
  <div className="bg-retro-yellow border-b-2 border-black ...">
    <span>{selectedIds.length} فاکتور انتخاب شد</span>
    <Button variant="secondary" onClick={() => onBulkAction('paid', selectedIds)}>
      ✓ تسویه گروهی
    </Button>
    <Button variant="outline" onClick={() => onBulkAction('export', selectedIds)}>
      📥 خروجی انتخابی
    </Button>
    <Button variant="destructive" onClick={() => onBulkAction('delete', selectedIds)}>
      🗑️ حذف گروهی
    </Button>
  </div>
)}
```
این اکشن‌ها واقعاً کار می‌کنند و تغییرات را مستقیماً در استیت برنامه اعمال می‌کنند!

#### ج) چک‌باکس انتخاب همه و هایلایت ردیف‌ها:
- در سربرگ جدول یک چک‌باکس سراسری قرار دارد که اگر تمام فاکتورها انتخاب شوند تیک می‌خورد، و اگر تعدادی انتخاب شوند به حالت میانی (`indeterminate`) درمی‌آید.
- هر ردیفی که تیک می‌خورد، پس‌زمینه‌اش به زرد نئوبروتال ملایم تغییر رنگ می‌دهد (`bg-retro-yellow/20`).

#### د) عملیات زنده (Real CRUD Operations):
در ستون آخر جدول، دکمه‌های فوری تعبیه شده است:
1. **دکمه تسویه فوری (✓):** برای فاکتورهای در انتظار واریز، که با یک کلیک وضعیت را به «پرداخت شد» تبدیل می‌کند.
2. **دکمه مشاهده (👁) و ویرایش (✏️):** جهت باز کردن پیش‌نمایش یا ادیت فاکتور.
3. **دکمه حذف (🗑️):** فاکتور مربوطه را حذف کرده و جدول و شمارنده‌ها را فوراً آپدیت می‌کند.

---

### ۲. اتصال بی‌درنگ به فیلترها (Live Filtering):
در فایل `App.jsx`، جدول مستقیماً به استیت فیلترهایی که در گام ۳-۳ ساختیم متصل است:
* اگر کاربر روی کپسول **«معوقه»** کلیک کند، بلافاصله جدول فقط فاکتورهای معوقه را نمایش می‌دهد.
* اگر در کادر جستجو تایپ کند **«دیجی‌کالا»** یا **«INV-1405-08»**، جدول در همان لحظه فیلتر می‌شود.
* اگر کارفرمای خاصی از دراپ‌داون انتخاب شود، ردیف‌ها محدود به همان کارفرما می‌شوند.
* شمارنده‌های کپسول‌های وضعیت نیز بر اساس تعداد واقعی فاکتورهای موجود به صورت پویا محاسبه می‌شوند (`dynamicCounts`).

---

### ۳. ساختار کد کامپوننت (`src/components/invoices/InvoicesTable.jsx`):

```jsx
import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export function InvoicesTable({
  invoices,
  selectedIds = [],
  onSelectRow,
  onSelectAll,
  onViewInvoice,
  onEditInvoice,
  onDeleteInvoice,
  onMarkAsPaid,
  onBulkAction,
  onRefresh,
}) {
  const allSelected = invoices.length > 0 && selectedIds.length === invoices.length;

  return (
    <div className="bg-white border-[3px] border-black rounded-2xl shadow-retro overflow-hidden flex flex-col select-none">
      {/* هدر ماتریس زنده */}
      <div className="bg-retro-slate border-b-2 border-black px-4 md:px-6 py-2.5 ...">
        ...
      </div>

      {/* نوار عملیات دسته‌جمعی */}
      {selectedIds.length > 0 && (
        <div className="bg-retro-yellow border-b-2 border-black ...">
          ...
        </div>
      )}

      {/* جدول داده‌ها با اسکرول افقی */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-right border-collapse min-w-[980px]">
          ...
        </table>
      </div>
    </div>
  );
}

export default InvoicesTable;
```

---

### ۴. نتیجه بیلد:
پروژه بدون هیچ هشداری در ۱.۵۵ ثانیه با موفقیت کامپایل شد: `✓ built in 1.55s`

---

### ۵. گام بعدی چیست؟ (گام ۳-۵: نوار صفحه‌بندی Pagination و اتمام فاز ۳)
در **گام ۳-۵** که آخرین گام فاز ۳ است:
- نوار صفحه‌بندی نئوبروتال پایین جدول (`InvoicePagination.jsx`) را می‌سازیم.
- دکمه‌های شماره صفحه (۱، ۲، ۳...)، دکمه‌های بعدی و قبلی.
- سلکتور تعداد نمایش در هر صفحه (۱۰، ۲۵، ۵۰ فاکتور در صفحه).
- خلاصه وضعیت تاییدیه و پایان فاز ۳.

هر زمان آماده بودی، بنویس **«بریم»**! 🚀

</div>
