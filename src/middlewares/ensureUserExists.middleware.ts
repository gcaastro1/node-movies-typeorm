import { NextFunction, Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { Movie } from '../entities'
import AppError from '../errors'
import { iMovieRepo } from '../interfaces'

const ensureUserExists = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const movieRepo: iMovieRepo = AppDataSource.getRepository(Movie)
    const id = Number(req.params.id)
    
    const findMovie = await movieRepo.findOneBy({
      id,
    })
  
    if (!findMovie) throw new AppError('Movie not found', 404)

    return next()
  }

export default ensureUserExists
