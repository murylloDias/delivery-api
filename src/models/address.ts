import { model, Schema } from 'mongoose'
import { IAddress } from '../interfaces/IAddress'

const AddressSchema = new Schema<IAddress>({
  cep: {
    type: String,
    required: true,
    trim: true
  },
  logradouro: {
    type: String,
    required: true,
    trim: true
  },
  number: {
    type: String,
    required: true,
    trim: true
  },
  complement: {
    type: String,
    required: true,
    trim: true
  },
  district: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  }
})

export default model<IAddress>('Address', AddressSchema)