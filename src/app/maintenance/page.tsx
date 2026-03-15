"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import { maintenanceTickets } from "@/data/mock";

const tabs = ["All Tickets", "Open", "In Progress", "Resolved", "Closed"];

export default function MaintenancePage() {
  const [activeTab, setActiveTab] = useState("All Tickets");
  const filtered = maintenanceTickets.filter((t) => activeTab === "All Tickets" ? true : t.status === activeTab);
  const openCount = maintenanceTickets.filter(t => t.status === "Open").length;
  const inProgressCount = maintenanceTickets.filter(t => t.status === "In Progress").length;
  const totalCost = maintenanceTickets.reduce((s, t) => s + t.cost, 0);

  return (
    <>
      <Header title="Maintenance" subtitle="Manage repair and maintenance tickets" actions={<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg">add</span>New Ticket</button>} />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Open Tickets</p><p className="text-2xl font-bold text-red-600 mt-1">{openCount}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">In Progress</p><p className="text-2xl font-bold text-amber-600 mt-1">{inProgressCount}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Total Tickets</p><p className="text-2xl font-bold mt-1">{maintenanceTickets.length}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Total Cost</p><p className="text-2xl font-bold text-primary mt-1">${totalCost.toLocaleString()}</p></div>
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>{tab}</button>))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <table className="w-full"><thead><tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"><th className="text-left py-4 px-6 font-semibold">ID</th><th className="text-left py-4 px-6 font-semibold">Property</th><th className="text-left py-4 px-6 font-semibold">Type</th><th className="text-left py-4 px-6 font-semibold">Description</th><th className="text-left py-4 px-6 font-semibold">Priority</th><th className="text-left py-4 px-6 font-semibold">Assignee</th><th className="text-left py-4 px-6 font-semibold">Cost</th><th className="text-left py-4 px-6 font-semibold">Status</th></tr></thead>
          <tbody>{filtered.map((ticket) => (
            <tr key={ticket.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
              <td className="py-4 px-6 text-sm font-semibold text-primary">{ticket.id}</td>
              <td className="py-4 px-6 text-sm font-medium">{ticket.property}</td>
              <td className="py-4 px-6"><span className="inline-flex items-center gap-1.5 text-sm"><span className="material-symbols-outlined text-sm text-primary">{ticket.type === "Plumbing" ? "water_drop" : ticket.type === "Electrical" ? "bolt" : ticket.type === "HVAC" ? "ac_unit" : ticket.type === "Lock" ? "lock" : ticket.type === "Internet" ? "wifi" : ticket.type === "Appliance" ? "kitchen" : ticket.type === "Furniture" ? "chair" : "build"}</span>{ticket.type}</span></td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400 max-w-xs truncate">{ticket.description}</td>
              <td className="py-4 px-6"><StatusBadge label={ticket.priority} variant={getStatusVariant(ticket.priority)} /></td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{ticket.assignee}</td>
              <td className="py-4 px-6 text-sm font-bold">${ticket.cost}</td>
              <td className="py-4 px-6"><StatusBadge label={ticket.status} variant={getStatusVariant(ticket.status)} dot /></td>
            </tr>
          ))}</tbody></table>
        </div>
      </div>
    </>
  );
}
