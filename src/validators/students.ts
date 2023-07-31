import Joi from "joi"
import AddressValidationSchema from "./address"
import { Student } from "../models/student"
import { PasswordValidationSchema } from "./password"

const today = new Date()
const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate())

const StudentValidationSchema = Joi.object({
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
  profilePicture: Joi.string().base64()
    .messages({
      'string.empty': 'La photo de profil est obligatoire',
      'string.uri': 'La photo de profil doit être valide',
      'any.required': 'La photo de profil est obligatoire'
    }),
  address: AddressValidationSchema.required(),
  schoolLevel: Joi.string().valid("CP", "CE1", "CE2", "CM1", "CM2", "6ème", "5ème", "4ème", "3ème", "2nde", "1ère", "Terminale", "Bac +1", "Bac +2", "Bac +3", "Bac +4", "Bac +5"),
  password: PasswordValidationSchema.required(),
})

export default StudentValidationSchema