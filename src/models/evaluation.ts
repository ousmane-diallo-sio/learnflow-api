import mongoose from "mongoose";
import { IStudent } from "./student";
import { ISchoolSubject } from "./schoolSubject";
import { ITeacher } from "./teacher";

export interface IEvaluation extends mongoose.Document {
  note: Number
  subject: ISchoolSubject
  student: IStudent
  teacher: ITeacher
}

export const EvaluationSchema = new mongoose.Schema({
  note: {
    type: Number,
    required: true,
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolSubject',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
})

export const Evaluation = mongoose.model('Evaluation', EvaluationSchema)