import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/Button';

/**
 * صفحه اصلی سازنده تعاملی فاکتور (گام ۴-۱)
 * ساختار لایوت ۱۲ ستونه: ستون فرم‌های اجرایی (۸ ستون) + ستون سایدبار محاسبات زنده صندوق (۴ ستون)
 */
export function CreateInvoicePage({
  invoiceNumber = 'INV-1405-10',
  currency = 'تومان',
  children,
  leftDeck,
  rightDeck,
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full pb-16 space-y-6 select-none">
      {/* ۱. نوار مسیر ناوبری و هدر تعاملی بازگشت به فاکتورها */}
      <section className="w-full flex flex-col md:flex-row md:items-center justify-between gap-4 py-4 border-b-2 border-black">
        <div className="flex flex-col gap-1.5">
          {/* بردکرامب و لینک برگشت */}
          <div className="flex items-center gap-2 text-xs font-bold text-neutral-600">
            <Link
              to="/invoices"
              className="inline-flex items-center gap-1.5 font-bold text-black bg-white hover:bg-retro-yellow px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all"
            >
              <span>←</span>
              <span>بازگشت به فاکتورها</span>
            </Link>
            <span className="text-neutral-400">/</span>
            <span className="text-neutral-800 font-semibold">صدور فاکتور جدید (پیش‌نویس)</span>
          </div>

          {/* تیتر صفحه و بج سریال فاکتور */}
          <div className="flex flex-wrap items-center gap-3 mt-1">
            <h1 className="text-2xl md:text-3xl font-black text-black tracking-tight font-sans">
              صدور و تنظیم صورت‌حساب جدید
            </h1>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-retro-slate rounded-full border-2 border-black shadow-[2px_2px_0_0_#000000]">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-600 animate-pulse" />
              <span className="font-mono text-xs font-black text-black">
                پیش‌نویس {invoiceNumber}
              </span>
            </div>
          </div>
        </div>

        {/* متای وضعیت آنلاین و ارز فاکتور */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-black rounded-xl shadow-[2px_2px_0_0_#000000]">
            <span className="w-2.5 h-2.5 rounded-full bg-retro-mint border border-black animate-ping" />
            <span className="font-mono text-xs font-bold text-black">ذخیره خودکار: فعال</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-retro-lavender border-2 border-black rounded-xl shadow-[2px_2px_0_0_#000000]">
            <span className="text-sm">💳</span>
            <span className="font-bold text-xs text-black">ارز مبنا: {currency}</span>
          </div>
        </div>
      </section>

      {/* ۲. گرید ۱۲ ستونه واکنش‌پذیر محیط کاری صدور فاکتور */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ستون اصلی فرم‌های اجرایی (۸ ستون در دسکتاپ) */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          {leftDeck || children}
        </div>

        {/* ستون کناری سایدبار چسبان (Sticky) ماشین‌حساب صندوق و خلاصه فاکتور (۴ ستون) */}
        <div className="lg:col-span-4 sticky top-24 flex flex-col gap-4">
          {rightDeck}
        </div>
      </div>
    </div>
  );
}

export default CreateInvoicePage;
