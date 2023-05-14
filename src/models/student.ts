import { IAddress } from "./address";
import mongoose, { InferSchemaType } from "mongoose";

export interface IStudent extends mongoose.Document {
  firstName: string
  lastName: string
  birthdate: Date
  email: string
  password?: { salt: String, hashedPassword: String } | string
  jwtToken?: String
  phoneNumber: string
  profilePictureUrl: string
  address: IAddress
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
    type: {
      salt: {
        type: String,
        required: true
      },
      hashedPassword: {
        type: String,
        required: true
      }
    },
    select: false
  },
  jwtToken: String,
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

export type Student = InferSchemaType<typeof StudentSchema>;
export const StudentModel = mongoose.model('Student', StudentSchema)