import { Router } from "express";
import studentRepository from "../repositories/studentRepository";
import managerRepository from "../repositories/managerRepository";
import moderatorRepository from "../repositories/moderatorRepository";
import teacherRepository from "../repositories/teacherRepository";
import { IManager } from '../models/manager';
import { IModerator } from '../models/moderator';
import { IStudent } from '../models/student';
import { ITeacher } from '../models/teacher';
import { comparePassword } from '../utils/helpers';
import jwt from 'jwt-express'
import { generateToken } from "../services/authService";

const authController = Router();

authController.post("/login/manager", async (req, res) => {
    const managerData = req.body as IManager
    try {
      const manager = await managerRepository.getOneByEmailWithPassword(req.body.email)
      let passwordComparision = await comparePassword(managerData.password as string, manager?.password ?? "")
      if (!manager || !passwordComparision) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      generateToken({ email: manager.email, role: manager.role }, res.jwt)
      return res.status(200).send(JSON.stringify("Successfully logged in"))
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/login/moderator", async (req, res) => {
    const moderatorData = req.body as IModerator
    try {
      const moderator = await moderatorRepository.getOneByEmailWithPassword(req.body.email)
      let passwordComparision = await comparePassword(moderatorData.password as string, moderator?.password ?? "")
      if (!moderator || !passwordComparision) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      generateToken({ email: moderator.email, role: moderator.role }, res.jwt)
      return res.status(200).send(JSON.stringify("Successfully logged in"))
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/login/student", async (req, res) => {
    const studentData = req.body as IStudent
    try {
      const student = await studentRepository.getOneByEmailWithPassword(req.body.email)
      let passwordComparision = await comparePassword(studentData.password as string, student?.password ?? "")
      if (!student || !passwordComparision) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      generateToken({ email: student.email, role: student.role }, res.jwt)
      return res.status(200).send(JSON.stringify("Successfully logged in"))
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/login/teacher", async (req, res) => {
    const teacherData = req.body as ITeacher
    try {
      const teacher = await teacherRepository.getOneByEmailWithPassword(req.body.email)
      let passwordComparision = await comparePassword(teacherData.password as string, teacher?.password ?? "")
      if (!teacher || !passwordComparision) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      generateToken({ email: teacher.email, role: teacher.role }, res.jwt)
      return res.status(200).send(JSON.stringify("Successfully logged in"))
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

