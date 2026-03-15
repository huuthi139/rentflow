"use client";

import { use, useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import TenantForm from "@/components/crud/TenantForm";
import { useData } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";

const tabs = ["Overview", "Contracts", "Payment History", "Documents"] as const;

export default function TenantDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");
  const [editOpen, setEditOpen] = useState(false);
  const { tenants, contracts, payments, updateTenant } = useData();
  const { toast } = useToast();

  const tenant = tenants.find((t) => t.id === id);

  if (!tenant) {
    return (
      <>
        <Header title="Tenant Detail" />
        <div className="p-8">
          <p className="text-slate-500 dark:text-slate-400">Tenant not found.</p>
          <Link href="/tenants" className="text-primary font-semibold mt-4 inline-block">
            Back to Tenants
          </Link>
        </div>
      </>
    );
  }

  const initials = tenant.name.split(" ").map((n: string) => n[0]).join("").toUpperCase();
  const tenantContracts = contracts.filter((c) => c.tenant === tenant.name);
  const currentContract = tenantContracts[0];
  const tenantPayments = payments.filter((p) => p.tenant === tenant.name);

  return (
    <>
      <Header title="Tenant Detail" />

      <div className="p-8 space-y-8">
        <nav className="flex items-center gap-2 text-sm text-primary/60">
          <Link href="/tenants" className="hover:text-primary transition-colors">Tenants</Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 font-medium">{tenant.name}</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-black shrink-0">{initials}</div>
            <div>
              <h2 className="text-3xl font-black tracking-tight">{tenant.name}</h2>
              <div className="flex items-center gap-3 mt-2">
                <span className="text-sm text-primary/60 font-medium">{tenant.id}</span>
                <StatusBadge label={tenant.status} variant={getStatusVariant(tenant.status)} dot />
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEditOpen(true)}
              className="px-4 py-2 rounded-lg border border-primary/20 dark:border-slate-600 text-primary text-sm font-bold hover:bg-primary/5 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">edit</span>Edit
            </button>
            <a
              href={`mailto:${tenant.email}`}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">mail</span>Contact
            </a>
          </div>
        </div>

        <div className="border-b border-primary/10 dark:border-slate-700">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab)} className={`pb-4 text-sm font-bold transition-colors border-b-2 ${activeTab === tab ? "text-primary border-primary" : "text-primary/60 hover:text-primary border-transparent"}`}>{tab}</button>
            ))}
          </div>
        </div>

        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">person</span>Personal Information</h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                  {[{ label: "Full Name", value: tenant.name },{ label: "Email", value: tenant.email },{ label: "Phone", value: tenant.phone },{ label: "Nationality", value: tenant.nationality },{ label: "ID Number", value: tenant.idNumber },{ label: "Status", value: tenant.status }].map((item) => (
                    <div key={item.label}><p className="text-xs font-semibold text-primary/50 uppercase tracking-wider mb-1">{item.label}</p><p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.value}</p></div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">apartment</span>Current Property</h3>
                <div className="flex gap-4">
                  <div className="size-24 rounded-xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-3xl text-slate-400">home</span></div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-800 dark:text-slate-200">{tenant.property}</p>
                    <p className="text-sm text-primary/60">{tenant.propertyType}</p>
                    <p className="text-xs text-primary/50">Contract ends: {tenant.contractEnd}</p>
                    <StatusBadge label={tenant.payment} variant={getStatusVariant(tenant.payment)} dot />
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">payments</span>Recent Payments</h3>
                {tenantPayments.length > 0 ? (
                  <div className="space-y-3">
                    {tenantPayments.slice(0, 4).map((pay) => (
                      <div key={pay.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                        <div><p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{pay.month}</p><p className="text-xs text-primary/50">Due: {pay.dueDate}{pay.paidDate ? ` | Paid: ${pay.paidDate}` : ""}</p></div>
                        <div className="flex items-center gap-3"><span className="text-sm font-bold">${pay.amount.toLocaleString()}</span><StatusBadge label={pay.status} variant={getStatusVariant(pay.status)} /></div>
                      </div>
                    ))}
                  </div>
                ) : (<p className="text-sm text-primary/50">No payment records found.</p>)}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">analytics</span>Quick Stats</h3>
                <div className="space-y-4">
                  {[{ label: "Months as Tenant", value: "14", icon: "calendar_month" },{ label: "Total Paid", value: "$33,600", icon: "account_balance_wallet" },{ label: "Current Balance", value: "$0.00", icon: "savings" },{ label: "Rating", value: "4.8 / 5.0", icon: "star" }].map((stat) => (
                    <div key={stat.label} className="flex items-center gap-3"><span className="material-symbols-outlined text-primary/60">{stat.icon}</span><div className="flex-1"><p className="text-xs text-primary/50 font-medium">{stat.label}</p><p className="text-sm font-bold text-slate-800 dark:text-slate-200">{stat.value}</p></div></div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">description</span>Contract Summary</h3>
                {currentContract ? (
                  <div className="space-y-3">
                    {[{ label: "Start Date", value: currentContract.startDate },{ label: "End Date", value: currentContract.endDate },{ label: "Monthly Rent", value: `$${currentContract.rentPrice.toLocaleString()}` },{ label: "Deposit", value: `$${currentContract.deposit.toLocaleString()}` }].map((item) => (
                      <div key={item.label} className="flex justify-between"><span className="text-xs text-primary/50 font-medium">{item.label}</span><span className="text-sm font-bold text-slate-800 dark:text-slate-200">{item.value}</span></div>
                    ))}
                    <div className="flex justify-between items-center pt-2 border-t border-primary/10 dark:border-slate-700"><span className="text-xs text-primary/50 font-medium">Status</span><StatusBadge label={currentContract.status} variant={getStatusVariant(currentContract.status)} dot /></div>
                  </div>
                ) : (<p className="text-sm text-primary/50">No active contract.</p>)}
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">timeline</span>Recent Activity</h3>
                <div className="space-y-4">
                  {[{ text: "Payment received - $2,400", time: "2 days ago", icon: "payments", color: "text-emerald-600" },{ text: "Contract renewed for 12 months", time: "1 week ago", icon: "autorenew", color: "text-blue-600" },{ text: "Maintenance request submitted", time: "2 weeks ago", icon: "build", color: "text-amber-600" },{ text: "Profile information updated", time: "3 weeks ago", icon: "edit", color: "text-slate-600 dark:text-slate-400" },{ text: "Move-in inspection completed", time: "1 month ago", icon: "check_circle", color: "text-emerald-600" }].map((activity, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="flex flex-col items-center"><span className={`material-symbols-outlined text-lg ${activity.color}`}>{activity.icon}</span>{i < 4 && <div className="w-px flex-1 bg-primary/10 dark:bg-slate-700 mt-1" />}</div>
                      <div className="pb-2"><p className="text-sm font-medium text-slate-800 dark:text-slate-200">{activity.text}</p><p className="text-xs text-primary/50">{activity.time}</p></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Contracts" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">description</span>Contracts</h3>
            {tenantContracts.length > 0 ? (
              <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-primary/10 dark:border-slate-700"><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">ID</th><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Property</th><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Start</th><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">End</th><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Rent</th><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Status</th></tr></thead><tbody>{tenantContracts.map((c) => (<tr key={c.id} className="border-b border-primary/5 dark:border-slate-700 last:border-0"><td className="py-3 font-semibold">{c.id}</td><td className="py-3">{c.property}</td><td className="py-3">{c.startDate}</td><td className="py-3">{c.endDate}</td><td className="py-3 font-bold">${c.rentPrice.toLocaleString()}</td><td className="py-3"><StatusBadge label={c.status} variant={getStatusVariant(c.status)} dot /></td></tr>))}</tbody></table></div>
            ) : (<p className="text-sm text-primary/50">No contracts found for this tenant.</p>)}
          </div>
        )}

        {activeTab === "Payment History" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">payments</span>Payment History</h3>
            {tenantPayments.length > 0 ? (
              <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-primary/10 dark:border-slate-700"><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">ID</th><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Month</th><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Due Date</th><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Paid Date</th><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Amount</th><th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Status</th></tr></thead><tbody>{tenantPayments.map((p) => (<tr key={p.id} className="border-b border-primary/5 dark:border-slate-700 last:border-0"><td className="py-3 font-semibold">{p.id}</td><td className="py-3">{p.month}</td><td className="py-3">{p.dueDate}</td><td className="py-3">{p.paidDate || "\u2014"}</td><td className="py-3 font-bold">${p.amount.toLocaleString()}</td><td className="py-3"><StatusBadge label={p.status} variant={getStatusVariant(p.status)} dot /></td></tr>))}</tbody></table></div>
            ) : (<p className="text-sm text-primary/50">No payments found for this tenant.</p>)}
          </div>
        )}

        {activeTab === "Documents" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><span className="material-symbols-outlined text-primary">folder_open</span>Documents</h3>
            <div className="space-y-3">
              {[{ name: "Lease Agreement - 2024", type: "PDF", date: "Jan 01, 2024", icon: "picture_as_pdf" },{ name: "ID Verification", type: "PDF", date: "Dec 28, 2023", icon: "badge" },{ name: "Move-in Inspection Report", type: "PDF", date: "Jan 02, 2024", icon: "fact_check" },{ name: "Deposit Receipt", type: "PDF", date: "Dec 30, 2023", icon: "receipt" }].map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3"><span className="material-symbols-outlined text-primary">{doc.icon}</span><div><p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{doc.name}</p><p className="text-xs text-primary/50">{doc.type} &middot; {doc.date}</p></div></div>
                  <button className="p-2 hover:bg-primary/10 rounded-lg transition-colors"><span className="material-symbols-outlined text-primary text-lg">download</span></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Tenant" size="lg">
        <TenantForm
          tenant={tenant}
          onSubmit={(data) => {
            updateTenant(data);
            toast("Tenant updated successfully", "success");
            setEditOpen(false);
          }}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>
    </>
  );
}
