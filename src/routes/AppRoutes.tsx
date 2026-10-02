import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ProtectedRoute } from './ProtectedRoute';
import { AuthPage } from '@/features/auth/AuthPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { ClientsPage } from '@/features/clients/ClientsPage';
import { ProjectsPage } from '@/features/projects/ProjectsPage';
import { InvoicesPage } from '@/features/invoices/InvoicesPage';
import { NewInvoicePage } from '@/features/invoices/NewInvoicePage';
import { InvoiceDetailPage } from '@/features/invoices/InvoiceDetailPage';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Auth Route */}
      <Route path="/login" element={<AuthPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/invoices" element={<InvoicesPage />} />
          <Route path="/invoices/new" element={<NewInvoicePage />} />
          <Route path="/invoices/:id" element={<InvoiceDetailPage />} />
        </Route>
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
