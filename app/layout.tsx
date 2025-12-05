import type { Metadata } from 'next'
import './globals.css'
import { auth } from '@/auth'
import LogoutButton from '@/app/components/LogoutButton'

export const metadata: Metadata = {
  title: 'Auth',
  description: 'authentication with Auth.js',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <div>
          {session?.user?.email ? (
            <div>
              {session.user.email}
              <LogoutButton />
            </div>
          ) : (
            'No currently user logged in '
          )}
        </div>
        {children}
      </body>
    </html>
  )
}
