"use client"
import { useState } from 'react'
import './globals.css'
import Header from '@/components/Header'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState('light')

  return (
    <html lang="en">
      <head>
        <title>Detalle</title>
        <link rel="icon" type="image/x-icon" href="/logo.png"></link>
      </head>
      <body>
        <Header setState={setState} state={state} />
        <main className='main' id={state}>
          {children}
        </main>
      </body>
    </html>
  )
}
