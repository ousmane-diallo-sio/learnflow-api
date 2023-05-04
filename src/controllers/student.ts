import { Router } from "express";
import { Student } from "../models/student";

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
  
  console.log("studentData", req.body)

  try {
    res.contentType('application/json')
    res.status(200).send()
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default studentController