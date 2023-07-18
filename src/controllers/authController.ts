import { Router } from "express";
import studentRepository from "../repositories/studentRepository";
import managerRepository from "../repositories/managerRepository";
import moderatorRepository from "../repositories/moderatorRepository";
import teacherRepository from "../repositories/teacherRepository";
import { comparePassword, learnflowResponse } from '../lib/helpersService';
import jwt from 'jwt-express'
import { generateToken } from "../lib/authService";
import NotFoundError from "../errors/NotFoundError";
import ValidationError from "../errors/ValidationError";

const authController = Router();

authController.post("/login/manager", async (req, res) => {
  const { email, password }:  { email: string, password: string } = req.body

  try {
    const manager = await managerRepository.getOneByEmailWithPassword(email)
    if (manager?.password) {
      const passwordComparision = await comparePassword(password, manager.password)
      if (passwordComparision) {
        const token = generateToken({ email: manager.email, role: manager.role }, res.jwt)
        manager.password = undefined

        return res.status(200).send(
          learnflowResponse({
            status: 200,
            jwt: token,
            data: manager
          })
        )
      }
    }
    
    res.status(401).send(
      learnflowResponse({
        status: 401,
        error: "L'email ou le mot de passe est incorrect"
      })
    )
    return
  } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/login/moderator", async (req, res) => {
    const { email, password }:  { email: string, password: string } = req.body
    try {
      const moderator = await moderatorRepository.getOneByEmailWithPassword(email)
      if (moderator?.password) {
        const passwordComparision = await comparePassword(password, moderator.password)
        if (passwordComparision) {
          const token = generateToken({ email: moderator.email, role: moderator.role }, res.jwt)
          return res.status(200).send(token)
        }
      }
      res.status(401).send({ status: 401, message: "Wrong email or password" })
      return
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/login/user", async (req, res) => {
  const { email, password }:  { email: string, password: string } = req.body

  try {
    const student = await studentRepository.getOneByEmailWithPassword(email)
    if (student?.password) {
      const passwordComparision = await comparePassword(password, student.password)
      if (passwordComparision) {
        const token = generateToken({ email: student.email, role: student.role }, res.jwt)
        student.password = undefined

        return res.status(200).send(
          learnflowResponse({
            status: 200,
            jwt: token,
            data: student
          })
        )
      }
    } else {
      const teacher = await teacherRepository.getOneByEmailWithPassword(email)
      if (teacher?.password) {
        const passwordComparision = await comparePassword(password, teacher.password)
        if (passwordComparision) {
          if (!teacher.isValidated) {
            return res.status(401).send(
              learnflowResponse({
                status: 401,
                error: "Votre compte n'a pas encore été validé par un modérateur"
              })
            )
          }

          const token = generateToken({ email: teacher.email, role: teacher.role }, res.jwt)
          return res.status(200).send(
            learnflowResponse({
              status: 200,
              jwt: token,
              data: teacher
            })
          )
        }
      }
    }
    
    res.status(401).send(
      learnflowResponse({
        status: 401,
        error: "L'email ou le mot de passe est incorrect"
      })
    )
    return
  } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/logout", async (_, res) => {
  try {
    jwt.clear()
    return res.status(200).send(JSON.stringify("Successfully logged out"))
  } catch(e) {
 if (e instanceof NotFoundError) {
      res.status(404).send({
          status: 404,
          message: "Not found!"
      })
    } else if (e instanceof ValidationError) {
      res.status(400).send({
          status: 400,
          message: "Bad Request",
          details: e.errorDetails
      })
    } else {
      res.status(500).send({
          status: 500,
          message: "Internal Error",
      })
    }}
})

export default authController;

