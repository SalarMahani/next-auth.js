import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/db/db'
import { users } from '@/db/usersSchema'
import { eq } from 'drizzle-orm'
import { compare } from 'bcryptjs'
export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as string
      return session
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        //check if the email exist or not
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email as string))
        if (!user) {
          throw new Error(`User with email ${credentials.email} not found`)
        } else {
          // check if the the password is correct or not
          const passwordCorrect = await compare(
            credentials.password as string,
            user.password as string,
          )
          if (!passwordCorrect) {
            throw new Error(`password is incorrect: ${credentials.password}`)
          }
        }

        return {
          id: user.id.toString(),
          email: user.email,
          password: user.password,
        }
      },
    }),
  ],
})
