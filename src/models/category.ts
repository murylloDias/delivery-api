import { model, Schema } from 'mongoose'
import { ICategory } from '../interfaces/ICategory'

const CategorySchema = new Schema<ICategory>({
  _id: {
    type: String,
    require: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  products: [{
    type: String,
    ref: 'Product'
  }]
})

export default model<ICategory>('Category', CategorySchema)