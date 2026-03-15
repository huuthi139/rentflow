"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";

const expensesData = [
  { id: "EXP-001", property: "Oakwood Apt 4B", category: "Rent to Owner", description: "Monthly rent payment", amount: 1550, date: "Mar 01, 2026", vendor: "Oakwood Holdings" },
  { id: "EXP-002", property: "Maple Villa", category: "Rent to Owner", description: "Monthly rent payment", amount: 1900, date: "Mar 01, 2026", vendor: "Downtown LLC" },
  { id: "EXP-003", property: "Oakwood Apt 4B", category: "Electric", description: "Electricity bill", amount: 120, date: "Mar 05, 2026", vendor: "City Power" },
  { id: "EXP-004", property: "Pine Studio", category: "Repair", description: "Plumbing repair - kitchen", amount: 350, date: "Mar 08, 2026", vendor: "Mike Torres" },
  { id: "EXP-005", property: "Cedar Suite", category: "Cleaning", description: "Monthly deep cleaning", amount: 80, date: "Mar 10, 2026", vendor: "CleanPro Services" },
  { id: "EXP-006", property: "Urban Loft", category: "Internet", description: "Fiber internet monthly", amount: 45, date: "Mar 01, 2026", vendor: "FastNet" },
  { id: "EXP-007", property: "Sunset Studio", category: "Water", description: "Water bill", amount: 35, date: "Mar 05, 2026", vendor: "City Water" },
  { id: "EXP-008", property: "Riverside 2BR", category: "Supplies", description: "Light bulbs and filters", amount: 65, date: "Mar 12, 2026", vendor: "Home Depot" },
];

const tabs = ["All", "Rent to Owner", "Utilities", "Maintenance", "Other"];
const categoryVariantMap: Record<string, "primary" | "info" | "warning" | "danger" | "success" | "neutral"> = { "Rent to Owner": "primary", Electric: "warning", Repair: "danger", Cleaning: "info", Internet: "info", Water: "info", Supplies: "neutral" };
const utilitiesCategories = ["Electric", "Water", "Internet"];
const maintenanceCategories = ["Repair", "Cleaning", "Supplies"];

export default function ExpensesPage() {
  const [activeTab, setActiveTab] = useState("All");
  const filtered = expensesData.filter((e) => {
    if (activeTab === "All") return true;
    if (activeTab === "Rent to Owner") return e.category === "Rent to Owner";
    if (activeTab === "Utilities") return utilitiesCategories.includes(e.category);
    if (activeTab === "Maintenance") return maintenanceCategories.includes(e.category);
    return !["Rent to Owner", ...utilitiesCategories, ...maintenanceCategories].includes(e.category);
  });
  const totalExpenses = expensesData.reduce((s, e) => s + e.amount, 0);
  const rentTotal = expensesData.filter((e) => e.category === "Rent to Owner").reduce((s, e) => s + e.amount, 0);
  const utilitiesTotal = expensesData.filter((e) => utilitiesCategories.includes(e.category)).reduce((s, e) => s + e.amount, 0);
  const repairsTotal = expensesData.filter((e) => maintenanceCategories.includes(e.category)).reduce((s, e) => s + e.amount, 0);
  const filteredTotal = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <>
      <Header title="Expenses" subtitle="Track property costs and operating expenses" actions={<button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg">add</span>Add Expense</button>} />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Total Expenses" value={`$${totalExpenses.toLocaleString()}`} icon="account_balance_wallet" iconColor="text-red-500" />
          <StatCard label="Rent to Owner" value={`$${rentTotal.toLocaleString()}`} icon="home_work" />
          <StatCard label="Utilities" value={`$${utilitiesTotal.toLocaleString()}`} icon="bolt" iconColor="text-amber-500" />
          <StatCard label="Repairs & Maintenance" value={`$${repairsTotal.toLocaleString()}`} icon="build" iconColor="text-blue-500" />
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>{tab}</button>))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <table className="w-full"><thead><tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"><th className="text-left py-4 px-6 font-semibold">ID</th><th className="text-left py-4 px-6 font-semibold">Property</th><th className="text-left py-4 px-6 font-semibold">Category</th><th className="text-left py-4 px-6 font-semibold">Description</th><th className="text-left py-4 px-6 font-semibold">Amount</th><th className="text-left py-4 px-6 font-semibold">Date</th><th className="text-left py-4 px-6 font-semibold">Vendor</th><th className="text-left py-4 px-6 font-semibold">Actions</th></tr></thead>
          <tbody>{filtered.map((e) => (
            <tr key={e.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
              <td className="py-4 px-6 text-sm font-semibold text-primary">{e.id}</td>
              <td className="py-4 px-6 text-sm font-medium">{e.property}</td>
              <td className="py-4 px-6"><StatusBadge label={e.category} variant={categoryVariantMap[e.category] || "neutral"} /></td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{e.description}</td>
              <td className="py-4 px-6 text-sm font-bold text-red-600">-${e.amount.toLocaleString()}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{e.date}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{e.vendor}</td>
              <td className="py-4 px-6"><div className="flex items-center gap-1"><button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">visibility</span></button><button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button><button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button></div></td>
            </tr>
          ))}</tbody>
          <tfoot><tr className="bg-slate-50/80 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700"><td colSpan={4} className="py-4 px-6 text-sm font-bold text-slate-700 dark:text-slate-300">Total</td><td className="py-4 px-6 text-sm font-bold text-red-600">-${filteredTotal.toLocaleString()}</td><td colSpan={3}></td></tr></tfoot></table>
        </div>
      </div>
    </>
  );
}
