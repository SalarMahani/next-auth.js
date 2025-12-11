import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from '@/db/usersSchema'

export const passwordResetTokenSchema = pgTable('password_reset_tokens', {
  id: serial('id').primaryKey(),
  userId: integer('userId')
    .references(() => users.id, {
      onDelete: 'cascade',
    })
    .unique(),
  token: text('token'),
  tokenExpiry: timestamp('tokenExpiry'),
})
