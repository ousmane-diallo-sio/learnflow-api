import { Router } from "express";
import { Student } from "../models/student";
import StudentValidationSchema from "../validators/students";

const studentController = Router()

studentController.get('/', async (req, res) => {
  try {
    const students = await Student.find()
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(students))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

studentController.post('/', async (req, res) => {
  const studentData = req.body
  
  const validation = StudentValidationSchema.validate(studentData)
  console.log("validation", validation)
  if (validation.error) {
    res.status(400).send(JSON.stringify(validation.error.message))
    return
  }

  try {
    res.contentType('application/json')
    res.status(200).send()
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default studentController