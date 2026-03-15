import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/layout/Header";
import { buildings, properties } from "@/data/mock";

export default async function BuildingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const building = buildings.find((b) => b.id === id);

  if (!building) {
    notFound();
  }

  const buildingProperties = properties.filter(
    (p) => p.building.toLowerCase() === building.name.toLowerCase()
  );

  return (
    <>
      <Header
        title={building.name}
        subtitle={`${building.address}, ${building.city}`}
        actions={
          <Link href="/buildings" className="flex items-center gap-2 px-4 py-2 border border-primary/10 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-primary/5 transition-colors">
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            Back to Buildings
          </Link>
        }
      />

      <div className="p-8 space-y-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm">
          <Link href="/buildings" className="text-primary hover:underline font-medium">Buildings</Link>
          <span className="material-symbols-outlined text-slate-400 text-sm">chevron_right</span>
          <span className="text-slate-600 dark:text-slate-400 font-medium">{building.name}</span>
        </nav>

        {/* Building Info */}
        <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden">
          <div
            className="h-64 bg-slate-200 dark:bg-slate-700 bg-cover bg-center"
            style={{ backgroundImage: `url(${building.image})` }}
          />
          <div className="p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">{building.name}</h2>
                <p className="text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                  <span className="material-symbols-outlined text-sm">location_on</span>
                  {building.address}, {building.city}
                </p>
              </div>
              <span className="text-sm font-bold bg-primary/10 text-primary px-3 py-1.5 rounded-lg">{building.id}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <p className="text-2xl font-bold text-primary">{building.floors}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Floors</p>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <p className="text-2xl font-bold text-primary">{building.units}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Total Units</p>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl">
                <p className="text-2xl font-bold text-primary">${building.serviceFee.toLocaleString()}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Service Fee/mo</p>
              </div>
              <div className="text-center p-4 bg-slate-50 dark:bg-slate-900 rounded-xl col-span-2">
                <p className="text-2xl font-bold text-primary">{building.owner}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider mt-1">Owner</p>
              </div>
            </div>
          </div>
        </div>

        {/* Properties in this Building */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Properties in {building.name}</h3>
            <span className="text-sm text-slate-500 dark:text-slate-400">{buildingProperties.length} properties found</span>
          </div>

          {buildingProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {buildingProperties.map((property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.id}`}
                  className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow group block"
                >
                  <div
                    className="h-40 bg-slate-200 dark:bg-slate-700 bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                    style={{ backgroundImage: `url(${property.image})` }}
                  />
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-bold">{property.name}</h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">Floor {property.floor} | {property.area} sqm</p>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded-md ${
                        property.status === "Available" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" :
                        property.status === "Occupied" ? "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" :
                        property.status === "Reserved" ? "bg-amber-50 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400" :
                        property.status === "Maintenance" ? "bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400" :
                        "bg-slate-50 text-slate-600 dark:bg-slate-700 dark:text-slate-400"
                      }`}>
                        {property.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-700">
                      <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                        <span>{property.bedrooms} bed</span>
                        <span>{property.bathrooms} bath</span>
                        <span>{property.furniture}</span>
                      </div>
                      <p className="text-sm font-bold text-primary">${property.rentTenant.toLocaleString()}/mo</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-primary/10 dark:border-slate-700 shadow-sm p-12 text-center">
              <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">apartment</span>
              <p className="text-slate-500 dark:text-slate-400 mt-2">No properties found in this building.</p>
              <p className="text-xs text-slate-400 mt-1">Properties will appear here when they match this building name.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
