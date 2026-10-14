import React from 'react';
import { toPersianDigits } from './InvoicePagination';

/**
 * تبدیل اعداد به فرمت پولی ۳ رقم ۳ رقم با ارقام فارسی
 */
export function formatToman(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '۰';
  const parts = Math.round(amount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return toPersianDigits(parts);
}

// لیست آیتم‌های اولیه برگرفته از اسکوپ دیزاین سیستم دیجی‌کالا در طرح گوگل استیچ
export const INITIAL_LINE_ITEMS = [
  {
    id: 'item-1',
    title: 'ممیزی دیزاین سیستم و معماری توکن‌ها',
    description: 'بازبینی کامپوننت لایبرری در Figma و ساختار توکن‌های چندسکویی',
    qty: 40,
    unit: 'ساعت',
    rate: 650000,
  },
  {
    id: 'item-2',
    title: 'پروتوتایپ تعاملی و میکرواینترکشن‌ها',
    description: 'پروتوتایپ فرانت‌اند برای فلوی سبد خرید، چک‌اوت و کدهای تخفیف',
    qty: 25,
    unit: 'ساعت',
    rate: 600000,
  },
  {
    id: 'item-3',
    title: 'ورکشاپ و مستندات تحویل فنی فرانت‌اند',
    description: '۲ جلسه رفع اشکال مهندسی فرانت‌اند + داکیومنت همگام‌سازی استوری‌بوک',
    qty: 1,
    unit: 'پکیج',
    rate: 4000000,
  },
];

/**
 * کارت ۲: جدول پویا و تعاملی اقلام و خدمات قابل فاکتور (گام ۴-۳)
 * برگرفته از طرح گوگل استیچ code(1).html خطوط ۱۱۷ تا ۲۱۸
 */
export function InvoiceLineItemsCard({
  items = INITIAL_LINE_ITEMS,
  onAddItem,
  onUpdateItem,
  onDeleteItem,
  onImportTimesheet,
}) {
  return (
    <section className="bg-white border-[3px] border-black rounded-2xl p-5 md:p-6 shadow-retro select-none flex flex-col gap-5">
      {/* هدر کارت شماره ۲ با بج نعنایی نئوبروتال */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 flex items-center justify-center bg-retro-mint border-2 border-black font-mono font-black text-sm rounded-lg shadow-[2px_2px_0_0_#000000]">
            ۲
          </span>
          <div>
            <h2 className="font-black text-base md:text-lg text-black font-sans leading-tight">
              شرح خدمات، ساعت کارکرد و اقلام تحویلی
            </h2>
            <p className="text-[11px] font-bold text-neutral-500">
              جدول محاسبه آنی کارکرد، نرخ ساعتی و ارزش کل خدمات تحویلی به کارفرما
            </p>
          </div>
        </div>

        <span className="font-mono text-xs font-black text-black bg-retro-yellow px-3 py-1 rounded-full border-2 border-black shadow-[1px_1px_0_0_#000000]">
          {toPersianDigits(items.length)} ردیف خدمت بارگذاری شد
        </span>
      </div>

      {/* جدول قطور نئوبروتال ردیف‌های اقلام */}
      <div className="border-2 border-black rounded-xl overflow-x-auto shadow-retro-sm bg-white">
        <table className="w-full text-right border-collapse min-w-[640px]">
          <thead>
            <tr className="bg-retro-slate/50 border-b-2 border-black text-xs font-black text-black">
              <th className="py-3 px-3 w-12 text-center border-l-2 border-black font-mono">#</th>
              <th className="py-3 px-4 border-l-2 border-black">شرح خدمت و دامنه کار (Scope)</th>
              <th className="py-3 px-3 w-28 text-center border-l-2 border-black">ساعت / تعداد</th>
              <th className="py-3 px-3 w-36 text-left border-l-2 border-black font-mono">نرخ واحد (تومان)</th>
              <th className="py-3 px-4 w-40 text-left border-l-2 border-black font-mono">جمع کل سطر</th>
              <th className="py-3 px-2 w-12 text-center">حذف</th>
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-black text-xs md:text-sm">
            {items.map((item, index) => {
              const rowTotal = (Number(item.qty) || 0) * (Number(item.rate) || 0);

              return (
                <tr
                  key={item.id}
                  className="hover:bg-retro-yellow/10 transition-colors group"
                >
                  {/* شماره ردیف دو رقمی */}
                  <td className="py-3.5 px-3 font-mono font-black text-center border-l-2 border-black text-neutral-600 bg-neutral-50/50">
                    {toPersianDigits((index + 1).toString().padStart(2, '0'))}
                  </td>

                  {/* شرح و توضیحات خدمت (اینپوت‌های تعاملی) */}
                  <td className="py-3 px-4 border-l-2 border-black">
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => onUpdateItem && onUpdateItem(item.id, 'title', e.target.value)}
                      placeholder="عنوان خدمت تحویلی..."
                      className="w-full font-black text-black text-xs md:text-sm bg-transparent border-b border-transparent focus:border-black focus:outline-none placeholder:text-neutral-400 py-0.5"
                    />
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => onUpdateItem && onUpdateItem(item.id, 'description', e.target.value)}
                      placeholder="توضیحات و جزئیات تکمیلی..."
                      className="w-full text-[11px] font-bold text-neutral-500 bg-transparent border-b border-transparent focus:border-black focus:outline-none placeholder:text-neutral-400 mt-1 py-0.5"
                    />
                  </td>

                  {/* ساعت / تعداد کارکرد */}
                  <td className="py-3 px-3 border-l-2 border-black text-center">
                    <div className="flex items-center justify-center gap-1">
                      <input
                        type="number"
                        min="1"
                        value={item.qty}
                        onChange={(e) => onUpdateItem && onUpdateItem(item.id, 'qty', Math.max(1, Number(e.target.value) || 0))}
                        className="w-14 text-center font-mono font-black text-xs md:text-sm bg-canvas border border-black rounded-md py-1 focus:bg-white focus:outline-none shadow-[1px_1px_0_0_#000000]"
                      />
                      <span className="text-[10px] font-bold text-neutral-600">
                        {item.unit || 'ساعت'}
                      </span>
                    </div>
                  </td>

                  {/* نرخ واحد بر حسب تومان */}
                  <td className="py-3 px-3 border-l-2 border-black text-left">
                    <input
                      type="number"
                      step="50000"
                      min="0"
                      value={item.rate}
                      onChange={(e) => onUpdateItem && onUpdateItem(item.id, 'rate', Math.max(0, Number(e.target.value) || 0))}
                      className="w-full text-left font-mono font-bold text-xs md:text-sm bg-transparent border-b border-transparent focus:border-black focus:outline-none py-1"
                    />
                    <span className="font-mono text-[10px] text-neutral-400 block text-left">
                      {formatToman(item.rate)}
                    </span>
                  </td>

                  {/* مبلغ کل سطر (محاسبه خودکار) */}
                  <td className="py-3 px-4 border-l-2 border-black text-left font-mono font-black text-black text-xs md:text-sm">
                    <span>{formatToman(rowTotal)}</span>
                    <span className="text-[10px] text-neutral-500 mr-1 font-sans font-normal">تومان</span>
                  </td>

                  {/* دکمه حذف سطر با تایید استایل نئوبروتال */}
                  <td className="py-3 px-2 text-center">
                    <button
                      type="button"
                      title="حذف این سطر"
                      disabled={items.length <= 1}
                      onClick={() => onDeleteItem && onDeleteItem(item.id)}
                      className={`w-8 h-8 rounded-lg border-2 border-black flex items-center justify-center transition-all ${
                        items.length <= 1
                          ? 'bg-neutral-100 text-neutral-300 border-neutral-300 cursor-not-allowed'
                          : 'bg-white text-black hover:bg-retro-coral active:translate-x-0.5 active:translate-y-0.5 shadow-[1px_1px_0_0_#000000] cursor-pointer'
                      }`}
                    >
                      <span>🗑️</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* دکمه‌های اقدام زیر جدول */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
        {/* دکمه افزودن سطر نو */}
        <button
          type="button"
          onClick={onAddItem}
          className="bg-white hover:bg-retro-yellow text-black font-black text-xs md:text-sm px-4 py-2.5 rounded-xl border-2 border-black shadow-[3px_3px_0_0_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#000000] transition-all flex items-center gap-2 cursor-pointer"
        >
          <span className="text-base font-black">+</span>
          <span>افزودن سطر خدمات جدید</span>
        </button>

        {/* دکمه وارد کردن از تایم‌شیت کارکرد پروژه */}
        <button
          type="button"
          onClick={onImportTimesheet}
          className="bg-canvas hover:bg-white text-neutral-700 hover:text-black font-bold text-xs px-3.5 py-2.5 rounded-xl border-2 border-dashed border-black hover:border-solid transition-all flex items-center gap-2 cursor-pointer shadow-retro-sm"
        >
          <span>⏱️</span>
          <span>دریافت کارکرد ثبت‌شده از تایم‌شیت</span>
        </button>
      </div>
    </section>
  );
}

export default InvoiceLineItemsCard;
