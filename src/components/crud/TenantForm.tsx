"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import type { Tenant } from '@/data/mock'

interface TenantFormData {
  name: string
  email: string
  phone: string
  property: string
  propertyType: string
  status: string
  nationality: string
  idNumber: string
}

interface TenantFormProps {
  tenant?: Tenant
  onSubmit: (data: Tenant) => void
  onCancel: () => void
}

export default function TenantForm({ tenant, onSubmit, onCancel }: TenantFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<TenantFormData>({
    defaultValues: tenant ? {
      name: tenant.name,
      email: tenant.email,
      phone: tenant.phone,
      property: tenant.property,
      propertyType: tenant.propertyType,
      status: tenant.status,
      nationality: tenant.nationality,
      idNumber: tenant.idNumber,
    } : undefined
  })

  const onFormSubmit = (data: TenantFormData) => {
    const result: Tenant = {
      id: tenant?.id || `RF-${Math.floor(1000 + Math.random() * 9000)}`,
      ...data,
      status: data.status as Tenant['status'],
      payment: tenant?.payment || 'N/A',
      contractEnd: tenant?.contractEnd || '-',
      avatar: tenant?.avatar || '',
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Full Name" required {...register('name', { required: 'Required' })} error={errors.name?.message} />
        <FormField label="Email" type="email" required {...register('email', { required: 'Required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email' } })} error={errors.email?.message} />
        <FormField label="Phone" required {...register('phone', { required: 'Required' })} error={errors.phone?.message} />
        <FormField label="Property" required {...register('property', { required: 'Required' })} error={errors.property?.message} />
        <FormField label="Property Type" {...register('propertyType')} />
        <FormField label="Status" as="select" required options={[
          { value: 'Active', label: 'Active' },
          { value: 'Lead', label: 'Lead' },
          { value: 'Interested', label: 'Interested' },
          { value: 'Viewing', label: 'Viewing' },
          { value: 'Former', label: 'Former' },
        ]} {...register('status', { required: 'Required' })} error={errors.status?.message} />
        <FormField label="Nationality" {...register('nationality')} />
        <FormField label="ID Number" {...register('idNumber')} />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {tenant ? 'Update Tenant' : 'Add Tenant'}
        </button>
      </div>
    </form>
  )
}
