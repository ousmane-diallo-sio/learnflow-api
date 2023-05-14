import { IAddress } from "./address";
import mongoose, { InferSchemaType } from "mongoose";

export interface ITeacher extends mongoose.Document {
  firstName: string
  lastName: string
  birthdate: Date
  email: string
  password?: { salt: String, hashedPassword: String } | string
  jwt?: String
  phoneNumber: string
  profilePictureUrl: string
  isValidated: boolean
  address: IAddress
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
export const TeacherModel = mongoose.model<ITeacher>('Teacher', TeacherSchema)