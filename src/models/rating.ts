import Joi from "joi";
import mongoose from "mongoose";
import { Student } from "./student";
import { Teacher } from "./teacher";
import { TeacherValidationSchema } from "./teacher";
import StudentValidationSchema from "../validators/students";

export interface Rating {
  note: Number
  student: Student
  teacher: Teacher
}

export const RatingValidationSchema = Joi.object({
  note: Joi.number().required(),
  student: StudentValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
})

export const RatingSchema = new mongoose.Schema({
  note: {
    type: Number,
    required: true,
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

export const Rating = mongoose.model('Rating', RatingSchema)