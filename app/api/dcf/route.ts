import { NextResponse } from 'next/server'

type RequestBody = {
  revenue: number
  ebitdaMargin: number
  growthRate: number
  wacc: number
  years: number
  netDebt: number
}

export async function POST(req: Request) {
  const body: RequestBody = await req.json()

  const wacc = normalizePercent(body.wacc)
  const growthRate = normalizePercent(body.growthRate)
  const ebitdaMargin = normalizePercent(body.ebitdaMargin)

  const cashFlows: number[] = []
  let revenue = body.revenue
  for (let i = 0; i < body.years; i++) {
    revenue = revenue * (1 + growthRate)
    const ebitda = revenue * ebitdaMargin
    const capex = ebitda * 0.1
    const changeWC = ebitda * 0.02
    const fcff = ebitda - capex - changeWC
    cashFlows.push(fcff)
  }

  const terminalCash = cashFlows[cashFlows.length - 1] * (1 + growthRate)
  const terminalValue = terminalCash / (wacc - growthRate)

  const discounted = cashFlows.reduce((sum, cf, idx) => {
    return sum + cf / Math.pow(1 + wacc, idx + 1)
  }, 0)

  const discountedTV = terminalValue / Math.pow(1 + wacc, body.years)
  const enterpriseValue = discounted + discountedTV
  const equityValue = enterpriseValue - body.netDebt

  const shares = 1000000
  const pricePerShare = equityValue / shares

  return NextResponse.json({ enterpriseValue, equityValue, pricePerShare })
}

function normalizePercent(v: number) {
  if (v > 1) return v / 100
  return v
}
