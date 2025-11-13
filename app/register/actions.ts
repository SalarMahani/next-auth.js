'use server'

import z from 'zod'
import { passwordSchema } from '@/app/validation/passwordSchema'

export async function registerUser({
  email,
  password,
  confirmPassword,
}: {
  email: string
  password: string
  confirmPassword: string
}) {
  const newUserSchema = z
    .object({
      email: z.email(),
    })
    .and(passwordSchema)
  const newUserValidation = newUserSchema.safeParse({
    email,
    password,
    confirmPassword,
  })

  console.log('new User Validation onw', newUserValidation.error?.message)
  if (!newUserValidation.success) {
    return {
      error: true,
      message: newUserValidation.error.message,
    }
  }
  // console.log('new User Validation', newUserValidation)
  return {
    error: false,
  }
}
