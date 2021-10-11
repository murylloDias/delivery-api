import { IProduct } from ".";

export interface ICategory {
  _id: object,
  name: string,
  products: Array<object>
}

export interface ICategoryService {
  create(category: ICategory): Promise<ICategory>
  getById(id: string): Promise<ICategory>
  addProduct(id: string, product: IProduct): Promise<void>
}