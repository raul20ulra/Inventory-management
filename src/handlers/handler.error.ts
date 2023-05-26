

import { Response } from "express";

export const handlerError = 
            (res: Response, status:number, message: string) =>
                 res.status(status).json({message})
