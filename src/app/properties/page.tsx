"use client"

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import PropertyForm from "@/components/crud/PropertyForm";
import { useData } from "@/lib/store";
import type { Property } from "@/data/mock";

export default function PropertiesPage() {
  const { properties, addProperty, updateProperty, deleteProperty } = useData();
  const [modal, setModal] = useState<{ mode: 'add' | 'edit' | 'delete'; property?: Property } | null>(null);

  return (
    <>
      <Header
        title="Properties"
        actions={
          <button
            onClick={() => setModal({ mode: 'add' })}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Add Property
          </button>
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
            <select className="text-sm border border-primary/10 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary">
              <option>Status: All</option>
              <option>Available</option>
              <option>Occupied</option>
              <option>Reserved</option>
              <option>Maintenance</option>
            </select>
            <select className="text-sm border border-primary/10 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary">
              <option>Building</option>
            </select>
            <select className="text-sm border border-primary/10 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary/50 focus:border-primary">
              <option>Price Range</option>
            </select>
          </div>
          <span className="text-sm text-primary font-medium">{properties.length} Units Found</span>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
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
              {properties.map((prop) => (
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

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 dark:border-slate-700">
            <span className="text-sm text-primary">Showing <strong>1 to {properties.length}</strong> of <strong>{properties.length}</strong> results</span>
            <div className="flex items-center gap-1">
              <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">1</button>
            </div>
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
            if (modal?.mode === 'edit') updateProperty(data);
            else addProperty(data);
            setModal(null);
          }}
          onCancel={() => setModal(null)}
        />
      </Modal>

      {/* Delete Confirm */}
      <ConfirmDialog
        isOpen={modal?.mode === 'delete'}
        onClose={() => setModal(null)}
        onConfirm={() => { if (modal?.property) deleteProperty(modal.property.id); }}
        title="Delete Property"
        message={`Are you sure you want to delete "${modal?.property?.name}"? This action cannot be undone.`}
      />
    </>
  );
}
