import {Schema, model} from 'mongoose';
import IUser from '../interfaces/user.interface';


const UserSchema = new Schema<IUser> ({
    name: {
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:false,
       
    },
    login_google:{
        type: Boolean,
        default: false,
    },
    img: {
        type: String,
        default: null
    }
});


 const User = model<IUser>("User", UserSchema);
 export default User;