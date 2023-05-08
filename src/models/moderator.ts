import Joi from "joi";
import mongoose from "mongoose";

export interface IModerator extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
}

export const ModeratorValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
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
})

export const Moderator = mongoose.model('Moderator', ModeratorSchema)