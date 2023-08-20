import { Router } from "express";
import teacherRepository from '../repositories/teacherRepository';
import NotFoundError from "../errors/NotFoundError";
import ValidationError from "../errors/ValidationError";
import { TeacherModel } from "../models/teacher";
import { learnflowResponse } from "../lib/helpersService";

const teacherController = Router()

teacherController.get('/', async (_, res) => {
  try {
    const teachers = await teacherRepository.getAll()
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(teachers))
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

teacherController.get('/:query', async (req, res) => {
  const query = req.params.query

  try {
    const teachers = await TeacherModel.find({ 
      $or: [
        { email: { $regex: query, $options: 'i' } },
        { lastName: { $regex: query, $options: 'i' } },
        { firstName: { $regex: query, $options: 'i' } },
      ],
     }).populate('address').populate('profilePicture')

    res.status(200).send(
      learnflowResponse({
        status: 200,
        data: teacherRepository.formatAll(teachers)
      })
    )
  } catch(e) {
    learnflowResponse({
      status: 500,
      error: "Nous n'avons pas pu récupérer les étudiants"
    })
  }

})

export default teacherController