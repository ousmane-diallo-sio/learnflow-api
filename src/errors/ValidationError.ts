import { ValidationErrorItem } from "joi"

export default class ValidationError extends Error {
    readonly errorDetails: ValidationErrorItem[];

    constructor(message: string, errorDetails: ValidationErrorItem[]) {
        super(message)
        this.errorDetails = errorDetails
    }
}