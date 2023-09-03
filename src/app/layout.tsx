"use client"

import { useState } from 'react'
import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Mercado',
  description: 'Marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [state, setState] = useState('light')

  return (
    <html lang="en">
      <body>
        <Header setState={setState} state={state} />
        <main className='main' id={state}>
          {children}
        </main>
      </body>
    </html>
  )
}
