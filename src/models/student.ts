import { IAddress } from "./address";
import mongoose, { InferSchemaType } from "mongoose";

export interface IStudent extends mongoose.Document {
  firstName: string
  lastName: string
  birthdate: Date
  email: string
  password?: string
  role: 'student'
  phoneNumber: string
  profilePicture: Document
  address: IAddress
  schoolLevel?: string
}

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
  password: {
    type: String,
    select: false
  },
  role: {
    type: String,
    default: "student",
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true,
    autopopulate: true
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
    autopopulate: true
  },
  schoolLevel: {
    type: String,
    required: true
  }
})

export type Student = InferSchemaType<typeof StudentSchema>;
export const StudentModel = mongoose.model<IStudent>('Student', StudentSchema)
