import { Document, Model } from 'mongoose'
import { Logger } from 'winston'
import { INetwork } from '../../interfaces/INetwork'
import { IStore } from '../../interfaces/IStore'
import { IAddress } from '../../interfaces/IAddress'
import { IProduct } from '../../interfaces/IProduct'
import { ICategory } from '../../interfaces/ICategory'

declare global {
  namespace Express {
    export interface Request {
      currentNetwork: INetwork
    }
  }

  namespace Models {
    export type NetworkModel = Model<INetwork>
    export type StoreModel = Model<IStore>
    export type AddressModel = Model<IAddress>
    export type ProductModel = Model<IProduct>
    export type CategoryModel = Model<ICategory>
    export type Logger = Logger
  }
}