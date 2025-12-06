import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
export const metadata: Metadata = {
  title: 'Auth',
  description: 'authentication with Auth.js',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <Toaster position={'top-center'} />
      </body>
    </html>
  )
}
