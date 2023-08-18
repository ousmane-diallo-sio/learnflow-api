import { IAddress } from "./address";
import mongoose, { InferSchemaType } from "mongoose";
import { ISchoolSubject } from "./schoolSubject";

export interface ITeacher extends mongoose.Document {
  firstName: string
  lastName: string
  birthdate: Date
  email: string
  password?: string
  role: 'teacher'
  phoneNumber: string
  profilePicture: Document
  isValidated: boolean
  address: IAddress
  documents: Array<Document>
  schoolSubjectsTeached: Array<ISchoolSubjectTeached>
}

export interface ISchoolSubjectTeached {
  nbYearsExp: number
  schoolSubject: ISchoolSubject
}

export const TeacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  birthdate: {
    type: Date,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false
  },
  role: {
    type: String,
    default: "teacher",
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Document',
    required: true,
  },
  isValidated: {
    type: Boolean,
    required: true,
    default: false,
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Address',
    required: true,
  },
  documents: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Document',
    required: true,
  },
  schoolSubjectsTeached: [{
    nbYearsExp: {
      type: Number,
      required: true
    },
    schoolSubject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SchoolSubject',
      required: true
    },
  }]
})

export type Teacher = InferSchemaType<typeof TeacherSchema>;
export const TeacherModel = mongoose.model<ITeacher>('Teacher', TeacherSchema)