import React, { useState } from 'react';
import { toPersianDigits } from './InvoicePagination';

export const DEFAULT_PAYMENT_TERMS =
  'مهلت پرداخت ظرف ۲۱ روز پس از صدور فاکتور می‌باشد. تسویه از طریق حواله پایا/ساتنا به شماره شبای پیوست در اولویت است. هرگونه تاخیر بیش از موعد مشمول ۲.۵ درصد کارمزد تاخیر ماهانه خواهد بود. مالکیت مادی و معنوی کلیه طرح‌ها و سورس‌کدهای تحویلی اسپرینت پس از تسویه کامل صورت‌حساب به کارفرما منتقل خواهد شد.';

/**
 * کارت ۳: یادداشت‌ها، شرایط حقوقی و اطلاعات تسویه بانکی (گام ۴-۴)
 * برگرفته از طرح گوگل استیچ code(1).html خطوط ۲۱۹ تا ۲۶۴
 */
export function InvoicePaymentNotesCard({
  notes = DEFAULT_PAYMENT_TERMS,
  onNotesChange,
  bankName = 'بانک سامان — حساب جاری عملیاتی استودیو',
  accountHolder = 'الکس مرادی (مدیر اجرایی FreelanceOS)',
  sheba = 'IR82 0560 0840 8000 0124 5592 01',
  cardNumber = '6219 8610 4421 9083',
  onCopyFeedback,
}) {
  const [copiedType, setCopiedType] = useState(null);

  const handleCopy = (text, type, label) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedType(type);
      if (onCopyFeedback) {
        onCopyFeedback(`${label} با موفقیت در کلیپ‌بورد کپی شد! 📋`);
      }
      setTimeout(() => setCopiedType(null), 2500);
    }
  };

  return (
    <section className="bg-white border-[3px] border-black rounded-2xl p-5 md:p-6 shadow-retro select-none flex flex-col gap-5">
      {/* هدر کارت شماره ۳ با بج بنفش لواندر نئوبروتال */}
      <div className="flex items-center justify-between pb-4 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 flex items-center justify-center bg-retro-lavender border-2 border-black font-mono font-black text-sm rounded-lg shadow-[2px_2px_0_0_#000000]">
            ۳
          </span>
          <div>
            <h2 className="font-black text-base md:text-lg text-black font-sans leading-tight">
              شرایط تسویه، یادداشت‌های حقوقی و حساب بانکی
            </h2>
            <p className="text-[11px] font-bold text-neutral-500">
              مقررات انتقال مالکیت کار، شماره شبای شاپرک و اطلاعات واریز دستمزد
            </p>
          </div>
        </div>

        <span className="font-mono text-[10px] font-black text-black bg-retro-slate px-2.5 py-1 rounded-lg border-2 border-black shadow-[1px_1px_0_0_#000000]">
          بخش: حقوقی / شبا
        </span>
      </div>

      {/* گرید دو ستونه: متن شروط و باکس کارت بانکی */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* ستون راست: تکست‌اریا شرایط قرارداد و یادداشت کارفرما */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs font-black text-black flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <span>📜</span>
              <span>یادداشت‌های حقوقی و شرایط پرداخت:</span>
            </span>
            <span className="text-[10px] text-neutral-500 font-normal">
              {toPersianDigits(notes.length)} کاراکتر
            </span>
          </label>

          <textarea
            rows="6"
            value={notes}
            onChange={(e) => onNotesChange && onNotesChange(e.target.value)}
            placeholder="شرایط و یادداشت‌های تسویه..."
            className="w-full bg-white border-2 border-black rounded-xl p-3 font-sans text-xs md:text-sm font-semibold text-neutral-800 leading-relaxed focus:outline-none focus:bg-canvas shadow-[2px_2px_0_0_#000000] transition-colors resize-none"
          />
        </div>

        {/* ستون چپ: باکس اطلاعات بانکی و شماره شبای تأییدشده */}
        <div className="bg-retro-mint/25 border-2 border-black rounded-2xl p-4 shadow-retro-sm flex flex-col justify-between gap-4">
          <div>
            {/* عنوان باکس بانکی و برچسب وریفای */}
            <div className="flex items-center justify-between mb-2 pb-2 border-b-2 border-black/20">
              <span className="font-mono text-xs font-black text-emerald-900 flex items-center gap-1.5">
                <span>🏦</span>
                <span>اطلاعات حساب واریز وجوه</span>
              </span>
              <span className="px-2 py-0.5 bg-retro-mint border border-black rounded text-[10px] font-mono font-black text-black shadow-[1px_1px_0_0_#000000]">
                حساب تاییدشده
              </span>
            </div>

            <p className="font-black text-xs md:text-sm text-black leading-tight">
              {bankName}
            </p>
            <p className="text-[11px] font-bold text-neutral-600 mt-1">
              صاحب حساب: {accountHolder}
            </p>
          </div>

          {/* فیلدهای شبا و کارت همراه با دکمه کپی فوری */}
          <div className="space-y-2 pt-2 border-t-2 border-black">
            {/* ردیف شماره شبا */}
            <div className="flex items-center justify-between bg-white border-2 border-black rounded-xl p-2 shadow-[1px_1px_0_0_#000000]">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="font-mono text-[10px] font-black text-neutral-500 bg-neutral-100 px-1 rounded">
                  شبا:
                </span>
                <span className="font-mono font-black text-xs text-black tracking-wider truncate select-all" dir="ltr">
                  {sheba}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(sheba.replace(/\s+/g, ''), 'sheba', 'شماره شبا')}
                className={`text-[11px] font-black px-2.5 py-1 rounded-lg border border-black transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  copiedType === 'sheba'
                    ? 'bg-retro-mint text-black'
                    : 'bg-white hover:bg-retro-yellow active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <span>{copiedType === 'sheba' ? '✓' : '📋'}</span>
                <span>{copiedType === 'sheba' ? 'کپی شد!' : 'کپی شبا'}</span>
              </button>
            </div>

            {/* ردیف شماره کارت بانکی */}
            <div className="flex items-center justify-between bg-white border-2 border-black rounded-xl p-2 shadow-[1px_1px_0_0_#000000]">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="font-mono text-[10px] font-black text-neutral-500 bg-neutral-100 px-1 rounded">
                  کارت:
                </span>
                <span className="font-mono font-black text-xs text-black tracking-widest truncate select-all" dir="ltr">
                  {cardNumber}
                </span>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(cardNumber.replace(/\s+/g, ''), 'card', 'شماره کارت')}
                className={`text-[11px] font-black px-2.5 py-1 rounded-lg border border-black transition-all cursor-pointer flex items-center gap-1 shrink-0 ${
                  copiedType === 'card'
                    ? 'bg-retro-mint text-black'
                    : 'bg-white hover:bg-retro-yellow active:translate-x-0.5 active:translate-y-0.5'
                }`}
              >
                <span>{copiedType === 'card' ? '✓' : '📋'}</span>
                <span>{copiedType === 'card' ? 'کپی شد!' : 'کپی کارت'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InvoicePaymentNotesCard;
