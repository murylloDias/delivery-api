import { EventSubscriber, On } from 'event-dispatch'
import { Container } from 'typedi'
import { Logger } from 'winston'
import events from './events'

@EventSubscriber()
export default class NetworkSubscriber {

  @On(events.network.create)
  public onNetworkCreate(id: string) {
    const Logger: Logger = Container.get('logger')

    try {

    } catch(e) {
      Logger.error(`Error on event ${events.network.create}: %o`, e)
      throw e
    }
  }
}