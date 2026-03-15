"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import PaymentForm from "@/components/crud/PaymentForm";
import { useData } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { exportToCSV } from "@/lib/export";
import type { PaymentRecord } from "@/data/mock";

const tabs = ["All Payments", "Paid", "Pending", "Late"];

export default function PaymentsPage() {
  const { payments, addPayment, updatePayment, deletePayment } = useData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("All Payments");
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'delete'; payment?: PaymentRecord } | null>(null);

  const filtered = payments.filter((p) => activeTab === "All Payments" ? true : p.status === activeTab);
  const totalPaid = payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
  const totalPending = payments.filter(p => p.status === "Pending").reduce((s, p) => s + p.amount, 0);
  const totalLate = payments.filter(p => p.status === "Late").reduce((s, p) => s + p.amount, 0);
  const totalAll = payments.reduce((s, p) => s + p.amount, 0);
  const collectionRate = totalAll > 0 ? ((totalPaid / totalAll) * 100).toFixed(1) : '0.0';

  return (
    <>
      <Header title="Payments" subtitle="Track all rent payments" actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCSV(payments.map(p => ({ ID: p.id, Tenant: p.tenant, Property: p.property, Amount: p.amount, 'Due Date': p.dueDate, 'Paid Date': p.paidDate || '', Status: p.status, Month: p.month })), 'payments')}
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
            Record Payment
          </button>
        </div>
      } />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Total Collected</p><p className="text-2xl font-bold text-emerald-600 mt-1">${totalPaid.toLocaleString()}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Pending</p><p className="text-2xl font-bold text-amber-600 mt-1">${totalPending.toLocaleString()}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Overdue</p><p className="text-2xl font-bold text-red-600 mt-1">${totalLate.toLocaleString()}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Collection Rate</p><p className="text-2xl font-bold text-primary mt-1">{collectionRate}%</p></div>
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>{tab}</button>))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full"><thead><tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"><th className="text-left py-4 px-6 font-semibold">ID</th><th className="text-left py-4 px-6 font-semibold">Tenant</th><th className="text-left py-4 px-6 font-semibold">Property</th><th className="text-left py-4 px-6 font-semibold">Month</th><th className="text-left py-4 px-6 font-semibold">Amount</th><th className="text-left py-4 px-6 font-semibold">Due Date</th><th className="text-left py-4 px-6 font-semibold">Paid Date</th><th className="text-left py-4 px-6 font-semibold">Status</th><th className="text-left py-4 px-6 font-semibold">Actions</th></tr></thead>
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
              <td className="py-4 px-6">
                <div className="flex items-center gap-1">
                  <button onClick={() => setModal({ mode: 'edit', payment: p })} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                  <button onClick={() => setModal({ mode: 'delete', payment: p })} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
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
        title={modal?.mode === 'edit' ? 'Edit Payment' : 'Record New Payment'}
        size="lg"
      >
        <PaymentForm
          payment={modal?.payment}
          onSubmit={(data) => {
            if (modal?.mode === 'edit') {
              updatePayment(data);
              toast("Payment updated successfully", "success");
            } else {
              addPayment(data);
              toast("Payment recorded successfully", "success");
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
        onConfirm={() => { if (modal?.payment) { deletePayment(modal.payment.id); toast("Payment deleted", "success"); } }}
        title="Delete Payment"
        message={`Are you sure you want to delete payment "${modal?.payment?.id}"? This action cannot be undone.`}
      />
    </>
  );
}
