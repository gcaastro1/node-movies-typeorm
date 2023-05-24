import { Router } from 'express'
import { moviesController } from '../controllers'
import { validateDataMiddleware } from '../middlewares'
import ensureUserExists from '../middlewares/ensureUserExists.middleware'
import { createMoviesSchema, updateMoviesSchema } from '../schemas'

const moviesRouter: Router = Router()

moviesRouter.get('', moviesController.read)
moviesRouter.post(
  '',
  validateDataMiddleware(createMoviesSchema),
  moviesController.create
)
moviesRouter.patch(
  '/:id',
  ensureUserExists,
  validateDataMiddleware(updateMoviesSchema),
  moviesController.update
)
moviesRouter.delete('/:id', ensureUserExists, moviesController.remove)

export default moviesRouter
