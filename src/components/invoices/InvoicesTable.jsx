import React from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

// لیست داده‌های کامل و استاندارد فاکتورها برای جدول جامع
export const INITIAL_INVOICES_DATA = [
  {
    id: 'INV-1405-09',
    client: 'دیجی‌کالا مارکت‌پلیس',
    clientId: '#DK-9041',
    avatar: 'د',
    avatarBg: 'bg-retro-coral',
    project: 'دیزاین سیستم و توکن‌ها (فاز ۲)',
    milestone: 'اسپرینت مهرماه',
    issueDate: '۱۴۰۵/۰۶/۲۸',
    dueDate: '۱۴۰۵/۰۷/۲۰',
    amount: '۴۴,۵۵۰,۰۰۰',
    status: 'draft',
    statusLabel: 'پیش‌نویس',
  },
  {
    id: 'INV-1405-08',
    client: 'اسنپ‌پی فین‌تک',
    clientId: '#SN-302',
    avatar: 'ا',
    avatarBg: 'bg-retro-mint',
    project: 'بازطراحی اپلیکیشن و والت UX',
    milestone: 'تحویل پکیج نهایی',
    issueDate: '۱۴۰۵/۰۶/۱۰',
    dueDate: '۱۴۰۵/۰۶/۲۸',
    amount: '۳۲,۰۰۰,۰۰۰',
    status: 'paid',
    statusLabel: 'تسویه شد',
  },
  {
    id: 'INV-1405-07',
    client: 'دیجی‌کالا مارکت‌پلیس',
    clientId: '#DK-9041',
    avatar: 'د',
    avatarBg: 'bg-retro-coral',
    project: 'هویت بصری کمپین پاییزه',
    milestone: 'اسپرینت اول',
    issueDate: '۱۴۰۵/۰۶/۲۵',
    dueDate: '۱۴۰۵/۰۷/۱۵',
    amount: '۴۵,۰۰۰,۰۰۰',
    status: 'pending',
    statusLabel: 'در انتظار واریز',
  },
  {
    id: 'INV-1405-06',
    client: 'کافه بازار',
    clientId: '#CB-401',
    avatar: 'ک',
    avatarBg: 'bg-retro-yellow',
    project: 'گایدلاین برند و هویت بصری',
    milestone: 'اسپرینت پایانی',
    issueDate: '۱۴۰۵/۰۵/۲۸',
    dueDate: '۱۴۰۵/۰۶/۲۰',
    amount: '۱۸,۵۰۰,۰۰۰',
    status: 'overdue',
    statusLabel: 'معوقه (بحرانی)',
    isOverdue: true,
  },
  {
    id: 'INV-1405-05',
    client: 'موتور جستجوی ترب',
    clientId: '#TR-880',
    avatar: 'ت',
    avatarBg: 'bg-retro-lavender',
    project: 'داشبورد آنالیتیکس و هوش مصنوعی',
    milestone: 'اسپرینت تحلیل داده',
    issueDate: '۱۴۰۵/۰۷/۰۱',
    dueDate: '۱۴۰۵/۰۷/۲۵',
    amount: '۲۲,۰۰۰,۰۰۰',
    status: 'pending',
    statusLabel: 'در انتظار واریز',
  },
  {
    id: 'INV-1405-04',
    client: 'دیوار آگهی‌ها',
    clientId: '#DV-109',
    avatar: 'د',
    avatarBg: 'bg-retro-slate',
    project: 'اسپرینت بازطراحی فیلترها',
    milestone: 'تحویل نسخه تست',
    issueDate: '۱۴۰۵/۰۶/۰۵',
    dueDate: '۱۴۰۵/۰۶/۲۵',
    amount: '۱۶,۰۰۰,۰۰۰',
    status: 'paid',
    statusLabel: 'تسویه شد',
  },
  {
    id: 'INV-1405-03',
    client: 'علی‌بابا تراول',
    clientId: '#AB-552',
    avatar: 'ع',
    avatarBg: 'bg-retro-tangerine',
    project: 'پنل پروازهای خارجی و هتل',
    milestone: 'تکمیل فاز اول',
    issueDate: '۱۴۰۵/۰۶/۱۵',
    dueDate: '۱۴۰۵/۰۷/۰۵',
    amount: '۲۸,۰۰۰,۰۰۰',
    status: 'paid',
    statusLabel: 'تسویه شد',
  },
];

export function InvoicesTable({
  invoices = INITIAL_INVOICES_DATA,
  selectedIds = [],
  onSelectRow,
  onSelectAll,
  onViewInvoice,
  onEditInvoice,
  onDeleteInvoice,
  onMarkAsPaid,
  onBulkAction,
  onRefresh,
}) {
  const allSelected = invoices.length > 0 && selectedIds.length === invoices.length;
  const isIndeterminate = selectedIds.length > 0 && selectedIds.length < invoices.length;

  return (
    <div className="bg-white border-[3px] border-black rounded-2xl shadow-retro overflow-hidden flex flex-col select-none">
      {/* ۱. نوار اطلاعات هدر جدول (Table Header Info Bar) */}
      <div className="bg-retro-slate border-b-2 border-black px-4 md:px-6 py-2.5 flex items-center justify-between text-black text-xs font-bold">
        <div className="flex items-center gap-2.5">
          <span className="font-mono font-black tracking-wider uppercase">
            ماتریس زنده حساب‌های دریافتنی
          </span>
          <span className="font-mono text-[10px] bg-white px-2 py-0.5 rounded border border-black shadow-[1px_1px_0px_#000000]">
            {invoices.length} فاکتور از ۴۲ مورد
          </span>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="hidden sm:inline text-neutral-600">ذخیره‌سازی خودکار: فعال</span>
          <button
            type="button"
            onClick={onRefresh}
            className="hover:text-emerald-700 transition-colors flex items-center gap-1 cursor-pointer font-bold"
          >
            <span>🔄</span>
            <span className="underline">تازه‌سازی</span>
          </button>
        </div>
      </div>

      {/* ۲. نوار عملیات دسته‌جمعی شناور (Bulk Actions Toolbar) */}
      {selectedIds.length > 0 && (
        <div className="bg-retro-yellow border-b-2 border-black px-4 md:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-black bg-black text-white px-2 py-0.5 rounded border border-black">
              {selectedIds.length} فاکتور انتخاب شد
            </span>
            <span className="text-xs font-black text-black">
              عملیات دسته‌جمعی را انتخاب کنید:
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => onBulkAction && onBulkAction('paid', selectedIds)}
              className="text-xs font-black h-7"
            >
              ✓ تسویه گروهی
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => onBulkAction && onBulkAction('export', selectedIds)}
              className="text-xs font-black h-7"
            >
              📥 خروجی انتخابی
            </Button>

            <Button
              size="sm"
              variant="destructive"
              onClick={() => onBulkAction && onBulkAction('delete', selectedIds)}
              className="text-xs font-black h-7"
            >
              🗑️ حذف گروهی
            </Button>
          </div>
        </div>
      )}

      {/* ۳. قاب جدول قابل اسکرول با بردرهای محکم */}
      <div className="w-full overflow-x-auto">
        <table className="w-full text-right border-collapse min-w-[980px]">
          <thead>
            <tr className="bg-canvas border-b-2 border-black text-xs font-black text-black select-none">
              {/* چک‌باکس انتخاب همه */}
              <th className="py-3.5 pr-4 pl-2 w-12 text-center">
                <input
                  type="checkbox"
                  checked={allSelected}
                  ref={(input) => {
                    if (input) input.indeterminate = isIndeterminate;
                  }}
                  onChange={onSelectAll}
                  className="w-4 h-4 rounded border-2 border-black accent-retro-yellow cursor-pointer"
                />
              </th>
              <th className="py-3.5 px-3">شماره فاکتور</th>
              <th className="py-3.5 px-3">کارفرما و طرف‌حساب</th>
              <th className="py-3.5 px-3">پروژه و اسپرینت</th>
              <th className="py-3.5 px-3">تاریخ صدور</th>
              <th className="py-3.5 px-3">موعد سررسید</th>
              <th className="py-3.5 px-3 text-left">مبلغ (تومان)</th>
              <th className="py-3.5 px-4 text-center">وضعیت</th>
              <th className="py-3.5 pl-4 pr-3 text-center">عملیات</th>
            </tr>
          </thead>

          <tbody className="divide-y-2 divide-black text-xs font-semibold">
            {invoices.length === 0 ? (
              <tr>
                <td colSpan="9" className="py-12 text-center text-neutral-500 font-bold">
                  هیچ فاکتوری مطابق با فیلترهای انتخابی شما پیدا نشد.
                </td>
              </tr>
            ) : (
              invoices.map((inv) => {
                const isSelected = selectedIds.includes(inv.id);
                return (
                  <tr
                    key={inv.id}
                    className={`transition-colors ${
                      isSelected
                        ? 'bg-retro-yellow/20'
                        : 'hover:bg-retro-yellow/10'
                    }`}
                  >
                    {/* چک‌باکس ردیف */}
                    <td className="py-3.5 pr-4 pl-2 text-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onSelectRow && onSelectRow(inv.id)}
                        className="w-4 h-4 rounded border-2 border-black accent-retro-yellow cursor-pointer"
                      />
                    </td>

                    {/* شماره فاکتور */}
                    <td className="py-3.5 px-3 font-mono font-black text-black">
                      <button
                        type="button"
                        onClick={() => onViewInvoice && onViewInvoice(inv)}
                        className="underline decoration-2 underline-offset-2 hover:bg-retro-yellow px-1 py-0.5 rounded transition-all cursor-pointer"
                      >
                        {inv.id}
                      </button>
                    </td>

                    {/* مشخصات کارفرما */}
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-7 h-7 rounded-lg ${inv.avatarBg || 'bg-white'} border-2 border-black flex items-center justify-center font-black text-xs shadow-[1px_1px_0px_#000000]`}
                        >
                          {inv.avatar}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-black text-black leading-tight text-xs">
                            {inv.client}
                          </span>
                          <span className="font-mono text-[10px] text-neutral-500">
                            {inv.clientId}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* پروژه و اسپرینت */}
                    <td className="py-3.5 px-3">
                      <div className="font-bold text-black max-w-[200px] truncate" title={inv.project}>
                        {inv.project}
                      </div>
                      <span className="font-mono text-[10px] text-neutral-500 block">
                        {inv.milestone}
                      </span>
                    </td>

                    {/* تاریخ صدور */}
                    <td className="py-3.5 px-3 font-mono text-neutral-700">
                      {inv.issueDate}
                    </td>

                    {/* تاریخ سررسید */}
                    <td className="py-3.5 px-3 font-mono">
                      <span
                        className={`px-1.5 py-0.5 rounded border border-black ${
                          inv.isOverdue
                            ? 'bg-retro-coral text-black font-black'
                            : 'bg-canvas text-black'
                        }`}
                      >
                        {inv.dueDate}
                      </span>
                    </td>

                    {/* مبلغ فاکتور */}
                    <td className="py-3.5 px-3 text-left font-mono text-sm font-black text-black">
                      {inv.amount}
                    </td>

                    {/* وضعیت */}
                    <td className="py-3.5 px-4 text-center">
                      <Badge variant={inv.status}>
                        {inv.statusLabel}
                      </Badge>
                    </td>

                    {/* دکمه‌های عملیات سریع ردیف */}
                    <td className="py-3.5 pl-4 pr-3 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {inv.status === 'pending' && (
                          <button
                            type="button"
                            title="ثبت تسویه"
                            onClick={() => onMarkAsPaid && onMarkAsPaid(inv)}
                            className="p-1 bg-white hover:bg-retro-mint border-2 border-black rounded-lg shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer text-xs"
                          >
                            ✓
                          </button>
                        )}

                        <button
                          type="button"
                          title="مشاهده فاکتور"
                          onClick={() => onViewInvoice && onViewInvoice(inv)}
                          className="p-1 bg-white hover:bg-retro-yellow border-2 border-black rounded-lg shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer text-xs"
                        >
                          👁
                        </button>

                        <button
                          type="button"
                          title="ویرایش"
                          onClick={() => onEditInvoice && onEditInvoice(inv)}
                          className="p-1 bg-white hover:bg-neutral-100 border-2 border-black rounded-lg shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer text-xs"
                        >
                          ✏️
                        </button>

                        <button
                          type="button"
                          title="حذف"
                          onClick={() => onDeleteInvoice && onDeleteInvoice(inv)}
                          className="p-1 bg-white hover:bg-retro-coral border-2 border-black rounded-lg shadow-[1px_1px_0px_#000000] active:translate-x-0.5 active:translate-y-0.5 transition-all cursor-pointer text-xs"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoicesTable;
