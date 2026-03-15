"use client";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none w-full pl-3 pr-9 py-2.5 text-sm bg-white border border-primary/10 rounded-lg outline-none cursor-pointer transition-all text-slate-700 focus:border-primary/30 focus:ring-2 focus:ring-primary/10"
      >
        <option value="">{label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-base text-slate-400 pointer-events-none">
        expand_more
      </span>
    </div>
  );
}
