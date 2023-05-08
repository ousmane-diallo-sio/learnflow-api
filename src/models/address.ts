import Joi from "joi";
import mongoose from "mongoose";

export interface Address {
  city: string
  zipCode: string
  street: string
  complement?: string
}


export const AddressValidationSchema = Joi.object({
  city: Joi.string().min(2).max(100).required()
    .messages({
      'string.base': 'La ville doit être au format texte',
      'string.empty': 'La ville est un champ obligatoire',
      'string.min': 'La ville doit comporter au moins {#limit} caractères',
      'string.max': 'La ville doit comporter au maximum {#limit} caractères',
      'any.required': 'La ville est un champ obligatoire'
    }),
  zipCode: Joi.string().regex(/^(?:0[1-9]|[1-8]\d|9[0-8])\d{3}$/).required()
    .messages({
      'string.pattern.base': 'Le code postal doit être un code postal français valide',
      'string.base': 'Le code postal doit être au format texte',
      'string.empty': 'Le code postal est un champ obligatoire',
      'any.required': 'Le code postal est un champ obligatoire'
    }),
  street: Joi.string().min(1).max(100).required()
    .messages({
      'string.base': 'La rue doit être au format texte',
      'string.empty': 'La rue est un champ obligatoire',
      'string.min': 'La rue doit comporter au moins {#limit} caractères',
      'string.max': 'La rue doit comporter au maximum {#limit} caractères',
      'any.required': 'La rue est un champ obligatoire'
    }),
  complement: Joi.string().min(1).max(100).optional()
    .messages({
      'string.base': 'Le complément d\'adresse doit être au format texte',
      'string.empty': 'Le complément d\'adresse est un champ obligatoire',
      'string.min': 'Le complément d\'adresse doit comporter au moins {#limit} caractères',
      'string.max': 'Le complément d\'adresse doit comporter au maximum {#limit} caractères',
    }),
})

export const AddressSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  complement: {
    type: String
  },
})

export const Address = mongoose.model('Address', AddressSchema)