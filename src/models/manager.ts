import Joi from "joi";
import mongoose, { InferSchemaType } from "mongoose";

export interface IManager extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password?: string
  jwt?: String
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
    type: String,
    select: false
  },
  jwtToken: String,
})

export type Manager = InferSchemaType<typeof ManagerSchema>;
export const ManagerModel = mongoose.model<IManager>('Manager', ManagerSchema)