import { NextFunction, Request, Response } from "express";
import ValidationError from "../errors/ValidationError";
import NotFoundError from "../errors/NotFoundError";
import { learnflowResponse } from "./helpersService";

export const generateAuth = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
      const currentRole: string = req.jwt.payload.role
      if (!allowedRoles.includes(currentRole)) {
          res.status(401).send({ status: 401,  message: "You cannot access this resource." })
      } else {
          next();
      }
  }
}

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl}`)
  next()
}

export const setResContentType = (req: Request, res: Response, next: NextFunction) => {
  res.contentType('application/json')
  next()
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {

  if (err instanceof ValidationError) {
      res.status(400).send(
        learnflowResponse({
          status: 400,
          error: err.message,
        })
      )
      return
  }

  if (err instanceof NotFoundError) {
    res.status(404).send(
      learnflowResponse({
        status: 404,
        error: err.message,
      })
    )
    return
  }

  res.status(500).send(
    learnflowResponse({
      status: 500,
      error: err.message,
    })
  )
}

export const maxFileSizeErrorHandler = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  if (err) {
    res.status(413).send(
      learnflowResponse({
        status: 413,
        error: "Ce fichier est trop volumineux (10MB maximum)",
      })
    )
    return
  }
  next()
}