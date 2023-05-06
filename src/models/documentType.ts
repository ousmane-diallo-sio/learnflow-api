import Joi from "joi";
import mongoose from "mongoose";

export interface DocumentType {
  name: string
}

export const DocumentTypeValidationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
})

export const DocumentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

export const DocumentType = mongoose.model('DocumentType', DocumentTypeSchema)