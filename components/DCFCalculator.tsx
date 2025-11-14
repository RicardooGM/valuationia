'use client'
import React from 'react'
import { useForm } from 'react-hook-form'

type FormValues = {
  revenue: number
  ebitdaMargin: number
  growthRate: number
  wacc: number
  years: number
  netDebt: number
}

export default function DCFCalculator() {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      revenue: 1000000,
      ebitdaMargin: 0.2,
      growthRate: 0.05,
      wacc: 0.12,
      years: 5,
      netDebt: 0
    }
  })

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch('/api/dcf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      const json = await res.json()
      const resultsEl = document.getElementById('results')
      if (resultsEl) {
        resultsEl.innerHTML = `
          <div class="p-4 rounded-md bg-white shadow-sm">
            <p>Enterprise Value: <strong>R$ ${formatNumber(json.enterpriseValue)}</strong></p>
            <p>Equity Value: <strong>R$ ${formatNumber(json.equityValue)}</strong></p>
            <p>Fair Price (por ação): <strong>R$ ${formatNumber(json.pricePerShare ?? 0)}</strong></p>
          </div>
        `
      }
    } catch (err) {
      console.error(err)
    }
  }

  function formatNumber(n: number) {
    return n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 gap-3">
        <label className="text-sm text-gray-600">Receita atual (R$)</label>
        <input {...register('revenue', { valueAsNumber: true })} className="border p-2 rounded" />

        <label className="text-sm text-gray-600">Margem EBITDA (%)</label>
        <input {...register('ebitdaMargin', { valueAsNumber: true })} className="border p-2 rounded" />

        <label className="text-sm text-gray-600">Taxa de crescimento anual (%)</label>
        <input {...register('growthRate', { valueAsNumber: true })} className="border p-2 rounded" />

        <label className="text-sm text-gray-600">WACC (%)</label>
        <input {...register('wacc', { valueAsNumber: true })} className="border p-2 rounded" />

        <label className="text-sm text-gray-600">Horizonte (anos)</label>
        <input {...register('years', { valueAsNumber: true })} className="border p-2 rounded" />

        <label className="text-sm text-gray-600">Dívida líquida (R$)</label>
        <input {...register('netDebt', { valueAsNumber: true })} className="border p-2 rounded" />

        <button type="submit" className="mt-3 bg-tealish text-white rounded px-4 py-2">Calcular DCF</button>
      </div>
    </form>
  )
}
