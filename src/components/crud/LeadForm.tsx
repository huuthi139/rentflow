"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import type { Lead } from '@/lib/types'

interface LeadFormData {
  name: string
  email: string
  phone: string
  interestedProperty: string
  budget: number
  stage: string
  source: string
  assignedAgent: string
  notes: string
}

interface LeadFormProps {
  lead?: Lead
  onSubmit: (data: Lead) => void
  onCancel: () => void
}

export default function LeadForm({ lead, onSubmit, onCancel }: LeadFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>({
    defaultValues: lead ? {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      interestedProperty: lead.interestedProperty,
      budget: lead.budget,
      stage: lead.stage,
      source: lead.source,
      assignedAgent: lead.assignedAgent,
      notes: lead.notes,
    } : {
      stage: 'Lead',
      source: 'Website',
    }
  })

  const onFormSubmit = (data: LeadFormData) => {
    const result: Lead = {
      id: lead?.id || `LD-${String(Math.floor(100 + Math.random() * 900))}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      interestedProperty: data.interestedProperty,
      budget: Number(data.budget),
      stage: data.stage as Lead['stage'],
      source: data.source,
      assignedAgent: data.assignedAgent,
      createdAt: lead?.createdAt || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      notes: data.notes,
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Name" required {...register('name', { required: 'Required' })} error={errors.name?.message} />
        <FormField label="Email" type="email" required {...register('email', { required: 'Required' })} error={errors.email?.message} />
        <FormField label="Phone" required {...register('phone', { required: 'Required' })} error={errors.phone?.message} />
        <FormField label="Interested Property" required {...register('interestedProperty', { required: 'Required' })} error={errors.interestedProperty?.message} />
        <FormField label="Budget ($/mo)" type="number" required {...register('budget', { required: 'Required', min: { value: 1, message: 'Must be positive' } })} error={errors.budget?.message} />
        <FormField label="Stage" as="select" required options={[
          { value: 'Lead', label: 'Lead' },
          { value: 'Contacted', label: 'Contacted' },
          { value: 'Viewing', label: 'Viewing' },
          { value: 'Negotiating', label: 'Negotiating' },
          { value: 'Signed', label: 'Signed' },
        ]} {...register('stage', { required: 'Required' })} error={errors.stage?.message} />
        <FormField label="Source" as="select" required options={[
          { value: 'Website', label: 'Website' },
          { value: 'Referral', label: 'Referral' },
          { value: 'Facebook Ad', label: 'Facebook Ad' },
          { value: 'Walk-in', label: 'Walk-in' },
          { value: 'Instagram', label: 'Instagram' },
          { value: 'Google Ad', label: 'Google Ad' },
        ]} {...register('source', { required: 'Required' })} error={errors.source?.message} />
        <FormField label="Assigned Agent" required {...register('assignedAgent', { required: 'Required' })} error={errors.assignedAgent?.message} />
      </div>
      <FormField label="Notes" as="textarea" {...register('notes')} />

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {lead ? 'Update Lead' : 'Add Lead'}
        </button>
      </div>
    </form>
  )
}
