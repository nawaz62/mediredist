import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Bell, AlertTriangle, Clock, ArrowRight, Zap, CheckCircle2, Filter } from 'lucide-react';

export const AlertsPage = () => {
  const navigate = useNavigate();
  const { alerts } = useApp();
  const [filterCategory, setFilterCategory] = useState('ALL');

  const filteredAlerts = alerts.filter(a => {
    if (filterCategory === 'ALL') return true;
    if (filterCategory === 'CRITICAL') return a.category === 'CRITICAL';
    if (filterCategory === 'EXPIRY') return a.type.includes('Expiry');
    if (filterCategory === 'SHORTAGE') return a.type.includes('Shortage');
    if (filterCategory === 'TRANSFER') return a.type.includes('Transfer');
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Real-Time System Alerts</h1>
          <p className="text-xs text-slate-500 mt-1">
            Automated alerts for stockouts, near-expiry batches, and transfer requests.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-rose-50 text-rose-700 border border-rose-200">
          {alerts.length} Total Alerts
        </span>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto custom-scrollbar">
        {['ALL', 'CRITICAL', 'EXPIRY', 'SHORTAGE', 'TRANSFER'].map(cat => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterCategory === cat ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Alerts List */}
      <div className="space-y-3">
        {filteredAlerts.map(alert => {
          const getBadgeStyle = (cat) => {
            switch (cat) {
              case 'CRITICAL': return 'bg-rose-100 text-rose-800 border-rose-200';
              case 'HIGH': return 'bg-amber-100 text-amber-800 border-amber-200';
              default: return 'bg-purple-100 text-purple-800 border-purple-200';
            }
          };

          const handleAction = () => {
            if (alert.actionType === 'FIND_MATCH' || alert.actionType === 'CREATE_TRANSFER') {
              navigate('/smart-matching');
            } else if (alert.actionType === 'APPROVE_TRANSFER') {
              navigate('/transfers');
            } else {
              navigate('/inventory');
            }
          };

          return (
            <div
              key={alert.id}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className={`w-5 h-5 shrink-0 mt-0.5 ${
                  alert.category === 'CRITICAL' ? 'text-rose-500' : 'text-amber-500'
                }`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getBadgeStyle(alert.category)}`}>
                      {alert.type}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">{alert.timestamp}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mt-1">{alert.medicineName}</h3>
                  <p className="text-xs text-slate-600 mt-0.5">{alert.facilityName}</p>
                  <p className="text-xs text-slate-500 mt-1">{alert.details}</p>
                </div>
              </div>

              <button
                onClick={handleAction}
                className="self-end sm:self-center px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Take Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
