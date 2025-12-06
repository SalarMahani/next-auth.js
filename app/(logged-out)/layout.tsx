import { ReactNode } from 'react'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  console.log('session', session)
  if (!!session?.user?.id) {
    redirect('/dashboard')
  }
  return children
}

export default Layout
