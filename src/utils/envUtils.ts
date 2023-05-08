require('dotenv').config()

const envUtils = {
  HOST: process.env.HOST ?? "127.0.0.1",
  PORT: process.env.PORT ?? 3000,
  MONGO_DB: process.env.MONGO_DB ?? "randomdb",
  MONGO_USER: process.env.MONGO_USER ?? "admin",
  MONGO_HOST: process.env.MONGO_HOST ?? "127.0.0.1",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD ?? "password",
  MONGO_PORT: process.env.MONGO_PORT ?? 27017,
}

export default envUtils