import { Document } from 'mongoose';
interface IProduct extends Document {
    name:string;
    description:string;
    price:number;
    amount:number;
    img: string;
}
export default  IProduct;
