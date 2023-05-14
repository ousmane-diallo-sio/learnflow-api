import { Router } from "express";
import { generateToken } from "../services/authService";
import studentRepository from "../repositories/studentRepository";
import managerRepository from "../repositories/managerRepository";
import moderatorRepository from "../repositories/moderatorRepository";
import teacherRepository from "../repositories/teacherRepository";
import { IManager } from '../models/manager';
import { IModerator } from '../models/moderator';
import { IStudent } from '../models/student';
import { ITeacher } from '../models/teacher';

const authController = Router();

authController.post("/manager", async (req, res) => {
    const managerData = req.body as IManager
    try {
      const manager = await managerRepository.getOneByEmail(req.body.email)
      if (!manager || manager.password !== managerData.password) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      const token = generateToken({email: manager.email}, res.jwt)
      res.status(200).send(token)
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/moderator", async (req, res) => {
    const moderatorData = req.body as IModerator
    try {
      const moderator = await moderatorRepository.getOneByEmail(req.body.email)
      if (!moderator || moderator.password !== moderatorData.password) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      const token = generateToken({email: moderator.email}, res.jwt)
      res.status(200).send(token)
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/student", async (req, res) => {
    const studentData = req.body as IStudent
    try {
      const student = await studentRepository.getOneByEmail(req.body.email)
      if (!student || student.password !== studentData.password) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      const token = generateToken({email: student.email}, res.jwt)
      res.status(200).send(token)
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/teacher", async (req, res) => {
    const teacherData = req.body as ITeacher
    try {
      const teacher = await teacherRepository.getOneByEmail(req.body.email)
      if (!teacher || teacher.password !== teacherData.password) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      const token = generateToken({email: teacher.email}, res.jwt)
      res.status(200).send(token)
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})


export default authController;

