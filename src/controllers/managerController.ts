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

managerController.post('/', async (req, res) => {
  const managerData = req.body as IManager
  try {
    const manager = await ManagerModel.create(managerData)
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(manager))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default managerController