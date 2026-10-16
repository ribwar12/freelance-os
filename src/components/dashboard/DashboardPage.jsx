import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HeroBanner } from './HeroBanner';
import { MetricCards } from './MetricCards';
import { RecentInvoices } from './RecentInvoices';
import { ActiveProjects, StatusTicker } from './ActiveProjects';

export function DashboardPage({
  period = 'current_month',
  onPeriodChange,
  metricsDataByPeriod,
  onActionNotice,
}) {
  const navigate = useNavigate();

  const getPeriodLabel = (val) => {
    const map = {
      current_month: 'این ماه (مهر ۱۴۰۵)',
      last_month: 'ماه قبل (شهریور ۱۴۰۵)',
      quarter: 'فصل جاری (پاییز ۱۴۰۵)',
      year: 'سال مالی ۱۴۰۵',
    };
    return map[val] || val;
  };

  return (
    <div className="space-y-6">
      {/* ۱. بنر خوش‌آمدگویی داشبورد (فاز ۲ گام ۲) */}
      <HeroBanner
        userName="ریبوار دباله"
        sprintLabel="اسپرینت مهر ۱۴۰۵"
        selectedPeriod={period}
        onPeriodChange={(newPeriod) => {
          onPeriodChange && onPeriodChange(newPeriod);
          onActionNotice && onActionNotice(`بازه زمانی گزارشات به «${getPeriodLabel(newPeriod)}» تغییر یافت.`);
        }}
        onNewInvoice={() => {
          onActionNotice && onActionNotice('انتقال به بخش صدور فاکتور جدید (فاز ۴)');
          navigate('/invoices');
        }}
      />

      {/* ۲. کارت‌های ۴گانه شاخص عملکرد مالی و کاری (فاز ۲ گام ۳) */}
      <MetricCards metrics={metricsDataByPeriod[period]} />

      {/* ۳. لایه گرید اصلی داشبورد ۸/۴ ستونی (فاز ۲ گام ۴ و ۵) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6 items-start">
        {/* ۸ ستون سمت راست: جدول ۵ فاکتور اخیر با هدایت به /invoices */}
        <div className="lg:col-span-8">
          <RecentInvoices
            totalCount={42}
            onCreateInvoice={() => {
              onActionNotice && onActionNotice('کلیک روی «ایجاد فاکتور» از جدول');
              navigate('/invoices');
            }}
            onViewAll={() => {
              navigate('/invoices');
            }}
            onViewInvoice={(id) => {
              onActionNotice && onActionNotice(`مشاهده جزئیات فاکتور ${id}`);
              navigate('/invoices');
            }}
          />
        </div>

        {/* ۴ ستون سمت چپ: ویجت پروژه‌های فعال */}
        <div className="lg:col-span-4">
          <ActiveProjects
            onNewProject={() => onActionNotice && onActionNotice('کلیک روی «شروع پروژه جدید»')}
          />
        </div>
      </section>

      {/* ۴. نوار وضعیت سیستم پایین داشبورد */}
      <StatusTicker />
    </div>
  );
}

export default DashboardPage;
