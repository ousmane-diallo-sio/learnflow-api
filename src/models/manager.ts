import Joi from "joi";
import mongoose from "mongoose";

export interface IManager extends mongoose.Document {
  firstName: string
  lastName: string
  email: string
}

export const ManagerValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
})

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
})

export const Manager = mongoose.model('Manager', ManagerSchema)