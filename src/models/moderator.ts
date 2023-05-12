import Joi from "joi";
import mongoose, { InferSchemaType } from "mongoose";

export interface IModerator extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
  password: string
}

export const ModeratorValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

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
    required: true,
  },
})

export type Moderator = InferSchemaType<typeof ModeratorSchema>;
export const ModeratorModel = mongoose.model('Moderator', ModeratorSchema)