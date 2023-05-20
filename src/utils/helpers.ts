import bcrypt from "bcrypt";

export const hashPassword = async (plaintextPassword: string) => {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash
}

export const comparePassword = async (plaintextPassword: string, hash: string) => {
  const passwordComparision = await bcrypt.compare(plaintextPassword, hash);
  return passwordComparision;
}