import { celebrate, Joi, Segments } from 'celebrate'
import { NextFunction, Request, Response, Router } from 'express'
import AddressService from '../../services/address'
import { Container } from 'typedi'
import { Logger } from 'winston'

const route = Router()

export default (app: Router) => {
  app.use('/address', route)

  route.post(
    '/create',
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        cep: Joi.string().required(),
        logradouro: Joi.string().required(),
        number: Joi.string().required(),
        complement: Joi.string().required(),
        district: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      const logger: Logger = Container.get('logger')
      logger.info('Calling create-address endpoint')

      try {
        const addressService = Container.get(AddressService)
        const data = await addressService.create(req.body)
        res.status(201).json(data)
      } catch (e) {
        return next(e)
      }
    }
  )
}