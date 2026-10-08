import React from 'react';

export function InvoiceFilters({
  statusFilter = 'all',
  onStatusChange,
  searchQuery = '',
  onSearchChange,
  selectedClient = 'all',
  onClientChange,
  selectedDateRange = '1405_all',
  onDateRangeChange,
  currency = 'TOM',
  onCurrencyChange,
  counts = { all: 42, pending: 5, paid: 34, overdue: 2, draft: 1 },
  onResetFilters,
}) {
  const statusOptions = [
    { id: 'all', label: 'همه', count: counts.all, dotColor: null },
    { id: 'pending', label: 'در انتظار واریز', count: counts.pending, dotColor: 'bg-retro-tangerine' },
    { id: 'paid', label: 'پرداخت شده', count: counts.paid, dotColor: 'bg-retro-mint' },
    { id: 'overdue', label: 'معوقه', count: counts.overdue, dotColor: 'bg-retro-coral' },
    { id: 'draft', label: 'پیش‌نویس', count: counts.draft, dotColor: 'bg-retro-slate' },
  ];

  const clientOptions = [
    { id: 'all', label: 'همه کارفرمایان (۷)' },
    { id: 'digikala', label: 'دیجی‌کالا مارکت‌پلیس' },
    { id: 'snappay', label: 'اسنپ‌پی فین‌تک' },
    { id: 'cafebazaar', label: 'کافه بازار' },
    { id: 'torob', label: 'موتور جستجوی ترب' },
    { id: 'divar', label: 'دیوار آگهی‌ها' },
    { id: 'alibaba', label: 'علی‌بابا تراول' },
  ];

  const dateOptions = [
    { id: '1405_all', label: 'سال مالی ۱۴۰۵ (جاری)' },
    { id: '1405_q3', label: 'فصل پاییز ۱۴۰۵ (مهر – آذر)' },
    { id: '1405_q2', label: 'فصل تابستان ۱۴۰۵ (تیر – شهریور)' },
    { id: '1404_archived', label: 'سال مالی ۱۴۰۴ (آرشیو شده)' },
  ];

  const hasActiveFilters =
    statusFilter !== 'all' ||
    searchQuery.trim() !== '' ||
    selectedClient !== 'all' ||
    selectedDateRange !== '1405_all';

  return (
    <div className="bg-white border-2 border-black rounded-xl p-4 md:p-5 shadow-retro flex flex-col gap-4 select-none">
      {/* ردیف بالا: کپسول‌های وضعیت و سوئیچ واحد پولی */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* کپسول‌های وضعیت (Segmented Status Pills) */}
        <div className="flex flex-wrap items-center gap-2">
          {statusOptions.map((item) => {
            const isActive = statusFilter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onStatusChange && onStatusChange(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-black font-mono text-xs font-bold transition-all cursor-pointer shadow-retro-sm active:translate-x-0.5 active:translate-y-0.5 ${
                  isActive
                    ? 'bg-black text-white shadow-retro'
                    : 'bg-white text-black hover:bg-neutral-100'
                }`}
              >
                {item.dotColor && (
                  <span className={`w-2.5 h-2.5 rounded-full border border-black ${item.dotColor}`} />
                )}
                <span className="font-sans font-bold">{item.label}</span>
                <span
                  className={`px-1.5 py-0.2 rounded-full border border-black text-[10px] font-black ${
                    isActive ? 'bg-retro-yellow text-black' : 'bg-neutral-100 text-black'
                  }`}
                >
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* سوئیچ واحد پولی (Currency Selector) */}
        <div className="flex items-center bg-canvas border-2 border-black rounded-xl p-1 shadow-retro-sm">
          {[
            { id: 'TOM', label: 'تومان' },
            { id: 'USD', label: 'دلار ($)' },
            { id: 'EUR', label: 'یورو (€)' },
          ].map((curr) => (
            <button
              key={curr.id}
              type="button"
              onClick={() => onCurrencyChange && onCurrencyChange(curr.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-black transition-all cursor-pointer ${
                currency === curr.id
                  ? 'bg-retro-yellow text-black border border-black shadow-retro-sm'
                  : 'text-neutral-600 hover:text-black border border-transparent'
              }`}
            >
              {curr.label}
            </button>
          ))}
        </div>
      </div>

      {/* ردیف پایین: اینپوت جستجوی زنده و دراپ‌داون‌های فیلتر */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-3 border-t-2 border-neutral-200">
        {/* اینپوت جستجو */}
        <div className="md:col-span-6 relative flex items-center">
          <span className="absolute right-3 text-neutral-500 pointer-events-none text-base">
            🔍
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            placeholder="جستجوی شماره فاکتور، نام شرکت کارفرما یا پروژه..."
            className="w-full bg-white border-2 border-black rounded-xl pr-9 pl-12 py-2 text-xs md:text-sm font-semibold text-black placeholder:text-neutral-500 focus:bg-canvas focus:outline-none focus:ring-2 focus:ring-retro-yellow focus:shadow-retro-sm transition-all"
          />
          <span className="hidden sm:inline-block absolute left-2.5 font-mono text-[10px] font-bold text-neutral-600 bg-neutral-100 px-1.5 py-0.5 border border-black rounded select-none">
            Ctrl+K
          </span>
        </div>

        {/* دراپ‌داون بازه زمانی */}
        <div className="md:col-span-3 relative">
          <div className="relative">
            <select
              value={selectedDateRange}
              onChange={(e) => onDateRangeChange && onDateRangeChange(e.target.value)}
              className="w-full appearance-none bg-white border-2 border-black rounded-xl pr-3 pl-8 py-2 text-xs font-bold text-black focus:outline-none focus:bg-canvas cursor-pointer shadow-retro-sm hover:shadow-retro transition-all"
            >
              {dateOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-mono font-bold text-neutral-700">
              ▼
            </span>
          </div>
        </div>

        {/* دراپ‌داون فیلتر کارفرما */}
        <div className="md:col-span-3 relative">
          <div className="relative">
            <select
              value={selectedClient}
              onChange={(e) => onClientChange && onClientChange(e.target.value)}
              className="w-full appearance-none bg-white border-2 border-black rounded-xl pr-3 pl-8 py-2 text-xs font-bold text-black focus:outline-none focus:bg-canvas cursor-pointer shadow-retro-sm hover:shadow-retro transition-all"
            >
              {clientOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-xs font-mono font-bold text-neutral-700">
              ▼
            </span>
          </div>
        </div>
      </div>

      {/* نوار ریست فیلترها در صورت فعال بودن */}
      {hasActiveFilters && (
        <div className="flex items-center justify-between pt-2 border-t border-neutral-200 text-xs">
          <span className="font-bold text-neutral-600">
            ⚡ فیلترهای فعال: {statusFilter !== 'all' && `وضعیت [${statusFilter}] `}
            {searchQuery && `جستجو [${searchQuery}] `}
            {selectedClient !== 'all' && `کارفرما [${selectedClient}] `}
          </span>
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-black text-rose-600 hover:underline cursor-pointer flex items-center gap-1"
          >
            <span>پاکسازی فیلترها</span>
            <span>✕</span>
          </button>
        </div>
      )}
    </div>
  );
}

export default InvoiceFilters;
