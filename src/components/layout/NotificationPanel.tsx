"use client";

import { useRef, useEffect } from "react";
import { useNotifications, type AppNotification } from "@/lib/notifications";

const typeStyles: Record<string, { bg: string; text: string; icon: string }> = {
  payment: { bg: "bg-emerald-100 dark:bg-emerald-900/30", text: "text-emerald-600 dark:text-emerald-400", icon: "payments" },
  maintenance: { bg: "bg-red-100 dark:bg-red-900/30", text: "text-red-600 dark:text-red-400", icon: "build" },
  contract: { bg: "bg-amber-100 dark:bg-amber-900/30", text: "text-amber-600 dark:text-amber-400", icon: "description" },
  lead: { bg: "bg-blue-100 dark:bg-blue-900/30", text: "text-blue-600 dark:text-blue-400", icon: "person_add" },
  booking: { bg: "bg-purple-100 dark:bg-purple-900/30", text: "text-purple-600 dark:text-purple-400", icon: "calendar_month" },
  issue: { bg: "bg-primary/10", text: "text-primary", icon: "check_circle" },
  property: { bg: "bg-indigo-100 dark:bg-indigo-900/30", text: "text-indigo-600 dark:text-indigo-400", icon: "house" },
  tenant: { bg: "bg-teal-100 dark:bg-teal-900/30", text: "text-teal-600 dark:text-teal-400", icon: "group" },
  building: { bg: "bg-orange-100 dark:bg-orange-900/30", text: "text-orange-600 dark:text-orange-400", icon: "corporate_fare" },
  expense: { bg: "bg-pink-100 dark:bg-pink-900/30", text: "text-pink-600 dark:text-pink-400", icon: "receipt_long" },
  handover: { bg: "bg-cyan-100 dark:bg-cyan-900/30", text: "text-cyan-600 dark:text-cyan-400", icon: "fact_check" },
  info: { bg: "bg-slate-100 dark:bg-slate-700", text: "text-slate-600 dark:text-slate-400", icon: "info" },
};

function formatTimeAgo(isoString: string): string {
  const now = Date.now();
  const then = new Date(isoString).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHr = Math.floor(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h ago`;
  const diffDay = Math.floor(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d ago`;
  return new Date(isoString).toLocaleDateString();
}

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

export default function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAllRead, clearAll } = useNotifications();

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

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 max-h-[480px] overflow-y-auto bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50"
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
        <button
          onClick={markAllRead}
          className="text-xs text-primary hover:text-primary-dark font-medium transition-colors"
        >
          Mark all read
        </button>
      </div>

      {/* Notification items */}
      <div className="divide-y divide-slate-100 dark:divide-slate-700">
        {notifications.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <span className="material-symbols-outlined text-3xl text-slate-300 dark:text-slate-600">notifications_off</span>
            <p className="text-sm text-slate-400 dark:text-slate-500 mt-2">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => {
            const style = typeStyles[n.type] || typeStyles.info;
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
                      <span className="text-[11px] text-slate-400">{formatTimeAgo(n.time)}</span>
                      {!n.read && <span className="size-2 bg-primary rounded-full" />}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.desc}</p>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="sticky bottom-0 bg-white dark:bg-slate-800 border-t border-slate-100 dark:border-slate-700 rounded-b-xl">
          <button
            onClick={clearAll}
            className="w-full py-2.5 text-sm text-slate-500 hover:text-red-500 font-medium transition-colors"
          >
            Clear All
          </button>
        </div>
      )}
    </div>
  );
}
