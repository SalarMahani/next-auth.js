'use server'

import { existedUserSchema } from '@/app/validation/existedUserSchema'
import { auth, signIn, signOut } from '@/auth'
import { use } from 'react'

export async function loginUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  try {
    const validLoginInput = existedUserSchema.safeParse({ email, password })
    if (!validLoginInput.success) {
      return {
        error: true,
        message: validLoginInput.error.message,
      }
    }
    //now we know the user input is correct
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  } catch (e) {
    return {
      error: true,
      message: `username or password is incorrect. `,
    }
  }
}

export async function logOut() {
  await signOut()
}

export async function loginWithGoogle() {
  console.log('we are in .')
  const session = await auth()
  if (session) {
    throw new Error('You need to log out from your account firest')
  }
  await signIn('google', { redirectTo: '/dashboard' })
}
