import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-500">
      <Link href="/register">register</Link>
    </div>
  )
}
