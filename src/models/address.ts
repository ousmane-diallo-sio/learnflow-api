import mongoose from "mongoose";

export interface Address {
  city: string
  zipCode: string
  street: string
  complement?: string
}

export const AddressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  complement: {
    type: String
  },
})

export const Address = mongoose.model('Address', AddressSchema)