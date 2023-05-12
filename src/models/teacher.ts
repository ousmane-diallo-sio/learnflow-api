import Joi from "joi";
import { IAddress, AddressValidationSchema } from "./address";
import mongoose, { InferSchemaType } from "mongoose";
import { DocumentValidationSchema } from './document';

export interface ITeacher extends mongoose.Document {
  firstName: string
  lastName: string
  birthdate: Date
  email: string
  password: string
  phoneNumber: string
  profilePictureUrl: string
  isValidated: boolean
  address: IAddress
  documents: Array<Document>
}

export const TeacherValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(25).required(),
  birthdate: Joi.date().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phoneNumber: Joi.string().pattern(/^((\+)33|0|0033)[1-9](\d{2}){4}$/).required(),
  profilePictureUrl: Joi.string().min(1).max(2048).required(),
  isValidated: Joi.boolean().required(),
  address: AddressValidationSchema.required(),
  documents: Joi.array().items(DocumentValidationSchema.required())
})

export const TeacherSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profilePictureUrl: {
    type: String,
    required: true,
  },
  isValidated: {
    type: Boolean,
    required: true,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
  },
  documents: {
    type: [mongoose.Schema.Types.ObjectId],
  },
})

export type Teacher = InferSchemaType<typeof TeacherSchema>;
export const TeacherModel = mongoose.model('Teacher', TeacherSchema)