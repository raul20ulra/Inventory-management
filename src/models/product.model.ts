import { Schema, model, PaginateModel } from 'mongoose';
import { ProductModel, IProduct } from '../interfaces/product.interface';
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import paginate from 'mongoose-paginate-v2';

const ProductSchema = new Schema<IProduct> ({
    name: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'CategoryCoupon',
        required: true,
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

ProductSchema.plugin(paginate);
ProductSchema.plugin(aggregatePaginate);

const Product: ProductModel | any = model<IProduct, ProductModel >("Product", ProductSchema);

 export default Product;