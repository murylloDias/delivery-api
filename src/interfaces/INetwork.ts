import { IAddress, IStore } from ".";

export interface INetwork {
  id: object,
  name: string,
  category: string,
  email: string,
  website: string,
  urls: Array<string>,
  stores: Array<string>
}

export interface INetworkService {
  create(network: INetwork, store: IStore, address: IAddress): Promise<INetwork>
  getById(id: string): Promise<INetwork>
  addStore(id: string, store: IStore, address: IAddress): Promise<IStore>
}
