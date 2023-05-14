import { ValidationErrorItem } from 'joi';
import { IModerator, ModeratorModel } from '../models/moderator';
import IRepository from '../interfaces/IRepository'
import ModeratorValidationSchema from '../validators/moderator';

export class ModeratorRepository implements IRepository<IModerator, IModerator> {

    async getAll(): Promise<IModerator[]> {
        return await ModeratorModel.find();
    }

    async getOne(id: string): Promise<IModerator | null> {
        return await ModeratorModel.findById(id);
    }

    async getOneByEmail(email: string): Promise<IModerator | null> {
        const moderator = await ModeratorModel.findOne({ email });
        return moderator;
    }

    async deleteOne(id: string): Promise<boolean> {
        const moderator = await ModeratorModel.findByIdAndDelete(id);
        if (!moderator) {
            return false;
        }
        return true;
    }

    async createOne(object: IModerator): Promise<null | ValidationErrorItem[]> {
        const validationResult = ModeratorValidationSchema.validate(object)
        if (validationResult.error) {
            return validationResult.error.details
        }
        const moderator = new ModeratorModel(object);
        await moderator.save();
        return null;
    }
}

export default new ModeratorRepository();