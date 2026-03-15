import Link from "next/link";
import Header from "@/components/layout/Header";
import StatusBadge, { getStatusVariant } from "@/components/ui/StatusBadge";
import { properties } from "@/data/mock";

export default function PropertiesPage() {
  return (
    <>
      <Header
        title="Properties"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-lg">add</span>
            Add Property
          </button>
        }
      />

      <div className="p-8 space-y-6">
        {/* Filters */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">tune</span>
              Filters:
            </span>
            <select className="text-sm border border-primary/10 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary">
              <option>Status: All</option>
              <option>Available</option>
              <option>Occupied</option>
              <option>Reserved</option>
              <option>Maintenance</option>
            </select>
            <select className="text-sm border border-primary/10 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary">
              <option>Building</option>
            </select>
            <select className="text-sm border border-primary/10 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-primary/50 focus:border-primary">
              <option>Price Range</option>
            </select>
          </div>
          <span className="text-sm text-primary font-medium">1,248 Units Found</span>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase tracking-wider text-slate-400 border-b border-slate-100 bg-slate-50/50">
                <th className="text-left py-4 px-6 font-semibold">ID</th>
                <th className="text-left py-4 px-6 font-semibold">Property Name</th>
                <th className="text-left py-4 px-6 font-semibold">Building / Location</th>
                <th className="text-left py-4 px-6 font-semibold">Status</th>
                <th className="text-left py-4 px-6 font-semibold">Monthly Rent</th>
                <th className="text-left py-4 px-6 font-semibold">Profit</th>
                <th className="text-left py-4 px-6 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((prop) => (
                <tr key={prop.id} className="border-b border-slate-50 hover:bg-primary/[0.02] transition-colors">
                  <td className="py-4 px-6">
                    <Link href={`/properties/${prop.id}`} className="text-sm font-semibold text-primary hover:underline">
                      #{prop.id}
                    </Link>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div
                        className="size-10 rounded-lg bg-slate-200 bg-cover bg-center shrink-0"
                        style={{ backgroundImage: `url(${prop.image})` }}
                      />
                      <span className="text-sm font-medium">{prop.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600">{prop.building}, {prop.location}</td>
                  <td className="py-4 px-6">
                    <StatusBadge label={prop.status} variant={getStatusVariant(prop.status)} />
                  </td>
                  <td className="py-4 px-6 text-sm font-semibold">${prop.rentTenant.toLocaleString()}</td>
                  <td className="py-4 px-6">
                    <span className={`text-sm font-semibold ${prop.profit >= 0 ? "text-emerald-600" : "text-red-500"}`}>
                      {prop.profit >= 0 ? "+" : ""}${prop.profit.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <Link href={`/properties/${prop.id}`} className="text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined">visibility</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <span className="text-sm text-primary">Showing <strong>1 to 25</strong> of <strong>1,248</strong> results</span>
            <div className="flex items-center gap-1">
              <button className="size-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-primary/5 text-sm">&lsaquo;</button>
              <button className="size-9 flex items-center justify-center rounded-lg bg-primary text-white text-sm font-bold">1</button>
              <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-primary/5 text-sm">2</button>
              <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-primary/5 text-sm">3</button>
              <span className="px-2 text-slate-400">...</span>
              <button className="size-9 flex items-center justify-center rounded-lg text-slate-600 hover:bg-primary/5 text-sm">50</button>
              <button className="size-9 flex items-center justify-center rounded-lg text-slate-400 hover:bg-primary/5 text-sm">&rsaquo;</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
