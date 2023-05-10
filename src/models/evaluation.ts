import mongoose from "mongoose";
import { Student } from "./student";
import { SchoolSubject } from "./schoolSubject";
import { Teacher } from "./teacher";

export interface Evaluation {
  note: Number
  subject: SchoolSubject
  student: Student
  teacher: Teacher
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