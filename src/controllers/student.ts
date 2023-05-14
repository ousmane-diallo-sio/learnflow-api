import { Router } from "express";
import { IStudent, Student, StudentModel } from "../models/student";
import { Address } from "../models/address";
import StudentValidationSchema from "../validators/students";
import { RequestHandler } from "../interfaces/types";
import { generateSalt, hashPassword } from "../utils/helpers";

const getAll: RequestHandler = async (req, res) => {
  try {
    const students = await StudentModel.find()
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(students))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
}

const createOne: RequestHandler = async (req, res) => {
  const validation = StudentValidationSchema.validate(req.body)

  if (validation.error) {
    res.status(400).send(JSON.stringify(validation.error.message))
    return
  }

  const studentData = req.body as IStudent

  const nbDuplicates = await StudentModel.find({ email: studentData.email }).countDocuments()
  if (nbDuplicates > 0) {
    res.status(400).send(JSON.stringify('Cet email est déjà lié à un compte'))
    return
  }

  const salt = generateSalt()
  const hashedPassword = hashPassword(studentData.password as string, salt)
  studentData.password = { salt, hashedPassword }

  try {
    const address = await Address.create(studentData.address)
    const student = await StudentModel.create({...studentData, address: address._id})
    student.password = undefined
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(student))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
}

const studentController = Router()
studentController.get('/',getAll)
studentController.post('/', createOne)

export default studentController