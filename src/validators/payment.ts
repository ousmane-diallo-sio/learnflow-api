import Joi from "joi";

const PaymentValidationSchema = Joi.object({
  amount: Joi.number().required(),
  date: Joi.date().required(),
  isDue: Joi.boolean().required(),
})

export default PaymentValidationSchema