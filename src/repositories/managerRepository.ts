import { ValidationErrorItem } from 'joi';
import { IManager, ManagerModel } from '../models/manager';
import IRepository from '../interfaces/IRepository'
import ManagerValidationSchema from '../validators/manager';

export class ManagerRepository implements IRepository<IManager, IManager> {

    async getAll(): Promise<IManager[]> {
        return await ManagerModel.find();
    }

    async getOne(id: string): Promise<IManager | null> {
        return await ManagerModel.findById(id);
    }

    async getOneByEmail(email: string): Promise<IManager | null> {
        const manager = await ManagerModel.findOne({ email });
        return manager;
    }

    async deleteOne(id: string): Promise<boolean> {
        const manager = await ManagerModel.findByIdAndDelete(id);
        if (!manager) {
            return false;
        }
        return true;
    }

    async createOne(object: IManager): Promise<null | ValidationErrorItem[]> {
        const validationResult = ManagerValidationSchema.validate(object)
        if (validationResult.error) {
            return validationResult.error.details
        }
        const manager = new ManagerModel(object);
        await manager.save();
        return null;
    }
}

export default new ManagerRepository();