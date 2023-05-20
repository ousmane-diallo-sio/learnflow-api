import { Router } from "express";
import { Address } from "../models/address";
import { IStudent, StudentModel } from "../models/student";
import { ITeacher, TeacherModel } from "../models/teacher";
import { hashPassword } from "../utils/helpers";
import { IManager, ManagerModel } from "../models/manager";
import { IModerator, ModeratorModel } from "../models/moderator";

const registerController = Router()

registerController.post('/manager', async (req, res) => {
  const managerData = req.body as IManager
  const nbDuplicates = await ManagerModel.find({ email: managerData.email }).countDocuments()
  if (nbDuplicates > 0) {
    res.status(400).send(JSON.stringify('Cet email est déjà lié à un compte'))
    return
  }
  const hashedPassword = await hashPassword(managerData.password as string)
  managerData.password = hashedPassword
  try {
    const manager = await ManagerModel.create(managerData)
    manager.password = undefined
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(manager))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

registerController.post('/moderator', async (req, res) => {
  const moderatorData = req.body as IModerator
  const nbDuplicates = await ModeratorModel.find({ email: moderatorData.email }).countDocuments()
  if (nbDuplicates > 0) {
    res.status(400).send(JSON.stringify('Cet email est déjà lié à un compte'))
    return
  }
  const hashedPassword = await hashPassword(moderatorData.password as string)
  moderatorData.password = hashedPassword
  try {
    const moderator = await ModeratorModel.create(moderatorData)
    moderator.password = undefined
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(moderator))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

registerController.post('/student', async (req, res) => {
  const studentData = req.body as IStudent
  const nbDuplicates = await StudentModel.find({ email: studentData.email }).countDocuments()
  if (nbDuplicates > 0) {
    res.status(400).send(JSON.stringify('Cet email est déjà lié à un compte'))
    return
  }
  const hashedPassword = await hashPassword(studentData.password as string)
  studentData.password = hashedPassword
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
})

registerController.post('/teacher', async (req, res) => {
  const teacherData = req.body as ITeacher
  const nbDuplicates = await StudentModel.find({ email: teacherData.email }).countDocuments()
  if (nbDuplicates > 0) {
    res.status(400).send(JSON.stringify('Cet email est déjà lié à un compte'))
    return
  }
  const hashedPassword = await hashPassword(teacherData.password as string)
  teacherData.password = hashedPassword
  try {
    const address = await Address.create(teacherData.address)
    const teacher = await TeacherModel.create({...teacherData, address: address._id})
    teacher.password = undefined
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(teacher))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default registerController