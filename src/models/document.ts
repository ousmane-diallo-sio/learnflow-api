import Joi from "joi";
import mongoose from "mongoose";
import { DocumentTypeValidationSchema } from "./documentType";

export interface IDocument extends mongoose.Document {
  uploadUrl: string
  documentType: DocumentType
}

export const DocumentValidationSchema = Joi.object({
  uploadUrl: Joi.string().min(3).max(2048).required(),
  documentType: DocumentTypeValidationSchema.required(),
})

export const DocumentSchema = new mongoose.Schema({
  uploadUrl: {
      type: String,
      required: true,
      unique: true,
  },
  documentType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DocumentType',
  },
})

export const Document = mongoose.model('Document', DocumentSchema)