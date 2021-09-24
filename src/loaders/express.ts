import express, { Request, Response, NextFunction } from 'express'
import routes from '../api'
import config from '../config'
import { IError } from '../interfaces/IError'

export default ({ app }: { app: express.Application }) => {
  app.get('/status', (req, res) => {
    res.status(200).end()
  })

  app.head('/status', (req, res) => {
    res.status(200).end()
  })

  app.use(express.json())

  app.use(config.api.prefix, routes())

  app.use((req, res, next) => {
    const err = new Error('Not Found') as IError
    err.status = 403
    next(err)
  })

  app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
    res.status(err.status || 500)
    res.json({
      erros: {
        message: err.message
      }
    })
  })
}
