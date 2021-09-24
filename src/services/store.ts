import { Service, Inject } from 'typedi'
import { IAddress, IAddressService, IStore, IStoreService, ICategory, ICategoryService } from '../interfaces'

@Service('storeService')
export default class StoreService implements IStoreService {
  constructor(
    @Inject('storeModel')
    private storeModel: Models.StoreModel,
    @Inject('logger')
    private logger: Models.Logger,
    @Inject('addressService')
    private addressService: IAddressService,
    @Inject('categoryService')
    private categoryService: ICategoryService
  ) { }

  public async create(store: IStore, address: IAddress): Promise<IStore> {
    const addressRecord = await this.addressService.create(address)
    store.address = addressRecord._id

    this.logger.info('Creating store db record')
    const storeRecord: IStore = await this.storeModel.create(store)
    return storeRecord
  }

  public async addCategory(id: string, category: ICategory): Promise<ICategory> {
    this.logger.info('Add category to store')
    const categoryRecord = await this.categoryService.create(category)

    const storeRecord = await this.storeModel.findById(id)
    storeRecord?.categories.push(categoryRecord.id)
    await storeRecord?.save()

    return categoryRecord
  }
}