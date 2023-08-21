import Joi, { ValidationErrorItem } from 'joi';
import { IStudent, Student, StudentModel } from '../models/student';
import IRepository from '../interfaces/IRepository'
import StudentValidationSchema from '../validators/students';
import IUser, { IUserStudent } from '../interfaces/IUser';
import { Address } from '../models/address';
import { DocumentModel, IDocument } from '../models/document';
import { areObjectsEqual } from '../lib/helpersService';

export class StudentRepository implements IRepository<IUserStudent, IStudent> {

    async getAll(): Promise<IUserStudent[]> {
        const students = await StudentModel.find().populate("address").populate("profilePicture")
        const users = students.map((student) => (
            {
                address: student.address,
                birthdate: student.birthdate,
                email: student.email,
                firstName: student.firstName,
                lastName: student.lastName,
                phoneNumber: student.phoneNumber,
                profilePicture: student.profilePicture,
                student: student
            } as IUserStudent
        ))
        return users
    }

    async getOne(id: string): Promise<IUserStudent | null> {
        const student = await StudentModel.findById(id).populate("address").populate("profilePicture")
        if (!student) return null

        return {
            address: student.address,
            birthdate: student.birthdate,
            email: student.email,
            firstName: student.firstName,
            lastName: student.lastName,
            phoneNumber: student.phoneNumber,
            profilePicture: student.profilePicture,
            student: student
        } as IUserStudent
    }

    async getOneByEmail(email: string): Promise<IUserStudent | null> {
        const student = await StudentModel.findOne({ email }).populate("address").populate("profilePicture")
        if (!student) return null

        return {
            address: student.address,
            birthdate: student.birthdate,
            email: student.email,
            firstName: student.firstName,
            lastName: student.lastName,
            phoneNumber: student.phoneNumber,
            profilePicture: student.profilePicture,
            student: student
        } as IUserStudent
    }

    async getOneByEmailWithPassword(email: string): Promise<IUserStudent | null> {
        const student = await StudentModel.findOne({ email }).select("+password").populate("address").populate("profilePicture")
        if (!student) return null

        return {
            address: student.address,
            birthdate: student.birthdate,
            email: student.email,
            firstName: student.firstName,
            lastName: student.lastName,
            phoneNumber: student.phoneNumber,
            profilePicture: student.profilePicture,
            student: student
        } as IUserStudent
    }

    async deleteOne(id: string): Promise<boolean> {
        const student = await StudentModel.findByIdAndDelete(id)

        if (!student) {
            return false
        }

        return true
    }

    async createOne(object: IStudent): Promise<null | ValidationErrorItem[]> {
        const validationResult = StudentValidationSchema.validate(object)
        if (validationResult.error) {
            return validationResult.error.details
        }
        const student = new StudentModel(object)
        await student.save()
        return null
    }

    async updateOne(id: string, studentData: IStudent): Promise<IUserStudent | ValidationErrorItem[]> {
        const StudentValidationSchemaWithoutPassword = StudentValidationSchema.keys({ password: Joi.any().strip() })
        const validationResult = StudentValidationSchemaWithoutPassword.validate(studentData)
        if (validationResult.error){
          return validationResult.error.details
        }

        const student = await StudentModel.findOne({ _id: id })

        if (!student) {
            throw new Error("Student not found")
        }

        const newAddress = studentData.address
        const newProfilePicture = studentData.profilePicture

        const currentAddress = Address.findById(student.address)
        const currentProfilePicture = DocumentModel.findById(student.profilePicture)

        if (areObjectsEqual(newAddress, currentAddress)) {
            await Address.findByIdAndUpdate(student.address, newAddress)
        }
        if (areObjectsEqual(newProfilePicture, currentProfilePicture)) {
            await DocumentModel.findByIdAndUpdate(student.profilePicture, newProfilePicture)
        }
        
        const updatedStudent = Object.assign(student, studentData)
        updatedStudent.address = student.address._id
        updatedStudent.profilePicture = student.profilePicture._id as any
        await updatedStudent.save()

        await updatedStudent.populate("address")
        await updatedStudent.populate("profilePicture")
        return this.format(updatedStudent)
    }

    format(student: IStudent): IUserStudent {
        return {
            address: student.address,
            birthdate: student.birthdate,
            email: student.email,
            firstName: student.firstName,
            lastName: student.lastName,
            phoneNumber: student.phoneNumber,
            profilePicture: student.profilePicture,
            student: student
        } as IUserStudent
    }

    formatAll(students: IStudent[]): IUserStudent[] {
        const users = students.map((student) => (
            {
                address: student.address,
                birthdate: student.birthdate,
                email: student.email,
                firstName: student.firstName,
                lastName: student.lastName,
                phoneNumber: student.phoneNumber,
                profilePicture: student.profilePicture,
                student: student
            } as IUserStudent
        ))
        return users
    }

}

export default new StudentRepository()