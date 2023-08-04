import { Router } from "express";
import { Address } from "../models/address";
import { IStudent, StudentModel } from "../models/student";
import { ISchoolSubjectTeached, ITeacher, TeacherModel } from "../models/teacher";
import { hashPassword, isEmailAvailable, learnflowResponse } from "../lib/helpersService";
import { IManager, ManagerModel } from "../models/manager";
import { IModerator, ModeratorModel } from "../models/moderator";
import NotFoundError from "../errors/NotFoundError";
import StudentValidationSchema from "../validators/students";
import TeacherValidationSchema from "../validators/teacher";
import ModeratorValidationSchema from "../validators/moderator";
import ManagerValidationSchema from "../validators/manager";
import { DocumentModel } from "../models/document";
import { ISchoolSubject, SchoolSubject } from "../models/schoolSubject";
import { ObjectId } from "mongoose";

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
    const validationResult = ManagerValidationSchema.validate(managerData)
    if (e instanceof NotFoundError) {
      res.status(404).send({
          status: 404,
          message: "Not found!"
      })
    } else if (validationResult.error){
        console.log(validationResult.error.details)
        res.status(400).send({
          status: 400,
          message: "Bad Request",
          details: validationResult.error.details
      })
    } else {
      res.status(500).send({
          status: 500,
          message: "Internal Error",
      })
    }
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
    const validationResult = ModeratorValidationSchema.validate(moderatorData)
    if (e instanceof NotFoundError) {
      res.status(404).send({
          status: 404,
          message: "Not found!"
      })
    } else if (validationResult.error){
        console.log(validationResult.error.details)
        res.status(400).send({
          status: 400,
          message: "Bad Request",
          details: validationResult.error.details
      })
    } else {
      res.status(500).send({
          status: 500,
          message: "Internal Error",
      })
    }
  }
})

registerController.post('/student', async (req, res) => {
  const studentData = req.body as IStudent

  const isEmailValid = await isEmailAvailable(studentData.email)
  if (!isEmailValid) {
    res.status(400).send(
      learnflowResponse({
        status: 400,
        error: 'Cet email est déjà lié à un compte',
      })
    )
    return
  }

  const validationResult = StudentValidationSchema.validate(studentData)
  if (validationResult.error){
    console.error(validationResult.error.details)
    res.status(400).send(
      learnflowResponse({
        status: 400,
        error: validationResult.error.details[0].message,
      })
    )
    return
  }

  const hashedPassword = await hashPassword(studentData.password as string)
  studentData.password = hashedPassword
 
  try {

    const address = await Address.create(studentData.address)
    const profilePicture = await DocumentModel.create(studentData.profilePicture)

    const student = await StudentModel.create({
      ...studentData,
      address: address._id,
      profilePicture: profilePicture._id
    })
    student.password = undefined
    await student.populate('address')
    await student.populate('profilePicture')

    res.status(200).send(
      learnflowResponse({
        status: 201,
        data: student,
        // jwt: TODO
      })
    )
  } catch(e) {
    console.error(e)
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    })
  }
})

registerController.post('/teacher', async (req, res) => {
  const teacherData = req.body as ITeacher

  const isEmailValid = await isEmailAvailable(teacherData.email)
  if (!isEmailValid) {
    res.status(400).send(
      learnflowResponse({
        status: 400,
        error: 'Cet email est déjà lié à un compte',
      })
    )
    return
  }

  const validationResult = TeacherValidationSchema.validate(teacherData)
  if (validationResult.error){
    console.error(validationResult.error.details)
    res.status(400).send(
      learnflowResponse({
        status: 400,
        error: validationResult.error.details[0].message,
      })
    )
    return
  }

  const validSchoolSubjectsTeached = await Promise.all(
    teacherData.schoolSubjectsTeached.map(async (schoolSubjectTeached) => {
      const schoolSubject = await SchoolSubject.findOne({ name: schoolSubjectTeached.schoolSubject.name })
      if (schoolSubject) {
        return {
          nbYearsExp: schoolSubjectTeached.nbYearsExp,
          schoolSubject: schoolSubject
        }
      }
    })
  ).then(schoolSubjects => schoolSubjects.filter(schoolSubject => schoolSubject)) as ISchoolSubjectTeached[]

  if (validSchoolSubjectsTeached.length === 0) {
    res.status(400).send(
      learnflowResponse({
        status: 400,
        error: 'Learn Flow ne propose aucune des matières envoyées',
      })
    )
    return
  }

  const hashedPassword = await hashPassword(teacherData.password as string)
  teacherData.password = hashedPassword
  
  try {
    const address = await Address.create(teacherData.address)
    const profilePicture = await DocumentModel.create(teacherData.profilePicture)
    const documents = await Promise.all(teacherData.documents.map(async (document) => {
      return await DocumentModel.create(document)
    }))
    const teacher = await TeacherModel.create({
      ...teacherData, 
      address: address._id,
      profilePicture: profilePicture._id,
      documents: documents.map(document => document._id),
      schoolSubjectsTeached: validSchoolSubjectsTeached.map(schoolSubjectTeached => ({
        schoolSubject: schoolSubjectTeached.schoolSubject._id,
        nbYearsExp: schoolSubjectTeached.nbYearsExp
      }))
    })
    teacher.password = undefined
    await teacher.populate('profilePicture')
    await teacher.populate('address')
    
    res.status(201).send(
      learnflowResponse({
        status: 201,
        data: teacher,
        // jwt: TODO
      })
    )
  } catch(e) {
    console.error(e)
    res.status(500).send({
      status: 500,
      message: "Internal Server Error",
    })
  }
})

export default registerController