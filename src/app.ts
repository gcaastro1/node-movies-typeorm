import express, { Application } from 'express'
import 'express-async-errors'
import { handleErrorsMiddleware } from './middlewares'
import { moviesRouter } from './routers'

const app: Application = express()
app.use(express.json())

app.use('/movies', moviesRouter)

app.use(handleErrorsMiddleware)


export default app
