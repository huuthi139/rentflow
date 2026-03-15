"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import HandoverForm from "@/components/crud/HandoverForm";
import { useToast } from "@/components/ui/Toast";
import { exportToCSV } from "@/lib/export";
import type { HandoverReport } from "@/lib/types";

const tabs = ["All", "Check-in", "Check-out"];

const initialData: HandoverReport[] = [
  {
    id: "HO-001",
    property: "Skyline Tower A, 402",
    tenant: "Sarah Jenkins",
    type: "Check-in",
    date: "Oct 12, 2023",
    agent: "Mike Chen",
    condition: "Excellent",
    notes: "Property in perfect condition. All appliances working.",
    photos: ["photo1.jpg", "photo2.jpg", "photo3.jpg"],
    issues: [],
    meterReadings: { electric: 15230, water: 342 },
    depositDeductions: 0,
    signedByTenant: true,
    signedByAgent: true,
  },
  {
    id: "HO-002",
    property: "Green Valley, Villa 12",
    tenant: "Marcus Peterson",
    type: "Check-out",
    date: "Oct 10, 2023",
    agent: "Lisa Park",
    condition: "Fair",
    notes: "Minor wear and tear noted. Cleaning required.",
    photos: ["photo4.jpg", "photo5.jpg"],
    issues: ["Scratched hardwood floor in living room", "Stained carpet in bedroom", "Missing curtain rod in kitchen"],
    meterReadings: { electric: 28450, water: 567 },
    depositDeductions: 350,
    signedByTenant: true,
    signedByAgent: true,
  },
  {
    id: "HO-003",
    property: "Downtown Plaza, 8A",
    tenant: "James Rodriguez",
    type: "Check-in",
    date: "Oct 08, 2023",
    agent: "Tom Rivera",
    condition: "Good",
    notes: "One minor issue with bathroom door handle. Scheduled for repair.",
    photos: ["photo6.jpg", "photo7.jpg", "photo8.jpg", "photo9.jpg"],
    issues: ["Loose bathroom door handle"],
    meterReadings: { electric: 5120, water: 128 },
    depositDeductions: 0,
    signedByTenant: true,
    signedByAgent: true,
  },
  {
    id: "HO-004",
    property: "The Meadows, Unit 7",
    tenant: "Anna Kowalski",
    type: "Check-out",
    date: "Oct 05, 2023",
    agent: "Mike Chen",
    condition: "Fair",
    notes: "Multiple issues found during inspection. Deposit deductions applied.",
    photos: ["photo10.jpg", "photo11.jpg"],
    issues: ["Broken kitchen cabinet hinge", "Wall damage in hallway"],
    meterReadings: { electric: 31200, water: 645 },
    depositDeductions: 500,
    signedByTenant: false,
    signedByAgent: true,
  },
  {
    id: "HO-005",
    property: "Landmark Tower, 1205",
    tenant: "Emily Chen",
    type: "Check-in",
    date: "Oct 01, 2023",
    agent: "Lisa Park",
    condition: "Excellent",
    notes: "Newly renovated unit. All items in excellent condition.",
    photos: ["photo12.jpg", "photo13.jpg", "photo14.jpg", "photo15.jpg", "photo16.jpg"],
    issues: [],
    meterReadings: { electric: 0, water: 0 },
    depositDeductions: 0,
    signedByTenant: true,
    signedByAgent: true,
  },
  {
    id: "HO-006",
    property: "Ocean Breeze, Suite 2",
    tenant: "David Thompson",
    type: "Check-out",
    date: "Sep 28, 2023",
    agent: "Tom Rivera",
    condition: "Poor",
    notes: "Significant damage found. Full assessment required.",
    photos: ["photo17.jpg", "photo18.jpg", "photo19.jpg", "photo20.jpg", "photo21.jpg", "photo22.jpg"],
    issues: ["Broken window in bedroom", "Water damage under kitchen sink", "Damaged bathroom tiles", "Missing light fixtures"],
    meterReadings: { electric: 42100, water: 890 },
    depositDeductions: 1200,
    signedByTenant: false,
    signedByAgent: true,
  },
];

export default function HandoversPage() {
  const [handovers, setHandovers] = useState<HandoverReport[]>(initialData);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("All");
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'delete'; report?: HandoverReport } | null>(null);

  const filtered = handovers.filter((h) => {
    if (activeTab === "All") return true;
    return h.type === activeTab;
  });

  const checkInCount = handovers.filter(h => h.type === "Check-in").length;
  const checkOutCount = handovers.filter(h => h.type === "Check-out").length;
  const totalDeductions = handovers.reduce((s, h) => s + h.depositDeductions, 0);

  const conditionVariant = (condition: HandoverReport['condition']) => {
    switch (condition) {
      case "Excellent": return "success" as const;
      case "Good": return "info" as const;
      case "Fair": return "warning" as const;
      case "Poor": return "danger" as const;
    }
  };

  const addHandover = (data: HandoverReport) => {
    setHandovers(prev => [...prev, data]);
  };

  const updateHandover = (data: HandoverReport) => {
    setHandovers(prev => prev.map(h => h.id === data.id ? data : h));
  };

  const deleteHandover = (id: string) => {
    setHandovers(prev => prev.filter(h => h.id !== id));
  };

  return (
    <>
      <Header title="Handover Reports" subtitle="Property check-in and check-out documentation" actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCSV(handovers.map(h => ({ ID: h.id, Property: h.property, Tenant: h.tenant, Type: h.type, Date: h.date, Agent: h.agent, Condition: h.condition, Issues: h.issues.length, Photos: h.photos.length, 'Deposit Deductions': h.depositDeductions, 'Electric Meter': h.meterReadings.electric, 'Water Meter': h.meterReadings.water, 'Signed by Tenant': h.signedByTenant ? 'Yes' : 'No', 'Signed by Agent': h.signedByAgent ? 'Yes' : 'No', Notes: h.notes })), 'handovers')}
            className="flex items-center gap-2 px-4 py-2 border border-primary/20 dark:border-slate-600 text-primary dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-primary/5 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">download</span>
            Export CSV
          </button>
          <button
            onClick={() => setModal({ mode: 'add' })}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            New Report
          </button>
        </div>
      } />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Total Reports</p><p className="text-2xl font-bold mt-1">{handovers.length}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Check-ins</p><p className="text-2xl font-bold text-blue-600 mt-1">{checkInCount}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Check-outs</p><p className="text-2xl font-bold text-orange-600 mt-1">{checkOutCount}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Total Deductions</p><p className="text-2xl font-bold text-primary mt-1">${totalDeductions.toLocaleString()}</p></div>
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>{tab}</button>))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full"><thead><tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"><th className="text-left py-4 px-6 font-semibold">Report ID</th><th className="text-left py-4 px-6 font-semibold">Property</th><th className="text-left py-4 px-6 font-semibold">Tenant</th><th className="text-left py-4 px-6 font-semibold">Type</th><th className="text-left py-4 px-6 font-semibold">Date</th><th className="text-left py-4 px-6 font-semibold">Agent</th><th className="text-left py-4 px-6 font-semibold">Condition</th><th className="text-left py-4 px-6 font-semibold">Details</th><th className="text-left py-4 px-6 font-semibold">Signatures</th><th className="text-left py-4 px-6 font-semibold">Actions</th></tr></thead>
          <tbody>{filtered.map((h) => (
            <tr key={h.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
              <td className="py-4 px-6 text-sm font-semibold text-primary">{h.id}</td>
              <td className="py-4 px-6 text-sm font-medium">{h.property}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{h.tenant}</td>
              <td className="py-4 px-6"><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${h.type === "Check-in" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"}`}><span className="material-symbols-outlined text-sm">{h.type === "Check-in" ? "login" : "logout"}</span>{h.type}</span></td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{h.date}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{h.agent}</td>
              <td className="py-4 px-6"><StatusBadge label={h.condition} variant={conditionVariant(h.condition)} /></td>
              <td className="py-4 px-6"><div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-sm">photo_camera</span>{h.photos.length}</span><span className={`inline-flex items-center gap-1 ${h.issues.length > 0 ? "text-amber-600" : ""}`}><span className="material-symbols-outlined text-sm">warning</span>{h.issues.length}</span>{h.depositDeductions > 0 && <span className="inline-flex items-center gap-1 text-red-500"><span className="material-symbols-outlined text-sm">payments</span>${h.depositDeductions}</span>}</div></td>
              <td className="py-4 px-6"><div className="flex items-center gap-2"><span className={`material-symbols-outlined text-lg ${h.signedByTenant ? "text-green-500" : "text-slate-300 dark:text-slate-600"}`} title={h.signedByTenant ? "Tenant signed" : "Tenant not signed"}>person_check</span><span className={`material-symbols-outlined text-lg ${h.signedByAgent ? "text-green-500" : "text-slate-300 dark:text-slate-600"}`} title={h.signedByAgent ? "Agent signed" : "Agent not signed"}>verified_user</span></div></td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-1">
                  <button onClick={() => setModal({ mode: 'edit', report: h })} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                  <button onClick={() => setModal({ mode: 'delete', report: h })} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                </div>
              </td>
            </tr>
          ))}</tbody></table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modal?.mode === 'add' || modal?.mode === 'edit'}
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Edit Handover Report' : 'New Handover Report'}
        size="lg"
      >
        <HandoverForm
          report={modal?.report}
          onSubmit={(data) => {
            if (modal?.mode === 'edit') {
              updateHandover(data);
              toast("Report updated successfully", "success");
            } else {
              addHandover(data);
              toast("Report created successfully", "success");
            }
            setModal(null);
          }}
          onCancel={() => setModal(null)}
        />
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={modal?.mode === 'delete'}
        onClose={() => setModal(null)}
        onConfirm={() => { if (modal?.report) { deleteHandover(modal.report.id); toast("Report deleted", "success"); } }}
        title="Delete Handover Report"
        message={`Are you sure you want to delete report "${modal?.report?.id}"? This action cannot be undone.`}
      />
    </>
  );
}
