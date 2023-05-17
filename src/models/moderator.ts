import Joi from "joi";
import mongoose, { InferSchemaType } from "mongoose";

export interface IModerator extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password?: string
  role: string
}

export const ModeratorSchema = new mongoose.Schema({
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
  role: {
    type: String,
    default: "moderator",
    required: true,
  },
})

export type Moderator = InferSchemaType<typeof ModeratorSchema>;
export const ModeratorModel = mongoose.model<IModerator>('Moderator', ModeratorSchema)