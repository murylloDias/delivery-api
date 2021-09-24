import { model, Schema } from 'mongoose'
import { ICategory } from '../interfaces/ICategory'

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  idCategory: {
    type: String,
    trim: true,
    default: ''
  }
})

export default model<ICategory>('Category', CategorySchema)