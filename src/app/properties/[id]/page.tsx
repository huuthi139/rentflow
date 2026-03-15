"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import PropertyForm from "@/components/crud/PropertyForm";
import { useData } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import type { Property } from "@/data/mock";

const mediaRooms = [
  {
    name: "Living Room",
    icon: "weekend",
    count: 4,
    photos: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=400",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400",
    ],
  },
  {
    name: "Bedroom",
    icon: "bed",
    count: 3,
    photos: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=400",
    ],
  },
  {
    name: "Kitchen",
    icon: "countertops",
    count: 2,
    photos: [
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400",
    ],
  },
];

const tabs = ["Overview", "Media Library", "Tenants", "Handover Reports", "Maintenance History"] as const;

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>("Overview");
  const [editOpen, setEditOpen] = useState(false);
  const { properties, tenants, maintenance, updateProperty } = useData();
  const { toast } = useToast();
  const router = useRouter();

  const property = properties.find((p) => p.id === id);

  const propName = property?.name ?? "Unit 402 - Landmark Tower";
  const propBuilding = property?.building ?? "Landmark Tower";
  const propLocation = property?.location ?? "Metropolis";
  const propStatus = property?.status ?? "Available";

  const relatedTenants = tenants.filter(
    (t) =>
      (property && t.property.toLowerCase().includes(property.building.toLowerCase().split(" ")[0])) ||
      (property && t.property.toLowerCase().includes(property.name.toLowerCase().split(" ")[0]))
  );

  const relatedTickets = maintenance.filter(
    (t) =>
      (property && t.property.toLowerCase().includes(property.building.toLowerCase().split(" ")[0])) ||
      (property && t.property.toLowerCase().includes(property.name.toLowerCase().split(" ")[0]))
  );

  return (
    <>
      <Header title="Property Detail" />

      <div className="p-8 space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-primary/60">
          <Link href="/properties" className="hover:text-primary transition-colors">
            Properties
          </Link>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="hover:text-primary transition-colors">{propBuilding}</span>
          <span className="material-symbols-outlined text-xs">chevron_right</span>
          <span className="text-slate-900 dark:text-slate-100 font-medium">{propName}</span>
        </nav>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <StatusBadge label={propStatus} variant={getStatusVariant(propStatus)} />
              <span className="text-primary/60 flex items-center gap-1 text-sm">
                <span className="material-symbols-outlined text-sm">location_on</span>
                {propLocation}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">{propName}</h2>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setEditOpen(true)}
              className="px-4 py-2 rounded-lg border border-primary/20 dark:border-slate-600 text-primary text-sm font-bold hover:bg-primary/5 transition-colors flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">edit</span>
              Edit Property
            </button>
            <button
              onClick={() => setActiveTab("Media Library")}
              className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-lg">upload</span>
              Upload Media
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-primary/10 dark:border-slate-700">
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-bold transition-colors border-b-2 ${
                  activeTab === tab
                    ? "text-primary border-primary"
                    : "text-primary/60 hover:text-primary border-transparent"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-8 space-y-6">
            {/* ===== OVERVIEW TAB ===== */}
            {activeTab === "Overview" && (
              <>
                {/* Property Details Grid */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">apartment</span>
                    Property Details
                  </h3>
                  <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                    {[
                      { label: "Area", value: property ? `${property.area} m2` : "150 m2" },
                      { label: "Bedrooms", value: property ? `${property.bedrooms}` : "4" },
                      { label: "Bathrooms", value: property ? `${property.bathrooms}` : "3" },
                      { label: "Floor", value: property ? `${property.floor}` : "35" },
                      { label: "Furniture", value: property?.furniture ?? "Premium" },
                      { label: "Status", value: propStatus },
                    ].map((item) => (
                      <div key={item.label}>
                        <p className="text-xs font-semibold text-primary/50 uppercase tracking-wider mb-1">
                          {item.label}
                        </p>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Financial Info */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">account_balance</span>
                    Financial Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      {
                        label: "Rent from Owner",
                        value: property ? `$${property.rentOwner.toLocaleString()}` : "$4,500",
                        icon: "arrow_downward",
                        color: "text-red-600",
                      },
                      {
                        label: "Rent to Tenant",
                        value: property ? `$${property.rentTenant.toLocaleString()}` : "$6,800",
                        icon: "arrow_upward",
                        color: "text-emerald-600",
                      },
                      {
                        label: "Operating Cost",
                        value: property ? `$${property.operatingCost.toLocaleString()}` : "$500",
                        icon: "receipt_long",
                        color: "text-amber-600",
                      },
                      {
                        label: "Monthly Profit",
                        value: property ? `$${property.profit.toLocaleString()}` : "$1,800",
                        icon: "trending_up",
                        color: property && property.profit < 0 ? "text-red-600" : "text-emerald-600",
                      },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 flex items-center gap-3"
                      >
                        <span className={`material-symbols-outlined ${item.color}`}>{item.icon}</span>
                        <div>
                          <p className="text-xs text-primary/50 font-medium">{item.label}</p>
                          <p className={`text-lg font-bold ${item.label === "Monthly Profit" ? item.color : "text-slate-800 dark:text-slate-200"}`}>
                            {item.value}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">description</span>
                    Description
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    This beautifully appointed property offers modern living at its finest. Featuring high-quality
                    finishes throughout, the unit boasts an open-plan living and dining area with floor-to-ceiling
                    windows that flood the space with natural light and provide stunning views. The fully equipped
                    kitchen includes premium appliances and stone countertops. Each bedroom is generously sized with
                    built-in wardrobes, while the bathrooms feature designer fixtures and fittings. Additional
                    amenities include secure parking, gym access, swimming pool, and 24/7 security.
                  </p>
                </div>
              </>
            )}

            {/* ===== MEDIA LIBRARY TAB ===== */}
            {activeTab === "Media Library" && (
              <>
                {mediaRooms.map((room) => (
                  <div key={room.name}>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">{room.icon}</span>
                        {room.name}
                      </h3>
                      <span className="text-xs font-bold uppercase tracking-wider text-primary">
                        {room.count} Photos
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                      {room.photos.map((photo, i) => (
                        <div
                          key={i}
                          className="aspect-[4/3] rounded-xl bg-slate-200 dark:bg-slate-700 bg-cover bg-center cursor-pointer hover:opacity-90 transition-opacity"
                          style={{ backgroundImage: `url(${photo})` }}
                        />
                      ))}
                      <div className="aspect-[4/3] rounded-xl border-2 border-dashed border-primary/20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary/40 hover:bg-primary/[0.02] transition-colors">
                        <span className="material-symbols-outlined text-primary/40 text-3xl">
                          add_photo_alternate
                        </span>
                        <span className="text-xs font-bold text-primary/40 uppercase">Add More</span>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}

            {/* ===== TENANTS TAB ===== */}
            {activeTab === "Tenants" && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">group</span>
                  Tenants
                </h3>
                {relatedTenants.length > 0 ? (
                  <div className="space-y-3">
                    {relatedTenants.map((t) => {
                      const initials = t.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                        .toUpperCase();
                      return (
                        <Link
                          key={t.id}
                          href={`/tenants/${t.id}`}
                          className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-black shrink-0">
                            {initials}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.name}</p>
                            <p className="text-xs text-primary/50">
                              {t.property} &middot; {t.propertyType}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <StatusBadge label={t.status} variant={getStatusVariant(t.status)} dot />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[
                      { name: "Sarah Jenkins", status: "Active", property: "Unit 402", period: "Jan 2024 - Dec 2024" },
                      { name: "David Thompson", status: "Former", property: "Unit 402", period: "Mar 2022 - Dec 2023" },
                    ].map((t) => {
                      const initials = t.name.split(" ").map((n) => n[0]).join("").toUpperCase();
                      return (
                        <div
                          key={t.name}
                          className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900"
                        >
                          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-black shrink-0">
                            {initials}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{t.name}</p>
                            <p className="text-xs text-primary/50">
                              {t.property} &middot; {t.period}
                            </p>
                          </div>
                          <StatusBadge label={t.status} variant={getStatusVariant(t.status)} dot />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* ===== HANDOVER REPORTS TAB ===== */}
            {activeTab === "Handover Reports" && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">fact_check</span>
                  Handover Reports
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "Move-in Inspection - Sarah Jenkins", date: "Jan 02, 2024", status: "Completed", icon: "login" },
                    { title: "Move-out Inspection - David Thompson", date: "Dec 28, 2023", status: "Completed", icon: "logout" },
                    { title: "Quarterly Inspection Q3 2023", date: "Sep 15, 2023", status: "Completed", icon: "search" },
                    { title: "Move-in Inspection - David Thompson", date: "Mar 01, 2022", status: "Completed", icon: "login" },
                  ].map((report) => (
                    <div
                      key={report.title}
                      className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-primary">{report.icon}</span>
                        <div>
                          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{report.title}</p>
                          <p className="text-xs text-primary/50">{report.date}</p>
                        </div>
                      </div>
                      <StatusBadge label={report.status} variant="success" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ===== MAINTENANCE HISTORY TAB ===== */}
            {activeTab === "Maintenance History" && (
              <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary">build</span>
                  Maintenance History
                </h3>
                {relatedTickets.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-primary/10 dark:border-slate-700">
                          <th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">ID</th>
                          <th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Type</th>
                          <th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Description</th>
                          <th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Date</th>
                          <th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Cost</th>
                          <th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Priority</th>
                          <th className="text-left pb-3 text-xs font-bold uppercase tracking-wider text-primary/50">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {relatedTickets.map((ticket) => (
                          <tr key={ticket.id} className="border-b border-primary/5 dark:border-slate-700 last:border-0">
                            <td className="py-3 font-semibold">{ticket.id}</td>
                            <td className="py-3">{ticket.type}</td>
                            <td className="py-3 max-w-[200px] truncate">{ticket.description}</td>
                            <td className="py-3">{ticket.reportDate}</td>
                            <td className="py-3 font-bold">${ticket.cost}</td>
                            <td className="py-3">
                              <StatusBadge label={ticket.priority} variant={getStatusVariant(ticket.priority)} />
                            </td>
                            <td className="py-3">
                              <StatusBadge label={ticket.status} variant={getStatusVariant(ticket.status)} dot />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {[
                      { id: "MT-101", type: "Plumbing", desc: "Kitchen faucet replacement", date: "Sep 20, 2023", cost: 180, priority: "Medium", status: "Closed" },
                      { id: "MT-087", type: "Electrical", desc: "Circuit breaker reset", date: "Jul 12, 2023", cost: 100, priority: "High", status: "Closed" },
                      { id: "MT-065", type: "HVAC", desc: "Annual AC servicing", date: "May 05, 2023", cost: 250, priority: "Low", status: "Closed" },
                    ].map((ticket) => (
                      <div
                        key={ticket.id}
                        className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-900"
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-primary">build_circle</span>
                          <div>
                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                              {ticket.id} &middot; {ticket.type}
                            </p>
                            <p className="text-xs text-primary/50">
                              {ticket.desc} &middot; {ticket.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold">${ticket.cost}</span>
                          <StatusBadge label={ticket.status} variant={getStatusVariant(ticket.status)} dot />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-6">
            {/* Handover Status */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold">Handover Status</h3>
                <span className="material-symbols-outlined text-primary">verified</span>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary">check_circle</span>
                  <div>
                    <p className="text-sm font-semibold">Handover Checklist</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Completed on Oct 12, 2023</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="font-semibold">Inspection Progress</span>
                    <span className="font-bold">100%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: "100%" }} />
                  </div>
                </div>
                <button className="w-full py-2.5 border border-primary/20 dark:border-slate-600 rounded-lg text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-primary/5 transition-colors">
                  View Full Report
                </button>
              </div>
            </div>

            {/* Location */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
              <h3 className="text-lg font-bold mb-4">Location</h3>
              <div className="aspect-[4/3] rounded-xl bg-slate-200 dark:bg-slate-700 mb-3 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-slate-400">map</span>
              </div>
              <p className="text-sm font-semibold">{propName}</p>
              <p className="text-xs text-primary">{propBuilding}, {propLocation}</p>
            </div>

            {/* Manage */}
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Manage</p>
              {[
                { icon: "key", label: "Manage Access Keys" },
                { icon: "description", label: "Lease Documents" },
                { icon: "engineering", label: "Schedule Inspection" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-primary/5 transition-colors group"
                >
                  <span className="material-symbols-outlined text-primary">{item.icon}</span>
                  <span className="text-sm font-medium flex-1 text-left">{item.label}</span>
                  <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 group-hover:text-primary transition-colors text-lg">
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal isOpen={editOpen} onClose={() => setEditOpen(false)} title="Edit Property" size="lg">
        <PropertyForm
          property={property}
          onSubmit={(data) => {
            updateProperty(data);
            toast("Property updated successfully", "success");
            setEditOpen(false);
          }}
          onCancel={() => setEditOpen(false)}
        />
      </Modal>
    </>
  );
}
