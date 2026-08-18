import React from 'react';
import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  LayoutDashboard,
  Building2,
  Boxes,
  Pill,
  Sparkles,
  Zap,
  ArrowRightLeft,
  QrCode,
  Bell,
  BarChart3,
  History,
  Users,
  Settings,
  PlayCircle,
  ShieldAlert,
  Award,
  X
} from 'lucide-react';

export const Sidebar = ({ mobileOpen, setMobileOpen }) => {
  const { user, alerts, startDemo, demoStep } = useApp();

  const activeAlertsCount = alerts.filter(a => a.category === 'CRITICAL' || a.category === 'HIGH').length;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Facilities', path: '/facilities', icon: Building2 },
    { label: 'Inventory', path: '/inventory', icon: Boxes },
    { label: 'Medicines Master', path: '/medicines', icon: Pill },
    { label: 'AI Insights', path: '/ai-insights', icon: Sparkles, badge: 'AI' },
    { label: 'Smart Matching', path: '/smart-matching', icon: Zap, badge: 'Hot' },
    { label: 'Transfer Center', path: '/transfers', icon: ArrowRightLeft },
    { label: 'QR Traceability', path: '/qr-scanner', icon: QrCode },
    { label: 'Alerts', path: '/alerts', icon: Bell, count: activeAlertsCount },
    { label: 'Impact Analytics', path: '/impact', icon: BarChart3 },
    { label: 'Audit Logs', path: '/audit-logs', icon: History },
    { label: 'User Admin', path: '/users', icon: Users, adminOnly: true },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  const filteredNavItems = navItems.filter(item => !item.adminOnly || (user && user.role === 'Central Admin'));

  const handleNavClick = () => {
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-300 flex flex-col border-r border-slate-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header Branding */}
        <div className="px-6 py-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/20">
              <Pill className="w-6 h-6 transform -rotate-45" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-wider flex items-center gap-1.5 leading-none">
                MEDIREDIST
                <span className="text-[10px] bg-blue-500/20 text-blue-400 font-semibold px-1.5 py-0.5 rounded border border-blue-500/30">SIH 2026</span>
              </h1>
              <p className="text-[11px] text-slate-400 mt-1 font-medium italic">
                Right Medicine. Right Place. Right Time.
              </p>
            </div>
          </div>
          <button 
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* SIH Hackathon Demo Button Banner */}
        <div className="p-3 mx-4 mt-4 rounded-xl bg-gradient-to-r from-purple-900/60 to-indigo-900/60 border border-purple-500/30">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-purple-300 flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-purple-400" /> SIH Judge Demo
            </span>
            {demoStep !== null && (
              <span className="text-[10px] bg-purple-500 text-white font-bold px-1.5 py-0.5 rounded-full animate-pulse">
                Active Step {demoStep + 1}/9
              </span>
            )}
          </div>
          <p className="text-[11px] text-slate-300 mb-2.5 leading-tight">
            Run complete 9-step automated redistribution workflow walkthrough.
          </p>
          <button
            onClick={startDemo}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-semibold shadow-md transition-all active:scale-98"
          >
            <PlayCircle className="w-4 h-4 fill-white/20" /> 🎬 Start Demo Walkthrough
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4 py-4 space-y-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-3 mb-2">
            Main Menu
          </div>
          {filteredNavItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={handleNavClick}
                className={({ isActive }) => `
                  flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all duration-200 group
                  ${isActive 
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold' 
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'}
                `}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 transition-transform group-hover:scale-110" />
                  <span>{item.label}</span>
                </div>
                
                {item.badge && (
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 font-bold px-1.5 py-0.5 rounded border border-purple-500/30">
                    {item.badge}
                  </span>
                )}

                {item.count > 0 && (
                  <span className="text-[10px] bg-rose-500 text-white font-bold px-1.5 py-0.5 rounded-full animate-bounce">
                    {item.count}
                  </span>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Bottom User Info & Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/50">
          {user ? (
            <div className="flex items-center gap-3">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-9 h-9 rounded-full object-cover border-2 border-blue-500/40"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-slate-200 truncate">{user.name}</p>
                <span className="inline-block text-[10px] text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded font-medium border border-blue-500/20">
                  {user.role}
                </span>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <span className="text-xs text-slate-400">Not logged in</span>
            </div>
          )}
          <div className="mt-3 pt-2 border-t border-slate-800 text-[10px] text-slate-500 text-center">
            Problem Statement #70 • SIH 2026
          </div>
        </div>
      </aside>
    </>
  );
};
