'use server'

import { db } from '@/db/db'
import { users } from '@/db/AllSchemas'
import { eq } from 'drizzle-orm'
import { existedUserSchema } from '@/app/validation/existedUserSchema'
import bcrypt from 'bcryptjs'
import { redirect } from 'next/navigation'

export async function loginUser({
  email,
  password,
}: {
  email: string
  password: string
}) {
  let shouldRedirect = false
  try {
    console.log('start')
    // const validLoginInput = existedUserSchema.safeParse({ email, password })
    const validLoginInput = existedUserSchema.safeParse({ email, password })
    console.log('validLoginInputs', validLoginInput)
    if (!validLoginInput.success) {
      return {
        error: true,
        message: validLoginInput.error.message,
      }
    }
    //now we know the user input is correct
    console.log('the user input is valid.')
    const userExist = await db
      .select()
      .from(users)
      .where(eq(users.email, email))

    if (userExist.length === 0) {
      console.log('the user was not exist')
      return {
        error: true,
        message: `User doesn't exist with that email address`,
      }
    }

    console.log(
      'the user was exist and this is the data from existing user:',
      userExist,
    )
    const hashPassword = userExist[0].password!
    const isMatch = await bcrypt.compare(password, hashPassword)
    console.log('is match', isMatch)
    if (!isMatch) {
      console.log('the password is not correct')
      return {
        error: true,
        problem: 'password',
        message: `the password is not correct`,
      }
    }
    console.log('password is correct')
    shouldRedirect = true
  } catch (e) {
    console.log('we got error in catch', e)
    return {
      error: true,
      massage: `An error occurred while we try to login. ${e}`,
    }
  }
  if (shouldRedirect) {
    redirect('/home')
  }
}
