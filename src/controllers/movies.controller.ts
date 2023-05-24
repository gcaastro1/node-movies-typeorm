import { Request, Response } from 'express'
import { iMovieCreate, iMovieRead, iMovieUpdate } from '../interfaces/'
import { moviesService } from '../services/'

const create = async (req: Request, res: Response): Promise<Response> => {
  const data: iMovieCreate = await moviesService.create(req.body)

  return res.status(201).json(data)
}

const read = async (req: Request, res: Response): Promise<Response> => {
  const { perPage, page, sort, order } = req.query

  const data: iMovieRead = await moviesService.read(perPage, page, order, sort)

  return res.status(200).json(data)
}

const update = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  const data: iMovieUpdate = await moviesService.update(Number(id), req.body)

  return res.status(200).json(data)
}

const remove = async (req: Request, res: Response): Promise<Response> => {
  const { id } = req.params

  await moviesService.remove(Number(id))

  return res.status(204).send()
}

export default { create, read, update, remove }
