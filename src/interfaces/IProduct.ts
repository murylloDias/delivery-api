export interface IProduct {
  id: object,
  name: string,
  price: number,
  description: string,
  idProduct: string
}

export interface IProductService {
  create(product: IProduct): Promise<IProduct>
}