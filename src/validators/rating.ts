import Joi from "joi"
import StudentValidationSchema from "./students"
import TeacherValidationSchema from "./teacher"

const RatingValidationSchema = Joi.object({
  note: Joi.number().required(),
  student: StudentValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
})

export default RatingValidationSchema