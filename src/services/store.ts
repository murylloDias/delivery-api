import { Service, Inject } from 'typedi'
import { IAddress, IStore, IStoreService, ICategory, IProduct } from '../interfaces'
import AddressService from './address'
import CategoryService from './category'
import ProductService from './product'

import excelToJson from 'convert-excel-to-json'
import * as fs from 'fs'
import path from 'path'

@Service()
export default class StoreService implements IStoreService {
  constructor(
    @Inject('storeModel')
    private storeModel: Models.StoreModel,
    @Inject('logger')
    private logger: Models.Logger,
    private addressService: AddressService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) { }

  public async create(store: IStore, address: IAddress): Promise<IStore> {
    const addressRecord = await this.addressService.create(address)
    store.address = addressRecord._id

    this.logger.info('Creating store db record')
    const storeRecord: IStore = await this.storeModel.create(store)
    return storeRecord
  }

  public async getById(id: string): Promise<IStore> {
    this.logger.info('Get Store')
    const storeRecord = await this.storeModel.findById(id)
      .populate({
        path: 'categories',
        model: 'Category',
        populate: {
          path: 'products',
          model: 'Product'
        }
      }).lean()
    return storeRecord!
  }

  public async addCategory(id: string, category: ICategory): Promise<ICategory> {
    this.logger.info('Add category to store')
    const categoryRecord = await this.categoryService.create(category)

    const storeRecord = await this.storeModel.findById(id)
    storeRecord?.categories.push(categoryRecord._id!)
    await storeRecord?.save()

    return categoryRecord
  }

  public async importProduct(id: string, fileName: string): Promise<IStore> {
    const result = excelToJson({
      source: fs.readFileSync(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', fileName)),
      header: {
        rows: 1
      },
      columnToKey: {
        A: 'idcategory',
        B: 'category',
        D: 'price',
        H: 'idproduct',
        I: 'date',
        J: 'product',
        K: 'description'
      }
    })

    const products = await Promise.all(result.Dados.map(async (product) => {
      const obj: IProduct = {
        name: product.product,
        price: product.price.replace(',', '.') || 0,
        description: product.description || 'N/D',
        integrationCode: `idcategoriaproduto:${product.idcategory},${product.idproduct}`
      }
      const productRecord = await this.productService.create(obj)
      return productRecord
    }))

    const itens = result.Dados.map(item => {
      const obj: ICategory = {
        name: item.category,
        products: [],
        integrationCode: item.idcategory
      }
      return obj
    })

    const categories = itens.filter((category, index) => {
      const _category = JSON.stringify(category)
      return index === itens.findIndex(obj => {
        return JSON.stringify(obj) === _category
      })
    })

    categories.forEach(category => {
      products.forEach(product => {
        if (product.integrationCode.includes(category.integrationCode)) {
          category.products.push(product._id!)
        }
      })
    })

    const categoriesRecord = await Promise.all(categories.map(async category => {
      const categoryRecord = await this.categoryService.create(category)
      return categoryRecord
    }))

    const storeRecord = await this.storeModel.findById(id)
    categoriesRecord.forEach(async category => {
      storeRecord?.categories.push(category._id!)
    })
    storeRecord?.save()

    return storeRecord!
  }

  public async checkID(id: string): Promise<boolean> {
    if (await this.storeModel.findById(id)) {
      return true
    }
    return false
  }

  public deleteIntegrationFile(fileName: string): void {
    fs.unlinkSync(path.resolve(__dirname, '..', '..', 'tmp', 'uploads', fileName))
    console.log('Arquivo de integração removido com sucesso!')
  }
}