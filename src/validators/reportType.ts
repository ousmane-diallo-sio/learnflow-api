import Joi from "joi";

const ReportTypeValidationSchema = Joi.object({
  name: Joi.string().min(1).max(100).required(),
})

export default ReportTypeValidationSchema