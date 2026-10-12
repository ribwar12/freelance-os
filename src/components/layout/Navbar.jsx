import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export function Navbar({ onNewInvoice, onNewClient }) {
  const navItems = [
    { id: 'dashboard', path: '/', label: 'پیشخوان', end: true },
    { id: 'invoices', path: '/invoices', label: 'فاکتورها' },
    { id: 'clients', path: '/clients', label: 'مشتریان' },
    { id: 'projects', path: '/projects', label: 'پروژه‌ها' },
    { id: 'reports', path: '/reports', label: 'گزارشات' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-white shadow-retro-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-18 py-3 flex items-center justify-between gap-4">
        {/* سمت راست: لوگو و لینک‌های صفحات */}
        <div className="flex items-center gap-6">
          {/* لوگوی زرد نئوبروتال متصل به روت اصلی */}
          <Link to="/" className="flex items-center gap-2.5 cursor-pointer select-none">
            <div className="h-10 w-10 rounded-xl bg-retro-yellow border-2 border-black flex items-center justify-center font-black text-sm shadow-retro-sm">
              FL
            </div>
            <span className="font-black text-lg md:text-xl tracking-tight text-black font-mono">
              Freelance<span className="bg-retro-yellow px-1 rounded border border-black">OS</span>
            </span>
          </Link>

          {/* تب‌های ناوبری دسکتاپ با NavLink استاندارد */}
          <nav className="hidden md:flex items-center gap-1.5 mr-2">
            {navItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-black border-2 border-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-retro-yellow text-black shadow-retro-sm'
                      : 'bg-white text-black hover:bg-neutral-100 shadow-none'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* سمت چپ: دکمه‌های اقدام و پروفایل کاربر */}
        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            className="hidden sm:inline-flex"
            onClick={onNewClient}
          >
            + مشتری جدید
          </Button>

          <Button
            variant="default"
            size="sm"
            className="shadow-retro"
            onClick={onNewInvoice}
          >
            + صدور فاکتور جدید
          </Button>

          {/* کپسول مشخصات کاربر */}
          <div className="hidden lg:flex items-center gap-2 rounded-xl border-2 border-black bg-white px-2.5 py-1 shadow-retro-sm select-none">
            <div className="h-7 w-7 rounded-lg bg-retro-mint border border-black flex items-center justify-center font-black text-xs">
              ک
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-black leading-tight text-black">
                الکس مرادی
              </span>
              <span className="text-[9px] font-mono font-bold text-emerald-700 tracking-wider">
                مدیر سیستم
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
