import { Router } from "express";
import { Address } from "../models/address";
import { IStudent, StudentModel } from "../models/student";
import { ITeacher, TeacherModel } from "../models/teacher";

const registerController = Router()

registerController.post('/student', async (req, res) => {
  const studentData = req.body as IStudent
  try {
      const address = await Address.create(studentData.address)
      const student = await StudentModel.create({...studentData, address: address._id})
      res.contentType('application/json')
      res.status(200).send(JSON.stringify(student))
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

registerController.post('/teacher', async (req, res) => {
  const teacherData = req.body as ITeacher
  try {
    const address = await Address.create(teacherData.address)
    const teacher = await TeacherModel.create({...teacherData, address: address._id})
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(teacher))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default registerController