import React, { useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';

/**
 * سایدبار کشویی مخصوص حالت ریسپانسیو موبایل و تبلت (Mobile Drawer)
 * با زبان طراحی نئوبروتالیسم (بوردرهای ۳ پیکسلی، سایه‌های سخت، پالت پاستلی و چینش RTL)
 */
export function MobileSidebar({
  isOpen,
  onClose,
  navItems = [],
  onNewInvoice,
  onNewClient,
}) {
  // قفل اسکرول صفحه زمینه هنگام باز بودن سایدبار موبایل
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // بستن سایدبار با فشردن کلید Escape کیبورد
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // نقشه آیکون‌های نئوبروتال برای هر بخش
  const itemIcons = {
    dashboard: '⚡',
    invoices: '🧾',
    clients: '👥',
    projects: '🚀',
    reports: '📊',
  };

  return (
    <div className="fixed inset-0 z-50 md:hidden select-none" dir="rtl">
      {/* پس‌زمینه تیره مات با قابلیت بستن منو با کلیک */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
        aria-hidden="true"
      />

      {/* پنل سایدبار کشویی متصل به سمت راست (راست‌چین RTL) */}
      <aside className="fixed top-0 right-0 bottom-0 w-[290px] max-w-[85vw] bg-white border-l-[3px] border-black shadow-[-8px_0_0_0_#000000] z-50 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-250">
        {/* هدر سایدبار: لوگو و دکمه بستن */}
        <div>
          <div className="p-4 bg-retro-yellow border-b-[3px] border-black flex items-center justify-between">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="h-9 w-9 rounded-xl bg-white border-2 border-black flex items-center justify-center font-black text-sm shadow-[2px_2px_0_0_#000000]">
                FL
              </div>
              <span className="font-black text-lg text-black font-mono">
                Freelance<span className="bg-white px-1 rounded border border-black text-xs mr-0.5">OS</span>
              </span>
            </Link>

            <button
              type="button"
              onClick={onClose}
              aria-label="بستن منو"
              className="w-8 h-8 rounded-xl bg-retro-coral border-2 border-black text-black font-black flex items-center justify-center shadow-[2px_2px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer text-sm"
            >
              ✕
            </button>
          </div>

          {/* نوار راهنمای منوی موبایل */}
          <div className="px-4 py-2 bg-neutral-100 border-b-2 border-black flex items-center justify-between">
            <span className="text-[11px] font-black text-neutral-700">
              منوی ناوبری سیستم
            </span>
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-retro-mint border border-black text-black shadow-[1px_1px_0px_#000000]">
              نسخه همراه
            </span>
          </div>

          {/* لیست لینک‌های ناوبری بخش‌های مختلف پلتفرم */}
          <nav className="p-4 space-y-2">
            <span className="text-[10px] font-black uppercase text-neutral-400 font-mono block px-2 mb-1">
              منوی بخش‌های سیستم
            </span>

            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.end}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-black border-2 transition-all cursor-pointer ${
                    isActive
                      ? 'bg-retro-yellow text-black border-black shadow-[3px_3px_0_0_#000000]'
                      : 'bg-white text-black border-neutral-300 hover:border-black hover:bg-neutral-50 shadow-none'
                  }`
                }
              >
                <span className="text-base">{itemIcons[item.id] || '📌'}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          {/* دکمه‌های اقدام سریع در سایدبار موبایل */}
          <div className="px-4 pt-2 pb-4 space-y-2 border-t-2 border-neutral-200">
            <span className="text-[10px] font-black uppercase text-neutral-400 font-mono block px-2 mb-1">
              اقدامات سریع
            </span>

            <button
              type="button"
              onClick={() => {
                onClose();
                onNewInvoice && onNewInvoice();
              }}
              className="w-full bg-retro-mint text-black font-black text-xs py-2.5 px-3.5 rounded-xl border-2 border-black shadow-[3px_3px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>➕</span>
              <span>صدور فاکتور جدید</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onClose();
                onNewClient && onNewClient();
              }}
              className="w-full bg-white hover:bg-canvas text-black font-black text-xs py-2.5 px-3.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>👤</span>
              <span>ثبت کارفرمای جدید</span>
            </button>
          </div>
        </div>

        {/* فوتر سایدبار: اطلاعات حساب کاربری و نسخه */}
        <div className="p-4 bg-canvas border-t-2 border-black">
          <div className="flex items-center gap-3 p-2.5 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0_0_#000000]">
            <div className="h-9 w-9 rounded-lg bg-retro-mint border border-black flex items-center justify-center font-black text-sm">
              ک
            </div>
            <div className="flex flex-col text-right">
              <span className="text-xs font-black leading-tight text-black">
                الکس مرادی
              </span>
              <span className="text-[10px] font-mono font-bold text-emerald-800">
                مدیر سیستم • فعال
              </span>
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-mono font-bold text-neutral-500 px-1">
            <span>FreelanceOS v1.0</span>
            <span>۱۴۰۵ خورشیدی</span>
          </div>
        </div>
      </aside>
    </div>
  );
}

export default MobileSidebar;
