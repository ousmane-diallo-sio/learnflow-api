import { IAddress } from "../models/address"
import { IDocument } from "../models/document"
import { IStudent } from "../models/student"
import { ITeacher } from "../models/teacher"

export interface IUserStudent {
  firstName: string
  lastName: string
  birthdate: Date
  email: string
  address: IAddress
  phoneNumber: string
  profilePicture: IDocument
  student: IStudent
  teacher?: undefined
}

export interface IUserTeacher {
  firstName: string
  lastName: string
  birthdate: Date
  email: string
  address: IAddress
  phoneNumber: string
  profilePicture: IDocument
  student?: undefined
  teacher: ITeacher
}

// prevents the object from having both student and teacher properties
type IUser = IUserStudent | IUserTeacher
export default IUser