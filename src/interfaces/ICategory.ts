import { IProduct } from ".";

export interface ICategory {
  _id?: string,
  name: string,
  products: Array<string>,
  integrationCode: string
}

export interface ICategoryService {
  create(category: ICategory): Promise<ICategory>
  getById(id: string): Promise<ICategory>
  addProduct(id: string, product: IProduct): Promise<ICategory>
}