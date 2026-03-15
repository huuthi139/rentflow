"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import { payments } from "@/data/mock";

const tabs = ["All Payments", "Paid", "Pending", "Late"];

export default function PaymentsPage() {
  const [activeTab, setActiveTab] = useState("All Payments");
  const filtered = payments.filter((p) => activeTab === "All Payments" ? true : p.status === activeTab);
  const totalPaid = payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "Pending").reduce((s, p) => s + p.amount, 0);
  const totalLate = payments.filter(p => p.status === "Late").reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <Header title="Payments" subtitle="Track all rent payments" actions={<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg">add</span>Record Payment</button>} />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Total Collected</p><p className="text-2xl font-bold text-emerald-600 mt-1">${totalPaid.toLocaleString()}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Pending</p><p className="text-2xl font-bold text-amber-600 mt-1">${totalPending.toLocaleString()}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Overdue</p><p className="text-2xl font-bold text-red-600 mt-1">${totalLate.toLocaleString()}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Collection Rate</p><p className="text-2xl font-bold text-primary mt-1">78.5%</p></div>
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>{tab}</button>))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <table className="w-full"><thead><tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"><th className="text-left py-4 px-6 font-semibold">ID</th><th className="text-left py-4 px-6 font-semibold">Tenant</th><th className="text-left py-4 px-6 font-semibold">Property</th><th className="text-left py-4 px-6 font-semibold">Month</th><th className="text-left py-4 px-6 font-semibold">Amount</th><th className="text-left py-4 px-6 font-semibold">Due Date</th><th className="text-left py-4 px-6 font-semibold">Paid Date</th><th className="text-left py-4 px-6 font-semibold">Status</th></tr></thead>
          <tbody>{filtered.map((p) => (
            <tr key={p.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
              <td className="py-4 px-6 text-sm font-semibold text-primary">{p.id}</td>
              <td className="py-4 px-6 text-sm font-medium">{p.tenant}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{p.property}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{p.month}</td>
              <td className="py-4 px-6 text-sm font-bold">${p.amount.toLocaleString()}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{p.dueDate}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{p.paidDate || "\u2014"}</td>
              <td className="py-4 px-6"><StatusBadge label={p.status} variant={getStatusVariant(p.status)} dot /></td>
            </tr>
          ))}</tbody></table>
        </div>
      </div>
    </>
  );
}
