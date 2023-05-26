import { Request, Response } from "express";
import { handlerError } from "../handlers/handler.error";
import { errorConstants } from "../constants/error.constants";
import googleVerify from "../helpers/google.verifyToken";
import User from "../models/user.model";
import generateJwt from "../helpers/generateJWT";


const authController = {


    loginGoogle: async (req:Request, res:Response) => {
        try {
            const {id_token} = req.body;
            if(!id_token) return handlerError(res, 400, errorConstants.tokenNotSend);
            // obtener datos que nos proporciona google de la account
            const { email, full_name, img } = await googleVerify(id_token);
            if(!email) return handlerError(res, 400, errorConstants.emailNotSend);
            if(!full_name) return handlerError(res, 400, errorConstants.nameNotSend);
            // verificar si ya hay un usuario de google con ese correo
            const user = await User.findOne({ email, login_google:true });
            if(user) {
              const { token, payload } = await generateJwt(user);
              return res.send({ token , payload});
            }
            // si no, se crea un usuario y se guarda en db
            let userSaved = null;
            if (!user) {
              const newUser = new User({
                full_name, 
                email,
                login_google: true,
                img: img || null,
                password: null,
                phone_number: null
              });
              userSaved = await newUser.save();
            }
            // crear token
            const { token, payload } = await generateJwt(userSaved);
            return res.send({ token , payload});
        } catch (error) {
          return handlerError(res, 400, errorConstants.couldNotVerifyToken);
        }
       },

       validateToken: async (req:Request, res: Response) => {
        try {
          return res.json({success:true})
        } catch (error) {
          return handlerError(res, 500, errorConstants.serverError)
        }
       }
    
};



export default authController;