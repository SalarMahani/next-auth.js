import type { Metadata } from 'next'
// import { Boldonse } from 'next/font/google'
import './globals.css'

// const boldonse = Boldonse({
//   weight: ['400'],
//   style: ['normal'],
// })
export const metadata: Metadata = {
  title: 'Auth',
  description: 'authentication with Auth.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  )
}
