import {  JWT } from 'jwt-express'
import AuthDTO from '../dto/auth.dto'

export const generateToken = (payload: AuthDTO, jwtMethod: (payload: any) => JWT) => {
    return jwtMethod(payload)
}