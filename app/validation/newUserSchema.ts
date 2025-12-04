import { passwordSchema } from '@/app/validation/passwordSchema'
import z from 'zod'

export const newUserSchema = z
  .object({
    email: z.email(),
  })
  .and(passwordSchema)

export type newUserSchemaType = z.infer<typeof newUserSchema>
