import Joi from "joi"

const DocumentValidationSchema = Joi.object({
  name: Joi.string().min(3).max(30).required()
    .messages({
      'string.base': 'Le nom du document doit être au format texte',
      'string.empty': 'Vous devez nommer vos documents',
      'string.min': 'Le nom du document doit contenir au moins {#limit} caractères',
      'string.max': 'Le nom du document ne doit pas dépasser {#limit} caractères',
    }),
  desc: Joi.string().min(3).max(100)
    .messages({
      'string.base': 'La description du document doit être au format texte',
      'string.min': 'La description d\'un document doit contenir au moins {#limit} caractères',
      'string.max': 'La description d\'un document ne doit pas dépasser {#limit} caractères',
    }),
  base64: Joi.string().base64().required()
    .messages({
      'string.empty': 'La photo de profil est obligatoire',
      'string.uri': 'La photo de profil doit être une image valide',
      'any.required': 'La photo de profil est obligatoire'
    }),
  documentType: Joi.string().valid('image', 'pdf').required()
    .messages({
      'any.only': 'Type de document invalide',
      'string.base': 'Le type de document doit être indiqué au format texte',
      'string.empty': 'Le type de document est obligatoire',
      'any.required': 'Le type de document est obligatoire'
    })
}).messages({
  'object.base': 'Erreur lors de l\'envoi du document (mauvais formattage)',
  'object.empty': 'L\'ajout d\'un document est obligatoire',
  'any.required': 'L\'ajout d\'un document est obligatoire'
})

export default DocumentValidationSchema