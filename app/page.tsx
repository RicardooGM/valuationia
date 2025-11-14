'use client'
import React from 'react'
import DCFCalculator from '../components/DCFCalculator'

export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <section className="col-span-1 input-card p-6">
        <h2 className="text-lg font-medium mb-4">Inputs</h2>
        <DCFCalculator />
      </section>

      <section className="col-span-2 p-6">
        <h2 className="text-lg font-medium mb-4">Resultado</h2>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <p className="text-sm text-gray-600">Aqui aparecerá o Enterprise Value, Equity Value e preço por ação.</p>
          <div id="results" className="mt-6"></div>
        </div>
      </section>
    </div>
  )
}
