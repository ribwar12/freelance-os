import React from 'react';

// لیست کارفرمایان معتبر و فعال استودیو
export const CLIENT_OPTIONS = [
  {
    id: 'digikala',
    name: 'دیجی‌کالا مارکت‌پلیس',
    scope: 'اسپرینت دیزاین محصول • مشتری فعال',
    defaultProject: 'دیزاین سیستم و توکن‌ها (تحویل فاز ۲)',
    poPrefix: 'PO-DK-9041',
  },
  {
    id: 'snappay',
    name: 'اسنپ‌پی فین‌تک',
    scope: 'بازطراحی سوپراپ والت و پرداخت',
    defaultProject: 'بازطراحی اپلیکیشن و والت UX',
    poPrefix: 'PO-SN-302',
  },
  {
    id: 'cafebazaar',
    name: 'کافه بازار',
    scope: 'پورتال دیسکاوری بازی‌ها و برنامه‌ها',
    defaultProject: 'گایدلاین برند و هویت بصری',
    poPrefix: 'PO-CB-401',
  },
  {
    id: 'torob',
    name: 'موتور جستجوی ترب',
    scope: 'داشبورد هوش مصنوعی و تحلیل قیمت',
    defaultProject: 'داشبورد آنالیتیکس و هوش مصنوعی',
    poPrefix: 'PO-TR-880',
  },
  {
    id: 'divar',
    name: 'دیوار آگهی‌ها',
    scope: 'فیلترهای پیشرفته املاک و خودرو',
    defaultProject: 'اسپرینت بازطراحی فیلترها',
    poPrefix: 'PO-DV-109',
  },
  {
    id: 'alibaba',
    name: 'علی‌بابا تراول',
    scope: 'پنل پروازهای خارجی و هتل',
    defaultProject: 'پنل پروازهای خارجی و هتل',
    poPrefix: 'PO-AB-552',
  },
  {
    id: 'tapsi',
    name: 'تپسی کورپوریت',
    scope: 'پورتال سازمانی سفرها',
    defaultProject: 'پورتال سازمانی و گزارش سفرها',
    poPrefix: 'PO-TP-771',
  },
  {
    id: 'nobitex',
    name: 'نوبیتکس اکسچنج',
    scope: 'چارت‌های تریدینگ ویو و کریپتو',
    defaultProject: 'بازطراحی چارت‌های تریدینگ ویو',
    poPrefix: 'PO-NB-910',
  },
];

// لیست پروژه‌ها و حوزه‌های کاری متداول
export const PROJECT_OPTIONS = [
  'دیزاین سیستم و توکن‌ها (تحویل فاز ۲)',
  'پروتوتایپ تعاملی و میکرواینترکشن با Framer',
  'زیرساخت دیزاین‌اپس و پل ارتباطی Storybook',
  'بازطراحی رابط کاربری درگاه پرداخت و چک‌اوت',
  'طراحی داشبورد آنالیتیکس و مانیتورینگ بلادرنگ',
  'توسعه کامپوننت‌های دسترسی‌پذیر بر بستر Tailwind',
];

/**
 * کارت ۱: مشخصات کارفرما و متادیتای فاکتور (گام ۴-۲)
 * برگرفته از طرح گوگل استیچ code(1).html خطوط ۴۰ تا ۱۱۶
 */
export function InvoiceMetadataCard({
  client = 'digikala',
  onClientChange,
  project = PROJECT_OPTIONS[0],
  onProjectChange,
  invoiceId = 'INV-1405-10',
  poRef = 'PO-DK-9041',
  onPoRefChange,
  issueDate = '۱۴۰۵/۰۷/۱۰',
  onIssueDateChange,
  dueDate = '۱۴۰۵/۰۸/۰۱',
  onDueDateChange,
  onNewClientClick,
}) {
  return (
    <section className="bg-white border-[3px] border-black rounded-2xl p-5 md:p-6 shadow-retro select-none">
      {/* هدر کارت شماره ۱ با بج زرد نئوبروتال */}
      <div className="flex items-center justify-between pb-4 mb-5 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <span className="w-8 h-8 flex items-center justify-center bg-retro-yellow border-2 border-black font-mono font-black text-sm rounded-lg shadow-[2px_2px_0_0_#000000]">
            ۱
          </span>
          <div>
            <h2 className="font-black text-base md:text-lg text-black font-sans leading-tight">
              مشخصات کارفرما و متادیتای صورت‌حساب
            </h2>
            <p className="text-[11px] font-bold text-neutral-500">
              اطلاعات حقوقی طرف قرارداد، شماره سفارش و تاریخ‌های شمسی تسویه
            </p>
          </div>
        </div>

        <span className="font-mono text-[10px] font-black text-black bg-retro-slate px-2.5 py-1 rounded-lg border-2 border-black shadow-[1px_1px_0_0_#000000]">
          بخش: متادیتا
        </span>
      </div>

      {/* گرید فرم‌های ورود اطلاعات */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
        {/* ۱. انتخاب کارفرما */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs font-black text-black flex items-center gap-1.5">
              <span>🏢</span>
              <span>سازمان / شرکت کارفرما:</span>
            </label>
            <button
              type="button"
              onClick={onNewClientClick}
              className="text-xs font-bold text-neutral-700 hover:text-black hover:underline flex items-center gap-1 cursor-pointer transition-colors"
            >
              <span>+ کارفرمای جدید</span>
            </button>
          </div>

          <div className="relative">
            <select
              value={client}
              onChange={(e) => {
                const selected = e.target.value;
                onClientChange && onClientChange(selected);
                const found = CLIENT_OPTIONS.find((c) => c.id === selected);
                if (found && onPoRefChange) {
                  onPoRefChange(found.poPrefix);
                }
              }}
              className="w-full bg-white border-2 border-black rounded-xl px-4 py-2.5 font-bold text-xs md:text-sm text-black appearance-none focus:outline-none focus:bg-canvas shadow-[2px_2px_0_0_#000000] cursor-pointer transition-all"
            >
              {CLIENT_OPTIONS.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name} — {c.scope}
                </option>
              ))}
            </select>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none font-bold text-xs">
              ▼
            </span>
          </div>
        </div>

        {/* ۲. پروژه مرتبط */}
        <div className="flex flex-col gap-1.5 md:col-span-2">
          <label className="font-mono text-xs font-black text-black flex items-center gap-1.5">
            <span>💼</span>
            <span>پروژه و حوزه کاری مرتبط (Scope / Project):</span>
          </label>
          <div className="relative">
            <select
              value={project}
              onChange={(e) => onProjectChange && onProjectChange(e.target.value)}
              className="w-full bg-white border-2 border-black rounded-xl px-4 py-2.5 font-bold text-xs md:text-sm text-black appearance-none focus:outline-none focus:bg-canvas shadow-[2px_2px_0_0_#000000] cursor-pointer transition-all"
            >
              {PROJECT_OPTIONS.map((p, idx) => (
                <option key={idx} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none font-bold text-xs">
              ▼
            </span>
          </div>
        </div>

        {/* ۳. شماره شناسه فاکتور (سیستمی) */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs font-black text-black flex items-center gap-1.5">
            <span>🏷️</span>
            <span>شناسه سریال فاکتور:</span>
          </label>
          <div className="flex items-center bg-retro-slate/40 border-2 border-black rounded-xl px-3 py-2 shadow-[2px_2px_0_0_#000000]">
            <input
              type="text"
              readOnly
              value={invoiceId}
              className="bg-transparent font-mono font-black text-xs md:text-sm text-black w-full focus:outline-none cursor-default select-all"
            />
            <span className="px-2 py-0.5 bg-white border border-black text-[10px] font-mono font-black rounded text-neutral-700 shadow-[1px_1px_0_0_#000000]">
              سیستمی
            </span>
          </div>
        </div>

        {/* ۴. ارجاع قرارداد / کد پیگیری کارفرما */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs font-black text-black flex items-center gap-1.5">
            <span>📝</span>
            <span>کد قرارداد / شماره سفارش (PO):</span>
          </label>
          <div className="flex items-center bg-white border-2 border-black rounded-xl px-3 py-2 shadow-[2px_2px_0_0_#000000] focus-within:bg-canvas transition-colors">
            <input
              type="text"
              value={poRef}
              onChange={(e) => onPoRefChange && onPoRefChange(e.target.value)}
              placeholder="مثال: PO-DK-9041"
              className="bg-transparent font-mono font-bold text-xs md:text-sm text-black w-full focus:outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>

        {/* ۵. تاریخ صدور شمسی */}
        <div className="flex flex-col gap-1.5">
          <label className="font-mono text-xs font-black text-black flex items-center gap-1.5">
            <span>📅</span>
            <span>تاریخ صدور (شمسی):</span>
          </label>
          <div className="flex items-center bg-white border-2 border-black rounded-xl px-3 py-2 shadow-[2px_2px_0_0_#000000] focus-within:bg-canvas transition-colors">
            <input
              type="text"
              value={issueDate}
              onChange={(e) => onIssueDateChange && onIssueDateChange(e.target.value)}
              placeholder="۱۴۰۵/۰۷/۱۰"
              className="bg-transparent font-mono font-bold text-xs md:text-sm text-black w-full focus:outline-none"
            />
          </div>
        </div>

        {/* ۶. تاریخ سررسید پرداخت */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label className="font-mono text-xs font-black text-black flex items-center gap-1.5">
              <span>⏳</span>
              <span>موعد سررسید تسویه:</span>
            </label>
            <span className="font-mono text-[10px] text-emerald-800 bg-retro-mint/40 px-2 py-0.5 rounded border border-emerald-600/40 font-bold">
              سررسید ۲۱ روزه (Net 21)
            </span>
          </div>
          <div className="flex items-center bg-white border-2 border-black rounded-xl px-3 py-2 shadow-[2px_2px_0_0_#000000] focus-within:bg-canvas transition-colors">
            <input
              type="text"
              value={dueDate}
              onChange={(e) => onDueDateChange && onDueDateChange(e.target.value)}
              placeholder="۱۴۰۵/۰۸/۰۱"
              className="bg-transparent font-mono font-bold text-xs md:text-sm text-black w-full focus:outline-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InvoiceMetadataCard;
