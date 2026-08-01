import { z } from 'zod'

export const postSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, 'El título debe tener al menos 3 caracteres'),

  body: z
    .string()
    .trim()
    .min(10, 'El contenido debe tener al menos 10 caracteres'),
})