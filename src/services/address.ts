import { Inject, Service } from 'typedi'
import { IAddress, IAddressService } from '../interfaces'

@Service('addressService')
export default class AddressService implements IAddressService {
  constructor(
    @Inject('addressModel')
    private addressModel: Models.AddressModel,
    @Inject('logger')
    private logger: Models.Logger
  ) { }

  public async create(address: IAddress): Promise<IAddress> {
    this.logger.info('Creating address db record')
    const addressRecord: IAddress = await this.addressModel.create(address)
    return addressRecord
  }
}