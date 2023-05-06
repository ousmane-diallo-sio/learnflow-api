import Joi from "joi";
import mongoose from "mongoose";
import { Student, StudentValidationSchema } from "./student";
import { Moderator, ModeratorValidationSchema } from "./moderator";
import { Teacher } from "./teacher";
import { TeacherValidationSchema } from "./teacher";

export interface Chat {
  message: string
  datetime: Date
  student: Student
  moderator: Moderator
  teacher: Teacher
}

export const ChatValidationSchema = Joi.object({
  message: Joi.string().min(1).max(1224).required(),
  datetime: Joi.date().required(),
  student: StudentValidationSchema.required(),
  moderator: ModeratorValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
})

export const ChatSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  datetime: {
    type: Date,
    required: true,
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  },
  moderator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Moderator',
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
  },
})

export const Chat = mongoose.model('Chat', ChatSchema)