import Joi from "joi";
import SchoolSubjectValidationSchema from "./schoolSubject";
import TeacherValidationSchema from "./teacher";

const SchoolSubjectTaughtValidationSchema = Joi.object({
  yearsOfExperience: Joi.number().required(),
  schoolSubject: SchoolSubjectValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
})

export default SchoolSubjectTaughtValidationSchema