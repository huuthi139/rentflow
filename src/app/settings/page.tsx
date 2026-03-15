"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatusBadge from "@/components/ui/StatusBadge";

const sidebarTabs = [
  { icon: "person", label: "Profile" },
  { icon: "business", label: "Company" },
  { icon: "notifications", label: "Notifications" },
  { icon: "group", label: "Users & Roles" },
  { icon: "credit_card", label: "Billing" },
  { icon: "extension", label: "Integrations" },
];

const usersData = [
  { name: "Alex Rivera", email: "alex@rentflow.com", role: "Admin", status: "Active", lastActive: "Mar 15, 2026" },
  { name: "Sarah Lee", email: "sarah@rentflow.com", role: "Agent", status: "Active", lastActive: "Mar 15, 2026" },
  { name: "Tom Chen", email: "tom@rentflow.com", role: "Agent", status: "Active", lastActive: "Mar 14, 2026" },
  { name: "Maria Garcia", email: "maria@rentflow.com", role: "Accountant", status: "Active", lastActive: "Mar 13, 2026" },
  { name: "James Wong", email: "james@rentflow.com", role: "Viewer", status: "Inactive", lastActive: "Feb 28, 2026" },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <>
      <Header title="Settings" subtitle="System configuration and preferences" />

      <div className="p-8">
        <div className="flex gap-8">
          {/* Sidebar Tabs */}
          <div className="w-56 flex-shrink-0">
            <nav className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
              {sidebarTabs.map((tab) => (
                <button
                  key={tab.label}
                  onClick={() => setActiveTab(tab.label)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-colors border-l-2 ${
                    activeTab === tab.label
                      ? "bg-primary/5 text-primary border-primary"
                      : "text-slate-600 dark:text-slate-400 border-transparent hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-slate-800 dark:hover:text-slate-200"
                  }`}
                >
                  <span className={`material-symbols-outlined text-xl ${activeTab === tab.label ? "filled" : ""}`}>
                    {tab.icon}
                  </span>
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 min-w-0">
            {activeTab === "Profile" && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold dark:text-slate-200 mb-6">Profile Settings</h3>

                {/* Avatar */}
                <div className="flex items-center gap-5 mb-8">
                  <div className="size-20 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
                    AR
                  </div>
                  <div>
                    <p className="text-sm font-semibold dark:text-slate-200">Alex Rivera</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Property Manager</p>
                    <button className="mt-2 text-xs text-primary font-semibold hover:underline">Change Photo</button>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      defaultValue="Alex Rivera"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Email</label>
                    <input
                      type="email"
                      defaultValue="alex@rentflow.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      defaultValue="+1 (555) 123-4567"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Role</label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                      <option>Admin</option>
                      <option>Property Manager</option>
                      <option>Agent</option>
                      <option>Accountant</option>
                      <option>Viewer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Language</label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                      <option>English</option>
                      <option>Vietnamese</option>
                      <option>French</option>
                      <option>Spanish</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "Company" && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold dark:text-slate-200 mb-6">Company Information</h3>

                {/* Logo Upload */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Company Logo</label>
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center hover:border-primary/30 transition-colors">
                    <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">cloud_upload</span>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">Drag & drop or click to upload</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">PNG, JPG up to 2MB</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Company Name</label>
                    <input
                      type="text"
                      defaultValue="RentFlow Properties"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Address</label>
                    <input
                      type="text"
                      defaultValue="123 Main Street, Suite 400"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">City</label>
                    <input
                      type="text"
                      defaultValue="San Francisco"
                      className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Country</label>
                    <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-900 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                      <option>United States</option>
                      <option>Vietnam</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 flex justify-end">
                  <button className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                    Save Changes
                  </button>
                </div>
              </div>
            )}

            {activeTab === "Notifications" && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold dark:text-slate-200 mb-6">Notification Preferences</h3>
                <div className="space-y-5">
                  {[
                    { label: "Payment received", desc: "Get notified when a tenant makes a payment" },
                    { label: "Payment overdue", desc: "Alert when a payment passes its due date" },
                    { label: "New booking", desc: "Notification for new property viewing bookings" },
                    { label: "Maintenance request", desc: "Alert when a new maintenance request is submitted" },
                    { label: "Contract expiring", desc: "Reminder when a lease is about to expire" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between py-2 border-b border-slate-100 dark:border-slate-700 last:border-0">
                      <div>
                        <p className="text-sm font-medium dark:text-slate-200">{item.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" defaultChecked className="sr-only peer" />
                        <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 peer-focus:outline-none rounded-full peer peer-checked:bg-primary transition-colors after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "Users & Roles" && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-700">
                  <h3 className="text-lg font-bold dark:text-slate-200">Users & Roles</h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
                    <span className="material-symbols-outlined text-lg">person_add</span>
                    Invite User
                  </button>
                </div>
                <table className="w-full">
                  <thead>
                    <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                      <th className="text-left py-4 px-6 font-semibold">Name</th>
                      <th className="text-left py-4 px-6 font-semibold">Email</th>
                      <th className="text-left py-4 px-6 font-semibold">Role</th>
                      <th className="text-left py-4 px-6 font-semibold">Status</th>
                      <th className="text-left py-4 px-6 font-semibold">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {usersData.map((u) => (
                      <tr key={u.email} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="size-8 rounded-full bg-primary/15 flex items-center justify-center text-primary font-bold text-xs">
                              {u.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <span className="text-sm font-medium dark:text-slate-200">{u.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{u.email}</td>
                        <td className="py-4 px-6">
                          <StatusBadge label={u.role} variant={u.role === "Admin" ? "primary" : "neutral"} />
                        </td>
                        <td className="py-4 px-6">
                          <StatusBadge label={u.status} variant={u.status === "Active" ? "success" : "neutral"} dot />
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{u.lastActive}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === "Billing" && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold dark:text-slate-200 mb-6">Billing & Subscription</h3>
                <div className="bg-primary/5 dark:bg-primary/10 rounded-xl p-5 border border-primary/10 dark:border-primary/20 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-primary">Professional Plan</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Up to 100 properties, unlimited users</p>
                    </div>
                    <p className="text-2xl font-bold dark:text-slate-200">$49<span className="text-sm font-normal text-slate-500 dark:text-slate-400">/mo</span></p>
                  </div>
                </div>
                <button className="px-4 py-2 bg-white dark:bg-slate-700 border border-primary/20 dark:border-slate-600 text-primary dark:text-primary rounded-lg text-sm font-bold hover:bg-primary/5 dark:hover:bg-slate-600 transition-colors">
                  Manage Subscription
                </button>
              </div>
            )}

            {activeTab === "Integrations" && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold dark:text-slate-200 mb-6">Integrations</h3>
                <div className="space-y-4">
                  {[
                    { name: "Google Calendar", desc: "Sync bookings with Google Calendar", connected: true },
                    { name: "Stripe", desc: "Online payment processing", connected: true },
                    { name: "QuickBooks", desc: "Accounting and invoicing", connected: false },
                    { name: "Slack", desc: "Team notifications and alerts", connected: false },
                  ].map((int) => (
                    <div key={int.name} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 dark:border-slate-700 hover:border-primary/10 dark:hover:border-slate-600 transition-colors">
                      <div className="flex items-center gap-4">
                        <div className="size-10 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-500 dark:text-slate-400">extension</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold dark:text-slate-200">{int.name}</p>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{int.desc}</p>
                        </div>
                      </div>
                      <button className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                        int.connected
                          ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
                          : "bg-white dark:bg-slate-700 border border-primary/20 dark:border-slate-600 text-primary hover:bg-primary/5 dark:hover:bg-slate-600"
                      }`}>
                        {int.connected ? "Connected" : "Connect"}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
