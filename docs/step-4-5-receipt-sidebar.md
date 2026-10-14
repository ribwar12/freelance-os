# مستند گام ۴-۵: سایدبار صندوق حسابداری زنده، تخفیف، مالیات و صدور رسمی فاکتور (InvoiceReceiptSidebar.jsx)

> **تاریخ تکمیل:** ۲۳ مهر ۱۴۰۵  
> **وضعیت فاز ۴:** گام پنجم از ۵ گام تکمیل شد (**۱۰۰٪ فاز ۴ به پایان رسید**)  
> **مسیر فایل کامپوننت:** `src/components/invoices/InvoiceReceiptSidebar.jsx`  
> **مرجع طراحی:** طرح گوگل استیچ `code(1).html` خطوط ۲۶۵ تا ۳۶۵

---

## ۱. هدف و معماری سایدبار صندوق (Cash Register Ledger)

در سازنده فاکتور نئوبروتال، کاربر نیاز دارد هنگام ویرایش مقادیر ردیف‌ها، نرخ ساعات یا اعمال تخفیف، فوراً نتیجه محاسباتی را در قالب یک رسید رسمی و ملموس (شبیه فیش صندوق‌های فروشگاهی با خطوط چین‌خورده و هدر مشکی قطور) مشاهده کند.

در این گام:
1. **طراحی چسبنده (Sticky Top-24):** سایدبار در اسکرول‌های طولانی دسکتاپ همواره در دید کاربر باقی می‌ماند تا حتی هنگام ویرایش آخرین ردیف‌های خدمت، مبلغ نهایی را از دست ندهد.
2. **محاسبات زنده ریاضی (Real-time Reactive Math):**
   - **جمع ناخالص (Gross Subtotal):** حاصل‌جمع `quantity * rate` تمام ردیف‌های خدمت فعال.
   - **تخفیف همکاری:** دراپ‌داون استپ‌های ۰٪، ۵٪، ۱۰٪، ۱۵٪ و ۲۰٪ با محاسبه و تفریق ریالی فوری.
   - **خالص پس از تخفیف (Net Subtotal):** مبلغ مبنا جهت محاسبه ارزش افزوده.
   - **سوئیچ مالیات ارزش افزوده (۱۰٪ VAT Checkbox):** فعال/غیرفعال‌سازی با محاسبه ریالی دقیق به نفع یا بدون مالیات.
   - **مبلغ نهایی (Total Amount Due):** در یک باکس نئوبروتال طلایی با سایه سخت ۴ پیکسلی، همراه با نمایش معادل ریالی.

3. **اکشن ذخیره و صدور فاکتور رسمی (`onSaveInvoice`):**
   - استخراج متادیتای تکمیل‌شده توسط کاربر (شماره فاکتور، نام کارفرما، پروژه، تاریخ، اقلام، توضیحات حقوقی و وضعیت اولیه `پرداخت‌نشده`).
   - تزریق به عنوان عضو اول آرایه فاکتورها (`prepend` به `invoicesList`).
   - نمایش پیام موفقیت (Toast) به همراه ریدایرکت نرم به مسیر `/invoices` برای دیدن فاکتور در جدول.

4. **اکشن‌های مکمل:**
   - دکمه پیش‌نمایش چاپی A4 (`onPreviewPrint`).
   - دکمه ذخیره قالب تکرارپذیر (`onSaveTemplate`).
   - دکمه انصراف و پاکسازی پیش‌نویس (`onDiscardDraft`).
   - بج خوش‌حسابی کارفرما و شناسه امنیتی هش دفتر کل.

---

## ۲. جریان استیت و اتصال به `App.jsx`

در فایل مرکزی `App.jsx`، تمامی مقادیر ردیف‌ها و فیلدهای متادیتا به این سایدبار متصل هستند:

```javascript
// محاسبات زنده در App.jsx
const grossSubtotal = invoiceLineItems.reduce(
  (acc, item) => acc + (Number(item.quantity) || 0) * (Number(item.unitRate) || 0),
  0
);
const discountAmount = Math.round((grossSubtotal * (invoiceDiscount || 0)) / 100);
const netAfterDiscount = grossSubtotal - discountAmount;
const vatTaxAmount = isInvoiceVatEnabled ? Math.round((netAfterDiscount * 10) / 100) : 0;
const finalTotalAmount = netAfterDiscount + vatTaxAmount;

// ذخیره فاکتور رسمی
const handleSaveInvoice = () => {
  const newInvoiceObj = {
    id: invoiceFormMeta.invoiceNumber || `INV-1405-${invoicesList.length + 1}`,
    client: invoiceFormMeta.clientName,
    project: invoiceFormMeta.projectName,
    issueDate: invoiceFormMeta.issueDate,
    dueDate: invoiceFormMeta.dueDate,
    amount: finalTotalAmount,
    status: 'unpaid',
    hasAttachment: true,
    currency: 'تومان',
  };

  setInvoicesList((prev) => [newInvoiceObj, ...prev]);
  showToastNotification(`فاکتور رسمی ${newInvoiceObj.id} صادر و در دفتر کل ثبت شد! 🧾🎉`);
  navigate('/invoices');
};
```

---

## ۳. پایان رسمی فاز ۴ و آماده‌سازی برای فاز ۵

با تکمیل این گام، **فاز ۴ به صورت ۱۰۰٪ به پایان رسید:**
- [x] **گام ۴-۱:** شالوده صفحه و لایوت دو ستونه فرم و سایدبار (`CreateInvoicePage.jsx`)
- [x] **گام ۴-۲:** کارت ۱ - متادیتا، کارفرما و تاریخ‌های خورشیدی (`InvoiceMetadataCard.jsx`)
- [x] **گام ۴-۳:** کارت ۲ - جدول آیتم‌های خدمات، محاسبه ردیف و درج تایم‌شیت (`InvoiceLineItemsCard.jsx`)
- [x] **گام ۴-۴:** کارت ۳ - شرایط حقوقی تسویه و باکس حساب بانکی سامان با کپی شبا (`InvoicePaymentNotesCard.jsx`)
- [x] **گام ۴-۵:** سایدبار صندوق حسابداری زنده، تخفیف، ارزش افزوده و صدور رسمی (`InvoiceReceiptSidebar.jsx`)

**پیش به سوی فاز ۵: برگه چاپی رسمی A4، استایل‌های پرینت مدیا، خروجی PDF و پولیش نهایی کل پروژه!** 🚀
