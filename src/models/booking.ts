import mongoose from "mongoose";
import { IStudent } from "./student";
import { IJustificative } from "./justificative";
import { IPayment } from "./payment";
import { ISchoolSubject } from "./schoolSubject";
import { ITeacher } from "./teacher";

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