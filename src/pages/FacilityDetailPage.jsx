import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  ArrowLeft,
  Boxes,
  Clock,
  TrendingUp,
  AlertTriangle,
  ArrowRightLeft,
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export const FacilityDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { facilities, inventory, transfers } = useApp();

  const facility = facilities.find(f => f.id === id) || facilities[0];
  const facilityInventory = inventory.filter(i => i.facilityId === facility.id);
  const facilityTransfers = transfers.filter(
    t => t.sourceFacilityId === facility.id || t.destFacilityId === facility.id
  );

  const surplusItems = facilityInventory.filter(i => i.surplusOrShortage === 'Surplus');
  const shortageItems = facilityInventory.filter(i => i.surplusOrShortage === 'Shortage');
  const nearExpiryItems = facilityInventory.filter(i => i.status === 'Near Expiry' || i.daysRemaining <= 45);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Back Navigation */}
      <button
        onClick={() => navigate('/facilities')}
        className="flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-xs transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Facilities Directory
      </button>

      {/* Facility Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-lg shadow-blue-500/20 shrink-0">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{facility.name}</h1>
              <span className="text-xs bg-blue-50 text-blue-700 font-semibold px-2.5 py-0.5 rounded-full border border-blue-200">
                {facility.type}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5" /> {facility.location} • {facility.coordinates}
            </p>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" /> Contact: {facility.contactPerson} ({facility.phone})
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(`/inventory?facility=${facility.id}`)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl shadow-xs transition-all"
          >
            Manage Inventory
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <span className="text-xs font-semibold text-slate-500">Total Stock Capacity</span>
          <span className="block text-2xl font-black text-slate-900 mt-1">{facility.totalStock.toLocaleString()} Units</span>
          <span className="text-[11px] text-slate-500">Storage Occupancy: {facility.storageCapacity}</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-purple-200 shadow-xs">
          <span className="text-xs font-semibold text-purple-700">Surplus Medicines</span>
          <span className="block text-2xl font-black text-purple-900 mt-1">{surplusItems.length} Batches</span>
          <span className="text-[11px] font-medium text-purple-600">Ready for redistribution match</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-rose-200 shadow-xs">
          <span className="text-xs font-semibold text-rose-700">Shortage Risks</span>
          <span className="block text-2xl font-black text-rose-900 mt-1">{shortageItems.length} Batches</span>
          <span className="text-[11px] font-medium text-rose-600">Requires inward transfer match</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs">
          <span className="text-xs font-semibold text-amber-700">Near-Expiry Stock</span>
          <span className="block text-2xl font-black text-amber-900 mt-1">{nearExpiryItems.length} Batches</span>
          <span className="text-[11px] font-medium text-amber-600 font-mono">High priority redistribution</span>
        </div>
      </div>

      {/* Facility Inventory Table */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <h3 className="text-base font-bold text-slate-900 mb-4">Current Facility Inventory</h3>

        {facilityInventory.length > 0 ? (
          <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                  <th className="p-3 font-semibold">Medicine</th>
                  <th className="p-3 font-semibold">Batch ID</th>
                  <th className="p-3 font-semibold">Quantity</th>
                  <th className="p-3 font-semibold">Expiry Date</th>
                  <th className="p-3 font-semibold">Days Left</th>
                  <th className="p-3 font-semibold">Expiry Risk</th>
                  <th className="p-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {facilityInventory.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-3 font-bold text-slate-900">{item.medicineName}</td>
                    <td className="p-3 font-mono text-slate-600">{item.batchId}</td>
                    <td className="p-3 font-bold">{item.quantity}</td>
                    <td className="p-3 text-slate-600">{item.expiryDate}</td>
                    <td className="p-3 font-semibold text-amber-700">{item.daysRemaining} days</td>
                    <td className="p-3 font-bold text-rose-600">{item.expiryRiskScore}/100</td>
                    <td className="p-3">
                      <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-500 py-4">No active inventory batches recorded for this facility.</p>
        )}
      </div>
    </div>
  );
};
