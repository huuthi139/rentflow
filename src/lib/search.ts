import { properties, tenants, contracts, maintenanceTickets } from '@/data/mock'
import type { Property, Contract, MaintenanceTicket } from '@/data/mock'
import type { Tenant } from '@/data/mock'

export interface SearchResults {
  properties: typeof properties
  tenants: typeof tenants
  contracts: typeof contracts
  maintenance: typeof maintenanceTickets
}

export function globalSearch(query: string): SearchResults {
  if (query.length < 2) return { properties: [], tenants: [], contracts: [], maintenance: [] }

  const q = query.toLowerCase()

  return {
    properties: properties.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.building.toLowerCase().includes(q) ||
      p.location.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    ).slice(0, 5),
    tenants: tenants.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      t.phone.includes(q) ||
      t.id.toLowerCase().includes(q)
    ).slice(0, 5),
    contracts: contracts.filter(c =>
      c.id.toLowerCase().includes(q) ||
      c.tenant.toLowerCase().includes(q) ||
      c.property.toLowerCase().includes(q)
    ).slice(0, 5),
    maintenance: maintenanceTickets.filter(m =>
      m.id.toLowerCase().includes(q) ||
      m.property.toLowerCase().includes(q) ||
      m.description.toLowerCase().includes(q)
    ).slice(0, 5),
  }
}
