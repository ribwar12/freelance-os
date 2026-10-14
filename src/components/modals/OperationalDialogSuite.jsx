import React, { useState } from 'react';
import { toPersianDigits } from '../invoices/InvoicePagination';
import { formatToman } from '../invoices/InvoiceLineItemsCard';

/**
 * مودال ۱: ثبت و الحاق کارفرمای جدید (Add New Client Modal)
 * برگرفته از مشخصات طرح گوگل استیچ code(4).html خطوط ۸۰ تا ۲۲۰
 */
export function AddClientModal({ isOpen, onClose, onSaveClient }) {
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [attn, setAttn] = useState('');
  const [nationalId, setNationalId] = useState('');
  const [ecoCode, setEcoCode] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [currency, setCurrency] = useState('TOM');
  const [address, setAddress] = useState('');
  const [terms, setTerms] = useState('net-21');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newClient = {
      id: `client-${Date.now()}`,
      name: name.trim(),
      company: company.trim() || `${name.trim()} (سهامی خاص)`,
      dept: 'دپارتمان محصول و فناوری اطلاعات',
      attn: attn.trim() || 'مدیریت امور قراردادها',
      nationalId: nationalId.trim() || '۱۰۱۰' + Math.floor(1000000 + Math.random() * 9000000),
      ecoCode: ecoCode.trim() || '۴۱۱' + Math.floor(100000000 + Math.random() * 900000000),
      address: address.trim() || 'تهران، خیابان ولیعصر، برج فناوری، پلاک ۱',
      phone: phone.trim() || '۰۲۱-۸۸۰۰۰۰۰۰',
      email: email.trim() || 'finance@client.ir',
      currency,
      terms,
      scope: 'قرارداد توسعه و دیزاین سیستم',
      defaultProject: 'اسپرینت آغازین محصول',
      poPrefix: `PO-${name.substring(0, 2).toUpperCase()}-101`,
    };

    onSaveClient(newClient);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-2xl border-[3px] border-black shadow-[8px_8px_0_0_#000000] overflow-hidden flex flex-col max-h-[90vh]">
        {/* هدر مودال: نوار پاستلی نعنایی با برچسب اصالت */}
        <div className="bg-retro-mint px-6 py-4 border-b-[3px] border-black flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0_0_#000000] flex items-center justify-center font-black text-xl">
              👤
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-base md:text-lg font-black text-black">
                  ثبت و الحاق کارفرمای جدید
                </h2>
                <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded-full bg-white border border-black text-black">
                  PARTNER_V1
                </span>
              </div>
              <p className="text-xs font-bold text-emerald-950 mt-0.5">
                تعریف هویت حقوقی، مالیاتی و کانال‌های پرداخت طرف قرارداد استودیو
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن پنجره"
            className="w-8 h-8 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0_0_#000000] hover:bg-retro-coral hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center font-black text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* فرم مشخصات کارفرما */}
        <form onSubmit={handleSubmit} className="p-5 md:p-6 flex flex-col gap-4 overflow-y-auto bg-white">
          {/* ردیف ۱: نام برند و نام رسمی حقوقی شرکت */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black flex items-center justify-between">
                <span>نام تجاری کارفرما (Brand Name)</span>
                <span className="font-mono text-[10px] text-red-600 font-bold">*الزامی</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: زرین‌پال فین‌تک"
                className="w-full bg-white text-xs font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none focus:shadow-[4px_4px_0_0_#000000] transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black flex items-center justify-between">
                <span>نام ثبتی و حقوقی شرکت (Legal Entity)</span>
                <span className="font-mono text-[10px] text-red-600 font-bold">*الزامی</span>
              </label>
              <input
                type="text"
                required
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="مثال: شرکت سامان پردازش همراه (سهامی خاص)"
                className="w-full bg-white text-xs font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none focus:shadow-[4px_4px_0_0_#000000] transition-all"
              />
            </div>
          </div>

          {/* ردیف ۲: شناسه ملی، کد اقتصادی و نماینده مجاز */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">شناسه ملی ۱۱ رقمی</label>
              <input
                type="text"
                value={nationalId}
                onChange={(e) => setNationalId(e.target.value)}
                placeholder="۱۰۱۰۳۴۹۰۲۱۸"
                className="w-full bg-white text-xs font-mono font-bold text-black px-3 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">کد اقتصادی ۱۲ رقمی</label>
              <input
                type="text"
                value={ecoCode}
                onChange={(e) => setEcoCode(e.target.value)}
                placeholder="۴۱۱۳۸۹۷۴۵۱۹۲"
                className="w-full bg-white text-xs font-mono font-bold text-black px-3 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">نماینده / مدیر پروژه</label>
              <input
                type="text"
                value={attn}
                onChange={(e) => setAttn(e.target.value)}
                placeholder="مهندس احمدی (مدیر محصول)"
                className="w-full bg-white text-xs font-bold text-black px-3 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none"
              />
            </div>
          </div>

          {/* ردیف ۳: ایمیل امور مالی و تلفن تماس مستقیم */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">ایمیل امور مالی / ارسال فاکتور</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="finance@company.com"
                className="w-full bg-white text-xs font-mono font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">شماره تماس مستقیم</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="۰۲۱-۸۸۷۲۹۱۰۰"
                className="w-full bg-white text-xs font-mono font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none"
              />
            </div>
          </div>

          {/* ردیف ۴: نشانی قانونی و واحد ارزی */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">نشانی قانونی و پستی خریدار</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="تهران، خیابان ولیعصر، برج فناوری، طبقه ۴"
                className="w-full bg-white text-xs font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">واحد پولی قرارداد</label>
              <div className="grid grid-cols-3 gap-1.5">
                {['TOM', 'USD', 'EUR'].map((curr) => (
                  <button
                    key={curr}
                    type="button"
                    onClick={() => setCurrency(curr)}
                    className={`py-2 text-xs font-mono font-black rounded-lg border-2 border-black transition-all cursor-pointer ${
                      currency === curr
                        ? 'bg-retro-yellow text-black shadow-[2px_2px_0_0_#000000]'
                        : 'bg-white text-neutral-600 hover:bg-neutral-100'
                    }`}
                  >
                    {curr}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ردیف ۵: شروط پیش‌فرض تسویه و بج استعلام سامانه مودیان */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">مهلت پیش‌فرض پرداخت صورت‌حساب</label>
              <select
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                className="w-full bg-white text-xs font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none cursor-pointer"
              >
                <option value="net-15">تسویه سریع ۱۵ روزه (Net 15 Days)</option>
                <option value="net-21">تسویه استاندارد ۲۱ روزه (Net 21 Days)</option>
                <option value="net-30">تسویه شرکتی ۳۰ روزه (Net 30 Days)</option>
                <option value="immediate">تسویه آنی پس از دریافت (Upon Receipt)</option>
              </select>
            </div>

            {/* بج اعتبارسنجی سامانه امور مالیاتی */}
            <div className="flex items-center gap-3 p-3 bg-retro-mint/30 border-2 border-black rounded-xl shadow-[2px_2px_0_0_#000000]">
              <span className="text-xl">🛡️</span>
              <div className="flex flex-col">
                <span className="font-mono text-[10px] font-black text-emerald-950 uppercase">
                  TAXPAYER VALIDATION
                </span>
                <span className="text-[11px] font-bold text-black">
                  استعلام برخط مودیان مالیاتی فعال
                </span>
              </div>
            </div>
          </div>

          {/* فوتر اکشن‌های مودال */}
          <div className="mt-2 pt-3 border-t-2 border-black flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-black bg-white font-black text-xs shadow-[2px_2px_0_0_#000000] hover:bg-neutral-100 cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border-2 border-black bg-retro-mint font-black text-xs text-black shadow-[3px_3px_0_0_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>💾</span>
              <span>ثبت و الحاق رسمی کارفرما</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/**
 * مودال ۲: تعریف اسکوپ و اسپرینت پروژه جدید (Add New Project Modal)
 * برگرفته از مشخصات طرح گوگل استیچ code(4).html خطوط ۲۲۱ تا ۳۵۰
 */
export function AddProjectModal({ isOpen, onClose, onSaveProject, clientOptions = [] }) {
  const [title, setTitle] = useState('');
  const [clientId, setClientId] = useState(clientOptions[0]?.id || 'digikala');
  const [billingModel, setBillingModel] = useState('fixed');
  const [budget, setBudget] = useState('45000000');
  const [deadline, setDeadline] = useState('۱۴۰۵/۰۸/۱۵');
  const [status, setStatus] = useState('active');
  const [description, setDescription] = useState(
    'طراحی، ممیزی معماری سیستم‌های دیزاین، بازبینی میکرواینترکشن‌ها و تحویل نیازمندی‌های قراردادی.'
  );

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const matchedClient = clientOptions.find((c) => c.id === clientId) || {
      name: 'کارفرمای اختصاصی',
    };

    const newProject = {
      id: `proj-${Date.now()}`,
      title: title.trim(),
      clientId,
      clientName: matchedClient.name,
      billingModel,
      budget: Number(budget.replace(/[^0-9]/g, '')) || 45000000,
      deadline,
      status,
      description: description.trim(),
    };

    onSaveProject(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-none animate-fadeIn">
      <div className="w-full max-w-2xl bg-white rounded-2xl border-[3px] border-black shadow-[8px_8px_0_0_#000000] overflow-hidden flex flex-col max-h-[90vh]">
        {/* هدر مودال: نوار بنفش لواندر */}
        <div className="bg-retro-lavender px-6 py-4 border-b-[3px] border-black flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0_0_#000000] flex items-center justify-center font-black text-xl">
              📂
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-mono text-base md:text-lg font-black text-black">
                  تعریف پروژه و اسپرینت جدید
                </h2>
                <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded-full bg-white border border-black text-black">
                  TRACK_1405
                </span>
              </div>
              <p className="text-xs font-bold text-neutral-800 mt-0.5">
                تنظیم نیازمندی‌ها، بودجه مصوب، کارفرمای متصل و سررسید تحویل
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="بستن پنجره"
            className="w-8 h-8 rounded-xl bg-white border-2 border-black shadow-[2px_2px_0_0_#000000] hover:bg-retro-coral hover:text-white active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center font-black text-sm cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* فرم پروژه */}
        <form onSubmit={handleSubmit} className="p-5 md:p-6 flex flex-col gap-4 overflow-y-auto bg-white">
          {/* عنوان پروژه */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-black flex items-center justify-between">
              <span>عنوان اسپرینت / نام پروژه</span>
              <span className="font-mono text-[10px] text-red-600 font-bold">*الزامی</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="مثال: بازطراحی سیستم دیزاین و فلو پرداخت"
              className="w-full bg-white text-xs font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none"
            />
          </div>

          {/* ردیف ۲: انتخاب کارفرما و مدل حسابداری */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">کارفرمای طرف قرارداد</label>
              <select
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                className="w-full bg-white text-xs font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none cursor-pointer"
              >
                {clientOptions.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">مدل مالی و نحوه پرداخت</label>
              <select
                value={billingModel}
                onChange={(e) => setBillingModel(e.target.value)}
                className="w-full bg-white text-xs font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none cursor-pointer"
              >
                <option value="fixed">مبلغ ثابت بر مبنای تحویل اسپرینت (Fixed Milestone)</option>
                <option value="hourly">ساعتی بر مبنای کارکرد تایم‌شیت (Hourly T&M)</option>
                <option value="retainer">حق‌الزحمه ماهانه ثابت استودیو (Monthly Retainer)</option>
              </select>
            </div>
          </div>

          {/* ردیف ۳: برآورد بودجه و تاریخ ددلاین خورشیدی */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">ارزش کل قرارداد (تومان)</label>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                placeholder="۴۵۰۰۰۰۰۰"
                className="w-full bg-white text-xs font-mono font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-black text-black">ددلاین تحویل خورشیدی</label>
              <input
                type="text"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                placeholder="۱۴۰۵/۰۸/۱۵"
                className="w-full bg-white text-xs font-mono font-bold text-black px-3.5 py-2.5 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none"
              />
            </div>
          </div>

          {/* ردیف ۴: وضعیت پروژه */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-black">وضعیت اولیه پروژه</label>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { id: 'active', label: 'در حال انجام (Active)', color: 'bg-retro-yellow' },
                { id: 'planning', label: 'برنامه‌ریزی اسپرینت', color: 'bg-retro-lavender' },
                { id: 'review', label: 'بازبینی قرارداد', color: 'bg-retro-mint' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStatus(s.id)}
                  className={`px-3 py-2 rounded-xl border-2 border-black font-bold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all ${
                    status === s.id
                      ? `${s.color} text-black shadow-[2px_2px_0_0_#000000] font-black`
                      : 'bg-white text-neutral-600 hover:bg-neutral-100'
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-black"></span>
                  <span>{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ردیف ۵: شرح تعهدات */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black text-black">شرح تعهدات و اقلام تحویلی</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white text-xs font-bold text-black p-3 rounded-xl border-2 border-black shadow-[2px_2px_0_0_#000000] focus:bg-canvas focus:outline-none resize-none leading-relaxed"
            />
          </div>

          {/* فوتر اکشن‌های مودال */}
          <div className="mt-2 pt-3 border-t-2 border-black flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border-2 border-black bg-white font-black text-xs shadow-[2px_2px_0_0_#000000] hover:bg-neutral-100 cursor-pointer"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border-2 border-black bg-retro-lavender font-black text-xs text-black shadow-[3px_3px_0_0_#000000] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_#000000] active:translate-x-0.5 active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>🚀</span>
              <span>تعریف اسپرینت و شروع پروژه</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default { AddClientModal, AddProjectModal };
