'use client'
import * as React from 'react'
import Image from 'next/image'
import google from '@/public/google.png'
import github from '@/public/github.png'
import email from '@/public/communication.png'
import Link from 'next/link'
import { loginWithGoogle } from '@/app/(logged-out)/login/email-form/actions'

function Login() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-900 text-6xl`}
    >
      <Link
        href={'/login/email-form'}
        className="border-primary-300 flex w-85 cursor-pointer items-center gap-6 border px-10 py-4 text-lg font-medium"
      >
        <div className={'relative aspect-square'}>
          <Image
            src={email}
            alt="email logo"
            height="34"
            width="34"
            className={'object-cover'}
          />
        </div>
        <span>Continue with Email</span>
      </Link>
      <form action={loginWithGoogle}>
        <button className="border-primary-300 flex w-85 cursor-pointer items-center gap-6 border px-10 py-4 text-lg font-medium">
          <div className={'relative aspect-square'}>
            <Image
              src={google}
              alt="google logo"
              height="34"
              width="34"
              className={'object-cover'}
            />
          </div>
          <span>Continue with Google </span>
        </button>
      </form>
    </main>
  )
}

export default Login
