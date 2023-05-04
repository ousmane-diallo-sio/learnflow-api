import Joi from "joi";
import { Address, AddressValidationSchema } from "./address";
import mongoose from "mongoose";

export interface ReportType {
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