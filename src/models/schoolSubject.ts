import mongoose from "mongoose";

export interface SchoolSubject {
  name: string
}

export const SchoolSubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
})

export const SchoolSubject = mongoose.model('SchoolSubject', SchoolSubjectSchema)