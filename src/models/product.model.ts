import {Schema, model} from 'mongoose';
import IProduct from '../interfaces/product.interface';


const ProductSchema = new Schema<IProduct> ({
    name: {
        type: String,
        required: true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true,
       
    },
    amount:{
        type:Number,
        required:true,
    },
    img: {
        type: String,
        default: null
    }
});


 const Product = model<IProduct>("Product", ProductSchema);
 export default Product;