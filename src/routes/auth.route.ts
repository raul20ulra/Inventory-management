import { Router } from "express";
import login from "../controllers/auth";
import dcryptJWT from "../middlewares/dcrypt.jwt";



const authRouter = Router()

authRouter.post('/login-google', login.loginGoogle);
authRouter.get('/validate-token',dcryptJWT, login.validateToken);


export default authRouter