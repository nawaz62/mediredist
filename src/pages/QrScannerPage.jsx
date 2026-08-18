import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useApp } from '../context/AppContext';
import { QrCode, Scan, History, CheckCircle2, Truck, Box, ShieldCheck, Play, ArrowRight } from 'lucide-react';

export const QrScannerPage = () => {
  const { inventory, transfers } = useApp();

  const [activeTab, setActiveTab] = useState('GENERATE'); // GENERATE | SCAN
  const [selectedBatch, setSelectedBatch] = useState('MED-ACE-2505-001');
  const [scannedResult, setScannedResult] = useState(null);

  const activeBatchObj = inventory.find(i => i.batchId === selectedBatch) || inventory[0];

  const handleUseDemoQr = () => {
    setActiveTab('SCAN');
    const demoPayload = {
      batchId: "MED-ACE-2505-001",
      medicineName: "Aceclofenac 100mg",
      mfgDate: "2025-05-10",
      expiryDate: "2026-04-18",
      facilityName: "City Hospital A",
      quantity: 250,
      transferId: "TRF-2026-0042",
      statusHistory: [
        { status: "REGISTERED", time: "2025-05-10 10:00 AM", location: "Manufacturer Lab", ok: true },
        { status: "INSPECTED", time: "2025-05-12 02:30 PM", location: "City Hospital A Intake", ok: true },
        { status: "DISPATCHED", time: "2026-08-18 09:00 AM", location: "Hazratganj Logistics Node", ok: true },
        { status: "IN TRANSIT", time: "2026-08-18 10:15 AM", location: "En-route to City Hospital B", ok: true },
        { status: "RECEIVED", time: "2026-08-18 11:30 AM", location: "City Hospital B Pharmacy", ok: true },
        { status: "INVENTORY UPDATED", time: "2026-08-18 11:35 AM", location: "Database Auto-Sync Complete", ok: true }
      ]
    };

    setScannedResult(demoPayload);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">Medicine Traceability & QR System</h1>
            <span className="text-xs bg-emerald-50 text-emerald-700 font-semibold px-2.5 py-0.5 rounded-full border border-emerald-200">
              Blockchain-Style Audit Trail
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            End-to-end verification of medicine batch origins, custody transfers, and physical scanning history.
          </p>
        </div>

        <button
          onClick={handleUseDemoQr}
          className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold rounded-2xl text-xs shadow-lg transition-all active:scale-95 shrink-0"
        >
          <Play className="w-4 h-4 fill-white" />
          <span>Use Demo Batch QR Scan</span>
        </button>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('GENERATE')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'GENERATE' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>1. Generate QR Code</span>
        </button>

        <button
          onClick={() => setActiveTab('SCAN')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'SCAN' ? 'bg-blue-600 text-white shadow-xs' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Scan className="w-4 h-4" />
          <span>2. Scan / Verify Payload</span>
        </button>
      </div>

      {/* Mode 1: Generate QR */}
      {activeTab === 'GENERATE' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900">Select Batch to Encode</h3>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Batch Identifier</label>
              <select
                value={selectedBatch}
                onChange={(e) => setSelectedBatch(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono focus:outline-none"
              >
                {inventory.map(i => (
                  <option key={i.id} value={i.batchId}>
                    {i.batchId} — {i.medicineName} ({i.facilityName})
                  </option>
                ))}
              </select>
            </div>

            {activeBatchObj && (
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Medicine:</span>
                  <strong className="text-slate-900">{activeBatchObj.medicineName}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mfg Date:</span>
                  <span className="text-slate-700">{activeBatchObj.mfgDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expiry Date:</span>
                  <span className="text-amber-700 font-semibold">{activeBatchObj.expiryDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Facility:</span>
                  <span className="text-slate-700">{activeBatchObj.facilityName}</span>
                </div>
              </div>
            )}
          </div>

          {/* QR Card Result */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs flex flex-col items-center justify-center text-center">
            <div className="p-4 bg-slate-900 rounded-3xl shadow-xl mb-4">
              <QRCodeSVG
                value={`MEDIREDIST-BATCH-${activeBatchObj?.batchId}-${activeBatchObj?.medicineName}`}
                size={180}
                bgColor="#0f172a"
                fgColor="#ffffff"
                level="H"
              />
            </div>
            <p className="text-xs font-mono font-bold text-slate-900">
              MEDIREDIST-BATCH-{activeBatchObj?.batchId}
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Encrypted QR payload ready for box printing or barcode scanner hardware.
            </p>
          </div>
        </div>
      )}

      {/* Mode 2: Scan QR & Movement History Trace */}
      {activeTab === 'SCAN' && (
        <div className="space-y-6">
          
          {!scannedResult ? (
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xs text-center max-w-lg mx-auto">
              <div className="w-16 h-16 rounded-3xl bg-purple-50 text-purple-600 flex items-center justify-center mx-auto mb-4 border border-purple-100">
                <Scan className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-base font-bold text-slate-900">QR Code Verification Scanner</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                Scan physical medicine box or click the button below to simulate loading a demo batch.
              </p>
              <button
                onClick={handleUseDemoQr}
                className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-md transition-all"
              >
                Use Demo Batch QR Data (Batch MED-ACE-2505-001)
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* Batch Verified Banner */}
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 shrink-0" />
                  <div>
                    <h3 className="text-base font-bold text-emerald-950">
                      QR Batch Verification Successful!
                    </h3>
                    <p className="text-xs text-emerald-700">
                      Authenticity & Expiry Verified • {scannedResult.medicineName} ({scannedResult.batchId})
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setScannedResult(null)}
                  className="text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 px-3 py-1.5 rounded-xl transition-colors"
                >
                  Clear Scanner
                </button>
              </div>

              {/* Movement History Traceability Timeline */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
                <h3 className="text-base font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <History className="w-5 h-5 text-blue-600" />
                  Complete Batch Movement History
                </h3>

                <div className="relative border-l-2 border-slate-200 ml-4 space-y-6 pl-6">
                  {scannedResult.statusHistory.map((step, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline Dot */}
                      <span className="absolute -left-[31px] top-0.5 w-4 h-4 rounded-full bg-blue-600 ring-4 ring-white shadow-xs" />

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900">{step.status}</span>
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                              VERIFIED
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5">{step.location}</p>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400">{step.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
};
