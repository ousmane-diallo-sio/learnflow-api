import Joi from "joi";

export const PasswordValidationSchema = Joi
  .string()
  .min(8)
  .max(25)
  .required()
  .messages({
    'string.base': 'Le mot de passe doit être au format texte',
    'string.empty': 'Le mot de passe est obligatoire',
    'string.min': 'Le mot de passe doit contenir au moins {#limit} caractères',
    'string.max': 'Le mot de passe ne doit pas dépasser {#limit} caractères',
    'any.required': 'Le mot de passe est obligatoire'
  })