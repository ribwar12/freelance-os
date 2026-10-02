# 🎨 راهنمای جامع طراحی نئوبروتالیسم (Google Stitch) و نقشه پیاده‌سازی گام‌به‌گام

<div dir="rtl">

این فایل شامل تمام پرامپت‌های انگلیسی برای طراحی در **Google Stitch** و **پرامپت‌های آماده دستوری برای چت** است تا بتوانیم مرحله‌به‌مرحله و کامپوننت‌به‌کامپوننت جلو برویم.

---

## 📌 راهنمای سریع کار با Google Stitch
1. وارد سایت [stitch.withgoogle.com](https://stitch.withgoogle.com/) شوید.
2. برای هر بخش، ابتدا پرامپت انگلیسی را به Stitch بدهید تا طرح بصری را بسازد.
3. سپس پرامپت دستوری همان بخش را در همین چت کپی و ارسال کنید (اگر کدی یا تصویری از استیچ گرفتید هم می‌توانید ضمیمه کنید) تا فوراً تبدیل به کد واقعی شود.

---

## 🟡 بخش ۱: دیزاین سیستم و پالت رنگ نئوبروتالیسم (Design Tokens & Base UI)

### هدف:
تنظیم کلاس‌های اختصاصی Tailwind و کامپوننت‌های پایه (دکمه‌های تاکتایل با سایه سخت، کارت‌های ضخیم مشکی، اینپوت‌های نئوبروتال).

### 📝 پرامپت انگلیسی برای Google Stitch:
```text
Create a comprehensive Neo-brutalist / Retro-Modern design system and UI component kit for a SaaS called 'FreelanceOS'. 
Palette: Warm cream background (#FDFBF7), deep black borders (#000000), electric yellow (#FFE600), vibrant mint green (#A8F0D0), retro coral (#FF708A), electric lavender (#C4B5FD).
Components to display:
1. Tactile buttons with 2px solid black borders, hard 4px drop shadows (no blur), and active click depress animation.
2. Input fields with thick black outlines and high-contrast focus states.
3. Status badges with colorful backgrounds and crisp 2px black pill outlines.
4. Card containers with 2px borders, hard shadows, and bold contrasting header banners.
```

### 🚀 پرامپت دستوری برای ارسال در چت:
> **«برو سراغ بخش ۱: دیزاین سیستم و متغیرهای نئوبروتالیسم رو در Tailwind و کامپوننت‌های پایه (Button, Card, Input, Badge) پیاده کن.»**

---

## 🟢 بخش ۲: پیشخوان و آمار مالی (Dashboard Overview)

### هدف:
کارت‌های شاخص عملکرد (درآمد کل، مطالبات معوق، پروژه‌های فعال) با استایل نئوبروتال و جدول خلاصه آخرین فاکتورها.

### 📝 پرامپت انگلیسی برای Google Stitch:
```text
Design the main Dashboard screen for 'FreelanceOS' in bold Neo-brutalist aesthetic.
Header: Bold retro greeting banner 'Welcome back, Alex!' with action buttons '+ New Invoice' and '+ Add Client' with 4px hard drop shadows.
KPI Metric Cards: 4 distinct cards with thick black borders and pastel backgrounds:
- 'Total Collected' (mint green with bold price)
- 'Pending Due' (electric yellow with count)
- 'Active Projects' (electric lavender)
- 'Total Clients' (coral pink)
Main Section: Two columns. Left column contains 'Recent Invoices' data table with bold column headers, status badges, and action triggers. Right column contains 'Active Projects Progress' with chunky progress bars.
```

### 🚀 پرامپت دستوری برای ارسال در چت:
> **«برو سراغ بخش ۲: صفحه پیشخوان اصلی (Dashboard) رو با کارت‌های آماری نئوبروتال و جدول فاکتورهای اخیر پیاده‌سازی کن.»**

---

## 🟣 بخش ۳: جدول جامع و فیلتر فاکتورها (Invoices Directory Table)

### هدف:
جدول پیشرفته مدیریت فاکتورها، تب‌های فیلتر وضعیت (پرداخت‌شده، معوق، پیش‌نویس)، سرچ لایو، و دکمه‌های اقدام سریع با React Query.

### 📝 پرامپت انگلیسی برای Google Stitch:
```text
Design the 'Invoices Directory' screen for 'FreelanceOS' in Neo-brutalist style.
Top Bar: Segmented tab buttons ('All', 'Pending Payment', 'Paid', 'Draft') styled with solid 2px black borders and tactile active states. Beside it is a bold search input with retro search icon.
Table: A robust high-contrast data table with heavy borders. Columns: Invoice ID (monospace), Client Name & Company, Issue Date, Due Date, Total Amount (bold currency), Status Badge (colorful pills with black outlines), and Action buttons (View/Print, Mark Paid, Delete).
Bottom: Retro-styled pagination with chunky arrow buttons.
```

### 🚀 پرامپت دستوری برای ارسال در چت:
> **«برو سراغ بخش ۳: صفحه لیست و جدول فاکتورها (Invoices Page) رو با فیلتر وضعیت‌ها و جدول نئوبروتال بساز.»**

---

## 🟠 بخش ۴: فاکتورساز تعاملی و پیش‌نویس زنده (Interactive Invoice Builder)

### هدف:
فرم ثبت فاکتور با ردیف‌های پویا و سایدبار محاسبات آنی مبالغ، تخفیف و مالیات با استفاده از **Redux Toolkit**.

### 📝 پرامپت انگلیسی برای Google Stitch:
```text
Design the 'New Invoice Creator' screen for 'FreelanceOS' in Neo-brutalist style.
Left Side: Form inputs with thick borders for selecting Client, Project, Invoice #, and Dates. Below that, a dynamic 'Line Items' card allowing users to add service rows (Description, Hours/Qty, Rate, Total) with retro trash icons and a chunky '+ Add Service Row' button.
Right Side: A sticky retro cash-register summary card. Shows live Subtotal, interactive Discount % stepper, Tax % stepper, and a massive bright yellow 'Final Total Due' banner with 4px hard shadow. Bottom has a large tactile button: 'Save & Generate Official Invoice'.
```

### 🚀 پرامپت دستوری برای ارسال در چت:
> **«برو سراغ بخش ۴: فرم تعاملی فاکتورساز (New Invoice) رو با ردیف‌های داینامیک و محاسبات لحظه‌ای Redux Toolkit پیاده‌سازی کن.»**

---

## 🔵 بخش ۵: برگه رسمی چاپی و خروجی فاکتور (Printable / PDF Invoice Sheet)

### هدف:
طراحی رسمی و استاندارد ابعاد A4 با هویت نئوبروتال شیک که دکمه چاپ و ذخیره PDF داشته باشد.

### 📝 پرامپت انگلیسی برای Google Stitch:
```text
Design a clean, printable official A4 Invoice sheet in a refined neo-brutalist aesthetic.
Header: Bold business name, logo stamp, issue date, due date, invoice serial number in monospace font.
Middle: Two retro cards side by side: 'Billed To' (Client name, company, address) and 'Issued By' (Freelancer name, bank card / IBAN details).
Table: Clean itemized table with crisp black borders listing service description, hours, rate, and row totals.
Footer: Summary box (Subtotal, Discount, Tax, Grand Total), payment instructions box with bank account details, and a signature/stamp seal placeholder at the bottom. Include a top action bar with 'Print / Save PDF' button.
```

### 🚀 پرامپت دستوری برای ارسال در چت:
> **«برو سراغ بخش ۵: برگه رسمی فاکتور برای چاپ و دانلود PDF (Invoice Detail Page) رو با استایل نئوبروتال تمیز بساز.»**

---

## 🔴 بخش ۶: مدیریت مشتریان و پروژه‌ها (Clients & Projects Modals)

### هدف:
کارت‌های مشتریان و پروژه‌ها همراه با مودال‌های پاپ‌آپ نئوبروتال برای ثبت مشتری جدید و قرارداد جدید.

### 📝 پرامپت انگلیسی برای Google Stitch:
```text
Design the 'Clients & Projects Management' interface for 'FreelanceOS' in Neo-brutalist style.
Features a grid of client cards displaying avatar badges, company name, contact info (phone, email), and quick actions.
Includes a chunky pop-up modal dialog for 'Add New Client' and 'Add New Project' with heavy 3px black borders, pastel headers, and retro form inputs.
```

### 🚀 پرامپت دستوری برای ارسال در چت:
> **«برو سراغ بخش ۶: بخش مدیریت مشتریان و پروژه‌ها (Clients & Projects) رو همراه با مودال‌های پاپ‌آپ نئوبروتال پیاده کن.»**

---

## 🏁 نحوه شروع کار:
فایل بالا همیشه در مسیر `D:\freelance-os\STITCH_PROMPTS_AND_ROADMAP.md` در دسترس توست. 
هر زمان آماده بودی، پرامپت دستوری **بخش ۱** را بفرست تا اولین قدم را شروع کنیم!

</div>
