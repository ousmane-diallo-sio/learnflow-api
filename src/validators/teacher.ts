import Joi from "joi";
import AddressValidationSchema from "./address";
import { PasswordValidationSchema } from "./password";
import DocumentValidationSchema from "./document";
import SchoolSubjectValidationSchema, { SchoolSubjectTeachedValidationSchema } from "./schoolSubject";

const today = new Date()
const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate())

const TeacherValidationSchema = Joi.object({
  firstName: Joi.string().min(2).max(50).required()
    .messages({
      'string.base': 'Le prénom doit être au format texte',
      'string.empty': 'Le prénom est obligatoire',
      'string.min': 'Le prénom doit contenir au moins {#limit} caractères',
      'string.max': 'Le prénom ne doit pas dépasser {#limit} caractères',
      'any.required': 'Le prénom est obligatoire'
    }),
  lastName: Joi.string().min(2).max(50).required()
    .messages({
      'string.base': 'Le nom doit être au format texte',
      'string.empty': 'Le nom est obligatoire',
      'string.min': 'Le nom doit contenir au moins {#limit} caractères',
      'string.max': 'Le nom ne doit pas dépasser {#limit} caractères',
      'any.required': 'Le nom est obligatoire'
    }),
  birthdate: Joi.date().max(fiveYearsAgo).required()
    .messages({
      'date.base': 'Le format de la date est invalide',
      'date.max': 'Vous devez avoir au moins 6 ans pour vous inscrire',
      'any.required': 'La date de naissance est obligatoire'
    }),
  email: Joi.string().email().required()
    .messages({
      'string.email': 'L\'adresse email est invalide',
      'any.required': 'L\'adresse email est obligatoire'
    }),
  phoneNumber: Joi.string().pattern(/^((\+)33|0|0033)[1-9](\d{2}){4}$/).required()
    .messages({
      'string.pattern.base': 'Le numéro de téléphone doit être un numéro de téléphone français valide',
      'any.required': 'Le numéro de téléphone est obligatoire'
    }),
  profilePicture: DocumentValidationSchema.required(),
  address: AddressValidationSchema.required(),
  documents: Joi.array().min(1).items(DocumentValidationSchema.required()).required()
    .messages({
      'array.base': 'Vous devez envoyer une liste de documents de vérification',
      'array.empty': 'Les documents de vérification sont obligatoires',
      'array.min': 'Vous devez envoyer au moins {#limit} document de vérification',
      'any.required': 'Les documents de vérification sont obligatoires'
    }),
  schoolSubjectsTeached: Joi.array().min(1).items(SchoolSubjectTeachedValidationSchema.required()).required().messages({
    'array.required': 'Vous devez renseigner les matières que vous enseignez',
    'array.base': 'Vous devez renseigner les matières que vous enseignez',
    'array.empty': 'Vous devez renseigner les matières que vous enseignez',
    'array.min': 'Vous devez renseigner au moins {#limit} matière que vous enseignez',
  }),
  password: PasswordValidationSchema.required()
})

export default TeacherValidationSchema