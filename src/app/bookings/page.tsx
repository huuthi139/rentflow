"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";

const bookingsData = [
  { id: "BK-001", client: "Michael Brown", property: "Oakwood Apt 4B", agent: "Sarah Lee", dateTime: "Mar 15, 2026 10:00 AM", notes: "First viewing", status: "Scheduled" },
  { id: "BK-002", client: "Jennifer Wilson", property: "Maple Villa", agent: "Tom Chen", dateTime: "Mar 15, 2026 2:00 PM", notes: "Second visit", status: "Scheduled" },
  { id: "BK-003", client: "Alex Martinez", property: "Pine Studio", agent: "Sarah Lee", dateTime: "Mar 14, 2026 11:00 AM", notes: "Budget option", status: "Completed" },
  { id: "BK-004", client: "Lisa Chang", property: "Cedar Suite", agent: "Tom Chen", dateTime: "Mar 14, 2026 3:00 PM", notes: "", status: "Cancelled" },
  { id: "BK-005", client: "David Park", property: "Urban Loft", agent: "Sarah Lee", dateTime: "Mar 13, 2026 10:30 AM", notes: "Premium client", status: "Completed" },
  { id: "BK-006", client: "Emma Taylor", property: "Penthouse A", agent: "Tom Chen", dateTime: "Mar 13, 2026 4:00 PM", notes: "VIP", status: "No Show" },
];

const tabs = ["All", "Scheduled", "Completed", "Cancelled"];
const statusVariantMap: Record<string, "info" | "success" | "neutral" | "danger"> = { Scheduled: "info", Completed: "success", Cancelled: "neutral", "No Show": "danger" };

export default function BookingsPage() {
  const [activeTab, setActiveTab] = useState("All");
  const filtered = bookingsData.filter((b) => activeTab === "All" ? true : b.status === activeTab);
  const todayCount = bookingsData.filter((b) => b.dateTime.startsWith("Mar 15")).length;

  return (
    <>
      <Header title="Bookings" subtitle="Manage property viewing appointments" actions={<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg">add</span>New Booking</button>} />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Today's Bookings" value={todayCount} icon="today" />
          <StatCard label="This Week" value={bookingsData.length} icon="date_range" />
          <StatCard label="Completed" value={bookingsData.filter((b) => b.status === "Completed").length} icon="check_circle" iconColor="text-emerald-600" />
          <StatCard label="No Shows" value={bookingsData.filter((b) => b.status === "No Show").length} icon="person_off" iconColor="text-red-500" />
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>{tab}</button>))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <table className="w-full"><thead><tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"><th className="text-left py-4 px-6 font-semibold">ID</th><th className="text-left py-4 px-6 font-semibold">Client</th><th className="text-left py-4 px-6 font-semibold">Property</th><th className="text-left py-4 px-6 font-semibold">Agent</th><th className="text-left py-4 px-6 font-semibold">Date & Time</th><th className="text-left py-4 px-6 font-semibold">Status</th><th className="text-left py-4 px-6 font-semibold">Actions</th></tr></thead>
          <tbody>{filtered.map((b) => (
            <tr key={b.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
              <td className="py-4 px-6 text-sm font-semibold text-primary">{b.id}</td>
              <td className="py-4 px-6"><p className="text-sm font-medium">{b.client}</p>{b.notes && <p className="text-xs text-slate-400 mt-0.5">{b.notes}</p>}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{b.property}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{b.agent}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{b.dateTime}</td>
              <td className="py-4 px-6"><StatusBadge label={b.status} variant={statusVariantMap[b.status] || "neutral"} dot /></td>
              <td className="py-4 px-6"><div className="flex items-center gap-1"><button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">visibility</span></button><button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button><button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button></div></td>
            </tr>
          ))}</tbody></table>
        </div>
      </div>
    </>
  );
}
