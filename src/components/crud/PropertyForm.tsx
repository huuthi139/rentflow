"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import type { Property } from '@/data/mock'

interface PropertyFormData {
  name: string
  building: string
  location: string
  area: number
  bedrooms: number
  bathrooms: number
  floor: number
  status: string
  rentOwner: number
  rentTenant: number
  operatingCost: number
  furniture: string
}

interface PropertyFormProps {
  property?: Property
  onSubmit: (data: Property) => void
  onCancel: () => void
}

export default function PropertyForm({ property, onSubmit, onCancel }: PropertyFormProps) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<PropertyFormData>({
    defaultValues: property ? {
      name: property.name,
      building: property.building,
      location: property.location,
      area: property.area,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      floor: property.floor,
      status: property.status,
      rentOwner: property.rentOwner,
      rentTenant: property.rentTenant,
      operatingCost: property.operatingCost,
      furniture: property.furniture,
    } : undefined
  })

  const rentOwner = watch('rentOwner') || 0
  const rentTenant = watch('rentTenant') || 0
  const operatingCost = watch('operatingCost') || 0
  const profit = rentTenant - rentOwner - operatingCost

  const onFormSubmit = (data: PropertyFormData) => {
    const result: Property = {
      id: property?.id || `RF-${Math.floor(1000 + Math.random() * 9000)}`,
      ...data,
      area: Number(data.area),
      bedrooms: Number(data.bedrooms),
      bathrooms: Number(data.bathrooms),
      floor: Number(data.floor),
      rentOwner: Number(data.rentOwner),
      rentTenant: Number(data.rentTenant),
      operatingCost: Number(data.operatingCost),
      profit: Number(data.rentTenant) - Number(data.rentOwner) - Number(data.operatingCost),
      status: data.status as Property['status'],
      image: property?.image || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Property Name" required {...register('name', { required: 'Required' })} error={errors.name?.message} />
        <FormField label="Building" required {...register('building', { required: 'Required' })} error={errors.building?.message} />
        <FormField label="Location" required {...register('location', { required: 'Required' })} error={errors.location?.message} />
        <FormField label="Area (m²)" type="number" required {...register('area', { required: 'Required', min: { value: 1, message: 'Must be positive' } })} error={errors.area?.message} />
        <FormField label="Bedrooms" type="number" {...register('bedrooms', { min: 0 })} error={errors.bedrooms?.message} />
        <FormField label="Bathrooms" type="number" {...register('bathrooms', { min: 0 })} error={errors.bathrooms?.message} />
        <FormField label="Floor" type="number" {...register('floor', { min: 1 })} error={errors.floor?.message} />
        <FormField label="Status" as="select" options={[
          { value: 'Available', label: 'Available' },
          { value: 'Occupied', label: 'Occupied' },
          { value: 'Reserved', label: 'Reserved' },
          { value: 'Maintenance', label: 'Maintenance' },
          { value: 'Inactive', label: 'Inactive' },
        ]} {...register('status', { required: 'Required' })} error={errors.status?.message} />
        <FormField label="Furniture" as="select" options={[
          { value: 'Full', label: 'Full' },
          { value: 'Basic', label: 'Basic' },
          { value: 'Premium', label: 'Premium' },
          { value: 'None', label: 'None' },
        ]} {...register('furniture')} />
      </div>

      <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-3">Financials</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField label="Rent (Owner)" type="number" {...register('rentOwner', { min: 0 })} error={errors.rentOwner?.message} />
          <FormField label="Rent (Tenant)" type="number" {...register('rentTenant', { min: 0 })} error={errors.rentTenant?.message} />
          <FormField label="Operating Cost" type="number" {...register('operatingCost', { min: 0 })} error={errors.operatingCost?.message} />
        </div>
        <div className={`mt-3 p-3 rounded-lg text-sm font-bold ${profit >= 0 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}>
          Estimated Profit: ${profit.toLocaleString()}/mo
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {property ? 'Update Property' : 'Add Property'}
        </button>
      </div>
    </form>
  )
}
