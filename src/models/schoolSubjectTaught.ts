import Joi from "joi";
import mongoose from "mongoose";
import { SchoolSubject, SchoolSubjectValidationSchema } from "./schoolSubject";
import { Teacher, TeacherValidationSchema } from "./teacher";

export interface SchoolSubjectTaught {
  yearsOfExperience: Number
  schoolSubject: SchoolSubject
  teacher: Teacher
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