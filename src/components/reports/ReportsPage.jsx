import React from 'react';
import { toPersianDigits } from '../invoices/InvoicePagination';
import { formatToman } from '../invoices/InvoiceLineItemsCard';

/**
 * صفحه آنالیز جامع مالی و رشد فصلی (/reports)
 * گزارشات ارزش افزوده (VAT)، عملکرد نقدینگی و صدور کارنامه مالیاتی
 */
export function ReportsPage({ onExportCsv, onPrintTaxSummary }) {
  return (
    <div className="flex flex-col gap-6 w-full select-none pb-12">
      {/* هدر صفحه و دکمه‌های اکسپورت */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-retro-yellow border-2 border-black shadow-[3px_3px_0_0_#000000] flex items-center justify-center font-black text-xl">
            📊
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-mono text-xl font-black text-black">
                گزارشات جامع مالی و ترازنامه استودیو
              </h1>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-retro-mint border border-black shadow-[1px_1px_0px_#000000]">
                سال مالی ۱۴۰۵
              </span>
            </div>
            <p className="text-xs font-bold text-neutral-600 mt-0.5">
              آنالیز گردش حساب، مالیات بر ارزش افزوده (VAT)، نرخ تخفیف‌ها و تراز دریافتی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onExportCsv}
            className="bg-white hover:bg-canvas text-black text-xs font-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>📥</span>
            <span>خروجی اکسل / CSV</span>
          </button>

          <button
            type="button"
            onClick={onPrintTaxSummary}
            className="bg-retro-yellow hover:bg-yellow-400 text-black text-xs font-black px-4 py-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <span>🖨️</span>
            <span>چاپ کارنامه فصلی A4</span>
          </button>
        </div>
      </div>

      {/* کارت‌های تراز مالی کل */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">مجموع درآمد ناخالص سالانه</span>
          <div className="font-mono text-2xl font-black text-black">
            ۴۸۲,۰۰۰,۰۰۰ <span className="text-xs font-bold">تومان</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold block pt-1 border-t border-neutral-200">
            ↗ ۲۴.۳٪ رشد نسبت به دوره مشابه
          </span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">مالیات ارزش افزوده (VAT)</span>
          <div className="font-mono text-2xl font-black text-emerald-800">
            ۴۳,۸۰۰,۰۰۰ <span className="text-xs font-bold">تومان</span>
          </div>
          <span className="text-[10px] text-neutral-600 font-bold block pt-1 border-t border-neutral-200">
            ✓ تسویه‌شده در سامانه سازمان امور مالیاتی
          </span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">تخفیف‌های تجاری همکاری</span>
          <div className="font-mono text-2xl font-black text-retro-coral">
            ۱۸,۴۰۰,۰۰۰ <span className="text-xs font-bold">تومان</span>
          </div>
          <span className="text-[10px] text-neutral-600 font-bold block pt-1 border-t border-neutral-200">
            میانگین ۳.۸٪ تخفیف قراردادهای بلندمدت
          </span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">خالص دریافتی واریز به حساب</span>
          <div className="font-mono text-2xl font-black text-black">
            ۴۶۳,۶۰۰,۰۰۰ <span className="text-xs font-bold">تومان</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold block pt-1 border-t border-neutral-200">
            ✓ نقدینگی قطعی واریزی بانک سامان
          </span>
        </div>
      </div>

      {/* تفکیک عملکرد فصلی و سلامت اعتباری */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* گزارش فصلی */}
        <div className="bg-white border-[3px] border-black rounded-2xl p-5 shadow-[4px_4px_0_0_#000000] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-black">
            <h3 className="font-mono text-sm font-black text-black flex items-center gap-1.5">
              <span>📅</span>
              <span>تراز عملکرد فصول سال ۱۴۰۵</span>
            </h3>
            <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-canvas rounded border border-black">
              ۴ فصل مالی
            </span>
          </div>

          <div className="space-y-3 font-mono text-xs font-bold">
            <div className="flex items-center justify-between p-2.5 rounded-lg border border-black bg-canvas">
              <div>
                <span className="text-black font-black">بهار ۱۴۰۵ (Spring Tranche):</span>
                <span className="text-neutral-500 text-[10px] block font-sans">۲۴ فاکتور تسویه قطعی</span>
              </div>
              <span className="font-black text-black">۱۱۸,۵۰۰,۰۰۰ تومان</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-black bg-canvas">
              <div>
                <span className="text-black font-black">تابستان ۱۴۰۵ (Summer Tranche):</span>
                <span className="text-neutral-500 text-[10px] block font-sans">۳۱ فاکتور تسویه قطعی</span>
              </div>
              <span className="font-black text-black">۱۴۲,۰۰۰,۰۰۰ تومان</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border-2 border-black bg-retro-yellow/40">
              <div>
                <span className="text-black font-black">پاییز ۱۴۰۵ (Autumn Active):</span>
                <span className="text-neutral-600 text-[10px] block font-sans">در حال صدور اسپرینت‌ها</span>
              </div>
              <span className="font-black text-black">۱۲۴,۵۰۰,۰۰۰ تومان</span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg border border-black/50 bg-neutral-100 opacity-60">
              <div>
                <span className="text-black">زمستان ۱۴۰۵ (Winter Pipeline):</span>
                <span className="text-neutral-500 text-[10px] block font-sans">پیش‌بینی قراردادهای منعقد شده</span>
              </div>
              <span className="text-neutral-700">۹۷,۰۰۰,۰۰۰ تومان</span>
            </div>
          </div>
        </div>

        {/* کانال‌های واریز شتابی */}
        <div className="bg-white border-[3px] border-black rounded-2xl p-5 shadow-[4px_4px_0_0_#000000] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b-2 border-black">
            <h3 className="font-mono text-sm font-black text-black flex items-center gap-1.5">
              <span>💳</span>
              <span>تفکیک درگاه‌ها و تسویه‌های بانکی</span>
            </h3>
            <span className="font-mono text-[10px] font-black px-2 py-0.5 bg-retro-mint rounded border border-black text-emerald-950">
              شبکه شتاب
            </span>
          </div>

          <div className="space-y-3 text-xs font-bold">
            <div className="p-3 rounded-xl border border-black bg-canvas space-y-1">
              <div className="flex justify-between items-center font-mono">
                <span className="text-black font-black">حواله ساتنا / پایا حساب شبا سامان:</span>
                <span className="font-black text-black">۷۸٪ کل وجوه</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-200 border border-black overflow-hidden">
                <div className="w-[78%] h-full bg-retro-mint"></div>
              </div>
              <p className="text-[10px] text-neutral-500 font-mono">
                سقف‌های کلان شرکتی دیجی‌کالا، اسنپ‌پی و دیوار
              </p>
            </div>

            <div className="p-3 rounded-xl border border-black bg-canvas space-y-1">
              <div className="flex justify-between items-center font-mono">
                <span className="text-black font-black">کارت به کارت شتابی (کارهای فوری):</span>
                <span className="font-black text-black">۱۶٪ کل وجوه</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-200 border border-black overflow-hidden">
                <div className="w-[16%] h-full bg-retro-yellow"></div>
              </div>
              <p className="text-[10px] text-neutral-500 font-mono">
                تسویه‌های فوری اسپرینت‌های زیر ۵۰ میلیون تومان
              </p>
            </div>

            <div className="p-3 rounded-xl border border-black bg-canvas space-y-1">
              <div className="flex justify-between items-center font-mono">
                <span className="text-black font-black">درگاه ارزی / فین‌تک کریپتو:</span>
                <span className="font-black text-black">۶٪ کل وجوه</span>
              </div>
              <div className="w-full h-2 rounded-full bg-neutral-200 border border-black overflow-hidden">
                <div className="w-[6%] h-full bg-retro-coral"></div>
              </div>
              <p className="text-[10px] text-neutral-500 font-mono">
                تسویه‌های ارزی تتر و یورو مشتریان بین‌المللی
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportsPage;
