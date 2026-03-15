"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";

const tabs = ["All", "Check-in", "Check-out", "Pending Review"];

const handovers = [
  { id: "HO-001", property: "Skyline Tower A, 402", tenant: "Sarah Jenkins", type: "Check-in", date: "Oct 12, 2023", inspector: "Mike Chen", status: "Completed", photos: 24, issues: 0 },
  { id: "HO-002", property: "Green Valley, Villa 12", tenant: "Marcus Peterson", type: "Check-out", date: "Oct 10, 2023", inspector: "Lisa Park", status: "Pending", photos: 18, issues: 3 },
  { id: "HO-003", property: "Downtown Plaza, 8A", tenant: "James Rodriguez", type: "Check-in", date: "Oct 08, 2023", inspector: "Tom Rivera", status: "Completed", photos: 20, issues: 1 },
  { id: "HO-004", property: "The Meadows, Unit 7", tenant: "Anna Kowalski", type: "Check-out", date: "Oct 05, 2023", inspector: "Mike Chen", status: "In Review", photos: 15, issues: 2 },
  { id: "HO-005", property: "Landmark Tower, 1205", tenant: "Emily Chen", type: "Check-in", date: "Oct 01, 2023", inspector: "Lisa Park", status: "Completed", photos: 22, issues: 0 },
  { id: "HO-006", property: "Ocean Breeze, Suite 2", tenant: "David Thompson", type: "Check-out", date: "Sep 28, 2023", inspector: "Tom Rivera", status: "Completed", photos: 30, issues: 4 },
];

export default function HandoversPage() {
  const [activeTab, setActiveTab] = useState("All");
  const filtered = handovers.filter((h) => {
    if (activeTab === "All") return true;
    if (activeTab === "Pending Review") return h.status === "Pending" || h.status === "In Review";
    return h.type === activeTab;
  });

  return (
    <>
      <Header title="Handover Reports" subtitle="Property check-in and check-out documentation" actions={<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg">add</span>New Report</button>} />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Total Reports</p><p className="text-2xl font-bold mt-1">24</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Pending Review</p><p className="text-2xl font-bold text-amber-600 mt-1">5</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Completed This Month</p><p className="text-2xl font-bold text-primary mt-1">8</p></div>
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>{tab}</button>))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full"><thead><tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"><th className="text-left py-4 px-6 font-semibold">Report ID</th><th className="text-left py-4 px-6 font-semibold">Property</th><th className="text-left py-4 px-6 font-semibold">Tenant</th><th className="text-left py-4 px-6 font-semibold">Type</th><th className="text-left py-4 px-6 font-semibold">Date</th><th className="text-left py-4 px-6 font-semibold">Inspector</th><th className="text-left py-4 px-6 font-semibold">Details</th><th className="text-left py-4 px-6 font-semibold">Status</th><th className="text-left py-4 px-6 font-semibold">Actions</th></tr></thead>
          <tbody>{filtered.map((h) => (
            <tr key={h.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
              <td className="py-4 px-6 text-sm font-semibold text-primary">{h.id}</td>
              <td className="py-4 px-6 text-sm font-medium">{h.property}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{h.tenant}</td>
              <td className="py-4 px-6"><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${h.type === "Check-in" ? "bg-blue-50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" : "bg-orange-50 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"}`}><span className="material-symbols-outlined text-sm">{h.type === "Check-in" ? "login" : "logout"}</span>{h.type}</span></td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{h.date}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{h.inspector}</td>
              <td className="py-4 px-6"><div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400"><span className="inline-flex items-center gap-1"><span className="material-symbols-outlined text-sm">photo_camera</span>{h.photos}</span><span className={`inline-flex items-center gap-1 ${h.issues > 0 ? "text-amber-600" : ""}`}><span className="material-symbols-outlined text-sm">warning</span>{h.issues}</span></div></td>
              <td className="py-4 px-6"><StatusBadge label={h.status} variant={h.status === "Completed" ? "success" : h.status === "Pending" ? "warning" : "info"} dot /></td>
              <td className="py-4 px-6"><div className="flex items-center gap-1"><button className="p-1.5 rounded-lg hover:bg-primary/5 text-slate-400 hover:text-primary transition-colors" title="View"><span className="material-symbols-outlined text-lg">visibility</span></button><button className="p-1.5 rounded-lg hover:bg-primary/5 text-slate-400 hover:text-primary transition-colors" title="Download"><span className="material-symbols-outlined text-lg">download</span></button><button className="p-1.5 rounded-lg hover:bg-primary/5 text-slate-400 hover:text-primary transition-colors" title="Edit"><span className="material-symbols-outlined text-lg">edit</span></button></div></td>
            </tr>
          ))}</tbody></table>
          </div>
        </div>
      </div>
    </>
  );
}
