"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import type { MaintenanceTicket } from '@/data/mock'

interface MaintenanceFormData {
  property: string
  type: string
  description: string
  reportDate: string
  assignee: string
  cost: number
  status: string
  priority: string
}

interface MaintenanceFormProps {
  ticket?: MaintenanceTicket
  onSubmit: (data: MaintenanceTicket) => void
  onCancel: () => void
}

export default function MaintenanceForm({ ticket, onSubmit, onCancel }: MaintenanceFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<MaintenanceFormData>({
    defaultValues: ticket ? {
      property: ticket.property,
      type: ticket.type,
      description: ticket.description,
      reportDate: ticket.reportDate,
      assignee: ticket.assignee,
      cost: ticket.cost,
      status: ticket.status,
      priority: ticket.priority,
    } : {
      status: 'Open',
      priority: 'Medium',
    }
  })

  const onFormSubmit = (data: MaintenanceFormData) => {
    const result: MaintenanceTicket = {
      id: ticket?.id || `MT-${String(Math.floor(100 + Math.random() * 900)).padStart(3, '0')}`,
      property: data.property,
      type: data.type,
      description: data.description,
      reportDate: data.reportDate,
      assignee: data.assignee,
      cost: Number(data.cost),
      status: data.status as MaintenanceTicket['status'],
      priority: data.priority as MaintenanceTicket['priority'],
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Property" required {...register('property', { required: 'Required' })} error={errors.property?.message} />
        <FormField label="Type" as="select" required options={[
          { value: 'Plumbing', label: 'Plumbing' },
          { value: 'Electrical', label: 'Electrical' },
          { value: 'HVAC', label: 'HVAC' },
          { value: 'Lock', label: 'Lock' },
          { value: 'Appliance', label: 'Appliance' },
          { value: 'Internet', label: 'Internet' },
          { value: 'Furniture', label: 'Furniture' },
        ]} {...register('type', { required: 'Required' })} error={errors.type?.message} />
        <FormField label="Description" as="textarea" required className="md:col-span-2" {...register('description', { required: 'Required' })} error={errors.description?.message} />
        <FormField label="Report Date" required {...register('reportDate', { required: 'Required' })} placeholder="e.g. Oct 12, 2023" error={errors.reportDate?.message} />
        <FormField label="Assignee" required {...register('assignee', { required: 'Required' })} error={errors.assignee?.message} />
        <FormField label="Cost ($)" type="number" required {...register('cost', { required: 'Required', min: { value: 0, message: 'Must be positive' } })} error={errors.cost?.message} />
        <FormField label="Status" as="select" required options={[
          { value: 'Open', label: 'Open' },
          { value: 'In Progress', label: 'In Progress' },
          { value: 'Resolved', label: 'Resolved' },
          { value: 'Closed', label: 'Closed' },
        ]} {...register('status', { required: 'Required' })} error={errors.status?.message} />
        <FormField label="Priority" as="select" required options={[
          { value: 'Critical', label: 'Critical' },
          { value: 'High', label: 'High' },
          { value: 'Medium', label: 'Medium' },
          { value: 'Low', label: 'Low' },
        ]} {...register('priority', { required: 'Required' })} error={errors.priority?.message} />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {ticket ? 'Update Ticket' : 'Add Ticket'}
        </button>
      </div>
    </form>
  )
}
