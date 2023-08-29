/* eslint-disable no-prototype-builtins */
import bcrypt from "bcryptjs";
import { LearnflowResponse } from "../interfaces/types";
import { StudentModel } from "../models/student";
import { TeacherModel } from "../models/teacher";
import { ModeratorModel } from "../models/moderator";
import { ManagerModel } from "../models/manager";
import { SchoolSubject, ISchoolSubject, schoolSubjectNames } from "../models/schoolSubject";
import { logConfirmation } from "./logService";

export const hashPassword = async (plaintextPassword: string) => {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash
}

export const comparePassword = async (plaintextPassword: string, hash: string) => {
  const passwordComparision = await bcrypt.compare(plaintextPassword, hash);
  return passwordComparision;
}

export const areObjectsEqual = (o1: any, o2: any) => {
  for(const p in o1){
      if(o1.hasOwnProperty(p)){
          if(o1[p] !== o2[p]){
              return false;
          }
      }
  }
  for(const p in o2){
      if(o2.hasOwnProperty(p)){
          if(o1[p] !== o2[p]){
              return false;
          }
      }
  }
  return true;
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

export const updateSchoolSubjects = async () => {

  try {
    const existingSubjects = await SchoolSubject.find({ name: { $in: schoolSubjectNames } })
    const existingSubjectNames = existingSubjects.map((subject) => subject.name)

    const missingSubjects = schoolSubjectNames.filter((subject) => !existingSubjectNames.includes(subject))
    if (missingSubjects.length > 0) {
      const newSubjects = missingSubjects.map((subject) => ({ name: subject }))
      await SchoolSubject.insertMany(newSubjects)
      logConfirmation(`Added the following subjects to the collection: ${existingSubjectNames}`)
      return
    }

    logConfirmation('All school subjects are up-to-date')
    
  } catch (error) {
    console.error('Error adding missing subjects :', error)
  }
}