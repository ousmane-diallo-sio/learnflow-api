import mongoose from "mongoose";
import { Student } from "./student";
import { Moderator } from "./moderator";
import { Teacher } from "./teacher";

export interface Chat {
  message: string
  datetime: Date
  student: Student
  moderator: Moderator
  teacher: Teacher
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