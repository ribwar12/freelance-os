import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Plus,
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { Button } from '@/components/ui/button';

export const Navbar: React.FC = () => {
  const { user } = useAuth();

  const navLinks = [
    { to: '/', label: 'پیشخوان', icon: LayoutDashboard },
    { to: '/invoices', label: 'فاکتورها', icon: FileText },
    { to: '/clients', label: 'مشتریان', icon: Users },
    { to: '/projects', label: 'پروژه‌ها', icon: Briefcase },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b-2 border-black bg-white shadow-retro-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-18 flex items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="h-10 w-10 rounded-xl bg-retro-yellow border-2 border-black flex items-center justify-center font-black text-sm shadow-retro-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
              FL
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg md:text-xl tracking-tight text-black font-mono">
                Freelance<span className="bg-retro-yellow px-1 rounded border border-black">OS</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 mr-4">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 rounded-xl text-xs md:text-sm font-black border-2 border-black transition-all cursor-pointer ${
                    isActive
                      ? 'bg-retro-yellow text-black shadow-retro-sm'
                      : 'bg-white text-black hover:bg-neutral-100 shadow-none hover:shadow-retro-sm'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* Action Buttons & User Profile */}
        <div className="flex items-center gap-2.5">
          <Link to="/clients" className="hidden sm:inline-flex">
            <Button variant="outline" size="sm" className="gap-1.5">
              <Plus className="h-4 w-4" />
              <span>مشتری جدید</span>
            </Button>
          </Link>

          <Link to="/invoices/new">
            <Button size="sm" className="gap-1.5 shadow-retro">
              <Plus className="h-4 w-4" />
              <span>صدور فاکتور جدید</span>
            </Button>
          </Link>

          {/* User Badge */}
          <div className="hidden lg:flex items-center gap-2 rounded-xl border-2 border-black bg-white px-2.5 py-1 shadow-retro-sm">
            <div className="h-7 w-7 rounded-lg bg-retro-mint border border-black flex items-center justify-center font-black text-xs">
              {user?.full_name?.charAt(0) || 'ک'}
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[11px] font-black leading-tight text-black">
                {user?.full_name || 'توسعه‌دهنده فرانت'}
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
};
