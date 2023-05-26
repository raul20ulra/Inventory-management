import { Document } from 'mongoose';
interface IUser extends Document {
    name:string;
    email:string;
    password:string;
    login_google:boolean;
    img: string;
}
export default  IUser;
