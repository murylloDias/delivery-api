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
  idProduct: {
    type: String,
    trim: true,
    default: ''
  }
})

export default model<IProduct>('Product', ProductSchema)