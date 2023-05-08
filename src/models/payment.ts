import mongoose from "mongoose";

export interface Payment {
  amount: number
  date: Date
  isDue: boolean
}

export const PaymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  isDue: {
    type: Boolean,
    default: false,
    required: true,
  },
})

export const Payment = mongoose.model('Payment', PaymentSchema)