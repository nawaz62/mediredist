import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Pill, ShieldCheck, Lock, Mail, ArrowRight, Award, UserCheck, Play } from 'lucide-react';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login, demoLogin, startDemo } = useApp();

  const [email, setEmail] = useState('facility@mediredist.demo');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState('Facility Admin');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const res = login(email, password, role);
      setIsSubmitting(false);
      if (res.success) {
        navigate('/dashboard');
      }
    }, 400);
  };

  const handleQuickDemoLogin = (targetRole) => {
    demoLogin(targetRole);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="max-w-md w-full">
        
        {/* Top Header Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 items-center justify-center text-white shadow-xl shadow-blue-500/25 mb-3">
            <Pill className="w-8 h-8 transform -rotate-45" />
          </div>
          <h1 className="text-2xl font-black text-white tracking-wider flex items-center justify-center gap-2">
            MEDIREDIST
            <span className="text-xs bg-blue-500/20 text-blue-400 font-semibold px-2 py-0.5 rounded border border-blue-500/30">
              SIH 2026
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 italic">
            AI-Powered Medicine Redistribution Network
          </p>
        </div>

        {/* Card Container */}
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/80 rounded-3xl p-6 sm:p-8 shadow-2xl">
          
          <div className="mb-6">
            <h2 className="text-lg font-bold text-white">Sign In to Dashboard</h2>
            <p className="text-xs text-slate-400 mt-0.5">Select role and credentials for SIH Demonstration.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Role Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Authentication Role
              </label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-slate-900/60 rounded-xl border border-slate-700">
                <button
                  type="button"
                  onClick={() => {
                    setRole('Facility Admin');
                    setEmail('facility@mediredist.demo');
                    setPassword('demo123');
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    role === 'Facility Admin'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Facility Admin
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRole('Central Admin');
                    setEmail('admin@mediredist.demo');
                    setPassword('admin123');
                  }}
                  className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                    role === 'Central Admin'
                      ? 'bg-purple-600 text-white shadow-md'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Central Admin
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <span>Signing In...</span>
              ) : (
                <>
                  <span>Sign In as {role}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Box */}
          <div className="mt-6 pt-5 border-t border-slate-700/80">
            <span className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 text-center">
              Instant SIH Judging Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleQuickDemoLogin('Facility Admin')}
                className="p-2.5 bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-blue-500/50 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-blue-400 text-xs font-semibold">
                  <UserCheck className="w-3.5 h-3.5" /> Facility Demo
                </div>
                <p className="text-[10px] text-slate-400 mt-1 truncate">facility@mediredist.demo</p>
              </button>

              <button
                onClick={() => handleQuickDemoLogin('Central Admin')}
                className="p-2.5 bg-slate-900/80 hover:bg-slate-900 border border-slate-700 hover:border-purple-500/50 rounded-xl text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-purple-400 text-xs font-semibold">
                  <ShieldCheck className="w-3.5 h-3.5" /> Admin Demo
                </div>
                <p className="text-[10px] text-slate-400 mt-1 truncate">admin@mediredist.demo</p>
              </button>
            </div>
          </div>
        </div>

        {/* SIH Team Credits */}
        <p className="text-[11px] text-slate-500 text-center mt-6">
          SIH 2026 Problem Statement #70 • Team Elite Squad
        </p>
      </div>
    </div>
  );
};
