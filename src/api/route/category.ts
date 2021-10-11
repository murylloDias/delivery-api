import { celebrate, Joi, Segments } from 'celebrate'
import { NextFunction, Request, Response, Router } from 'express'
import { Container } from 'typedi'
import CategoryService from '../../services/category'
import { Logger } from 'winston'

const route = Router()

export default (app: Router) => {
  app.use('/category', route)

  route.post(
    '/create',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        _id: Joi.string().required(),
        name: Joi.string().required(),
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger')
      logger.info('Calling create-category endpoint')
      try {
        const categoryServiceInstance = Container.get(CategoryService)
        const data = await categoryServiceInstance.create(req.body)
        res.status(201).json(data)
      } catch (e) {
        return next(e)
      }
    }
  )

  route.get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const categoryServiceInstance = Container.get(CategoryService)
        const categoryRecord = await categoryServiceInstance.getById(req.params.id)
        res.status(200).json(categoryRecord)
      } catch (e) {
        next(e)
      }
    }
  )

  route.put(
    '/addProduct/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
      }),
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        price: Joi.number().required(),
        description: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const categoryServiceInstance = Container.get(CategoryService)
        await categoryServiceInstance.addProduct(req.params.id, req.body)
        res.status(200).json('Produto atualizado com sucesso!')
      } catch (e) {
        return next(e)
      }
    }
  )
}