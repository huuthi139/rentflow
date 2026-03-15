"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import { contracts, payments, paymentStats } from "@/data/mock";

const tabs = ["Contracts", "Payments"] as const;

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Contracts");

  return (
    <>
      <Header title="Contracts & Payments" />

      <div className="p-8 space-y-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-slate-500">Pending Payments</span>
              <span className="material-symbols-outlined text-primary">schedule</span>
            </div>
            <p className="text-3xl font-bold mt-2">${paymentStats.pendingPayments.toLocaleString()}</p>
            <p className="text-sm font-medium text-emerald-600 flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +{paymentStats.pendingChange}% vs last month
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-slate-500">Overdue</span>
              <span className="material-symbols-outlined text-danger">warning</span>
            </div>
            <p className="text-3xl font-bold mt-2 text-danger">${paymentStats.overdue.toLocaleString()}</p>
            <p className="text-sm font-medium text-red-500 flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-sm">trending_down</span>
              {paymentStats.overdueChange}% vs last month
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-primary/10 shadow-sm">
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-slate-500">Total Collected</span>
              <span className="material-symbols-outlined text-success">check_circle</span>
            </div>
            <p className="text-3xl font-bold mt-2">${paymentStats.totalCollected.toLocaleString()}</p>
            <p className="text-sm font-medium text-emerald-600 flex items-center gap-1 mt-2">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +{paymentStats.collectedChange}% this year
            </p>
          </div>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white border border-primary/10 text-slate-600 hover:bg-primary/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Actions Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-primary/10 rounded-lg text-sm font-medium text-slate-600 hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-lg">tune</span>
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-primary/10 rounded-lg text-sm font-medium text-slate-600 hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-lg">download</span>
              Export CSV
            </button>
          </div>
          {activeTab === "Payments" && (
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-lg">campaign</span>
              Send Reminders
            </button>
          )}
        </div>

        {/* Contracts Table */}
        {activeTab === "Contracts" && (
          <div className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-4 px-6 font-semibold">ID</th>
                  <th className="text-left py-4 px-6 font-semibold">Tenant</th>
                  <th className="text-left py-4 px-6 font-semibold">Property</th>
                  <th className="text-left py-4 px-6 font-semibold">Start Date</th>
                  <th className="text-left py-4 px-6 font-semibold">End Date</th>
                  <th className="text-left py-4 px-6 font-semibold">Rent</th>
                  <th className="text-left py-4 px-6 font-semibold">Deposit</th>
                  <th className="text-left py-4 px-6 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((contract) => (
                  <tr key={contract.id} className="border-b border-slate-50 hover:bg-primary/[0.02] transition-colors">
                    <td className="py-4 px-6 text-sm font-mono text-primary font-semibold">{contract.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                          {contract.tenant.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm font-medium">{contract.tenant}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{contract.property}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{contract.startDate}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{contract.endDate}</td>
                    <td className="py-4 px-6 text-sm font-bold">${contract.rentPrice.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">${contract.deposit.toLocaleString()}</td>
                    <td className="py-4 px-6">
                      <StatusBadge
                        label={contract.status}
                        variant={
                          contract.status === "Active" ? "success" :
                          contract.status === "Ending Soon" ? "warning" :
                          contract.status === "Expired" ? "danger" :
                          getStatusVariant(contract.status)
                        }
                        dot
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <button className="size-8 flex items-center justify-center rounded-lg text-primary hover:bg-primary/10 transition-colors">
                          <span className="material-symbols-outlined text-lg">visibility</span>
                        </button>
                        <button className="size-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 transition-colors">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <span className="text-sm text-primary">Showing <strong>{contracts.length}</strong> contracts</span>
            </div>
          </div>
        )}

        {/* Payments Table */}
        {activeTab === "Payments" && (
          <div className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/50">
                  <th className="text-left py-4 px-6 font-semibold">Tenant Name</th>
                  <th className="text-left py-4 px-6 font-semibold">Property</th>
                  <th className="text-left py-4 px-6 font-semibold">Amount Due</th>
                  <th className="text-left py-4 px-6 font-semibold">Due Date</th>
                  <th className="text-left py-4 px-6 font-semibold">Status</th>
                  <th className="text-left py-4 px-6 font-semibold">Contract</th>
                  <th className="text-left py-4 px-6 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-b border-slate-50 hover:bg-primary/[0.02] transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                          {payment.tenant.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm font-medium">{payment.tenant}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{payment.property}</td>
                    <td className="py-4 px-6 text-sm font-bold">${payment.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-slate-600">{payment.dueDate}</td>
                    <td className="py-4 px-6">
                      <StatusBadge label={payment.status} variant={getStatusVariant(payment.status)} dot />
                    </td>
                    <td className="py-4 px-6">
                      <button className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline">
                        <span className="material-symbols-outlined text-lg">description</span>
                        View PDF
                      </button>
                    </td>
                    <td className="py-4 px-6">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
              <span className="text-sm text-primary">Showing <strong>{payments.length}</strong> of <strong>124</strong> records</span>
              <div className="flex items-center gap-1">
                <button className="px-3 py-1.5 text-sm text-slate-400 hover:text-primary">Previous</button>
                <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">1</button>
                <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-primary/5 text-sm">2</button>
                <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-primary/5 text-sm">3</button>
                <button className="px-3 py-1.5 text-sm text-slate-600 hover:text-primary">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
