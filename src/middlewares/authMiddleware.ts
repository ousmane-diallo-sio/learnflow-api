import { NextFunction, Request, Response } from "express";

const generateAuthMiddleware = (allowedRoles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const currentRole: string = req.jwt.payload.role
        if (!allowedRoles.includes(currentRole)) {
            res.status(401).send({ status: 401,  message: "You cannot access this resource." })
        } else {
            next();
        }
    }
}

export default generateAuthMiddleware;