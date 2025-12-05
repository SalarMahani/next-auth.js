'use server'

import { existedUserSchema } from '@/app/validation/existedUserSchema'
import { signIn, signOut } from '@/auth'

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
