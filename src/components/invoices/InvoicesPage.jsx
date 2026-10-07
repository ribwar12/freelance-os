import React from 'react';
import { Button } from '../ui/Button';

export function InvoicesPage({
  onNewInvoice,
  onExportCSV,
  children,
}) {
  return (
    <div className="flex flex-col w-full pb-10 space-y-6">
      {/* ردیف مسیر ناوبری (Breadcrumb) و متای حسابداری زنده */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        {/* مسیر جاری */}
        <div className="flex items-center gap-2 text-xs font-black text-neutral-600">
          <span className="cursor-pointer hover:text-black transition-colors">
            میز کار
          </span>
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

      {/* هدر اصلی صفحه و دکمه‌های اقدام کلان */}
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

      {/* محتوای درونی صفحه (کارت‌های آماری، فیلتر و جدول که در گام‌های بعدی اضافه می‌شوند) */}
      {children}
    </div>
  );
}

export default InvoicesPage;
