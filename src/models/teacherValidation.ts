import mongoose from "mongoose";

export interface ITeacherValidation extends mongoose.Document {
  date: Date
  isValidated: boolean
  comment: string
}

export const TeacherValidationSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  }, 
  isValidated: {
    type: Boolean,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
})

export const TeacherValidation = mongoose.model('TeacherValidation', TeacherValidationSchema)