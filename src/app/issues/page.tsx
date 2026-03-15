"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";

const tabs = ["All", "Critical", "High", "Medium", "Low"];

const issues = [
  { id: "ISS-001", title: "Water leak under kitchen sink", property: "Grand Plaza #102", category: "Plumbing", reportedBy: "Sarah Jenkins", date: "Mar 14, 2026", severity: "Critical", status: "Open", photos: 3, description: "Water is leaking from the pipe under the kitchen sink, causing water damage to the cabinet." },
  { id: "ISS-002", title: "AC not cooling in bedroom", property: "Skyline Tower A, 402", category: "HVAC", reportedBy: "Emily Chen", date: "Mar 13, 2026", severity: "High", status: "In Progress", photos: 2, description: "Air conditioning unit not producing cold air despite being set to 18°C." },
  { id: "ISS-003", title: "Flickering lights in bathroom", property: "Downtown Plaza, 8A", category: "Electrical", reportedBy: "James Rodriguez", date: "Mar 13, 2026", severity: "Medium", status: "Open", photos: 1, description: "Bathroom ceiling light flickers intermittently." },
  { id: "ISS-004", title: "Front door lock is stiff", property: "The Meadows, Unit 7", category: "Lock", reportedBy: "Anna Kowalski", date: "Mar 12, 2026", severity: "High", status: "Open", photos: 0, description: "Front door lock is very difficult to turn, sometimes gets stuck." },
  { id: "ISS-005", title: "WiFi router not working", property: "Landmark Tower, 1205", category: "Internet", reportedBy: "Robert Kim", date: "Mar 11, 2026", severity: "Medium", status: "Resolved", photos: 1, description: "Internet connection dropping frequently, router lights blinking red." },
  { id: "ISS-006", title: "Broken wardrobe handle", property: "Green Valley, Villa 12", category: "Furniture", reportedBy: "Marcus Peterson", date: "Mar 10, 2026", severity: "Low", status: "Open", photos: 2, description: "Handle on the master bedroom wardrobe is broken off." },
  { id: "ISS-007", title: "Washing machine leaking", property: "Ocean Breeze, Suite 2", category: "Plumbing", reportedBy: "Linda Wright", date: "Mar 09, 2026", severity: "High", status: "In Progress", photos: 4, description: "Washing machine leaks water during spin cycle." },
  { id: "ISS-008", title: "Ceiling fan making noise", property: "Riverside 2BR", category: "Electrical", reportedBy: "David Thompson", date: "Mar 08, 2026", severity: "Low", status: "Resolved", photos: 0, description: "Ceiling fan in living room makes grinding noise at high speed." },
];

const categoryIcons: Record<string, string> = {
  Plumbing: "water_drop",
  Electrical: "bolt",
  HVAC: "ac_unit",
  Lock: "lock",
  Internet: "wifi",
  Furniture: "chair",
};

const severityColors: Record<string, string> = {
  Critical: "bg-red-500",
  High: "bg-amber-500",
  Medium: "bg-blue-500",
  Low: "bg-slate-400",
};

export default function IssuesPage() {
  const [activeTab, setActiveTab] = useState("All");

  const filtered = issues.filter((issue) => {
    if (activeTab === "All") return true;
    return issue.severity === activeTab;
  });

  const openCount = issues.filter((i) => i.status === "Open").length;
  const criticalCount = issues.filter((i) => i.severity === "Critical").length;
  const resolvedThisWeek = issues.filter((i) => i.status === "Resolved").length;

  return (
    <>
      <Header
        title="Issue Reports"
        subtitle="Tenant-reported issues and complaints"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-lg">add</span>
            Report Issue
          </button>
        }
      />

      <div className="p-8 space-y-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-primary/10 shadow-sm">
            <p className="text-sm text-slate-500">Open Issues</p>
            <p className="text-2xl font-bold mt-1">12</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-primary/10 shadow-sm">
            <p className="text-sm text-slate-500">Critical</p>
            <p className="text-2xl font-bold text-red-600 mt-1">3</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-primary/10 shadow-sm">
            <p className="text-sm text-slate-500">Avg Resolution</p>
            <p className="text-2xl font-bold text-primary mt-1">2.5 days</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-primary/10 shadow-sm">
            <p className="text-sm text-slate-500">Resolved This Week</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">8</p>
          </div>
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

        {/* Card Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filtered.map((issue) => (
            <div
              key={issue.id}
              className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden flex"
            >
              {/* Left color strip */}
              <div className={`w-1 flex-shrink-0 ${severityColors[issue.severity]}`} />

              <div className="flex-1 p-5 space-y-3">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-800">{issue.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{issue.property}</p>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0">{issue.id}</span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-500 line-clamp-2">{issue.description}</p>

                {/* Category + Reported by */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm text-primary">
                      {categoryIcons[issue.category] || "build"}
                    </span>
                    {issue.category}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">person</span>
                    {issue.reportedBy}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    {issue.date}
                  </span>
                </div>

                {/* Footer: badges + photo count */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <StatusBadge label={issue.severity} variant={getStatusVariant(issue.severity)} />
                    <StatusBadge label={issue.status} variant={getStatusVariant(issue.status)} dot />
                  </div>
                  {issue.photos > 0 && (
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <span className="material-symbols-outlined text-sm">photo_camera</span>
                      {issue.photos}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
