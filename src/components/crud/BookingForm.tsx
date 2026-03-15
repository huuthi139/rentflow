"use client"

import { useForm } from 'react-hook-form'
import FormField from '@/components/ui/FormField'
import type { Booking } from '@/lib/types'

interface BookingFormData {
  tenant: string
  property: string
  agent: string
  dateTime: string
  notes: string
  status: string
}

interface BookingFormProps {
  booking?: Booking
  onSubmit: (data: Booking) => void
  onCancel: () => void
}

export default function BookingForm({ booking, onSubmit, onCancel }: BookingFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>({
    defaultValues: booking ? {
      tenant: booking.tenant,
      property: booking.property,
      agent: booking.agent,
      dateTime: booking.dateTime,
      notes: booking.notes,
      status: booking.status,
    } : {
      status: 'Scheduled',
    }
  })

  const onFormSubmit = (data: BookingFormData) => {
    const result: Booking = {
      id: booking?.id || `BK-${String(Math.floor(100 + Math.random() * 900))}`,
      tenant: data.tenant,
      property: data.property,
      agent: data.agent,
      dateTime: data.dateTime,
      notes: data.notes,
      status: data.status as Booking['status'],
    }
    onSubmit(result)
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label="Tenant / Client" required {...register('tenant', { required: 'Required' })} error={errors.tenant?.message} />
        <FormField label="Property" required {...register('property', { required: 'Required' })} error={errors.property?.message} />
        <FormField label="Agent" required {...register('agent', { required: 'Required' })} error={errors.agent?.message} />
        <FormField label="Date & Time" type="datetime-local" required {...register('dateTime', { required: 'Required' })} error={errors.dateTime?.message} />
        <FormField label="Status" as="select" required options={[
          { value: 'Scheduled', label: 'Scheduled' },
          { value: 'Completed', label: 'Completed' },
          { value: 'Cancelled', label: 'Cancelled' },
          { value: 'No Show', label: 'No Show' },
        ]} {...register('status', { required: 'Required' })} error={errors.status?.message} />
      </div>
      <FormField label="Notes" as="textarea" {...register('notes')} />

      <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
        <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">
          Cancel
        </button>
        <button type="submit" className="px-6 py-2 text-sm font-bold text-white bg-primary rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
          {booking ? 'Update Booking' : 'Add Booking'}
        </button>
      </div>
    </form>
  )
}
