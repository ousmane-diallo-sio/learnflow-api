import mongoose from "mongoose";
import { IStudent } from "./student";
import { IModerator } from "./moderator";
import { ITeacher } from "./teacher";

export interface Chat extends mongoose.Document {
  message: string
  datetime: Date
  student: IStudent
  moderator: IModerator
  teacher: ITeacher
}

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