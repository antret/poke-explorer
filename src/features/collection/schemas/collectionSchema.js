import { z } from 'zod'

export const collectionSchema = z.object({
  pokemonId: z.coerce
    .number()
    .int('El identificador del Pokémon debe ser un número entero')
    .positive('Selecciona un Pokémon válido'),

  pokemonName: z
    .string()
    .trim()
    .min(1, 'Selecciona un Pokémon'),

  nickname: z
    .string()
    .trim()
    .min(2, 'El apodo debe tener al menos 2 caracteres')
    .max(30, 'El apodo no puede superar los 30 caracteres'),

  role: z
    .string()
    .trim()
    .min(2, 'El rol debe tener al menos 2 caracteres')
    .max(40, 'El rol no puede superar los 40 caracteres'),

  notes: z
    .string()
    .trim()
    .min(10, 'Las notas deben tener al menos 10 caracteres')
    .max(300, 'Las notas no pueden superar los 300 caracteres'),
})