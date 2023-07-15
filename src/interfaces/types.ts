import { Request, Response } from "express";

export type RequestHandler = (req: Request, res: Response) => Promise<void>

export type LearnflowResponse = {
  status: number
  jwt?: string
  data?: any
  error?: string
}