import { Request, Response } from "express";
import { JWT } from "jwt-express";

export type RequestHandler = (req: Request, res: Response) => Promise<void>

export type LearnflowResponse = {
  status: number
  jwt?: JWT
  data?: any
  error?: string
}