import bcrypt from "bcryptjs";
import { LearnflowResponse } from "../interfaces/types";
import { StudentModel } from "../models/student";
import { TeacherModel } from "../models/teacher";
import { ModeratorModel } from "../models/moderator";
import { ManagerModel } from "../models/manager";

export const hashPassword = async (plaintextPassword: string) => {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash
}

export const comparePassword = async (plaintextPassword: string, hash: string) => {
  const passwordComparision = await bcrypt.compare(plaintextPassword, hash);
  return passwordComparision;
}

export const learnflowResponse = (response : LearnflowResponse) => {
  return response
}

export const isEmailAvailable = async (email: string) => {
  let nbDuplicates = await StudentModel.find({ email: email }).countDocuments()
  if (nbDuplicates > 0) return false

  nbDuplicates = await TeacherModel.find({ email: email }).countDocuments()
  if (nbDuplicates > 0) return false

  nbDuplicates = await ModeratorModel.find({ email: email }).countDocuments()
  if (nbDuplicates > 0) return false

  nbDuplicates = await ManagerModel.find({ email: email }).countDocuments()
  if (nbDuplicates > 0) return false

  return true
}