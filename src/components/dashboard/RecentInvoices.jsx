import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// داده‌های نمونه ۵ فاکتور اخیر
const SAMPLE_INVOICES = [
  {
    id: 'INV-1405-08',
    client: 'اسنپ‌پی فین‌تک',
    project: 'بازطراحی اپلیکیشن موبایل',
    dueDate: '۱۴۰۵/۰۷/۲۸',
    amount: '۳۲,۰۰۰,۰۰۰',
    status: 'paid',
    statusLabel: 'تسویه شد',
  },
  {
    id: 'INV-1405-07',
    client: 'دیجی‌کالا مارکت‌پلیس',
    project: 'دیزاین سیستم و توکن‌ها',
    dueDate: '۱۴۰۵/۰۸/۱۰',
    amount: '۴۵,۰۰۰,۰۰۰',
    status: 'pending',
    statusLabel: 'در انتظار واریز',
  },
  {
    id: 'INV-1405-06',
    client: 'کافه بازار',
    project: 'هویت برند و گایدلاین',
    dueDate: '۱۴۰۵/۰۷/۲۰',
    amount: '۱۸,۵۰۰,۰۰۰',
    status: 'overdue',
    statusLabel: 'معوقه',
    isOverdueDate: true,
  },
  {
    id: 'INV-1405-05',
    client: 'موتور جستجوی ترب',
    project: 'رابط کاربری داشبورد آنالیتیکس',
    dueDate: '۱۴۰۵/۰۸/۱۵',
    amount: '۲۲,۰۰۰,۰۰۰',
    status: 'draft',
    statusLabel: 'پیش‌نویس',
  },
  {
    id: 'INV-1405-04',
    client: 'دیوار آگهی‌ها',
    project: 'اسپرینت طراحی فصل اول',
    dueDate: '۱۴۰۵/۰۷/۱۵',
    amount: '۱۶,۰۰۰,۰۰۰',
    status: 'paid',
    statusLabel: 'تسویه شد',
  },
];

// دکمه کوچک عملیات ردیف جدول
function ActionButton({ children, title, variant = 'default', onClick }) {
  const bgMap = {
    default: 'bg-white hover:bg-retro-slate',
    mint: 'bg-retro-mint hover:opacity-90',
    yellow: 'bg-retro-yellow hover:opacity-90',
  };

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`p-1.5 rounded-lg border-2 border-black ${bgMap[variant] || bgMap.default} cursor-pointer shadow-[1px_1px_0px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all text-sm font-black leading-none select-none`}
    >
      {children}
    </button>
  );
}

export function RecentInvoices({
  invoices,
  totalCount = 42,
  onCreateInvoice,
  onViewAll,
  onViewInvoice,
}) {
  const data = invoices || SAMPLE_INVOICES;

  // تعیین دکمه‌های عملیات بر اساس وضعیت فاکتور
  const renderActions = (invoice) => {
    switch (invoice.status) {
      case 'paid':
        return (
          <>
            <ActionButton title="مشاهده فاکتور" onClick={() => onViewInvoice && onViewInvoice(invoice.id)}>
              👁
            </ActionButton>
            <ActionButton title="دانلود PDF">
              📥
            </ActionButton>
          </>
        );
      case 'pending':
        return (
          <>
            <ActionButton title="ثبت پرداخت" variant="mint">
              ✓
            </ActionButton>
            <ActionButton title="مشاهده جزئیات" onClick={() => onViewInvoice && onViewInvoice(invoice.id)}>
              👁
            </ActionButton>
          </>
        );
      case 'overdue':
        return (
          <Button
            size="sm"
            variant="default"
            className="text-[10px] px-2.5 py-1 h-auto rounded-lg shadow-[1px_1px_0px_0px_#000000]"
          >
            🔔 یادآوری
          </Button>
        );
      case 'draft':
        return (
          <>
            <ActionButton title="ویرایش پیش‌نویس">
              ✏️
            </ActionButton>
            <ActionButton title="حذف پیش‌نویس">
              🗑️
            </ActionButton>
          </>
        );
      default:
        return (
          <ActionButton title="مشاهده" onClick={() => onViewInvoice && onViewInvoice(invoice.id)}>
            👁
          </ActionButton>
        );
    }
  };

  return (
    <div className="bg-white border-[3px] border-black rounded-2xl p-5 md:p-6 shadow-retro flex flex-col">
      {/* هدر بخش: عنوان، نشان LIVE و دکمه ایجاد فاکتور */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b-2 border-black gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg md:text-xl font-black text-black">
              آخرین فاکتورها
            </h2>
            <span className="font-mono text-[10px] font-bold bg-retro-slate px-2 py-0.5 border border-black rounded-md text-black select-none">
              زنده
            </span>
          </div>
          <p className="text-xs font-semibold text-neutral-500 mt-0.5">
            نمایش ۵ تراکنش اخیر صورت‌حساب‌ها
          </p>
        </div>
        <button
          type="button"
          onClick={onCreateInvoice}
          className="inline-flex items-center gap-1.5 text-xs font-black text-black hover:text-emerald-700 underline decoration-2 underline-offset-4 cursor-pointer self-start sm:self-auto"
        >
          + ایجاد فاکتور جدید
        </button>
      </div>

      {/* قاب جدول داده‌ها با اسکرول افقی ریسپانسیو */}
      <div className="overflow-x-auto mt-4 border-2 border-black rounded-xl">
        <table className="w-full text-right border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-neutral-100 border-b-2 border-black">
              <th className="p-3 text-[11px] font-black text-black">کد فاکتور</th>
              <th className="p-3 text-[11px] font-black text-black">کارفرما و پروژه</th>
              <th className="p-3 text-[11px] font-black text-black">سررسید</th>
              <th className="p-3 text-[11px] font-black text-black">مبلغ</th>
              <th className="p-3 text-[11px] font-black text-black">وضعیت</th>
              <th className="p-3 text-[11px] font-black text-black text-left">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black">
            {data.map((invoice) => (
              <tr
                key={invoice.id}
                className="hover:bg-retro-yellow/10 transition-colors"
              >
                {/* کد فاکتور - فونت مونو */}
                <td className="p-3 font-mono text-xs font-bold text-black whitespace-nowrap">
                  {invoice.id}
                </td>

                {/* کارفرما و نام پروژه */}
                <td className="p-3">
                  <div className="text-sm font-black text-black">{invoice.client}</div>
                  <div className="text-xs font-semibold text-neutral-500">{invoice.project}</div>
                </td>

                {/* تاریخ سررسید شمسی */}
                <td className={`p-3 font-mono text-xs font-bold whitespace-nowrap ${
                  invoice.isOverdueDate ? 'text-retro-coral' : 'text-black'
                }`}>
                  {invoice.dueDate}
                </td>

                {/* مبلغ به تومان */}
                <td className="p-3 whitespace-nowrap">
                  <span className="font-mono text-sm font-black text-black">{invoice.amount}</span>
                  <span className="font-mono text-[9px] font-bold text-neutral-500 mr-1">تومان</span>
                </td>

                {/* نشان وضعیت */}
                <td className="p-3">
                  <Badge variant={invoice.status}>
                    {invoice.statusLabel}
                  </Badge>
                </td>

                {/* دکمه‌های عملیات */}
                <td className="p-3 text-left">
                  <div className="inline-flex items-center gap-1.5">
                    {renderActions(invoice)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* پانوشت جدول: تعداد کل و لینک مشاهده همه */}
      <div className="pt-4 mt-4 border-t-2 border-black flex flex-wrap justify-between items-center gap-3">
        <span className="font-mono text-[11px] font-bold text-neutral-500">
          نمایش ۵ از {totalCount} فاکتور ثبت‌شده
        </span>
        <button
          type="button"
          onClick={onViewAll}
          className="neo-press inline-flex items-center gap-2 text-xs font-black text-black px-4 py-2 border-2 border-black rounded-xl bg-canvas hover:bg-retro-yellow shadow-retro-sm active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
        >
          مشاهده تمام {totalCount} فاکتور ←
        </button>
      </div>
    </div>
  );
}

export default RecentInvoices;
