import { ReactNode } from 'react'
import LogoutButton from '@/app/components/LogoutButton'
import Link from 'next/link'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session?.user?.id) {
    redirect('/')
  }
  return (
    <div className={'flex min-h-screen flex-col'}>
      <nav
        className={
          'flex items-center justify-between bg-gray-800 p-4 text-gray-200'
        }
      >
        <ul className={'flex gap-4'}>
          <li>
            <Link href={'/dashboard'}>Dashboard</Link>
          </li>
          <li>
            {session?.user?.image ? (
              <button className="cursor-not-allowed text-gray-400" disabled>
                Change password
              </button>
            ) : (
              <Link href="/change-password">Change Password</Link>
            )}
          </li>
        </ul>
        <div>
          <LogoutButton />
        </div>
      </nav>
      <div className={'flex flex-1 items-center justify-center bg-gray-900'}>
        {children}
      </div>
    </div>
  )
}

export default Layout
