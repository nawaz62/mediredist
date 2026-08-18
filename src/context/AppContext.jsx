import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  INITIAL_FACILITIES, 
  INITIAL_MEDICINES, 
  INITIAL_INVENTORY, 
  INITIAL_TRANSFERS, 
  INITIAL_ALERTS, 
  INITIAL_AUDIT_LOGS, 
  DEMO_USERS 
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Load initial state from localStorage or mock defaults
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('mediredist_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [facilities, setFacilities] = useState(() => {
    const saved = localStorage.getItem('mediredist_facilities');
    return saved ? JSON.parse(saved) : INITIAL_FACILITIES;
  });

  const [medicines, setMedicines] = useState(() => {
    const saved = localStorage.getItem('mediredist_medicines');
    return saved ? JSON.parse(saved) : INITIAL_MEDICINES;
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('mediredist_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [transfers, setTransfers] = useState(() => {
    const saved = localStorage.getItem('mediredist_transfers');
    return saved ? JSON.parse(saved) : INITIAL_TRANSFERS;
  });

  const [alerts, setAlerts] = useState(() => {
    const saved = localStorage.getItem('mediredist_alerts');
    return saved ? JSON.parse(saved) : INITIAL_ALERTS;
  });

  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('mediredist_audit');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [toasts, setToasts] = useState([]);
  const [demoStep, setDemoStep] = useState(null); // null means demo inactive, 0..8 step index

  // Impact Statistics counter (dynamic recalculation + baseline)
  const [impactStats, setImpactStats] = useState({
    medicinesSaved: 1250,
    wastagePrevented: 745000,
    stockoutsPrevented: 87,
    avgTransferHours: 18,
  });

  // Sync to local storage
  useEffect(() => {
    if (user) localStorage.setItem('mediredist_user', JSON.stringify(user));
    else localStorage.removeItem('mediredist_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('mediredist_inventory', JSON.stringify(inventory));
  }, [inventory]);

  useEffect(() => {
    localStorage.setItem('mediredist_transfers', JSON.stringify(transfers));
  }, [transfers]);

  useEffect(() => {
    localStorage.setItem('mediredist_alerts', JSON.stringify(alerts));
  }, [alerts]);

  useEffect(() => {
    localStorage.setItem('mediredist_audit', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Toast Notification Trigger
  const triggerToast = (type, title, message) => {
    const id = Date.now() + Math.random();
    const newToast = { id, type, title, message };
    setToasts(prev => [newToast, ...prev].slice(0, 5));
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 5000);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Add Audit Log Entry
  const addAuditLog = (action, entity, status, details) => {
    const newLog = {
      id: `LOG-${Date.now().toString().slice(-4)}`,
      timestamp: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'medium' }),
      user: user ? `${user.name} (${user.role})` : 'System Auto Engine',
      action,
      entity,
      status,
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Authentication Logic
  const login = (email, password, role) => {
    const matchedUser = DEMO_USERS.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (matchedUser) {
      // Override role if specified in selector
      const activeUser = { ...matchedUser, role: role || matchedUser.role };
      setUser(activeUser);
      triggerToast('success', 'Authentication Successful', `Welcome back, ${activeUser.name}!`);
      addAuditLog('USER_LOGIN', `User ${activeUser.email}`, 'SUCCESS', `Logged in as ${activeUser.role}`);
      return { success: true, user: activeUser };
    } else {
      triggerToast('error', 'Login Failed', 'Invalid credentials. Use demo accounts provided on screen.');
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const demoLogin = (roleType = 'Central Admin') => {
    const targetUser = DEMO_USERS.find(u => u.role === roleType) || DEMO_USERS[0];
    setUser(targetUser);
    triggerToast('info', 'Demo Login Activated', `Signed in as ${targetUser.name} (${targetUser.role})`);
    addAuditLog('DEMO_LOGIN', `Demo User ${targetUser.email}`, 'SUCCESS', `Bypassed auth for SIH Demo as ${targetUser.role}`);
  };

  const logout = () => {
    addAuditLog('USER_LOGOUT', user ? user.email : 'User', 'SUCCESS', 'User logged out');
    setUser(null);
    triggerToast('info', 'Logged Out', 'You have been safely signed out.');
  };

  // Inventory Management CRUD
  const addInventoryItem = (itemData) => {
    // Determine days remaining
    const expDate = new Date(itemData.expiryDate);
    const today = new Date();
    const diffTime = expDate - today;
    const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    // Deterministic Risk Engine Calculations
    const dailyCons = parseInt(itemData.dailyConsumption) || 5;
    const qty = parseInt(itemData.quantity) || 100;

    let expiryRiskScore = 10;
    if (daysRemaining <= 30) expiryRiskScore = 90;
    else if (daysRemaining <= 60) expiryRiskScore = 75;
    else if (daysRemaining <= 90) expiryRiskScore = 50;

    let shortageRiskScore = 10;
    const daysOfSupply = qty / (dailyCons || 1);
    if (daysOfSupply <= 3) shortageRiskScore = 95;
    else if (daysOfSupply <= 7) shortageRiskScore = 80;
    else if (daysOfSupply <= 14) shortageRiskScore = 50;

    let status = 'Optimal';
    let surplusOrShortage = 'Balanced';
    if (daysRemaining <= 45 && qty > dailyCons * 15) {
      status = 'Near Expiry';
      surplusOrShortage = 'Surplus';
    } else if (daysOfSupply <= 4) {
      status = 'Critical Shortage';
      surplusOrShortage = 'Shortage';
    } else if (qty > dailyCons * 40) {
      status = 'Surplus';
      surplusOrShortage = 'Surplus';
    }

    const facilityObj = facilities.find(f => f.id === itemData.facilityId) || facilities[0];

    const newItem = {
      id: `INV-${Date.now().toString().slice(-4)}`,
      medicineId: itemData.medicineId,
      medicineName: itemData.medicineName,
      category: itemData.category || 'General',
      batchId: itemData.batchId,
      facilityId: itemData.facilityId,
      facilityName: facilityObj.name,
      quantity: qty,
      mfgDate: itemData.mfgDate,
      expiryDate: itemData.expiryDate,
      daysRemaining,
      dailyConsumption: dailyCons,
      expiryRiskScore,
      shortageRiskScore,
      status,
      surplusOrShortage
    };

    setInventory(prev => [newItem, ...prev]);
    triggerToast('success', 'Inventory Registered', `${newItem.medicineName} (Batch ${newItem.batchId}) added to ${newItem.facilityName}`);
    addAuditLog('INVENTORY_ADD', `${newItem.medicineName} (${newItem.batchId})`, 'SUCCESS', `Quantity: ${qty}, Expiry Risk: ${expiryRiskScore}`);

    // Generate automatic alert if high risk
    if (expiryRiskScore > 75) {
      const newAlert = {
        id: `ALT-${Date.now().toString().slice(-4)}`,
        type: 'Expiry Risk',
        category: 'HIGH',
        medicineName: newItem.medicineName,
        facilityName: newItem.facilityName,
        facilityId: newItem.facilityId,
        details: `Batch ${newItem.batchId} expires in ${daysRemaining} days with ${qty} unused units.`,
        quantity: qty,
        timestamp: 'Just now',
        actionType: 'FIND_MATCH'
      };
      setAlerts(prev => [newAlert, ...prev]);
    }

    return newItem;
  };

  const updateInventoryQuantity = (inventoryId, newQty) => {
    setInventory(prev => prev.map(inv => {
      if (inv.id === inventoryId) {
        return { ...inv, quantity: newQty };
      }
      return inv;
    }));
  };

  // Add standard medicine master item
  const addMedicineMaster = (medData) => {
    const newMed = {
      id: `MED-${(medicines.length + 1).toString().padStart(3, '0')}`,
      ...medData
    };
    setMedicines(prev => [...prev, newMed]);
    triggerToast('success', 'Medicine Created', `${newMed.name} added to catalog.`);
    addAuditLog('MEDICINE_CREATE', newMed.name, 'SUCCESS', `Generic: ${newMed.genericName}`);
    return newMed;
  };

  // Deterministic AI Smart Matching Algorithm Engine
  const calculateAiMatches = () => {
    const matches = [];

    // Group inventory into surplus/near-expiry candidates (sources) and shortage/high-demand candidates (destinations)
    const sources = inventory.filter(i => 
      (i.surplusOrShortage === 'Surplus' || i.status === 'Near Expiry' || i.daysRemaining <= 60) && i.quantity > 10
    );

    const destinations = inventory.filter(i => 
      (i.surplusOrShortage === 'Shortage' || i.status === 'Critical Shortage' || i.status === 'Low Stock' || i.dailyConsumption >= 10)
    );

    sources.forEach(source => {
      destinations.forEach(dest => {
        // Must be same medicine & different facilities
        if (source.medicineId === dest.medicineId && source.facilityId !== dest.facilityId) {
          
          // Safety Rule: Do not transfer if source is already expired
          if (source.daysRemaining <= 0) return;

          // Quantity calculation: bounded by destination requirement or source availability
          const requiredQty = Math.min(source.quantity, Math.max(50, dest.dailyConsumption * 10 - dest.quantity));
          if (requiredQty <= 0) return;

          // Score Formula components (0-100 normalized)
          const medicineMatchScore = 100; // Exact match
          const quantityScore = Math.min(100, Math.round((requiredQty / source.quantity) * 100));
          const expiryUrgencyScore = source.daysRemaining <= 30 ? 95 : source.daysRemaining <= 60 ? 80 : 50;
          const shortageUrgencyScore = dest.shortageRiskScore || 80;
          const distanceScore = 90; // Local inter-hospital network bonus

          // Weighted final score
          const rawScore = (
            medicineMatchScore * 0.20 +
            quantityScore * 0.20 +
            expiryUrgencyScore * 0.25 +
            shortageUrgencyScore * 0.25 +
            distanceScore * 0.10
          );

          const finalScore = Math.min(99, Math.round(rawScore));

          let priority = 'MEDIUM';
          if (finalScore >= 88 || source.daysRemaining <= 35 || dest.status === 'Critical Shortage') {
            priority = 'HIGH';
          } else if (finalScore < 70) {
            priority = 'LOW';
          }

          matches.push({
            id: `MATCH-${source.id}-${dest.id}`,
            sourceFacilityId: source.facilityId,
            sourceFacilityName: source.facilityName,
            destFacilityId: dest.facilityId,
            destFacilityName: dest.facilityName,
            medicineId: source.medicineId,
            medicineName: source.medicineName,
            batchId: source.batchId,
            availableQty: source.quantity,
            requiredQty: Math.min(source.quantity, requiredQty > 0 ? requiredQty : 120),
            matchScore: finalScore,
            priority,
            expiryDays: source.daysRemaining,
            expiryRiskScore: source.expiryRiskScore,
            shortageRiskScore: dest.shortageRiskScore,
            reasons: [
              "✓ Same medicine classification",
              `✓ Source batch nearing expiry (${source.daysRemaining} days left)`,
              `✓ Destination has predicted shortage (${dest.shortageRiskScore}% risk)`,
              `✓ Optimally utilizes surplus inventory without over-stocking`,
              "✓ Inter-hospital proximity within 15km zone"
            ]
          });
        }
      });
    });

    // Sort by Match Score descending
    return matches.sort((a, b) => b.matchScore - a.matchScore);
  };

  // Transfer Workflow Engine
  const createTransferRequest = (transferPayload) => {
    const newTransfer = {
      id: `TRF-2026-${(transfers.length + 42).toString().padStart(4, '0')}`,
      medicineId: transferPayload.medicineId,
      medicineName: transferPayload.medicineName,
      batchId: transferPayload.batchId,
      sourceFacilityId: transferPayload.sourceFacilityId,
      sourceFacilityName: transferPayload.sourceFacilityName,
      destFacilityId: transferPayload.destFacilityId,
      destFacilityName: transferPayload.destFacilityName,
      quantity: parseInt(transferPayload.quantity),
      reason: transferPayload.reason || 'AI Smart Match redistribution',
      matchScore: transferPayload.matchScore || 90,
      expiryRisk: transferPayload.expiryRisk || 'High Expiry Risk',
      shortageRisk: transferPayload.shortageRisk || 'Critical Shortage Risk',
      status: 'REQUESTED',
      requestedAt: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' }),
      approvedAt: null,
      dispatchedAt: null,
      deliveredAt: null,
      completedAt: null,
      qrCodeData: `MEDIREDIST-TRF-2026-${(transfers.length + 42).toString().padStart(4, '0')}-${transferPayload.batchId}`
    };

    setTransfers(prev => [newTransfer, ...prev]);
    triggerToast('success', 'Transfer Request Created', `Request ${newTransfer.id} submitted for Admin Approval.`);
    addAuditLog('TRANSFER_REQUEST', newTransfer.id, 'PENDING', `Requested ${newTransfer.quantity} units of ${newTransfer.medicineName} (${newTransfer.sourceFacilityName} → ${newTransfer.destFacilityName})`);

    // Add Central Admin alert
    setAlerts(prev => [{
      id: `ALT-${Date.now().toString().slice(-4)}`,
      type: 'Transfer Update',
      category: 'HIGH',
      medicineName: newTransfer.medicineName,
      facilityName: `${newTransfer.sourceFacilityName} → ${newTransfer.destFacilityName}`,
      facilityId: newTransfer.sourceFacilityId,
      details: `New transfer request ${newTransfer.id} requiring Admin Approval.`,
      quantity: newTransfer.quantity,
      timestamp: 'Just now',
      actionType: 'APPROVE_TRANSFER'
    }, ...prev]);

    return newTransfer;
  };

  const approveTransfer = (transferId) => {
    const updated = transfers.map(t => {
      if (t.id === transferId) {
        return {
          ...t,
          status: 'APPROVED',
          approvedAt: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
        };
      }
      return t;
    });

    setTransfers(updated);
    const trf = updated.find(t => t.id === transferId);
    triggerToast('success', 'Transfer Approved', `Transfer ${transferId} has been authorized by Central Admin.`);
    addAuditLog('TRANSFER_APPROVE', transferId, 'SUCCESS', `Approved movement of ${trf?.quantity} units of ${trf?.medicineName}`);
  };

  const rejectTransfer = (transferId, rejectionReason) => {
    const updated = transfers.map(t => {
      if (t.id === transferId) {
        return {
          ...t,
          status: 'CANCELLED',
          rejectionReason: rejectionReason || 'Administrative decision'
        };
      }
      return t;
    });

    setTransfers(updated);
    triggerToast('warning', 'Transfer Rejected', `Transfer ${transferId} was cancelled.`);
    addAuditLog('TRANSFER_REJECT', transferId, 'CANCELLED', `Reason: ${rejectionReason}`);
  };

  const dispatchTransfer = (transferId) => {
    let targetTrf = null;

    setTransfers(prev => prev.map(t => {
      if (t.id === transferId) {
        targetTrf = {
          ...t,
          status: 'DISPATCHED',
          dispatchedAt: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
        };
        return targetTrf;
      }
      return t;
    }));

    if (targetTrf) {
      // Automatically reduce source inventory quantity
      setInventory(prev => prev.map(inv => {
        if (inv.facilityId === targetTrf.sourceFacilityId && inv.batchId === targetTrf.batchId) {
          const newQty = Math.max(0, inv.quantity - targetTrf.quantity);
          return {
            ...inv,
            quantity: newQty,
            status: newQty < 20 ? 'Low Stock' : inv.status
          };
        }
        return inv;
      }));

      triggerToast('info', 'Shipment Dispatched', `Medicine ${targetTrf.medicineName} (${targetTrf.quantity} units) is now in transit.`);
      addAuditLog('TRANSFER_DISPATCH', transferId, 'IN_TRANSIT', `Source stock reduced by ${targetTrf.quantity} units.`);
    }
  };

  const confirmDelivery = (transferId) => {
    let targetTrf = null;

    setTransfers(prev => prev.map(t => {
      if (t.id === transferId) {
        targetTrf = {
          ...t,
          status: 'DELIVERED',
          deliveredAt: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
        };
        return targetTrf;
      }
      return t;
    }));

    if (targetTrf) {
      // Automatically increase destination inventory quantity or create new inventory record
      setInventory(prev => {
        const destInv = prev.find(i => i.facilityId === targetTrf.destFacilityId && i.medicineId === targetTrf.medicineId);
        if (destInv) {
          return prev.map(inv => {
            if (inv.id === destInv.id) {
              return {
                ...inv,
                quantity: inv.quantity + targetTrf.quantity,
                status: 'Optimal',
                surplusOrShortage: 'Balanced'
              };
            }
            return inv;
          });
        } else {
          // Create new record for destination
          const newDestInv = {
            id: `INV-${Date.now().toString().slice(-4)}`,
            medicineId: targetTrf.medicineId,
            medicineName: targetTrf.medicineName,
            category: 'Redistributed Stock',
            batchId: targetTrf.batchId,
            facilityId: targetTrf.destFacilityId,
            facilityName: targetTrf.destFacilityName,
            quantity: targetTrf.quantity,
            mfgDate: '2025-05-10',
            expiryDate: '2026-04-18',
            daysRemaining: 30,
            dailyConsumption: 18,
            expiryRiskScore: 40,
            shortageRiskScore: 10,
            status: 'Optimal',
            surplusOrShortage: 'Balanced'
          };
          return [newDestInv, ...prev];
        }
      });

      // Update Impact stats dynamically
      setImpactStats(prev => ({
        ...prev,
        medicinesSaved: prev.medicinesSaved + targetTrf.quantity,
        wastagePrevented: prev.wastagePrevented + (targetTrf.quantity * 4.5),
        stockoutsPrevented: prev.stockoutsPrevented + 1
      }));

      triggerToast('success', 'Delivery Confirmed!', `Inventory updated at ${targetTrf.destFacilityName}.`);
      addAuditLog('TRANSFER_DELIVERY', transferId, 'DELIVERED', `Destination stock increased by ${targetTrf.quantity} units.`);
    }
  };

  const completeTransfer = (transferId) => {
    setTransfers(prev => prev.map(t => {
      if (t.id === transferId) {
        return {
          ...t,
          status: 'COMPLETED',
          completedAt: new Date().toLocaleString('en-US', { dateStyle: 'short', timeStyle: 'short' })
        };
      }
      return t;
    }));

    // Trigger celebration confetti for demo impact!
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    triggerToast('success', 'Transfer Completed 🎉', `Transfer ${transferId} fully closed and impact recorded.`);
    addAuditLog('TRANSFER_COMPLETE', transferId, 'COMPLETED', 'Entire redistribution lifecycle verified.');
  };

  // Demo Walkthrough Controls
  const startDemo = () => {
    // Reset to demo baseline data state for a smooth walkthrough
    setDemoStep(0);
    triggerToast('info', '🎬 SIH 2026 Demo Mode Started', 'Guiding you through the 9-step MEDIREDIST redistribution workflow.');
  };

  const nextDemoStep = () => {
    setDemoStep(prev => (prev === null ? 0 : Math.min(8, prev + 1)));
  };

  const prevDemoStep = () => {
    setDemoStep(prev => (prev === null ? 0 : Math.max(0, prev - 1)));
  };

  const exitDemo = () => {
    setDemoStep(null);
    triggerToast('info', 'Demo Mode Closed', 'Resumed standard dashboard operation.');
  };

  return (
    <AppContext.Provider value={{
      user,
      facilities,
      medicines,
      inventory,
      transfers,
      alerts,
      auditLogs,
      toasts,
      demoStep,
      impactStats,
      login,
      demoLogin,
      logout,
      addInventoryItem,
      updateInventoryQuantity,
      addMedicineMaster,
      calculateAiMatches,
      createTransferRequest,
      approveTransfer,
      rejectTransfer,
      dispatchTransfer,
      confirmDelivery,
      completeTransfer,
      triggerToast,
      removeToast,
      startDemo,
      nextDemoStep,
      prevDemoStep,
      exitDemo
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
