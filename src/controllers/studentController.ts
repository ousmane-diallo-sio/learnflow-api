import { Router } from "express";
import studentRepository from '../repositories/studentRepository';
import NotFoundError from "../errors/NotFoundError";
import ValidationError from "../errors/ValidationError";
import { learnflowResponse } from "../lib/helpersService";
import { StudentModel } from "../models/student";

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

studentController.get('/:query', async (req, res) => {
  const query = req.params.query

  try {
    const students = await StudentModel.find({ 
      $or: [
        { email: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { firstName: { $regex: query, $options: 'i' } },
      ],
     }).populate('address')

    res.status(200).send(
      learnflowResponse({
        status: 200,
        data: students
      })
    )
  } catch(e) {
    learnflowResponse({
      status: 500,
      error: "Nous n'avons pas pu récupérer les étudiants"
    })
  }

})

export default studentController