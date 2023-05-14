import { ValidationErrorItem } from 'joi';
import { IStudent, StudentModel } from '../models/student';
import IRepository from '../interfaces/IRepository'
import StudentValidationSchema from '../validators/students';

export class StudentRepository implements IRepository<IStudent, IStudent> {

    async getAll(): Promise<IStudent[]> {
        return await StudentModel.find();
    }

    async getOne(id: string): Promise<IStudent | null> {
        return await StudentModel.findById(id);
    }

    async getOneByEmail(email: string): Promise<IStudent | null> {
        const student = await StudentModel.findOne({ email });

        return student;
    }

    async deleteOne(id: string): Promise<boolean> {
        const student = await StudentModel.findByIdAndDelete(id);

        if (!student) {
            return false;
        }

        return true;
    }

    async createOne(object: IStudent): Promise<null | ValidationErrorItem[]> {
        const validationResult = StudentValidationSchema.validate(object)
        if (validationResult.error) {
            return validationResult.error.details
        }
        const student = new StudentModel(object);
        await student.save();
        return null;
    }
}

export default new StudentRepository();