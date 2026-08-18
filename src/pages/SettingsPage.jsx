import React from 'react';
import { Settings, ShieldCheck, Lock, Bell, Database, Key, Server } from 'lucide-react';

export const SettingsPage = () => {
  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">System & Security Settings</h1>
          <p className="text-xs text-slate-500 mt-1">
            Configure network rules, security protocols, and SIH prototype settings.
          </p>
        </div>
      </div>

      {/* Security UI Section (Requirement #33) */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Platform Security & Compliance Matrix</h2>
            <p className="text-xs text-slate-500">Security enforcement protocols active for SIH prototype.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">✓ Role-Based Access Control (RBAC)</h3>
              <p className="text-xs text-slate-600 mt-0.5">Strict isolation between Facility Admin operations and Central Admin approval controls.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Lock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">✓ Secure Authentication</h3>
              <p className="text-xs text-slate-600 mt-0.5">Local session persistence with role-based routing verification.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Database className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">✓ Complete Audit Logging</h3>
              <p className="text-xs text-slate-600 mt-0.5">Every data creation, transfer approval, dispatch, and delivery creates a timestamped log entry.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
            <Key className="w-5 h-5 text-purple-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">✓ Encrypted Communication — Prototype Indicator</h3>
              <p className="text-xs text-slate-600 mt-0.5">TLS/HTTPS protocol simulated with payload signature hashing for transfer barcodes.</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3 col-span-1 md:col-span-2">
            <Server className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="text-xs font-bold text-slate-900">✓ Authorized Transfer Approval Policy</h3>
              <p className="text-xs text-slate-600 mt-0.5">Prevents unverified transfers. Requires Central Admin review to guarantee medicine safety and batch expiration compliance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
