import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/Modal';
import {
  Zap,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Building2,
  Clock,
  AlertTriangle,
  Send,
  HelpCircle,
  BarChart2
} from 'lucide-react';

export const SmartMatchingPage = () => {
  const navigate = useNavigate();
  const { calculateAiMatches, createTransferRequest } = useApp();

  const [isCalculating, setIsCalculating] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [transferQty, setTransferQty] = useState(120);

  const matches = calculateAiMatches();

  const handleRecalculate = () => {
    setIsCalculating(true);
    setTimeout(() => {
      setIsCalculating(false);
    }, 500);
  };

  const handleOpenTransferModal = (match) => {
    setSelectedMatch(match);
    setTransferQty(match.requiredQty);
  };

  const handleSubmitTransfer = (e) => {
    e.preventDefault();
    if (!selectedMatch) return;

    if (transferQty > selectedMatch.availableQty) {
      alert("Transfer quantity cannot exceed source available stock!");
      return;
    }

    createTransferRequest({
      medicineId: selectedMatch.medicineId,
      medicineName: selectedMatch.medicineName,
      batchId: selectedMatch.batchId,
      sourceFacilityId: selectedMatch.sourceFacilityId,
      sourceFacilityName: selectedMatch.sourceFacilityName,
      destFacilityId: selectedMatch.destFacilityId,
      destFacilityName: selectedMatch.destFacilityName,
      quantity: transferQty,
      matchScore: selectedMatch.matchScore,
      expiryRisk: `High (${selectedMatch.expiryDays} days left)`,
      shortageRisk: `Critical (${selectedMatch.shortageRiskScore}% risk)`
    });

    setSelectedMatch(null);
    navigate('/transfers');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-3 py-1 rounded-full border border-purple-500/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" /> AI Recommendation Engine
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Smart Redistribution Matching
          </h1>
          <p className="text-sm text-slate-300 mt-1 max-w-2xl">
            Calculates optimal facility pairs based on medicine compatibility, expiry urgency, predicted shortage risk, and geographical distance.
          </p>
        </div>

        <button
          onClick={handleRecalculate}
          disabled={isCalculating}
          className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-xs shadow-xl transition-all active:scale-95 shrink-0"
        >
          <Zap className={`w-4 h-4 fill-white ${isCalculating ? 'animate-spin' : ''}`} />
          <span>{isCalculating ? 'Calculating AI Formula...' : 'Find Best Matches'}</span>
        </button>
      </div>

      {/* Formula Explanation Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 font-bold shrink-0">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div className="text-xs text-slate-600">
            <span className="font-bold text-slate-900 block">Smart Match Formula Weighting (Normalized 0–100):</span>
            <code className="text-[11px] text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-mono mt-1 inline-block">
              MatchScore = 20% (SameMed) + 20% (QtyCompat) + 25% (ExpiryUrgency) + 25% (ShortageRisk) + 10% (Distance)
            </code>
          </div>
        </div>
        <span className="text-xs font-semibold text-slate-500 shrink-0">
          Showing {matches.length} Top Calculated Match Pairs
        </span>
      </div>

      {/* Match Results List */}
      <div className="space-y-4">
        {matches.map((match, idx) => (
          <div
            key={match.id}
            className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col lg:flex-row lg:items-center justify-between gap-6"
          >
            {/* Left Match Info */}
            <div className="flex-1 space-y-4">
              
              {/* Top Score Badge & Title */}
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 text-white flex flex-col items-center justify-center shrink-0 shadow-md">
                  <span className="text-lg font-black leading-none">{match.matchScore}%</span>
                  <span className="text-[9px] uppercase font-bold text-purple-200 mt-0.5">Match</span>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono">
                      Match #{idx + 1}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      match.priority === 'HIGH' ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-blue-100 text-blue-700 border-blue-200'
                    }`}>
                      Priority: {match.priority}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {match.medicineName}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">Batch ID: {match.batchId}</p>
                </div>
              </div>

              {/* Source -> Destination Flow Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs">
                {/* Source */}
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Source Facility (Surplus / Expiry Risk)
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">{match.sourceFacilityName}</p>
                  <span className="text-amber-700 font-semibold text-[11px] block mt-1">
                    Available Stock: {match.availableQty} units ({match.expiryDays} days to expiry)
                  </span>
                </div>

                {/* Dest */}
                <div className="border-t sm:border-t-0 sm:border-l border-slate-200 pt-2 sm:pt-0 sm:pl-3">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Destination Facility (Shortage Risk)
                  </span>
                  <p className="font-bold text-slate-900 mt-0.5">{match.destFacilityName}</p>
                  <span className="text-rose-700 font-semibold text-[11px] block mt-1">
                    Required Transfer: {match.requiredQty} units ({match.shortageRiskScore}% shortage risk)
                  </span>
                </div>
              </div>

              {/* Why This Match? Explainability Reasons */}
              <div>
                <span className="text-xs font-bold text-slate-900 block mb-1">
                  Why this match? (Explainable AI Engine)
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                  {match.reasons.map((r, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold text-xs">{r}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Action Trigger */}
            <div className="shrink-0 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-slate-200 pt-4 lg:pt-0 lg:pl-6">
              <button
                onClick={() => handleOpenTransferModal(match)}
                className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-xs shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Request Transfer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Transfer Creation Modal */}
      {selectedMatch && (
        <Modal
          isOpen={!!selectedMatch}
          onClose={() => setSelectedMatch(null)}
          title={`Create Transfer Request: ${selectedMatch.medicineName}`}
        >
          <form onSubmit={handleSubmitTransfer} className="space-y-4">
            
            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs space-y-2">
              <div className="flex justify-between font-bold text-purple-900">
                <span>Smart Match Score:</span>
                <span>{selectedMatch.matchScore}%</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Source:</span>
                <span className="font-semibold">{selectedMatch.sourceFacilityName}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Destination:</span>
                <span className="font-semibold">{selectedMatch.destFacilityName}</span>
              </div>
              <div className="flex justify-between text-slate-700">
                <span>Medicine & Batch:</span>
                <span className="font-mono">{selectedMatch.medicineName} ({selectedMatch.batchId})</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Requested Transfer Quantity (Max Available: {selectedMatch.availableQty} units)
              </label>
              <input
                type="number"
                min="1"
                max={selectedMatch.availableQty}
                required
                value={transferQty}
                onChange={(e) => setTransferQty(parseInt(e.target.value) || 0)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-bold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Justification / Reason for Transfer
              </label>
              <textarea
                rows="2"
                readOnly
                value={`AI Smart Match (${selectedMatch.matchScore}%) to prevent expiry loss at ${selectedMatch.sourceFacilityName} and resolve predicted shortage at ${selectedMatch.destFacilityName}.`}
                className="w-full p-2.5 bg-slate-100 border border-slate-200 rounded-xl text-xs text-slate-600 resize-none focus:outline-none"
              />
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Transfer Request</span>
              </button>
            </div>

          </form>
        </Modal>
      )}
    </div>
  );
};
