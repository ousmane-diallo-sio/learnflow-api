import Joi from "joi";

const SchoolSubjectValidationSchema = Joi.object({
  name: Joi.string().min(1).max(30).required()
    .messages({
      'string.base': 'Le nom de la matière doit être au format texte',
      'string.empty': 'Le nom de la matière est obligatoire',
      'string.min': 'Le nom de la matière doit contenir au moins {#limit} caractères',
      'string.max': 'Le nom de la matière ne doit pas dépasser {#limit} caractères',
      'any.required': 'Le nom de la matière est obligatoire'
    }),
})
export default SchoolSubjectValidationSchema

export const SchoolSubjectTeachedValidationSchema = Joi.object({
  nbYearsExp: Joi.number().min(1).max(50).required()
    .messages({
      'number.base': 'Le nombre d\'années d\'expérience doit être un nombre',
      'number.empty': 'Le nombre d\'années d\'expérience est obligatoire',
      'number.min': 'Le nombre d\'années d\'expérience doit être supérieur ou égal à {#limit}',
      'number.max': 'Il est techniquement impossible d\'avoir plus de {#limit} ans d\'expérience dans une matière',
    }),
  schoolSubject: SchoolSubjectValidationSchema.required()
})
