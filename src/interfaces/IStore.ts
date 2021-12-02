import { IAddress, ICategory } from ".";

export interface IStore {
  _id?: string,
  name: string,
  corporateName: string,
  cnpj: string,
  email: string,
  phone: string,
  address: object,
  categories: Array<string>
}

export interface IStoreService {
  create(store: IStore, address: IAddress): Promise<IStore>
  getById(id: string): Promise<IStore>
  addCategory(id: string, category: ICategory): Promise<ICategory>
  importProduct(id: string, fileName: any): Promise<IStore>
  checkID(id: string): Promise<boolean>
  deleteIntegrationFile(fileName: string): void
}