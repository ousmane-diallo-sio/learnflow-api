import Joi from "joi";
import StudentValidationSchema from "./students";
import ModeratorValidationSchema from "./moderator";
import ReportTypeValidationSchema from "./reportType";
import TeacherValidationSchema from "./teacher";

const ReportValidationSchema = Joi.object({
  date: Joi.date().required(),
  reason: Joi.string().min(1).max(128).required(),
  detail: Joi.string().min(1).max(2048).required(),
  reportType: ReportTypeValidationSchema.required(),
  student: StudentValidationSchema.required(),
  moderator: ModeratorValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
})

export default ReportValidationSchema