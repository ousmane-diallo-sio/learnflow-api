import { Router } from "express";
import managerRepository from '../repositories/managerRepository';
import { IManager, ManagerModel } from '../models/manager';

const managerController = Router()

managerController.get('/', async (_, res) => {
  try {
    const managers = await managerRepository.getAll()
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(managers))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default managerController