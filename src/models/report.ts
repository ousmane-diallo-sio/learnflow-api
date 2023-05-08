import Joi from "joi";
import mongoose from "mongoose";
import { ReportTypeValidationSchema } from "./reportType";
import { IStudent, StudentValidationSchema } from "./student";
import { IAddress } from "./address";
import { IModerator, ModeratorValidationSchema } from "./moderator";
import { ITeacher, TeacherValidationSchema } from "./teacher";

export interface IReport extends mongoose.Document {
  date: Date
  reason: string
  detail: string
  reportType: IAddress
  student: IStudent
  moderator: IModerator
  teacher: ITeacher
}

export const ReportValidationSchema = Joi.object({
  date: Joi.date().required(),
  reason: Joi.string().min(1).max(128).required(),
  detail: Joi.string().min(1).max(2048).required(),
  reportType: ReportTypeValidationSchema.required(),
  student: StudentValidationSchema.required(),
  moderator: ModeratorValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
})

export const ReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  reason: {
      type: String,
      required: true,
      unique: true,
  },
  detail: {
    type: String,
    required: true,
  },
  reportType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ReportType',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moderator',
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
})

export const Report = mongoose.model('Report', ReportSchema)