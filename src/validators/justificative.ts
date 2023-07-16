import Joi from "joi";

const JustificativeValidationSchema = Joi.object({
  uploadUrl: Joi.string().min(3).max(2048).required(),
  comment: Joi.string().min(1).max(1224).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
})

export default JustificativeValidationSchema