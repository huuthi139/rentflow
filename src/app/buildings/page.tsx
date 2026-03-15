"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "@/components/layout/Header";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import BuildingForm from "@/components/crud/BuildingForm";
import { useData } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { exportToCSV } from "@/lib/export";
import type { Building } from "@/data/mock";

export default function BuildingsPage() {
  const { buildings, addBuilding, updateBuilding, deleteBuilding } = useData();
  const { toast } = useToast();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBuilding, setEditingBuilding] = useState<Building | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const handleAdd = () => { setEditingBuilding(undefined); setModalOpen(true); };
  const handleEdit = (building: Building, e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setEditingBuilding(building); setModalOpen(true); };
  const handleSubmit = (data: Building) => {
    if (editingBuilding) {
      updateBuilding(data);
      toast("Building updated successfully", "success");
    } else {
      addBuilding(data);
      toast("Building added successfully", "success");
    }
    setModalOpen(false);
  };
  const handleDelete = () => {
    if (deleteTarget) {
      deleteBuilding(deleteTarget);
      toast("Building deleted", "success");
      setDeleteTarget(null);
    }
  };
  const handleDeleteClick = (id: string, e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); setDeleteTarget(id); };
  const handleExport = () => {
    exportToCSV(buildings.map(b => ({ ID: b.id, Name: b.name, Address: b.address, City: b.city, Floors: b.floors, Units: b.units, Owner: b.owner, ServiceFee: b.serviceFee })), "buildings");
    toast("CSV exported", "info");
  };

  return (
    <>
      <Header
        title="Buildings"
        subtitle="Manage all building properties"
        actions={
          <div className="flex items-center gap-2">
            <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors"><span className="material-symbols-outlined text-lg">download</span>Export CSV</button>
            <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-lg">add</span>
              Add Building
            </button>
          </div>
        }
      />

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <Link key={building.id} href={`/buildings/${building.id}`} className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer block">
              <div
                className="h-48 bg-slate-200 dark:bg-slate-700 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${building.image})` }}
              />
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{building.name}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {building.address}, {building.city}
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">{building.id}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-700">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{building.floors}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Floors</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{building.units}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Units</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">${building.serviceFee.toLocaleString()}</p>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">Fee/mo</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Owner:</span> {building.owner}
                  </p>
                  <div className="flex items-center gap-1">
                    <button onClick={(e) => handleEdit(building, e)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                    <button onClick={(e) => handleDeleteClick(building.id, e)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingBuilding ? "Edit Building" : "Add Building"} size="lg">
        <BuildingForm building={editingBuilding} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Building" message="Are you sure you want to delete this building? This action cannot be undone." />
    </>
  );
}
