import mongoose, { InferSchemaType } from "mongoose";

export interface IDocument extends mongoose.Document {
  name: string
  desc: string
  document: {
    data: Buffer,
    contentType: string,
  }
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
  document: {
    type: {
      data: Buffer,
      contentType: String,
    },
    required: true,
  }
})

export type Document = InferSchemaType<typeof DocumentSchema>;
export const DocumentModel = mongoose.model('Document', DocumentSchema)
