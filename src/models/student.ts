import Joi from "joi";
import { Address, AddressValidationSchema } from "./address";
import mongoose from "mongoose";

export interface Student {
  firstName: string
  lastName: string
  birthDate: Date
  email: string
  address: Address
  phoneNumber: string
  profilePictureUrl: string
}

export const StudentValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(25).required(),
  birthDate: Joi.date().required(),
  email: Joi.string().email().required(),
  address: AddressValidationSchema.required(),
  phoneNumber: Joi.string().pattern(/^((\+)33|0|0033)[1-9](\d{2}){4}$/).required(),
})

export const StudentSchema = new mongoose.Schema({
  email: {
      type: String,
      required: true,
      unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthDate: {
    type: Date,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profilePictureUrl: {
    type: String,
    required: true,
  },
})

export const Student = mongoose.model('Student', StudentSchema)