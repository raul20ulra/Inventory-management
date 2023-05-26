import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'
import { errorConstants } from '../constants/error.constants';
import config from '../config/config';
import { handlerError } from "../handlers/handler.error";

/**
     * Método para verificar un token 
     * @param {Request} req 
     * @param {Response} res 
     * @returns {Promise<Response>}
     */
const validateTokenParams = async (req: Request|any, res: Response, next:any)=> {
    try {
    const token = req.params.token;
    const payload:any = jwt.verify(token,config.SECRETORPRIVATEKEY);
    if(!payload) return handlerError(res, 400, errorConstants.invalidToken);
    req.payload = payload;
    next();
    } catch (error) {
        return handlerError(res, 400, errorConstants.invalidToken);
    }
}

export default validateTokenParams