import React from 'react';
import { Button } from '../ui/Button';

export function HeroBanner({
  userName = 'الکس مرادی',
  sprintLabel = 'اسپرینت مهر ۱۴۰۵',
  selectedPeriod = 'current_month',
  onPeriodChange,
  onNewInvoice,
}) {
  return (
    <section className="w-full flex flex-col lg:flex-row lg:items-center justify-between gap-5 p-5 md:p-6 bg-white border-[3px] border-black rounded-2xl shadow-retro">
      {/* بخش راست: پیام خوش‌آمدگویی، وضعیت اسپرینت و توضیحات */}
      <div className="flex flex-col gap-1.5 text-right">
        <div className="flex items-center gap-2.5 flex-wrap">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-black tracking-tight font-sans">
            خوش آمدید، {userName}
          </h1>
          <span className="inline-flex items-center justify-center text-2xl animate-bounce select-none">
            ⚡
          </span>
          <span className="inline-flex items-center gap-1 font-mono text-xs font-black px-3 py-1 bg-retro-yellow text-black border-2 border-black rounded-full shadow-retro-sm">
            <span>🎯</span>
            <span>{sprintLabel}</span>
          </span>
        </div>
        <p className="text-xs md:text-sm font-semibold text-neutral-600 leading-relaxed">
          خلاصه جریان نقدینگی، وضعیت تسویه فاکتورها و سلامت مالی استودیو در این دوره کاری.
        </p>
      </div>

      {/* بخش چپ: انتخاب بازه زمانی و دکمه صدور فاکتور */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* سلکتور بازه زمانی */}
        <div className="relative inline-flex items-center">
          <select
            value={selectedPeriod}
            onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
            className="appearance-none bg-white text-xs md:text-sm font-black text-black pr-4 pl-9 py-2.5 rounded-xl border-2 border-black shadow-retro-sm hover:shadow-retro focus:outline-none focus:bg-canvas cursor-pointer transition-all"
          >
            <option value="current_month">این ماه (مهر ۱۴۰۵)</option>
            <option value="last_month">ماه قبل (شهریور ۱۴۰۵)</option>
            <option value="quarter">فصل جاری (پاییز ۱۴۰۵)</option>
            <option value="year">سال مالی ۱۴۰۵</option>
          </select>
          <span className="absolute left-3 pointer-events-none text-xs font-black text-neutral-700 select-none">
            ▼
          </span>
        </div>

        {/* دکمه صدور فاکتور جدید */}
        <Button
          variant="default"
          size="default"
          className="shadow-retro hover:shadow-retro-lg gap-2 text-xs md:text-sm whitespace-nowrap"
          onClick={onNewInvoice}
        >
          <span className="text-base font-black leading-none">+</span>
          <span>صدور فاکتور جدید</span>
        </Button>
      </div>
    </section>
  );
}

export default HeroBanner;
