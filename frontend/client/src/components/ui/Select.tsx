import React, { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    onChange: (value: string) => void;
    options: { value: string; label: string }[];
}

const Select = ({ label, onChange, options, ...props}: SelectProps) => {
  return (
    <div className='relative'>
        {label && <label className='absolute -top-3 left-4 text-sm text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 px-1'>{label}</label>}
        <select 
            {...props}
            onChange={(e) => onChange(e.target.value)}
            className='w-full px-4 py-3 bg-[#F4F4F5] dark:bg-zinc-900 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow duration-300 appearance-none'
        >
            {options.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
            ))}
        </select>
    </div>
  )
}

export default Select