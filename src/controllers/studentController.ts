import { Router } from "express";
import studentRepository from '../repositories/studentRepository';
import NotFoundError from "../errors/NotFoundError";
import ValidationError from "../errors/ValidationError";

const studentController = Router()

studentController.get('/', async (_, res) => {
  try {
    const students = await studentRepository.getAll()
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(students))
  } catch(e) {
    if (e instanceof NotFoundError) {
      res.status(404).send({
          status: 404,
          message: "Not found!"
      })
    } else if (e instanceof ValidationError) {
      res.status(400).send({
          status: 400,
          message: "Bad Request",
          details: e.errorDetails
      })
    } else {
      res.status(500).send({
          status: 500,
          message: "Internal Error",
      })
    }  
  }
})

export default studentController