import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Users,
  PlusCircle,
  LogOut,
  Sun,
  Moon,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleSidebar, toggleTheme } from '@/store/uiSlice';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { sidebarOpen, theme } = useAppSelector((state) => state.ui);
  const { user, signOut } = useAuth();

  const navItems = [
    { to: '/', label: '??????? ???', icon: LayoutDashboard },
    { to: '/invoices', label: '????????', icon: FileText },
    { to: '/invoices/new', label: '???? ?????? ????', icon: PlusCircle, highlight: true },
    { to: '/projects', label: '????????', icon: Briefcase },
    { to: '/clients', label: '???????', icon: Users },
  ];

  return (
    <aside
      className={cn(
        "fixed inset-y-0 right-0 z-40 flex flex-col border-l bg-card transition-all duration-300 shadow-sm",
        sidebarOpen ? "w-64" : "w-20"
      )}
    >
      {/* Brand Header */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold shadow-md shadow-primary/20">
            FL
          </div>
          {sidebarOpen && (
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight">FreelanceOS</span>
              <span className="text-[10px] text-muted-foreground font-medium">?????? ????? ? ?????</span>
            </div>
          )}
        </div>
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="rounded-lg p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors cursor-pointer"
          title={sidebarOpen ? "???? ???" : "??? ???? ???"}
        >
          {sidebarOpen ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </button>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : item.highlight
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <Icon className="h-5 w-5 shrink-0 transition-transform group-hover:scale-105" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          );
        })}
      </div>

      {/* User & Actions Footer */}
      <div className="border-t p-3 space-y-2">
        <div className="flex items-center justify-between gap-2 px-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(toggleTheme())}
            className="w-full justify-start gap-2 text-muted-foreground"
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-500" />
            ) : (
              <Moon className="h-4 w-4 text-slate-700" />
            )}
            {sidebarOpen && (
              <span className="text-xs">{theme === 'dark' ? '???? ???' : '???? ??'}</span>
            )}
          </Button>
        </div>

        {user && (
          <div className="flex items-center justify-between gap-2 rounded-lg bg-muted/60 p-2">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-bold text-primary">
                {user.full_name?.charAt(0) || '?'}
              </div>
              {sidebarOpen && (
                <div className="flex flex-col truncate">
                  <span className="text-xs font-semibold truncate">{user.full_name}</span>
                  <span className="text-[10px] text-muted-foreground truncate">{user.email}</span>
                </div>
              )}
            </div>
            {sidebarOpen && (
              <button
                onClick={() => signOut()}
                className="text-muted-foreground hover:text-destructive p-1 rounded transition-colors cursor-pointer"
                title="???? ?? ????"
              >
                <LogOut className="h-4 w-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};
