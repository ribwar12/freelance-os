import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { InvoicesPage } from './components/invoices/InvoicesPage';
import { InvoiceSummaryStrip } from './components/invoices/InvoiceSummaryStrip';
import { InvoiceFilters } from './components/invoices/InvoiceFilters';
import { InvoicesTable, INITIAL_INVOICES_DATA } from './components/invoices/InvoicesTable';
import { InvoiceShortcutsDock, toPersianDigits } from './components/invoices/InvoicePagination';
import { CreateInvoicePage } from './components/invoices/CreateInvoicePage';
import { InvoiceMetadataCard, CLIENT_OPTIONS } from './components/invoices/InvoiceMetadataCard';
import { InvoiceLineItemsCard, INITIAL_LINE_ITEMS, formatToman } from './components/invoices/InvoiceLineItemsCard';
import { InvoicePaymentNotesCard, DEFAULT_PAYMENT_TERMS } from './components/invoices/InvoicePaymentNotesCard';
import { InvoiceReceiptSidebar } from './components/invoices/InvoiceReceiptSidebar';
import { InvoicePrintSheet } from './components/invoices/InvoicePrintSheet';
import { AddClientModal, AddProjectModal } from './components/modals/OperationalDialogSuite';
import { ClientsPage } from './components/clients/ClientsPage';
import { ProjectsPage } from './components/projects/ProjectsPage';
import { ReportsPage } from './components/reports/ReportsPage';

/**
 * کامپوننت محفظه روت داینامیک برگه چاپی رسمی A4 بر مبنای شناسه فاکتور (/invoices/:id/print)
 */
function InvoicePrintRouteWrapper({ invoicesList, onBack, onSendDirect }) {
  const { id } = useParams();
  const found = invoicesList.find((i) => i.id === id);

  let amountNum = 44550000;
  if (found) {
    if (typeof found.amount === 'number') {
      amountNum = found.amount;
    } else if (typeof found.amount === 'string') {
      const cleaned = found.amount.replace(/[^0-9]/g, '');
      if (cleaned) amountNum = parseInt(cleaned, 10);
    }
  }

  const clientInfo = CLIENT_OPTIONS.find(
    (c) => c.name === found?.client || c.id === found?.client || (found?.client && c.name.includes(found.client))
  );

  const invoiceData = found
    ? {
        id: found.id,
        client: found.client,
        clientCompany: clientInfo?.company || found.clientCompany || `${found.client} (سهامی خاص)`,
        clientDept: clientInfo?.dept || found.clientDept || 'مرکز توسعه تجربه محصول و هسته دیزاین سیستم',
        clientAttn: clientInfo?.attn || found.clientAttn || 'مهندس رضا رستمی (مدیر ارشد محصول)',
        clientNationalId: clientInfo?.nationalId || found.clientNationalId || '۱۰۱۰۳۴۹۰۲۱۸',
        clientEcoCode: clientInfo?.ecoCode || found.clientEcoCode || '۴۱۱۳۸۹۷۴۵۱۹۲',
        clientAddress: clientInfo?.address || found.clientAddress || 'تهران، خیابان ولیعصر، بالاتر از ظفر، پلاک ۱۰۲',
        clientPhone: clientInfo?.phone || '۰۲۱-۶۱۹۳۰۰۰۰',
        issueDate: found.issueDate || '۱۴۰۵/۰۷/۲۳',
        dueDate: found.dueDate || '۱۴۰۵/۰۸/۱۴',
        gregorianDate: '2026-10-15',
        terms: 'تسویه ۲۱ روزه (Net 21 Days)',
        status: found.status === 'paid' ? 'paid' : 'unpaid',
        currency: 'تومان',
        items: [
          {
            id: 'item-1',
            title: `توسعه، طراحی و تحویل اسپرینت‌های فنی ${found.project || 'پروژه'}`,
            specs: 'طراحی، ممیزی معماری سیستم‌های دیزاین، بازبینی میکرواینترکشن‌ها و تحویل نیازمندی‌های قراردادی.',
            qty: '۱ پروژه',
            unitRate: amountNum,
            total: amountNum,
          },
        ],
        subtotal: amountNum,
        discountPercent: 0,
        discountAmount: 0,
        taxableBase: amountNum,
        vatPercent: 0,
        vatAmount: 0,
        finalAmount: amountNum,
        rialAmount: amountNum * 10,
        sheba: 'IR82 0560 0840 8000 0124 5592 01',
        cardNumber: '6219 8610 4421 9083',
        beneficiary: 'ریبوار دباله',
        bank: 'بانک سامان (شعبه مرکزی تهران)',
        memo: found.id,
        hash: 'SHA-256: 7f8a9e4b21c0b784',
        syncStatus: 'STAMPED • IR-MOF-SYNC',
      }
    : null;

  return (
    <InvoicePrintSheet
      invoice={invoiceData}
      onBack={onBack}
      onSendDirect={() => onSendDirect(id || 'INV-1405-10')}
    />
  );
}

export default function App() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState('current_month');
  const [actionNotice, setActionNotice] = useState('');

  // لیست کامل فاکتورها در استیت جهت عملیات واقعی و زنده CRUD (گام ۳-۴)
  const [invoicesList, setInvoicesList] = useState(INITIAL_INVOICES_DATA);
  const [selectedInvoiceIds, setSelectedInvoiceIds] = useState([]);

  // استیت‌های فیلتر و جستجوی فاکتورها (گام ۳-۳)
  const [invoiceStatus, setInvoiceStatus] = useState('all');
  const [invoiceSearch, setInvoiceSearch] = useState('');
  const [invoiceClient, setInvoiceClient] = useState('all');
  const [invoiceDateRange, setInvoiceDateRange] = useState('1405_all');
  const [invoiceCurrency, setInvoiceCurrency] = useState('TOM');

  // استیت‌های صفحه‌بندی نئوبروتال (گام ۳-۵)
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // استیت‌های فرم صدور فاکتور جدید (فاز ۴)
  const [newInvoiceClient, setNewInvoiceClient] = useState('digikala');
  const [newInvoiceProject, setNewInvoiceProject] = useState('دیزاین سیستم و توکن‌ها (تحویل فاز ۲)');
  const [newInvoicePoRef, setNewInvoicePoRef] = useState('PO-DK-9041');
  const [newInvoiceIssueDate, setNewInvoiceIssueDate] = useState('۱۴۰۵/۰۷/۱۰');
  const [newInvoiceDueDate, setNewInvoiceDueDate] = useState('۱۴۰۵/۰۸/۰۱');

  // یادداشت‌ها و شرایط تسویه فاکتور جدید (گام ۴-۴)
  const [newInvoiceNotes, setNewInvoiceNotes] = useState(DEFAULT_PAYMENT_TERMS);

  // اقلام و خدمات فاکتور جدید (گام ۴-۳)
  const [lineItems, setLineItems] = useState(INITIAL_LINE_ITEMS);

  // تنظیمات تخفیف و مالیات صندوق (گام ۴-۵)
  const [discountPercent, setDiscountPercent] = useState(10);
  const [isVatEnabled, setIsVatEnabled] = useState(true);

  // مدیریت کارفرمایان و پروژه‌ها (گام ۵-۵)
  const [clientsList, setClientsList] = useState(CLIENT_OPTIONS);
  const [projectsList, setProjectsList] = useState([
    {
      id: 'proj-1',
      title: 'ممیزی دیزاین سیستم و معماری توکن‌ها',
      clientId: 'digikala',
      clientName: 'دیجی‌کالا مارکت‌پلیس',
      billingModel: 'fixed',
      budget: 45000000,
      deadline: '۱۴۰۵/۰۸/۱۵',
      status: 'active',
      description: 'بررسی جامع فیگما، متغیرهای معنایی، تمپلیت‌های چندسکویی و هماهنگی با تیم فرانت‌اند.',
    },
    {
      id: 'proj-2',
      title: 'بازطراحی سوپراپ والت و پرداخت BNPL',
      clientId: 'snappay',
      clientName: 'اسنپ‌پی فین‌تک',
      billingModel: 'hourly',
      budget: 68000000,
      deadline: '۱۴۰۵/۰۸/۲۸',
      status: 'active',
      description: 'طراحی فلو پرداخت اعتباری، میکرواینترکشن‌های تایید تراکنش و اتصال به درگاه بانکی.',
    },
    {
      id: 'proj-3',
      title: 'داشبورد هوش مصنوعی و آنالیز هوشمند قیمت',
      clientId: 'torob',
      clientName: 'موتور جستجوی ترب',
      billingModel: 'fixed',
      budget: 52000000,
      deadline: '۱۴۰۵/۰۹/۱۰',
      status: 'active',
      description: 'طراحی ویجت‌های تحلیلی، نمودارهای پیش‌بینی قیمت و پایش رقبا.',
    },
    {
      id: 'proj-4',
      title: 'گایدلاین هویت بصری و سیستم طراحی کافه بازار',
      clientId: 'cafebazaar',
      clientName: 'کافه بازار',
      billingModel: 'retainer',
      budget: 40000000,
      deadline: '۱۴۰۵/۰۹/۲۵',
      status: 'planning',
      description: 'تدوین دیزاین توکن‌ها، مستندسازی تایپوگرافی و استانداردسازی کامپوننت‌های دارک‌مود.',
    },
    {
      id: 'proj-5',
      title: 'اسپرینت فیلترهای پیشرفته املاک و خودرو',
      clientId: 'divar',
      clientName: 'دیوار آگهی‌ها',
      billingModel: 'hourly',
      budget: 35000000,
      deadline: '۱۴۰۵/۰۸/۰۵',
      status: 'active',
      description: 'بهینه‌سازی معماری فیلترها و تست سرعت پاسخگویی در کلاینت‌های موبایل.',
    },
    {
      id: 'proj-6',
      title: 'پنل پروازهای خارجی و رزرواسیون هتل',
      clientId: 'alibaba',
      clientName: 'علی‌بابا تراول',
      billingModel: 'fixed',
      budget: 45000000,
      deadline: '۱۴۰۵/۰۹/۱۵',
      status: 'review',
      description: 'طراحی تقویم قیمتی چندمرحله‌ای و سیستم انتخاب صندلی تعاملی.',
    },
  ]);

  const [isClientModalOpen, setIsClientModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleSaveClient = (newClient) => {
    setClientsList((prev) => [newClient, ...prev]);
    CLIENT_OPTIONS.unshift(newClient);
    setNewInvoiceClient(newClient.id);
    setActionNotice(`کارفرمای جدید «${newClient.name}» با موفقیت ثبت و الحاق گردید! 🎉`);
  };

  const handleSaveProject = (newProject) => {
    setProjectsList((prev) => [newProject, ...prev]);
    setActionNotice(`اسپرینت «${newProject.title}» با موفقیت تعریف و فعال گردید! 🚀`);
  };

  // محاسبات بلادرنگ مبالغ فاکتور بر اساس اقلام جدول (گام ۴-۳ و ۴-۵)
  const grossSubtotal = lineItems.reduce(
    (sum, item) => sum + (Number(item.qty) || 0) * (Number(item.rate) || 0),
    0
  );
  const discountAmount = Math.round((grossSubtotal * (discountPercent || 0)) / 100);
  const netAfterDiscount = grossSubtotal - discountAmount;
  const vatTaxAmount = isVatEnabled ? Math.round((netAfterDiscount * 10) / 100) : 0;
  const finalTotalAmount = netAfterDiscount + vatTaxAmount;

  // ثبت و صدور فاکتور جدید در ماتریس اصلی (گام ۴-۵)
  const handleSaveInvoice = () => {
    const foundClient = CLIENT_OPTIONS.find((c) => c.id === newInvoiceClient);
    const clientName = foundClient ? foundClient.name : 'دیجی‌کالا مارکت‌پلیس';
    const clientId = foundClient ? `#${newInvoiceClient.slice(0, 2).toUpperCase()}-904` : '#DK-9041';

    const newInvoice = {
      id: 'INV-1405-10',
      client: clientName,
      clientId: clientId,
      avatar: clientName.charAt(0),
      avatarBg: 'bg-retro-yellow',
      project: newInvoiceProject,
      milestone: 'اسپرینت تحویل رسمی',
      issueDate: newInvoiceIssueDate,
      dueDate: newInvoiceDueDate,
      amount: formatToman(finalTotalAmount),
      status: 'pending',
      statusLabel: 'در انتظار واریز',
      isOverdue: false,
    };

    setInvoicesList((prev) => [newInvoice, ...prev]);
    setActionNotice(`فاکتور ${newInvoice.id} به مبلغ ${newInvoice.amount} تومان صادر و در دفتر کل ثبت شد! 🎉`);
    navigate('/invoices');
  };

  const handleAddLineItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      title: 'خدمت طراحی / توسعه جدید',
      description: 'اسپرینت تحویلی توافق‌شده با کارفرما',
      qty: 10,
      unit: 'ساعت',
      rate: 500000,
    };
    setLineItems((prev) => [...prev, newItem]);
    setActionNotice('یک سطر خدمات جدید به فاکتور اضافه شد. ➕');
  };

  const handleUpdateLineItem = (id, field, value) => {
    setLineItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const handleDeleteLineItem = (id) => {
    if (lineItems.length <= 1) return;
    setLineItems((prev) => prev.filter((item) => item.id !== id));
    setActionNotice('سطر مورد نظر از جدول خدمات حذف شد. 🗑️');
  };

  const handleImportTimesheet = () => {
    setLineItems(INITIAL_LINE_ITEMS);
    setActionNotice('کارکرد پروژه از سیستم تایم‌شیت با موفقیت همگام‌سازی شد! ⏱️');
  };

  // شنودگر میانبرهای صفحه‌کلید صنعتی (N, F, /, E)
  useEffect(() => {
    const handleKeyDown = (e) => {
      // اگر کاربر داخل یک فیلد متنی تایپ می‌کند، میانبر فعال نشود
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }

      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        navigate('/invoices/new');
        setActionNotice('⚡ کلید میانبر [N]: هدایت به صفحه صدور فاکتور جدید (فاز ۴)');
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        const searchInput = document.getElementById('invoiceSearchInput');
        if (searchInput) searchInput.focus();
        setActionNotice('⚡ کلید میانبر [F]: تمرکز روی فیلترها و جستجو');
      } else if (e.key === '/') {
        e.preventDefault();
        const searchInput = document.getElementById('invoiceSearchInput');
        if (searchInput) {
          searchInput.focus();
          searchInput.select();
        }
        setActionNotice('⚡ کلید میانبر [/]: فعال‌سازی جستجوی زنده');
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault();
        setActionNotice('⚡ کلید میانبر [E]: خروجی گزارش مالی و دفتر کل (Export Ledger)');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // فیلتر کردن هوشمند لیست فاکتورها بر اساس استیت فیلترها و جستجو
  const filteredInvoices = invoicesList.filter((inv) => {
    if (invoiceStatus !== 'all' && inv.status !== invoiceStatus) {
      return false;
    }
    if (invoiceSearch.trim()) {
      const q = invoiceSearch.trim().toLowerCase();
      const matchId = inv.id.toLowerCase().includes(q);
      const matchClient = inv.client.toLowerCase().includes(q);
      const matchProject = inv.project.toLowerCase().includes(q);
      if (!matchId && !matchClient && !matchProject) return false;
    }
    if (invoiceClient !== 'all') {
      const clientMap = {
        digikala: 'دیجی‌کالا',
        snappay: 'اسنپ‌پی',
        cafebazaar: 'کافه بازار',
        torob: 'ترب',
        divar: 'دیوار',
        alibaba: 'علی‌بابا',
      };
      const target = clientMap[invoiceClient];
      if (target && !inv.client.includes(target)) return false;
    }
    return true;
  });

  // محاسبه پویای تعداد هر وضعیت برای بج‌های فیلتر
  const dynamicCounts = {
    all: invoicesList.length,
    pending: invoicesList.filter((i) => i.status === 'pending').length,
    paid: invoicesList.filter((i) => i.status === 'paid').length,
    overdue: invoicesList.filter((i) => i.status === 'overdue').length,
    draft: invoicesList.filter((i) => i.status === 'draft').length,
  };

  // محاسبات صفحه‌بندی نئوبروتال (گام ۳-۵)
  const totalPages = Math.max(1, Math.ceil(filteredInvoices.length / itemsPerPage));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * itemsPerPage;
  const paginatedInvoices = filteredInvoices.slice(startIndex, startIndex + itemsPerPage);

  // توابع کنترل چک‌باکس‌ها و عملیات تکی و دسته‌جمعی
  const handleSelectRow = (id) => {
    setSelectedInvoiceIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSelectAll = () => {
    if (selectedInvoiceIds.length === filteredInvoices.length) {
      setSelectedInvoiceIds([]);
    } else {
      setSelectedInvoiceIds(filteredInvoices.map((i) => i.id));
    }
  };

  const handleMarkAsPaid = (inv) => {
    setInvoicesList((prev) =>
      prev.map((item) =>
        item.id === inv.id
          ? { ...item, status: 'paid', statusLabel: 'تسویه شد', isOverdue: false }
          : item
      )
    );
    setActionNotice(`فاکتور ${inv.id} با موفقیت به وضعیت «تسویه شد» تغییر یافت! ✓`);
  };

  const handleDeleteInvoice = (inv) => {
    setInvoicesList((prev) => prev.filter((item) => item.id !== inv.id));
    setSelectedInvoiceIds((prev) => prev.filter((id) => id !== inv.id));
    setActionNotice(`فاکتور ${inv.id} با موفقیت حذف شد.`);
  };

  const handleBulkAction = (action, ids) => {
    if (action === 'paid') {
      setInvoicesList((prev) =>
        prev.map((item) =>
          ids.includes(item.id)
            ? { ...item, status: 'paid', statusLabel: 'تسویه شد', isOverdue: false }
            : item
        )
      );
      setActionNotice(`تسویه گروهی برای ${ids.length} فاکتور با موفقیت اعمال شد! ✓`);
    } else if (action === 'delete') {
      setInvoicesList((prev) => prev.filter((item) => !ids.includes(item.id)));
      setActionNotice(`${ids.length} فاکتور انتخاب‌شده حذف شدند.`);
    } else if (action === 'export') {
      setActionNotice(`خروجی اکسل/CSV برای ${ids.length} فاکتور آماده دانلود شد.`);
    }
    setSelectedInvoiceIds([]);
  };

  const handleResetInvoiceFilters = () => {
    setInvoiceStatus('all');
    setInvoiceSearch('');
    setInvoiceClient('all');
    setInvoiceDateRange('1405_all');
    setSelectedInvoiceIds([]);
    setCurrentPage(1);
    setActionNotice('تمام فیلترهای صفحه فاکتورها بازنشانی شدند.');
  };

  // داده‌های پویا متناسب با دوره زمانی انتخاب‌شده
  const metricsDataByPeriod = {
    current_month: [
      {
        id: 'revenue',
        title: 'درآمد کل وصول شده',
        badge: '+۱۸.۴٪ ↗',
        amount: '۱۲۴,۵۰۰,۰۰۰',
        currency: 'تومان • تسویه نهایی مهر',
        footerText: '۳۴ فاکتور پرداخت شده',
        footerIcon: '✓',
        bgClass: 'bg-retro-mint',
      },
      {
        id: 'pending',
        title: 'در انتظار وصول',
        badge: 'نیازمند پیگیری',
        amount: '۳۸,۲۰۰,۰۰۰',
        currency: 'تومان • ۵ صورت‌حساب',
        footerText: '۵ فاکتور در انتظار پرداخت',
        footerIcon: '⏳',
        bgClass: 'bg-retro-yellow',
      },
      {
        id: 'projects',
        title: 'پایپ‌لاین پروژه‌ها',
        badge: '۲ موعد نزدیک',
        amount: '۷ پروژه فعال',
        currency: '۳ اسپرینت تحویل شده',
        footerText: '۲ تحویل تا انتهای هفته',
        footerIcon: '🚀',
        bgClass: 'bg-retro-lavender',
      },
      {
        id: 'clients',
        title: 'باشگاه مشتریان',
        badge: '+۲ مشتری جدید',
        amount: '۱۸ مشتری',
        currency: 'شرکت‌ها و استارتاپ‌ها',
        footerText: '۳ قرارداد جدید این ماه',
        footerIcon: '👥',
        bgClass: 'bg-retro-coral',
      },
    ],
    last_month: [
      {
        id: 'revenue',
        title: 'درآمد کل وصول شده',
        badge: '+۱۲.۱٪ ↗',
        amount: '۹۸,۲۰۰,۰۰۰',
        currency: 'تومان • تسویه کامل شهریور',
        footerText: '۲۸ فاکتور تسویه شده',
        footerIcon: '✓',
        bgClass: 'bg-retro-mint',
      },
      {
        id: 'pending',
        title: 'در انتظار وصول',
        badge: 'تسویه شده',
        amount: '۴,۰۰۰,۰۰۰',
        currency: 'تومان • ۱ صورت‌حساب باز',
        footerText: '۱ فاکتور باقی‌مانده',
        footerIcon: '⏳',
        bgClass: 'bg-retro-yellow',
      },
      {
        id: 'projects',
        title: 'پایپ‌لاین پروژه‌ها',
        badge: 'تکمیل شد',
        amount: '۵ پروژه بسته شده',
        currency: 'تحویل ۱۰۰٪ تعهدات',
        footerText: 'همه پروژه‌ها تحویل شدند',
        footerIcon: '🚀',
        bgClass: 'bg-retro-lavender',
      },
      {
        id: 'clients',
        title: 'باشگاه مشتریان',
        badge: '+۱ مشتری',
        amount: '۱۶ مشتری',
        currency: 'سازمانی',
        footerText: '۱ قرارداد در شهریور',
        footerIcon: '👥',
        bgClass: 'bg-retro-coral',
      },
    ],
    quarter: [
      {
        id: 'revenue',
        title: 'درآمد کل وصول شده',
        badge: '+۲۴.۸٪ ↗',
        amount: '۳۴۵,۰۰۰,۰۰۰',
        currency: 'تومان • پاییز ۱۴۰۵',
        footerText: '۸۲ فاکتور پرداخت شده',
        footerIcon: '✓',
        bgClass: 'bg-retro-mint',
      },
      {
        id: 'pending',
        title: 'در انتظار وصول',
        badge: 'جریان باز',
        amount: '۵۲,۰۰۰,۰۰۰',
        currency: 'تومان • ۸ صورت‌حساب',
        footerText: '۸ فاکتور در گردش کار',
        footerIcon: '⏳',
        bgClass: 'bg-retro-yellow',
      },
      {
        id: 'projects',
        title: 'پایپ‌لاین پروژه‌ها',
        badge: 'فصل پرفشار',
        amount: '۱۴ پروژه ثبت‌شده',
        currency: '۹ اسپرینت اجرا شده',
        footerText: '۶ تحویل موعد مقرر',
        footerIcon: '🚀',
        bgClass: 'bg-retro-lavender',
      },
      {
        id: 'clients',
        title: 'باشگاه مشتریان',
        badge: '+۵ مشتری جدید',
        amount: '۱۸ مشتری',
        currency: 'کل مشتریان پاییز',
        footerText: 'رشد ۲۸ درصدی مشتریان',
        footerIcon: '👥',
        bgClass: 'bg-retro-coral',
      },
    ],
    year: [
      {
        id: 'revenue',
        title: 'درآمد کل وصول شده',
        badge: '+۴۱.۵٪ ↗',
        amount: '۱,۱۸۰,۰۰۰,۰۰۰',
        currency: 'تومان • سال مالی جاری',
        footerText: '۲۱۰ فاکتور پرداخت شده',
        footerIcon: '✓',
        bgClass: 'bg-retro-mint',
      },
      {
        id: 'pending',
        title: 'در انتظار وصول',
        badge: 'معوقات سالانه',
        amount: '۷۸,۵۰۰,۰۰۰',
        currency: 'تومان • ۱۲ صورت‌حساب',
        footerText: '۱۲ فاکتور در گردش وصول',
        footerIcon: '⏳',
        bgClass: 'bg-retro-yellow',
      },
      {
        id: 'projects',
        title: 'پایپ‌لاین پروژه‌ها',
        badge: 'سالانه',
        amount: '۳۶ پروژه انجام‌شده',
        currency: 'تکمیل ۲۲ اسپرینت استودیو',
        footerText: '۹۸٪ رضایت کارفرمایان',
        footerIcon: '🚀',
        bgClass: 'bg-retro-lavender',
      },
      {
        id: 'clients',
        title: 'باشگاه مشتریان',
        badge: '+۱۸ مشتری کل',
        amount: '۱۸ مشتری',
        currency: 'پرتفوی رسمی استودیو',
        footerText: '۱۰۰٪ قرارداد رسمی',
        footerIcon: '👥',
        bgClass: 'bg-retro-coral',
      },
    ],
  };

  return (
    <div className="min-h-screen bg-canvas font-sans" dir="rtl">
      {/* کامپوننت نوبار سراسری مجهز به React Router NavLink */}
      <Navbar
        onNewInvoice={() => {
          navigate('/invoices/new');
          setActionNotice('انتقال به صفحه صدور فاکتور جدید (فاز ۴)');
        }}
        onNewClient={() => {
          setIsClientModalOpen(true);
        }}
      />

      <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-6">
        {/* اعلان اکشن تعاملی زنده */}
        {actionNotice && (
          <div className="rounded-xl border-2 border-black bg-retro-mint p-3 text-xs md:text-sm font-black text-black shadow-retro-sm flex items-center justify-between">
            <span>⚡ رویداد تعاملی: {actionNotice}</span>
            <button
              onClick={() => setActionNotice('')}
              className="text-black font-bold hover:underline px-2 cursor-pointer"
            >
              بستن ×
            </button>
          </div>
        )}

        {/* تعریف روت‌های استاندارد صنعتی React Router */}
        <Routes>
          {/* روت اصلی: پیشخوان جامع (/) */}
          <Route
            path="/"
            element={
              <DashboardPage
                period={period}
                onPeriodChange={setPeriod}
                metricsDataByPeriod={metricsDataByPeriod}
                onActionNotice={setActionNotice}
              />
            }
          />

          {/* روت دوم: فهرست و فیلتر فاکتورها (/invoices) */}
          <Route
            path="/invoices"
            element={
              <InvoicesPage
                onNewInvoice={() => {
                  navigate('/invoices/new');
                  setActionNotice('انتقال به صفحه صدور فاکتور جدید (فاز ۴)');
                }}
                onExportCSV={() => setActionNotice('درخواست استخراج خروجی CSV / گزارش مالی')}
              >
                {/* ۱. نوار کارت‌های ۳گانه خلاصه مالی فاکتورها (گام ۳-۲) */}
                <InvoiceSummaryStrip />

                {/* ۲. جعبه‌ابزار کنترل، فیلتر وضعیت و جستجوی پیشرفته (گام ۳-۳) */}
                <InvoiceFilters
                  statusFilter={invoiceStatus}
                  onStatusChange={(status) => {
                    setInvoiceStatus(status);
                    setCurrentPage(1);
                    setActionNotice(`فیلتر وضعیت روی «${status}» تنظیم شد.`);
                  }}
                  searchQuery={invoiceSearch}
                  onSearchChange={(q) => {
                    setInvoiceSearch(q);
                    setCurrentPage(1);
                  }}
                  selectedClient={invoiceClient}
                  onClientChange={(client) => {
                    setInvoiceClient(client);
                    setCurrentPage(1);
                    setActionNotice(`فیلتر کارفرما روی «${client}» تنظیم شد.`);
                  }}
                  selectedDateRange={invoiceDateRange}
                  onDateRangeChange={(range) => {
                    setInvoiceDateRange(range);
                    setCurrentPage(1);
                    setActionNotice(`بازه زمانی روی «${range}» تنظیم شد.`);
                  }}
                  currency={invoiceCurrency}
                  onCurrencyChange={(curr) => {
                    setInvoiceCurrency(curr);
                    setActionNotice(`واحد پولی به «${curr}» تغییر یافت.`);
                  }}
                  counts={dynamicCounts}
                  onResetFilters={handleResetInvoiceFilters}
                />

                {/* ۳. جدول جامع فاکتورها همراه با نوار صفحه‌بندی نئوبروتال (گام‌های ۳-۴ و ۳-۵) */}
                <InvoicesTable
                  invoices={paginatedInvoices}
                  selectedIds={selectedInvoiceIds}
                  onSelectRow={handleSelectRow}
                  onSelectAll={handleSelectAll}
                  onMarkAsPaid={handleMarkAsPaid}
                  onDeleteInvoice={handleDeleteInvoice}
                  onBulkAction={handleBulkAction}
                  onViewInvoice={(inv) => navigate(`/invoices/${inv.id}/print`)}
                  onEditInvoice={(inv) => setActionNotice(`ویرایش اطلاعات فاکتور ${inv.id}`)}
                  onRefresh={() => {
                    setInvoicesList(INITIAL_INVOICES_DATA);
                    setSelectedInvoiceIds([]);
                    setCurrentPage(1);
                    setActionNotice('داده‌های جدول فاکتورها با موفقیت تازه‌سازی شدند! 🔄');
                  }}
                  currentPage={safeCurrentPage}
                  totalPages={totalPages}
                  totalItems={filteredInvoices.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={(page) => setCurrentPage(page)}
                  onItemsPerPageChange={(count) => {
                    setItemsPerPage(count);
                    setCurrentPage(1);
                  }}
                />

                {/* ۴. داک دسترسی سریع و راهنمای کلیدهای میانبر کیبورد (برگرفته از طرح صنعتی Stitch) */}
                <InvoiceShortcutsDock
                  onNewInvoice={() => setActionNotice('⚡ کلید میانبر [N]: آغاز صدور فاکتور جدید')}
                  onExportLedger={() => setActionNotice('⚡ کلید میانبر [E]: خروجی اکسل و دفتر کل')}
                />
              </InvoicesPage>
            }
          />

          {/* روت ایجاد و صدور فاکتور جدید تعاملی (/invoices/new) - فاز ۴ */}
          <Route
            path="/invoices/new"
            element={
              <CreateInvoicePage
                invoiceNumber="INV-1405-10"
                currency="تومان"
                leftDeck={
                  <div className="space-y-6">
                    {/* ۱. کارت ۱: مشخصات کارفرما و متادیتای صورت‌حساب (گام ۴-۲) */}
                    <InvoiceMetadataCard
                      client={newInvoiceClient}
                      onClientChange={(val) => {
                        setNewInvoiceClient(val);
                        setActionNotice(`کارفرما به «${val}» تغییر یافت.`);
                      }}
                      project={newInvoiceProject}
                      onProjectChange={(val) => {
                        setNewInvoiceProject(val);
                        setActionNotice(`پروژه به «${val}» تغییر یافت.`);
                      }}
                      invoiceId="INV-1405-10"
                      poRef={newInvoicePoRef}
                      onPoRefChange={(val) => {
                        setNewInvoicePoRef(val);
                        setActionNotice(`شماره قرارداد/سفارش به «${val}» تغییر یافت.`);
                      }}
                      issueDate={newInvoiceIssueDate}
                      onIssueDateChange={setNewInvoiceIssueDate}
                      dueDate={newInvoiceDueDate}
                      onDueDateChange={setNewInvoiceDueDate}
                      onNewClientClick={() => {
                        setIsClientModalOpen(true);
                      }}
                    />

                    {/* ۲. کارت ۲: شرح خدمات، ساعت کارکرد و اقلام تحویلی (گام ۴-۳) */}
                    <InvoiceLineItemsCard
                      items={lineItems}
                      onAddItem={handleAddLineItem}
                      onUpdateItem={handleUpdateLineItem}
                      onDeleteItem={handleDeleteLineItem}
                      onImportTimesheet={handleImportTimesheet}
                    />

                    {/* ۳. کارت ۳: شرایط تسویه، یادداشت‌های حقوقی و حساب بانکی (گام ۴-۴) */}
                    <InvoicePaymentNotesCard
                      notes={newInvoiceNotes}
                      onNotesChange={setNewInvoiceNotes}
                      onCopyFeedback={setActionNotice}
                    />
                  </div>
                }
                rightDeck={
                  <InvoiceReceiptSidebar
                    itemsCount={lineItems.length}
                    grossSubtotal={grossSubtotal}
                    discountPercent={discountPercent}
                    onDiscountChange={setDiscountPercent}
                    isVatEnabled={isVatEnabled}
                    onVatToggle={() => setIsVatEnabled((prev) => !prev)}
                    vatPercent={10}
                    clientName={
                      (CLIENT_OPTIONS.find((c) => c.id === newInvoiceClient) || {}).name || 'دیجی‌کالا مارکت‌پلیس'
                    }
                    onSaveInvoice={handleSaveInvoice}
                    onPreviewPrint={() => {
                      navigate('/invoices/print');
                    }}
                    onDiscardDraft={() => {
                      setActionNotice('پیش‌نویس فاکتور لغو شد.');
                      navigate('/invoices');
                    }}
                    onSaveTemplate={() => {
                      setActionNotice('قالب این فاکتور برای استفاده‌های آتی ذخیره شد! 💾');
                    }}
                  />
                }
              />
            }
          />

          {/* روت پیش‌نمایش چاپی فاکتور پیش‌نویس جاری (/invoices/print) */}
          <Route
            path="/invoices/print"
            element={
              <InvoicePrintSheet
                invoice={{
                  id: 'INV-1405-10',
                  client:
                    (CLIENT_OPTIONS.find((c) => c.id === newInvoiceClient) || {}).name ||
                    'دیجی‌کالا مارکت‌پلیس',
                  clientCompany:
                    (CLIENT_OPTIONS.find((c) => c.id === newInvoiceClient) || {}).company ||
                    'شرکت نوآوران ارتباطات مهام (دیجی‌کالا)',
                  clientDept: 'مرکز توسعه تجربه محصول و هسته دیزاین سیستم',
                  clientAttn: 'رضا رستمی (مدیر ارشد محصول)',
                  clientNationalId: '۱۰۱۰۳۴۹۰۲۱۸',
                  clientEcoCode: '۴۱۱۳۸۹۷۴۵۱۹۲',
                  clientAddress: 'تهران، خیابان گاندی جنوبی، کوچه پانزدهم، پلاک ۱۲',
                  issueDate: newInvoiceIssueDate,
                  dueDate: newInvoiceDueDate,
                  gregorianDate: '2026-10-15',
                  terms: 'تسویه ۲۱ روزه (Net 21 Days)',
                  status: 'unpaid',
                  currency: 'تومان',
                  items: lineItems.map((li) => ({
                    id: li.id,
                    title: li.title,
                    specs: li.description,
                    qty: `${toPersianDigits(li.qty)} ${li.unit}`,
                    unitRate: li.rate,
                    total: li.qty * li.rate,
                  })),
                  subtotal: grossSubtotal,
                  discountPercent: discountPercent,
                  discountAmount: discountAmount,
                  taxableBase: netAfterDiscount,
                  vatPercent: isVatEnabled ? 10 : 0,
                  vatAmount: vatTaxAmount,
                  finalAmount: finalTotalAmount,
                  rialAmount: finalTotalAmount * 10,
                  sheba: 'IR82 0560 0840 8000 0124 5592 01',
                  cardNumber: '6219 8610 4421 9083',
                  beneficiary: 'ریبوار دباله',
                  bank: 'بانک سامان (شعبه مرکزی تهران)',
                  memo: 'INV-1405-10',
                  hash: 'SHA-256: 7f8a9e4b21c0b784',
                  syncStatus: 'STAMPED • IR-MOF-SYNC',
                }}
                onBack={() => navigate('/invoices/new')}
                onSendDirect={() =>
                  setActionNotice('پیش‌نویس فاکتور رسمی به همراه پیش‌نمایش به امور مالی کارفرما ارسال شد! ✉️✓')
                }
              />
            }
          />

          {/* روت نمایش و چاپ برگه رسمی A4 هر فاکتور بر مبنای شناسه (/invoices/:id/print) */}
          <Route
            path="/invoices/:id/print"
            element={
              <InvoicePrintRouteWrapper
                invoicesList={invoicesList}
                onBack={() => navigate('/invoices')}
                onSendDirect={(id) =>
                  setActionNotice(`فاکتور رسمی ${id} به همراه فایل PDF مستقیماً به امور مالی کارفرما ایمیل شد! ✉️✓`)
                }
              />
            }
          />

          {/* روت مشتریان (/clients) - گام ۵-۵ */}
          <Route
            path="/clients"
            element={
              <ClientsPage
                clientsList={clientsList}
                onOpenNewClientModal={() => setIsClientModalOpen(true)}
                onSelectClientForInvoice={(clientId) => {
                  setNewInvoiceClient(clientId);
                  navigate('/invoices/new');
                  setActionNotice('کارفرما برای فاکتور جدید تنظیم شد.');
                }}
              />
            }
          />

          {/* روت پروژه‌ها (/projects) - گام ۵-۵ */}
          <Route
            path="/projects"
            element={
              <ProjectsPage
                projectsList={projectsList}
                onOpenNewProjectModal={() => setIsProjectModalOpen(true)}
                onNewInvoiceForProject={(proj) => {
                  setNewInvoiceProject(proj.title);
                  if (proj.clientId) {
                    setNewInvoiceClient(proj.clientId);
                  }
                  navigate('/invoices/new');
                  setActionNotice(`فاکتور برای پروژه «${proj.title}» تنظیم شد.`);
                }}
              />
            }
          />

          {/* روت گزارشات (/reports) - گام ۵-۵ */}
          <Route
            path="/reports"
            element={
              <ReportsPage
                onExportCsv={() => setActionNotice('خروجی کامل اکسل / CSV دفتر کل مالی دانلود شد! 📥')}
                onPrintTaxSummary={() => window.print()}
              />
            }
          />

          {/* هر مسیر تعریف‌نشده به پیشخوان هدایت می‌شود */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* سوئیت مودال‌های عملیاتی نئوبروتال (گام ۵-۵) */}
      <AddClientModal
        isOpen={isClientModalOpen}
        onClose={() => setIsClientModalOpen(false)}
        onSaveClient={handleSaveClient}
      />

      <AddProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        onSaveProject={handleSaveProject}
        clientOptions={clientsList}
      />
    </div>
  );
}
