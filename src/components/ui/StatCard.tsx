interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: string;
  iconColor?: string;
}

export default function StatCard({ label, value, change, changeLabel, icon, iconColor = "text-primary" }: StatCardProps) {
  const isPositive = change !== undefined && change >= 0;

  return (
    <div className="bg-white p-6 rounded-xl border border-primary/10 flex flex-col gap-2 shadow-sm">
      <div className="flex justify-between items-start">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        {icon && (
          <span className={`material-symbols-outlined text-xl ${iconColor}`}>{icon}</span>
        )}
      </div>
      <p className="text-3xl font-bold tracking-tight">{value}</p>
      {change !== undefined && (
        <p className={`text-sm font-medium flex items-center gap-1 ${isPositive ? "text-emerald-600" : "text-red-500"}`}>
          <span className="material-symbols-outlined text-sm">
            {isPositive ? "trending_up" : "trending_down"}
          </span>
          {isPositive ? "+" : ""}{change}% {changeLabel || "vs last month"}
        </p>
      )}
    </div>
  );
}
