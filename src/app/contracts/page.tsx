"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Pagination from "@/components/ui/Pagination";
import ContractForm from "@/components/crud/ContractForm";
import { useData } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { exportToCSV } from "@/lib/export";
import { payments } from "@/data/mock";
import type { Contract } from "@/data/mock";

const tabs = ["Contracts", "Payments"] as const;
const ITEMS_PER_PAGE = 10;
const contractStatuses = ["Active", "Ending Soon", "Expired", "Terminated"];

export default function ContractsPage() {
  const { contracts, addContract, updateContract, deleteContract } = useData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Contracts");
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'delete'; contract?: Contract } | null>(null);

  // Filter state
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const filterRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setShowFilterDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Filtered contracts
  const filteredContracts = useMemo(() => {
    if (statusFilter === "All") return contracts;
    return contracts.filter(c => c.status === statusFilter);
  }, [contracts, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredContracts.length / ITEMS_PER_PAGE);
  const paginatedContracts = filteredContracts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleStatusFilterChange = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
    setShowFilterDropdown(false);
  };

  return (
    <>
      <Header
        title="Contracts & Payments"
        actions={
          activeTab === "Contracts" ? (
            <button
              onClick={() => setModal({ mode: 'add' })}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              New Contract
            </button>
          ) : undefined
        }
      />

      <div className="p-8 space-y-8">
        {(() => {
          const pendingPayments = payments.filter(p => p.status === "Pending").reduce((s, p) => s + p.amount, 0);
          const overdue = payments.filter(p => p.status === "Late").reduce((s, p) => s + p.amount, 0);
          const totalCollected = payments.filter(p => p.status === "Paid").reduce((s, p) => s + p.amount, 0);
          const activeContractsRevenue = contracts.filter(c => c.status === "Active").reduce((s, c) => s + c.rentPrice, 0);
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start"><span className="text-sm font-medium text-slate-500 dark:text-slate-400">Pending Payments</span><span className="material-symbols-outlined text-primary">schedule</span></div>
                <p className="text-3xl font-bold mt-2">${pendingPayments.toLocaleString()}</p>
                <p className="text-sm font-medium text-slate-500 flex items-center gap-1 mt-2">{payments.filter(p => p.status === "Pending").length} pending records</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start"><span className="text-sm font-medium text-slate-500 dark:text-slate-400">Overdue</span><span className="material-symbols-outlined text-danger">warning</span></div>
                <p className="text-3xl font-bold mt-2 text-danger">${overdue.toLocaleString()}</p>
                <p className="text-sm font-medium text-red-500 flex items-center gap-1 mt-2">{payments.filter(p => p.status === "Late").length} overdue records</p>
              </div>
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm">
                <div className="flex justify-between items-start"><span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Collected</span><span className="material-symbols-outlined text-success">check_circle</span></div>
                <p className="text-3xl font-bold mt-2">${totalCollected.toLocaleString()}</p>
                <p className="text-sm font-medium text-emerald-600 flex items-center gap-1 mt-2">Monthly contract revenue: ${activeContractsRevenue.toLocaleString()}</p>
              </div>
            </div>
          );
        })()}

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (<button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} className={`px-5 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>{tab}</button>))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative" ref={filterRef}>
              <button
                onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${statusFilter !== "All" ? "border-primary bg-primary/5 text-primary" : "border-primary/10 dark:border-slate-600 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}
              >
                <span className="material-symbols-outlined text-lg">tune</span>
                {statusFilter === "All" ? "Filter" : statusFilter}
                {statusFilter !== "All" && (
                  <span
                    onClick={(e) => { e.stopPropagation(); handleStatusFilterChange("All"); }}
                    className="material-symbols-outlined text-sm ml-1 hover:text-red-500 cursor-pointer"
                  >close</span>
                )}
              </button>
              {showFilterDropdown && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 rounded-lg shadow-lg z-20 py-1">
                  <button
                    onClick={() => handleStatusFilterChange("All")}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/5 dark:hover:bg-slate-700 transition-colors ${statusFilter === "All" ? "text-primary font-semibold" : "text-slate-600 dark:text-slate-400"}`}
                  >All Statuses</button>
                  {contractStatuses.map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusFilterChange(s)}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-primary/5 dark:hover:bg-slate-700 transition-colors ${statusFilter === s ? "text-primary font-semibold" : "text-slate-600 dark:text-slate-400"}`}
                    >{s}</button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => exportToCSV(contracts.map(c => ({ ID: c.id, Tenant: c.tenant, Property: c.property, 'Start Date': c.startDate, 'End Date': c.endDate, Rent: c.rentPrice, Deposit: c.deposit, Status: c.status })), 'contracts')} className="flex items-center gap-2 px-4 py-2 border border-primary/10 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-primary/5 transition-colors"><span className="material-symbols-outlined text-lg">download</span>Export CSV</button>
          </div>
          {activeTab === "Payments" && (<button onClick={() => toast("Payment reminders sent to all pending tenants", "success")} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg">campaign</span>Send Reminders</button>)}
        </div>

        {activeTab === "Contracts" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
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
                {paginatedContracts.map((contract) => (
                  <tr key={contract.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
                    <td className="py-4 px-6 text-sm font-mono text-primary font-semibold">{contract.id}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">{contract.tenant.split(" ").map(n => n[0]).join("")}</div>
                        <span className="text-sm font-medium">{contract.tenant}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{contract.property}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{contract.startDate}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{contract.endDate}</td>
                    <td className="py-4 px-6 text-sm font-bold">${contract.rentPrice.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">${contract.deposit.toLocaleString()}</td>
                    <td className="py-4 px-6"><StatusBadge label={contract.status} variant={contract.status === "Active" ? "success" : contract.status === "Ending Soon" ? "warning" : contract.status === "Expired" ? "danger" : getStatusVariant(contract.status)} dot /></td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <button onClick={() => setModal({ mode: 'edit', contract })} className="p-1 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-lg">edit</span>
                        </button>
                        <button onClick={() => setModal({ mode: 'delete', contract })} className="p-1 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                          <span className="material-symbols-outlined text-lg">delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredContracts.length}
                itemsPerPage={ITEMS_PER_PAGE}
                onPageChange={setCurrentPage}
                label="contracts"
              />
            </div>
          </div>
        )}

        {activeTab === "Payments" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
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
                  <tr key={payment.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
                    <td className="py-4 px-6"><div className="flex items-center gap-3"><div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">{payment.tenant.split(" ").map(n => n[0]).join("")}</div><span className="text-sm font-medium">{payment.tenant}</span></div></td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{payment.property}</td>
                    <td className="py-4 px-6 text-sm font-bold">${payment.amount.toLocaleString()}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{payment.dueDate}</td>
                    <td className="py-4 px-6"><StatusBadge label={payment.status} variant={getStatusVariant(payment.status)} dot /></td>
                    <td className="py-4 px-6"><button className="flex items-center gap-1.5 text-primary text-sm font-semibold hover:underline"><span className="material-symbols-outlined text-lg">description</span>View PDF</button></td>
                    <td className="py-4 px-6"><button className="text-slate-400 hover:text-primary transition-colors"><span className="material-symbols-outlined">more_vert</span></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-700">
              <span className="text-sm text-primary">Showing <strong>{payments.length}</strong> of <strong>124</strong> records</span>
              <div className="flex items-center gap-1">
                <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">1</button>
                <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 dark:text-slate-400 hover:bg-primary/5 text-sm">2</button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Contract Modal */}
      <Modal
        isOpen={modal?.mode === 'add' || modal?.mode === 'edit'}
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Edit Contract' : 'New Contract'}
        size="lg"
      >
        <ContractForm
          contract={modal?.contract}
          onSubmit={(data) => {
            if (modal?.mode === 'edit') {
              updateContract(data);
              toast("Contract updated successfully", "success");
            } else {
              addContract(data);
              toast("Contract created successfully", "success");
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
        onConfirm={() => { if (modal?.contract) { deleteContract(modal.contract.id); toast("Contract deleted", "success"); } }}
        title="Delete Contract"
        message={`Are you sure you want to delete contract "${modal?.contract?.id}"? This action cannot be undone.`}
      />
    </>
  );
}
