import { ValidationErrorItem } from 'joi';
import { ITeacher, TeacherModel } from '../models/teacher';
import IRepository from '../interfaces/IRepository'
import TeacherValidationSchema from '../validators/teacher';

export class TeacherRepository implements IRepository<ITeacher, ITeacher> {

    async getAll(): Promise<ITeacher[]> {
        return await TeacherModel.find();
    }

    async getOne(id: string): Promise<ITeacher | null> {
        return await TeacherModel.findById(id);
    }

    async getOneByEmail(email: string): Promise<ITeacher | null> {
        const teacher = await TeacherModel.findOne({ email });
        return teacher;
    }

    async getOneByEmailWithPassword(email: string): Promise<ITeacher | null> {
        const teacher = await TeacherModel.findOne({ email }).select("+password");
        return teacher;
    }

    async deleteOne(id: string): Promise<boolean> {
        const teacher = await TeacherModel.findByIdAndDelete(id);
        if (!teacher) {
            return false;
        }
        return true;
    }

    async createOne(object: ITeacher): Promise<null | ValidationErrorItem[]> {
        const validationResult = TeacherValidationSchema.validate(object)
        if (validationResult.error) {
            return validationResult.error.details
        }
        const teacher = new TeacherModel(object);
        await teacher.save();
        return null;
    }
}

export default new TeacherRepository();