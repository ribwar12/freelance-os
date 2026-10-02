# 📘 درس ۵: دیتابیس ابری Supabase و کدهای SQL

<div dir="rtl">

اگر خواستی پروژه را به اکانت واقعی Supabase متصل کنی، کافی است وارد داشبورد Supabase خودت شوی و کدهای زیر را در بخش **SQL Editor** کپی و دکمه **RUN** را بزنی:

---

### کدهای SQL ساخت جداول:

```sql
-- ۱. جدول پروفایل کاربر
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  business_name text,
  phone text,
  bank_card text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ۲. جدول مشتریان
create table clients (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  name text not null,
  company text,
  email text,
  phone text not null,
  address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ۳. جدول پروژه‌ها
create table projects (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  client_id uuid references clients on delete cascade not null,
  title text not null,
  description text,
  budget numeric default 0,
  status text check (status in ('in_progress', 'completed', 'on_hold')) default 'in_progress',
  deadline date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ۴. جدول فاکتورها
create table invoices (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users not null,
  client_id uuid references clients on delete cascade not null,
  project_id uuid references projects on delete set null,
  invoice_number text not null,
  issue_date date not null,
  due_date date not null,
  subtotal numeric default 0,
  tax_percent numeric default 0,
  tax_amount numeric default 0,
  discount_percent numeric default 0,
  discount_amount numeric default 0,
  total_amount numeric default 0,
  status text check (status in ('draft', 'pending', 'paid', 'overdue')) default 'pending',
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ۵. جدول ردیف‌های اقلام فاکتور
create table invoice_items (
  id uuid default gen_random_uuid() primary key,
  invoice_id uuid references invoices on delete cascade not null,
  description text not null,
  quantity numeric default 1,
  unit_price numeric default 0,
  total numeric default 0
);
```

---

### فعال‌سازی امنیت Row-Level Security (RLS)

```sql
-- فعال‌سازی RLS روی تمام جداول
alter table profiles enable row level security;
alter table clients enable row level security;
alter table projects enable row level security;
alter table invoices enable row level security;
alter table invoice_items enable row level security;

-- تعریف پالیسی: هر کاربر فقط داده‌های خودش را ببیند و ویرایش کند
create policy "Users can view and edit own profile" on profiles
  for all using (auth.uid() = id);

create policy "Users can view and edit own clients" on clients
  for all using (auth.uid() = user_id);

create policy "Users can view and edit own projects" on projects
  for all using (auth.uid() = user_id);

create policy "Users can view and edit own invoices" on invoices
  for all using (auth.uid() = user_id);

create policy "Users can view and edit own invoice items" on invoice_items
  for all using (
    exists (
      select 1 from invoices
      where invoices.id = invoice_items.invoice_id and invoices.user_id = auth.uid()
    )
  );
```

---

### تنظیم متغیرهای محیطی در فرانت‌اند:
پس از اجرای اسکریپت بالا، کلیدهای پروژه را از Supabase در فایل `.env` در ریشه پروژه قرار بده:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGci...
```

</div>
