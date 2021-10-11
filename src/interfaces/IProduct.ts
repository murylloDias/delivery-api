export interface IProduct {
  _id: object,
  name: string,
  price: number,
  description: string
}

export interface IProductService {
  create(product: IProduct): Promise<IProduct>
}