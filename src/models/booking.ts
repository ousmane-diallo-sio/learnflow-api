import mongoose from "mongoose";
import { Student } from "./student";
import { Justificative } from "./justificative";
import { Payment } from "./payment";
import { SchoolSubject } from "./schoolSubject";
import { Teacher } from "./teacher";

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