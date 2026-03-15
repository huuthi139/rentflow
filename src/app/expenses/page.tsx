"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import ExpenseForm from "@/components/crud/ExpenseForm";
import { useData } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { exportToCSV } from "@/lib/export";
import type { Expense } from "@/lib/types";

const tabs = ["All", "Rent to Owner", "Utilities", "Maintenance", "Other"];
const categoryVariantMap: Record<string, "primary" | "info" | "warning" | "danger" | "success" | "neutral"> = { "Rent to Owner": "primary", Electric: "warning", Repair: "danger", Cleaning: "info", Internet: "info", Water: "info", Supplies: "neutral" };
const utilitiesCategories = ["Electric", "Water", "Internet"];
const maintenanceCategories = ["Repair", "Cleaning", "Supplies"];

export default function ExpensesPage() {
  const { expenses, addExpense, updateExpense, deleteExpense } = useData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("All");
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'delete'; expense?: Expense } | null>(null);

  const filtered = expenses.filter((e) => {
    if (activeTab === "All") return true;
    if (activeTab === "Rent to Owner") return e.category === "Rent to Owner";
    if (activeTab === "Utilities") return utilitiesCategories.includes(e.category);
    if (activeTab === "Maintenance") return maintenanceCategories.includes(e.category);
    return !["Rent to Owner", ...utilitiesCategories, ...maintenanceCategories].includes(e.category);
  });
  const totalExpenses = expenses.reduce((s, e) => s + e.amount, 0);
  const rentTotal = expenses.filter((e) => e.category === "Rent to Owner").reduce((s, e) => s + e.amount, 0);
  const utilitiesTotal = expenses.filter((e) => utilitiesCategories.includes(e.category)).reduce((s, e) => s + e.amount, 0);
  const repairsTotal = expenses.filter((e) => maintenanceCategories.includes(e.category)).reduce((s, e) => s + e.amount, 0);
  const filteredTotal = filtered.reduce((s, e) => s + e.amount, 0);

  return (
    <>
      <Header title="Expenses" subtitle="Track property costs and operating expenses" actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCSV(expenses.map(e => ({ ID: e.id, Property: e.property, Category: e.category, Description: e.description, Amount: e.amount, Date: e.date, Vendor: e.vendor, Receipt: e.receipt ? 'Yes' : 'No' })), 'expenses')}
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
            Add Expense
          </button>
        </div>
      } />

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
          <div className="overflow-x-auto">
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
              <td className="py-4 px-6"><div className="flex items-center gap-1"><button onClick={() => setModal({ mode: 'edit', expense: e })} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button><button onClick={() => setModal({ mode: 'delete', expense: e })} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button></div></td>
            </tr>
          ))}</tbody>
          <tfoot><tr className="bg-slate-50/80 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-700"><td colSpan={4} className="py-4 px-6 text-sm font-bold text-slate-700 dark:text-slate-300">Total</td><td className="py-4 px-6 text-sm font-bold text-red-600">-${filteredTotal.toLocaleString()}</td><td colSpan={3}></td></tr></tfoot></table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modal?.mode === 'add' || modal?.mode === 'edit'}
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Edit Expense' : 'Add New Expense'}
        size="lg"
      >
        <ExpenseForm
          expense={modal?.expense}
          onSubmit={(data) => {
            if (modal?.mode === 'edit') {
              updateExpense(data);
              toast("Expense updated successfully", "success");
            } else {
              addExpense(data);
              toast("Expense added successfully", "success");
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
        onConfirm={() => { if (modal?.expense) { deleteExpense(modal.expense.id); toast("Expense deleted", "success"); } }}
        title="Delete Expense"
        message={`Are you sure you want to delete expense "${modal?.expense?.id}"? This action cannot be undone.`}
      />
    </>
  );
}
