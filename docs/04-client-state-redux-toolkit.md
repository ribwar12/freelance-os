# 📘 درس ۴: مدیریت استیت فرم‌های پیچیده با Redux Toolkit

<div dir="rtl">

در این درس با قلب تپنده بخش صدور فاکتور آشنا می‌شوی؛ جایی که Redux قدرت واقعی خودش را نشان می‌دهد.

---

### ۱. چرا فرم فاکتور به Redux نیاز داشت؟
یک فاکتور مالی از چندین ردیف تشکیل شده که هر ردیف دارای:
* شرح کار
* تعداد یا ساعت
* تعرفه واحد
* جمع ردیف (ضرب تعداد در تعرفه)

علاوه بر این، در انتهای فرم فیلد **درصد تخفیف** و **درصد مالیات ارزش افزوده** داریم. هر تغییری در این فیلدها باید **فوراً و در همان میلی‌ثانیه** مبالغ زیر را دوباره محاسبه کند:
1. جمع ناخالص (Subtotal)
2. مبلغ تخفیف (Discount Amount)
3. مبلغ مشمول مالیات
4. مبلغ مالیات (Tax Amount)
5. مبلغ نهایی قابل پرداخت (Total Amount)

اگر این محاسبات با درخواست‌های سرور یا هوک‌های پراکنده ری‌اکت انجام می‌شد، کدها غیرقابل نگهداری می‌شدند. ما تمام این منطق را در یک اسلایس مستقل به نام `invoiceSlice` کپسوله کردیم.

---

### ۲. ساختار اسلایس (invoiceSlice.ts)

```typescript
// تابع کمکی برای انجام محاسبات ریاضی
const calculateTotals = (items, taxPercent, discountPercent) => {
  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unit_price, 0);
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round((taxableAmount * taxPercent) / 100);
  const totalAmount = taxableAmount + taxAmount;

  return { subtotal, discountAmount, taxAmount, totalAmount };
};
```

در ریدوسرهای ریداکس، هر زمان که کاربر ردیفی را کم، زیاد یا ویرایش می‌کند، `calculateTotals` فراخوانی می‌شود و استیت به طور خودکار به روزرسانی می‌گردد.

---

### ۳. نحوه اتصال به کامپوننت با typed hooks
برای جلوگیری از باگ‌های تایپ‌اسکریپت، از دو هوک اختصاصی استفاده می‌کنیم:
* `useAppSelector`: برای خواندن مقادیر لحظه‌ای (مثل جمع کل)
* `useAppDispatch`: برای ارسال اکشن‌ها (مثل `addItem`, `setTaxPercent`)

---

### ۴. سوال مصاحبه: «تفاوت Action و Reducer در Redux Toolkit چیست؟»
> **پاسخ:** «اکشن (Action) اعلام‌کننده یک رویداد یا قصد انجام کاری است (مثلاً کاربر می‌گوید ردیف جدید اضافه کن). ردیوسر (Reducer) تابع خالصی است که بر اساس آن اکشن، وضعیت قبلی استیت را گرفته و وضعیت جدید را تولید می‌کند. در Redux Toolkit به لطف توابعی مثل createSlice، اکشن‌ها به طور خودکار بر اساس متدهای تعریف شده ساخته می‌شوند.»

</div>
