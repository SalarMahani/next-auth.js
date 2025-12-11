import { z } from 'zod'

export const passwordResetSchema = z.object({
  email: z.email(),
})

export type passwordResetSchemaType = z.infer<typeof passwordResetSchema>
