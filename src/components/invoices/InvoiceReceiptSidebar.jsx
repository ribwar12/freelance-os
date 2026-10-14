import React from 'react';
import { formatToman } from './InvoiceLineItemsCard';
import { toPersianDigits } from './InvoicePagination';

/**
 * سایدبار صندوق حسابداری زنده و ماشین‌حساب آنی فاکتور (گام ۴-۵)
 * برگرفته از طرح گوگل استیچ code(1).html خطوط ۲۶۵ تا ۳۶۵
 */
export function InvoiceReceiptSidebar({
  itemsCount = 3,
  grossSubtotal = 45000000,
  discountPercent = 10,
  onDiscountChange,
  isVatEnabled = true,
  onVatToggle,
  vatPercent = 10,
  clientName = 'دیجی‌کالا مارکت‌پلیس',
  onSaveInvoice,
  onPreviewPrint,
  onDiscardDraft,
  onSaveTemplate,
}) {
  // محاسبات آنی
  const discountAmount = Math.round((grossSubtotal * (discountPercent || 0)) / 100);
  const netAfterDiscount = grossSubtotal - discountAmount;
  const vatAmount = isVatEnabled ? Math.round((netAfterDiscount * (vatPercent || 10)) / 100) : 0;
  const finalTotal = netAfterDiscount + vatAmount;
  const rialEquivalent = finalTotal * 10;

  return (
    <div className="sticky top-24 flex flex-col gap-4 select-none">
      {/* کارت رسید دندانه‌دار صندوق فروشگاهی با هدر مشکی قطور */}
      <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0_0_#000000] overflow-hidden flex flex-col">
        {/* هدر باند مشکی الهام‌گرفته از صندوق فروشگاهی */}
        <div className="bg-black text-white px-5 py-4 border-b-2 border-black flex items-center justify-between">
          <div>
            <span className="font-mono text-[10px] tracking-widest text-retro-yellow block font-bold">
              صندوق حسابداری زنده • LEDGER
            </span>
            <h3 className="font-mono text-base font-black text-white mt-0.5">
              خلاصه صورت‌حساب
            </h3>
          </div>
          <span className="text-2xl p-1 bg-white/10 rounded-lg border border-white/20">
            🧾
          </span>
        </div>

        {/* محتوای درونی رسید با خطوط چین‌خورده و محاسبات */}
        <div className="p-5 flex flex-col gap-4">
          <p className="font-mono text-[11px] text-neutral-500 -mt-1 font-bold">
            محاسبه خودکار اقلام بر مبنای ریال و تومان
          </p>

          {/* تفکیک سرفصل‌های هزینه */}
          <div className="flex flex-col gap-3 font-sans text-xs border-b-2 border-dashed border-black pb-4">
            {/* ۱. جمع ناخالص خدمات */}
            <div className="flex items-center justify-between">
              <span className="text-neutral-600 font-bold">
                جمع ناخالص ({toPersianDigits(itemsCount)} قلم خدمت):
              </span>
              <span className="font-mono text-sm font-black text-black">
                {formatToman(grossSubtotal)}{' '}
                <span className="text-[10px] font-normal text-neutral-500 font-sans">تومان</span>
              </span>
            </div>

            {/* ۲. ردیف کنترلر تخفیف */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-neutral-600 font-bold">تخفیف همکاری:</span>
                <select
                  value={discountPercent}
                  onChange={(e) => onDiscountChange && onDiscountChange(Number(e.target.value))}
                  className="bg-retro-coral/20 text-black border border-black rounded px-1 py-0.5 text-[10px] font-mono font-black focus:outline-none cursor-pointer"
                >
                  <option value={0}>بدون تخفیف (۰٪)</option>
                  <option value={5}>۵٪ تخفیف</option>
                  <option value={10}>۱۰٪ اعمال شد</option>
                  <option value={15}>۱۵٪ تخفیف</option>
                  <option value={20}>۲۰٪ تخفیف ویژه</option>
                </select>
              </div>

              <span className="font-mono text-sm font-black text-retro-coral">
                {discountAmount > 0 ? `-${formatToman(discountAmount)}` : '۰'}{' '}
                <span className="text-[10px] font-normal text-neutral-500 font-sans">تومان</span>
              </span>
            </div>

            {/* ۳. خالص پس از کسر تخفیف */}
            <div className="flex items-center justify-between pt-1">
              <span className="font-black text-black">خالص پس از تخفیف:</span>
              <span className="font-mono text-sm font-black text-black">
                {formatToman(netAfterDiscount)}{' '}
                <span className="text-[10px] font-normal text-neutral-500 font-sans">تومان</span>
              </span>
            </div>

            {/* ۴. سوئیچ مالیات بر ارزش افزوده (VAT) */}
            <div className="flex items-center justify-between bg-canvas p-2.5 rounded-xl border-2 border-black mt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={isVatEnabled}
                  onChange={onVatToggle}
                  className="w-4 h-4 accent-black rounded cursor-pointer"
                />
                <span className="font-mono text-[11px] font-black text-black">
                  مالیات بر ارزش افزوده ({toPersianDigits(vatPercent)}٪)
                </span>
              </label>

              <span className="font-mono text-xs font-black text-emerald-800">
                {isVatEnabled ? `+${formatToman(vatAmount)}` : '۰'}
              </span>
            </div>
          </div>

          {/* باکس زرد پرکنتراست مبلغ نهایی قابل پرداخت (TOTAL AMOUNT DUE) */}
          <div className="bg-retro-yellow border-[3px] border-black rounded-xl p-4 shadow-[4px_4px_0_0_#000000] flex flex-col gap-1 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-black text-black tracking-wide">
                مبلغ نهایی صورت‌حساب
              </span>
              <span className="font-mono text-xs bg-black text-white px-1.5 py-0.5 rounded font-black">
                تأییدیه نهایی
              </span>
            </div>

            <div className="flex items-baseline gap-1 mt-1">
              <span className="font-mono text-2xl md:text-3xl font-black text-black tracking-tight">
                {formatToman(finalTotal)}
              </span>
              <span className="font-sans text-xs font-black text-black">تومان</span>
            </div>

            <span className="font-mono text-[10px] font-bold text-neutral-800 pt-1 border-t border-black/30 mt-1 block">
              معادل ریالی: {formatToman(rialEquivalent)} ریال
            </span>
          </div>

          {/* استک دکمه‌های اقدام و اجرای فاکتور */}
          <div className="flex flex-col gap-2.5 pt-1">
            {/* دکمه اصلی: ذخیره و صدور فاکتور رسمی */}
            <button
              type="button"
              onClick={onSaveInvoice}
              className="w-full bg-black text-white font-black text-sm py-3.5 rounded-xl border-[3px] border-black shadow-[4px_4px_0_0_#FFE600] hover:bg-neutral-800 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#FFE600] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>💾</span>
              <span>ذخیره و صدور فاکتور رسمی</span>
            </button>

            {/* دکمه ثانویه: پیش‌نمایش برگه چاپی A4 */}
            <button
              type="button"
              onClick={onPreviewPrint}
              className="w-full bg-white hover:bg-canvas text-black font-black text-xs py-3 rounded-xl border-2 border-black shadow-[3px_3px_0_0_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#000000] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🖨️</span>
              <span>پیش‌نمایش برگه چاپی A4 رسمی</span>
            </button>

            {/* لینک‌های کمکی: ذخیره به عنوان قالب و انصراف */}
            <div className="flex items-center justify-between px-1 pt-1 text-[11px] font-bold">
              <button
                type="button"
                onClick={onSaveTemplate}
                className="text-neutral-600 hover:text-black underline cursor-pointer"
              >
                ذخیره به عنوان قالب تکرارپذیر
              </button>

              <button
                type="button"
                onClick={onDiscardDraft}
                className="text-retro-coral hover:text-red-700 underline cursor-pointer"
              >
                انصراف و حذف پیش‌نویس
              </button>
            </div>
          </div>

          {/* نشان اصالت رمزنگاری و هش دفتر کل */}
          <div className="border-t-2 border-black pt-3 flex items-center gap-2 text-neutral-600">
            <span className="text-sm">🔒</span>
            <span className="font-mono text-[10px] leading-tight font-bold">
              تأییدیه دفتر کل و هش رمزنگاری سامانه حسابداری FreelanceOS
            </span>
          </div>
        </div>
      </div>

      {/* کارت جانبی شاخص سلامت و خوش‌حسابی کارفرما */}
      <div className="bg-canvas border-2 border-black rounded-xl p-3.5 shadow-retro-sm flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-mono text-[10px] font-bold text-neutral-500">
            شاخص خوش‌حسابی کارفرما
          </span>
          <span className="font-black text-xs text-black mt-0.5">
            {clientName}: ۱۰۰٪ تسویه به‌موقع
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-retro-mint border-2 border-black flex items-center justify-center font-black text-xs shadow-[1px_1px_0_0_#000000]">
          ✓
        </div>
      </div>
    </div>
  );
}

export default InvoiceReceiptSidebar;
