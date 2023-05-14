import mongoose from "mongoose";

export interface IDocumentType extends mongoose.Document {
  name: string
}

export const DocumentTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

export const DocumentType = mongoose.model('DocumentType', DocumentTypeSchema)