import z from 'zod'
import { passwordSchema } from '@/app/validation/passwordSchema'

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(5, 'the password must contain at least 5 characters')
      .regex(
        /[A-Z]/,
        'the password must contain at least 1 one uppercase letter',
      )
      .regex(/[a-z]/, 'the password must contain at least 1 one lower letter'),
  })
  .and(passwordSchema)

export type changePasswordSchemaType = z.infer<typeof changePasswordSchema>
