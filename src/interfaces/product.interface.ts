import { Document } from 'mongoose';
import { PaginateModel } from 'mongoose';

interface IProduct extends Document {
    name:string;
    description:string;
    price:number;
    amount:number;
    img: string;
}
export default  IProduct;
export interface CouponModel extends PaginateModel<IProduct> {}
