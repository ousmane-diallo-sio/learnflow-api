import Joi from "joi";
import mongoose from "mongoose";
import { Student } from "./student";
import { SchoolSubject, SchoolSubjectValidationSchema } from "./schoolSubject";
import { Teacher, TeacherValidationSchema } from "./teacher";
import StudentValidationSchema from "../validators/students";

export interface Evaluation {
  note: Number
  subject: SchoolSubject
  student: Student
  teacher: Teacher
}

export const EvaluationValidationSchema = Joi.object({
  note: Joi.number().required(),
  subject: SchoolSubjectValidationSchema.required(),
  student: StudentValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
})

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