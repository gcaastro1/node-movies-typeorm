import { NextFunction, Request, Response } from 'express'
import { ZodTypeAny } from 'zod'
import AppError from '../errors'

const validateDataMiddleware =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const data = schema.parse(req.body)
    req.body = data

    console.log(data)

    const validatedKeys: Array<string> = Object.keys(data)
    if (!validatedKeys.length) {
      throw new AppError('One of the fields must be defined', 400)
    }

    return next()
  }

export default validateDataMiddleware
