import { Address } from "./address";
import mongoose from "mongoose";

export interface Teacher {
  firstName: string
  lastName: string
  birthdate: Date
  email: string
  phoneNumber: string
  profilePictureUrl: string
  isValidated: boolean
  address: Address
  documents: Array<Document>
}

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

export const Teacher = mongoose.model('Teacher', TeacherSchema)