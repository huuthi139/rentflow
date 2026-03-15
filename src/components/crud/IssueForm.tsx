"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import type { IssueReport } from '@/lib/types'

interface IssueFormData {
  property: string
  reportedBy: string
  category: string
  severity: string
  title: string
  description: string
  reportDate: string
  resolvedDate: string
  status: string
  assignedTo: string
  estimatedCost: number
}

interface IssueFormProps {
  issue?: IssueReport
  onSubmit: (data: IssueReport) => void
  onCancel: () => void
}

export default function IssueForm({ issue, onSubmit, onCancel }: IssueFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    defaultValues: issue ? {
      property: issue.property,
      reportedBy: issue.reportedBy,
      category: issue.category,
      severity: issue.severity,
      title: issue.title,
      description: issue.description,
      reportDate: issue.reportDate,
      resolvedDate: issue.resolvedDate || '',
      status: issue.status,
      assignedTo: issue.assignedTo,
      estimatedCost: issue.estimatedCost,
    } : {
      status: 'Open',
      severity: 'Minor',
      category: 'Other',
      reportDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    }
  })

  const onFormSubmit = (data: IssueFormData) => {
    const result: IssueReport = {
      id: issue?.id || `ISS-${String(Math.floor(100 + Math.random() * 900)).padStart(3, '0')}`,
      property: data.property,
      reportedBy: data.reportedBy,
      category: data.category as IssueReport['category'],
      severity: data.severity as IssueReport['severity'],
      title: data.title,
      description: data.description,
      reportDate: data.reportDate,
      resolvedDate: data.resolvedDate || null,
      photos: issue?.photos || [],
      status: data.status as IssueReport['status'],
      assignedTo: data.assignedTo,
      estimatedCost: Number(data.estimatedCost),
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Title" required className="md:col-span-2" {...register('title', { required: 'Required' })} error={errors.title?.message} />
        <FormField label="Property" required {...register('property', { required: 'Required' })} error={errors.property?.message} />
        <FormField label="Reported By" required {...register('reportedBy', { required: 'Required' })} error={errors.reportedBy?.message} />
        <FormField label="Category" as="select" required options={[
          { value: 'Structural', label: 'Structural' },
          { value: 'Plumbing', label: 'Plumbing' },
          { value: 'Electrical', label: 'Electrical' },
          { value: 'Appliance', label: 'Appliance' },
          { value: 'Cosmetic', label: 'Cosmetic' },
          { value: 'Safety', label: 'Safety' },
          { value: 'Pest', label: 'Pest' },
          { value: 'Other', label: 'Other' },
        ]} {...register('category', { required: 'Required' })} error={errors.category?.message} />
        <FormField label="Severity" as="select" required options={[
          { value: 'Critical', label: 'Critical' },
          { value: 'Major', label: 'Major' },
          { value: 'Minor', label: 'Minor' },
          { value: 'Cosmetic', label: 'Cosmetic' },
        ]} {...register('severity', { required: 'Required' })} error={errors.severity?.message} />
        <FormField label="Description" as="textarea" required className="md:col-span-2" {...register('description', { required: 'Required' })} error={errors.description?.message} />
        <FormField label="Report Date" required {...register('reportDate', { required: 'Required' })} placeholder="e.g. Mar 15, 2026" error={errors.reportDate?.message} />
        <FormField label="Assigned To" required {...register('assignedTo', { required: 'Required' })} error={errors.assignedTo?.message} />
        <FormField label="Estimated Cost ($)" type="number" required {...register('estimatedCost', { required: 'Required', min: { value: 0, message: 'Must be positive' } })} error={errors.estimatedCost?.message} />
        <FormField label="Status" as="select" required options={[
          { value: 'Open', label: 'Open' },
          { value: 'Investigating', label: 'Investigating' },
          { value: 'Resolved', label: 'Resolved' },
          { value: 'Closed', label: 'Closed' },
        ]} {...register('status', { required: 'Required' })} error={errors.status?.message} />
        <FormField label="Resolved Date" {...register('resolvedDate')} placeholder="e.g. Mar 20, 2026" className="md:col-span-2" />
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {issue ? 'Update Issue' : 'Add Issue'}
        </button>
      </div>
    </form>
  )
}
