"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import type { PaymentRecord } from '@/data/mock'

interface PaymentFormData {
  tenant: string
  property: string
  amount: number
  dueDate: string
  paidDate: string
  status: string
  month: string
}

interface PaymentFormProps {
  payment?: PaymentRecord
  onSubmit: (data: PaymentRecord) => void
  onCancel: () => void
}

export default function PaymentForm({ payment, onSubmit, onCancel }: PaymentFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<PaymentFormData>({
    defaultValues: payment ? {
      tenant: payment.tenant,
      property: payment.property,
      amount: payment.amount,
      dueDate: payment.dueDate,
      paidDate: payment.paidDate || '',
      status: payment.status,
      month: payment.month,
    } : {
      status: 'Pending',
    }
  })

  const onFormSubmit = (data: PaymentFormData) => {
    const result: PaymentRecord = {
      id: payment?.id || `PAY-${String(Math.floor(100 + Math.random() * 900)).padStart(3, '0')}`,
      tenant: data.tenant,
      property: data.property,
      amount: Number(data.amount),
      dueDate: data.dueDate,
      paidDate: data.paidDate || null,
      status: data.status as PaymentRecord['status'],
      month: data.month,
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Tenant" required {...register('tenant', { required: 'Required' })} error={errors.tenant?.message} />
        <FormField label="Property" required {...register('property', { required: 'Required' })} error={errors.property?.message} />
        <FormField label="Amount ($)" type="number" required {...register('amount', { required: 'Required', min: { value: 0, message: 'Must be positive' } })} error={errors.amount?.message} />
        <FormField label="Due Date" required {...register('dueDate', { required: 'Required' })} placeholder="e.g. Oct 01, 2023" error={errors.dueDate?.message} />
        <FormField label="Paid Date" {...register('paidDate')} placeholder="e.g. Oct 01, 2023 (optional)" />
        <FormField label="Status" as="select" required options={[
          { value: 'Paid', label: 'Paid' },
          { value: 'Pending', label: 'Pending' },
          { value: 'Late', label: 'Late' },
          { value: 'Partial', label: 'Partial' },
        ]} {...register('status', { required: 'Required' })} error={errors.status?.message} />
        <FormField label="Month" required {...register('month', { required: 'Required' })} placeholder="e.g. October 2023" error={errors.month?.message} />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {payment ? 'Update Payment' : 'Record Payment'}
        </button>
      </div>
    </form>
  )
}
