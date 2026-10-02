import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';

export const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-canvas text-black flex flex-col selection:bg-retro-yellow selection:text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 space-y-8">
        <Outlet />
      </main>

      {/* Bottom Global Footer / Ticker */}
      <footer className="border-t-2 border-black bg-white py-4 px-6 text-xs font-semibold text-black mt-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-mono font-black bg-retro-yellow px-1.5 py-0.5 rounded border border-black text-[10px]">
              v2.4 PRO
            </span>
            <span className="font-bold">FreelanceOS • سامانه مدیریت مالی و قراردادهای مستقل</span>
          </div>
          <div className="text-neutral-600 font-medium text-[11px]">
            توسعه داده شده با React, TypeScript, Redux, React Query & Tailwind
          </div>
        </div>
      </footer>
    </div>
  );
};
