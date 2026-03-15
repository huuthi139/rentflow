"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import StatCard from "@/components/ui/StatCard";
import { tenants, tenantStats } from "@/data/mock";

const tabs = ["All Records", "Leads", "Active Tenants", "Former Tenants"];

export default function TenantsPage() {
  const [activeTab, setActiveTab] = useState("All Records");

  const filteredTenants = tenants.filter((t) => {
    if (activeTab === "All Records") return true;
    if (activeTab === "Leads") return t.status === "Lead" || t.status === "Interested" || t.status === "Viewing";
    if (activeTab === "Active Tenants") return t.status === "Active" || t.status === "Overdue";
    if (activeTab === "Former Tenants") return t.status === "Former";
    return true;
  });

  return (
    <>
      <Header
        title="Tenants CRM"
        subtitle="Manage leads, active tenants, and historical records."
        actions={
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-primary/10 rounded-lg text-sm font-medium text-slate-600 hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-lg">tune</span>
              Filter Status
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-primary/10 rounded-lg text-sm font-medium text-slate-600 hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-lg">download</span>
              Export
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-lg">person_add</span>
              New Tenant
            </button>
          </div>
        }
      />

      <div className="p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard label="Total Leads" value={tenantStats.totalLeads.toString()} change={tenantStats.leadsChange} changeLabel="from last month" icon="person_search" />
          <StatCard label="Active Tenants" value={tenantStats.activeTenants.toString()} changeLabel={`${tenantStats.occupancyRate}% Occupancy Rate`} icon="person_pin" />
          <StatCard label="Pending Apps" value={tenantStats.pendingApps.toString()} changeLabel={`${tenantStats.highPriority} high priority`} icon="hourglass_empty" iconColor="text-amber-500" />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                activeTab === tab
                  ? "bg-primary text-white"
                  : "bg-white border border-primary/10 text-slate-600 hover:bg-primary/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/50">
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
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="border-b border-slate-50 hover:bg-primary/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold shrink-0">
                        {tenant.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{tenant.name}</p>
                        <p className="text-xs text-slate-500">ID: {tenant.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm">{tenant.email}</p>
                    <p className="text-xs text-slate-500">{tenant.phone}</p>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm font-medium">{tenant.property}</p>
                    <p className="text-xs text-slate-500">{tenant.propertyType}</p>
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
                        "text-slate-500"
                      }`}>{tenant.payment}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{tenant.contractEnd}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Link href={`/tenants/${tenant.id}`} className="size-8 flex items-center justify-center rounded-lg text-primary hover:bg-primary/10 transition-colors">
                        <span className="material-symbols-outlined text-lg">visibility</span>
                      </Link>
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
            <span className="text-sm text-primary">Showing <strong>1-10</strong> of <strong>856</strong> tenants</span>
            <div className="flex items-center gap-1">
              <button className="size-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-primary/5 text-sm">&lsaquo;</button>
              <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">1</button>
              <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-primary/5 text-sm">2</button>
              <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-primary/5 text-sm">3</button>
              <button className="size-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-primary/5 text-sm">&rsaquo;</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
