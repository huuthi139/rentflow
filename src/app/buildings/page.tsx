import Link from "next/link";
import Header from "@/components/layout/Header";
import { buildings } from "@/data/mock";

export default function BuildingsPage() {
  return (
    <>
      <Header
        title="Buildings"
        subtitle="Manage all building properties"
        actions={
          <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-lg shadow-primary/20 hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined text-lg">add</span>
            Add Building
          </button>
        }
      />

      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {buildings.map((building) => (
            <Link key={building.id} href={`/buildings/${building.id}`} className="bg-white rounded-xl border border-primary/10 shadow-sm overflow-hidden hover:shadow-md transition-shadow group cursor-pointer block">
              <div
                className="h-48 bg-slate-200 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                style={{ backgroundImage: `url(${building.image})` }}
              />
              <div className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold">{building.name}</h3>
                    <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {building.address}, {building.city}
                    </p>
                  </div>
                  <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded-md">{building.id}</span>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100">
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{building.floors}</p>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider">Floors</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">{building.units}</p>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider">Units</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-primary">${building.serviceFee.toLocaleString()}</p>
                    <p className="text-[11px] text-slate-500 uppercase tracking-wider">Fee/mo</p>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <p className="text-xs text-slate-500">
                    <span className="font-medium text-slate-700">Owner:</span> {building.owner}
                  </p>
                  <span className="text-primary text-sm font-bold hover:underline flex items-center gap-1">
                    View <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
