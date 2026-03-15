"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import type { Building } from '@/data/mock'

interface BuildingFormData {
  name: string
  address: string
  city: string
  floors: number
  units: number
  owner: string
  serviceFee: number
  image: string
}

interface BuildingFormProps {
  building?: Building
  onSubmit: (data: Building) => void
  onCancel: () => void
}

export default function BuildingForm({ building, onSubmit, onCancel }: BuildingFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<BuildingFormData>({
    defaultValues: building ? {
      name: building.name,
      address: building.address,
      city: building.city,
      floors: building.floors,
      units: building.units,
      owner: building.owner,
      serviceFee: building.serviceFee,
      image: building.image,
    } : undefined
  })

  const onFormSubmit = (data: BuildingFormData) => {
    const result: Building = {
      id: building?.id || `BLD-${String(Math.floor(100 + Math.random() * 900))}`,
      name: data.name,
      address: data.address,
      city: data.city,
      floors: Number(data.floors),
      units: Number(data.units),
      owner: data.owner,
      serviceFee: Number(data.serviceFee),
      image: data.image || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400',
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Building Name" required {...register('name', { required: 'Required' })} error={errors.name?.message} />
        <FormField label="Address" required {...register('address', { required: 'Required' })} error={errors.address?.message} />
        <FormField label="City" required {...register('city', { required: 'Required' })} error={errors.city?.message} />
        <FormField label="Floors" type="number" required {...register('floors', { required: 'Required', min: { value: 1, message: 'Must be at least 1' } })} error={errors.floors?.message} />
        <FormField label="Units" type="number" required {...register('units', { required: 'Required', min: { value: 1, message: 'Must be at least 1' } })} error={errors.units?.message} />
        <FormField label="Owner" required {...register('owner', { required: 'Required' })} error={errors.owner?.message} />
        <FormField label="Service Fee ($/mo)" type="number" required {...register('serviceFee', { required: 'Required', min: { value: 0, message: 'Must be positive' } })} error={errors.serviceFee?.message} />
        <FormField label="Image URL" {...register('image')} placeholder="https://..." />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {building ? 'Update Building' : 'Add Building'}
        </button>
      </div>
    </form>
  )
}
