import Joi from "joi";
import mongoose from "mongoose";

export interface Justificative {
  uploadUrl: string
  comment: string
  startDate: Date
  endDate: Date
}

export const JustificativeValidationSchema = Joi.object({
  uploadUrl: Joi.string().min(3).max(2048).required(),
  comment: Joi.string().min(1).max(1224).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
})

export const JustificativeSchema = new mongoose.Schema({
  uploadUrl: {
    type: String,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  }, 
  endDate: {
    type: Date,
    required: true,
  },
})

export const Justificative = mongoose.model('Justificative', JustificativeSchema)