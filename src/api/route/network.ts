import { Router, Request, Response, NextFunction } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { Container } from 'typedi'
import NetworkService from '../../services/network'
import { Logger } from 'winston'

const route = Router()

export default (app: Router) => {
  app.use('/network', route)

  route.post(
    '/create',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        network: Joi.object({
          info: Joi.object({
            name: Joi.string().required(),
            category: Joi.string().required(),
            email: Joi.string().required(),
            website: Joi.string().required(),
            urls: Joi.array().required(),
          }),
          store: Joi.object({
            name: Joi.string().required(),
            corporateName: Joi.string().required(),
            cnpj: Joi.string().required(),
            email: Joi.string().required(),
            phone: Joi.string().required(),
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
      logger.info('Calling create-network endpoint')
      try {
        const networkServiceInstace = Container.get(NetworkService)
        const data = await networkServiceInstace.create(req.body.network.info, req.body.network.store, req.body.network.address)
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
      const logger: Logger = Container.get('logger')
      logger.info('Calling getById-network endpoint')

      try {
        const networkServiceInstace = Container.get(NetworkService)
        const data = await networkServiceInstace.getById(req.params.id)
        res.status(200).json(data)
      } catch (e) {
        return next(e)
      }
    }
  )

  route.put(
    '/addStore/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
      }),
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
      logger.info('Calling add-store endepoit')
      try {
        const networkServiceInstace = Container.get(NetworkService)
        const newStore = await networkServiceInstace.addStore(req.params.id, req.body.store.info, req.body.store.address)
        res.status(200).json(newStore)
      } catch (e) {
        next(e)
      }
    }
  )
}
