import './globals.css'
import React from 'react'

export const metadata = {
  title: 'ValuationIA',
  description: 'Calculadora DCF e Múltiplos - Clean Premium'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          <header className="mb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-tealish flex items-center justify-center text-white font-bold">V</div>
              <div>
                <h1 className="text-2xl font-semibold">ValuationIA</h1>
                <p className="text-sm text-gray-500">DCF & Múltiplos — Clean Premium</p>
              </div>
            </div>
          </header>

          <main>{children}</main>

          <footer className="mt-12 text-sm text-gray-500">&copy; {new Date().getFullYear()} ValuationIA</footer>
        </div>
      </body>
    </html>
  )
}
