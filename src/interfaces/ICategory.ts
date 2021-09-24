import { IProduct } from ".";

export interface ICategory {
  id: object,
  name: string,
  products: Array<object>,
  idCategory: string
}

export interface ICategoryService {
  create(category: ICategory): Promise<ICategory>
  getById(id: string): Promise<ICategory>
  addProduct(id: string, product: IProduct): Promise<void>
}