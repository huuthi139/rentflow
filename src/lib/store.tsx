"use client"

import { createContext, useContext, useReducer, ReactNode } from 'react'
import { properties as initialProperties, tenants as initialTenants, contracts as initialContracts, buildings as initialBuildings } from '@/data/mock'
import type { Property, Tenant, Contract, Building } from '@/data/mock'

interface State {
  properties: Property[]
  tenants: Tenant[]
  contracts: Contract[]
  buildings: Building[]
}

type Action =
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
  properties: initialProperties,
  tenants: initialTenants,
  contracts: initialContracts,
  buildings: initialBuildings,
}

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
}

const DataContext = createContext<DataContextType | null>(null)

export function DataProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value: DataContextType = {
    ...state,
    addProperty: (p) => dispatch({ type: 'ADD_PROPERTY', payload: p }),
    updateProperty: (p) => dispatch({ type: 'UPDATE_PROPERTY', payload: p }),
    deleteProperty: (id) => dispatch({ type: 'DELETE_PROPERTY', payload: id }),
    addTenant: (t) => dispatch({ type: 'ADD_TENANT', payload: t }),
    updateTenant: (t) => dispatch({ type: 'UPDATE_TENANT', payload: t }),
    deleteTenant: (id) => dispatch({ type: 'DELETE_TENANT', payload: id }),
    addContract: (c) => dispatch({ type: 'ADD_CONTRACT', payload: c }),
    updateContract: (c) => dispatch({ type: 'UPDATE_CONTRACT', payload: c }),
    deleteContract: (id) => dispatch({ type: 'DELETE_CONTRACT', payload: id }),
  }

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
