// ============================================
// UTILITIES - RentFlow SaaS
// ============================================

/**
 * Merge class names, filtering out falsy values.
 * Simple version without clsx dependency.
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Format a number as USD currency: $X,XXX.XX
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Format a date string or Date object into a readable format.
 * Returns "MMM DD, YYYY" (e.g., "Oct 12, 2023").
 */
export function formatDate(date: string | Date): string {
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return date as string;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
}

/**
 * Get initials from a full name.
 * "Sarah Jenkins" -> "SJ"
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, 2)
    .join("");
}

/**
 * Return a Tailwind color class based on a status string.
 */
export function getStatusColor(status: string): string {
  const statusMap: Record<string, string> = {
    // Property statuses
    Available: "bg-green-100 text-green-800",
    Occupied: "bg-blue-100 text-blue-800",
    Reserved: "bg-yellow-100 text-yellow-800",
    Maintenance: "bg-orange-100 text-orange-800",
    Inactive: "bg-gray-100 text-gray-800",

    // Tenant statuses
    Active: "bg-green-100 text-green-800",
    Lead: "bg-purple-100 text-purple-800",
    Overdue: "bg-red-100 text-red-800",
    Former: "bg-gray-100 text-gray-800",
    Interested: "bg-cyan-100 text-cyan-800",
    Viewing: "bg-indigo-100 text-indigo-800",

    // Payment statuses
    Paid: "bg-green-100 text-green-800",
    Unpaid: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800",
    Late: "bg-red-100 text-red-800",
    Partial: "bg-amber-100 text-amber-800",
    Cleared: "bg-green-100 text-green-800",
    "N/A": "bg-gray-100 text-gray-500",

    // Contract statuses
    "Ending Soon": "bg-orange-100 text-orange-800",
    Expired: "bg-red-100 text-red-800",
    Terminated: "bg-red-100 text-red-800",

    // Maintenance statuses
    Open: "bg-red-100 text-red-800",
    "In Progress": "bg-blue-100 text-blue-800",
    Resolved: "bg-green-100 text-green-800",
    Closed: "bg-gray-100 text-gray-800",

    // Maintenance priorities
    Critical: "bg-red-100 text-red-800",
    High: "bg-orange-100 text-orange-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-green-100 text-green-800",

    // Booking statuses
    Scheduled: "bg-blue-100 text-blue-800",
    Completed: "bg-green-100 text-green-800",
    Cancelled: "bg-gray-100 text-gray-800",
    "No Show": "bg-red-100 text-red-800",

    // Lead stages
    Contacted: "bg-blue-100 text-blue-800",
    Negotiating: "bg-amber-100 text-amber-800",
    Signed: "bg-green-100 text-green-800",

    // Issue severity
    Major: "bg-orange-100 text-orange-800",
    Minor: "bg-yellow-100 text-yellow-800",
    Cosmetic: "bg-gray-100 text-gray-800",

    // Issue status
    Investigating: "bg-blue-100 text-blue-800",
  };

  return statusMap[status] || "bg-gray-100 text-gray-800";
}

/**
 * Calculate profit from income and expenses.
 */
export function calculateProfit(income: number, expenses: number): number {
  return income - expenses;
}

let _idCounter = 1000;

/**
 * Generate a sequential ID with a prefix.
 * generateId("RF") -> "RF-1001", "RF-1002", etc.
 */
export function generateId(prefix: string): string {
  _idCounter += 1;
  return `${prefix}-${_idCounter}`;
}
