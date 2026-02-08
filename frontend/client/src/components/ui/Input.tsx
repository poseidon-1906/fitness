
import { type InputHTMLAttributes } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    onChange: (value: string | number) => void;
}

const Input = ({ label, onChange, type, ...props}: InputProps) => {
  return (
    <div className='relative'>
        {label && <label className='absolute -top-3 left-4 text-sm text-zinc-500 dark:text-zinc-400 bg-white dark:bg-zinc-800 px-1'>{label}</label>}
        <input 
            {...props}
            type={type}
            onChange={(e) => onChange(type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value)}
            className='w-full px-4 py-3 bg-[#F4F4F5] dark:bg-zinc-900 border-2 border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-shadow duration-300'
        />
    </div>
  )
}

export default Input
