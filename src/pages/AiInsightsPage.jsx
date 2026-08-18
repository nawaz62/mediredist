import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  TrendingUp,
  Clock,
  AlertTriangle,
  Zap,
  ArrowRight,
  CheckCircle2,
  BrainCircuit,
  BarChart3
} from 'lucide-react';

export const AiInsightsPage = () => {
  const navigate = useNavigate();
  const { inventory, calculateAiMatches, createTransferRequest } = useApp();

  const [activeModule, setActiveModule] = useState('ALL');

  const matches = calculateAiMatches();

  return (
    <div className="space-y-6 pb-12">
      
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-purple-800/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/40 flex items-center gap-1.5">
              <BrainCircuit className="w-3.5 h-3.5" /> AI Decision Engine — Prototype
            </span>
            <span className="text-xs text-purple-300/80 font-mono">Deterministic Heuristic Model</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Proactive Decision Intelligence
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Proactive analytics predicting demand spikes, quantifying batch expiry risks, and suggesting optimal inter-hospital transfers before stockouts occur.
          </p>
        </div>

        <button
          onClick={() => navigate('/smart-matching')}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white font-bold rounded-2xl text-xs shadow-lg transition-all active:scale-95 shrink-0"
        >
          <Zap className="w-4 h-4 fill-white" />
          <span>Launch Matching Engine</span>
        </button>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto custom-scrollbar">
        <button
          onClick={() => setActiveModule('ALL')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeModule === 'ALL' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          All 4 AI Modules
        </button>
        <button
          onClick={() => setActiveModule('DEMAND')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeModule === 'DEMAND' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          1. Demand Forecasting
        </button>
        <button
          onClick={() => setActiveModule('EXPIRY')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeModule === 'EXPIRY' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          2. Expiry Risk Scoring
        </button>
        <button
          onClick={() => setActiveModule('SHORTAGE')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeModule === 'SHORTAGE' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          3. Shortage Risk Prediction
        </button>
        <button
          onClick={() => setActiveModule('MATCHING')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeModule === 'MATCHING' ? 'bg-purple-600 text-white shadow-md' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          4. Smart Matching
        </button>
      </div>

      {/* Grid of AI Modules */}
      <div className="space-y-8">
        
        {/* MODULE 1: Demand Forecasting */}
        {(activeModule === 'ALL' || activeModule === 'DEMAND') && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Module 1: AI Demand Forecasting</h2>
                  <p className="text-xs text-slate-500">Predicted 7-day and 30-day consumption velocity across facilities.</p>
                </div>
              </div>
              <span className="text-xs bg-blue-50 text-blue-700 font-bold px-3 py-1 rounded-full border border-blue-200">
                Time Series Predictor
              </span>
            </div>

            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                    <th className="p-3 font-semibold">Medicine</th>
                    <th className="p-3 font-semibold">Facility</th>
                    <th className="p-3 font-semibold">Current Stock</th>
                    <th className="p-3 font-semibold">Daily Usage</th>
                    <th className="p-3 font-semibold">Predicted 7-Day</th>
                    <th className="p-3 font-semibold">Predicted 30-Day</th>
                    <th className="p-3 font-semibold">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {inventory.slice(0, 5).map(item => {
                    const d7 = item.dailyConsumption * 7;
                    const d30 = item.dailyConsumption * 30;
                    const isHighRisk = item.quantity < d7;

                    return (
                      <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                        <td className="p-3 font-bold text-slate-900">{item.medicineName}</td>
                        <td className="p-3 text-slate-600">{item.facilityName}</td>
                        <td className="p-3 font-bold text-slate-900">{item.quantity} units</td>
                        <td className="p-3 text-slate-600">{item.dailyConsumption} units/day</td>
                        <td className="p-3 font-semibold text-blue-600">{d7} units</td>
                        <td className="p-3 font-semibold text-indigo-600">{d30} units</td>
                        <td className="p-3">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            isHighRisk ? 'bg-rose-100 text-rose-800 border-rose-200' : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                          }`}>
                            {isHighRisk ? 'HIGH RISK' : 'OPTIMAL'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MODULE 2: Expiry Risk Scoring */}
        {(activeModule === 'ALL' || activeModule === 'EXPIRY') && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Module 2: Expiry Risk Scoring Engine</h2>
                  <p className="text-xs text-slate-500">Quantifies batch decay urgency based on days remaining and usage speed.</p>
                </div>
              </div>
              <span className="text-xs bg-amber-50 text-amber-700 font-bold px-3 py-1 rounded-full border border-amber-200">
                Batch Expiry Model
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inventory.filter(i => i.expiryRiskScore >= 50).map(item => (
                <div key={item.id} className="p-4 rounded-2xl bg-amber-50/50 border border-amber-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">{item.medicineName}</h3>
                      <span className="text-[11px] font-mono bg-white px-2 py-0.5 rounded border border-amber-200 text-slate-600">
                        {item.batchId}
                      </span>
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white p-2 rounded-xl border border-amber-100">
                        <span className="block text-[10px] text-slate-400">Days to Expiry</span>
                        <strong className="text-amber-700 font-bold">{item.daysRemaining} Days</strong>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-amber-100">
                        <span className="block text-[10px] text-slate-400">Unused Qty</span>
                        <strong className="text-slate-900 font-bold">{item.quantity} Units</strong>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-amber-100">
                        <span className="block text-[10px] text-slate-400">Risk Score</span>
                        <strong className="text-rose-600 font-bold">{item.expiryRiskScore}/100</strong>
                      </div>
                    </div>

                    <p className="text-xs text-amber-900 mt-3 font-medium bg-amber-100/60 p-2.5 rounded-xl border border-amber-200">
                      💡 <strong>Explainability:</strong> High expiry risk due to short remaining shelf life ({item.daysRemaining} days) and low consumption speed ({item.dailyConsumption} units/day).
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 3: Shortage Risk Prediction */}
        {(activeModule === 'ALL' || activeModule === 'SHORTAGE') && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Module 3: Shortage & Stockout Prediction</h2>
                  <p className="text-xs text-slate-500">Flags impending medicine stockouts based on patient admission rates.</p>
                </div>
              </div>
              <span className="text-xs bg-rose-50 text-rose-700 font-bold px-3 py-1 rounded-full border border-rose-200">
                Stockout Alert Model
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inventory.filter(i => i.shortageRiskScore >= 75).map(item => (
                <div key={item.id} className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-slate-900">{item.medicineName}</h3>
                      <span className="text-[10px] font-bold bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full border border-rose-200">
                        CRITICAL SHORTAGE
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1">{item.facilityName}</p>

                    <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="bg-white p-2 rounded-xl border border-rose-100">
                        <span className="block text-[10px] text-slate-400">Current Stock</span>
                        <strong className="text-slate-900 font-bold">{item.quantity} Units</strong>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-rose-100">
                        <span className="block text-[10px] text-slate-400">Daily Consumption</span>
                        <strong className="text-rose-600 font-bold">{item.dailyConsumption} / day</strong>
                      </div>
                      <div className="bg-white p-2 rounded-xl border border-rose-100">
                        <span className="block text-[10px] text-slate-400">Predicted Depletion</span>
                        <strong className="text-rose-700 font-bold">~{Math.max(1, Math.ceil(item.quantity / item.dailyConsumption))} Days</strong>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* MODULE 4: Smart Matching Opportunities */}
        {(activeModule === 'ALL' || activeModule === 'MATCHING') && (
          <div className="bg-white rounded-3xl border border-purple-200 p-6 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-slate-900">Module 4: Best Redistribution Opportunities</h2>
                  <p className="text-xs text-slate-500">Highest-ranked facility-to-facility pairings calculated by AI formula.</p>
                </div>
              </div>
              <button
                onClick={() => navigate('/smart-matching')}
                className="text-xs font-bold text-purple-700 hover:underline"
              >
                View Full Engine ({matches.length})
              </button>
            </div>

            <div className="space-y-4">
              {matches.slice(0, 3).map((match, idx) => (
                <div key={match.id} className="p-4 rounded-2xl bg-gradient-to-r from-purple-50/80 to-indigo-50/80 border border-purple-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black bg-purple-600 text-white px-2.5 py-0.5 rounded-full">
                        #{idx + 1} Match ({match.matchScore}%)
                      </span>
                      <h3 className="text-sm font-bold text-slate-900">{match.medicineName}</h3>
                    </div>

                    <div className="mt-2 text-xs text-slate-700 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-slate-900">{match.sourceFacilityName}</span>
                      <span className="text-purple-600 font-bold">➔</span>
                      <span className="font-semibold text-slate-900">{match.destFacilityName}</span>
                      <span className="bg-white px-2 py-0.5 rounded border border-purple-200 font-mono text-[11px]">
                        Qty: {match.requiredQty} units
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] text-slate-600 flex flex-wrap gap-x-3">
                      {match.reasons.slice(0, 3).map((r, i) => (
                        <span key={i} className="text-emerald-700">{r}</span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      createTransferRequest({
                        medicineId: match.medicineId,
                        medicineName: match.medicineName,
                        batchId: match.batchId,
                        sourceFacilityId: match.sourceFacilityId,
                        sourceFacilityName: match.sourceFacilityName,
                        destFacilityId: match.destFacilityId,
                        destFacilityName: match.destFacilityName,
                        quantity: match.requiredQty,
                        matchScore: match.matchScore
                      });
                      navigate('/transfers');
                    }}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-md transition-all shrink-0 active:scale-95"
                  >
                    Create Transfer Request
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
