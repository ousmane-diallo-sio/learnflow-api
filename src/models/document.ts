import mongoose from "mongoose";

export interface Document {
  uploadUrl: string
  documentType: DocumentType
}

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