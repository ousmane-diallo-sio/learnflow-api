import { Router } from "express";
import { DocumentModel } from "../models/document";
import { learnflowResponse } from "../lib/helpersService";
import multer from "multer";

const documentsController = Router()

// upload.single('file')

// Set up file uploads with GridFS storage
const MAX_FILE_SIZE = 10 * 1024 * 1024 // 10MB

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE
  },
  fileFilter: (req, file, callback) => {
    if (file.size > MAX_FILE_SIZE) {
      callback(new Error('Votre fichier est trop volumineux (10MB maximum)'))
      return
    }
    callback(null, true)
  }
})

documentsController.get('/:documentId', async (req, res) => {
  const documentId = req.params.documentId

  try {
    const document = await DocumentModel.findById(documentId)

    if (!document) {
      res.status(404).json(
        learnflowResponse({
          status: 404,
          error: "Le fichier demandé n'existe pas"
        })
      )
      return
    }

    res.status(200).json(
      learnflowResponse({
        status: 200,
        data: document
      })
    )

  } catch (error) {
    console.error('Error retrieving document:', error)
    res.status(500).json(
      learnflowResponse({
        status: 500,
        error: "Nous n'avons pas pu récupérer le fichier demandé"
      })
    )
  }
})

documentsController.post('/', upload.single('image'), async (req, res) => {
  const { name, desc } = req.body
  const file = req.file

  if (!file) {
    res.status(400).json(
      learnflowResponse({
        status: 400,
        error: "Aucun fichier n'a été envoyé"
      })
    )
    return
  }

  const obj = {
    name: name,
    desc: desc,
    document: {
      data: file.buffer,
      contentType: file.mimetype
    }
  }

  try {
    const document = await DocumentModel.create(obj)
    res.status(200).json(
      learnflowResponse({
        status: 200,
        data: {
          name: document.name,
          desc: document.desc,
          document: {
            data: document.document.data?.toString('base64')
          }
        }
      })
    )
  } catch (error) {
    console.error('Error creating document:', error)
    res.status(500).json(
      learnflowResponse({
        status: 500,
        error: "Nous n'avons pas pu créer le fichier"
      })
    )
}})

export default documentsController