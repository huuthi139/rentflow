"use client";

import { useState, useEffect } from "react";
import NotificationPanel from "./NotificationPanel";

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored === "dark" || (!stored && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function toggleDarkMode() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }

  const unreadCount = 3; // matches the 3 unread notifications in NotificationPanel

  return (
    <header className="h-16 border-b border-primary/10 bg-white px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 md:gap-6">
        {/* Spacer for mobile hamburger button */}
        <div className="w-10 md:hidden" />
        <div>
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
        </div>
        <div className="hidden sm:flex items-center bg-background-light rounded-lg px-3 py-2 w-80">
          <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
          <input
            className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full placeholder:text-slate-400 ml-2"
            placeholder="Search tenants, properties, transactions..."
            type="text"
          />
        </div>
      </div>
      <div className="flex items-center gap-3">
        {actions}
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="material-symbols-outlined">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </button>
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative p-2 text-slate-500 hover:bg-slate-100 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] bg-danger text-white text-[10px] font-bold rounded-full ring-2 ring-white px-1">
                {unreadCount}
              </span>
            )}
          </button>
          <NotificationPanel open={notifOpen} onClose={() => setNotifOpen(false)} />
        </div>
      </div>
    </header>
  );
}
