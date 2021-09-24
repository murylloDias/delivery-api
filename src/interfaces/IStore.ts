import { IAddress, ICategory } from ".";

export interface IStore {
  _id: object,
  name: string,
  corporateName: string,
  cnpj: string,
  email: string,
  phone: string,
  address: object,
  categories: Array<object>
}

export interface IStoreService {
  create(store: IStore, address: IAddress): Promise<IStore>
  addCategory(id: string, category: ICategory): Promise<ICategory>
}