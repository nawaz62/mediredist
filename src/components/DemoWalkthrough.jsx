import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  Play,
  CheckCircle2,
  AlertTriangle,
  ArrowRightLeft,
  QrCode,
  BarChart2,
  Zap,
  Building2,
  ShieldCheck
} from 'lucide-react';

export const DemoWalkthrough = () => {
  const { 
    demoStep, 
    nextDemoStep, 
    prevDemoStep, 
    exitDemo, 
    createTransferRequest,
    approveTransfer,
    dispatchTransfer,
    confirmDelivery,
    completeTransfer,
    transfers,
    triggerToast
  } = useApp();

  const navigate = useNavigate();

  if (demoStep === null) return null;

  const demoSteps = [
    {
      step: 1,
      title: "Surplus & High Expiry Detection (Hospital A)",
      description: "City Hospital A registered Batch MED-ACE-2505-001 (Aceclofenac 100mg) with 250 units and 30 days remaining to expiry. Daily consumption is low (2 units/day).",
      tag: "SURPLUS + HIGH EXPIRY RISK (87/100)",
      actionLabel: "View Hospital A Inventory",
      route: "/inventory",
      execute: () => navigate("/inventory")
    },
    {
      step: 2,
      title: "Shortage Risk Prediction (Hospital B)",
      description: "City Hospital B has only 60 units of Aceclofenac 100mg left with high consumption (18 units/day). System predicts severe stockout in 3 days.",
      tag: "CRITICAL SHORTAGE (92/100)",
      actionLabel: "View Critical Shortage Alert",
      route: "/alerts",
      execute: () => navigate("/alerts")
    },
    {
      step: 3,
      title: "AI Smart Matching Engine Calculation",
      description: "AI Decision Engine analyzes all 10 facilities and evaluates: Same medicine + Expiry proximity + Shortage urgency + Distance. Recommends City Hospital A → City Hospital B (94% Match Score).",
      tag: "AI MATCH SCORE: 94%",
      actionLabel: "Open Smart Matching Engine",
      route: "/smart-matching",
      execute: () => navigate("/smart-matching")
    },
    {
      step: 4,
      title: "Central Admin Approval Workflow",
      description: "Central Admin reviews the 120 units Aceclofenac transfer request. Verified safety rules: batch not expired, source has sufficient stock, match score 94%.",
      tag: "TRANSFER APPROVAL",
      actionLabel: "Go to Transfer Center & Approve",
      route: "/transfers",
      execute: () => {
        navigate("/transfers");
        // Find pending or create demo transfer
        const pending = transfers.find(t => t.status === 'REQUESTED');
        if (pending) approveTransfer(pending.id);
        else {
          const newTrf = createTransferRequest({
            medicineId: "MED-001",
            medicineName: "Aceclofenac 100mg",
            batchId: "MED-ACE-2505-001",
            sourceFacilityId: "FAC-001",
            sourceFacilityName: "City Hospital A",
            destFacilityId: "FAC-002",
            destFacilityName: "City Hospital B",
            quantity: 120,
            matchScore: 94
          });
          approveTransfer(newTrf.id);
        }
      }
    },
    {
      step: 5,
      title: "Dispatch & Source Inventory Reduction",
      description: "Source facility dispatches 120 units. System automatically reduces City Hospital A stock from 250 → 130 units in real-time database.",
      tag: "STATUS: DISPATCHED",
      actionLabel: "Dispatch Shipment",
      route: "/transfers",
      execute: () => {
        const approved = transfers.find(t => t.status === 'APPROVED') || transfers[0];
        if (approved) dispatchTransfer(approved.id);
        navigate("/transfers");
      }
    },
    {
      step: 6,
      title: "QR / Barcode Traceability Verification",
      description: "Unique encrypted QR payload (TRF-2026-0042) generated for shipment. Logistics driver and destination hospital scan batch for verification.",
      tag: "QR TRACKING",
      actionLabel: "Open QR Scanner",
      route: "/qr-scanner",
      execute: () => navigate("/qr-scanner")
    },
    {
      step: 7,
      title: "Destination Delivery Confirmation",
      description: "City Hospital B receives package and scans QR. Admin clicks 'Confirm Delivery'. Destination stock automatically increases by +120 units.",
      tag: "CONFIRM DELIVERY",
      actionLabel: "Confirm Delivery & Update Stock",
      route: "/transfers",
      execute: () => {
        const inTransit = transfers.find(t => t.status === 'DISPATCHED' || t.status === 'IN TRANSIT') || transfers[0];
        if (inTransit) confirmDelivery(inTransit.id);
        navigate("/transfers");
      }
    },
    {
      step: 8,
      title: "Real-Time Inventory Auto-Synchronization",
      description: "Both facilities' stock levels, risk indicators, and dashboard KPIs reflect the updated inventory without manual data entry.",
      tag: "REAL-TIME SYNC",
      actionLabel: "Verify Updated Inventory Table",
      route: "/inventory",
      execute: () => navigate("/inventory")
    },
    {
      step: 9,
      title: "Impact Measurement & SIH Summary",
      description: "MEDIREDIST recalculates total impact: 120 units saved from expiry, ₹540 wastage prevented, 1 stockout avoided! Demo complete 🎉",
      tag: "IMPACT CALCULATED",
      actionLabel: "View Impact Analytics",
      route: "/impact",
      execute: () => {
        const del = transfers.find(t => t.status === 'DELIVERED') || transfers[0];
        if (del) completeTransfer(del.id);
        navigate("/impact");
      }
    }
  ];

  const current = demoSteps[demoStep];

  return (
    <div className="sticky top-16 z-40 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white border-b-2 border-purple-500 shadow-2xl p-4 animate-in slide-in-from-top-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Left Step Title & Story */}
        <div className="flex items-start gap-3 flex-1">
          <div className="w-10 h-10 rounded-xl bg-purple-600/30 border border-purple-400/50 flex items-center justify-center shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 text-purple-300 animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-extrabold uppercase tracking-wider bg-purple-500/30 text-purple-300 px-2 py-0.5 rounded border border-purple-500/40">
                Step {current.step} of 9
              </span>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                {current.tag}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white mt-1 leading-tight">
              {current.title}
            </h3>
            <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
              {current.description}
            </p>
          </div>
        </div>

        {/* Action & Navigation Controls */}
        <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
          <button
            onClick={current.execute}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white text-xs font-bold rounded-lg shadow-md transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5 fill-white" />
            <span>{current.actionLabel}</span>
          </button>

          <div className="flex items-center bg-slate-800/80 rounded-lg border border-slate-700 p-1">
            <button
              onClick={prevDemoStep}
              disabled={demoStep === 0}
              className="p-1 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300"
              title="Previous Step"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-mono text-slate-400 px-2">
              {demoStep + 1}/9
            </span>
            <button
              onClick={nextDemoStep}
              disabled={demoStep === 8}
              className="p-1 text-slate-300 hover:text-white disabled:opacity-30 disabled:hover:text-slate-300"
              title="Next Step"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <button
            onClick={exitDemo}
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 rounded-lg transition-colors"
            title="Exit Demo Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
