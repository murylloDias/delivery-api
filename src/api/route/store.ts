import { Router, Request, Response, NextFunction } from 'express'
import { celebrate, Joi, Segments, errors } from 'celebrate'
import { Container } from 'typedi'
import StoreService from '../../services/store'
import { Logger } from 'winston'
import upload from '../middlewares/upload'

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

  route.get(
    '/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
      })
    }),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const storeServiceInstance = Container.get(StoreService)
        if (await storeServiceInstance.checkID(req.params.id)) {
          const storeRecord = await storeServiceInstance.getById(req.params.id)
          res.status(200).json(storeRecord)
        } else {
          res.status(404).json({
            message: 'Não foi possivel localizar a loja!'
          })
        }
      } catch (e) {
        next(e)
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
        name: Joi.string().required(),
        integrationCode: Joi.string().required()
      })
    }),

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const storeServiceInstance = Container.get(StoreService)
        if (await storeServiceInstance.checkID(req.params.id)) {
          const newCategory = await storeServiceInstance.addCategory(req.params.id, req.body)
          res.status(200).json(newCategory)
        } else {
          res.status(404).json({
            message: 'Não foi possivel localizar a loja!'
          })
        }
      } catch (e) {
        return next(e)
      }
    }
  )

  route.post(
    '/importProduct/:id',
    celebrate({
      [Segments.PARAMS]: Joi.object().keys({
        id: Joi.string().required()
      })
    }),
    upload.single('file'),

    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const storeRecordInstance = Container.get(StoreService)
        if (await storeRecordInstance.checkID(req.params.id)) {
          const data = await storeRecordInstance.importProduct(req.params.id, req.file?.filename!)
          storeRecordInstance.deleteIntegrationFile(req.file?.filename!)
          res.status(200).json(data)
        } else {
          storeRecordInstance.deleteIntegrationFile(req.file?.filename!)
          res.status(404).json({
            message: 'Não foi possivel localizar a loja!'
          })
        }
      } catch (e) {
        return next(e)
      }
    }
  )
}