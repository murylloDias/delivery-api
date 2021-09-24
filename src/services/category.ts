import { Service, Inject } from 'typedi'
import { IProduct, IProductService, ICategory, ICategoryService } from '../interfaces'

@Service('categoryService')
export default class CategoryService implements ICategoryService {
  constructor(
    @Inject('categoryModel')
    private categoryModel: Models.CategoryModel,
    @Inject('logger')
    private logger: Models.Logger,
    @Inject('productService')
    private productService: IProductService
  ) { }

  public async create(category: ICategory): Promise<ICategory> {
    this.logger.info('Creating category db record')
    const categoryRecord: ICategory = await this.categoryModel.create(category)
    return categoryRecord
  }

  public async getById(id: string): Promise<ICategory> {
    this.logger.info('Get category')
    const categoryRecord: ICategory = await this.categoryModel.findById(id)
      .populate('products').lean()
    return categoryRecord
  }

  public async addProduct(id: string, product: IProduct): Promise<void> {
    this.logger.info('Add product to category')
    const productRecord = await this.productService.create(product)

    const categoryRecord = await this.categoryModel.findById(id)
    categoryRecord?.products.push(productRecord.id)
    await categoryRecord?.save()
  }
}