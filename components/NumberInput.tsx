'use client'
import React from 'react'

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string
}

export default function NumberInput({ label, ...props }: Props) {
  return (
    <label className="block mb-3">
      {label && <div className="text-sm text-gray-600 mb-1">{label}</div>}
      <input
        {...props}
        type="number"
        className="w-full border border-gray-200 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-tealish"
      />
    </label>
  )
}
