import Joi from "joi";
import mongoose from "mongoose";

export interface SchoolSubject {
  name: string
}

export const SchoolSubjectValidationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
})

export const SchoolSubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

export const SchoolSubject = mongoose.model('SchoolSubject', SchoolSubjectSchema)