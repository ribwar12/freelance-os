# مستند گام ۵-۴: هش رمزنگاری، امضای دیجیتال، مهر برجسته استودیو و استایل‌های بهینه چاپ A4 (InvoicePrintSheet.jsx)

> **تاریخ تکمیل:** ۲۳ مهر ۱۴۰۵  
> **وضعیت فاز ۵:** گام چهارم از ۵ گام تکمیل شد (**۸۰٪ فاز ۵ | ۹۶٪ کل پروژه**)  
> **مسیر فایل کامپوننت:** `src/components/invoices/InvoicePrintSheet.jsx` و `src/index.css`  
> **مرجع طراحی:** طرح گوگل استیچ `code(3).html` خطوط ۲۷۸ تا ۳۳۲

---

## ۱. هدف و فلسفه اصالت حقوقی گام ۵-۴

یک فاکتور رسمی تجاری برای اعتباربخشی نیازمند نشانه‌های بصری اصالت، امضای مجاز تعهدآور، کد رهگیری رمزنگاری‌شده (Hash) و مهر رسمی شرکت صادرکننده است.

در این گام:
1. **ماتریس QR و هش دفتر کل (Ledger Verification):**
   - طراحی ماتریس ۲ بعدی شبیه‌سازی‌شده QR با الگوهای استاندارد یابنده در سه گوشه و سلول زردرنگ در مرکز.
   - کد هش یکتای سند: `SHA-256: 7f8a9e4b21c0b784`.
   - برچسب همگام‌سازی مالیاتی: `STAMPED • IR-MOF-SYNC` با پس‌زمینه نعنایی.

2. **امضای مجاز صاحب اثر و مجری (Authorized Signatory):**
   - قلم خوشنویسی دیجیتال برای نام معمار ارشد `Alex Moradi`.
   - خط تفکیک زیر امضا و تاریخ ثبت دیجیتال خورشیدی: `ثبت دیجیتال: ۱۴۰۵/۰۷/۲۳ • گواهی نماد الکترونیکی`.

3. **مهر برجسته قرمز استودیو (Official Studio Seal):**
   - کادر دایره‌ای دو لایه با حاشیه ۳ پیکسلی خط‌چین زرشکی (`border-[3px] border-dashed border-red-700`).
   - چرخش طبیعی منفی ۸ درجه (`rotate-[-8deg]`) برای تداعی حس ملموس اثر مهر دستی و جوهری.
   - عناوین رسمی درون مهر: `FREELANCEOS DESIGN LAB • ★ OFFICIAL SEAL ★ • ۱۴۰۵ • TEHRAN • ثبت ۴۴۰۹۱۲`.

4. **پاورقی استاندارد چاپ:**
   - تصریح بر استاندارد بین‌المللی کاغذ: `A4-ISO216` و فرم مالیاتی `IR-TAX-89`.

5. **بهینه‌سازی عمیق موتور چاپ در [`src/index.css`](file:///D:/freelance-os/src/index.css):**
   ```css
   @media print {
     @page {
       size: A4 portrait;
       margin: 8mm;
     }
     body {
       direction: rtl;
       background: white !important;
       color: black !important;
       -webkit-print-color-adjust: exact !important;
       print-color-adjust: exact !important;
     }
     header, nav, aside, .print\:hidden, .no-print {
       display: none !important;
     }
     #invoiceCanvas {
       box-shadow: none !important;
       border: none !important;
       max-width: 100% !important;
       width: 100% !important;
       padding: 0 !important;
       margin: 0 !important;
       transform: none !important;
     }
     section, table, tr, footer {
       break-inside: avoid !important;
       page-break-inside: avoid !important;
     }
   }
   ```
   قانون `break-inside: avoid` تضمین می‌کند که هیچ جدولی یا ردیفی در زمان تبدیل به PDF یا پرینت شکسته یا نیمه‌کاره بریده نشود.

---

## ۲. وضعیت نقشه راه فاز ۵

- [x] **گام ۵-۱:** لایوت بوم A4، نوار کنترل زوم و استایل‌های پرینت (`InvoicePrintSheet.jsx`)
- [x] **گام ۵-۲:** هدر برند استودیو، شناسه اقتصادی و کارت‌های دو ستونه صادرکننده و خریدار
- [x] **گام ۵-۳:** جدول رسمی شرح خدمات، مشخصات مهندسی و باکس حساب بانکی سامان شبا
- [x] **گام ۵-۴:** هش رمزنگاری، امضای دیجیتال و مهر برجسته قرمز استودیو
- [ ] **گام ۵-۵ (گام نهایی پروژه):** مودال‌های افزودن سریع مشتری/پروژه، راستی‌آزمایی E2E کل پروژه و آمادگی کامل برای ارائه نمایشگاه کار
