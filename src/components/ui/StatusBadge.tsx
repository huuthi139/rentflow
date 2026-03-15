type Variant = "success" | "warning" | "danger" | "info" | "neutral" | "primary";

interface StatusBadgeProps {
  label: string;
  variant?: Variant;
  dot?: boolean;
}

const variantStyles: Record<Variant, string> = {
  success: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800",
  warning: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800",
  danger: "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
  info: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
  neutral: "bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600",
  primary: "bg-primary/10 text-primary border-primary/20",
};

const dotColors: Record<Variant, string> = {
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-blue-500",
  neutral: "bg-slate-400",
  primary: "bg-primary",
};

export default function StatusBadge({ label, variant = "neutral", dot = false }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${variantStyles[variant]}`}>
      {dot && <span className={`size-1.5 rounded-full ${dotColors[variant]}`} />}
      {label}
    </span>
  );
}

// Helper to map common statuses to variants
export function getStatusVariant(status: string): Variant {
  const map: Record<string, Variant> = {
    // Property
    Available: "success",
    Occupied: "info",
    Reserved: "neutral",
    Maintenance: "warning",
    Inactive: "neutral",
    // Tenant
    Active: "success",
    Lead: "info",
    Overdue: "danger",
    Former: "neutral",
    Interested: "primary",
    Viewing: "info",
    // Payment
    Paid: "success",
    Pending: "warning",
    Late: "danger",
    Partial: "warning",
    Unpaid: "danger",
    Cleared: "neutral",
    "N/A": "neutral",
    // Contract
    "Ending Soon": "warning",
    Expired: "danger",
    Terminated: "danger",
    // Maintenance
    Open: "danger",
    "In Progress": "warning",
    Resolved: "success",
    Closed: "neutral",
    // Priority
    Critical: "danger",
    High: "warning",
    Medium: "info",
    Low: "neutral",
  };
  return map[status] || "neutral";
}
