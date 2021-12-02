import { model, Schema } from 'mongoose'
import { IProduct } from '../interfaces/IProduct'

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  integrationCode: {
    type: String,
    required: true,
    trim: true
  }
})

export default model<IProduct>('Product', ProductSchema)