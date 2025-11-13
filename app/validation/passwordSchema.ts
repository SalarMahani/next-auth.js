import { z } from 'zod'

export const passwordSchema = z
  .object({
    password: z
      .string()
      .min(5, 'the password must contain at least 5 characters')
      .regex(
        /[A-Z]/,
        'the password must contain at least 1 one uppercase letter',
      )
      .regex(/[a-z]/, 'the password must contain at least 1 one lower letter'),
    confirmPassword: z
      .string()
      .min(5, 'the password must contain at least 5 characters')
      .regex(
        /[A-Z]/,
        'the password must contain at least 1 one uppercase letter',
      )
      .regex(/[a-z]/, 'the password must contain at least 1 one lower letter'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        path: ['confirmPassword'],
        message: "password doesn't match baby",
      })
    }
  })
