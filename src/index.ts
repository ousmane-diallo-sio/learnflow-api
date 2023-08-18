import express from "express";
import mongoose from 'mongoose';
import envUtils from "./lib/envService";
import { logConfirmation } from "./lib/logService";
import bodyParser from "body-parser";
import jwt from "jwt-express"
import cookieParser from "cookie-parser";
import authController from "./controllers/authController";
import managerController from "./controllers/managerController";
import registerController from "./controllers/registerController";
import studentController from "./controllers/studentController";
import moderatorController from "./controllers/moderatorController";
import teacherController from "./controllers/teacherController";
import cors from "cors";
import { errorHandler, requestLogger, setResContentType } from "./lib/middlewareService";
import configService from "./lib/configService";
import { updateSchoolSubjects } from "./lib/helpersService";
import schoolSubjectController from "./controllers/schoolSubjectController";

const app = express()
app.use(cors())

const mongoConnectionString = `mongodb://${envUtils.MONGO_USER}:${envUtils.MONGO_PASSWORD}@${envUtils.MONGO_HOST}:${envUtils.MONGO_PORT}/${envUtils.MONGO_DB}`

mongoose.connect(mongoConnectionString)
  .then(() => {
    logConfirmation("Connected to MongoDB")
    updateSchoolSubjects()
    })
  .catch((e) => console.error(e))

app.get('/', (req, res) => {
  res.contentType('application/json')
  res.send("Learn Flow API")
})


app.use(bodyParser.json({ limit: '50mb' }))
app.use(requestLogger)
app.use(cookieParser())
app.use(jwt.init(configService.JWT_SECRET, { cookies: false, stales: 3600000}))

app.use(setResContentType)

app.use('/auth', authController)
app.use('/register',registerController)

app.use('/managers', managerController)
app.use('/moderators', moderatorController)
app.use('/students', studentController)
app.use('/teachers', teacherController)
app.use('/school-subjects', schoolSubjectController)

app.use(errorHandler)

app.listen(envUtils.PORT, () => {
  logConfirmation(`Server running at http://${envUtils.HOST}:${envUtils.PORT}/`)
})