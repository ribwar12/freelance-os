import React from 'react';
import { toPersianDigits } from '../invoices/InvoicePagination';
import { formatToman } from '../invoices/InvoiceLineItemsCard';

/**
 * صفحه مدیریت پروژه‌ها و پایپ‌لاین اسپرینت‌ها (/projects)
 * برگرفته از مشخصات طرح گوگل استیچ code(4).html
 */
export function ProjectsPage({
  projectsList = [],
  onOpenNewProjectModal,
  onNewInvoiceForProject,
}) {
  return (
    <div className="flex flex-col gap-6 w-full select-none pb-12">
      {/* هدر صفحه و دکمه اقدام */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b-2 border-black">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-retro-lavender border-2 border-black shadow-[3px_3px_0_0_#000000] flex items-center justify-center font-black text-xl">
            🚀
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-mono text-xl font-black text-black">
                پایپ‌لاین پروژه‌ها و اسپرینت‌ها
              </h1>
              <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-retro-lavender border border-black shadow-[1px_1px_0px_#000000]">
                اسپرینت‌های فعال ۱۴۰۵
              </span>
            </div>
            <p className="text-xs font-bold text-neutral-600 mt-0.5">
              مدیریت اسپرینت‌های فعال، ددلاین‌های تحویل و فازبندی توسعه نرم‌افزار استودیو
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenNewProjectModal}
          className="bg-black text-white hover:bg-neutral-800 text-xs font-black px-4 py-3 rounded-xl border-2 border-black shadow-[3px_3px_0_0_#FFE600] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#FFE600] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>➕</span>
          <span>تعریف پروژه جدید</span>
        </button>
      </div>

      {/* نوار شاخص‌های کلیدی پروژه‌ها */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">پروژه‌های فعال</span>
          <div className="font-mono text-2xl font-black text-black">
            {toPersianDigits(projectsList.length)} <span className="text-xs font-bold">اسپرینت کاری</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold block pt-1 border-t border-neutral-200">
            ✓ بدون تأخیر در سررسیدها
          </span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">مجموع ارزش اسپرینت‌ها</span>
          <div className="font-mono text-2xl font-black text-black">
            ۲۸۵,۰۰۰,۰۰۰ <span className="text-xs font-bold">تومان</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold block pt-1 border-t border-neutral-200">
            ✓ قراردادهای قطعی پاییز
          </span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">تحویل‌های نزدیک</span>
          <div className="font-mono text-2xl font-black text-black">
            ۲ <span className="text-xs font-bold">ددلاین تا پایان هفته</span>
          </div>
          <span className="text-[10px] text-amber-800 font-bold block pt-1 border-t border-neutral-200">
            ⏳ نیازمند ممیزی کد و داکیومنت
          </span>
        </div>

        <div className="bg-white border-2 border-black rounded-xl p-4 shadow-[3px_3px_0_0_#000000] space-y-1">
          <span className="font-mono text-[11px] font-bold text-neutral-500">نرخ رضایت کارفرما</span>
          <div className="font-mono text-2xl font-black text-black">
            ۹۸.۶٪ <span className="text-xs font-bold">تأییدیه کیفی</span>
          </div>
          <span className="text-[10px] text-emerald-800 font-bold block pt-1 border-t border-neutral-200">
            ✓ استانداردهای بالای استودیو
          </span>
        </div>
      </div>

      {/* جدول پروژه‌ها */}
      <div className="bg-white border-[3px] border-black rounded-2xl shadow-[6px_6px_0_0_#000000] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-canvas border-b-2 border-black font-mono text-xs font-black text-black">
                <th className="py-3 px-4 border-l-2 border-black">پروژه و اسکوپ فنی</th>
                <th className="py-3 px-4 border-l-2 border-black">کارفرمای طرف قرارداد</th>
                <th className="py-3 px-3 text-center border-l-2 border-black">مدل مالی</th>
                <th className="py-3 px-4 text-left border-l-2 border-black font-mono">بودجه اسپرینت</th>
                <th className="py-3 px-3 text-center border-l-2 border-black">ددلاین تحویل</th>
                <th className="py-3 px-3 text-center border-l-2 border-black">وضعیت</th>
                <th className="py-3 px-3 text-center">اقدام</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black text-xs font-bold">
              {projectsList.map((proj) => (
                <tr key={proj.id} className="hover:bg-canvas/50 transition-colors">
                  <td className="py-3.5 px-4 border-l-2 border-black align-top space-y-1">
                    <p className="font-black text-black text-sm">{proj.title}</p>
                    <p className="text-neutral-600 font-normal text-[11px] line-clamp-1">
                      {proj.description}
                    </p>
                  </td>

                  <td className="py-3.5 px-4 border-l-2 border-black align-top font-black text-black">
                    {proj.clientName}
                  </td>

                  <td className="py-3.5 px-3 text-center border-l-2 border-black align-top font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-canvas border border-black text-neutral-800">
                      {proj.billingModel === 'fixed'
                        ? 'مبلغ ثابت'
                        : proj.billingModel === 'hourly'
                        ? 'ساعتی T&M'
                        : 'ریتینر ماهانه'}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-left border-l-2 border-black align-top font-mono text-sm font-black text-black">
                    {formatToman(proj.budget)}{' '}
                    <span className="text-[10px] font-normal text-neutral-500 font-sans">تومان</span>
                  </td>

                  <td className="py-3.5 px-3 text-center border-l-2 border-black align-top font-mono text-xs">
                    {proj.deadline}
                  </td>

                  <td className="py-3.5 px-3 text-center border-l-2 border-black align-top font-mono text-xs">
                    <span className="px-2 py-0.5 rounded-full border border-black bg-retro-yellow font-black text-black shadow-[1px_1px_0_0_#000000]">
                      در حال توسعه ✓
                    </span>
                  </td>

                  <td className="py-3.5 px-3 text-center align-top">
                    <button
                      type="button"
                      onClick={() => onNewInvoiceForProject && onNewInvoiceForProject(proj)}
                      className="bg-white hover:bg-retro-mint text-black font-black text-xs px-2.5 py-1 rounded-lg border-2 border-black shadow-[2px_2px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all cursor-pointer"
                    >
                      صدور فاکتور 🧾
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ProjectsPage;
