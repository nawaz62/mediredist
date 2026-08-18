import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Pill,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity,
  Award,
  BarChart3,
  QrCode,
  Building2,
  Users,
  CheckCircle2,
  Play
} from 'lucide-react';

export const LandingPage = () => {
  const navigate = useNavigate();
  const { startDemo } = useApp();

  const handleStartDemo = () => {
    startDemo();
    navigate('/dashboard');
  };

  const steps = [
    { num: "01", title: "Add Inventory", desc: "Facilities register medicine batches with expiry dates." },
    { num: "02", title: "Batch Scan", desc: "QR/Barcode generated for end-to-end traceability." },
    { num: "03", title: "AI Analysis", desc: "System evaluates demand patterns & consumption." },
    { num: "04", title: "Predict Risk", desc: "Expiry risk & shortage risk scores calculated." },
    { num: "05", title: "Identify Gaps", desc: "Surplus at Source vs Shortage at Destination." },
    { num: "06", title: "Smart Match", desc: "AI Decision Engine finds top facility-to-facility match." },
    { num: "07", title: "Admin Approval", desc: "Central Authority verifies & authorizes dispatch." },
    { num: "08", title: "Dispatch & Track", desc: "Medicine in transit tracked with QR checkpoint scans." },
    { num: "09", title: "Delivery Sync", desc: "Destination stock increases automatically upon receipt." },
    { num: "10", title: "Impact Saved", desc: "Wastage prevented ₹ & stockouts avoided recorded." }
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-blue-500 selection:text-white">
      {/* Top Navigation */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              <Pill className="w-6 h-6 transform -rotate-45" />
            </div>
            <div>
              <span className="text-xl font-black tracking-wider text-white flex items-center gap-2">
                MEDIREDIST
                <span className="text-xs bg-blue-500/20 text-blue-400 font-semibold px-2 py-0.5 rounded-full border border-blue-500/30">
                  SIH 2026
                </span>
              </span>
              <span className="block text-[11px] text-slate-400 font-medium italic">
                Right Medicine. Right Place. Right Time.
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleStartDemo}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all active:scale-95"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>🎬 Start SIH Demo</span>
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl shadow-md transition-all"
            >
              Login to Platform
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Glow background effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[250px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-semibold mb-8">
            <Award className="w-4 h-4" /> Smart India Hackathon 2026 • Problem Statement #70
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-tight">
            AI-Powered Medicine <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Redistribution Network
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto font-light leading-relaxed">
            Connecting healthcare facilities to prevent costly medicine expiration, solve urgent stockouts, and automate inter-hospital redistribution using proactive AI decision intelligence.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={handleStartDemo}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-bold rounded-2xl shadow-xl shadow-blue-600/25 transition-all text-sm group"
            >
              <span>Explore Interactive Prototype</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-4 bg-slate-800/80 hover:bg-slate-800 text-slate-200 font-bold rounded-2xl border border-slate-700 text-sm transition-all"
            >
              View Admin Login
            </button>
          </div>

          {/* Quick Metrics Header Card */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-md">
              <span className="text-2xl font-bold text-emerald-400">1,250+</span>
              <p className="text-xs text-slate-400 mt-1">Units Saved From Expiry</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-md">
              <span className="text-2xl font-bold text-blue-400">₹7.45 Lakhs</span>
              <p className="text-xs text-slate-400 mt-1">Wastage Prevented</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-md">
              <span className="text-2xl font-bold text-amber-400">87 Cases</span>
              <p className="text-xs text-slate-400 mt-1">Stockouts Prevented</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-800/50 border border-slate-700/60 backdrop-blur-md">
              <span className="text-2xl font-bold text-purple-400">35 Facilities</span>
              <p className="text-xs text-slate-400 mt-1">Inter-Connected Network</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem vs Solution */}
      <section className="py-20 px-6 bg-slate-950 border-t border-b border-slate-800">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Problem */}
          <div className="p-8 rounded-3xl bg-rose-950/20 border border-rose-500/20">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">The Problem</span>
            <h2 className="text-2xl font-bold text-white mt-2">Healthcare Inefficiency & Waste</h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>Millions of rupees in life-saving medicines expire unused in hospital storehouses daily.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>Nearby clinics face severe medicine shortages and stockouts for the exact same drugs.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                <span>Lack of real-time inter-facility stock visibility and manual slow transfer processes.</span>
              </li>
            </ul>
          </div>

          {/* Solution */}
          <div className="p-8 rounded-3xl bg-emerald-950/20 border border-emerald-500/20">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Our Solution</span>
            <h2 className="text-2xl font-bold text-white mt-2">MEDIREDIST Smart Engine</h2>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Deterministic AI Decision Engine predicts expiry risk & stockout urgency weeks in advance.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Smart Match Scoring pairs surplus source facilities with high-demand destination facilities.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <span>Centralized admin authorization, QR traceability, and real-time inventory auto-update.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 10-Step Operational Flow */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-extrabold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/30">
            End-to-End Workflow
          </span>
          <h2 className="text-3xl font-bold text-white mt-3">The 10-Step Redistribution Flow</h2>
          <p className="text-slate-400 text-sm mt-2">How MEDIREDIST turns surplus inventory into saved lives.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map(step => (
            <div key={step.num} className="p-5 rounded-2xl bg-slate-800/40 border border-slate-700/60 hover:border-blue-500/40 transition-all hover:-translate-y-1">
              <span className="text-2xl font-black text-blue-400 opacity-60 font-mono">{step.num}</span>
              <h3 className="text-sm font-bold text-white mt-2">{step.title}</h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SIH Hackathon Team Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center justify-center md:justify-start gap-2">
              MEDIREDIST <span className="text-xs text-blue-400 font-normal">SIH 2026 Prototype</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Smart India Hackathon 2026 • Problem Statement #70
            </p>
            <p className="text-xs text-slate-500 mt-1">
              School of Management Sciences, Lucknow • B.Tech 3rd Year
            </p>
          </div>

          <div className="text-xs text-slate-300">
            <span className="font-bold text-purple-400 uppercase tracking-wider block mb-2">Team Elite Squad</span>
            <div className="flex flex-wrap justify-center md:justify-end gap-2 text-slate-400">
              <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-200 font-medium">Karan Gupta</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-200 font-medium">Sahil</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-200 font-medium">MD Nawazish Husain</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-200 font-medium">Priyanshu Negi</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-200 font-medium">Priya Singh</span>
              <span className="bg-slate-800 px-2.5 py-1 rounded-md text-slate-200 font-medium">Gungun Paul</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
