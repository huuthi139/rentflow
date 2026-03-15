"use client"

import { createContext, useContext, useReducer, useEffect, useCallback, ReactNode } from 'react'
import { getSupabase } from '@/lib/supabase'
import { properties as mockProperties, tenants as mockTenants, contracts as mockContracts, buildings as mockBuildings } from '@/data/mock'
import type { Property, Tenant, Contract, Building } from '@/data/mock'

// ---- Helpers: convert between camelCase (app) and snake_case (DB) ----

function propertyToRow(p: Property) {
  return {
    id: p.id, name: p.name, building: p.building, location: p.location,
    area: p.area, bedrooms: p.bedrooms, bathrooms: p.bathrooms, floor: p.floor,
    status: p.status, rent_owner: p.rentOwner, rent_tenant: p.rentTenant,
    operating_cost: p.operatingCost, profit: p.profit, image: p.image, furniture: p.furniture,
  }
}

function rowToProperty(r: any): Property {
  return {
    id: r.id, name: r.name, building: r.building, location: r.location,
    area: Number(r.area), bedrooms: r.bedrooms, bathrooms: r.bathrooms, floor: r.floor,
    status: r.status, rentOwner: Number(r.rent_owner), rentTenant: Number(r.rent_tenant),
    operatingCost: Number(r.operating_cost), profit: Number(r.profit), image: r.image, furniture: r.furniture,
  }
}

function tenantToRow(t: Tenant) {
  return {
    id: t.id, name: t.name, email: t.email, phone: t.phone,
    property: t.property, property_type: t.propertyType, status: t.status,
    payment: t.payment, contract_end: t.contractEnd, avatar: t.avatar,
    nationality: t.nationality, id_number: t.idNumber,
  }
}

function rowToTenant(r: any): Tenant {
  return {
    id: r.id, name: r.name, email: r.email, phone: r.phone,
    property: r.property, propertyType: r.property_type, status: r.status,
    payment: r.payment, contractEnd: r.contract_end, avatar: r.avatar,
    nationality: r.nationality, idNumber: r.id_number,
  }
}

function contractToRow(c: Contract) {
  return {
    id: c.id, tenant: c.tenant, property: c.property,
    start_date: c.startDate, end_date: c.endDate,
    rent_price: c.rentPrice, deposit: c.deposit,
    payment_cycle: c.paymentCycle, status: c.status,
  }
}

function rowToContract(r: any): Contract {
  return {
    id: r.id, tenant: r.tenant, property: r.property,
    startDate: r.start_date, endDate: r.end_date,
    rentPrice: Number(r.rent_price), deposit: Number(r.deposit),
    paymentCycle: r.payment_cycle, status: r.status,
  }
}

function rowToBuilding(r: any): Building {
  return {
    id: r.id, name: r.name, address: r.address, city: r.city,
    floors: r.floors, units: r.units, owner: r.owner,
    serviceFee: Number(r.service_fee), image: r.image,
  }
}

// ---- State & Reducer ----

interface State {
  properties: Property[]
  tenants: Tenant[]
  contracts: Contract[]
  buildings: Building[]
  loading: boolean
  supabaseConnected: boolean
}

type Action =
  | { type: 'SET_DATA'; payload: Partial<State> }
  | { type: 'ADD_PROPERTY'; payload: Property }
  | { type: 'UPDATE_PROPERTY'; payload: Property }
  | { type: 'DELETE_PROPERTY'; payload: string }
  | { type: 'ADD_TENANT'; payload: Tenant }
  | { type: 'UPDATE_TENANT'; payload: Tenant }
  | { type: 'DELETE_TENANT'; payload: string }
  | { type: 'ADD_CONTRACT'; payload: Contract }
  | { type: 'UPDATE_CONTRACT'; payload: Contract }
  | { type: 'DELETE_CONTRACT'; payload: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, ...action.payload }
    case 'ADD_PROPERTY':
      return { ...state, properties: [action.payload, ...state.properties] }
    case 'UPDATE_PROPERTY':
      return { ...state, properties: state.properties.map(p => p.id === action.payload.id ? action.payload : p) }
    case 'DELETE_PROPERTY':
      return { ...state, properties: state.properties.filter(p => p.id !== action.payload) }
    case 'ADD_TENANT':
      return { ...state, tenants: [action.payload, ...state.tenants] }
    case 'UPDATE_TENANT':
      return { ...state, tenants: state.tenants.map(t => t.id === action.payload.id ? action.payload : t) }
    case 'DELETE_TENANT':
      return { ...state, tenants: state.tenants.filter(t => t.id !== action.payload) }
    case 'ADD_CONTRACT':
      return { ...state, contracts: [action.payload, ...state.contracts] }
    case 'UPDATE_CONTRACT':
      return { ...state, contracts: state.contracts.map(c => c.id === action.payload.id ? action.payload : c) }
    case 'DELETE_CONTRACT':
      return { ...state, contracts: state.contracts.filter(c => c.id !== action.payload) }
    default:
      return state
  }
}

const initialState: State = {
  properties: mockProperties,
  tenants: mockTenants,
  contracts: mockContracts,
  buildings: mockBuildings,
  loading: true,
  supabaseConnected: false,
}

// ---- Context ----

interface DataContextType extends State {
  addProperty: (p: Property) => void
  updateProperty: (p: Property) => void
  deleteProperty: (id: string) => void
  addTenant: (t: Tenant) => void
  updateTenant: (t: Tenant) => void
  deleteTenant: (id: string) => void
  addContract: (c: Contract) => void
  updateContract: (c: Contract) => void
  deleteContract: (id: string) => void
  refreshData: () => Promise<void>
}

const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  // Fetch all data from Supabase
  const fetchData = useCallback(async () => {
    const sb = getSupabase()
    if (!sb) {
      dispatch({ type: 'SET_DATA', payload: { loading: false, supabaseConnected: false } })
      return
    }

    try {
      const [propRes, tenRes, conRes, bldRes] = await Promise.all([
        sb.from('properties').select('*').order('created_at', { ascending: false }),
        sb.from('tenants').select('*').order('created_at', { ascending: false }),
        sb.from('contracts').select('*').order('created_at', { ascending: false }),
        sb.from('buildings').select('*').order('created_at', { ascending: false }),
      ])

      // If any table errors (e.g. doesn't exist), fall back to mock data
      if (propRes.error || tenRes.error || conRes.error || bldRes.error) {
        console.warn('Supabase tables not found, using mock data. Run migration.sql first.')
        dispatch({ type: 'SET_DATA', payload: { loading: false, supabaseConnected: false } })
        return
      }

      dispatch({
        type: 'SET_DATA',
        payload: {
          properties: propRes.data.map(rowToProperty),
          tenants: tenRes.data.map(rowToTenant),
          contracts: conRes.data.map(rowToContract),
          buildings: bldRes.data.map(rowToBuilding),
          loading: false,
          supabaseConnected: true,
        },
      })
    } catch (err) {
      console.warn('Supabase connection failed, using mock data:', err)
      dispatch({ type: 'SET_DATA', payload: { loading: false, supabaseConnected: false } })
    }
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  // ---- CRUD with Supabase sync (optimistic updates) ----

  const addProperty = useCallback((p: Property) => {
    dispatch({ type: 'ADD_PROPERTY', payload: p })
    const sb = getSupabase()
    if (sb) {
      sb.from('properties').insert(propertyToRow(p)).then(({ error }) => {
        if (error) console.error('Supabase insert property error:', error)
      })
    }
  }, [])

  const updateProperty = useCallback((p: Property) => {
    dispatch({ type: 'UPDATE_PROPERTY', payload: p })
    const sb = getSupabase()
    if (sb) {
      sb.from('properties').update(propertyToRow(p)).eq('id', p.id).then(({ error }) => {
        if (error) console.error('Supabase update property error:', error)
      })
    }
  }, [])

  const deleteProperty = useCallback((id: string) => {
    dispatch({ type: 'DELETE_PROPERTY', payload: id })
    const sb = getSupabase()
    if (sb) {
      sb.from('properties').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase delete property error:', error)
      })
    }
  }, [])

  const addTenant = useCallback((t: Tenant) => {
    dispatch({ type: 'ADD_TENANT', payload: t })
    const sb = getSupabase()
    if (sb) {
      sb.from('tenants').insert(tenantToRow(t)).then(({ error }) => {
        if (error) console.error('Supabase insert tenant error:', error)
      })
    }
  }, [])

  const updateTenant = useCallback((t: Tenant) => {
    dispatch({ type: 'UPDATE_TENANT', payload: t })
    const sb = getSupabase()
    if (sb) {
      sb.from('tenants').update(tenantToRow(t)).eq('id', t.id).then(({ error }) => {
        if (error) console.error('Supabase update tenant error:', error)
      })
    }
  }, [])

  const deleteTenant = useCallback((id: string) => {
    dispatch({ type: 'DELETE_TENANT', payload: id })
    const sb = getSupabase()
    if (sb) {
      sb.from('tenants').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase delete tenant error:', error)
      })
    }
  }, [])

  const addContract = useCallback((c: Contract) => {
    dispatch({ type: 'ADD_CONTRACT', payload: c })
    const sb = getSupabase()
    if (sb) {
      sb.from('contracts').insert(contractToRow(c)).then(({ error }) => {
        if (error) console.error('Supabase insert contract error:', error)
      })
    }
  }, [])

  const updateContract = useCallback((c: Contract) => {
    dispatch({ type: 'UPDATE_CONTRACT', payload: c })
    const sb = getSupabase()
    if (sb) {
      sb.from('contracts').update(contractToRow(c)).eq('id', c.id).then(({ error }) => {
        if (error) console.error('Supabase update contract error:', error)
      })
    }
  }, [])

  const deleteContract = useCallback((id: string) => {
    dispatch({ type: 'DELETE_CONTRACT', payload: id })
    const sb = getSupabase()
    if (sb) {
      sb.from('contracts').delete().eq('id', id).then(({ error }) => {
        if (error) console.error('Supabase delete contract error:', error)
      })
    }
  }, [])

  const value: DataContextType = {
    ...state,
    addProperty,
    updateProperty,
    deleteProperty,
    addTenant,
    updateTenant,
    deleteTenant,
    addContract,
    updateContract,
    deleteContract,
    refreshData: fetchData,
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
