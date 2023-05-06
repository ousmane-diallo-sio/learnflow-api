import Joi from "joi";
import mongoose from "mongoose";

export interface TeacherValidation {
  date: Date
  isValidated: boolean
  comment: string
}

export const TeacherValidationValidationSchema = Joi.object({
  date: Joi.date().required(),
  isValidated: Joi.boolean().required(),
  comment: Joi.string().min(1).max(1224).required(),
})

export const TeacherValidationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  }, 
  isValidated: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
})

export const TeacherValidation = mongoose.model('TeacherValidation', TeacherValidationSchema)