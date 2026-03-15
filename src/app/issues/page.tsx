"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import IssueForm from "@/components/crud/IssueForm";
import { useToast } from "@/components/ui/Toast";
import { exportToCSV } from "@/lib/export";
import type { IssueReport } from "@/lib/types";

const initialIssues: IssueReport[] = [
  { id: "ISS-001", title: "Water leak under kitchen sink", property: "Grand Plaza #102", category: "Plumbing", reportedBy: "Sarah Jenkins", reportDate: "Mar 14, 2026", resolvedDate: null, severity: "Critical", status: "Open", photos: [], assignedTo: "Mike Thompson", estimatedCost: 350, description: "Water is leaking from the pipe under the kitchen sink, causing water damage to the cabinet." },
  { id: "ISS-002", title: "AC not cooling in bedroom", property: "Skyline Tower A, 402", category: "Appliance", reportedBy: "Emily Chen", reportDate: "Mar 13, 2026", resolvedDate: null, severity: "Major", status: "Investigating", photos: [], assignedTo: "John Davis", estimatedCost: 500, description: "Air conditioning unit not producing cold air despite being set to 18°C." },
  { id: "ISS-003", title: "Flickering lights in bathroom", property: "Downtown Plaza, 8A", category: "Electrical", reportedBy: "James Rodriguez", reportDate: "Mar 13, 2026", resolvedDate: null, severity: "Minor", status: "Open", photos: [], assignedTo: "Tom Lee", estimatedCost: 120, description: "Bathroom ceiling light flickers intermittently." },
  { id: "ISS-004", title: "Front door lock is stiff", property: "The Meadows, Unit 7", category: "Safety", reportedBy: "Anna Kowalski", reportDate: "Mar 12, 2026", resolvedDate: null, severity: "Major", status: "Open", photos: [], assignedTo: "Mike Thompson", estimatedCost: 80, description: "Front door lock is very difficult to turn, sometimes gets stuck." },
  { id: "ISS-005", title: "Pest sighting in kitchen", property: "Landmark Tower, 1205", category: "Pest", reportedBy: "Robert Kim", reportDate: "Mar 11, 2026", resolvedDate: "Mar 13, 2026", severity: "Major", status: "Resolved", photos: [], assignedTo: "Pest Control Co.", estimatedCost: 200, description: "Cockroach sighting in the kitchen area near the sink." },
  { id: "ISS-006", title: "Broken wardrobe handle", property: "Green Valley, Villa 12", category: "Cosmetic", reportedBy: "Marcus Peterson", reportDate: "Mar 10, 2026", resolvedDate: null, severity: "Cosmetic", status: "Open", photos: [], assignedTo: "Tom Lee", estimatedCost: 30, description: "Handle on the master bedroom wardrobe is broken off." },
  { id: "ISS-007", title: "Washing machine leaking", property: "Ocean Breeze, Suite 2", category: "Appliance", reportedBy: "Linda Wright", reportDate: "Mar 09, 2026", resolvedDate: null, severity: "Major", status: "Investigating", photos: [], assignedTo: "John Davis", estimatedCost: 450, description: "Washing machine leaks water during spin cycle." },
  { id: "ISS-008", title: "Ceiling crack in living room", property: "Riverside 2BR", category: "Structural", reportedBy: "David Thompson", reportDate: "Mar 08, 2026", resolvedDate: "Mar 12, 2026", severity: "Minor", status: "Resolved", photos: [], assignedTo: "Mike Thompson", estimatedCost: 600, description: "Visible crack in the living room ceiling, approximately 30cm long." },
];

const tabs = ["All Issues", "Open", "Investigating", "Resolved", "Closed"];

const categoryIcons: Record<string, string> = {
  Structural: "foundation", Plumbing: "water_drop", Electrical: "bolt",
  Appliance: "kitchen", Cosmetic: "format_paint", Safety: "shield",
  Pest: "pest_control", Other: "build",
};

export default function IssuesPage() {
  const [issues, setIssues] = useState<IssueReport[]>(initialIssues);
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("All Issues");
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'delete'; issue?: IssueReport } | null>(null);

  const filtered = issues.filter((i) => activeTab === "All Issues" ? true : i.status === activeTab);
  const openCount = issues.filter(i => i.status === "Open").length;
  const criticalCount = issues.filter(i => i.severity === "Critical").length;
  const resolvedCount = issues.filter(i => i.status === "Resolved" || i.status === "Closed").length;
  const totalCost = issues.reduce((s, i) => s + i.estimatedCost, 0);

  const addIssue = (data: IssueReport) => setIssues(prev => [...prev, data]);
  const updateIssue = (data: IssueReport) => setIssues(prev => prev.map(i => i.id === data.id ? data : i));
  const deleteIssue = (id: string) => setIssues(prev => prev.filter(i => i.id !== id));

  return (
    <>
      <Header title="Issue Reports" subtitle="Tenant-reported issues and complaints" actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => exportToCSV(issues.map(i => ({ ID: i.id, Title: i.title, Property: i.property, Category: i.category, Severity: i.severity, 'Reported By': i.reportedBy, 'Report Date': i.reportDate, Status: i.status, 'Assigned To': i.assignedTo, 'Estimated Cost': i.estimatedCost, 'Resolved Date': i.resolvedDate || '' })), 'issues')}
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
            Report Issue
          </button>
        </div>
      } />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Open Issues</p><p className="text-2xl font-bold text-red-600 mt-1">{openCount}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Critical</p><p className="text-2xl font-bold text-red-600 mt-1">{criticalCount}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Resolved / Closed</p><p className="text-2xl font-bold text-emerald-600 mt-1">{resolvedCount}</p></div>
          <div className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm"><p className="text-sm text-slate-500 dark:text-slate-400">Total Est. Cost</p><p className="text-2xl font-bold text-primary mt-1">${totalCost.toLocaleString()}</p></div>
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>{tab}</button>))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full"><thead><tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"><th className="text-left py-4 px-6 font-semibold">ID</th><th className="text-left py-4 px-6 font-semibold">Title</th><th className="text-left py-4 px-6 font-semibold">Property</th><th className="text-left py-4 px-6 font-semibold">Category</th><th className="text-left py-4 px-6 font-semibold">Severity</th><th className="text-left py-4 px-6 font-semibold">Reported By</th><th className="text-left py-4 px-6 font-semibold">Cost</th><th className="text-left py-4 px-6 font-semibold">Status</th><th className="text-left py-4 px-6 font-semibold">Actions</th></tr></thead>
          <tbody>{filtered.map((issue) => (
            <tr key={issue.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
              <td className="py-4 px-6 text-sm font-semibold text-primary">{issue.id}</td>
              <td className="py-4 px-6 text-sm font-medium max-w-xs truncate">{issue.title}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{issue.property}</td>
              <td className="py-4 px-6"><span className="inline-flex items-center gap-1.5 text-sm"><span className="material-symbols-outlined text-sm text-primary">{categoryIcons[issue.category] || "build"}</span>{issue.category}</span></td>
              <td className="py-4 px-6"><StatusBadge label={issue.severity} variant={getStatusVariant(issue.severity)} /></td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{issue.reportedBy}</td>
              <td className="py-4 px-6 text-sm font-bold">${issue.estimatedCost}</td>
              <td className="py-4 px-6"><StatusBadge label={issue.status} variant={getStatusVariant(issue.status)} dot /></td>
              <td className="py-4 px-6">
                <div className="flex items-center gap-1">
                  <button onClick={() => setModal({ mode: 'edit', issue })} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                  <button onClick={() => setModal({ mode: 'delete', issue })} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
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
        title={modal?.mode === 'edit' ? 'Edit Issue Report' : 'New Issue Report'}
        size="lg"
      >
        <IssueForm
          issue={modal?.issue}
          onSubmit={(data) => {
            if (modal?.mode === 'edit') {
              updateIssue(data);
              toast("Issue updated successfully", "success");
            } else {
              addIssue(data);
              toast("Issue reported successfully", "success");
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
        onConfirm={() => { if (modal?.issue) { deleteIssue(modal.issue.id); toast("Issue deleted", "success"); } }}
        title="Delete Issue Report"
        message={`Are you sure you want to delete issue "${modal?.issue?.id} - ${modal?.issue?.title}"? This action cannot be undone.`}
      />
    </>
  );
}
