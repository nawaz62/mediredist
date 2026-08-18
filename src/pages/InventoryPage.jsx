import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Modal } from '../components/Modal';
import {
  Boxes,
  Plus,
  Search,
  Filter,
  ArrowUpDown,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  Building2,
  Pill,
  Trash2,
  Edit2
} from 'lucide-react';

export const InventoryPage = () => {
  const { inventory, medicines, facilities, addInventoryItem, triggerToast } = useApp();
  const [searchParams] = useSearchParams();

  // Search & Filter state
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [selectedFacility, setSelectedFacility] = useState(searchParams.get('facility') || 'ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [sortBy, setSortBy] = useState('daysRemaining');
  const [sortOrder, setSortOrder] = useState('asc');

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    medicineId: medicines[0]?.id || '',
    medicineName: medicines[0]?.name || '',
    batchId: '',
    facilityId: facilities[0]?.id || '',
    quantity: 100,
    mfgDate: '2025-05-01',
    expiryDate: '2026-05-01',
    dailyConsumption: 10,
    category: medicines[0]?.category || 'General'
  });

  const handleMedicineChange = (medId) => {
    const selectedMed = medicines.find(m => m.id === medId);
    if (selectedMed) {
      setFormData(prev => ({
        ...prev,
        medicineId: selectedMed.id,
        medicineName: selectedMed.name,
        category: selectedMed.category
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formData.batchId.trim()) {
      triggerToast('error', 'Validation Error', 'Batch ID is required.');
      return;
    }
    if (parseInt(formData.quantity) <= 0) {
      triggerToast('error', 'Validation Error', 'Quantity must be greater than 0.');
      return;
    }

    addInventoryItem(formData);
    setIsAddModalOpen(false);
    // Reset batch ID for next entry
    setFormData(prev => ({ ...prev, batchId: '' }));
  };

  // Filter & Sort Logic
  const filteredInventory = useMemo(() => {
    return inventory.filter(item => {
      const matchesSearch = 
        item.medicineName.toLowerCase().includes(search.toLowerCase()) ||
        item.batchId.toLowerCase().includes(search.toLowerCase()) ||
        item.facilityName.toLowerCase().includes(search.toLowerCase());
      
      const matchesFacility = selectedFacility === 'ALL' || item.facilityId === selectedFacility;
      const matchesStatus = selectedStatus === 'ALL' || item.status === selectedStatus || item.surplusOrShortage === selectedStatus;
      const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;

      return matchesSearch && matchesFacility && matchesStatus && matchesCategory;
    }).sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (typeof valA === 'string') valA = valA.toLowerCase();
      if (typeof valB === 'string') valB = valB.toLowerCase();

      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [inventory, search, selectedFacility, selectedStatus, selectedCategory, sortBy, sortOrder]);

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Inventory Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Real-time inter-facility inventory table with automated risk scoring.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition-all active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Inventory Batch</span>
        </button>
      </div>

      {/* Toolbar Filters */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search medicine, batch ID (e.g. MED-ACE-2505-001)..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Facility Filter */}
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500 shadow-xs"
          >
            <option value="ALL">All Facilities</option>
            {facilities.map(f => (
              <option key={f.id} value={f.id}>{f.name}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500 shadow-xs"
          >
            <option value="ALL">All Statuses</option>
            <option value="Near Expiry">Near Expiry</option>
            <option value="Critical Shortage">Critical Shortage</option>
            <option value="Surplus">Surplus Stock</option>
            <option value="Shortage">Shortage Risk</option>
            <option value="Optimal">Optimal Stock</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 border-b border-slate-200">
                <th 
                  onClick={() => toggleSort('medicineName')}
                  className="p-4 font-semibold cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    Medicine <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-4 font-semibold">Batch ID</th>
                <th className="p-4 font-semibold">Facility</th>
                <th 
                  onClick={() => toggleSort('quantity')}
                  className="p-4 font-semibold cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    Quantity <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-4 font-semibold">Mfg Date</th>
                <th className="p-4 font-semibold">Expiry Date</th>
                <th 
                  onClick={() => toggleSort('daysRemaining')}
                  className="p-4 font-semibold cursor-pointer hover:text-slate-900"
                >
                  <div className="flex items-center gap-1">
                    Days Left <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="p-4 font-semibold">Daily Usage</th>
                <th className="p-4 font-semibold">Expiry Risk</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInventory.map(item => {
                const getStatusBadge = (status) => {
                  switch (status) {
                    case 'Near Expiry':
                      return 'bg-amber-100 text-amber-800 border-amber-200';
                    case 'Critical Shortage':
                      return 'bg-rose-100 text-rose-800 border-rose-200';
                    case 'Surplus':
                      return 'bg-purple-100 text-purple-800 border-purple-200';
                    default:
                      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
                  }
                };

                return (
                  <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-slate-900">
                      <div>
                        <span>{item.medicineName}</span>
                        <span className="block text-[10px] text-slate-400 font-normal">{item.category}</span>
                      </div>
                    </td>
                    <td className="p-4 font-mono text-slate-700 font-semibold">{item.batchId}</td>
                    <td className="p-4 font-medium text-slate-700">{item.facilityName}</td>
                    <td className="p-4 font-black text-slate-900 text-sm">{item.quantity}</td>
                    <td className="p-4 text-slate-500">{item.mfgDate}</td>
                    <td className="p-4 text-slate-600 font-medium">{item.expiryDate}</td>
                    <td className="p-4 font-bold text-amber-700">{item.daysRemaining} days</td>
                    <td className="p-4 text-slate-600">{item.dailyConsumption} / day</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              item.expiryRiskScore > 75 ? 'bg-rose-500' : item.expiryRiskScore > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} 
                            style={{ width: `${item.expiryRiskScore}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-[11px] text-slate-700">{item.expiryRiskScore}/100</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(item.status)}`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInventory.length === 0 && (
          <div className="text-center py-12">
            <Boxes className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-900">No Inventory Records Found</h3>
            <p className="text-xs text-slate-500 mt-1">Try clearing filters or adding a new batch.</p>
          </div>
        )}
      </div>

      {/* Add Inventory Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="+ Add Inventory Batch (Deterministic AI Risk Calculation)"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Medicine Select */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Medicine</label>
              <select
                value={formData.medicineId}
                onChange={(e) => handleMedicineChange(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                {medicines.map(m => (
                  <option key={m.id} value={m.id}>{m.name} ({m.category})</option>
                ))}
              </select>
            </div>

            {/* Batch ID */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Identifier</label>
              <input
                type="text"
                required
                placeholder="e.g. MED-ACE-2505-001"
                value={formData.batchId}
                onChange={(e) => setFormData(prev => ({ ...prev, batchId: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Facility */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Facility Storehouse</label>
              <select
                value={formData.facilityId}
                onChange={(e) => setFormData(prev => ({ ...prev, facilityId: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              >
                {facilities.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Available Quantity (Units)</label>
              <input
                type="number"
                min="1"
                required
                value={formData.quantity}
                onChange={(e) => setFormData(prev => ({ ...prev, quantity: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Mfg Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Mfg Date</label>
              <input
                type="date"
                required
                value={formData.mfgDate}
                onChange={(e) => setFormData(prev => ({ ...prev, mfgDate: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Expiry Date</label>
              <input
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) => setFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Daily Consumption */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Daily Usage (Units/Day)</label>
              <input
                type="number"
                min="1"
                required
                value={formData.dailyConsumption}
                onChange={(e) => setFormData(prev => ({ ...prev, dailyConsumption: e.target.value }))}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* AI Score Info Notice */}
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-200 text-xs text-purple-900">
            <span className="font-bold">AI Decision Engine — Prototype:</span> Expiry Risk Score and Shortage Risk Score will be automatically computed upon registration based on remaining shelf life and consumption rates.
          </div>

          <div className="pt-4 border-t border-slate-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
            >
              Register Inventory Batch
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
