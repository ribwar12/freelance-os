import React from 'react';
import { toPersianDigits } from '../invoices/InvoicePagination';
import { formatToman } from '../invoices/InvoiceLineItemsCard';

/**
 * صفحه مدیریت کارفرمایان و ماتریس قراردادها (/clients)
 * برگرفته از مشخصات طرح گوگل استیچ code(4).html
 */
export function ClientsPage({
  clientsList = [],
  onOpenNewClientModal,
  onSelectClientForInvoice,
}) {
  return (
    <div className="flex flex-col gap-6 w-full select-none pb-12">
      {/* هدر صفحه و دکمه اقدام سریع */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-retro-mint border-2 border-black shadow-[3px_3px_0_0_#000000] flex items-center justify-center font-black text-xl">
            👥
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-mono text-xl font-black text-black">
                باشگاه کارفرمایان و ماتریس قراردادها
              </h1>
              <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded-full bg-retro-yellow border border-black">
                DIR: /CLIENTS_LEDGER
              </span>
            </div>
            <p className="text-xs font-bold text-neutral-600 mt-0.5">
              مدیریت شرکای تجاری، استعلام کدهای مالیاتی و قراردادهای فعال استودیو
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenNewClientModal}
          className="bg-black text-white hover:bg-neutral-800 text-xs font-black px-4 py-3 rounded-xl border-2 border-black shadow-[3px_3px_0_0_#FFE600] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FFE600] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>➕</span>
          <span>ثبت کارفرمای جدید</span>
        </button>
      </div>

      {/* نوار شاخص‌های کلیدی کارفرمایان (KPI Strip) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">کارفرمایان ثبت‌شده</span>
          <div className="font-mono text-2xl font-black text-black">
            {toPersianDigits(clientsList.length)} <span className="text-xs font-bold">شرکت معتبر</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold block pt-1 border-t border-neutral-200">
            ✓ ۱۰۰٪ استعلام سامانه مودیان
          </span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">ارزش کل قراردادها</span>
          <div className="font-mono text-2xl font-black text-black">
            ۸۴۲,۵۰۰,۰۰۰ <span className="text-xs font-bold">تومان</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold block pt-1 border-t border-neutral-200">
            ✓ پایپ‌لاین مالی فعال ۱۴۰۵
          </span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">میانگین موعد تسویه</span>
          <div className="font-mono text-2xl font-black text-black">
            Net 18 <span className="text-xs font-bold">روزه</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold block pt-1 border-t border-neutral-200">
            ✓ سرعت وصول عالی (Velocity)
          </span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">ضریب خوش‌حسابی</span>
          <div className="font-mono text-2xl font-black text-black">
            ۱۰۰٪ <span className="text-xs font-bold">تسویه به‌موقع</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold block pt-1 border-t border-neutral-200">
            ✓ بدون بدهی سوخت‌شده
          </span>
        </div>
      </div>

      {/* شبکه کارت‌های کارفرمایان */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {clientsList.map((client) => (
          <div
            key={client.id}
            className="bg-white border-[3px] border-black rounded-2xl p-5 shadow-[4px_4px_0_0_#000000] hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#000000] transition-all flex flex-col justify-between gap-4"
          >
            <div>
              <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-black">
                <span className="font-mono text-[10px] font-black px-2 py-0.5 bg-canvas rounded border border-black text-neutral-700">
                  {client.poPrefix || 'CORP'}
                </span>
                <span className="font-mono text-[10px] font-black px-2 py-0.5 bg-retro-mint rounded-full border border-black text-emerald-950">
                  مؤدی تأییدشده ✓
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-mono text-base font-black text-black leading-tight">
                  {client.name}
                </h3>
                <p className="text-xs font-bold text-neutral-600 line-clamp-1">
                  {client.company}
                </p>
                <p className="text-[11px] text-neutral-500 font-bold">
                  {client.dept}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-neutral-200 space-y-1.5 font-mono text-xs">
                <div className="flex justify-between items-center bg-canvas p-1.5 rounded border border-black/30">
                  <span className="text-neutral-500 text-[10px]">نماینده / مدیر پروژه:</span>
                  <span className="font-bold text-black text-[11px]">{client.attn}</span>
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                  <div className="bg-canvas p-1 rounded border border-black/30 flex justify-between">
                    <span className="text-neutral-500">شناسه:</span>
                    <span className="font-bold text-black">{client.nationalId}</span>
                  </div>
                  <div className="bg-canvas p-1 rounded border border-black/30 flex justify-between">
                    <span className="text-neutral-500">اقتصادی:</span>
                    <span className="font-bold text-black">{client.ecoCode}</span>
                  </div>
                </div>
                <div className="text-[10px] text-neutral-600 font-bold pt-1">
                  <span>نشانی: {client.address}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t-2 border-black flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] font-bold text-neutral-500">
                تسویه: {client.terms === 'net-15' ? '۱۵ روزه' : '۲۱ روزه'}
              </span>

              <button
                type="button"
                onClick={() => onSelectClientForInvoice && onSelectClientForInvoice(client.id)}
                className="bg-retro-yellow text-black hover:bg-yellow-400 font-black text-xs px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer flex items-center gap-1"
              >
                <span>🧾</span>
                <span>صدور فاکتور</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClientsPage;
