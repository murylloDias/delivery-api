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
  integrationCode: {
    type: String,
    required: true,
    trim: true
  }
})

export default model<ICategory>('Category', CategorySchema)