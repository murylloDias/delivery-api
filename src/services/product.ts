import { Service, Inject } from 'typedi'
import { IProduct, IProductService } from '../interfaces'

@Service()
export default class ProductService implements IProductService {
  constructor(
    @Inject('productModel')
    private productModel: Models.ProductModel,
    @Inject('logger')
    private logger: Models.Logger
  ) { }

  public async create(product: IProduct): Promise<IProduct> {
    this.logger.info('Creating product db record')
    const productRecord = await this.productModel.create(product)
    return productRecord
  }

  public async get(): Promise<IProduct[]> {
    const products = await this.productModel.find().lean()
    return products
  }
}