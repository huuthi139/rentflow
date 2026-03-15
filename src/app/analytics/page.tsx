import Header from "@/components/layout/Header";
import RevenueTrendChart from "@/components/charts/RevenueTrendChart";
import ExpensesPieChart from "@/components/charts/ExpensesPieChart";
import { revenueData, dashboardKPIs, properties } from "@/data/mock";

export default function AnalyticsPage() {
  const totalRevenue = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalExpenses = revenueData.reduce((s, d) => s + d.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;

  const topProperties = [...properties]
    .sort((a, b) => b.profit - a.profit)
    .slice(0, 5);

  const highCostProperties = [...properties]
    .sort((a, b) => b.operatingCost - a.operatingCost)
    .slice(0, 5);

  return (
    <>
      <Header
        title="Analytics"
        subtitle="Financial reports and property insights"
        actions={
          <div className="flex items-center gap-3">
            <select className="text-sm border border-primary/10 dark:border-slate-700 rounded-lg px-3 py-2 bg-white dark:bg-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-primary/50">
              <option>Last 6 Months</option>
              <option>Last 12 Months</option>
              <option>Year to Date</option>
            </select>
            <button className="flex items-center gap-2 px-4 py-2 border border-primary/10 dark:border-slate-700 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-lg">download</span>
              Export Report
            </button>
          </div>
        }
      />

      <div className="p-8 space-y-8">
        {/* Financial Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Revenue (6M)</p>
            <p className="text-3xl font-bold text-primary">${(totalRevenue / 1000).toFixed(0)}k</p>
            <div className="mt-3 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full" style={{ width: "100%" }} />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Expenses (6M)</p>
            <p className="text-3xl font-bold text-amber-600">${(totalExpenses / 1000).toFixed(0)}k</p>
            <div className="mt-3 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-amber-500 rounded-full" style={{ width: `${(totalExpenses / totalRevenue) * 100}%` }} />
            </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-1">Net Profit (6M)</p>
            <p className="text-3xl font-bold text-emerald-600">${(totalProfit / 1000).toFixed(0)}k</p>
            <div className="mt-3 h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(totalProfit / totalRevenue) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Revenue */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-bold dark:text-slate-200 mb-6">Monthly Revenue Trend</h3>
            <RevenueTrendChart data={revenueData} />
          </div>

          {/* Profit Margin */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-bold dark:text-slate-200 mb-6">Profit Margin by Month</h3>
            <ExpensesPieChart />
          </div>
        </div>

        {/* Property Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Profit Properties */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-bold dark:text-slate-200 mb-4">Top Profit Properties</h3>
            <div className="space-y-3">
              {topProperties.map((prop, i) => (
                <div key={prop.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-lg font-bold text-slate-300 dark:text-slate-600 w-6 text-center">#{i + 1}</span>
                  <div
                    className="size-10 rounded-lg bg-slate-200 dark:bg-slate-700 bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url(${prop.image})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold dark:text-slate-200 truncate">{prop.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{prop.building}</p>
                  </div>
                  <span className="text-sm font-bold text-emerald-600">+${prop.profit.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Highest Cost Properties */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-bold dark:text-slate-200 mb-4">Highest Cost Properties</h3>
            <div className="space-y-3">
              {highCostProperties.map((prop, i) => (
                <div key={prop.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
                  <span className="text-lg font-bold text-slate-300 dark:text-slate-600 w-6 text-center">#{i + 1}</span>
                  <div
                    className="size-10 rounded-lg bg-slate-200 dark:bg-slate-700 bg-cover bg-center shrink-0"
                    style={{ backgroundImage: `url(${prop.image})` }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold dark:text-slate-200 truncate">{prop.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{prop.building}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-amber-600">${prop.operatingCost}/mo</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Rent: ${prop.rentOwner.toLocaleString()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Occupancy */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
          <h3 className="text-lg font-bold dark:text-slate-200 mb-4">Property Status Breakdown</h3>
          <div className="grid grid-cols-5 gap-4">
            {(["Available", "Occupied", "Reserved", "Maintenance", "Inactive"] as const).map((status) => {
              const count = properties.filter(p => p.status === status).length;
              const pct = (count / properties.length) * 100;
              const colors: Record<string, string> = {
                Available: "bg-emerald-500",
                Occupied: "bg-blue-500",
                Reserved: "bg-slate-400",
                Maintenance: "bg-amber-500",
                Inactive: "bg-slate-300",
              };
              return (
                <div key={status} className="text-center">
                  <div className="h-24 bg-slate-50 dark:bg-slate-900 rounded-lg flex items-end justify-center p-2 mb-2">
                    <div className={`w-12 ${colors[status]} rounded-t-sm`} style={{ height: `${Math.max(pct * 2, 10)}%` }} />
                  </div>
                  <p className="text-2xl font-bold dark:text-slate-200">{count}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{status}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
