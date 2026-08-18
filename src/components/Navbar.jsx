import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Menu,
  Search,
  Bell,
  User,
  LogOut,
  Play,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';

export const Navbar = ({ setMobileOpen }) => {
  const { user, logout, alerts, startDemo } = useApp();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showAlertsDropdown, setShowAlertsDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/inventory?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      {/* Mobile Toggle & Search */}
      <div className="flex items-center gap-4 flex-1 max-w-lg">
        <button
          onClick={() => setMobileOpen(true)}
          className="lg:hidden text-slate-600 hover:text-slate-900 p-1.5 rounded-lg hover:bg-slate-100"
        >
          <Menu className="w-6 h-6" />
        </button>

        <form onSubmit={handleSearchSubmit} className="relative w-full hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search medicine, batch ID (e.g. MED-ACE-2505-001), or hospital..."
            className="w-full pl-10 pr-4 py-2 bg-slate-100 hover:bg-slate-100/80 focus:bg-white text-xs text-slate-800 rounded-xl border border-transparent focus:border-blue-500 focus:outline-none transition-all placeholder:text-slate-400"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Quick Demo Trigger */}
        <button
          onClick={startDemo}
          className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-all active:scale-95"
        >
          <Play className="w-3.5 h-3.5 fill-white" />
          <span>Demo Walkthrough</span>
        </button>

        {/* Facility / Admin Scope Badge */}
        {user && (
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1 bg-slate-100 rounded-full border border-slate-200 text-xs text-slate-700">
            <Building className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-medium truncate max-w-[140px]">{user.facilityName}</span>
          </div>
        )}

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowAlertsDropdown(!showAlertsDropdown)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Bell className="w-5 h-5" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
            )}
          </button>

          {showAlertsDropdown && (
            <div 
              className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 py-3 z-50 animate-in fade-in slide-in-from-top-2"
              onMouseLeave={() => setShowAlertsDropdown(false)}
            >
              <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Active Alerts ({alerts.length})
                </h3>
                <button
                  onClick={() => { setShowAlertsDropdown(false); navigate('/alerts'); }}
                  className="text-xs text-blue-600 font-semibold hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto custom-scrollbar divide-y divide-slate-100">
                {alerts.slice(0, 4).map(alert => (
                  <div key={alert.id} className="p-3 hover:bg-slate-50 transition-colors flex gap-3">
                    <AlertTriangle className={`w-4 h-4 shrink-0 mt-0.5 ${
                      alert.category === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900">{alert.medicineName}</p>
                      <p className="text-[11px] text-slate-500 truncate">{alert.facilityName}</p>
                      <p className="text-[11px] text-slate-600 mt-1">{alert.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Dropdown */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 transition-colors"
            >
              <img
                src={user.avatar}
                alt={user.name}
                className="w-8 h-8 rounded-full object-cover border border-slate-300"
              />
              <span className="hidden lg:inline-block text-xs font-semibold text-slate-800">
                {user.name.split(' ')[0]}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden lg:inline-block" />
            </button>

            {showProfileDropdown && (
              <div 
                className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 py-2 z-50"
                onMouseLeave={() => setShowProfileDropdown(false)}
              >
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{user.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                  <span className="inline-block mt-1 text-[10px] bg-blue-50 text-blue-700 font-semibold px-2 py-0.5 rounded-md border border-blue-200">
                    {user.role}
                  </span>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => { setShowProfileDropdown(false); navigate('/settings'); }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-slate-400" /> Account Settings
                  </button>

                  <button
                    onClick={() => { setShowProfileDropdown(false); logout(); navigate('/login'); }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 font-medium"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow-xs transition-all"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};
