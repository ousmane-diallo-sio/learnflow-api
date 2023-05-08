import { Address } from "./address";
import mongoose from "mongoose";

export interface IStudent {
  firstName: string
  lastName: string
  birthdate: Date
  email: string
  phoneNumber: string
  profilePictureUrl: string
  address: Address
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