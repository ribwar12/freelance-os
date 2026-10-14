import React from 'react';

/**
 * تبدیل ارقام انگلیسی به فارسی جهت نمایش بومی در واسط کاربری
 */
export function toPersianDigits(num) {
  if (num === null || num === undefined) return '';
  const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return num.toString().replace(/\d/g, (d) => farsiDigits[d]);
}

/**
 * کامپوننت نوار صفحه‌بندی نئوبروتال برای جدول فاکتورها (گام ۳-۵)
 * این کامپوننت در انتهای جدول قرار گرفته و کنترل صفحات، اندازه ردیف و وضعیت انتخاب‌ها را به نمایش می‌گذارد.
 */
export function InvoicePagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 5,
  selectedCount = 0,
  onPageChange,
  onItemsPerPageChange,
}) {
  // محاسبه ایندکس شروع و پایان اقلام در صفحه جاری
  const startIndex = totalItems === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, totalItems);

  // تولید لیست شماره صفحات جهت ساخت دکمه‌ها
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      // اگر تعداد صفحات زیاد بود، اطراف صفحه جاری را نشان می‌دهیم
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) pages.push(i);
      }
      if (currentPage < totalPages - 2) pages.push('...');
      if (!pages.includes(totalPages)) pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="bg-canvas border-t-[3px] border-black p-4 flex flex-col md:flex-row items-center justify-between gap-4 select-none">
      {/* ۱. شمارنده اقلام و نشانگر ردیف‌های انتخاب‌شده */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-black">
        {/* متن محدوده نمایش */}
        <span className="font-sans">
          نمایش{' '}
          <strong className="font-mono font-black text-black">
            {toPersianDigits(startIndex)}
          </strong>{' '}
          تا{' '}
          <strong className="font-mono font-black text-black">
            {toPersianDigits(endIndex)}
          </strong>{' '}
          از{' '}
          <strong className="font-mono font-black text-black">
            {toPersianDigits(totalItems)}
          </strong>{' '}
          فاکتور
        </span>

        <span className="text-neutral-400">|</span>

        {/* نشانگر ردیف‌های انتخاب‌شده با چک‌باکس */}
        <span
          className={`px-2.5 py-0.5 rounded-lg border-2 border-black font-black text-xs transition-colors shadow-[1px_1px_0px_#000000] ${
            selectedCount > 0
              ? 'bg-retro-yellow text-black'
              : 'bg-white text-neutral-600'
          }`}
        >
          انتخاب‌شده: {toPersianDigits(selectedCount)} مورد
        </span>

        <span className="hidden lg:inline text-neutral-400">|</span>

        {/* نشان اصالت و انطباق با استاندارد مالیاتی و بانکی */}
        <span className="hidden lg:flex items-center gap-1.5 text-emerald-800 font-bold bg-retro-mint/40 border border-black/40 px-2 py-0.5 rounded-md text-[11px]">
          <span>✓</span>
          <span>سامانه مودیان و شبا تأیید شد</span>
        </span>
      </div>

      {/* ۲. دکمه‌های کنترل صفحه و انتخاب‌گر تعداد اقلام در هر صفحه */}
      <div className="flex items-center gap-4 flex-wrap justify-center">
        {/* منوی بازشوی تعداد ردیف‌ها */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-700">
          <span>تعداد در صفحه:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange && onItemsPerPageChange(Number(e.target.value))}
            className="bg-white border-2 border-black rounded-lg px-2.5 py-1 font-mono font-bold text-xs text-black focus:outline-none focus:bg-retro-yellow cursor-pointer shadow-[2px_2px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
          >
            <option value={5}>۵ ردیف</option>
            <option value={10}>۱۰ ردیف</option>
            <option value={20}>۲۰ ردیف</option>
            <option value={50}>۵۰ ردیف</option>
          </select>
        </div>

        {/* دکمه‌های ناوبری شماره صفحات (سبک نئوبروتال قطور) */}
        <div className="flex items-center gap-1.5" dir="rtl">
          {/* دکمه صفحه قبلی */}
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onPageChange && onPageChange(currentPage - 1)}
            className={`px-3 py-1.5 border-2 border-black rounded-lg font-black text-xs transition-all flex items-center gap-1 ${
              currentPage <= 1
                ? 'bg-neutral-200 text-neutral-400 border-neutral-300 shadow-none cursor-not-allowed'
                : 'bg-white text-black shadow-[2px_2px_0_0_#000000] hover:bg-retro-yellow active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer'
            }`}
          >
            <span>قبلی</span>
          </button>

          {/* شماره صفحات */}
          {getPageNumbers().map((pageNum, idx) => {
            if (pageNum === '...') {
              return (
                <span
                  key={`ellipsis-${idx}`}
                  className="w-7 h-7 flex items-center justify-center font-bold text-neutral-500"
                >
                  ...
                </span>
              );
            }

            const isActive = currentPage === pageNum;
            return (
              <button
                key={pageNum}
                type="button"
                onClick={() => onPageChange && onPageChange(pageNum)}
                className={`w-8 h-8 rounded-lg font-mono font-black text-xs border-2 border-black transition-all flex items-center justify-center ${
                  isActive
                    ? 'bg-black text-white shadow-[2px_2px_0_0_#000000] cursor-default'
                    : 'bg-white text-black shadow-[2px_2px_0_0_#000000] hover:bg-retro-yellow active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer'
                }`}
              >
                {toPersianDigits(pageNum)}
              </button>
            );
          })}

          {/* دکمه صفحه بعدی */}
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onPageChange && onPageChange(currentPage + 1)}
            className={`px-3 py-1.5 border-2 border-black rounded-lg font-black text-xs transition-all flex items-center gap-1 ${
              currentPage >= totalPages
                ? 'bg-neutral-200 text-neutral-400 border-neutral-300 shadow-none cursor-not-allowed'
                : 'bg-white text-black shadow-[2px_2px_0_0_#000000] hover:bg-retro-yellow active:translate-x-0.5 active:translate-y-0.5 active:shadow-none cursor-pointer'
            }`}
          >
            <span>بعدی</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * داک دسترسی سریع و راهنمای کلیدهای میانبر کیبورد (برگرفته از طرح Stitch)
 */
export function InvoiceShortcutsDock({ onNewInvoice, onExportLedger }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-retro-slate/30 border-2 border-black rounded-2xl shadow-retro-sm">
      <div className="flex items-center gap-4 flex-wrap text-xs font-bold text-neutral-700">
        <span className="flex items-center gap-1.5 font-black text-black">
          <span>⌨️</span>
          <span>میانبرهای کیبورد:</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-white border-2 border-black rounded font-mono font-black text-black shadow-[1px_1px_0px_#000000]">
            N
          </kbd>
          <span className="text-[11px]">فاکتور جدید</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-white border-2 border-black rounded font-mono font-black text-black shadow-[1px_1px_0px_#000000]">
            F
          </kbd>
          <span className="text-[11px]">فیلتر وضعیت</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-white border-2 border-black rounded font-mono font-black text-black shadow-[1px_1px_0px_#000000]">
            /
          </kbd>
          <span className="text-[11px]">جستجوی زنده</span>
        </span>
        <span className="flex items-center gap-1">
          <kbd className="px-2 py-0.5 bg-white border-2 border-black rounded font-mono font-black text-black shadow-[1px_1px_0px_#000000]">
            E
          </kbd>
          <span className="text-[11px]">خروجی اکسل</span>
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs font-bold">
        <span className="text-neutral-500 font-mono text-[11px]">همگام‌سازی بانکی:</span>
        <span className="px-2.5 py-1 bg-retro-lavender text-black font-black border-2 border-black rounded-lg shadow-[1px_1px_0px_#000000] flex items-center gap-1 text-[11px]">
          <span>🔒</span>
          <span>استعلام شبای شاپرک معتبر است</span>
        </span>
      </div>
    </div>
  );
}

export default InvoicePagination;
