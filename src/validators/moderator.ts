import Joi from "joi";
import { PasswordValidationSchema } from './password';

const ModeratorValidationSchema = Joi.object({
  firstName: Joi.string().min(1).max(50).required(),
  lastName: Joi.string().min(1).max(50).required(),
  email: Joi.string().email().required(),
  password: PasswordValidationSchema.required(),
})

export default ModeratorValidationSchema