import express from "express";
import mongoose from 'mongoose';
import envUtils from "./utils/envUtils";
import { logConfirmation } from "./utils/logUtils";
import bodyParser from "body-parser";
import { requestLogger } from "./middlewares/logMiddleware";
import jwt from "jwt-express"
import cookieParser from "cookie-parser";
import configService from "./services/configService";
import authController from "./controllers/authController";
import managerController from "./controllers/managerController";
import registerController from "./controllers/registerController";
import studentController from "./controllers/studentController";
import moderatorController from "./controllers/moderatorController";
import teacherController from "./controllers/teacherController";
import generateAuthMiddleware from './middlewares/authMiddleware';

const app = express()

mongoose.connect(`mongodb://${envUtils.MONGO_USER}:${envUtils.MONGO_PASSWORD}@${envUtils.MONGO_HOST}:${envUtils.MONGO_PORT}/${envUtils.MONGO_DB}`)
  .then(() => logConfirmation("Connected to MongoDB"))
  .catch((e) => console.error(e))

app.get('/', (req, res) => {
  res.contentType('application/json')
  res.send("Learn Flow API")
})

app.use(bodyParser.json())
app.use(requestLogger)
app.use(cookieParser())
app.use(jwt.init(configService.JWT_SECRET ?? "None", { stales: 3600000}))

app.use('/login', authController)
app.use('/register',registerController)

app.use('/managers', managerController)
app.use('/moderators', moderatorController)
app.use('/students', studentController)
app.use('/teachers', teacherController)

app.listen(envUtils.PORT, () => {
  logConfirmation(`Server running at http://${envUtils.HOST}:${envUtils.PORT}/`)
})