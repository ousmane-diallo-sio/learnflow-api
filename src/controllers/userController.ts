import { Router } from "express";
import teacherRepository from '../repositories/teacherRepository';
import NotFoundError from "../errors/NotFoundError";
import ValidationError from "../errors/ValidationError";
import { TeacherModel } from "../models/teacher";
import { learnflowResponse } from "../lib/helpersService";
import jwtExpress from 'jwt-express'
import studentRepository from "../repositories/studentRepository";

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

export default userController