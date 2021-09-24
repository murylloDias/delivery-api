import expressLoader from './express'
import mongooseLoader from './mongoose'
import dependencyInjectorLoader from './dependencyInjector'
import Logger from './logger'

export default async ({ expressApp }: any) => {
  const mongoConnection = await mongooseLoader()
  Logger.info('DB loaded and connected!')

  const models = [
    {
      name: 'networkModel',
      model: require('../models/network').default
    },
    {
      name: 'storeModel',
      model: require('../models/store').default
    },
    {
      name: 'addressModel',
      model: require('../models/address').default
    },
    {
      name: 'categoryModel',
      model: require('../models/category').default
    },
    {
      name: 'productModel',
      model: require('../models/product').default
    }
  ]

  await dependencyInjectorLoader(models)
  Logger.info('Dependency Injector Loaded')

  await expressLoader({ app: expressApp })
  Logger.info('Express loaded')
}