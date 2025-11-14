import { boolean, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').unique(),
  password: text('password'),
  createdAt: timestamp().defaultNow(),
  twoFactAuthActivated: boolean('twoFactAuthActivated').default(false),
  twoFactAuthToken: text('twoFactAuthToken'),
})
