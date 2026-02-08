import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary'
}

const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
    const baseClasses = 'w-full py-3 rounded-lg font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
    const variantClasses = {
        primary: 'bg-emerald-500 text-white hover:bg-emerald-600 focus:ring-emerald-500',
        secondary: 'bg-zinc-200 text-zinc-800 hover:bg-zinc-300 focus:ring-zinc-400'
    }
  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props} />
  )
}

export default Button