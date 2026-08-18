import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Layout Components
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { ToastContainer } from './components/ToastContainer';
import { DemoWalkthrough } from './components/DemoWalkthrough';

// Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { FacilityDetailPage } from './pages/FacilityDetailPage';
import { InventoryPage } from './pages/InventoryPage';
import { MedicinesPage } from './pages/MedicinesPage';
import { AiInsightsPage } from './pages/AiInsightsPage';
import { SmartMatchingPage } from './pages/SmartMatchingPage';
import { TransfersPage } from './pages/TransfersPage';
import { QrScannerPage } from './pages/QrScannerPage';
import { AlertsPage } from './pages/AlertsPage';
import { ImpactAnalyticsPage } from './pages/ImpactAnalyticsPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { UserManagementPage } from './pages/UserManagementPage';
import { SettingsPage } from './pages/SettingsPage';

// Protected Main Layout Container
const MainLayout = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user } = useApp();

  // Auto redirect to login if no user session
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col lg:flex-row text-slate-900 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar setMobileOpen={setMobileOpen} />
        
        {/* Interactive Judge Walkthrough Banner */}
        <DemoWalkthrough />

        <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Global Notifications */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing & Login */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />

          {/* Authenticated Dashboard Application Pages */}
          <Route path="/dashboard" element={<MainLayout><DashboardPage /></MainLayout>} />
          <Route path="/facilities" element={<MainLayout><FacilitiesPage /></MainLayout>} />
          <Route path="/facilities/:id" element={<MainLayout><FacilityDetailPage /></MainLayout>} />
          <Route path="/inventory" element={<MainLayout><InventoryPage /></MainLayout>} />
          <Route path="/medicines" element={<MainLayout><MedicinesPage /></MainLayout>} />
          <Route path="/ai-insights" element={<MainLayout><AiInsightsPage /></MainLayout>} />
          <Route path="/smart-matching" element={<MainLayout><SmartMatchingPage /></MainLayout>} />
          <Route path="/transfers" element={<MainLayout><TransfersPage /></MainLayout>} />
          <Route path="/qr-scanner" element={<MainLayout><QrScannerPage /></MainLayout>} />
          <Route path="/alerts" element={<MainLayout><AlertsPage /></MainLayout>} />
          <Route path="/impact" element={<MainLayout><ImpactAnalyticsPage /></MainLayout>} />
          <Route path="/audit-logs" element={<MainLayout><AuditLogsPage /></MainLayout>} />
          <Route path="/users" element={<MainLayout><UserManagementPage /></MainLayout>} />
          <Route path="/settings" element={<MainLayout><SettingsPage /></MainLayout>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
