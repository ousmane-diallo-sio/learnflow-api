import mongoose from "mongoose";

export interface Manager {
  firstName: string
  lastName: string
  email: string
}

export const ManagerSchema = new mongoose.Schema({
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

export const Manager = mongoose.model('Manager', ManagerSchema)