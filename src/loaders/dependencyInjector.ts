import { Container } from 'typedi'
import LoggerInstance from './logger'

export default (models: { name: string; model: any }[]) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model)
    })
    LoggerInstance.info('Models inject into container')

    Container.set('logger', LoggerInstance)
    LoggerInstance.info('Logger inject into container')

  } catch (e) {
    LoggerInstance.error('Error on dependency injector loader: %o', e)
    throw e
  }
}