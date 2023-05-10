import Joi from "joi";

const TeacherValidationValidationSchema = Joi.object({
  date: Joi.date().required(),
  isValidated: Joi.boolean().required(),
  comment: Joi.string().min(1).max(1224).required(),
})

export default TeacherValidationValidationSchema