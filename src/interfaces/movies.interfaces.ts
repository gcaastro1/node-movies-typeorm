import { DeepPartial, Repository } from 'typeorm'
import { z } from 'zod'
import { Movie } from '../entities'
import { createMoviesSchema, moviesSchema } from '../schemas'
import { readMoviesSchema } from '../schemas/movies.schema'

export type iMovie = z.infer<typeof moviesSchema>
export type iMovieCreate = z.infer<typeof createMoviesSchema>
export type iMovieUpdate = DeepPartial<Movie>
export type iMovieRepo = Repository<Movie>
export type iMovieRead = z.infer<typeof readMoviesSchema>
