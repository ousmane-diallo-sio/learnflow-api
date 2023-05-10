import Joi from "joi"
import DocumentTypeValidationSchema from "./documentType"

const DocumentValidationSchema = Joi.object({
  uploadUrl: Joi.string().min(3).max(2048).required(),
  documentType: DocumentTypeValidationSchema.required(),
})

export default DocumentValidationSchema