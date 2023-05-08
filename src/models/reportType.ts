import Joi from "joi";
import mongoose from "mongoose";

export interface IReportType extends mongoose.Document {
  name: string
}

export const ReportTypeValidationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
})

export const ReportTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

export const ReportType = mongoose.model('ReportType', ReportTypeSchema)