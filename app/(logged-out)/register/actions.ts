'use server'

import { hash } from 'bcryptjs'
import { db } from '@/db/db'
import { users } from '@/db/AllSchemas'
import { eq } from 'drizzle-orm'
import { newUserSchema } from '@/app/validation/newUserSchema'

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
    if (userExist.length) {
      return {
        error: true,
        message: `User already exists with that email address`,
      }
    }

    const hashPassword = await hash(password, 10)
    await db.insert(users).values({
      email: email,
      password: hashPassword,
    })
    // console.log('user added to database successfully.')
  } catch (e) {
    return {
      error: true,
      massage: `An error occurred while registering. we catch in in try catch block ${e}`,
    }
  }
}
