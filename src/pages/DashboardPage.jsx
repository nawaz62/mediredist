import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Building2,
  Pill,
  IndianRupee,
  Clock,
  TrendingUp,
  AlertTriangle,
  ArrowRightLeft,
  CheckCircle2,
  Sparkles,
  Zap,
  ArrowUpRight,
  TrendingDown,
  ShieldAlert,
  ArrowRight
} from 'lucide-react';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, inventory, transfers, alerts, impactStats, startDemo } = useApp();

  // Dynamic KPI calculation based on inventory state
  const nearExpiryCount = inventory.filter(i => i.status === 'Near Expiry' || i.daysRemaining <= 45).reduce((acc, item) => acc + item.quantity, 0);
  const surplusCount = inventory.filter(i => i.surplusOrShortage === 'Surplus').length;
  const shortageCount = inventory.filter(i => i.surplusOrShortage === 'Shortage').length;
  const inProgressTransfers = transfers.filter(t => t.status !== 'COMPLETED' && t.status !== 'CANCELLED').length;
  const completedTransfers = transfers.filter(t => t.status === 'COMPLETED').length + 40;

  const kpis = [
    {
      title: 'Total Facilities',
      value: '35',
      trend: '+3 this month',
      trendUp: true,
      icon: Building2,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Medicine Types',
      value: '128',
      trend: '10 categories',
      trendUp: true,
      icon: Pill,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    },
    {
      title: 'Total Stock Value',
      value: '₹42.8 Lakhs',
      trend: 'Across network',
      trendUp: true,
      icon: IndianRupee,
      color: 'bg-emerald-50 text-emerald-600 border-emerald-200'
    },
    {
      title: 'Near Expiry Stock',
      value: `${nearExpiryCount} Units`,
      trend: 'High Priority',
      trendUp: false,
      icon: Clock,
      color: 'bg-amber-50 text-amber-600 border-amber-200'
    },
    {
      title: 'Surplus Medicines',
      value: `${surplusCount + 58}`,
      trend: 'Available for match',
      trendUp: true,
      icon: TrendingUp,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Shortage Medicines',
      value: `${shortageCount + 20}`,
      trend: 'Predicted risk',
      trendUp: false,
      icon: AlertTriangle,
      color: 'bg-rose-50 text-rose-600 border-rose-200'
    },
    {
      title: 'Transfers In Progress',
      value: `${inProgressTransfers}`,
      trend: 'Active tracking',
      trendUp: true,
      icon: ArrowRightLeft,
      color: 'bg-teal-50 text-teal-600 border-teal-200'
    },
    {
      title: 'Transfers Completed',
      value: `${completedTransfers}`,
      trend: '100% verified',
      trendUp: true,
      icon: CheckCircle2,
      color: 'bg-cyan-50 text-cyan-600 border-cyan-200'
    }
  ];

  // Recharts Mock Data
  const monthlyTrendData = [
    { month: 'Jan', transferred: 120, wastageSaved: 45000 },
    { month: 'Feb', transferred: 180, wastageSaved: 72000 },
    { month: 'Mar', transferred: 240, wastageSaved: 98000 },
    { month: 'Apr', transferred: 310, wastageSaved: 140000 },
    { month: 'May', transferred: 450, wastageSaved: 195000 },
    { month: 'Jun', transferred: 520, wastageSaved: 230000 },
    { month: 'Jul', transferred: 640, wastageSaved: 310000 },
    { month: 'Aug', transferred: 820, wastageSaved: 420000 },
  ];

  const stockDistributionData = [
    { name: 'Optimal Stock', value: 65, color: '#10b981' },
    { name: 'Surplus', value: 20, color: '#8b5cf6' },
    { name: 'Near Expiry', value: 10, color: '#f59e0b' },
    { name: 'Critical Shortage', value: 5, color: '#f43f5e' },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-500/20 text-blue-400 text-xs font-bold px-2.5 py-0.5 rounded-full border border-blue-500/30">
              SIH 2026 Central Control
            </span>
            <span className="text-xs text-slate-400">Live Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Good morning, {user ? user.name : 'Admin'}
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-xl">
            Here’s your MEDIREDIST network overview. 35 inter-connected facilities active.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={startDemo}
            className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-xs shadow-lg transition-all active:scale-95 shrink-0"
          >
            <Sparkles className="w-4 h-4 fill-white" />
            <span>🎬 Launch SIH Demo Mode</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div
              key={idx}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">{kpi.title}</span>
                <div className={`p-2.5 rounded-xl border ${kpi.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900 tracking-tight">
                  {kpi.value}
                </span>
                <span className={`text-[11px] font-semibold flex items-center gap-0.5 ${
                  kpi.trendUp ? 'text-emerald-600' : 'text-amber-600'
                }`}>
                  {kpi.trendUp ? <ArrowUpRight className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {kpi.trend}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Critical Alert Section */}
      <div className="bg-rose-50/50 border border-rose-200/80 rounded-3xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-rose-100 text-rose-600">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Critical Alerts & Action Required</h2>
              <p className="text-xs text-slate-500">Real-time risk telemetry requiring immediate decision.</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/alerts')}
            className="text-xs text-rose-700 font-bold hover:underline"
          >
            View All Alerts ({alerts.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Alert Item 1 */}
          <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                  🔴 Critical Shortage
                </span>
                <span className="text-[11px] text-slate-400 font-mono">FAC-002</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-2">Paracetamol 500mg</h3>
              <p className="text-xs text-slate-600 mt-0.5">City Hospital B — Stockout in 3 days</p>
              <p className="text-[11px] text-slate-500 mt-2">60 units remaining • Daily consumption: 18</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigate('/inventory')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                View Details
              </button>
              <button
                onClick={() => navigate('/smart-matching')}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
              >
                <Zap className="w-3.5 h-3.5" /> Find Match
              </button>
            </div>
          </div>

          {/* Alert Item 2 */}
          <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full border border-amber-200">
                  🟠 Near Expiry
                </span>
                <span className="text-[11px] text-slate-400 font-mono">FAC-001</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-2">Aceclofenac 100mg</h3>
              <p className="text-xs text-slate-600 mt-0.5">City Hospital A — 30 days remaining</p>
              <p className="text-[11px] text-slate-500 mt-2">250 units unused • Expiry Risk Score: 87/100</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigate('/inventory')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                View Details
              </button>
              <button
                onClick={() => navigate('/smart-matching')}
                className="flex items-center gap-1 text-xs font-bold text-purple-600 hover:text-purple-700 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200"
              >
                <Sparkles className="w-3.5 h-3.5" /> Find Match
              </button>
            </div>
          </div>

          {/* Alert Item 3 */}
          <div className="bg-white p-4 rounded-2xl border border-rose-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                  🔴 Stockout Predicted
                </span>
                <span className="text-[11px] text-slate-400 font-mono">FAC-002</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 mt-2">Amoxicillin 500mg</h3>
              <p className="text-xs text-slate-600 mt-0.5">City Hospital B — High Pediatric Demand</p>
              <p className="text-[11px] text-slate-500 mt-2">42 units remaining • Stockout Risk: 95%</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => navigate('/inventory')}
                className="text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                View Details
              </button>
              <button
                onClick={() => navigate('/smart-matching')}
                className="flex items-center gap-1 text-xs font-bold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200"
              >
                <Zap className="w-3.5 h-3.5" /> Find Match
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Area Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-slate-900">Redistribution Volume & Wastage Saved</h3>
              <p className="text-xs text-slate-500">Monthly units transferred vs Rupees financial wastage prevented.</p>
            </div>
            <button
              onClick={() => navigate('/impact')}
              className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
            >
              Full Impact Analytics <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrendData}>
                <defs>
                  <linearGradient id="colorTransferred" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                />
                <Area type="monotone" dataKey="transferred" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorTransferred)" name="Units Transferred" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Inventory Risk Donut Chart */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Inventory Status Breakdown</h3>
            <p className="text-xs text-slate-500">Distribution across 35 connected facilities.</p>

            <div className="h-52 my-2 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stockDistributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {stockDistributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100">
            {stockDistributionData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
