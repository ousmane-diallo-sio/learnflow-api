import Joi from "joi";
import mongoose from "mongoose";
import { IStudent, StudentValidationSchema } from "./student";
import { IJustificative, JustificativeValidationSchema } from "./justificative";
import { IPayment, PaymentValidationSchema } from "./payment";
import { ISchoolSubject, SchoolSubjectValidationSchema } from "./schoolSubject";
import { ITeacher, TeacherValidationSchema } from "./teacher";

export interface IBooking extends mongoose.Document {
  startDate: Date
  endDate: Date
  isAccepted: boolean
  schoolSubject: ISchoolSubject
  student: IStudent
  teacher: ITeacher
  studentJustificative: IJustificative
  teacherJustificative: IJustificative
  payment: IPayment
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