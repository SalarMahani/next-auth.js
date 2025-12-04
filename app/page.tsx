import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 text-gray-500">
      <Link
        className={
          'm-6 w-fit items-center justify-center rounded-[10px] bg-gray-800 p-6 py-2' +
          ' text-center text-gray-300' +
          ' text-2xl hover:bg-gray-300 hover:text-gray-800'
        }
        href="/register"
      >
        register
      </Link>
      <Link
        className={
          'm-6 w-fit items-center justify-center rounded-[10px] bg-gray-800 p-6 py-2' +
          ' text-center text-gray-300' +
          ' text-2xl hover:bg-gray-300 hover:text-gray-800'
        }
        href={'/login'}
      >
        login
      </Link>
    </div>
  )
}
