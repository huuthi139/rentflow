"use client"

import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react'
import { getSupabase } from '@/lib/supabase'
import { properties as mockProperties, tenants as mockTenants, contracts as mockContracts, buildings as mockBuildings, payments as mockPayments, maintenanceTickets as mockMaintenance, expenses as mockExpenses, bookings as mockBookings, leads as mockLeads } from '@/data/mock'
import type { Property, Tenant, Contract, Building, PaymentRecord, MaintenanceTicket } from '@/data/mock'
import type { Booking, Lead, Expense } from '@/lib/types'
import { useNotifications } from '@/lib/notifications'

// ---- Helpers: camelCase <-> snake_case ----
function propertyToRow(p: Property) { return { id: p.id, name: p.name, building: p.building, location: p.location, area: p.area, bedrooms: p.bedrooms, bathrooms: p.bathrooms, floor: p.floor, status: p.status, rent_owner: p.rentOwner, rent_tenant: p.rentTenant, operating_cost: p.operatingCost, profit: p.profit, image: p.image, furniture: p.furniture } }
function rowToProperty(r: any): Property { return { id: r.id, name: r.name, building: r.building, location: r.location, area: Number(r.area), bedrooms: r.bedrooms, bathrooms: r.bathrooms, floor: r.floor, status: r.status, rentOwner: Number(r.rent_owner), rentTenant: Number(r.rent_tenant), operatingCost: Number(r.operating_cost), profit: Number(r.profit), image: r.image, furniture: r.furniture } }
function tenantToRow(t: Tenant) { return { id: t.id, name: t.name, email: t.email, phone: t.phone, property: t.property, property_type: t.propertyType, status: t.status, payment: t.payment, contract_end: t.contractEnd, avatar: t.avatar, nationality: t.nationality, id_number: t.idNumber } }
function rowToTenant(r: any): Tenant { return { id: r.id, name: r.name, email: r.email, phone: r.phone, property: r.property, propertyType: r.property_type, status: r.status, payment: r.payment, contractEnd: r.contract_end, avatar: r.avatar, nationality: r.nationality, idNumber: r.id_number } }
function contractToRow(c: Contract) { return { id: c.id, tenant: c.tenant, property: c.property, start_date: c.startDate, end_date: c.endDate, rent_price: c.rentPrice, deposit: c.deposit, payment_cycle: c.paymentCycle, status: c.status } }
function rowToContract(r: any): Contract { return { id: r.id, tenant: r.tenant, property: r.property, startDate: r.start_date, endDate: r.end_date, rentPrice: Number(r.rent_price), deposit: Number(r.deposit), paymentCycle: r.payment_cycle, status: r.status } }
function buildingToRow(b: Building) { return { id: b.id, name: b.name, address: b.address, city: b.city, floors: b.floors, units: b.units, owner: b.owner, service_fee: b.serviceFee, image: b.image } }
function rowToBuilding(r: any): Building { return { id: r.id, name: r.name, address: r.address, city: r.city, floors: r.floors, units: r.units, owner: r.owner, serviceFee: Number(r.service_fee), image: r.image } }
function paymentToRow(p: PaymentRecord) { return { id: p.id, tenant: p.tenant, property: p.property, amount: p.amount, due_date: p.dueDate, paid_date: p.paidDate, status: p.status, month: p.month } }
function rowToPayment(r: any): PaymentRecord { return { id: r.id, tenant: r.tenant, property: r.property, amount: Number(r.amount), dueDate: r.due_date, paidDate: r.paid_date, status: r.status, month: r.month } }
function maintenanceToRow(m: MaintenanceTicket) { return { id: m.id, property: m.property, type: m.type, description: m.description, report_date: m.reportDate, assignee: m.assignee, cost: m.cost, status: m.status, priority: m.priority } }
function rowToMaintenance(r: any): MaintenanceTicket { return { id: r.id, property: r.property, type: r.type, description: r.description, reportDate: r.report_date, assignee: r.assignee, cost: Number(r.cost), status: r.status, priority: r.priority } }
function expenseToRow(e: Expense) { return { id: e.id, property: e.property, category: e.category, description: e.description, amount: e.amount, date: e.date, vendor: e.vendor, receipt: e.receipt } }
function rowToExpense(r: any): Expense { return { id: r.id, property: r.property, category: r.category, description: r.description, amount: Number(r.amount), date: r.date, vendor: r.vendor, receipt: r.receipt } }
function bookingToRow(b: Booking) { return { id: b.id, tenant: b.tenant, property: b.property, agent: b.agent, date_time: b.dateTime, notes: b.notes, status: b.status } }
function rowToBooking(r: any): Booking { return { id: r.id, tenant: r.tenant, property: r.property, agent: r.agent, dateTime: r.date_time, notes: r.notes, status: r.status } }
function leadToRow(l: Lead) { return { id: l.id, name: l.name, email: l.email, phone: l.phone, interested_property: l.interestedProperty, budget: l.budget, stage: l.stage, source: l.source, assigned_agent: l.assignedAgent, created_at: l.createdAt, notes: l.notes } }
function rowToLead(r: any): Lead { return { id: r.id, name: r.name, email: r.email, phone: r.phone, interestedProperty: r.interested_property, budget: Number(r.budget), stage: r.stage, source: r.source, assignedAgent: r.assigned_agent, createdAt: r.created_at, notes: r.notes } }

// ---- State & Reducer ----
type TableKey = 'properties'|'tenants'|'contracts'|'buildings'|'payments'|'maintenance'|'expenses'|'bookings'|'leads'

interface State {
  properties: Property[]; tenants: Tenant[]; contracts: Contract[]; buildings: Building[]
  payments: PaymentRecord[]; maintenance: MaintenanceTicket[]; expenses: Expense[]
  bookings: Booking[]; leads: Lead[]
  loading: boolean; supabaseConnected: boolean
}

type Action =
  | { type: 'SET_DATA'; payload: Partial<State> }
  | { type: 'ADD_ITEM'; table: TableKey; payload: any }
  | { type: 'UPDATE_ITEM'; table: TableKey; payload: any }
  | { type: 'DELETE_ITEM'; table: TableKey; payload: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DATA': return { ...state, ...action.payload }
    case 'ADD_ITEM': return { ...state, [action.table]: [action.payload, ...(state[action.table] as any[])] }
    case 'UPDATE_ITEM': return { ...state, [action.table]: (state[action.table] as any[]).map((i: any) => i.id === action.payload.id ? action.payload : i) }
    case 'DELETE_ITEM': return { ...state, [action.table]: (state[action.table] as any[]).filter((i: any) => i.id !== action.payload) }
    default: return state
  }
}

const initialState: State = {
  properties: mockProperties, tenants: mockTenants, contracts: mockContracts, buildings: mockBuildings,
  payments: mockPayments, maintenance: mockMaintenance, expenses: mockExpenses, bookings: mockBookings, leads: mockLeads,
  loading: true, supabaseConnected: false,
}

// ---- Notification type mapping ----
const tableNotifType: Record<TableKey, 'property' | 'tenant' | 'contract' | 'building' | 'payment' | 'maintenance' | 'expense' | 'booking' | 'lead'> = {
  properties: 'property', tenants: 'tenant', contracts: 'contract', buildings: 'building',
  payments: 'payment', maintenance: 'maintenance', expenses: 'expense', bookings: 'booking', leads: 'lead',
}
const tableLabel: Record<TableKey, string> = {
  properties: 'Property', tenants: 'Tenant', contracts: 'Contract', buildings: 'Building',
  payments: 'Payment', maintenance: 'Maintenance Ticket', expenses: 'Expense', bookings: 'Booking', leads: 'Lead',
}

// ---- Generic CRUD factory ----
function createCrud<T extends { id: string }>(
  table: string, stateKey: TableKey, toRow: (item: T) => any, dispatch: React.Dispatch<Action>,
  notify?: (n: { type: any; title: string; desc: string }) => void
) {
  const label = tableLabel[stateKey]
  const nType = tableNotifType[stateKey]
  return {
    add: (item: T) => {
      dispatch({ type: 'ADD_ITEM', table: stateKey, payload: item })
      notify?.({ type: nType, title: `${label} Added`, desc: `New ${label.toLowerCase()} "${(item as any).name || (item as any).tenant || (item as any).id}" was created` })
      const sb = getSupabase(); if (sb) sb.from(table).insert(toRow(item)).then(({ error }) => { if (error) console.error(`Supabase insert ${table}:`, error) })
    },
    update: (item: T) => {
      dispatch({ type: 'UPDATE_ITEM', table: stateKey, payload: item })
      notify?.({ type: nType, title: `${label} Updated`, desc: `${label} "${(item as any).name || (item as any).tenant || (item as any).id}" was updated` })
      const sb = getSupabase(); if (sb) sb.from(table).update(toRow(item)).eq('id', item.id).then(({ error }) => { if (error) console.error(`Supabase update ${table}:`, error) })
    },
    remove: (id: string) => {
      dispatch({ type: 'DELETE_ITEM', table: stateKey, payload: id })
      notify?.({ type: nType, title: `${label} Deleted`, desc: `${label} was removed from the system` })
      const sb = getSupabase(); if (sb) sb.from(table).delete().eq('id', id).then(({ error }) => { if (error) console.error(`Supabase delete ${table}:`, error) })
    },
  }
}

// ---- Context ----
interface DataContextType extends State {
  addProperty: (p: Property) => void; updateProperty: (p: Property) => void; deleteProperty: (id: string) => void
  addTenant: (t: Tenant) => void; updateTenant: (t: Tenant) => void; deleteTenant: (id: string) => void
  addContract: (c: Contract) => void; updateContract: (c: Contract) => void; deleteContract: (id: string) => void
  addBuilding: (b: Building) => void; updateBuilding: (b: Building) => void; deleteBuilding: (id: string) => void
  addPayment: (p: PaymentRecord) => void; updatePayment: (p: PaymentRecord) => void; deletePayment: (id: string) => void
  addMaintenance: (m: MaintenanceTicket) => void; updateMaintenance: (m: MaintenanceTicket) => void; deleteMaintenance: (id: string) => void
  addExpense: (e: Expense) => void; updateExpense: (e: Expense) => void; deleteExpense: (id: string) => void
  addBooking: (b: Booking) => void; updateBooking: (b: Booking) => void; deleteBooking: (id: string) => void
  addLead: (l: Lead) => void; updateLead: (l: Lead) => void; deleteLead: (id: string) => void
  refreshData: () => Promise<void>
}

const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const { addNotification: notify } = useNotifications()

  const fetchData = useCallback(async () => {
    const sb = getSupabase()
    if (!sb) { dispatch({ type: 'SET_DATA', payload: { loading: false, supabaseConnected: false } }); return }
    try {
      const [propRes, tenRes, conRes, bldRes, payRes, mtRes, expRes, bkRes, ldRes] = await Promise.all([
        sb.from('properties').select('*').order('created_at', { ascending: false }),
        sb.from('tenants').select('*').order('created_at', { ascending: false }),
        sb.from('contracts').select('*').order('created_at', { ascending: false }),
        sb.from('buildings').select('*').order('created_at', { ascending: false }),
        sb.from('payments').select('*').order('created_at', { ascending: false }),
        sb.from('maintenance').select('*').order('created_at', { ascending: false }),
        sb.from('expenses').select('*').order('created_at', { ascending: false }),
        sb.from('bookings').select('*').order('created_at', { ascending: false }),
        sb.from('leads').select('*').order('created_at', { ascending: false }),
      ])
      if (propRes.error || tenRes.error || conRes.error || bldRes.error) {
        console.warn('Supabase tables not found, using mock data.')
        dispatch({ type: 'SET_DATA', payload: { loading: false, supabaseConnected: false } }); return
      }
      dispatch({ type: 'SET_DATA', payload: {
        properties: propRes.data.map(rowToProperty), tenants: tenRes.data.map(rowToTenant),
        contracts: conRes.data.map(rowToContract), buildings: bldRes.data.map(rowToBuilding),
        payments: payRes.data?.map(rowToPayment) ?? mockPayments,
        maintenance: mtRes.data?.map(rowToMaintenance) ?? mockMaintenance,
        expenses: expRes.data?.map(rowToExpense) ?? mockExpenses,
        bookings: bkRes.data?.map(rowToBooking) ?? mockBookings,
        leads: ldRes.data?.map(rowToLead) ?? mockLeads,
        loading: false, supabaseConnected: true,
      }})
    } catch (err) {
      console.warn('Supabase connection failed, using mock data:', err)
      dispatch({ type: 'SET_DATA', payload: { loading: false, supabaseConnected: false } })
    }
  }, [])

  useEffect(() => { fetchData() }, [fetchData])

  const propertyCrud = createCrud<Property>('properties', 'properties', propertyToRow, dispatch, notify)
  const tenantCrud = createCrud<Tenant>('tenants', 'tenants', tenantToRow, dispatch, notify)
  const contractCrud = createCrud<Contract>('contracts', 'contracts', contractToRow, dispatch, notify)
  const buildingCrud = createCrud<Building>('buildings', 'buildings', buildingToRow, dispatch, notify)
  const paymentCrud = createCrud<PaymentRecord>('payments', 'payments', paymentToRow, dispatch, notify)
  const maintenanceCrud = createCrud<MaintenanceTicket>('maintenance', 'maintenance', maintenanceToRow, dispatch, notify)
  const expenseCrud = createCrud<Expense>('expenses', 'expenses', expenseToRow, dispatch, notify)
  const bookingCrud = createCrud<Booking>('bookings', 'bookings', bookingToRow, dispatch, notify)
  const leadCrud = createCrud<Lead>('leads', 'leads', leadToRow, dispatch, notify)

  const value: DataContextType = {
    ...state,
    addProperty: propertyCrud.add, updateProperty: propertyCrud.update, deleteProperty: propertyCrud.remove,
    addTenant: tenantCrud.add, updateTenant: tenantCrud.update, deleteTenant: tenantCrud.remove,
    addContract: contractCrud.add, updateContract: contractCrud.update, deleteContract: contractCrud.remove,
    addBuilding: buildingCrud.add, updateBuilding: buildingCrud.update, deleteBuilding: buildingCrud.remove,
    addPayment: paymentCrud.add, updatePayment: paymentCrud.update, deletePayment: paymentCrud.remove,
    addMaintenance: maintenanceCrud.add, updateMaintenance: maintenanceCrud.update, deleteMaintenance: maintenanceCrud.remove,
    addExpense: expenseCrud.add, updateExpense: expenseCrud.update, deleteExpense: expenseCrud.remove,
    addBooking: bookingCrud.add, updateBooking: bookingCrud.update, deleteBooking: bookingCrud.remove,
    addLead: leadCrud.add, updateLead: leadCrud.update, deleteLead: leadCrud.remove,
    refreshData: fetchData,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
