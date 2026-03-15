"use client"

import { forwardRef } from 'react'

interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> {
  label: string
  error?: string
  as?: 'input' | 'select' | 'textarea'
  options?: { value: string; label: string }[]
}

const FormField = forwardRef<any, FormFieldProps>(({ label, error, as = 'input', options, className, ...props }, ref) => {
  const baseClasses = "w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-200 dark:placeholder:text-slate-400"
  const errorClasses = error ? "border-red-300 dark:border-red-500" : "border-slate-200 dark:border-slate-600"

  return (
    <div className={className}>
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
        {label}
        {props.required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {as === 'select' ? (
        <select ref={ref} className={`${baseClasses} ${errorClasses}`} {...(props as any)}>
          <option value="">Select...</option>
          {options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      ) : as === 'textarea' ? (
        <textarea ref={ref} className={`${baseClasses} ${errorClasses}`} rows={3} {...(props as any)} />
      ) : (
        <input ref={ref} className={`${baseClasses} ${errorClasses}`} {...(props as any)} />
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
})

FormField.displayName = 'FormField'
export default FormField
