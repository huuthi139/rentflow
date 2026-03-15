"use client";

import { useRef, useEffect } from "react";

const notifications = [
  { id: 1, type: "payment", title: "Payment Received", desc: "Sarah Jenkins paid $2,400 for Skyline Tower A, 402", time: "2h ago", read: false },
  { id: 2, type: "maintenance", title: "New Maintenance Request", desc: "Water leak reported at Grand Plaza #102", time: "3h ago", read: false },
  { id: 3, type: "contract", title: "Contract Expiring Soon", desc: "Linda Wright's contract expires in 14 days", time: "5h ago", read: false },
  { id: 4, type: "lead", title: "New Lead Assigned", desc: "Jessica Nguyen interested in Oakwood Apt 4B", time: "1d ago", read: true },
  { id: 5, type: "booking", title: "Booking Confirmed", desc: "Property viewing scheduled for tomorrow 10:00 AM", time: "1d ago", read: true },
  { id: 6, type: "issue", title: "Issue Resolved", desc: "WiFi router replaced at Landmark Tower, 1205", time: "2d ago", read: true },
];

const typeStyles: Record<string, { bg: string; text: string; icon: string }> = {
  payment: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", icon: "payments" },
  maintenance: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400", icon: "build" },
  contract: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", icon: "description" },
  lead: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", icon: "person_add" },
  booking: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400", icon: "calendar_month" },
  issue: { bg: "bg-primary/10", text: "text-primary", icon: "check_circle" },
};

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, onClose]);

  if (!open) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-96 max-h-[480px] overflow-y-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700 sticky top-0 bg-white dark:bg-slate-800 rounded-t-xl">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <span className="bg-primary text-white text-[11px] font-medium px-1.5 py-0.5 rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button className="text-xs text-primary hover:text-primary-dark font-medium transition-colors">
          Mark all read
        </button>
      </div>

      {/* Notification items */}
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {notifications.map((n) => {
          const style = typeStyles[n.type];
          return (
            <div
              key={n.id}
              className={`flex items-start gap-3 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition-colors ${
                !n.read ? "bg-primary/[0.03]" : ""
              }`}
            >
              <div className={`shrink-0 size-9 rounded-full flex items-center justify-center ${style.bg}`}>
                <span className={`material-symbols-outlined text-lg ${style.text}`}>{style.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{n.title}</p>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="text-[11px] text-slate-400">{n.time}</span>
                    {!n.read && <span className="size-2 bg-primary rounded-full" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="sticky bottom-0 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 rounded-b-xl">
        <button className="w-full py-2.5 text-sm text-primary hover:text-primary-dark font-medium transition-colors">
          View All Notifications
        </button>
      </div>
    </div>
  );
}
