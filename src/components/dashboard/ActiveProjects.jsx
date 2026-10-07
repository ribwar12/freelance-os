import React from 'react';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

// داده‌های نمونه ۴ پروژه فعال استودیو
const SAMPLE_PROJECTS = [
  {
    id: 'proj-1',
    name: 'اپلیکیشن اسنپ‌پی',
    budget: '۳۲ میلیون تومان',
    progress: 85,
    daysLeft: 3,
    deadlineLabel: '۳ روز مانده',
    deadlineType: 'warning',  // warning = زرد
    barColor: 'bg-retro-yellow',
  },
  {
    id: 'proj-2',
    name: 'سیستم دیجی‌کالا',
    budget: '۴۵ میلیون تومان',
    progress: 40,
    daysLeft: 12,
    deadlineLabel: '۱۲ روز مانده',
    deadlineType: 'normal',   // normal = طوسی
    barColor: 'bg-retro-lavender',
  },
  {
    id: 'proj-3',
    name: 'برندینگ کافه بازار',
    budget: '۱۸.۵ میلیون تومان',
    progress: 95,
    daysLeft: 0,
    deadlineLabel: 'فوری • امروز!',
    deadlineType: 'urgent',   // urgent = قرمز
    barColor: 'bg-retro-coral',
  },
  {
    id: 'proj-4',
    name: 'رابط کاربری علی‌بابا',
    budget: '۲۸ میلیون تومان',
    progress: 20,
    daysLeft: 18,
    deadlineLabel: '۱۸ روز مانده',
    deadlineType: 'normal',
    barColor: 'bg-retro-mint',
  },
];

// رنگ‌بندی تگ ددلاین بر اساس فوریت
const deadlineBgMap = {
  warning: 'bg-retro-yellow',
  urgent: 'bg-retro-coral',
  normal: 'bg-retro-slate',
};

// کارت تکی پروژه + پراگرس‌بار نئوبروتال
function ProjectCard({ project }) {
  return (
    <div className="p-3.5 border-2 border-black rounded-xl bg-canvas flex flex-col gap-2 shadow-retro-sm hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-retro transition-all">
      {/* ردیف ۱: نام پروژه و تگ ددلاین */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-sm font-black text-black truncate">
          {project.name}
        </span>
        <span
          className={`${deadlineBgMap[project.deadlineType] || deadlineBgMap.normal} font-mono text-[10px] font-bold text-black px-2 py-0.5 border border-black rounded-md whitespace-nowrap`}
        >
          {project.deadlineLabel}
        </span>
      </div>

      {/* ردیف ۲: بودجه و درصد پیشرفت */}
      <div className="flex items-center justify-between text-xs text-neutral-600 font-bold">
        <span>
          بودجه: <strong className="text-black">{project.budget}</strong>
        </span>
        <span className="font-mono font-black text-black">
          {project.progress}٪
        </span>
      </div>

      {/* پراگرس‌بار نئوبروتال */}
      <div className="w-full h-3 border-2 border-black rounded-full bg-white overflow-hidden p-0.5">
        <div
          className={`h-full ${project.barColor} border-l-2 border-black rounded-full transition-all duration-500`}
          style={{ width: `${project.progress}%` }}
        />
      </div>
    </div>
  );
}

// ویجت کامل پروژه‌های فعال
export function ActiveProjects({ projects, onNewProject }) {
  const data = projects || SAMPLE_PROJECTS;
  const runningCount = data.length;

  return (
    <div className="bg-white border-[3px] border-black rounded-2xl p-5 md:p-6 shadow-retro flex flex-col gap-4">
      {/* هدر: عنوان و تعداد پروژه‌های در حال اجرا */}
      <div className="flex items-center justify-between pb-3 border-b-2 border-black">
        <div className="flex items-center gap-2">
          <h2 className="text-lg md:text-xl font-black text-black">
            پروژه‌های فعال
          </h2>
          <Badge variant="secondary" className="text-[10px]">
            {runningCount} در حال اجرا
          </Badge>
        </div>
      </div>

      {/* لیست کارت‌های پروژه */}
      <div className="flex flex-col gap-3.5">
        {data.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* دکمه شروع پروژه جدید */}
      <Button
        variant="outline"
        className="w-full mt-1 shadow-retro text-xs font-black"
        onClick={onNewProject}
      >
        + شروع پروژه جدید
      </Button>
    </div>
  );
}

// نوار وضعیت سیستم پایین داشبورد (Status Ticker)
export function StatusTicker() {
  return (
    <section className="w-full bg-neutral-100 border-[3px] border-black rounded-2xl p-4 shadow-retro flex flex-col md:flex-row items-center justify-between gap-4">
      {/* سمت راست: وضعیت درگاه پرداخت */}
      <div className="flex items-center gap-2.5">
        {/* دایره انیمیشن ضربان (Ping Indicator) */}
        <span className="flex h-3 w-3 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
        </span>
        <span className="text-[11px] font-black text-black">
          وضعیت درگاه پرداخت:
        </span>
        <span className="font-mono text-[10px] font-bold bg-retro-mint border border-black px-2 py-0.5 rounded text-black">
          زرین‌پال فعال (۹۹.۹۸٪)
        </span>
      </div>

      {/* سمت چپ: اطلاعات همگام‌سازی و چرخه مالیاتی */}
      <div className="flex items-center gap-4 font-mono text-[10px] font-bold text-black">
        <span>
          همگام‌سازی: <strong>هر ۱۵ دقیقه</strong>
        </span>
        <span className="hidden sm:inline text-neutral-400">•</span>
        <span>
          چرخه مالیاتی بعدی: <strong>۱۵ فروردین ۱۴۰۶</strong>
        </span>
      </div>
    </section>
  );
}

export default ActiveProjects;
