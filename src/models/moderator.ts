import Joi from "joi";
import mongoose, { InferSchemaType } from "mongoose";

export interface IModerator extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password?: { salt: String, hashedPassword: String } | string
  jwt?: String
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

export type Moderator = InferSchemaType<typeof ModeratorSchema>;
export const ModeratorModel = mongoose.model<IModerator>('Moderator', ModeratorSchema)