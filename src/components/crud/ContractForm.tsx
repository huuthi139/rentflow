"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import { useData } from '@/lib/store'
import type { Contract } from '@/data/mock'

interface ContractFormData {
  tenant: string
  property: string
  startDate: string
  endDate: string
  rentPrice: number
  deposit: number
  paymentCycle: string
  status: string
}

interface ContractFormProps {
  contract?: Contract
  onSubmit: (data: Contract) => void
  onCancel: () => void
}

export default function ContractForm({ contract, onSubmit, onCancel }: ContractFormProps) {
  const { tenants, properties } = useData()

  const { register, handleSubmit, formState: { errors } } = useForm<ContractFormData>({
    defaultValues: contract ? {
      tenant: contract.tenant,
      property: contract.property,
      startDate: contract.startDate,
      endDate: contract.endDate,
      rentPrice: contract.rentPrice,
      deposit: contract.deposit,
      paymentCycle: contract.paymentCycle,
      status: contract.status,
    } : undefined
  })

  const onFormSubmit = (data: ContractFormData) => {
    const result: Contract = {
      id: contract?.id || `CTR-${Math.floor(100 + Math.random() * 900)}`,
      ...data,
      rentPrice: Number(data.rentPrice),
      deposit: Number(data.deposit),
      status: data.status as Contract['status'],
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Tenant" as="select" required
          options={tenants.map(t => ({ value: t.name, label: t.name }))}
          {...register('tenant', { required: 'Required' })} error={errors.tenant?.message}
        />
        <FormField label="Property" as="select" required
          options={properties.map(p => ({ value: p.name, label: `${p.name} - ${p.building}` }))}
          {...register('property', { required: 'Required' })} error={errors.property?.message}
        />
        <FormField label="Start Date" type="date" required {...register('startDate', { required: 'Required' })} error={errors.startDate?.message} />
        <FormField label="End Date" type="date" required {...register('endDate', { required: 'Required' })} error={errors.endDate?.message} />
        <FormField label="Rent Price ($)" type="number" required {...register('rentPrice', { required: 'Required', min: { value: 1, message: 'Must be positive' } })} error={errors.rentPrice?.message} />
        <FormField label="Deposit ($)" type="number" required {...register('deposit', { required: 'Required', min: { value: 0, message: 'Cannot be negative' } })} error={errors.deposit?.message} />
        <FormField label="Payment Cycle" as="select" options={[
          { value: 'Monthly', label: 'Monthly' },
          { value: 'Quarterly', label: 'Quarterly' },
          { value: 'Yearly', label: 'Yearly' },
        ]} {...register('paymentCycle')} />
        <FormField label="Status" as="select" required options={[
          { value: 'Active', label: 'Active' },
          { value: 'Ending Soon', label: 'Ending Soon' },
          { value: 'Expired', label: 'Expired' },
          { value: 'Terminated', label: 'Terminated' },
        ]} {...register('status', { required: 'Required' })} error={errors.status?.message} />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {contract ? 'Update Contract' : 'Add Contract'}
        </button>
      </div>
    </form>
  )
}
