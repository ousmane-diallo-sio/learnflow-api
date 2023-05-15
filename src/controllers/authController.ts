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

const authController = Router();

authController.post("/manager", async (req, res) => {
    const managerData = req.body as IManager
    try {
      const manager = await managerRepository.getOneByEmailWithPassword(req.body.email)
      let passwordComparision = await comparePassword(managerData.password as string, manager?.password ?? "")
      if (!manager || !passwordComparision) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      return res.status(200).send(JSON.stringify("Successfully authenticated"))
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/moderator", async (req, res) => {
    const moderatorData = req.body as IModerator
    try {
      const moderator = await moderatorRepository.getOneByEmailWithPassword(req.body.email)
      let passwordComparision = await comparePassword(moderatorData.password as string, moderator?.password ?? "")
      if (!moderator || !passwordComparision) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      return res.status(200).send(JSON.stringify("Successfully authenticated"))
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/student", async (req, res) => {
    const studentData = req.body as IStudent
    try {
      const student = await studentRepository.getOneByEmailWithPassword(req.body.email)
      let passwordComparision = await comparePassword(studentData.password as string, student?.password ?? "")
      if (!student || !passwordComparision) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      return res.status(200).send(JSON.stringify("Successfully authenticated"))
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

authController.post("/teacher", async (req, res) => {
    const teacherData = req.body as ITeacher
    try {
      const teacher = await teacherRepository.getOneByEmailWithPassword(req.body.email)
      let passwordComparision = await comparePassword(teacherData.password as string, teacher?.password ?? "")
      if (!teacher || !passwordComparision) {
        res.status(401).send({ status: 401, message: "Wrong email or password" })
        return
      }
      return res.status(200).send(JSON.stringify("Successfully authenticated"))
    } catch(e) {
      console.error(e)
      res.status(500).send(JSON.stringify("An error occured"))
    }
})

export default authController;

