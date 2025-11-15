'use server'

import z from 'zod'
import { passwordSchema } from '@/app/validation/passwordSchema'
import { hash } from 'bcryptjs'
import { db } from '@/db/db'
import { users } from '@/db/AllSchemas'
import { eq } from 'drizzle-orm'

export async function registerUser({
  email,
  password,
  confirmPassword,
}: {
  email: string
  password: string
  confirmPassword: string
}) {
  try {
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

    if (!newUserValidation.success) {
      return {
        error: true,
        message: newUserValidation.error.message,
      }
    }
    const userExist = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
    // console.log('user exists', userExist)
    if (userExist.length) {
      return {
        error: true,
        message: `User already exists with that email address`,
      }
    }
    // console.log('new User Validation', newUserValidation)

    const hashPassword = await hash(password, 10)
    await db.insert(users).values({
      email: email,
      password: hashPassword,
    })
    console.log('user added to database successfully.')
  } catch (e) {
    return {
      error: true,
      massage: `An error occurred while registering. ${e}`,
    }
  }
}
