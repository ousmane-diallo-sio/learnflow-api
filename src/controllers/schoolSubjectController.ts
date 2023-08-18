import { Router } from "express";
import managerRepository from '../repositories/managerRepository';
import { IManager, ManagerModel } from '../models/manager';
import NotFoundError from "../errors/NotFoundError";
import ValidationError from "../errors/ValidationError";
import { SchoolSubject } from "../models/schoolSubject";
import { learnflowResponse } from "../lib/helpersService";

const schoolSubjectController = Router()

schoolSubjectController.get('/', async (_, res) => {
  try {
    const schoolSubjects = await SchoolSubject.find()
    res.status(200).send(learnflowResponse({
      status: 200,
      data: schoolSubjects
    }))
    return

  } catch(e) {
    res.status(500).send(learnflowResponse({
      status: 500,
      error: "Internal server error",
    }))
  }
})

export default schoolSubjectController