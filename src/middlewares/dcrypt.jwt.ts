import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import { errorConstants } from '../constants/error.constants';
import { handlerError } from '../handlers/handler.error';

/** Método pra desencriptar el JWT
   
@param {Request} req
@param {Response} res
@returns {NextFunction}
*/
const dcryptJWT = (req: Request | any, res:Response, next:NextFunction) => {
  try {
  // Solicita token del header
    const token = req.header('x-token');
    // Desencripta el JWT y verifica si es valido
    req.user = jwt.verify(`${token}`, config.SECRETORPRIVATEKEY);
    return next();
  } catch (error) {
    return handlerError(res, 401, errorConstants.invalidToken);
  }
};

export default dcryptJWT;