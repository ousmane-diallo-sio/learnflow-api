import mongoose, { InferSchemaType } from "mongoose";

export interface IDocument extends mongoose.Document {
  name: string
  desc?: string
  base64: string
  documentType: 'image' | 'pdf'
  _id: string
}

export const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: false,
  },
  base64: {
    type: String,
    required: true
  },
  documentType: {
    type: String,
    required: true,
    enum: ['image', 'pdf'],
    default: 'image',
  },
})

export type Document = InferSchemaType<typeof DocumentSchema>;
export const DocumentModel = mongoose.model('Document', DocumentSchema)
