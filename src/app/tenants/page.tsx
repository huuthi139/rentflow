"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import StatCard from "@/components/ui/StatCard";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Pagination from "@/components/ui/Pagination";
import TenantForm from "@/components/crud/TenantForm";
import { useData } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { exportToCSV } from "@/lib/export";
import type { Tenant } from "@/data/mock";

const tabs = ["All Records", "Leads", "Active Tenants", "Former Tenants"];
const ITEMS_PER_PAGE = 10;

export default function TenantsPage() {
  const { tenants, addTenant, updateTenant, deleteTenant } = useData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("All Records");
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'delete'; tenant?: Tenant } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTenants = useMemo(() => {
    return tenants.filter((t) => {
      // Tab filter
      if (activeTab === "Leads" && t.status !== "Lead" && t.status !== "Interested" && t.status !== "Viewing") return false;
      if (activeTab === "Active Tenants" && t.status !== "Active" && t.status !== "Overdue") return false;
      if (activeTab === "Former Tenants" && t.status !== "Former") return false;

      // Search filter
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!t.name.toLowerCase().includes(q) && !t.email.toLowerCase().includes(q)) return false;
      }

      return true;
    });
  }, [tenants, activeTab, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredTenants.length / ITEMS_PER_PAGE);
  const paginatedTenants = filteredTenants.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleTabChange = (tab: string) => { setActiveTab(tab); setCurrentPage(1); };
  const handleSearchChange = (val: string) => { setSearchQuery(val); setCurrentPage(1); };

  return (
    <>
      <Header
        title="Tenants CRM"
        subtitle="Manage leads, active tenants, and historical records."
        actions={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-primary/10 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-lg">tune</span>
              Filter Status
            </button>
            <button
              onClick={() => exportToCSV(tenants.map(t => ({ ID: t.id, Name: t.name, Email: t.email, Phone: t.phone, Property: t.property, Status: t.status, Payment: t.payment, 'Contract End': t.contractEnd })), 'tenants')}
              className="flex items-center gap-2 px-4 py-2 border border-primary/10 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-primary/5 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Export CSV
            </button>
            <button
              onClick={() => setModal({ mode: 'add' })}
              className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
            >
              <span className="material-symbols-outlined text-lg">person_add</span>
              New Tenant
            </button>
          </div>
        }
      />

      <div className="p-8 space-y-6">
        {/* Stats */}
        {(() => {
          const totalLeads = tenants.filter(t => t.status === "Lead" || t.status === "Interested" || t.status === "Viewing").length;
          const activeTenants = tenants.filter(t => t.status === "Active").length;
          const pendingApps = tenants.filter(t => t.status === "Interested" || t.status === "Viewing").length;
          const occupancyRate = tenants.length > 0 ? Math.round((activeTenants / tenants.length) * 100) : 0;
          return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <StatCard label="Total Leads" value={totalLeads.toString()} changeLabel="from current data" icon="person_search" />
              <StatCard label="Active Tenants" value={activeTenants.toString()} changeLabel={`${occupancyRate}% Occupancy Rate`} icon="person_pin" />
              <StatCard label="Pending Apps" value={pendingApps.toString()} changeLabel={`${pendingApps} pending review`} icon="hourglass_empty" iconColor="text-amber-500" />
            </div>
          );
        })()}

        {/* Tabs & Search */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                  activeTab === tab
                    ? "bg-primary text-white"
                    : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <span className="material-symbols-outlined text-lg text-slate-400 absolute left-3 top-1/2 -translate-y-1/2">search</span>
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 text-sm border border-primary/10 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary w-64"
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                <th className="text-left py-4 px-6 font-semibold">Tenant Name</th>
                <th className="text-left py-4 px-6 font-semibold">Contact Info</th>
                <th className="text-left py-4 px-6 font-semibold">Property</th>
                <th className="text-left py-4 px-6 font-semibold">Status</th>
                <th className="text-left py-4 px-6 font-semibold">Payment</th>
                <th className="text-left py-4 px-6 font-semibold">Contract End</th>
                <th className="text-left py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedTenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                        {tenant.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{tenant.name}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">ID: {tenant.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm">{tenant.email}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tenant.phone}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium">{tenant.property}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{tenant.propertyType}</p>
                  </td>
                  <td className="py-4 px-6">
                    <StatusBadge label={tenant.status} variant={getStatusVariant(tenant.status)} />
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5">
                      {tenant.payment === "Paid" && <span className="material-symbols-outlined text-emerald-500 text-lg">check_circle</span>}
                      {tenant.payment === "Unpaid" && <span className="material-symbols-outlined text-red-500 text-lg">warning</span>}
                      {tenant.payment === "Partial" && <span className="material-symbols-outlined text-amber-500 text-lg">schedule</span>}
                      {tenant.payment === "Cleared" && <span className="material-symbols-outlined text-slate-400 text-lg">history</span>}
                      {tenant.payment === "N/A" && <span className="material-symbols-outlined text-slate-300 text-lg">remove_circle_outline</span>}
                      <span className={`text-sm font-medium ${
                        tenant.payment === "Paid" ? "text-emerald-600" :
                        tenant.payment === "Unpaid" ? "text-red-500" :
                        "text-slate-500 dark:text-slate-400"
                      }`}>{tenant.payment}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{tenant.contractEnd}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Link href={`/tenants/${tenant.id}`} className="p-1 text-primary hover:bg-primary/10 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </Link>
                      <button onClick={() => setModal({ mode: 'edit', tenant })} className="p-1 text-slate-400 hover:text-primary hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-lg">edit</span>
                      </button>
                      <button onClick={() => setModal({ mode: 'delete', tenant })} className="p-1 text-slate-400 hover:text-red-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                        <span className="material-symbols-outlined text-lg">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredTenants.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
              label="tenants"
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modal?.mode === 'add' || modal?.mode === 'edit'}
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Edit Tenant' : 'Add New Tenant'}
        size="lg"
      >
        <TenantForm
          tenant={modal?.tenant}
          onSubmit={(data) => {
            if (modal?.mode === 'edit') {
              updateTenant(data);
              toast("Tenant updated successfully", "success");
            } else {
              addTenant(data);
              toast("Tenant added successfully", "success");
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
        onConfirm={() => { if (modal?.tenant) { deleteTenant(modal.tenant.id); toast("Tenant deleted", "success"); } }}
        title="Delete Tenant"
        message={`Are you sure you want to delete "${modal?.tenant?.name}"? This action cannot be undone.`}
      />
    </>
  );
}
