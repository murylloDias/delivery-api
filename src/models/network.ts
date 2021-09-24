import { model, Schema } from 'mongoose'
import { INetwork } from '../interfaces/INetwork'

const NetworkSchema = new Schema<INetwork>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  website: {
    type: String,
    required: true,
    trim: true
  },
  urls: [{
    type: String,
    required: true,
    trim: true
  }],
  stores: [{
    type: Schema.Types.ObjectId,
    ref: 'Store'
  }]
})

export default model<INetwork>('Network', NetworkSchema)
