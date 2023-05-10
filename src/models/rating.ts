import mongoose from "mongoose";
import { Student } from "./student";
import { Teacher } from "./teacher";

export interface Rating {
  note: Number
  student: Student
  teacher: Teacher
}

export const RatingSchema = new mongoose.Schema({
  note: {
    type: Number,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
})

export const Rating = mongoose.model('Rating', RatingSchema)