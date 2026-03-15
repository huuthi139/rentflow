"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import type { HandoverReport } from '@/lib/types'

interface HandoverFormData {
  property: string
  tenant: string
  type: string
  date: string
  agent: string
  condition: string
  notes: string
  photos: string
  issues: string
  meterElectric: number
  meterWater: number
  depositDeductions: number
  signedByTenant: boolean
  signedByAgent: boolean
}

interface HandoverFormProps {
  report?: HandoverReport
  onSubmit: (data: HandoverReport) => void
  onCancel: () => void
}

export default function HandoverForm({ report, onSubmit, onCancel }: HandoverFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<HandoverFormData>({
    defaultValues: report ? {
      property: report.property,
      tenant: report.tenant,
      type: report.type,
      date: report.date,
      agent: report.agent,
      condition: report.condition,
      notes: report.notes,
      photos: report.photos.join(', '),
      issues: report.issues.join(', '),
      meterElectric: report.meterReadings.electric,
      meterWater: report.meterReadings.water,
      depositDeductions: report.depositDeductions,
      signedByTenant: report.signedByTenant,
      signedByAgent: report.signedByAgent,
    } : {
      type: 'Check-in',
      condition: 'Good',
      depositDeductions: 0,
      meterElectric: 0,
      meterWater: 0,
      signedByTenant: false,
      signedByAgent: false,
    }
  })

  const onFormSubmit = (data: HandoverFormData) => {
    const result: HandoverReport = {
      id: report?.id || `HO-${String(Math.floor(100 + Math.random() * 900)).padStart(3, '0')}`,
      property: data.property,
      tenant: data.tenant,
      type: data.type as HandoverReport['type'],
      date: data.date,
      agent: data.agent,
      condition: data.condition as HandoverReport['condition'],
      notes: data.notes || '',
      photos: data.photos ? data.photos.split(',').map(s => s.trim()).filter(Boolean) : [],
      issues: data.issues ? data.issues.split(',').map(s => s.trim()).filter(Boolean) : [],
      meterReadings: {
        electric: Number(data.meterElectric),
        water: Number(data.meterWater),
      },
      depositDeductions: Number(data.depositDeductions),
      signedByTenant: Boolean(data.signedByTenant),
      signedByAgent: Boolean(data.signedByAgent),
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Property" required {...register('property', { required: 'Required' })} error={errors.property?.message} />
        <FormField label="Tenant" required {...register('tenant', { required: 'Required' })} error={errors.tenant?.message} />
        <FormField label="Type" as="select" required options={[
          { value: 'Check-in', label: 'Check-in' },
          { value: 'Check-out', label: 'Check-out' },
        ]} {...register('type', { required: 'Required' })} error={errors.type?.message} />
        <FormField label="Date" required {...register('date', { required: 'Required' })} placeholder="e.g. Oct 12, 2023" error={errors.date?.message} />
        <FormField label="Agent" required {...register('agent', { required: 'Required' })} error={errors.agent?.message} />
        <FormField label="Condition" as="select" required options={[
          { value: 'Excellent', label: 'Excellent' },
          { value: 'Good', label: 'Good' },
          { value: 'Fair', label: 'Fair' },
          { value: 'Poor', label: 'Poor' },
        ]} {...register('condition', { required: 'Required' })} error={errors.condition?.message} />
        <FormField label="Notes" as="textarea" className="md:col-span-2" {...register('notes')} />
        <FormField label="Photos (comma-separated URLs)" className="md:col-span-2" {...register('photos')} placeholder="e.g. photo1.jpg, photo2.jpg" />
        <FormField label="Issues (comma-separated)" className="md:col-span-2" {...register('issues')} placeholder="e.g. Scratched floor, Broken handle" />
      </div>

      <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Meter Readings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Electric (kWh)" type="number" required {...register('meterElectric', { required: 'Required', min: { value: 0, message: 'Must be positive' } })} error={errors.meterElectric?.message} />
          <FormField label="Water (m³)" type="number" required {...register('meterWater', { required: 'Required', min: { value: 0, message: 'Must be positive' } })} error={errors.meterWater?.message} />
        </div>
      </div>

      <div className="border-t border-slate-100 dark:border-slate-700 pt-4">
        <h3 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Financial & Signatures</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField label="Deposit Deductions ($)" type="number" {...register('depositDeductions', { min: { value: 0, message: 'Must be positive' } })} error={errors.depositDeductions?.message} />
          <div />
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" {...register('signedByTenant')} className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/50" />
            Signed by Tenant
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300 cursor-pointer">
            <input type="checkbox" {...register('signedByAgent')} className="w-4 h-4 rounded border-slate-300 dark:border-slate-600 text-primary focus:ring-primary/50" />
            Signed by Agent
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {report ? 'Update Report' : 'Add Report'}
        </button>
      </div>
    </form>
  )
}
