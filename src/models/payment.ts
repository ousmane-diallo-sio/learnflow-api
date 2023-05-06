import Joi from "joi";
import mongoose from "mongoose";

export interface Payment {
  amount: number
  date: Date
  isDue: boolean
}

export const PaymentValidationSchema = Joi.object({
  amount: Joi.number().required(),
  date: Joi.date().required(),
  isDue: Joi.boolean().required(),
})

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