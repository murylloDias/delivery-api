import { Service, Inject } from 'typedi'
import { IProduct, ICategory, ICategoryService } from '../interfaces'
import ProductService from '../services/product'

@Service()
export default class CategoryService implements ICategoryService {
  constructor(
    @Inject('categoryModel')
    private categoryModel: Models.CategoryModel,
    @Inject('logger')
    private logger: Models.Logger,
    private productService: ProductService
  ) { }

  public async create(category: ICategory): Promise<ICategory> {
    this.logger.info('Creating category db record')
    const categoryRecord = await this.categoryModel.create(category)
    return categoryRecord
  }

  public async getById(id: string): Promise<ICategory> {
    this.logger.info('Get category')
    const categoryRecord: ICategory = await this.categoryModel.findById(id)
      .populate('products').lean()
    return categoryRecord
  }

  public async addProduct(id: string, product: IProduct): Promise<any> {
    this.logger.info('Add product to category')
    const productRecord = await this.productService.create(product)

    const categoryRecord = await this.categoryModel.findById(id)
    categoryRecord?.products.push(productRecord._id!)
    await categoryRecord?.save()

    return categoryRecord
  }
}