import Joi from "joi";
import mongoose from "mongoose";
import { IStudent, StudentValidationSchema } from "./student";
import { ISchoolSubject, SchoolSubjectValidationSchema } from "./schoolSubject";
import { ITeacher, TeacherValidationSchema } from "./teacher";

export interface IEvaluation extends mongoose.Document {
  note: Number
  subject: ISchoolSubject
  student: IStudent
  teacher: ITeacher
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