import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import AppError from '../errors'
import {
  iMovie,
  iMovieCreate,
  iMovieRead,
  iMovieRepo,
  iMovieUpdate,
} from '../interfaces'
import { moviesSchema } from '../schemas'
import { readMoviesSchema } from '../schemas/movies.schema'

const create = async (payload: iMovieCreate): Promise<iMovie> => {
  const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)

  const findMovie: Movie | null = await movieRepo.findOne({
    where: {
      name: payload.name,
    },
  })

  if (findMovie) throw new AppError('Movie already exists.', 409)

  const movie: iMovie = await movieRepo.save(payload)

  return moviesSchema.parse(movie)
}

const read = async (
  perPage: any,
  page: any,
  order: any,
  sort: any
): Promise<iMovieRead> => {
  const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)

  let take: number = Number(perPage) || 5
  let skip: number = Number(page) || 1
  const sortKeys: Array<string> = ['price', 'duration']
  const sortValue: string = sortKeys.includes(sort) ? sort : 'id'
  let ordering: any = order || 'ASC'

  console.log(sortValue)

  if (take <= 0) take = 5
  if (take > 5) take = 5
  if (skip <= 0) skip = 1
  if (!sort) ordering = 'ASC'

  const movies: Array<Movie> = await movieRepo.find({
    take,
    skip: take * (skip - 1),
    order:
      sortValue === 'duration'
        ? { duration: ordering }
        : sortValue === 'price'
        ? { price: ordering }
        : { id: ordering },
  })

  const baseURL: string = 'http://localhost:3000/movies'

  const prevPage: string | null =
    skip <= 1 ? null : `${baseURL}?page=${skip - 1}&perPage=${take}`

  const ensureNextPage = await movieRepo.find({
    take,
    skip: take * skip,
  })

  const nextPage: string | null = !ensureNextPage.length
    ? null
    : `${baseURL}?page=${skip + 1}&perPage=${take}`

  const count: Array<Movie> = await movieRepo.find({})

  const paginationData = {
    count: count.length,
    data: movies,
    nextPage: nextPage,
    prevPage: prevPage,
  }

  return readMoviesSchema.parse(paginationData)
}

const update = async (id: number, payload: iMovieUpdate): Promise<iMovie> => {
  const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)

  const findMovie: Movie | null = await movieRepo.findOneBy({
    id,
  })

  if (payload.name) {
    const validateName: Movie | null = await movieRepo.findOne({
      where: {
        name: payload.name,
      },
    })

    if (validateName) throw new AppError('Movie already exists.', 409)
  }

  const data: Movie = await movieRepo.save({
    ...findMovie,
    ...payload,
  })

  return moviesSchema.parse(data)
}

const remove = async (id: number): Promise<void> => {
  const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)

  await movieRepo.delete(id)
}

export default { create, read, update, remove }
