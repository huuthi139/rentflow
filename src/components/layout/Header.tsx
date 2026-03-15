"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import NotificationPanel from "./NotificationPanel";
import GlobalSearchResults from "./GlobalSearchResults";
import { useNotifications } from "@/lib/notifications";

interface HeaderProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export default function Header({ title, subtitle, actions }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedQuery(searchQuery), 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    setSearchOpen(debouncedQuery.length >= 2);
  }, [debouncedQuery]);

  // Click outside to close search
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Cmd+K shortcut
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const closeSearch = useCallback(() => {
    setSearchQuery("");
    setDebouncedQuery("");
    setSearchOpen(false);
  }, []);

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

  const { unreadCount } = useNotifications();

  return (
    <header className="h-16 border-b border-primary/10 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 md:px-8 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="w-10 md:hidden" />
        <div>
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500 dark:text-slate-400">{subtitle}</p>}
        </div>
        <div ref={searchRef} className="hidden sm:block relative">
          <div className="flex items-center bg-background-light dark:bg-slate-900 rounded-lg px-3 py-2 w-80">
            <span className="material-symbols-outlined text-slate-400 text-lg">search</span>
            <input
              ref={searchInputRef}
              className="bg-transparent border-none focus:ring-0 focus:outline-none text-sm w-full placeholder:text-slate-400 dark:text-slate-200 ml-2"
              placeholder="Search tenants, properties, transactions..."
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button onClick={closeSearch} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            )}
            {!searchQuery && (
              <kbd className="hidden lg:inline text-[10px] text-slate-400 bg-slate-200 dark:bg-slate-700 px-1.5 py-0.5 rounded font-mono">⌘K</kbd>
            )}
          </div>
          {searchOpen && <GlobalSearchResults query={debouncedQuery} onClose={closeSearch} onSelect={closeSearch} />}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <button
          onClick={toggleDarkMode}
          className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          title={isDark ? "Switch to light mode" : "Switch to dark mode"}
        >
          <span className="material-symbols-outlined">
            {isDark ? "light_mode" : "dark_mode"}
          </span>
        </button>
        <div className="relative">
          <button
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined">notifications</span>
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] bg-danger text-white text-[10px] font-bold rounded-full ring-2 ring-white dark:ring-slate-800 px-1">
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
