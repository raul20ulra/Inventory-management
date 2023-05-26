import jwt from 'jsonwebtoken'
import config from '../config/config'


const generateJwt = (user: any): Promise<any> => {

    return new Promise((resolve, reject) => {
        const payload = {
            _id:user._id,
            full_name: user.full_name,
            phone_number: user.phone_number,
            email: user.email,
            login_google: user.login_google,
            img: user.img
        }
        jwt.sign(payload, config.SECRETORPRIVATEKEY, {
            expiresIn:'8h'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve ({token, payload})
            }
        })
    })
    }
export default generateJwt