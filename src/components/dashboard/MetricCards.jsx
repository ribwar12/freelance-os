import React from 'react';

// کامپوننت تک‌کارت شاخص عملکرد
export function MetricCard({
  title,
  badge,
  amount,
  currency,
  footerText,
  footerIcon,
  bgClass = 'bg-retro-mint',
}) {
  return (
    <div
      className={`${bgClass} border-[3px] border-black rounded-2xl p-5 shadow-retro flex flex-col justify-between relative overflow-hidden transition-all duration-150 hover:-translate-y-1 hover:shadow-retro-lg select-none`}
    >
      {/* ردیف بالا: عنوان کارت و نشان وضعیت */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-black text-black">
          {title}
        </span>
        <span className="bg-white font-mono text-[11px] font-black text-black px-2.5 py-0.5 rounded-full border-2 border-black shadow-retro-sm">
          {badge}
        </span>
      </div>

      {/* ردیف میانی: مقدار شاخص و توضیحات واحد */}
      <div className="my-4">
        <div className="text-2xl md:text-3xl font-mono font-black text-black tracking-tight">
          {amount}
        </div>
        <span className="text-xs font-bold text-black/85 mt-1 block">
          {currency}
        </span>
      </div>

      {/* ردیف پایین: حاشیه مشکی، پیام تکمیلی و آیکون */}
      <div className="pt-3 border-t-2 border-black flex items-center justify-between text-black text-xs font-bold">
        <span>{footerText}</span>
        <span className="text-sm font-black">{footerIcon}</span>
      </div>
    </div>
  );
}

// کامپوننت شبکه ۴تایی کارت‌های شاخص عملکرد (KPI Grid)
export function MetricCards({ metrics }) {
  const defaultMetrics = [
    {
      id: 'revenue',
      title: 'درآمد کل وصول شده',
      badge: '+۱۸.۴٪ ↗',
      amount: '۱۲۴,۵۰۰,۰۰۰',
      currency: 'تومان • تسویه نهایی',
      footerText: '۳۴ فاکتور پرداخت شده',
      footerIcon: '✓',
      bgClass: 'bg-retro-mint',
    },
    {
      id: 'pending',
      title: 'در انتظار وصول',
      badge: 'نیازمند پیگیری',
      amount: '۳۸,۲۰۰,۰۰۰',
      currency: 'تومان • ۵ صورت‌حساب',
      footerText: '۵ فاکتور در انتظار پرداخت',
      footerIcon: '⏳',
      bgClass: 'bg-retro-yellow',
    },
    {
      id: 'projects',
      title: 'پایپ‌لاین پروژه‌ها',
      badge: '۲ موعد نزدیک',
      amount: '۷ پروژه فعال',
      currency: '۳ اسپرینت تحویل شده',
      footerText: '۲ تحویل تا انتهای هفته',
      footerIcon: '🚀',
      bgClass: 'bg-retro-lavender',
    },
    {
      id: 'clients',
      title: 'باشگاه مشتریان',
      badge: '+۲ مشتری جدید',
      amount: '۱۸ مشتری',
      currency: 'شرکت‌ها و استارتاپ‌ها',
      footerText: '۳ قرارداد جدید این ماه',
      footerIcon: '👥',
      bgClass: 'bg-retro-coral',
    },
  ];

  const data = metrics || defaultMetrics;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-5">
      {data.map((item) => (
        <MetricCard
          key={item.id}
          title={item.title}
          badge={item.badge}
          amount={item.amount}
          currency={item.currency}
          footerText={item.footerText}
          footerIcon={item.footerIcon}
          bgClass={item.bgClass}
        />
      ))}
    </section>
  );
}

export default MetricCards;
