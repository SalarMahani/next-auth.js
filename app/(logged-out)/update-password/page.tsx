import { db } from '@/db/db'
import { passwordResetTokenSchema } from '@/db/AllSchemas'
import { eq } from 'drizzle-orm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import * as React from 'react'
import UpdatePasswordForm from '@/app/(logged-out)/update-password/update-password-form/page'

const currentTime = Date.now()
async function UpdatePassword({
  searchParams,
}: {
  searchParams: { token?: string }
}) {
  let tokenIsValid = false
  const { token } = await searchParams

  if (token) {
    const [passwordResetTokenSchemaValue] = await db
      .select()
      .from(passwordResetTokenSchema)
      .where(eq(passwordResetTokenSchema.token, token))

    if (passwordResetTokenSchemaValue?.tokenExpiry) {
      if (currentTime < passwordResetTokenSchemaValue.tokenExpiry.getTime()) {
        tokenIsValid = true
      }
    }
  }

  return (
    <main
      className={
        'mb-3 flex min-h-screen items-center justify-center bg-gray-900 text-xl'
      }
    >
      <Card className={'w-110 gap-2 bg-transparent text-gray-300'}>
        <CardHeader>
          <CardTitle className={'mb-5 text-3xl'}>
            {tokenIsValid
              ? 'Update password'
              : 'Your password reset link is invalid or has expired!'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tokenIsValid && token ? (
            <UpdatePasswordForm token={token} />
          ) : (
            <Link
              className={'text-sm underline hover:font-bold'}
              href={'/password-reset'}
            >
              Request another password reset link
            </Link>
          )}
        </CardContent>
      </Card>
    </main>
  )
}

export default UpdatePassword
