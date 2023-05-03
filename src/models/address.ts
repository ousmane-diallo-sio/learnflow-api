import Joi from "joi";
import mongoose from "mongoose";

export interface Address {
  city: string;
  zipCode: string;
  street: string;
  number: string;
  complement: string;
}


export const AddressValidationSchema = Joi.object({
  city: Joi.string().min(2).max(20).required(),
  zipCode: Joi.string().min(5).max(5).required(),
  street: Joi.string().min(2).max(50).required(),
  number: Joi.number().min(1).max(4).required(),
  complement: Joi.string().min(2).max(50).required(),
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
  number: {
    type: Number,
    required: true,
  },
  complement: {
    type: String,
    required: true,
  },
})

export const Address = mongoose.model('Address', AddressSchema)