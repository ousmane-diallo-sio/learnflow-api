import Joi from "joi";
import mongoose, { InferSchemaType } from "mongoose";

export interface IManager extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password?: { salt: String, hashedPassword: String } | string
  jwtToken?: String
}

export const ManagerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
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
})

export type Manager = InferSchemaType<typeof ManagerSchema>;
export const ManagerModel = mongoose.model<IManager>('Manager', ManagerSchema)