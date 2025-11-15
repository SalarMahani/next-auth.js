import { z } from 'zod'

export const existedUserSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(5, 'the password must contain at least 5 characters')
    .regex(/[A-Z]/, 'the password must contain at least 1 one uppercase letter')
    .regex(/[a-z]/, 'the password must contain at least 1 one lower letter'),
})
export type existedUserSchemaType = z.infer<typeof existedUserSchema>
