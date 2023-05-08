import Joi from "joi"
import StudentValidationSchema from "./students"
import ModeratorValidationSchema from "./moderator"
import TeacherValidationSchema from "./teacher"

const ChatValidationSchema = Joi.object({
  message: Joi.string().min(1).max(1224).required(),
  datetime: Joi.date().required(),
  student: StudentValidationSchema.required(),
  moderator: ModeratorValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
})

export default ChatValidationSchema