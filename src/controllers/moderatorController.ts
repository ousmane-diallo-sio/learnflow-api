import { Router } from "express";
import moderatorRepository from '../repositories/moderatorRepository';
import { IModerator, ModeratorModel } from '../models/moderator';

const moderatorController = Router()

moderatorController.get('/', async (_, res) => {
  try {
    const moderators = await moderatorRepository.getAll()
    res.contentType('application/json')
    res.status(200).send(JSON.stringify(moderators))
  } catch(e) {
    console.error(e)
    res.status(500).send(JSON.stringify("An error occured"))
  }
})

export default moderatorController