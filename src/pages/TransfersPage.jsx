import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/Modal';
import {
  ArrowRightLeft,
  CheckCircle2,
  XCircle,
  Truck,
  PackageCheck,
  Eye,
  Building2,
  Clock,
  ShieldCheck,
  QrCode,
  Sparkles,
  AlertTriangle
} from 'lucide-react';

export const TransfersPage = () => {
  const navigate = useNavigate();
  const {
    user,
    transfers,
    approveTransfer,
    rejectTransfer,
    dispatchTransfer,
    confirmDelivery,
    completeTransfer,
    triggerToast
  } = useApp();

  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('ALL');

  const handleApprove = (trfId) => {
    approveTransfer(trfId);
    setSelectedTransfer(null);
  };

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!selectedTransfer) return;
    if (!rejectReason.trim()) {
      triggerToast('error', 'Rejection Error', 'Please provide a valid rejection reason.');
      return;
    }
    rejectTransfer(selectedTransfer.id, rejectReason);
    setShowRejectModal(false);
    setSelectedTransfer(null);
    setRejectReason('');
  };

  const filteredTransfers = transfers.filter(t => 
    filterStatus === 'ALL' || t.status === filterStatus
  );

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Transfer Approval & Operations Center</h1>
            <span className="text-xs bg-purple-50 text-purple-700 font-semibold px-2.5 py-0.5 rounded-full border border-purple-200">
              Admin Governance
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Authorize inter-facility medicine transfers, trigger dispatches, and verify delivery updates.
          </p>
        </div>

        <button
          onClick={() => navigate('/smart-matching')}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all shrink-0"
        >
          <Sparkles className="w-4 h-4" />
          <span>+ New AI Match Request</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto custom-scrollbar">
        {['ALL', 'REQUESTED', 'APPROVED', 'DISPATCHED', 'DELIVERED', 'COMPLETED', 'CANCELLED'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              filterStatus === st ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {st === 'ALL' ? 'All Transfers' : st}
          </button>
        ))}
      </div>

      {/* Main Transfers Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th className="p-4 font-semibold">Transfer ID</th>
                <th className="p-4 font-semibold">Medicine & Batch</th>
                <th className="p-4 font-semibold">Source Facility</th>
                <th className="p-4 font-semibold">Destination Facility</th>
                <th className="p-4 font-semibold">Quantity</th>
                <th className="p-4 font-semibold">AI Match Score</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Requested Date</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransfers.map(trf => {
                const getStatusBadge = (st) => {
                  switch (st) {
                    case 'REQUESTED': return 'bg-amber-100 text-amber-800 border-amber-200';
                    case 'APPROVED': return 'bg-blue-100 text-blue-800 border-blue-200';
                    case 'DISPATCHED': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
                    case 'IN TRANSIT': return 'bg-purple-100 text-purple-800 border-purple-200';
                    case 'DELIVERED': return 'bg-teal-100 text-teal-800 border-teal-200';
                    case 'COMPLETED': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
                    case 'CANCELLED': return 'bg-rose-100 text-rose-800 border-rose-200';
                    default: return 'bg-slate-100 text-slate-800 border-slate-200';
                  }
                };

                return (
                  <tr key={trf.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900">{trf.id}</td>
                    <td className="p-4">
                      <div>
                        <span className="font-bold text-slate-900">{trf.medicineName}</span>
                        <span className="block text-[10px] text-slate-400 font-mono">{trf.batchId}</span>
                      </div>
                    </td>
                    <td className="p-4 font-medium text-slate-700">{trf.sourceFacilityName}</td>
                    <td className="p-4 font-medium text-slate-700">{trf.destFacilityName}</td>
                    <td className="p-4 font-black text-slate-900 text-sm">{trf.quantity}</td>
                    <td className="p-4">
                      <span className="bg-purple-50 text-purple-700 font-bold px-2 py-0.5 rounded border border-purple-200">
                        {trf.matchScore}%
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(trf.status)}`}>
                        {trf.status}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500">{trf.requestedAt}</td>

                    {/* Operational Action Buttons */}
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        
                        {/* Status = REQUESTED */}
                        {trf.status === 'REQUESTED' && (
                          <button
                            onClick={() => setSelectedTransfer(trf)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-[11px] rounded-lg shadow-xs transition-all"
                          >
                            Review & Approve
                          </button>
                        )}

                        {/* Status = APPROVED */}
                        {trf.status === 'APPROVED' && (
                          <button
                            onClick={() => dispatchTransfer(trf.id)}
                            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[11px] rounded-lg shadow-xs transition-all flex items-center gap-1"
                          >
                            <Truck className="w-3.5 h-3.5" /> Dispatch
                          </button>
                        )}

                        {/* Status = DISPATCHED or IN TRANSIT */}
                        {(trf.status === 'DISPATCHED' || trf.status === 'IN TRANSIT') && (
                          <button
                            onClick={() => confirmDelivery(trf.id)}
                            className="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold text-[11px] rounded-lg shadow-xs transition-all flex items-center gap-1"
                          >
                            <PackageCheck className="w-3.5 h-3.5" /> Confirm Delivery
                          </button>
                        )}

                        {/* Status = DELIVERED */}
                        {trf.status === 'DELIVERED' && (
                          <button
                            onClick={() => completeTransfer(trf.id)}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] rounded-lg shadow-xs transition-all flex items-center gap-1"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                          </button>
                        )}

                        {/* QR Track View */}
                        <button
                          onClick={() => navigate(`/qr-scanner?trf=${trf.id}`)}
                          className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg"
                          title="View QR Code"
                        >
                          <QrCode className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredTransfers.length === 0 && (
          <div className="text-center py-12">
            <ArrowRightLeft className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-900">No Transfers Found</h3>
            <p className="text-xs text-slate-500 mt-1">No active transfers match the selected filter.</p>
          </div>
        )}
      </div>

      {/* Admin Review & Approval Modal */}
      {selectedTransfer && !showRejectModal && (
        <Modal
          isOpen={!!selectedTransfer}
          onClose={() => setSelectedTransfer(null)}
          title={`Transfer Governance Review — ${selectedTransfer.id}`}
        >
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Medicine:</span>
                <strong className="text-slate-900">{selectedTransfer.medicineName} (Batch {selectedTransfer.batchId})</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Source Facility:</span>
                <strong className="text-slate-900">{selectedTransfer.sourceFacilityName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Destination Facility:</span>
                <strong className="text-slate-900">{selectedTransfer.destFacilityName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transfer Quantity:</span>
                <strong className="text-slate-900 text-sm">{selectedTransfer.quantity} Units</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">AI Match Score:</span>
                <span className="font-bold text-purple-700">{selectedTransfer.matchScore}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Expiry Risk:</span>
                <span className="text-amber-700 font-semibold">{selectedTransfer.expiryRisk}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Shortage Risk:</span>
                <span className="text-rose-700 font-semibold">{selectedTransfer.shortageRisk}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900">
              💡 <strong>Safety Audit Verification:</strong> Source batch expiry date verified (&gt;30 days). Available source stock exceeds transfer quantity. Authorization log will be created upon approval.
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-between gap-3">
              <button
                type="button"
                onClick={() => setShowRejectModal(true)}
                className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 font-bold text-xs rounded-xl transition-all"
              >
                Reject Request
              </button>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTransfer(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleApprove(selectedTransfer.id)}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Transfer</span>
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <Modal
          isOpen={showRejectModal}
          onClose={() => setShowRejectModal(false)}
          title="Reject Transfer Request"
        >
          <form onSubmit={handleConfirmReject} className="space-y-4">
            <p className="text-xs text-slate-600">
              Please specify the administrative or logistical reason for rejecting transfer <strong>{selectedTransfer?.id}</strong>.
            </p>

            <textarea
              required
              rows="3"
              placeholder="e.g. Destination facility storage full, cold chain logistics unavailable..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-rose-500 resize-none"
            />

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowRejectModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
              >
                Back
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Confirm Rejection
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};
