import Joi from "joi";
import AddressValidationSchema from "./address";
import DocumentValidationSchema from "./document";
import { PasswordValidationSchema } from "./password";

const TeacherValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(25).required(),
  birthdate: Joi.date().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().pattern(/^((\+)33|0|0033)[1-9](\d{2}){4}$/).required(),
  profilePictureUrl: Joi.string().min(1).max(2048).required(),
  isValidated: Joi.boolean().required(),
  address: AddressValidationSchema.required(),
  documents: Joi.array().items(DocumentValidationSchema.required()),
  password: PasswordValidationSchema.required()
})

export default TeacherValidationSchema