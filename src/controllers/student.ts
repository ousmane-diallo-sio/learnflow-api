import { Router } from "express";
import { IStudent, Student } from "../models/student";
import { Address } from "../models/address";
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
  const validation = StudentValidationSchema.validate(req.body)

  if (validation.error) {
    res.status(400).send(JSON.stringify(validation.error.message))
    return
  }

  const studentData = req.body as IStudent

  const nbDuplicates = await Student.find({ email: studentData.email }).countDocuments()
  if (nbDuplicates > 0) {
    res.status(400).send(JSON.stringify('Cet email est déjà lié à un compte'))
    return
  }

  try {
    const address = await Address.create(studentData.address)
    const student = await Student.create({...studentData, address: address._id})
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(student))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default studentController