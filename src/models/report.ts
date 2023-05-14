import mongoose from "mongoose";
import { IStudent } from "./student";
import { IAddress } from "./address";
import { IModerator } from "./moderator";
import { ITeacher } from "./teacher";

export interface IReport extends mongoose.Document {
  date: Date
  reason: string
  detail: string
  reportType: IAddress
  student: IStudent
  moderator: IModerator
  teacher: ITeacher
}

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