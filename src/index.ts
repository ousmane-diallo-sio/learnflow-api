import express from "express";
import studentController from "./controllers/student";
import mongoose from 'mongoose';
import envUtils from "./utils/envUtils";
import { logConfirmation } from "./utils/logUtils";
import bodyParser from "body-parser";
import { requestLogger } from "./middlewares/logMiddleware";

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
app.use('/students', studentController)

app.listen(envUtils.PORT, () => {
  logConfirmation(`Server running at http://${envUtils.HOST}:${envUtils.PORT}/`)
})