import mongoose from "mongoose";

export interface Justificative {
  uploadUrl: string
  comment: string
  startDate: Date
  endDate: Date
}

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