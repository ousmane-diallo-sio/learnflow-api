import mongoose from "mongoose";
import { SchoolSubject } from "./schoolSubject";
import { Teacher } from "./teacher";

export interface SchoolSubjectTaught {
  yearsOfExperience: Number
  schoolSubject: SchoolSubject
  teacher: Teacher
}

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