import mongoose from "mongoose";
import { Student } from "./student";
import { Address } from "./address";
import { Moderator } from "./moderator";
import { Teacher } from "./teacher";

export interface Report {
  date: Date
  reason: string
  detail: string
  reportType: Address
  student: Student
  moderator: Moderator
  teacher: Teacher
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