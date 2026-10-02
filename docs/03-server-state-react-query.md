# 📘 درس ۳: تسلط بر سرور استیت با React Query (TanStack Query)

<div dir="rtl">

در این درس یاد می‌گیری که چطور دیتای دیتابیس را کش کنی و چطور با ایجاد یا حذف دیتا، لیست‌ها به صورت خودکار بدون رفرش مرورگر آپدیت شوند.

---

### ۱. واکشی اطلاعات با useQuery
به جای نوشتن کدهای طولانی `useEffect` و `useState` برای لودینگ و خطا، از `useQuery` استفاده کردیم:

```typescript
export const useInvoices = () => {
  return useQuery<Invoice[]>({
    queryKey: ['invoices'], // کلید کش یکتا
    queryFn: invoiceService.getInvoices, // تابع واکشی اطلاعات
    staleTime: 1000 * 60 * 5, // دیتا تا ۵ دقیقه تازه (Fresh) در نظر گرفته می‌شود
  });
};
```

**مزیت:**
وقتی کاربر بین صفحه فاکتورها و داشبورد جابجا می‌شود، هیچ اسپینر یا لودینگی مشاهده نمی‌کند؛ چون دیتا از حافظه کش خوانده می‌شود.

---

### ۲. جهش داده‌ها با useMutation و باطل‌سازی کش (Invalidation)
وقتی یک فاکتور جدید ثبت می‌شود یا وضعیت آن به «پرداخت شده» تغییر می‌کند، کش دیتای قبلی نامعتبر می‌شود. اینجا از جادوی **Query Invalidation** استفاده می‌کنیم:

```typescript
export const useCreateInvoice = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: invoiceService.createInvoice,
    onSuccess: () => {
      // به ری‌اکت کوئری می‌گوییم کش فاکتورها بیات شده است و باید مجدداً لود شود
      queryClient.invalidateQueries({ queryKey: ['invoices'] });
    },
  });
};
```

---

### ۳. سوال مصاحبه: «مفهوم Stale-While-Revalidate در React Query چیست؟»
> **پاسخ:** «یعنی ابتدا فوراً دیتای قبلی موجود در حافظه رم (Stale Data) را به کاربر نشان بده تا معطل لودینگ نشود، و همزمان در پس‌زمینه یک درخواست به سرور بزن تا در صورت تغییر، دیتای صفحه بی‌صدا به‌روز شود.»

</div>
