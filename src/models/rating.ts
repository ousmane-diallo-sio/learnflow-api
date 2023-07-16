import mongoose from "mongoose";
import { IStudent } from "./student";
import { ITeacher } from "./teacher";

export interface IRating extends mongoose.Document {
  note: Number
  student: IStudent
  teacher: ITeacher
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