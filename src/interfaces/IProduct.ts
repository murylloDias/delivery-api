export interface IProduct {
  _id?: string,
  name: string,
  price: number,
  description: string,
  integrationCode: string
}

export interface IProductService {
  create(product: IProduct): Promise<IProduct>
  get(): Promise<IProduct[]>
}