import { Service, Inject } from 'typedi'
import { IAddress, IStore, INetwork, INetworkService } from '../interfaces'
import StoreService from './store'

@Service()
export default class NetworkService implements INetworkService {
  constructor(
    @Inject('networkModel')
    private networkModel: Models.NetworkModel,
    @Inject('logger')
    private logger: Models.Logger,
    private storeService: StoreService
  ) { }

  public async create(network: INetwork, store: IStore, address: IAddress): Promise<INetwork> {
    const storeRecord = await this.storeService.create(store, address)
    network.stores = []
    network.stores.push(storeRecord._id!)

    this.logger.info('Creating network db record')
    const networkRecord: INetwork = await this.networkModel.create(network)
    return networkRecord
  }

  public async getById(id: string): Promise<INetwork> {
    const networkRecord: INetwork = await this.networkModel.findById(id)
      .populate({
        path: 'stores',
        model: 'Store',
        populate: {
          path: 'address',
          model: 'Address'
        }
      }).lean()
    return networkRecord
  }

  public async addStore(id: string, store: IStore, address: IAddress): Promise<IStore> {
    this.logger.info('Add store to network')
    const storeRecord = await this.storeService.create(store, address)

    const networkRecord = await this.networkModel.findById(id)
    networkRecord?.stores.push(networkRecord.id)
    networkRecord?.save()

    return storeRecord
  }
}
