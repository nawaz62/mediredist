import React from 'react';
import { DEMO_USERS } from '../data/mockData';
import { Users, ShieldCheck, UserCheck, CheckCircle2, Lock } from 'lucide-react';

export const UserManagementPage = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">User & Role Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Centralized role-based access control (RBAC) governing facility permissions.
          </p>
        </div>
      </div>

      {/* Role Matrix Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Facility Admin Role */}
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Facility Admin Scope</h3>
              <p className="text-xs text-slate-500">Hospital / Clinic Level Operations</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Can view facility inventory & registered stock</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Can add & update medicine batch records</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Can request inter-facility transfers & confirm delivery</span>
            </div>
            <div className="flex items-center gap-2 text-rose-600 font-medium pt-2 border-t border-slate-100">
              <Lock className="w-4 h-4 text-rose-500" />
              <span>Cannot approve own transfer requests (Central Admin required)</span>
            </div>
          </div>
        </div>

        {/* Central Admin Role */}
        <div className="bg-white p-6 rounded-3xl border border-purple-200 shadow-xs space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Central Admin Scope</h3>
              <p className="text-xs text-slate-500">Network Governance & Approval Authority</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Full network-wide inventory & facility visibility</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Authorize & approve / reject pending transfer requests</span>
            </div>
            <div className="flex items-center gap-2 text-emerald-700 font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>View impact analytics, audit logs, and security controls</span>
            </div>
          </div>
        </div>

      </div>

      {/* Users Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 font-bold text-slate-900 text-sm">
          Active Prototype Users
        </div>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="p-4 font-semibold">User</th>
                <th className="p-4 font-semibold">Email</th>
                <th className="p-4 font-semibold">Role</th>
                <th className="p-4 font-semibold">Assigned Facility</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {DEMO_USERS.map(u => (
                <tr key={u.email} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-3">
                    <img src={u.avatar} alt={u.name} className="w-8 h-8 rounded-full object-cover" />
                    <span>{u.name}</span>
                  </td>
                  <td className="p-4 font-mono text-slate-600">{u.email}</td>
                  <td className="p-4">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      u.role === 'Central Admin' ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-blue-100 text-blue-800 border-blue-200'
                    }`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4 font-medium text-slate-700">{u.facilityName}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
