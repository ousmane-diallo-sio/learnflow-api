import mongoose from "mongoose";

export interface Moderator {
  firstName: string
  lastName: string
  email: string
}

export const ModeratorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
})

export const Moderator = mongoose.model('Moderator', ModeratorSchema)