import Joi from "joi"
import SchoolSubjectValidationSchema from "./schoolSubject"
import StudentValidationSchema from "./students"
import TeacherValidationSchema from "./teacher"
import JustificativeValidationSchema from "./justificative"
import PaymentValidationSchema from "./payment"

const BookingValidationSchema = Joi.object({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  isAccepted: Joi.boolean().required(),
  schoolSubject: SchoolSubjectValidationSchema.required(),
  student: StudentValidationSchema.required(),
  teacher: TeacherValidationSchema.required(),
  studentJustificative: JustificativeValidationSchema.required(),
  teacherJustificative: JustificativeValidationSchema.required(),
  payment: PaymentValidationSchema.required(),
})

export default BookingValidationSchema