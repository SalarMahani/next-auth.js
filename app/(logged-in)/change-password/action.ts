'use server'

import { auth } from '@/auth'
import { changePasswordSchema } from '@/app/validation/changePasswordSchema'
import { db } from '@/db/db'
import { users } from '@/db/AllSchemas'
import { eq } from 'drizzle-orm'
import { compare, hash } from 'bcryptjs'

export async function changePassword({
  currentPassword,
  password,
  confirmPassword,
}: {
  currentPassword: string
  password: string
  confirmPassword: string
}) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return {
        error: true,
        message: 'You must be logged in to change your password',
      }
    }
    const passwordValidation = changePasswordSchema.safeParse({
      currentPassword,
      password,
      confirmPassword,
    })

    if (passwordValidation?.error) {
      return {
        error: true,
        message:
          passwordValidation?.error.issues[0]?.message ??
          'an error occurred while trying to change your password ',
      }
    }
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, parseInt(session.user.id)))

    if (!user) {
      return {
        error: true,
        message: 'User not found',
      }
    }

    const comparePassword = await compare(
      currentPassword,
      user.password as string,
    )
    if (!comparePassword) {
      return {
        error: true,
        message:
          'the current password does not match with the password in the database ',
      }
    }

    const compereIndividualPassword = await compare(
      password,
      user.password as string,
    )
    if (compereIndividualPassword) {
      return {
        error: true,
        message: 'you use the previous password for setting the new password',
      }
    }
    const hashPassword = await hash(password, 10)
    await db
      .update(users)
      .set({
        password: hashPassword,
      })
      .where(eq(users.id, parseInt(session.user.id)))
  } catch (_) {
    return {
      error: true,
      message: 'we got error while trying to change your password',
    }
  }
}
