import React from 'react';

export function InvoiceSummaryStrip({ stats }) {
  const defaultStats = {
    totalInvoiced: {
      title: 'مجموع صورت‌حساب‌ها',
      badge: '۴۲ فاکتور',
      amount: '۱۶۲,۷۰۰,۰۰۰',
      trend: '↑ ۱۴.۸٪',
      trendSub: 'رشد نسبت به فصل قبل',
      stripeColor: 'bg-retro-mint',
    },
    pending: {
      title: 'در انتظار وصول / معلق',
      badge: '۵ فاکتور باز',
      amount: '۳۸,۲۰۰,۰۰۰',
      note: 'میانگین دوره تسویه: ۱۲ روز کاری',
      stripeColor: 'bg-retro-tangerine',
    },
    overdue: {
      title: 'معوقات سررسید گذشته',
      badge: '۲ بحرانی',
      amount: '۱۸,۵۰۰,۰۰۰',
      warning: 'نیازمند پیگیری فوری: کافه بازار (۲۲+ روز تاخیر)',
      stripeColor: 'bg-retro-coral',
    },
  };

  const data = stats || defaultStats;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 my-2">
      {/* کارت ۱: کل مبالغ فاکتور شده */}
      <div className="relative bg-white border-2 border-black rounded-xl p-4 md:p-5 shadow-retro overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-retro-lg transition-all select-none">
        {/* نوار رنگی فوقانی ۸ پیکسلی استیچ */}
        <div className={`absolute top-0 left-0 right-0 h-2 ${data.totalInvoiced.stripeColor} border-b-2 border-black`} />

        <div className="flex items-center justify-between mb-3 pt-1">
          <span className="text-xs font-black text-neutral-700 flex items-center gap-1.5">
            <span>💳</span>
            <span>{data.totalInvoiced.title}</span>
          </span>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-canvas border border-black rounded-full shadow-[1px_1px_0px_#000000]">
            {data.totalInvoiced.badge}
          </span>
        </div>

        <div>
          <div className="font-mono text-xl md:text-2xl font-black text-black tracking-tight flex items-baseline gap-1.5">
            <span>{data.totalInvoiced.amount}</span>
            <span className="text-xs font-bold text-emerald-700 font-sans">تومان</span>
          </div>
          <div className="text-[11px] font-bold text-neutral-600 mt-1.5 flex items-center gap-1">
            <span className="text-emerald-700 font-black">{data.totalInvoiced.trend}</span>
            <span>{data.totalInvoiced.trendSub}</span>
          </div>
        </div>
      </div>

      {/* کارت ۲: مبالغ در انتظار واریز */}
      <div className="relative bg-white border-2 border-black rounded-xl p-4 md:p-5 shadow-retro overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-retro-lg transition-all select-none">
        {/* نوار رنگی فوقانی */}
        <div className={`absolute top-0 left-0 right-0 h-2 ${data.pending.stripeColor} border-b-2 border-black`} />

        <div className="flex items-center justify-between mb-3 pt-1">
          <span className="text-xs font-black text-neutral-700 flex items-center gap-1.5">
            <span>⏳</span>
            <span>{data.pending.title}</span>
          </span>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-retro-yellow/30 border border-black rounded-full shadow-[1px_1px_0px_#000000]">
            {data.pending.badge}
          </span>
        </div>

        <div>
          <div className="font-mono text-xl md:text-2xl font-black text-black tracking-tight flex items-baseline gap-1.5">
            <span>{data.pending.amount}</span>
            <span className="text-xs font-bold text-neutral-700 font-sans">تومان</span>
          </div>
          <div className="text-[11px] font-bold text-neutral-600 mt-1.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-retro-tangerine border border-black" />
            <span>{data.pending.note}</span>
          </div>
        </div>
      </div>

      {/* کارت ۳: معوقات بحرانی و نیازمند پیگیری */}
      <div className="relative bg-white border-2 border-black rounded-xl p-4 md:p-5 shadow-retro overflow-hidden flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-retro-lg transition-all select-none">
        {/* نوار رنگی فوقانی */}
        <div className={`absolute top-0 left-0 right-0 h-2 ${data.overdue.stripeColor} border-b-2 border-black`} />

        <div className="flex items-center justify-between mb-3 pt-1">
          <span className="text-xs font-black text-neutral-700 flex items-center gap-1.5">
            <span>⚠️</span>
            <span>{data.overdue.title}</span>
          </span>
          <span className="font-mono text-[10px] font-bold px-2 py-0.5 bg-retro-coral/30 text-rose-700 border border-black rounded-full shadow-[1px_1px_0px_#000000]">
            {data.overdue.badge}
          </span>
        </div>

        <div>
          <div className="font-mono text-xl md:text-2xl font-black text-retro-coral tracking-tight flex items-baseline gap-1.5">
            <span>{data.overdue.amount}</span>
            <span className="text-xs font-bold text-black font-sans">تومان</span>
          </div>
          <div className="text-[11px] font-bold text-neutral-600 mt-1.5 flex items-center gap-1">
            <span className="font-black text-rose-600">پیگیری:</span>
            <span className="truncate">{data.overdue.warning}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvoiceSummaryStrip;
