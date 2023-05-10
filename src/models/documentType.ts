import mongoose from "mongoose";

export interface DocumentType {
  name: string
}

export const DocumentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

export const DocumentType = mongoose.model('DocumentType', DocumentTypeSchema)