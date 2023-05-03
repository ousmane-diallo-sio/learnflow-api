import express from "express";
import studentController from "./controllers/student";

const app = express()

app.get('/', (req, res) => {
  res.contentType('application/json')
  res.send("Learn Flow API")
})

app.use('/students', studentController)

app.listen(process.env.PORT ?? 3000, () => {
  console.log("----- Server running -----")
})