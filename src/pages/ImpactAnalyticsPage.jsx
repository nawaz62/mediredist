import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BarChart3,
  TrendingUp,
  IndianRupee,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  Award
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

export const ImpactAnalyticsPage = () => {
  const { impactStats } = useApp();

  const kpis = [
    { title: 'Medicines Saved From Expiry', value: `${impactStats.medicinesSaved.toLocaleString()} Units`, icon: ShieldCheck, color: 'bg-emerald-50 text-emerald-600' },
    { title: 'Financial Wastage Prevented', value: `₹${(impactStats.wastagePrevented / 100000).toFixed(2)} Lakhs`, icon: IndianRupee, color: 'bg-blue-50 text-blue-600' },
    { title: 'Stockouts Prevented', value: `${impactStats.stockoutsPrevented} Cases`, icon: CheckCircle2, color: 'bg-purple-50 text-purple-600' },
    { title: 'Transfers Completed', value: '42 Transfers', icon: TrendingUp, color: 'bg-teal-50 text-teal-600' },
    { title: 'Average Transfer Time', value: `${impactStats.avgTransferHours} Hours`, icon: Clock, color: 'bg-amber-50 text-amber-600' },
    { title: 'Connected Facilities', value: '35 Facilities', icon: Building2, color: 'bg-indigo-50 text-indigo-600' }
  ];

  const trendData = [
    { month: 'Jan', unitsSaved: 120, rupeesSaved: 45000 },
    { month: 'Feb', unitsSaved: 180, rupeesSaved: 72000 },
    { month: 'Mar', unitsSaved: 240, rupeesSaved: 98000 },
    { month: 'Apr', unitsSaved: 310, rupeesSaved: 140000 },
    { month: 'May', unitsSaved: 450, rupeesSaved: 195000 },
    { month: 'Jun', unitsSaved: 520, rupeesSaved: 230000 },
    { month: 'Jul', unitsSaved: 640, rupeesSaved: 310000 },
    { month: 'Aug', unitsSaved: 820, rupeesSaved: 420000 }
  ];

  const categoryData = [
    { name: 'Analgesics / NSAID', value: 35, fill: '#2563eb' },
    { name: 'Antibiotics', value: 28, fill: '#8b5cf6' },
    { name: 'Antipyretics', value: 20, fill: '#10b981' },
    { name: 'Electrolytes / ORS', value: 10, fill: '#f59e0b' },
    { name: 'Antidiabetics', value: 7, fill: '#ec4899' }
  ];

  const facilityPerformanceData = [
    { facility: 'City Hosp A', transfersSent: 18, transfersReceived: 4 },
    { facility: 'City Hosp B', transfersSent: 2, transfersReceived: 14 },
    { facility: 'District Hosp', transfersSent: 22, transfersReceived: 5 },
    { facility: 'CHC Aliganj', transfersSent: 1, transfersReceived: 12 },
    { facility: 'Metro Care', transfersSent: 10, transfersReceived: 6 }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-emerald-500/20 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" /> SIH 2026 Social & Economic Impact
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Impact & Measurement Analytics
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Quantifiable healthcare metric tracking medicine preservation and financial savings.
          </p>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {kpis.map((k, idx) => {
          const Icon = k.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className={`p-3 rounded-2xl border border-slate-100 ${k.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold text-slate-500">{k.title}</span>
                <span className="block text-2xl font-black text-slate-900 mt-0.5">{k.value}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Redistribution Trend */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">Redistribution Growth Trend</h3>
          <p className="text-xs text-slate-500 mb-4">Accumulated medicine units saved over time.</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="unitsSaved" stroke="#10b981" strokeWidth={3} fill="#10b981" fillOpacity={0.2} name="Units Saved" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Category Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">Medicines Saved by Therapeutic Category</h3>
          <p className="text-xs text-slate-500 mb-4">Proportion of redistributed drug classes.</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Facility Inter-Hospital Performance */}
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
          <h3 className="text-base font-bold text-slate-900 mb-1">Facility Performance Breakdown</h3>
          <p className="text-xs text-slate-500 mb-4">Transfers sent vs transfers received by major hospitals.</p>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={facilityPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="facility" stroke="#94a3b8" fontSize={11} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="transfersSent" fill="#8b5cf6" name="Transfers Sent (Surplus Source)" radius={[6, 6, 0, 0]} />
                <Bar dataKey="transfersReceived" fill="#2563eb" name="Transfers Received (Destination)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
};
