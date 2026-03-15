"use client";

import { useState } from "react";
import Header from "@/components/layout/Header";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import Modal from "@/components/ui/Modal";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import BookingForm from "@/components/crud/BookingForm";
import { useData } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { exportToCSV } from "@/lib/export";
import type { Booking } from "@/lib/types";

const tabs = ["All", "Scheduled", "Completed", "Cancelled"];
const statusVariantMap: Record<string, "info" | "success" | "neutral" | "danger"> = { Scheduled: "info", Completed: "success", Cancelled: "neutral", "No Show": "danger" };

function formatDateTime(dateTime: string) {
  try {
    return new Date(dateTime).toLocaleString("en-US", { month: "short", day: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
  } catch {
    return dateTime;
  }
}

export default function BookingsPage() {
  const { bookings, addBooking, updateBooking, deleteBooking } = useData();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | undefined>(undefined);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);

  const filtered = bookings.filter((b) => activeTab === "All" ? true : b.status === activeTab);
  const todayStr = new Date().toISOString().split("T")[0];
  const todayCount = bookings.filter((b) => b.dateTime.startsWith(todayStr)).length;

  const handleAdd = () => { setEditingBooking(undefined); setModalOpen(true); };
  const handleEdit = (booking: Booking) => { setEditingBooking(booking); setModalOpen(true); };
  const handleSubmit = (data: Booking) => {
    if (editingBooking) {
      updateBooking(data);
      toast("Booking updated successfully", "success");
    } else {
      addBooking(data);
      toast("Booking added successfully", "success");
    }
    setModalOpen(false);
  };
  const handleDelete = () => {
    if (deleteTarget) {
      deleteBooking(deleteTarget);
      toast("Booking deleted", "success");
      setDeleteTarget(null);
    }
  };
  const handleExport = () => {
    exportToCSV(bookings.map(b => ({ ID: b.id, Tenant: b.tenant, Property: b.property, Agent: b.agent, DateTime: b.dateTime, Notes: b.notes, Status: b.status })), "bookings");
    toast("CSV exported", "info");
  };

  return (
    <>
      <Header title="Bookings" subtitle="Manage property viewing appointments" actions={
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="flex items-center gap-2 px-4 py-2 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-medium hover:bg-primary/5 transition-colors"><span className="material-symbols-outlined text-lg">download</span>Export CSV</button>
          <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity"><span className="material-symbols-outlined text-lg">add</span>New Booking</button>
        </div>
      } />

      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatCard label="Today's Bookings" value={todayCount} icon="today" />
          <StatCard label="Total Bookings" value={bookings.length} icon="date_range" />
          <StatCard label="Completed" value={bookings.filter((b) => b.status === "Completed").length} icon="check_circle" iconColor="text-emerald-600" />
          <StatCard label="No Shows" value={bookings.filter((b) => b.status === "No Show").length} icon="person_off" iconColor="text-red-500" />
        </div>

        <div className="flex items-center gap-2">
          {tabs.map((tab) => (<button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${activeTab === tab ? "bg-primary text-white" : "bg-white dark:bg-slate-800 border border-primary/10 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-primary/5"}`}>{tab}</button>))}
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
          <table className="w-full"><thead><tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50"><th className="text-left py-4 px-6 font-semibold">ID</th><th className="text-left py-4 px-6 font-semibold">Client</th><th className="text-left py-4 px-6 font-semibold">Property</th><th className="text-left py-4 px-6 font-semibold">Agent</th><th className="text-left py-4 px-6 font-semibold">Date & Time</th><th className="text-left py-4 px-6 font-semibold">Status</th><th className="text-left py-4 px-6 font-semibold">Actions</th></tr></thead>
          <tbody>{filtered.length === 0 ? (
            <tr><td colSpan={7} className="py-12 text-center text-sm text-slate-400">No bookings found</td></tr>
          ) : filtered.map((b) => (
            <tr key={b.id} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
              <td className="py-4 px-6 text-sm font-semibold text-primary">{b.id}</td>
              <td className="py-4 px-6"><p className="text-sm font-medium">{b.tenant}</p>{b.notes && <p className="text-xs text-slate-400 mt-0.5">{b.notes}</p>}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{b.property}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{b.agent}</td>
              <td className="py-4 px-6 text-sm text-slate-600 dark:text-slate-400">{formatDateTime(b.dateTime)}</td>
              <td className="py-4 px-6"><StatusBadge label={b.status} variant={statusVariantMap[b.status] || "neutral"} dot /></td>
              <td className="py-4 px-6"><div className="flex items-center gap-1">
                <button onClick={() => handleEdit(b)} className="p-1.5 text-slate-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">edit</span></button>
                <button onClick={() => setDeleteTarget(b.id)} className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"><span className="material-symbols-outlined text-lg">delete</span></button>
              </div></td>
            </tr>
          ))}</tbody></table>
          </div>
        </div>
      </div>

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingBooking ? "Edit Booking" : "New Booking"} size="lg">
        <BookingForm booking={editingBooking} onSubmit={handleSubmit} onCancel={() => setModalOpen(false)} />
      </Modal>

      <ConfirmDialog isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} onConfirm={handleDelete} title="Delete Booking" message="Are you sure you want to delete this booking? This action cannot be undone." />
    </>
  );
}
