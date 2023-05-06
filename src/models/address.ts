import Joi from "joi";
import mongoose from "mongoose";

export interface Address {
  city: string
  zipCode: string
  street: string
  complement?: string
}


export const AddressValidationSchema = Joi.object({
  city: Joi.string().min(1).max(100).required(),
  zipCode: Joi.string().min(5).max(6).required(),
  street: Joi.string().min(1).max(100).required(),
  complement: Joi.string().min(1).max(100).optional(),
})

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