import React, { useState } from 'react';
import { formatToman } from './InvoiceLineItemsCard';
import { toPersianDigits } from './InvoicePagination';

/**
 * کامپوننت برگه چاپی رسمی A4 و خروجی فاکتور استاندارد (گام ۵-۱ و فاز ۵)
 * مطابق مشخصات دقیق طرح گوگل استیچ code(3).html با قابلیت زوم آنی و استایل‌های بهینه چاپ
 */
export function InvoicePrintSheet({
  invoice,
  onBack,
  onSendDirect,
}) {
  // استیت کنترل زوم بوم A4 در نمایشگر
  const [zoom, setZoom] = useState(100);

  // داده‌های پیش‌فرض منطبق بر استاندارد فاکتور رسمی نمایشگاه کار مهر ۱۴۰۵
  const activeInvoice = invoice || {
    id: 'INV-1405-10',
    client: 'دیجی‌کالا مارکت‌پلیس',
    clientCompany: 'شرکت نوآوران ارتباطات مهام (دیجی‌کالا)',
    clientDept: 'مرکز توسعه تجربه محصول و هسته دیزاین سیستم',
    clientAttn: 'رضا رستمی (مدیر ارشد محصول)',
    clientNationalId: '۱۰۱۰۳۴۹۰۲۱۸',
    clientEcoCode: '۴۱۱۳۸۹۷۴۵۱۹۲',
    clientAddress: 'تهران، خیابان گاندی جنوبی، کوچه پانزدهم، پلاک ۱۲',
    issueDate: '۱۴۰۵/۰۷/۲۳',
    dueDate: '۱۴۰۵/۰۸/۱۴',
    gregorianDate: '2026-10-15',
    terms: 'تسویه ۲۱ روزه (Net 21 Days)',
    status: 'paid', // 'paid' | 'unpaid' | 'overdue'
    currency: 'تومان',
    items: [
      {
        id: 'item-1',
        title: 'ممیزی دیزاین سیستم و معماری توکن‌های معنایی',
        specs: 'بررسی جامع لایبرری فیگما، متغیرهای معنایی، تاکسونومی تم روز و شب و مشخصات چندسکویی وب و موبایل.',
        qty: '۴۰ ساعت',
        unitRate: 650000,
        total: 26000000,
      },
      {
        id: 'item-2',
        title: 'پروتوتایپ تعاملی و میکرواینترکشن‌های فرانت‌اند',
        specs: 'طراحی تعاملی قیف خرید، انیمیشن‌های دقیق سبد خرید، ماشین وضعیت چندمرحله‌ای و تست فشار واکنش‌گرا.',
        qty: '۲۵ ساعت',
        unitRate: 600000,
        total: 15000000,
      },
      {
        id: 'item-3',
        title: 'مستندات تحویل نرم‌افزار و کارگاه فنی مهندسان فرانت‌‌اند',
        specs: 'دو جلسه تعاملی مشترک با تیم فنی کلاینت، همگام‌سازی استوری‌بوک با توکن‌های طراحی و تدوین دفترچه راهنمای نگهداری.',
        qty: '۱ پکیج',
        unitRate: 4000000,
        total: 4000000,
      },
    ],
    subtotal: 45000000,
    discountPercent: 10,
    discountAmount: 4500000,
    taxableBase: 40500000,
    vatPercent: 10,
    vatAmount: 4050000,
    finalAmount: 44550000,
    rialAmount: 445500000,
    sheba: 'IR82 0560 0840 8000 0124 5592 01',
    cardNumber: '6219 8610 4421 9083',
    beneficiary: 'الکس مرادی',
    bank: 'بانک سامان (شعبه مرکزی تهران)',
    memo: 'INV-1405-10',
    hash: 'SHA-256: 7f8a9e4b21c0b784',
    syncStatus: 'STAMPED • IR-MOF-SYNC',
  };

  const handleZoomIn = () => setZoom((prev) => Math.min(140, prev + 10));
  const handleZoomOut = () => setZoom((prev) => Math.max(70, prev - 10));
  const handleZoomReset = () => setZoom(100);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex flex-col w-full pb-16 selection:bg-retro-yellow selection:text-black">
      {/* ========================================================================= */}
      {/* نوار ابزار تعاملی بالای صفحه (غیرقابل چاپ: print:hidden)                  */}
      {/* ========================================================================= */}
      <aside
        aria-label="Invoice Controls"
        className="print:hidden w-full mb-6 sticky top-20 z-30"
      >
        <div className="bg-white border-2 border-black rounded-xl p-3 sm:p-4 shadow-[4px_4px_0_0_#000000] flex flex-wrap items-center justify-between gap-4">
          {/* بخش راست: ناوبری بازگشت، وضعیت و شناسه فاکتور */}
          <div className="flex items-center flex-wrap gap-3">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 font-mono text-xs font-black text-black bg-canvas hover:bg-neutral-100 px-3 py-1.5 rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
            >
              <span>→</span>
              <span>بازگشت به صورت‌حساب‌ها</span>
            </button>

            <div className="h-6 w-[2px] bg-neutral-200 hidden sm:block"></div>

            {/* بج وضعیت فاکتور */}
            <div className="flex items-center gap-2">
              {activeInvoice.status === 'paid' ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-retro-mint border-2 border-black rounded-full font-mono text-xs font-black text-black shadow-[2px_2px_0_0_#000000]">
                  <span className="w-2 h-2 rounded-full bg-emerald-800 border border-black animate-pulse"></span>
                  تسویه شده • معتبر
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-retro-yellow border-2 border-black rounded-full font-mono text-xs font-black text-black shadow-[2px_2px_0_0_#000000]">
                  <span className="w-2 h-2 rounded-full bg-amber-800 border border-black animate-pulse"></span>
                  در انتظار پرداخت
                </span>
              )}

              <span className="font-mono text-sm font-black text-black tracking-tight">
                # {activeInvoice.id}
              </span>
            </div>

            <div className="hidden xl:flex items-center gap-2 font-mono text-xs text-neutral-600 bg-canvas px-3 py-1 rounded-lg border border-black font-bold">
              <span>تاریخ شمسی: {activeInvoice.issueDate}</span>
              <span>•</span>
              <span className="font-black text-black">{activeInvoice.client}</span>
            </div>
          </div>

          {/* بخش چپ: ابزارهای زوم، ارسال مستقیم و دکمه چاپ / خروجی PDF */}
          <div className="flex items-center flex-wrap gap-2.5">
            {/* ابزار مقیاس و زوم بدون افت کیفیت */}
            <div className="hidden md:flex items-center border-2 border-black rounded-lg bg-canvas p-0.5 shadow-[2px_2px_0_0_#000000]">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoom <= 70}
                className="w-7 h-7 flex items-center justify-center font-mono font-black text-black hover:bg-white rounded transition-colors disabled:opacity-40 cursor-pointer"
                title="کوچک‌نمایی (Zoom Out)"
              >
                -
              </button>
              <span className="font-mono text-xs font-black px-2 text-black min-w-[50px] text-center">
                {toPersianDigits(zoom)}٪
              </span>
              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoom >= 140}
                className="w-7 h-7 flex items-center justify-center font-mono font-black text-black hover:bg-white rounded transition-colors disabled:opacity-40 cursor-pointer"
                title="بزرگ‌نمایی (Zoom In)"
              >
                +
              </button>
              <button
                type="button"
                onClick={handleZoomReset}
                className="px-2 py-0.5 text-[11px] font-mono font-black hover:bg-white rounded border-r border-black mr-1 text-black cursor-pointer"
                title="تنظیم مجدد به ۱۰۰٪"
              >
                Fit
              </button>
            </div>

            {/* دکمه ارسال مستقیم ایمیل / اعلان به حسابداری کارفرما */}
            <button
              type="button"
              onClick={onSendDirect}
              className="inline-flex items-center gap-1.5 bg-white text-black font-black text-xs px-3.5 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0_0_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#000000] transition-all cursor-pointer"
            >
              <span>✉️</span>
              <span>ارسال مستقیم</span>
            </button>

            {/* دکمه چاپ و ذخیره PDF رسمی استاندارد */}
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 bg-retro-yellow text-black font-black text-xs px-4 py-2 rounded-xl border-2 border-black shadow-[3px_3px_0_0_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_0_#000000] transition-all cursor-pointer"
            >
              <span>🖨️</span>
              <span>چاپ / خروجی PDF</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* بوم استاندارد صفحه چاپی A4 (PRINTABLE DOCUMENT CANVAS)                   */}
      {/* ========================================================================= */}
      <div className="w-full flex justify-center overflow-x-auto pb-8 print:p-0 print:m-0 print:overflow-visible">
        <div
          id="invoiceCanvas"
          style={{
            transform: zoom !== 100 ? `scale(${zoom / 100})` : 'none',
            transformOrigin: 'top center',
          }}
          className="w-full max-w-[860px] bg-white border-[3px] border-black shadow-[8px_8px_0_0_#000000] print:shadow-none print:border-none print:max-w-none print:w-full p-6 sm:p-10 transition-transform origin-top flex flex-col justify-between"
        >
          {/* --------------------------------------------------------------------- */}
          {/* بخش الف: هدر استودیو صادرکننده و بج اطلاعات مالیاتی رسمی فاکتور        */}
          {/* --------------------------------------------------------------------- */}
          <section className="border-b-[3px] border-black pb-6 mb-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
              {/* سمت راست: هویت برند استودیو صادرکننده و کدهای ثبت اقتصادی */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-xl bg-retro-yellow border-2 border-black flex items-center justify-center font-mono font-black text-2xl shadow-[2px_2px_0_0_#000000] shrink-0">
                    ⚡
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xl font-black block text-black leading-tight">
                        FreelanceOS Studio
                      </span>
                      <span className="font-mono text-[9px] font-black px-1.5 py-0.5 bg-black text-white rounded">
                        IR-TAX REGISTERED
                      </span>
                    </div>
                    <span className="text-xs text-neutral-600 font-bold block mt-0.5">
                      استودیو مستقل طراحی سیستم‌های نرم‌افزاری و دیزاین‌سیستم‌های مقیاس‌پذیر
                    </span>
                  </div>
                </div>

                <div className="space-y-1 text-xs text-neutral-800 font-bold">
                  <p className="font-black text-black text-sm flex items-center gap-1.5">
                    <span>الکس مرادی — معمار ارشد سیستم‌های دیزاین و نرم‌افزار</span>
                    <span className="text-[10px] text-neutral-500 font-mono font-normal">(Alex Moradi)</span>
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-neutral-600 mt-1">
                    <span>
                      <strong className="text-black">کد ملی:</strong> ۰۰۱-۹۸۲۴۱۰-۳
                    </span>
                    <span>
                      <strong className="text-black">کد اقتصادی:</strong> IR-98442011
                    </span>
                    <span>
                      <strong className="text-black">پرونده مالیاتی:</strong> IR-TX-440912
                    </span>
                  </div>
                  <p className="text-neutral-600">
                    تهران، بلوار نلسون ماندلا (جردن)، برج فناوری، طبقه ۴، واحد ۴۰۲
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-neutral-600">
                    <span>alex@freelanceos.design</span>
                    <span>۰۲۱-۸۸۷۲۹۱۰۰</span>
                    <span>کد پستی: ۱۹۱۷۷-۳۸۱۱۲</span>
                  </div>
                </div>
              </div>

              {/* سمت چپ: باکس صورت‌حساب رسمی مالیاتی (TAX INVOICE) */}
              <div className="w-full md:w-72 bg-canvas border-2 border-black rounded-xl p-4 shadow-[4px_4px_0_0_#000000] relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-retro-yellow border-b-2 border-black"></div>
                <div className="pt-1">
                  <div className="flex items-center justify-between border-b-2 border-black pb-2 mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-sm font-black uppercase tracking-tight text-black">
                        صورت‌حساب رسمی
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="font-mono text-[10px] font-black px-1.5 py-0.5 bg-neutral-200 rounded border border-black text-black">
                        ماده ۱۶۹ م.م
                      </span>
                      <span className="font-mono text-[10px] font-black px-1.5 py-0.5 bg-retro-mint rounded border border-black text-emerald-950">
                        رسمی
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 font-bold">شماره فاکتور:</span>
                      <span className="font-black text-black">{activeInvoice.id}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 font-bold">تاریخ صدور شمسی:</span>
                      <span className="font-bold text-black">{activeInvoice.issueDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 font-bold">معادل میلادی:</span>
                      <span className="text-neutral-700">{activeInvoice.gregorianDate}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600 font-bold">مهلت تسویه:</span>
                      <span className="font-bold text-black bg-retro-yellow px-1.5 py-0.5 rounded border border-black text-[11px]">
                        {activeInvoice.terms}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-t border-black pt-1.5 mt-1.5">
                      <span className="text-neutral-600 font-bold">واحد ارزی:</span>
                      <span className="font-black text-black">{activeInvoice.currency} (تومان)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* بخش ب: مشخصات طرفین معامله (صادرکننده / خریدار)                      */}
          {/* --------------------------------------------------------------------- */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {/* کارت صادرکننده خدمت (PROVIDER) */}
            <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000]">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b-2 border-black">
                <span className="font-mono text-[11px] font-black text-black flex items-center gap-1.5">
                  <span>💼</span>
                  <span>صادرکننده و مجری خدمت (ISSUED BY - PROVIDER)</span>
                </span>
                <span className="font-mono text-[10px] font-black px-2 py-0.5 bg-retro-mint rounded-full border border-black text-emerald-950 shadow-[1px_1px_0_0_#000000]">
                  مؤدی تأییدشده شاپرک و امور مالیاتی ✓
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-black text-black text-sm">الکس مرادی</p>
                <p className="font-bold text-neutral-600">استودیو طراحی سیستم‌های نرم‌افزاری FreelanceOS</p>
                <div className="pt-2 font-mono text-[11px] space-y-1 text-neutral-700 font-bold">
                  <div className="flex justify-between items-center bg-canvas p-1.5 rounded border border-black/40">
                    <span className="text-neutral-500">کد ملی صادرکننده:</span>
                    <span className="font-black text-black">۰۰۱-۹۸۲۴۱۰-۳</span>
                  </div>
                  <div className="flex justify-between items-center bg-canvas p-1.5 rounded border border-black/40">
                    <span className="text-neutral-500">کد اقتصادی مؤدی:</span>
                    <span className="font-black text-black">IR-98442011</span>
                  </div>
                  <div className="pt-0.5">
                    <strong className="text-black">نشانی دفتر مرکزی:</strong> تهران، بلوار نلسون ماندلا (جردن)، برج فناوری، واحد ۴۰۲
                  </div>
                  <div className="flex justify-between items-center text-neutral-600 pt-0.5">
                    <span>کد پستی: ۱۹۱۷۷-۳۸۱۱۲</span>
                    <span>تلفن: ۰۲۱-۸۸۷۲۹۱۰۰</span>
                  </div>
                </div>
              </div>
            </div>

            {/* کارت خریدار / کارفرما (BILLED TO) */}
            <div className="bg-canvas border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000]">
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b-2 border-black">
                <span className="font-mono text-[11px] font-black text-black flex items-center gap-1.5">
                  <span>🏢</span>
                  <span>خریدار و طرف قرارداد (BILLED TO - CLIENT)</span>
                </span>
                <span className="font-mono text-[10px] font-black px-2 py-0.5 bg-retro-yellow rounded border border-black text-black shadow-[1px_1px_0_0_#000000]">
                  شخصیت حقوقی معتبر (CORPORATE PJSC)
                </span>
              </div>
              <div className="space-y-1 text-xs">
                <p className="font-black text-black text-sm">{activeInvoice.clientCompany}</p>
                <p className="font-bold text-neutral-600">{activeInvoice.clientDept}</p>
                <div className="pt-2 font-mono text-[11px] space-y-1 text-neutral-700 font-bold">
                  <div className="flex justify-between items-center bg-white p-1.5 rounded border border-black/40">
                    <span className="text-neutral-500">نماینده مجاز / به توجه:</span>
                    <span className="font-black text-black">{activeInvoice.clientAttn}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    <div className="bg-white p-1.5 rounded border border-black/40 flex justify-between items-center">
                      <span className="text-neutral-500 text-[10px]">شناسه ملی:</span>
                      <span className="font-black text-black text-[11px]">{activeInvoice.clientNationalId}</span>
                    </div>
                    <div className="bg-white p-1.5 rounded border border-black/40 flex justify-between items-center">
                      <span className="text-neutral-500 text-[10px]">کد اقتصادی:</span>
                      <span className="font-black text-black text-[11px]">{activeInvoice.clientEcoCode}</span>
                    </div>
                  </div>
                  <div className="pt-0.5">
                    <strong className="text-black">نشانی قانونی خریدار:</strong> {activeInvoice.clientAddress}
                  </div>
                  <div className="flex justify-between items-center text-neutral-600 pt-0.5">
                    <span>تلفن تماس: {activeInvoice.clientPhone || '۰۲۱-۶۱۹۳۰۰۰۰'}</span>
                    <span>پشتیبانی مالیاتی: معتبر</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* بخش ج: جدول اقلام، خدمات و شرح فنی اسکوپ                              */}
          {/* --------------------------------------------------------------------- */}
          <section className="mb-6">
            <div className="border-2 border-black rounded-xl shadow-[4px_4px_0_0_#000000] overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-right border-collapse">
                  <thead>
                    <tr className="bg-canvas border-b-2 border-black font-mono text-xs font-black text-black">
                      <th className="py-2.5 px-3 w-12 text-center border-l-2 border-black">#</th>
                      <th className="py-2.5 px-4 border-l-2 border-black">
                        شرح تعهدات، اقلام تحویلی و مشخصات فنی مهندسی
                      </th>
                      <th className="py-2.5 px-3 w-28 text-center border-l-2 border-black">
                        مقدار / واحد
                      </th>
                      <th className="py-2.5 px-3 w-36 text-left border-l-2 border-black font-mono">
                        نرخ واحد ({activeInvoice.currency})
                      </th>
                      <th className="py-2.5 px-4 w-40 text-left font-mono">
                        مبلغ کل ({activeInvoice.currency})
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-black text-xs font-bold">
                    {activeInvoice.items.map((item, idx) => (
                      <tr key={item.id} className="hover:bg-canvas/50 transition-colors">
                        <td className="py-3.5 px-3 text-center font-mono text-xs border-l-2 border-black align-top font-black">
                          {toPersianDigits(idx + 1 < 10 ? `0${idx + 1}` : idx + 1)}
                        </td>
                        <td className="py-3.5 px-4 border-l-2 border-black align-top space-y-1">
                          <p className="font-black text-black text-sm">{item.title}</p>
                          <p className="text-neutral-600 font-normal leading-relaxed text-[11px]">
                            {item.specs}
                          </p>
                        </td>
                        <td className="py-3.5 px-3 text-center font-mono text-xs border-l-2 border-black align-top font-black">
                          {item.qty}
                        </td>
                        <td className="py-3.5 px-3 text-left font-mono text-xs border-l-2 border-black align-top font-black">
                          {formatToman(item.unitRate)}
                        </td>
                        <td className="py-3.5 px-4 text-left font-mono text-sm text-black align-top font-black">
                          {formatToman(item.total)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* بخش د: اطلاعات واریز بانکی و ریزمحاسبات مالی صورت‌حساب                */}
          {/* --------------------------------------------------------------------- */}
          <section className="grid grid-cols-1 md:grid-cols-12 gap-5 mb-6">
            {/* سمت راست: دستورالعمل واریز و کانال‌های تسویه بانکی (۷ ستون) */}
            <div className="md:col-span-7 bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-2 mb-2.5 border-b-2 border-black">
                  <span className="font-mono text-xs font-black text-black flex items-center gap-1.5">
                    <span>🏦</span>
                    <span>کانال تسویه حساب و شماره شبا رسمی</span>
                  </span>
                  <span className="font-mono text-[10px] font-bold text-emerald-800 bg-retro-mint px-1.5 py-0.5 rounded border border-black">
                    پایا / ساتنا شتاب
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="bg-canvas p-2 rounded-lg border border-black">
                    <span className="font-mono text-[10px] text-neutral-500 block font-bold">
                      شماره شبا (IBAN / SHEBA):
                    </span>
                    <span className="font-mono text-xs font-black text-black select-all tracking-wider dir-ltr block text-left">
                      {activeInvoice.sheba}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                    <div className="bg-canvas p-2 rounded-lg border border-black">
                      <span className="text-[10px] text-neutral-500 block font-bold">نام صاحب حساب:</span>
                      <strong className="text-black">{activeInvoice.beneficiary}</strong>
                    </div>
                    <div className="bg-canvas p-2 rounded-lg border border-black">
                      <span className="text-[10px] text-neutral-500 block font-bold">بانک عامل:</span>
                      <strong className="text-black">{activeInvoice.bank}</strong>
                    </div>
                  </div>

                  <div className="bg-canvas p-2 rounded-lg border border-black font-mono text-xs flex justify-between items-center">
                    <span className="text-[10px] text-neutral-500 font-bold">شماره کارت متصل:</span>
                    <span className="font-black text-black tracking-wider dir-ltr">
                      {activeInvoice.cardNumber}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-2.5 border-t border-neutral-200 text-neutral-600 font-mono text-[11px] font-bold">
                <span className="font-black text-black">یادداشت انتقال:</span> لطفاً در فیلد بابت انتقال
                پایا/ساتنا شناسه{' '}
                <code className="font-mono font-black text-black bg-retro-yellow px-1 border border-black rounded">
                  {activeInvoice.memo}
                </code>{' '}
                را قید فرمایید.
              </div>
            </div>

            {/* سمت چپ: جدول ریزمحاسبات، تخفیف، مالیات و کادر کل قابل پرداخت (۵ ستون) */}
            <div className="md:col-span-5 flex flex-col justify-between gap-3">
              <div className="bg-white border-2 border-black rounded-xl p-3.5 shadow-[3px_3px_0_0_#000000] space-y-2 text-xs font-bold">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-600">
                    جمع ناخالص ({toPersianDigits(activeInvoice.items.length)} قلم خدمت):
                  </span>
                  <span className="font-mono text-xs font-black text-black">
                    {formatToman(activeInvoice.subtotal)} {activeInvoice.currency}
                  </span>
                </div>

                <div className="flex justify-between items-center bg-retro-coral/15 px-2 py-1 rounded border border-black text-retro-coral">
                  <span className="font-bold text-black">
                    تخفیف همکاری ({toPersianDigits(activeInvoice.discountPercent)}٪):
                  </span>
                  <span className="font-mono text-xs font-black">
                    -{formatToman(activeInvoice.discountAmount)} {activeInvoice.currency}
                  </span>
                </div>

                <div className="flex justify-between items-center pt-0.5">
                  <span className="text-neutral-600">مبلغ مشمول مالیات:</span>
                  <span className="font-mono text-xs font-black text-black">
                    {formatToman(activeInvoice.taxableBase)} {activeInvoice.currency}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-0.5">
                  <span className="text-neutral-600">
                    مالیات بر ارزش افزوده ({toPersianDigits(activeInvoice.vatPercent)}٪):
                  </span>
                  <span className="font-mono text-xs font-black text-emerald-800">
                    +{formatToman(activeInvoice.vatAmount)} {activeInvoice.currency}
                  </span>
                </div>
              </div>

              {/* کادر زردرنگ برجسته مبلغ نهایی کل (GRAND TOTAL DUE) */}
              <div className="bg-retro-yellow border-[3px] border-black rounded-xl p-3.5 shadow-[4px_4px_0_0_#000000]">
                <span className="font-mono text-[11px] font-black text-black block mb-0.5">
                  مبلغ نهایی قابل پرداخت (AMOUNT DUE)
                </span>
                <div className="font-mono text-2xl font-black text-black leading-tight flex items-baseline gap-1">
                  <span>{formatToman(activeInvoice.finalAmount)}</span>
                  <span className="text-xs font-black">{activeInvoice.currency}</span>
                </div>
                <p className="font-mono text-[10px] text-neutral-800 mt-1 border-t border-black/30 pt-1 font-bold">
                  معادل ریالی: {formatToman(activeInvoice.rialAmount)} ریال
                </p>
              </div>
            </div>
          </section>

          {/* --------------------------------------------------------------------- */}
          {/* بخش هـ: هش رمزنگاری، امضای مجاز، مهر استودیو و پاورقی سند رسمی       */}
          {/* --------------------------------------------------------------------- */}
          <footer className="border-t-[3px] border-black pt-5 mt-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
              {/* تاییدیه دفتر کل و ماتریس QR شبیه‌سازی‌شده */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white border-2 border-black rounded-lg p-1 shrink-0 flex flex-col justify-between shadow-[2px_2px_0_0_#000000]">
                  <div className="flex justify-between">
                    <div className="w-3 h-3 bg-black"></div>
                    <div className="w-3 h-3 bg-black"></div>
                  </div>
                  <div className="flex justify-center items-center">
                    <div className="w-2 h-2 bg-retro-yellow border border-black"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="w-3 h-3 bg-black"></div>
                    <div className="w-1.5 h-1.5 bg-black self-end"></div>
                  </div>
                </div>
                <div className="space-y-0.5">
                  <span className="font-mono text-[11px] font-black text-black block">
                    هش اصالت دفتر کل
                  </span>
                  <p className="font-mono text-[10px] text-neutral-600 truncate max-w-[140px] font-bold">
                    {activeInvoice.hash}
                  </p>
                  <span className="inline-block font-mono text-[9px] text-emerald-800 font-black">
                    {activeInvoice.syncStatus}
                  </span>
                </div>
              </div>

              {/* امضای دیجیتال و معمار ارشد */}
              <div className="text-center border-y-2 md:border-y-0 md:border-x-2 border-black py-3 md:py-0 px-2">
                <span className="font-mono text-[10px] font-bold text-neutral-600 block mb-0.5">
                  امضای مجاز صاحب اثر و مجری
                </span>
                <div className="h-8 flex items-center justify-center font-mono text-base italic font-black text-black select-none tracking-widest">
                  Alex Moradi
                </div>
                <div className="w-28 h-[1.5px] bg-black mx-auto mt-0.5 mb-1"></div>
                <span className="font-mono text-[10px] text-neutral-600 font-bold block">
                  ثبت دیجیتال: {activeInvoice.issueDate}
                </span>
              </div>

              {/* مهر برجسته استودیو با چرخش ۸- درجه (Official Studio Seal) */}
              <div className="flex justify-center md:justify-end">
                <div className="relative w-24 h-24 border-[3px] border-dashed border-red-700 rounded-full flex flex-col items-center justify-center text-center p-1.5 rotate-[-8deg] shadow-[2px_2px_0_0_#b91c1c] select-none">
                  <div className="w-full h-full border border-red-700 rounded-full flex flex-col items-center justify-center">
                    <span className="font-mono text-[7px] font-black uppercase text-red-700 tracking-tighter">
                      FREELANCEOS LAB
                    </span>
                    <span className="text-red-700 text-sm leading-none">✓</span>
                    <span className="font-mono text-[9px] font-black uppercase text-red-700 leading-none mt-0.5">
                      OFFICIAL SEAL
                    </span>
                    <span className="font-mono text-[7px] text-red-700 font-black mt-0.5">
                      ۱۴۰۵ • TEHRAN
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* پاورقی قانونی چاپ سند */}
            <div className="mt-5 pt-3 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between text-neutral-500 font-mono text-[10px] font-bold gap-2">
              <span>صورت‌حساب رسمی قابل چاپ مالیاتی • استاندارد کاغذ: A4-ISO216 • فرم IR-TAX-89</span>
              <span className="font-black text-black">سامانه جامع FreelanceOS v2.4 • صفحه ۱ از ۱</span>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

export default InvoicePrintSheet;
