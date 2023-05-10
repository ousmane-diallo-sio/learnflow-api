import Joi from "joi"
import StudentValidationSchema from "./students"
import TeacherValidationSchema from "./teacher"
import SchoolSubjectValidationSchema from "./schoolSubject"

const EvaluationValidationSchema = Joi.object({
  note: Joi.number().required(),
  subject: SchoolSubjectValidationSchema.required(),
  student: StudentValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
})

export default EvaluationValidationSchema