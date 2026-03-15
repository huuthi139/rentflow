"use client"

import { useState, useMemo } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import Pagination from "@/components/ui/Pagination";
import PropertyForm from "@/components/crud/PropertyForm";
import { useData } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { exportToCSV } from "@/lib/export";
import type { Property } from "@/data/mock";

const ITEMS_PER_PAGE = 10;

export default function PropertiesPage() {
  const { properties, addProperty, updateProperty, deleteProperty } = useData();
  const { toast } = useToast();
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'delete'; property?: Property } | null>(null);

  // Filter states
  const [statusFilter, setStatusFilter] = useState("All");
  const [buildingFilter, setBuildingFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // Unique buildings from data
  const uniqueBuildings = useMemo(() => {
    const set = new Set(properties.map(p => p.building));
    return Array.from(set).sort();
  }, [properties]);

  // Filtered properties
  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      if (statusFilter !== "All" && p.status !== statusFilter) return false;
      if (buildingFilter !== "All" && p.building !== buildingFilter) return false;
      if (priceFilter === "Under $1,500" && p.rentTenant >= 1500) return false;
      if (priceFilter === "$1,500 - $3,000" && (p.rentTenant < 1500 || p.rentTenant > 3000)) return false;
      if (priceFilter === "Over $3,000" && p.rentTenant <= 3000) return false;
      return true;
    });
  }, [properties, statusFilter, buildingFilter, priceFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);
  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleStatusChange = (val: string) => { setStatusFilter(val); setCurrentPage(1); };
  const handleBuildingChange = (val: string) => { setBuildingFilter(val); setCurrentPage(1); };
  const handlePriceChange = (val: string) => { setPriceFilter(val); setCurrentPage(1); };

  return (
    <>
      <Header
        title="Properties"
        actions={
          <div className="flex items-center gap-2">
            <button
              onClick={() => exportToCSV(properties.map(p => ({ ID: p.id, Name: p.name, Building: p.building, Location: p.location, Status: p.status, 'Rent (Tenant)': p.rentTenant, 'Rent (Owner)': p.rentOwner, Profit: p.profit })), 'properties')}
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
              Add Property
            </button>
          </div>
        }
      />

      <div className="p-8 space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">tune</span>
              Filters:
            </span>
            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="text-sm border border-primary/10 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="All">Status: All</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Reserved">Reserved</option>
              <option value="Maintenance">Maintenance</option>
            </select>
            <select
              value={buildingFilter}
              onChange={(e) => handleBuildingChange(e.target.value)}
              className="text-sm border border-primary/10 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="All">Building: All</option>
              {uniqueBuildings.map(b => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
            <select
              value={priceFilter}
              onChange={(e) => handlePriceChange(e.target.value)}
              className="text-sm border border-primary/10 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary"
            >
              <option value="All">Price Range: All</option>
              <option value="Under $1,500">Under $1,500</option>
              <option value="$1,500 - $3,000">$1,500 - $3,000</option>
              <option value="Over $3,000">Over $3,000</option>
            </select>
          </div>
          <span className="text-sm text-primary font-medium">{filteredProperties.length} Units Found</span>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50">
                <th className="text-left py-4 px-6 font-semibold">ID</th>
                <th className="text-left py-4 px-6 font-semibold">Property Name</th>
                <th className="text-left py-4 px-6 font-semibold">Building / Location</th>
                <th className="text-left py-4 px-6 font-semibold">Status</th>
                <th className="text-left py-4 px-6 font-semibold">Monthly Rent</th>
                <th className="text-left py-4 px-6 font-semibold">Profit</th>
                <th className="text-left py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedProperties.map((prop) => (
                <tr key={prop.id} className="border-b border-slate-50 dark:border-slate-700/50 hover:bg-primary/[0.02] dark:hover:bg-primary/5 transition-colors">
                  <td className="py-4 px-6">
                    <Link href={`/properties/${prop.id}`} className="text-sm font-semibold text-primary hover:underline">
                      #{prop.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-10 rounded-lg bg-slate-200 dark:bg-slate-700 bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${prop.image})` }}
                      />
                      <span className="text-sm font-medium dark:text-slate-200">{prop.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{prop.building}, {prop.location}</td>
                  <td className="py-4 px-6">
                    <StatusBadge label={prop.status} variant={getStatusVariant(prop.status)} />
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold dark:text-slate-200">${prop.rentTenant.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`text-sm font-semibold ${prop.profit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {prop.profit >= 0 ? "+" : ""}${prop.profit.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Link href={`/properties/${prop.id}`} className="p-1 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-xl">visibility</span>
                      </Link>
                      <button onClick={() => setModal({ mode: 'edit', property: prop })} className="p-1 text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-xl">edit</span>
                      </button>
                      <button onClick={() => setModal({ mode: 'delete', property: prop })} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                        <span className="material-symbols-outlined text-xl">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-700">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredProperties.length}
              itemsPerPage={ITEMS_PER_PAGE}
              onPageChange={setCurrentPage}
              label="results"
            />
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modal?.mode === 'add' || modal?.mode === 'edit'}
        onClose={() => setModal(null)}
        title={modal?.mode === 'edit' ? 'Edit Property' : 'Add New Property'}
        size="lg"
      >
        <PropertyForm
          property={modal?.property}
          onSubmit={(data) => {
            if (modal?.mode === 'edit') {
              updateProperty(data);
              toast("Property updated successfully", "success");
            } else {
              addProperty(data);
              toast("Property added successfully", "success");
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
        onConfirm={() => { if (modal?.property) { deleteProperty(modal.property.id); toast("Property deleted", "success"); } }}
        title="Delete Property"
        message={`Are you sure you want to delete '${modal?.property?.name}'? This action cannot be undone.`}
      />
    </>
  );
}
