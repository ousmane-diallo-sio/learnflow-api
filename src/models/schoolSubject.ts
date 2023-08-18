import mongoose from "mongoose";

export const schoolSubjectNames = [
  'Maths',
  'Anglais',
  'Français',
  'Physique-chimie',
  'Histoire',
  'Géographie',
  'Art',
  'Informatique',
  'Economie',
  'Philosophie',
  'Biologie'
] as const

export interface ISchoolSubject extends mongoose.Document {
  name: typeof schoolSubjectNames[number]
}

export const SchoolSubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: schoolSubjectNames
  },
})

export const SchoolSubject = mongoose.model('SchoolSubject', SchoolSubjectSchema)