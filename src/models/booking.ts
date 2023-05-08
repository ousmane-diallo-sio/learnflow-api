import Joi from "joi";
import mongoose from "mongoose";
import { Student } from "./student";
import { Justificative, JustificativeValidationSchema } from "./justificative";
import { Payment, PaymentValidationSchema } from "./payment";
import { SchoolSubject, SchoolSubjectValidationSchema } from "./schoolSubject";
import { Teacher, TeacherValidationSchema } from "./teacher";
import StudentValidationSchema from "../validators/students";

export interface Booking {
  startDate: Date
  endDate: Date
  isAccepted: boolean
  schoolSubject: SchoolSubject
  student: Student
  teacher: Teacher
  studentJustificative: Justificative
  teacherJustificative: Justificative
  payment: Payment
}

export const BookingValidationSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  isAccepted: Joi.boolean().required(),
  schoolSubject: SchoolSubjectValidationSchema.required(),
  student: StudentValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
  studentJustificative: JustificativeValidationSchema.required(),
  teacherJustificative: JustificativeValidationSchema.required(),
  payment: PaymentValidationSchema.required(),
})

export const BookingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  isAccepted: {
    type: Boolean,
    default: false,
    required: true,
  },
  schoolSubject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SchoolSubject',
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
  studentJustificative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Justificative',
  },
  teacherJustificative: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Justificative',
  },
  payment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
  },
})

export const Booking = mongoose.model('Booking', BookingSchema)