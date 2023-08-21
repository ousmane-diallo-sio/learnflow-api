import { ValidationErrorItem } from 'joi';
import { IStudent, StudentModel } from '../models/student';
import IRepository from '../interfaces/IRepository'
import StudentValidationSchema from '../validators/students';
import IUser, { IUserStudent } from '../interfaces/IUser';

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

    async getOneByEmail(email: string): Promise<IUser | null> {
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
        } as IUser
    }

    async getOneByEmailWithPassword(email: string): Promise<IUser | null> {
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
        } as IUser
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
}

export default new StudentRepository()