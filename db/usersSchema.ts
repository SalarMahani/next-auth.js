import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),

  email: text('email').unique(),

  // For credentials users only; OAuth users will have this = null
  password: text('password'),

  // NEW → OAuth provider (e.g., 'google', 'github', 'credentials')
  provider: text('provider').notNull().default('credentials'),

  // NEW → The provider's user id (e.g., Google's account ID)
  providerId: text('provider_id'),

  createdAt: timestamp().defaultNow(),
})
