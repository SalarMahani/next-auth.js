'use server'

import { passwordSchema } from '@/app/validation/passwordSchema'
import { passwordResetTokenSchema } from '@/db/passwordResetTokenSchema'
import { eq } from 'drizzle-orm'
import { auth } from '@/auth'
import { hash } from 'bcryptjs'
import { users } from '@/db/AllSchemas'
import { db } from '@/db/db'

export async function updatePasswordForm({
  password,
  confirmPassword,
  token,
}: {
  password: string
  confirmPassword: string
  token: string
}) {
  try {
    const session = await auth()
    if (session?.user?.id) {
      return {
        error: true,
        message: 'Already looged in. Please log out to reset your password.',
      }
    }

    //validate the password
    const passwordValidation = passwordSchema.safeParse({
      password,
      confirmPassword,
    })

    if (passwordValidation?.error) {
      return {
        error: true,
        message:
          passwordValidation?.error.issues[0]?.message ??
          'your password does not match the requirements',
      }
    }

    let tokenIsValid = false
    if (token) {
      const [passwordResetTokenSchemaValue] = await db
        .select()
        .from(passwordResetTokenSchema)
        .where(eq(passwordResetTokenSchema.token, token))

      if (passwordResetTokenSchemaValue?.tokenExpiry) {
        const currentTime = Date.now()
        if (currentTime < passwordResetTokenSchemaValue.tokenExpiry.getTime()) {
          tokenIsValid = true
        }
      }
      if (!tokenIsValid) {
        return {
          error: true,
          tokenIsExpired: true,
          message: 'your token is expired, please reset your password again.',
        }
      }

      const hashedPassword = await hash(password, 10)
      //update the password in users table
      await db
        .update(users)
        .set({
          password: hashedPassword,
        })
        .where(eq(users.id, passwordResetTokenSchemaValue.userId!))

      // delete the token from the passwordResetTokenSchema.
      await db
        .delete(passwordResetTokenSchema)
        .where(
          eq(passwordResetTokenSchema.id, passwordResetTokenSchemaValue.id),
        )
    }
  } catch (e) {
    console.log('errors:', e)
    return {
      error: true,
      message: 'we got error while trying to change your password',
    }
  }
}
