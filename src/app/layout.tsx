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
        
        <div className='chat'>
          <iframe width="350" height="430" allow="microphone;" title='bot' src="https://console.dialogflow.com/api-client/demo/embedded/627682b9-43b5-4bc2-8058-358a08a1f887"></iframe>
        </div>
      </body>
    </html>
  )
}
