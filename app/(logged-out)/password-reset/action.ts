'use server'

import { passwordResetSchema } from '@/app/validation/passwordResetSchema'
import { db } from '@/db/db'
import { passwordResetTokenSchema, users } from '@/db/AllSchemas'
import { eq } from 'drizzle-orm'
import { randomBytes } from 'node:crypto'
import { mailer } from '@/lib/email'

export async function passwordReset({ email }: { email: string }) {
  try {
    const emailValid = passwordResetSchema.safeParse({ email })
    if (!emailValid) {
      return {
        error: true,
        message: 'Invalid email syntax',
      }
    }
    const [user] = await db.select().from(users).where(eq(users.email, email))

    if (!user) {
      return
    }
    const passwordResetToken = randomBytes(32).toString('hex')
    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000)

    await db
      .insert(passwordResetTokenSchema)
      .values({
        userId: user.id,
        tokenExpiry,
        token: passwordResetToken,
      })
      .onConflictDoUpdate({
        // target explain=> “If the conflict happens on this column, then run the update logic.”
        target: passwordResetTokenSchema.userId,
        set: {
          tokenExpiry,
          token: passwordResetToken,
        },
      })

    const resetLink = `${process.env.SITE_BASE_URL}/update-password?token=${passwordResetToken}`
    await mailer.sendMail({
      from: 'test@resend.dev',
      subject: 'Your password reset request',
      to: email,
      html: `Hey ${email}! You requested to reset your password.
      Here's your new password reset link. This link will expire in 1 hour
      <a href="${resetLink}">reset link</a>
      `,
    })
  } catch (e) {
    console.log('error', e)
    return {
      error: true,
      message: 'we got an error while trying to reset your password',
    }
  }
}
