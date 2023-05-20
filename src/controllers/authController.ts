import { Router } from "express";
import studentRepository from "../repositories/studentRepository";
import managerRepository from "../repositories/managerRepository";
import moderatorRepository from "../repositories/moderatorRepository";
import teacherRepository from "../repositories/teacherRepository";
import { comparePassword } from '../utils/helpers';
import jwt from 'jwt-express'
import { generateToken } from "../services/authService";
import loginDTO from '../dto/login.dto';

const authController = Router();

authController.post("/login/manager", async (req, res) => {
    const loginInformation: loginDTO = req.body
    try {
      const manager = await managerRepository.getOneByEmailWithPassword(loginInformation.email)
      if (manager?.password) {
        let passwordComparision = await comparePassword(loginInformation.password, manager.password)
        if (passwordComparision) {
          let token = generateToken({ email: manager.email, role: manager.role }, res.jwt)
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

authController.post("/login/moderator", async (req, res) => {
    const loginInformation: loginDTO = req.body
    try {
      const moderator = await moderatorRepository.getOneByEmailWithPassword(loginInformation.email)
      if (moderator?.password) {
        let passwordComparision = await comparePassword(loginInformation.password, moderator.password)
        if (passwordComparision) {
          let token = generateToken({ email: moderator.email, role: moderator.role }, res.jwt)
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

authController.post("/login/student", async (req, res) => {
    const loginInformation: loginDTO = req.body
    try {
      const student = await studentRepository.getOneByEmailWithPassword(loginInformation.email)
      if (student?.password) {
        let passwordComparision = await comparePassword(loginInformation.password, student.password)
        if (passwordComparision) {
          let token = generateToken({ email: student.email, role: student.role }, res.jwt)
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

authController.post("/login/teacher", async (req, res) => {
    const loginInformation: loginDTO = req.body
    try {
      const teacher = await teacherRepository.getOneByEmailWithPassword(loginInformation.email)
      if (teacher?.password) {
        let passwordComparision = await comparePassword(loginInformation.password, teacher.password)
        if (passwordComparision) {
          let token = generateToken({ email: teacher.email, role: teacher.role }, res.jwt)
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

authController.post("/logout", async (_, res) => {
  try {
    jwt.clear()
    return res.status(200).send(JSON.stringify("Successfully logged out"))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default authController;

