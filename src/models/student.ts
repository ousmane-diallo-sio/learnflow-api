import Joi from "joi";
import { IAddress, AddressValidationSchema } from "./address";
import mongoose from "mongoose";

export interface IStudent extends mongoose.Document {
  firstName: string
  lastName: string
  birthdate: Date
  email: string
  phoneNumber: string
  profilePictureUrl: string
  address: IAddress
}

export const StudentValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  birthdate: Joi.date().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(/^((\+)33|0|0033)[1-9](\d{2}){4}$/).required(),
  profilePictureUrl: Joi.string().min(1).max(2048).required(),
  address: AddressValidationSchema.required(),
})

export const StudentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
},
  phoneNumber: {
    type: String,
    required: true,
  },
  profilePictureUrl: {
    type: String,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
})

export const Student = mongoose.model('Student', StudentSchema)