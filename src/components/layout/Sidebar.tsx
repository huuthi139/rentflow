"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: "dashboard", label: "Dashboard", href: "/" },
  { icon: "corporate_fare", label: "Buildings", href: "/buildings" },
  { icon: "house", label: "Properties", href: "/properties" },
  { icon: "group", label: "Tenants", href: "/tenants" },
  { icon: "leaderboard", label: "Leads", href: "/leads" },
  { icon: "description", label: "Contracts", href: "/contracts" },
  { icon: "calendar_month", label: "Bookings", href: "/bookings" },
  { icon: "payments", label: "Payments", href: "/payments" },
  { icon: "receipt_long", label: "Expenses", href: "/expenses" },
  { icon: "build", label: "Maintenance", href: "/maintenance" },
  { icon: "fact_check", label: "Handovers", href: "/handovers" },
  { icon: "report_problem", label: "Issues", href: "/issues" },
  { icon: "bar_chart", label: "Analytics", href: "/analytics" },
];

const systemItems = [
  { icon: "settings", label: "Settings", href: "/settings" },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <aside
      className={`
        w-64 flex-shrink-0 border-r border-primary/10 bg-white flex flex-col h-screen
        fixed md:sticky top-0 z-40 md:z-auto
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
      `}
    >
      {/* Logo + Mobile close button */}
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="size-9 bg-primary rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-xl">domain</span>
          </div>
          <div>
            <h1 className="text-lg font-bold leading-tight tracking-tight">RentFlow</h1>
            <p className="text-[11px] text-primary font-medium">Property Management</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="md:hidden p-1 text-slate-400 hover:text-primary transition-colors"
          aria-label="Close menu"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-primary/10 text-primary"
                : "text-slate-600 hover:bg-primary/5 hover:text-primary"
            }`}
          >
            <span
              className={`material-symbols-outlined text-xl ${isActive(item.href) ? "filled" : ""}`}
            >
              {item.icon}
            </span>
            {item.label}
          </Link>
        ))}

        <div className="pt-6 pb-2 px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
          System
        </div>
        {systemItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isActive(item.href)
                ? "bg-primary/10 text-primary"
                : "text-slate-600 hover:bg-primary/5 hover:text-primary"
            }`}
          >
            <span className="material-symbols-outlined text-xl">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-primary/10">
        <div className="flex items-center gap-3 p-2">
          <div className="size-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
            AR
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">Alex Rivera</p>
            <p className="text-xs text-slate-500 truncate">Property Manager</p>
          </div>
          <button className="text-slate-400 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">settings</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
