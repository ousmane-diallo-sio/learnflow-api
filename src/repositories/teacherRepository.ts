import { ValidationErrorItem } from 'joi';
import { ITeacher, TeacherModel } from '../models/teacher';
import IRepository from '../interfaces/IRepository'
import TeacherValidationSchema from '../validators/teacher';
import IUser, { IUserTeacher } from '../interfaces/IUser';

export class TeacherRepository implements IRepository<IUserTeacher, ITeacher> {

    async getAll(): Promise<IUserTeacher[]> {
        const teachers = await TeacherModel.find().populate("address").populate("profilePicture")
        const users = teachers.map((teacher) => (
            {
                address: teacher.address,
                birthdate: teacher.birthdate,
                email: teacher.email,
                firstName: teacher.firstName,
                lastName: teacher.lastName,
                phoneNumber: teacher.phoneNumber,
                profilePicture: teacher.profilePicture,
                teacher: teacher
            } as IUserTeacher
        ))
        return users
    }

    async getOne(id: string): Promise<IUserTeacher | null> {
        const teacher = await TeacherModel.findById(id).populate("address").populate("profilePicture")
        if (!teacher) return null

        return {
            address: teacher.address,
            birthdate: teacher.birthdate,
            email: teacher.email,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            phoneNumber: teacher.phoneNumber,
            profilePicture: teacher.profilePicture,
            teacher: teacher
        } as IUserTeacher
    }

    async getOneByEmail(email: string): Promise<IUserTeacher | null> {
        const teacher = await TeacherModel.findOne({ email }).populate("address").populate("profilePicture")
        if (!teacher) return null

        return {
            address: teacher.address,
            birthdate: teacher.birthdate,
            email: teacher.email,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            phoneNumber: teacher.phoneNumber,
            profilePicture: teacher.profilePicture,
            teacher: teacher
        } as IUserTeacher
    }

    async getOneByEmailWithPassword(email: string): Promise<IUserTeacher | null> {
        const teacher = await TeacherModel.findOne({ email }).select("+password").populate("address").populate("profilePicture")
        if (!teacher) return null

        return {
            address: teacher.address,
            birthdate: teacher.birthdate,
            email: teacher.email,
            firstName: teacher.firstName,
            lastName: teacher.lastName,
            phoneNumber: teacher.phoneNumber,
            profilePicture: teacher.profilePicture,
            teacher: teacher
        } as IUserTeacher
    }

    async deleteOne(id: string): Promise<boolean> {
        const teacher = await TeacherModel.findByIdAndDelete(id)
        if (!teacher) {
            return false
        }
        return true
    }

    async createOne(object: ITeacher): Promise<null | ValidationErrorItem[]> {
        const validationResult = TeacherValidationSchema.validate(object)
        if (validationResult.error) {
            return validationResult.error.details
        }
        const teacher = new TeacherModel(object)
        await teacher.save()
        return null
    }
}

export default new TeacherRepository()