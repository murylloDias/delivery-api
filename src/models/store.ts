import { model, Schema } from 'mongoose'
import { IStore } from '../interfaces/IStore'

const StoreSchema = new Schema<IStore>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  corporateName: {
    type: String,
    required: true,
    trim: true
  },
  cnpj: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: Schema.Types.ObjectId,
    ref: 'Address'
  },
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
})

export default model<IStore>('Store', StoreSchema)