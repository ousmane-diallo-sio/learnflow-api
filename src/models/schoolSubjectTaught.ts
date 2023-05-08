import Joi from "joi";
import mongoose from "mongoose";
import { ISchoolSubject, SchoolSubjectValidationSchema } from "./schoolSubject";
import { ITeacher, TeacherValidationSchema } from "./teacher";

export interface ISchoolSubjectTaught extends mongoose.Document {
  yearsOfExperience: Number
  schoolSubject: ISchoolSubject
  teacher: ITeacher
}

export const SchoolSubjectTaughtValidationSchema = Joi.object({
  yearsOfExperience: Joi.number().required(),
  schoolSubject: SchoolSubjectValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
})

export const SchoolSubjectTaughtSchema = new mongoose.Schema({
  yearsOfExperience: {
    type: Number,
    required: true,
  },
  schoolSubject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolSubject',
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
})

export const SchoolSubjectTaught = mongoose.model('SchoolSubjectTaught', SchoolSubjectTaughtSchema)