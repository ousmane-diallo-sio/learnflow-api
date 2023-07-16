import mongoose from "mongoose";

export interface ISchoolSubject extends mongoose.Document {
  name: string
}

export const SchoolSubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

export const SchoolSubject = mongoose.model('SchoolSubject', SchoolSubjectSchema)