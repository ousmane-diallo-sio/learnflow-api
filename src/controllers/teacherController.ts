import { Router } from "express";
import teacherRepository from '../repositories/teacherRepository';

const teacherController = Router()

teacherController.get('/', async (_, res) => {
  try {
    const teachers = await teacherRepository.getAll()
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(teachers))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default teacherController