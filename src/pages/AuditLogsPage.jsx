import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { History, Search, ShieldCheck, FileText } from 'lucide-react';

export const AuditLogsPage = () => {
  const { auditLogs } = useApp();
  const [search, setSearch] = useState('');
  const [selectedAction, setSelectedAction] = useState('ALL');

  const actionsList = ['ALL', ...new Set(auditLogs.map(l => l.action))];

  const filteredLogs = auditLogs.filter(log => {
    const matchesSearch = 
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.entity.toLowerCase().includes(search.toLowerCase()) ||
      log.details.toLowerCase().includes(search.toLowerCase());
    
    const matchesAction = selectedAction === 'ALL' || log.action === selectedAction;

    return matchesSearch && matchesAction;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">System Audit Trail</h1>
          <p className="text-xs text-slate-500 mt-1">
            Immutable log tracking every inventory registration, AI recommendation, transfer approval, and delivery.
          </p>
        </div>
        <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 font-mono">
          {auditLogs.length} Total Log Entries
        </span>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search user, entity, or details..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
          />
        </div>

        <select
          value={selectedAction}
          onChange={(e) => setSelectedAction(e.target.value)}
          className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500 shadow-xs w-full sm:w-auto"
        >
          {actionsList.map(a => (
            <option key={a} value={a}>{a === 'ALL' ? 'All Action Types' : a}</option>
          ))}
        </select>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="p-4 font-semibold">Log ID</th>
                <th className="p-4 font-semibold">Timestamp</th>
                <th className="p-4 font-semibold">User / Trigger</th>
                <th className="p-4 font-semibold">Action</th>
                <th className="p-4 font-semibold">Target Entity</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900">{log.id}</td>
                  <td className="p-4 text-slate-500 text-[11px]">{log.timestamp}</td>
                  <td className="p-4 font-semibold text-slate-800 font-sans">{log.user}</td>
                  <td className="p-4">
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded font-bold text-[10px]">
                      {log.action}
                    </span>
                  </td>
                  <td className="p-4 font-sans font-medium text-slate-900">{log.entity}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 font-bold text-[10px] px-2 py-0.5 rounded-full font-sans">
                      {log.status}
                    </span>
                  </td>
                  <td className="p-4 font-sans text-slate-600 max-w-xs truncate">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
