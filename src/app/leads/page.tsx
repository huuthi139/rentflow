"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge from "@/components/ui/StatusBadge";
import StatCard from "@/components/ui/StatCard";
import { leads } from "@/data/mock";
import type { LeadStage } from "@/lib/types";

const stages: { key: LeadStage; color: string }[] = [
  { key: "Lead", color: "bg-blue-500" },
  { key: "Contacted", color: "bg-amber-500" },
  { key: "Viewing", color: "bg-purple-500" },
  { key: "Negotiating", color: "bg-orange-500" },
  { key: "Signed", color: "bg-emerald-500" },
];

const stageVariant: Record<LeadStage, "info" | "warning" | "primary" | "success"> = {
  Lead: "info",
  Contacted: "warning",
  Viewing: "primary",
  Negotiating: "warning",
  Signed: "success",
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount);
}

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);
}

export default function LeadsPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");

  const newLeadsCount = leads.filter((l) => l.stage === "Lead" || l.stage === "Contacted").length;
  const inPipelineCount = leads.filter((l) => l.stage === "Viewing" || l.stage === "Negotiating").length;
  const convertedCount = leads.filter((l) => l.stage === "Signed").length;
  const totalValue = leads.reduce((sum, l) => sum + l.budget, 0);

  return (
    <>
      <Header
        title="Leads Pipeline"
        subtitle="Track prospects through the sales funnel"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-lg">add</span>
            Add Lead
          </button>
        }
      />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="New Leads" value={newLeadsCount} icon="person_add" />
          <StatCard label="In Pipeline" value={inPipelineCount} icon="filter_list" iconColor="text-purple-500" />
          <StatCard label="Converted" value={convertedCount} icon="check_circle" iconColor="text-emerald-500" />
          <StatCard label="Total Value" value={formatCurrency(totalValue)} icon="attach_money" iconColor="text-amber-500" />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={() => setView("kanban")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "kanban" ? "bg-primary text-white" : "border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>
            <span className="material-symbols-outlined text-lg">view_kanban</span>Kanban Board
          </button>
          <button onClick={() => setView("list")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${view === "list" ? "bg-primary text-white" : "border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>
            <span className="material-symbols-outlined text-lg">view_list</span>List View
          </button>
        </div>

        {view === "kanban" && (
          <div className="grid grid-cols-5 gap-4 min-h-[600px]">
            {stages.map((stage) => {
              const stageLeads = leads.filter((l) => l.stage === stage.key);
              return (
                <div key={stage.key} className="bg-slate-50 dark:bg-slate-900 rounded-xl flex flex-col min-h-[500px]">
                  <div className={`${stage.color} h-1.5 rounded-t-xl`} />
                  <div className="flex items-center justify-between px-4 py-3">
                    <h3 className="text-sm font-bold text-slate-700 dark:text-slate-300">{stage.key}</h3>
                    <span className="bg-white dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-700">{stageLeads.length}</span>
                  </div>
                  <div className="flex-1 px-3 pb-3 space-y-3 overflow-y-auto">
                    {stageLeads.map((lead) => (
                      <div key={lead.id} className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-4 space-y-3 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="flex items-center gap-3">
                          <div className="size-9 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">{getInitials(lead.name)}</div>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{lead.name}</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{lead.interestedProperty}</p>
                          </div>
                        </div>
                        <p className="text-sm font-semibold text-primary">{formatCurrency(lead.budget)}<span className="text-slate-400 font-normal">/mo</span></p>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">{lead.source}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="flex items-center gap-1"><span className="material-symbols-outlined text-sm">person</span>{lead.assignedAgent}</span>
                          <span>{lead.createdAt}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {view === "list" && (
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-primary/10 dark:border-slate-700 bg-slate-50/60 dark:bg-slate-900/50">
                    <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Name</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Contact</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Property</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Budget</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Stage</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Source</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Agent</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Date</th>
                    <th className="text-left px-6 py-4 font-semibold text-slate-600 dark:text-slate-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b border-primary/5 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
                      <td className="px-6 py-4"><div className="flex items-center gap-3"><div className="size-8 rounded-full bg-primary/15 flex items-center justify-center text-primary text-xs font-bold flex-shrink-0">{getInitials(lead.name)}</div><span className="font-semibold text-slate-800 dark:text-slate-200">{lead.name}</span></div></td>
                      <td className="px-6 py-4"><div><p className="text-slate-700 dark:text-slate-300">{lead.email}</p><p className="text-xs text-slate-400">{lead.phone}</p></div></td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{lead.interestedProperty}</td>
                      <td className="px-6 py-4 font-semibold text-slate-800 dark:text-slate-200">{formatCurrency(lead.budget)}</td>
                      <td className="px-6 py-4"><StatusBadge label={lead.stage} variant={stageVariant[lead.stage]} dot /></td>
                      <td className="px-6 py-4"><span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400">{lead.source}</span></td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-400">{lead.assignedAgent}</td>
                      <td className="px-6 py-4 text-slate-500 dark:text-slate-400">{lead.createdAt}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">visibility</span></button>
                          <button className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                          <button className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
