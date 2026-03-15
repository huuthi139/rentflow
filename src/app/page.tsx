import Link from "next/link";
import Header from "@/components/layout/Header";
import StatCard from "@/components/ui/StatCard";
import RevenueExpensesChart from "@/components/charts/RevenueExpensesChart";
import OccupancyDonut from "@/components/charts/OccupancyDonut";
import { dashboardKPIs, leaseExpirations, maintenanceTickets, revenueData } from "@/data/mock";

export default function DashboardPage() {
  const kpi = dashboardKPIs;

  return (
    <>
      <Header
        title="Dashboard Overview"
        actions={
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-primary/20 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-primary/5 transition-colors">
              <span className="material-symbols-outlined text-lg">calendar_today</span>
              Last 30 Days
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-lg">add</span>
              Add Property
            </button>
          </div>
        }
      />

      <div className="p-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard label="Total Properties" value={kpi.totalProperties.toLocaleString()} change={kpi.totalPropertiesChange} icon="home_work" />
          <StatCard label="Occupied" value={kpi.occupied.toLocaleString()} change={kpi.occupiedChange} icon="meeting_room" />
          <StatCard label="Vacant" value={kpi.vacant.toString()} change={kpi.vacantChange} icon="door_open" />
          <StatCard label="Total Revenue" value={`$${(kpi.totalRevenue / 1000).toFixed(0)}k`} change={kpi.revenueChange} icon="attach_money" />
          <StatCard label="Monthly Profit" value={`$${(kpi.monthlyProfit / 1000).toFixed(0)}k`} change={kpi.profitChange} icon="trending_up" />
          <StatCard label="Maint. Tickets" value={kpi.maintenanceTickets.toString()} change={kpi.maintenanceChange} icon="build" iconColor="text-amber-500" />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue vs Expenses Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">Revenue vs Expenses</h3>
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-primary" />
                  Revenue
                </span>
                <span className="flex items-center gap-2">
                  <span className="size-3 rounded-full bg-primary/30" />
                  Expenses
                </span>
              </div>
            </div>
            <RevenueExpensesChart data={revenueData} />
          </div>

          {/* Occupancy Rate */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
            <h3 className="text-lg font-bold mb-2">Occupancy Rate</h3>
            <OccupancyDonut />
            <div className="space-y-2 mt-2">
              {["Q1", "Q2", "Q3", "Q4"].map((q, i) => (
                <div key={q} className="flex items-center justify-between text-sm">
                  <span className="text-slate-500 dark:text-slate-400">{q}</span>
                  <div className="w-32 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${75 + i * 5}%` }} />
                  </div>
                  <span className="font-medium">{75 + i * 5}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Upcoming Lease Expirations */}
          <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Upcoming Lease Expirations</h3>
              <Link href="/contracts" className="text-primary text-sm font-bold hover:underline">View All</Link>
            </div>
            <table className="w-full">
              <thead>
                <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-700">
                  <th className="text-left py-3 font-semibold">Tenant Name</th>
                  <th className="text-left py-3 font-semibold">Property</th>
                  <th className="text-left py-3 font-semibold">Expiry Date</th>
                  <th className="text-left py-3 font-semibold">Days Left</th>
                  <th className="text-left py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaseExpirations.map((lease, i) => (
                  <tr key={i} className="border-b border-slate-50 dark:border-slate-700 hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                          {lease.tenant.split(" ").map(n => n[0]).join("")}
                        </div>
                        <span className="text-sm font-medium hover:text-primary cursor-pointer transition-colors">{lease.tenant}</span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-slate-600 dark:text-slate-400">{lease.property}</td>
                    <td className="py-3 text-sm text-slate-600 dark:text-slate-400">{lease.expiryDate}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold ${
                        lease.daysLeft <= 14 ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400" : "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}>
                        {lease.daysLeft} Days
                      </span>
                    </td>
                    <td className="py-3">
                      <button className="text-slate-400 hover:text-primary transition-colors">
                        <span className="material-symbols-outlined text-lg">more_vert</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Maintenance Issues */}
          <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Maintenance Issues</h3>
              <button className="text-slate-400 hover:text-primary transition-colors">
                <span className="material-symbols-outlined">tune</span>
              </button>
            </div>
            <div className="space-y-4">
              {maintenanceTickets.slice(0, 4).map((ticket) => (
                <div key={ticket.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/[0.02] dark:hover:bg-slate-700/50 transition-colors">
                  <div className={`size-10 rounded-lg flex items-center justify-center shrink-0 ${
                    ticket.priority === "High" || ticket.priority === "Critical"
                      ? "bg-red-50 text-red-500 dark:bg-red-900/30 dark:text-red-400"
                      : "bg-amber-50 text-amber-500 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}>
                    <span className="material-symbols-outlined text-xl">
                      {ticket.type === "Plumbing" ? "water_drop" :
                       ticket.type === "Electrical" ? "bolt" :
                       ticket.type === "HVAC" ? "ac_unit" :
                       ticket.type === "Lock" ? "lock" : "build"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold truncate">{ticket.description.split(" - ")[0]}</p>
                      <span className={`shrink-0 px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        ticket.priority === "High" || ticket.priority === "Critical"
                          ? "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                      }`}>
                        {ticket.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{ticket.property}</p>
                    <p className="text-xs text-slate-400 mt-0.5">Opened {ticket.reportDate}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
