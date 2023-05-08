import Joi from "joi";
import mongoose from "mongoose";
import { IStudent, StudentValidationSchema } from "./student";
import { IModerator, ModeratorValidationSchema } from "./moderator";
import { ITeacher } from "./teacher";
import { TeacherValidationSchema } from "./teacher";

export interface Chat extends mongoose.Document {
  message: string
  datetime: Date
  student: IStudent
  moderator: IModerator
  teacher: ITeacher
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