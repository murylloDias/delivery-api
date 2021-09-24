import { Service, Inject } from 'typedi'
import { IProduct, IProductService } from '../interfaces'

@Service('productService')
export default class ProductService implements IProductService {
  constructor(
    @Inject('productModel')
    private productModel: Models.ProductModel,
    @Inject('logger')
    private logger: Models.Logger
  ) { }

  public async create(product: IProduct): Promise<IProduct> {
    this.logger.info('Creating product db record')
    const productRecord: IProduct = await this.productModel.create(product)
    return productRecord
  }
}