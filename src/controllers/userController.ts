import { Router } from "express";
import teacherRepository from '../repositories/teacherRepository';
import NotFoundError from "../errors/NotFoundError";
import ValidationError from "../errors/ValidationError";
import { ITeacher, TeacherModel } from "../models/teacher";
import { learnflowResponse } from "../lib/helpersService";
import jwtExpress from 'jwt-express'
import studentRepository from "../repositories/studentRepository";
import { IUserStudent, IUserTeacher } from "../interfaces/IUser";
import { IStudent, StudentModel } from "../models/student";

const userController = Router()

userController.get("/me", jwtExpress.active(), async (req, res) => {
  const jwt = req.jwt
  try {
    const student = await studentRepository.getOneByEmail(jwt.payload.email)
    if (student) {
      return res.status(200).send(
        learnflowResponse({
          status: 200,
          data: student
        })
      )
    } else {
      const teacher = await teacherRepository.getOneByEmail(jwt.payload.email)
      if (teacher) {
        return res.status(200).send(
          learnflowResponse({
            status: 200,
            data: teacher
          })
        )
      }
    }
    return res.status(404).send(
      learnflowResponse({
        status: 404,
        error: "Utilisateur introuvable"
      })
    )
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

userController.patch("/me", jwtExpress.active(), async (req, res) => {
  const jwt = req.jwt
  const { student, teacher }: { student?: IStudent, teacher?: ITeacher } = req.body

  if (!student && !teacher || student && teacher) {
    return res.status(400).send(
      learnflowResponse({
        status: 400,
        error: "Mauvais formattage de la requête"
      })
    )
  }
  
  try {
    const userStudent = await StudentModel.findOne({ email: jwt.payload.email })
    if (userStudent && student) {
      const updatedStudent = await studentRepository.updateOne(userStudent._id, student)

      // if an array is returned, it means that there was an error
      if (updatedStudent instanceof Array) {
        return res.status(400).send(
          learnflowResponse({
            status: 400,
            error: updatedStudent[0].message
          })
        )
      }

      return res.status(200).send(
        learnflowResponse({
          status: 200,
          data: updatedStudent
        })
      )
    }
    
    if (teacher) {
      const teacher = await teacherRepository.getOneByEmail(jwt.payload.email)
      if (teacher) {
        return res.status(200).send(
          learnflowResponse({
            status: 200,
            data: teacher
          })
        )
      }
    }
    return res.status(404).send(
      learnflowResponse({
        status: 404,
        error: "Utilisateur introuvable"
      })
    )
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default userController