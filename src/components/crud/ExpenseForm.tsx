"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import type { Expense } from '@/lib/types'

interface ExpenseFormData {
  property: string
  category: string
  description: string
  amount: number
  date: string
  vendor: string
  receipt: boolean
}

interface ExpenseFormProps {
  expense?: Expense
  onSubmit: (data: Expense) => void
  onCancel: () => void
}

export default function ExpenseForm({ expense, onSubmit, onCancel }: ExpenseFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<ExpenseFormData>({
    defaultValues: expense ? {
      property: expense.property,
      category: expense.category,
      description: expense.description,
      amount: expense.amount,
      date: expense.date,
      vendor: expense.vendor,
      receipt: expense.receipt,
    } : {
      category: 'Rent to Owner',
      receipt: false,
    }
  })

  const onFormSubmit = (data: ExpenseFormData) => {
    const result: Expense = {
      id: expense?.id || `EXP-${String(Math.floor(100 + Math.random() * 900)).padStart(3, '0')}`,
      property: data.property,
      category: data.category as Expense['category'],
      description: data.description,
      amount: Number(data.amount),
      date: data.date,
      vendor: data.vendor,
      receipt: data.receipt,
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Property" required {...register('property', { required: 'Required' })} error={errors.property?.message} />
        <FormField label="Category" as="select" required options={[
          { value: 'Rent to Owner', label: 'Rent to Owner' },
          { value: 'Electric', label: 'Electric' },
          { value: 'Water', label: 'Water' },
          { value: 'Internet', label: 'Internet' },
          { value: 'Repair', label: 'Repair' },
          { value: 'Cleaning', label: 'Cleaning' },
          { value: 'Supplies', label: 'Supplies' },
        ]} {...register('category', { required: 'Required' })} error={errors.category?.message} />
        <FormField label="Description" as="textarea" required className="md:col-span-2" {...register('description', { required: 'Required' })} error={errors.description?.message} />
        <FormField label="Amount ($)" type="number" required {...register('amount', { required: 'Required', min: { value: 0, message: 'Must be positive' } })} error={errors.amount?.message} />
        <FormField label="Date" required {...register('date', { required: 'Required' })} placeholder="e.g. Oct 01, 2024" error={errors.date?.message} />
        <FormField label="Vendor" required {...register('vendor', { required: 'Required' })} error={errors.vendor?.message} />
        <div className="flex items-center gap-3 pt-6">
          <input type="checkbox" id="receipt" className="size-4 rounded border-slate-300 text-primary focus:ring-primary/50" {...register('receipt')} />
          <label htmlFor="receipt" className="text-sm font-medium text-slate-700 dark:text-slate-300">Receipt Available</label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {expense ? 'Update Expense' : 'Add Expense'}
        </button>
      </div>
    </form>
  )
}
