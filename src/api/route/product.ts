import { NextFunction, Request, Response, Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { Container } from 'typedi'
import ProductService from '../../services/product'
import { Logger } from 'winston'

const route = Router()

export default (app: Router) => {
  app.use('/product', route)

  route.post(
    '/create',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required()
      })
    }),

    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger')
      logger.info('Calling create-product endpoint')

      try {
        const productServiceInstance = Container.get(ProductService)
        const data = await productServiceInstance.create(req.body)
        res.status(201).json(data)
      } catch (e) {
        return next(e)
      }
    }
  )
}