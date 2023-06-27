import { Request, Response, NextFunction } from 'express';
import NotFoundError from '../errors/NotFoundError';
import ValidationError from '../errors/ValidationError';

export default (err: Error, req: Request, res: Response, next: NextFunction) => {

    if (err instanceof ValidationError) {
        res.status(400).send({
            status: 400,
            message: err.message,
            details: err.errorDetails
        })
        return
    }

    if (err instanceof NotFoundError) {
        res.status(404).send({
            status: 404,
            message: err.message
        })
        return
    }

    res.status(500).send({
        status: 500,
        message: err.message
    })

}