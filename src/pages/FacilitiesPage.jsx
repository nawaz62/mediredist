import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Building2, Search, Filter, Phone, Mail, MapPin, ArrowRight, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const FacilitiesPage = () => {
  const { facilities } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('ALL');
  const [selectedRisk, setSelectedRisk] = useState('ALL');

  const facilityTypes = ['ALL', ...new Set(facilities.map(f => f.type))];

  const filteredFacilities = facilities.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          f.contactPerson.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'ALL' || f.type === selectedType;
    const matchesRisk = selectedRisk === 'ALL' || f.riskLevel === selectedRisk;
    return matchesSearch && matchesType && matchesRisk;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Connected Healthcare Facilities</h1>
          <p className="text-xs text-slate-500 mt-1">
            Network of 35 hospitals, clinics, and health centers sharing real-time medicine inventory.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 border border-blue-200">
            {facilities.length} Active Nodes
          </span>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search facility name, location, doctor..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 focus:outline-none focus:border-blue-500 shadow-xs"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500 shadow-xs"
          >
            {facilityTypes.map(t => (
              <option key={t} value={t}>{t === 'ALL' ? 'All Facility Types' : t}</option>
            ))}
          </select>

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-700 focus:outline-none focus:border-blue-500 shadow-xs"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="Low">Low Risk</option>
            <option value="Medium">Medium Risk</option>
            <option value="High">High Risk</option>
          </select>
        </div>
      </div>

      {/* Facilities Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFacilities.map(facility => {
          const getRiskBadge = (risk) => {
            switch (risk) {
              case 'High':
                return 'bg-rose-50 text-rose-700 border-rose-200';
              case 'Medium':
                return 'bg-amber-50 text-amber-700 border-amber-200';
              default:
                return 'bg-emerald-50 text-emerald-700 border-emerald-200';
            }
          };

          return (
            <div
              key={facility.id}
              onClick={() => navigate(`/facilities/${facility.id}`)}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100 group-hover:scale-105 transition-transform">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {facility.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 font-medium">{facility.type}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getRiskBadge(facility.riskLevel)}`}>
                    {facility.riskLevel} Risk
                  </span>
                </div>

                {/* Info List */}
                <div className="mt-5 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{facility.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{facility.contactPerson} ({facility.phone})</span>
                  </div>
                </div>

                {/* Stock Stats Bar */}
                <div className="mt-5 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
                  <div className="bg-slate-50 p-2 rounded-xl">
                    <span className="block text-xs font-bold text-slate-900">{facility.totalStock.toLocaleString()}</span>
                    <span className="text-[10px] text-slate-500">Total Stock</span>
                  </div>
                  <div className="bg-purple-50 p-2 rounded-xl">
                    <span className="block text-xs font-bold text-purple-700">{facility.surplusCount}</span>
                    <span className="text-[10px] text-purple-600">Surplus</span>
                  </div>
                  <div className="bg-rose-50 p-2 rounded-xl">
                    <span className="block text-xs font-bold text-rose-700">{facility.shortageCount}</span>
                    <span className="text-[10px] text-rose-600">Shortages</span>
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600 group-hover:underline">
                <span>View Facility Stock & Analytics</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {filteredFacilities.length === 0 && (
        <div className="text-center py-12 bg-white rounded-3xl border border-slate-200 p-8">
          <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-sm font-bold text-slate-900">No Facilities Found</h3>
          <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or risk filter.</p>
        </div>
      )}
    </div>
  );
};
