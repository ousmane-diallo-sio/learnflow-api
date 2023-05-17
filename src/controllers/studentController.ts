import { Router } from "express";
import studentRepository from '../repositories/studentRepository';

const studentController = Router()

studentController.get('/', async (_, res) => {
  try {
    const students = await studentRepository.getAll()
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(students))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default studentController