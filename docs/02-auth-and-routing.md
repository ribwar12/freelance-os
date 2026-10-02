# 📘 درس ۲: احراز هویت و مسیریابی محافظت‌شده (Auth & Protected Routes)

<div dir="rtl">

در این درس یاد می‌گیری که چطور ورود و ثبت‌نام کاربر مدیریت می‌شود و چگونه صفحات داشبورد را از دید افراد لاگین‌نکرده محافظت می‌کنیم.

---

### ۱. ساختار کامپوننت ProtectedRoute
کاربر تا زمانی که لاگین نکرده نباید به مسیرهایی مثل `/invoices` یا `/dashboard` دسترسی داشته باشد. برای این کار از تکنیک **Layout Route** در React Router v6 استفاده کردیم:

```tsx
// src/routes/ProtectedRoute.tsx
export const ProtectedRoute: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    // اگر کاربر لاگین نبود، او را به صفحه ورود هدایت کن
    return <Navigate to="/login" replace />;
  }

  // اگر لاگین بود، محتوای صفحه مورد نظر را نشان بده
  return <Outlet />;
};
```

### ۲. مفهوم `<Outlet />` چیست؟
در React Router، وقتی مسیرها را به صورت تو در تو (Nested) تعریف می‌کنی، کامپوننت والد با استفاده از `<Outlet />` اعلام می‌کند که فرزندانش در کجای صفحه باید رندر شوند.

### ۳. ستاپ هوک useAuth و AuthContext
برای اینکه اطلاعات کاربر در سراسر صفحات در دسترس باشد، از **React Context API** استفاده کردیم:
* تابع `signIn(email, password)`: ورود و ذخیره نشست (Session).
* تابع `signUp(email, password, fullName)`: ساخت اکانت جدید.
* تابع `signOut()`: خروج و پاک‌سازی حافظه.

---

### ۴. سوال مصاحبه: «چرا سشن کاربر را در Redux ذخیره نکردی؟»
> **پاسخ:** «احراز هویت ماهیت سشن دارد و با رفرش صفحه نباید بپرد. ارتباط مستقیم آن با لیسنر Supabase یا Context API باعث شد کدهای چرخه ورود از استور موقت کلاینت جدا بماند و پیچیدگی بی‌مورد به Redux اضافه نشود.»

</div>
