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

  public async addCategory(id: string, category: ICategory): Promise<ICategory> {
    this.logger.info('Add category to store')
    const categoryRecord = await this.categoryService.create(category)

    const storeRecord = await this.storeModel.findById(id)
    storeRecord?.categories.push(categoryRecord._id)
    await storeRecord?.save()

    return categoryRecord
  }

  public async importProduct(id: string, fileName: any): Promise<any> {
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

    const itens = result.Dados.map(item => {
      const obj: ICategory = {
        _id: item.idcategory,
        name: item.category,
        products: []
      }
      return obj
    })

    const categories = itens.filter((category, index) => {
      const _category = JSON.stringify(category)
      return index === itens.findIndex(obj => {
        return JSON.stringify(obj) === _category
      })
    })

    categories.forEach((category) => {
      result.Dados.forEach(item => {
        if (category._id === item.idcategory) {
          category.products.push(item.idproduct)
        }
      })
    })

    const products = result.Dados.map(item => {
      const obj: IProduct = {
        _id: item.idproduct,
        name: item.product,
        price: parseFloat(item.price) || 0,
        description: item.description || 'N/D'
      }
      return obj
    })

    categories.forEach(async category => {
      await this.categoryService.create(category)
    })

    products.forEach(async product => {
      await this.productService.create(product)
    })

    const storeRecord = await this.storeModel.findById(id)
    categories.forEach(async category => {
      storeRecord?.categories.push(category._id)
    })
    await storeRecord?.save()

    return storeRecord
  }
}