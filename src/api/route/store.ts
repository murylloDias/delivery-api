import { Router, Request, Response, NextFunction } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { Container } from 'typedi'
import StoreService from '../../services/store'
import { Logger } from 'winston'

const route = Router()

export default (app: Router) => {
  app.use('/store', route)

  route.post(
    '/create',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        store: Joi.object({
          info: Joi.object({
            name: Joi.string().required(),
            corporateName: Joi.string().required(),
            cnpj: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required()
          }),
          address: Joi.object({
            cep: Joi.string().required(),
            logradouro: Joi.string().required(),
            number: Joi.string().required(),
            complement: Joi.string().required(),
            district: Joi.string().required(),
            city: Joi.string().required(),
            state: Joi.string().required()
          })
        })
      })
    }),

    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger')
      logger.info('Calling create-store endpoint')
      try {
        const storeService = Container.get(StoreService)
        const data = await storeService.create(req.body.store.info, req.body.store.address)
        res.status(201).json(data)
      } catch (e) {
        return next(e)
      }
    }
  )

  route.put(
    '/addCategory/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
      }),
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required()
      })
    }),

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const storeServiceInstance = Container.get(StoreService)
        const newCategory = await storeServiceInstance.addCategory(req.params.id, req.body)
        res.status(200).json(newCategory)
      } catch (e) {
        return next(e)
      }
    }
  )
}