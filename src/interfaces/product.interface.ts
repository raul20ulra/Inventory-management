import { Schema } from 'mongoose';
import { PaginateModel } from 'mongoose';

export interface IProduct {
    name:string;
    category: Schema.Types.ObjectId;
    description:string;
    price:number;
    amount:number;
    img: string;
}
export interface ProductModel extends PaginateModel<IProduct> {}
