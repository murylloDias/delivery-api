import { model, Schema } from 'mongoose'
import { IProduct } from '../interfaces/IProduct'

const ProductSchema = new Schema<IProduct>({
  _id: {
    type: String,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Schema.Types.Decimal128,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  }
})

export default model<IProduct>('Product', ProductSchema)