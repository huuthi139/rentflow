"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { globalSearch } from "@/lib/search";

interface GlobalSearchResultsProps {
  query: string;
  onClose: () => void;
  onSelect: () => void;
}

export default function GlobalSearchResults({ query, onClose, onSelect }: GlobalSearchResultsProps) {
  const results = useMemo(() => globalSearch(query), [query]);

  const hasResults =
    results.properties.length > 0 ||
    results.tenants.length > 0 ||
    results.contracts.length > 0 ||
    results.maintenance.length > 0;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (query.length < 2) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 shadow-xl rounded-xl border border-slate-200 dark:border-slate-700 max-h-96 overflow-y-auto z-50">
      {!hasResults && (
        <div className="px-4 py-8 text-center text-slate-400 dark:text-slate-500 text-sm">
          <span className="material-symbols-outlined text-3xl mb-2 block">search_off</span>
          No results found for &ldquo;{query}&rdquo;
        </div>
      )}

      {/* Properties */}
      {results.properties.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
            Properties
          </div>
          {results.properties.map((p) => (
            <Link
              key={p.id}
              href={`/properties/${p.id}`}
              onClick={onSelect}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-xl">apartment</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{p.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{p.building} &middot; {p.location}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                p.status === "Available" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                p.status === "Occupied" ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" :
                p.status === "Maintenance" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
              }`}>
                {p.status}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Tenants */}
      {results.tenants.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
            Tenants
          </div>
          {results.tenants.map((t) => (
            <Link
              key={t.id}
              href={`/tenants/${t.id}`}
              onClick={onSelect}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-xl">person</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{t.name}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{t.email} &middot; {t.phone}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                t.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                t.status === "Overdue" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
              }`}>
                {t.status}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Contracts */}
      {results.contracts.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
            Contracts
          </div>
          {results.contracts.map((c) => (
            <Link
              key={c.id}
              href="/contracts"
              onClick={onSelect}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-xl">description</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{c.id} &mdash; {c.tenant}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{c.property} &middot; ${c.rentPrice.toLocaleString()}/mo</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                c.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" :
                c.status === "Ending Soon" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                c.status === "Expired" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
              }`}>
                {c.status}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Maintenance */}
      {results.maintenance.length > 0 && (
        <div>
          <div className="px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider bg-slate-50 dark:bg-slate-800/80 border-b border-slate-100 dark:border-slate-700">
            Maintenance
          </div>
          {results.maintenance.map((m) => (
            <Link
              key={m.id}
              href="/maintenance"
              onClick={onSelect}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
            >
              <span className="material-symbols-outlined text-primary text-xl">build</span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200 truncate">{m.id} &mdash; {m.description}</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{m.property} &middot; {m.type}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                m.priority === "Critical" ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400" :
                m.priority === "High" ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                "bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
              }`}>
                {m.priority}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Footer hint */}
      {hasResults && (
        <div className="px-4 py-2 text-xs text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-center">
          Press <kbd className="px-1.5 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-[10px] font-mono">ESC</kbd> to close
        </div>
      )}
    </div>
  );
}
