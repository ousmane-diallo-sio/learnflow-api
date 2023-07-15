import bcrypt from "bcryptjs";
import { LearnflowResponse } from "../interfaces/types";

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