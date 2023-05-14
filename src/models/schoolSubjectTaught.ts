import mongoose from "mongoose";
import { ISchoolSubject } from "./schoolSubject";
import { ITeacher } from "./teacher";

export interface ISchoolSubjectTaught extends mongoose.Document {
  yearsOfExperience: Number
  schoolSubject: ISchoolSubject
  teacher: ITeacher
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