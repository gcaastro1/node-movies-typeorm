import { z } from 'zod'

export const moviesSchema = z.object({
  id: z.number(),
  name: z.string().min(3).max(50),
  description: z.string().nullish(),
  price: z.number().int(),
  duration: z.number().gt(0),
})

export const createMoviesSchema = moviesSchema.omit({
  id: true,
})

export const updateMoviesSchema = createMoviesSchema.partial()

export const manyMoviesSchema = z.array(moviesSchema)

export const readMoviesSchema = z.object({
  count: z.number(),
  data: manyMoviesSchema,
  nextPage: z.string().nullish(),
  prevPage: z.string().nullish(),
})
