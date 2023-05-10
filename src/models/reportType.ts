import mongoose from "mongoose";

export interface ReportType {
  name: string
}

export const ReportTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

export const ReportType = mongoose.model('ReportType', ReportTypeSchema)