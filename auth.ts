import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { db } from '@/db/db'
import { users } from '@/db/usersSchema'
import { eq } from 'drizzle-orm'
import { compare } from 'bcryptjs'
import Google from 'next-auth/providers/google'

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

    async signIn({ user, account, profile }) {
      if (account?.provider === 'google') {
        // 0. auth js may return null for the email, so we need to check.
        if (!user.email) return false
        // 1. Check if a user with the same email already exists
        const [existingUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, user.email!))
          .limit(1)

        let dbUser = existingUser

        if (!dbUser) {
          // 2. If not, create the user
          const [createdUser] = await db
            .insert(users)
            .values({
              email: user.email!,
              password: null, // Google users don’t have password
              provider: 'google',
              providerId: account?.providerAccountId,
            })
            .returning()
          dbUser = createdUser
        }
        user.id = dbUser.id.toString()
      }

      return true // allow login
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
        }
      },
    }),
    Google,
  ],
})
