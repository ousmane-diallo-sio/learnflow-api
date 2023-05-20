import {  JWT } from 'jwt-express'
import jwtPayloadDTO from '../dto/jwtPayload.dto'

export const generateToken = (payload: jwtPayloadDTO, jwtMethod: (payload: any) => JWT) => {
    return jwtMethod(payload)
}